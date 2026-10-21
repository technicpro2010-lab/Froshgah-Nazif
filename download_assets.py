import re
import html
import urllib.request
import os

with open('bot_page.html', 'r', encoding='utf-8') as f:
    page = f.read()

# Let's find all distinct fbcdn/cdninstagram images
raw_urls = re.findall(r'https?:\\/\\/[^"\'\s]+?\.(?:jpg|jpeg|png|webp)[^"\'\s]*', page)
clean_urls = set()
for u in raw_urls:
    u = u.replace('\\/', '/').replace('&amp;', '&')
    if 'rsrc.php' not in u and ('fbcdn' in u or 'cdninstagram' in u):
        clean_urls.add(u)

os.makedirs('assets/images', exist_ok=True)

# Also let's find the post text / caption
post_texts = re.findall(r'\"accessibility_caption\":\"([^\"]+)\"', page)
print("Accessibility captions:", post_texts)

texts = re.findall(r'\"text\":\"([^\"]+)\"', page)
print("Texts:", texts)

captions = re.findall(r'\"caption\":\{[^\}]+\}', page)
print("Captions:", captions)

# Download distinct images
count = 0
for u in clean_urls:
    print("Found image URL:", u)
    # let's download
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req) as resp:
            data = resp.read()
            ext = 'jpg'
            fname = f'assets/images/product_{count+1}.{ext}'
            with open(fname, 'wb') as out:
                out.write(data)
            print(f"Saved {fname} ({len(data)} bytes)")
            count += 1
    except Exception as e:
        print("Failed to download:", e)

