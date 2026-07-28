import os
import glob
from bs4 import BeautifulSoup
import re

CSS_CONTENT = """
/* Premium Config Card */
.premium-config-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  padding: 0;
  overflow: hidden;
  border: 1px solid rgba(212, 175, 55, 0.2);
}
.config-header {
  display: flex;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 2px solid #D4AF37;
  font-family: 'Poppins', sans-serif;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #1a1a2e;
  background: #fff;
}
.config-row {
  display: flex;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #f1f1f1;
  background: #fff;
  transition: background 0.2s;
}
.config-row:last-child {
  border-bottom: none;
}
.config-row:hover {
  background: #fafafa;
}
.col-type { flex: 2; padding-right: 15px; }
.col-area { flex: 1.5; padding-right: 15px; }
.col-high { flex: 2; padding-right: 15px; }
.col-price { flex: 1.5; padding-right: 15px; }
.col-status { flex: 1; padding-right: 15px; }
.col-action { flex: 1.5; text-align: right; }

.badge-collection {
  display: inline-block;
  background: #2a2a35;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 50px;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.type-title {
  color: #1e3a8a;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}
.area-text {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
}
.badge-highlight {
  display: inline-block;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  color: #4b5563;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 50px;
  margin-bottom: 4px;
}
.price-text {
  color: #1e3a8a;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 700;
  margin: 0;
}
.price-sub {
  color: #1e3a8a;
  font-size: 12px;
  font-weight: 600;
  margin: 0;
}
.badge-status {
  display: inline-block;
  background: #10b981;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 50px;
}
.btn-pill-gold {
  background: linear-gradient(135deg, #d4a574 0%, #f59e0b 100%);
  color: #1f2937 !important;
  border-radius: 50px;
  border: none;
  box-shadow: 0 4px 15px rgba(212, 165, 116, 0.3);
  transition: all 0.3s ease;
  font-size: 12px;
}
.btn-pill-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 165, 116, 0.4);
}

@media (max-width: 991px) {
  .premium-config-card {
    border: none;
    box-shadow: none;
    background: transparent;
  }
  .config-header { display: none; }
  .config-row {
    flex-direction: column;
    align-items: stretch;
    padding: 24px;
    gap: 15px;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    margin-bottom: 20px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.04);
  }
  .col-type {
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 15px;
  }
  .type-title { font-size: 16px; display: flex; align-items: center; justify-content: center; gap: 8px;}
  .col-area, .col-high, .col-price, .col-status {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .col-area::before, .col-high::before, .col-price::before, .col-status::before {
    content: attr(data-label);
    font-size: 12px;
    color: #6b7280;
    font-weight: 500;
  }
  .col-area > *, .col-high > *, .col-price > *, .col-status > * {
    text-align: right;
  }
  .price-sub { display: none; }
  .col-action { width: 100%; margin-top: 5px; }
  .col-action .btn { width: 100%; }
  .badge-highlight { font-size: 10px; }
}
"""

def append_css():
    with open('styles.css', 'r', encoding='utf-8') as f:
        content = f.read()
    if '.premium-config-card' not in content:
        with open('styles.css', 'a', encoding='utf-8') as f:
            f.write("\n" + CSS_CONTENT)

