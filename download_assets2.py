import urllib.request
import re
import sys
import os
import html as html_mod

sys.stdout.reconfigure(encoding='utf-8')

os.makedirs('public/assets/images', exist_ok=True)

# Download Facebook page cover/profile from lookaside
fb_media_url = "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100063801979914"

print("Downloading FB page image...")
for ua in [
    'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120',
]:
    try:
        req = urllib.request.Request(fb_media_url, headers={'User-Agent': ua})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            with open('public/assets/images/fb_cover.jpg', 'wb') as f:
                f.write(data)
            print(f"Saved fb_cover.jpg ({len(data)} bytes)")
            # also use as logo since both pages are same store
            with open('public/assets/images/logo.jpg', 'wb') as f:
                f.write(data)
            print("Also saved as logo.jpg")
            break
    except Exception as e:
        print(f"Failed: {e}")

# Fetch Instagram individual post pages to get images
# The instagram user has 199 posts - try to get a few via graph API shortcut
# Try fetching picuki or similar
print("\nTrying Picuki for @froshgah_nazef...")
picuki_url = "https://www.picuki.com/profile/froshgah_nazef"
try:
    req = urllib.request.Request(
        picuki_url,
        headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml',
            'Accept-Language': 'en-US,en;q=0.9',
        }
    )
    with urllib.request.urlopen(req, timeout=15) as resp:
        pdata = resp.read().decode('utf-8', errors='ignore')
        with open('picuki.html', 'w', encoding='utf-8') as f:
            f.write(pdata)
        print("Picuki page size:", len(pdata))
        imgs = re.findall(r'https://[^\s"\'<>]+?\.(?:jpg|jpeg|png)(?:\?[^\s"\'<>]*)?', pdata)
        cdn_imgs = [html_mod.unescape(u) for u in imgs if ('cdninstagram' in u or 'fbcdn' in u)]
        print(f"CDN images from picuki: {len(cdn_imgs)}")
        for u in cdn_imgs[:10]:
            print(" ", u[:130])
except Exception as e:
    print("Picuki error:", e)

# Try imginn
print("\nTrying imginn for @froshgah_nazef...")
imginn_url = "https://imginn.com/froshgah_nazef/"
try:
    req = urllib.request.Request(
        imginn_url,
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'}
    )
    with urllib.request.urlopen(req, timeout=15) as resp:
        idata = resp.read().decode('utf-8', errors='ignore')
        with open('imginn.html', 'w', encoding='utf-8') as f:
            f.write(idata)
        print("Imginn page size:", len(idata))
        imgs = re.findall(r'https://[^\s"\'<>]+?\.(?:jpg|jpeg|png)(?:\?[^\s"\'<>]*)?', idata)
        cdn_imgs = [html_mod.unescape(u) for u in imgs if ('cdninstagram' in u or 'fbcdn' in u)]
        print(f"CDN images from imginn: {len(cdn_imgs)}")
        for u in cdn_imgs[:10]:
            print(" ", u[:130])
except Exception as e:
    print("Imginn error:", e)

