import urllib.request
import re
import html as html_mod
import sys
import os
import json

sys.stdout.reconfigure(encoding='utf-8')

# Parse FB page for images and info
with open('fb_page.html', 'r', encoding='utf-8') as f:
    fb_content = f.read()

print("FB page size:", len(fb_content))

# OG tags
og_title = re.findall(r'<meta\s+property=["\']og:title["\']\s+content=["\']([^"\']+)["\']', fb_content)
og_desc  = re.findall(r'<meta\s+property=["\']og:description["\']\s+content=["\']([^"\']+)["\']', fb_content)
og_imgs  = re.findall(r'<meta\s+property=["\']og:image["\']\s+content=["\']([^"\']+)["\']', fb_content)
og_imgs2 = re.findall(r'content=["\']([^"\']+)["\'][^>]+property=["\']og:image["\']', fb_content)
print("FB Title:", [html_mod.unescape(t) for t in og_title])
print("FB Desc:", [html_mod.unescape(d) for d in og_desc])
print("FB Imgs:", og_imgs + og_imgs2)

# Extract all jpg/png/webp urls from FB
fb_imgs = re.findall(r'https://[^\s"\'<>\\]+?\.(?:jpg|jpeg|png|webp)(?:\?[^\s"\'<>\\]*)?', fb_content)
clean_fb = set()
for u in fb_imgs:
    u2 = html_mod.unescape(u)
    if 'fbsbx' in u2 or 'fbcdn' in u2 or 'scontent' in u2:
        clean_fb.add(u2.split('?')[0])

print(f"\nFB content images found: {len(clean_fb)}")
for u in sorted(clean_fb)[:20]:
    print("FB IMG:", u)

# Also look for lookaside crawler URLs
lookaside = re.findall(r'https://lookaside[^\s"\'<>]+', fb_content)
print(f"\nLookaside URLs: {lookaside[:10]}")

# Look for CDN image patterns  
cdn_imgs = re.findall(r'https://[a-z0-9]+\.fbcdn\.net/[^\s"\'<>]+\.jpg[^\s"\'<>]*', fb_content)
print(f"CDN images: {len(cdn_imgs)}")
for u in cdn_imgs[:10]:
    print("CDN:", html_mod.unescape(u)[:150])

# Bio/about info
about_matches = re.findall(r'"text"\s*:\s*"((?:[^"\\]|\\.)*)"\s*,\s*"__typename"\s*:\s*"TextWithEntities"', fb_content)
print(f"\nText blocks: {about_matches[:5]}")

