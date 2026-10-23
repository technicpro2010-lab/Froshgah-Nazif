import urllib.request
import re
import sys
import os
import html as html_mod

sys.stdout.reconfigure(encoding='utf-8')

os.makedirs('public/assets/images', exist_ok=True)

# Try multiple Instagram viewer services for @froshgah_nazef posts
viewers = [
    ("dumpor", "https://dumpor.com/user/froshgah_nazef"),
    ("gramhir", "https://gramhir.com/profile/froshgah_nazef/"),
    ("instagrammernl", "https://www.instagrammernl.net/en/profile/froshgah_nazef"),
    ("insta-stalker", "https://insta-stalker.com/user/froshgah_nazef"),
    ("storiesig", "https://storiesig.info/en/user/froshgah_nazef"),
    ("fastinsta", "https://fastinsta.io/profile/froshgah_nazef/"),
    ("imgig", "https://imgig.com/profile/froshgah_nazef"),
]

ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

for name, url in viewers:
    print(f"\nTrying {name}: {url}")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': ua, 'Accept': 'text/html,*/*', 'Accept-Language': 'en-US,en;q=0.9'})
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = resp.read().decode('utf-8', errors='ignore')
            print(f"  Got {len(data)} bytes, status {resp.status}")
            
            # Find CDN images
            imgs = re.findall(r'https://[^\s"\'<>\\]+?\.(?:jpg|jpeg|png)(?:\?[^\s"\'<>\\]*)?', data)
            cdn = [html_mod.unescape(u) for u in imgs if ('cdninstagram' in u or 'fbcdn' in u) and 'rsrc.php' not in u and 's100x100' not in u and 's150x150' not in u]
            
            if cdn:
                print(f"  Found {len(cdn)} CDN images!")
                with open(f'{name}.html', 'w', encoding='utf-8') as f:
                    f.write(data)
                for u in cdn[:5]:
                    print("   IMG:", u[:120])
                break
            else:
                print(f"  No CDN images found")
    except Exception as e:
        print(f"  Error: {e}")

