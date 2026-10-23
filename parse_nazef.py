import urllib.request
import re
import html as html_mod
import sys
import os
import json

sys.stdout.reconfigure(encoding='utf-8')

headers = {
    'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    'Accept-Language': 'en-US,en;q=0.9,fa;q=0.8'
}

# Step 1: Download and parse the main page already saved
with open('ig_nazef.html', 'r', encoding='utf-8') as f:
    content = f.read()

print("Loaded page, size:", len(content))

# Profile pic
og_imgs = re.findall(r'<meta\s+property=["\']og:image["\']\s+content=["\']([^"\']+)["\']', content)
og_imgs_alt = re.findall(r'content=["\']([^"\']+)["\'][^>]*property=["\']og:image["\']', content)
all_og = og_imgs + og_imgs_alt
print("Profile pic:", all_og)

# Look for any image URLs (escaped with \/)
raw = re.findall(r'https?:\\/\\/[^\s"\'\\]+?\.(?:jpg|jpeg|png)(?:\\?[^\s"\'\\]*)?', content)
print(f"Raw escaped image URLs: {len(raw)}")

# Also check unescaped
raw2 = re.findall(r'https?://[^\s"\'<>]+?\.(?:jpg|jpeg|png)(?:\?[^\s"\'<>]*)?', content)
print(f"Raw unescaped image URLs: {len(raw2)}")

clean = set()
for u in raw + raw2:
    u2 = u.replace('\\/', '/').replace('&amp;', '&')
    if ('fbcdn' in u2 or 'cdninstagram' in u2) and 'rsrc.php' not in u2:
        clean.add(u2.split('?')[0])

print(f"\nUnique base URLs: {len(clean)}")
for u in sorted(clean)[:30]:
    print("IMG:", u)

# Look for JSON data blocks
json_blocks = re.findall(r'<script type="application/json"[^>]*>(.*?)</script>', content, re.DOTALL)
print(f"\nJSON blocks: {len(json_blocks)}")

# Look for __d( script tags  
script_data = re.findall(r'window\._sharedData\s*=\s*(\{.*?\});</script>', content, re.DOTALL)
print(f"SharedData blocks: {len(script_data)}")

# Grep for any shortcode
shortcodes = re.findall(r'"shortcode":"([A-Za-z0-9_-]+)"', content)
print(f"Post shortcodes: {shortcodes[:10]}")

# Bio via unicode
bio_esc = re.findall(r'"biography":"((?:[^"\\]|\\u[0-9a-fA-F]{4}|\\.)*)"', content)
print("Biography escaped:", bio_esc[:2])

