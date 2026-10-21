import urllib.request
import re
import html
import os

headers = {
    'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    'Accept-Language': 'en-US,en;q=0.9,fa;q=0.8'
}

url = 'https://www.instagram.com/froshgah_nazef/'
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req) as resp:
        content = resp.read().decode('utf-8', errors='ignore')
        with open('ig_nazef.html', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Page size:", len(content))
        
        # Extract OG tags
        og_title = re.findall(r'<meta\s+property=["\']og:title["\']\s+content=["\']([^"\']+)["\']', content)
        og_desc  = re.findall(r'<meta\s+property=["\']og:description["\']\s+content=["\']([^"\']+)["\']', content)
        og_imgs  = re.findall(r'<meta\s+property=["\']og:image["\']\s+content=["\']([^"\']+)["\']', content)
        print("OG Title:", [html.unescape(t) for t in og_title])
        print("OG Desc:",  [html.unescape(d) for d in og_desc])
        print("OG Images:", og_imgs)
        
        # Biography & full_name
        bio = re.findall(r'"biography":"((?:[^"\\]|\\.)*)"', content)
        full_name = re.findall(r'"full_name":"((?:[^"\\]|\\.)*)"', content)
        website = re.findall(r'"website":"((?:[^"\\]|\\.)*)"', content)
        username = re.findall(r'"username":"((?:[^"\\]|\\.)*)"', content)
        followers = re.findall(r'"edge_followed_by":\{"count":(\d+)\}', content)
        following = re.findall(r'"edge_follow":\{"count":(\d+)\}', content)
        posts_count = re.findall(r'"edge_owner_to_timeline_media":\{"count":(\d+)', content)
        
        print("\nBio raw:", bio[:2])
        print("Full name:", full_name[:2])
        print("Website:", website[:2])
        print("Username:", username[:3])
        print("Followers:", followers[:2])
        print("Following:", following[:2])
        print("Posts:", posts_count[:2])
        
        # All image URLs from post media
        post_imgs = re.findall(r'https?:\\/\\/[^"\'\s]+?\.(?:jpg|jpeg|png)[^"\'\s]*', content)
        clean = list(set(u.replace('\\/', '/').replace('&amp;', '&') for u in post_imgs if ('fbcdn' in u or 'cdninstagram' in u) and 'rsrc.php' not in u))
        print(f"\nAll post/media images found: {len(clean)}")
        for u in clean[:20]:
            print(" IMG:", u[:120])

except Exception as e:
    print("Error:", e)

