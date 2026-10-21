import urllib.request
import re
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9,fa;q=0.8'
}
url = 'https://www.instagram.com/froshgahnazef/'
req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        with open('ig_page.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print("Page fetched, length:", len(html))
        
        # Look for meta tags
        for m in re.finditer(r'<meta\s+(?:property|name)="([^"]+)"\s+content="([^"]+)"', html):
            print(f"META: {m.group(1)} = {m.group(2)}")
        for m in re.finditer(r'<meta\s+content="([^"]+)"\s+(?:property|name)="([^"]+)"', html):
            print(f"META: {m.group(2)} = {m.group(1)}")
            
        # Look for image URLs
        imgs = re.findall(r'https://[^"\'\s]+\.(?:jpg|jpeg|png|webp)[^"\'\s]*', html)
        print(f"Found {len(imgs)} image-like URLs")
        for img in set(imgs[:15]):
            print("IMG:", img)
except Exception as e:
    print("Error:", e)