def clean_onyx_html():
    if not os.path.exists('onyx-by-splendor.html'):
        return
    with open('onyx-by-splendor.html', 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Remove the injected style block
    pattern = r'<style>\s*\.premium-config-card.*?</style>\s*'
    html = re.sub(pattern, '', html, flags=re.DOTALL)
    
    with open('onyx-by-splendor.html', 'w', encoding='utf-8') as f:
        f.write(html)

def process_file(filepath):
    # skip onyx because it's already updated
    if 'onyx-by-splendor.html' in filepath:
        return
        
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    # Find the table-responsive div containing the price-table
    pattern = r'(<div class="table-responsive">.*?<table class="table table-hover price-table">.*?</table>\s*</div>)'
    match = re.search(pattern, html, flags=re.DOTALL)
    if not match:
        return
        
    old_table_block = match.group(1)
    
    soup = BeautifulSoup(old_table_block, 'html.parser')
    table = soup.find('table')
    if not table:
        return
        
    # Get headers
    headers = [th.get_text(strip=True) for th in table.find('thead').find_all('th')]
    header_names = {
        'col1': headers[0].upper() if len(headers) > 0 else 'UNIT TYPE',
        'col2': headers[1].upper() if len(headers) > 1 else 'CONFIGURATION',
        'col3': headers[2].upper() if len(headers) > 2 else 'AREA',
        'col4': headers[3].upper() if len(headers) > 3 else 'PRICE',
        'col5': headers[4].upper() if len(headers) > 4 else 'ACTION'
    }

    new_html = f"""<div class="premium-config-card">
              <!-- Header -->
              <div class="config-header">
                <div class="col-type">{header_names['col1']}</div>
                <div class="col-area">{header_names['col2']}</div>
                <div class="col-high">{header_names['col3']}</div>
                <div class="col-price">{header_names['col4']}</div>
                <div class="col-status">STATUS</div>
                <div class="col-action">{header_names['col5']}</div>
              </div>"""
              
    tbody = table.find('tbody')
    if not tbody:
        return
        
    rows = tbody.find_all('tr')
    for row in rows:
        tds = row.find_all('td')
        if len(tds) < 5:
            continue
            
        unit_type_div = tds[0].find('div', class_='d-flex')
        icon_tag = unit_type_div.find('i') if unit_type_div else None
        
        # fix icon classes
        icon_html = ''
        if icon_tag:
            cls = " ".join(icon_tag.get('class', []))
            cls = cls.replace('me-2', 'd-lg-none')
            icon_html = f'<i class="{cls}"></i>'
        else:
            icon_html = '<i class="fas fa-building text-primary d-lg-none"></i>'
            
        title_text = unit_type_div.find('span').get_text(strip=True) if unit_type_div and unit_type_div.find('span') else tds[0].get_text(strip=True)
        
        title_lower = title_text.lower()
        if 'bhk' in title_lower or 'villa' in title_lower or 'studio' in title_lower or 'suite' in title_lower or 'apartment' in title_lower:
            badge_text = "LUXURY RESIDENCE"
        elif 'retail' in title_lower or 'shop' in title_lower or 'food' in title_lower:
            badge_text = "RETAIL ZONES"
        elif 'office' in title_lower or 'it ' in title_lower or 'workspace' in title_lower:
            badge_text = "PREMIUM WORKSPACES"
        else:
            badge_text = "PREMIUM COLLECTION"

        config_type_text = tds[1].get_text(strip=True)
        area_text = tds[2].get_text(strip=True)
        
        price_badge = tds[3].find('span', class_='badge')
        price_text = price_badge.get_text(strip=True) if price_badge else tds[3].get_text(strip=True)
        if price_text.lower() == 'available':
            price_text = "On Request"
            
        price_main = price_text
        price_sub_html = ""
        if '*' in price_text or 'lakh' in price_text.lower() or 'cr' in price_text.lower():
            price_sub_html = '<p class="price-sub">Onwards</p>'
            
        status_html = '<span class="badge-status">Available</span>'
        
        a_tag = tds[4].find('a')
        href = a_tag['href'] if a_tag else "#contact"
        
        new_html += f"""
              <div class="config-row">
                <div class="col-type">
                  <span class="badge-collection d-none d-lg-inline-block">{badge_text}</span>
                  <h4 class="type-title">{icon_html} {title_text}</h4>
                </div>
                <div class="col-area" data-label="{header_names['col2']}">
                  <p class="area-text">{config_type_text}</p>
                </div>
                <div class="col-high" data-label="{header_names['col3']}">
                  <span class="badge-highlight">{area_text}</span>
                </div>
                <div class="col-price" data-label="{header_names['col4']}">
                  <p class="price-text">{price_main}</p>
                  {price_sub_html}
                </div>
                <div class="col-status" data-label="Status">
                  {status_html}
                </div>
                <div class="col-action">
                  <a href="{href}" target="_blank" class="btn btn-pill-gold fw-bold text-uppercase w-100 py-2">GET PRICE</a>
                </div>
              </div>"""

    new_html += "\n            </div>"
    
    updated_html = html.replace(old_table_block, new_html)
    
    # Also adjust column wrapper
    updated_html = re.sub(r'<div class="col-lg-10">(\s*)<div class="premium-config-card">', r'<div class="col-lg-11">\1<div class="premium-config-card">', updated_html)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(updated_html)
        
    print(f"Updated {filepath}")

def main():
    append_css()
    clean_onyx_html()
    
    html_files = glob.glob('*.html')
    for f in html_files:
        process_file(f)

if __name__ == "__main__":
    main()
