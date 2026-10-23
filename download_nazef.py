import urllib.request
import re
import html as html_mod
import sys
import os
import json

sys.stdout.reconfigure(encoding='utf-8')

# Download profile picture at higher resolution
profile_url = "https://scontent.cdninstagram.com/v/t51.2885-19/305707125_2902959926673378_3093033175608289568_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=108&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy41MzEuQzMifQ%3D%3D&_nc_ohc=5DkzCVUxtzYQ7kNvwFRczp5&_nc_oc=AdpNiPp-AW4ylyCEhJsuopyVVzg2DXl9bn1TVFABM_QPi2dZytzbxTOeyGH64fFgSB0&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_ss=7b60f&oh=00_AQNrmlFtXfdWUbblPPtWtNYDEWE6bpyv9mmpyP7LNFnXgg&oe=6AE1256B"

os.makedirs('public/assets/images', exist_ok=True)

print("Downloading profile picture...")
try:
    req = urllib.request.Request(
        profile_url,
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    )
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = resp.read()
        with open('public/assets/images/logo.jpg', 'wb') as f:
            f.write(data)
        print(f"Saved logo.jpg ({len(data)} bytes)")
except Exception as e:
    print("Logo download error:", e)

# Now look at the JSON blocks in the saved HTML for post data
with open('ig_nazef.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Look for relay store data which has user info
json_blocks = re.findall(r'<script type="application/json" nonce="[^"]*">(.*?)</script>', content, re.DOTALL)
print(f"\nJSON blocks: {len(json_blocks)}")

# Look inside each for post data
for i, block in enumerate(json_blocks[:5]):
    if '"biography"' in block or '"edge_owner"' in block or '"media"' in block:
        print(f"Block {i} has relevant data, length {len(block)}")
        with open(f'block_{i}.json', 'w', encoding='utf-8') as f:
            f.write(block)

# Try to extract bio via unicode escapes from full page
bio_matches = re.findall(r'biography["\s]*:["\s]*"((?:[^"\\]|\\.)*)"', content)
if bio_matches:
    for b in bio_matches[:3]:
        decoded = bytes(b, 'utf-8').decode('unicode_escape', errors='ignore')
        print("Bio decoded:", decoded)
else:
    print("No biography found in page")

# Grab any post shortcodes
shortcodes = re.findall(r'"shortcode"\s*:\s*"([A-Za-z0-9_-]{10,12})"', content)
print(f"\nShortcodes: {shortcodes[:10]}")

# Any display URLs for posts
display_urls = re.findall(r'"display_url"\s*:\s*"([^"]+)"', content)
print(f"\nDisplay URLs: {display_urls[:5]}")

# Try thumbnail_src
thumb_urls = re.findall(r'"thumbnail_src"\s*:\s*"([^"]+)"', content)
print(f"Thumbnail URLs: {thumb_urls[:5]}")

