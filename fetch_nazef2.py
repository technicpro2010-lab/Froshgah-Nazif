import urllib.request
import re
import html as html_mod
import sys
import os

# Force UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

headers = {
    'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    'Accept-Language': 'en-US,en;q=0.9,fa;q=0.8'
}

url = 'https://www.instagram.com/froshgah_nazef/'
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req, timeout=30) as resp:
        content = resp.read().decode('utf-8', errors='ignore')
        with open('ig_nazef.html', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Page size:", len(content))

        og_title = re.findall(r'<meta\s+property=["\']og:title["\']\s+content=["\']([^"\']+)["\']', content)
        og_desc  = re.findall(r'<meta\s+property=["\']og:description["\']\s+content=["\']([^"\']+)["\']', content)
        og_imgs  = re.findall(r'<meta\s+property=["\']og:image["\']\s+content=["\']([^"\']+)["\']', content)
        
        print("OG Title:", [html_mod.unescape(t) for t in og_title])
        print("OG Desc:",  [html_mod.unescape(d) for d in og_desc])
        print("Profile pic URL:", og_imgs)

        bio = re.findall(r'"biography":"((?:[^"\\]|\\.)*)"', content)
        full_name = re.findall(r'"full_name":"((?:[^"\\]|\\.)*)"', content)
        
        print("Bio raw:", bio[:1])
        print("Full name raw:", full_name[:1])

        # All real post/media images
        post_imgs = re.findall(r'https?:\\/\\/[^"\'\s]+?\.(?:jpg|jpeg|png)[^"\'\s]*', content)
        clean = []
        seen = set()
        for u in post_imgs:
            u2 = u.replace('\\/', '/').replace('&amp;', '&')
            if ('fbcdn' in u2 or 'cdninstagram' in u2) and 'rsrc.php' not in u2:
                base = u2.split('?')[0]
                if base not in seen:
                    seen.add(base)
                    clean.append(u2)
        
        print(f"\nUnique post images found: {len(clean)}")
        for u in clean[:25]:
            print("IMG:", u[:160])

except Exception as e:
    print("Error:", type(e).__name__, str(e))

