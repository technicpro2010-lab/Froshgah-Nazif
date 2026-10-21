import re
import json

with open('ig_page.html', 'r', encoding='utf-8') as f:
    content = f.read()

print("HTML size:", len(content))

# Look for title, description, or JSON blocks
scripts = re.findall(r'<script[^>]*>(.*?)</script>', content, re.DOTALL)
print(f"Total script tags: {len(scripts)}")

# Look for mentions of froshgahnazef or nazif
matches = re.findall(r'.{0,100}(?:nazef|nazif|فروشگاه|نظیف).{0,100}', content, re.IGNORECASE)
print(f"Occurrences found: {len(matches)}")
for m in matches[:10]:
    print("Match:", repr(m))

# Search for any profile_pic_url
pics = re.findall(r'https?://[^\s"\\]+?(?:fbcdn|cdninstagram)[^\s"\\]+', content)
print(f"CDN links found: {len(pics)}")
for p in set(pics[:15]):
    print("CDN:", p)

