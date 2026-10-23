import urllib.request
import re
import html as html_mod
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

headers = {
    'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    'Accept': '*/*'
}

# Download the profile pic using facebookexternalhit
profile_url = "https://scontent.cdninstagram.com/v/t51.2885-19/305707125_2902959926673378_3093033175608289568_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=108&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy41MzEuQzMifQ%3D%3D&_nc_ohc=5DkzCVUxtzYQ7kNvwFRczp5&_nc_oc=AdpNiPp-AW4ylyCEhJsuopyVVzg2DXl9bn1TVFABM_QPi2dZytzbxTOeyGH64fFgSB0&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_ss=7b60f&oh=00_AQNrmlFtXfdWUbblPPtWtNYDEWE6bpyv9mmpyP7LNFnXgg&oe=6AE1256B"

os.makedirs('public/assets/images', exist_ok=True)

# Try multiple user agents
for ua in [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
    'curl/7.68.0',
    'Wget/1.21.1',
]:
    try:
        req = urllib.request.Request(profile_url, headers={'User-Agent': ua, 'Referer': 'https://www.instagram.com/'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            with open('public/assets/images/logo.jpg', 'wb') as f:
                f.write(data)
            print(f"Saved logo.jpg ({len(data)} bytes) with UA: {ua[:30]}")
            break
    except Exception as e:
        print(f"Failed with {ua[:30]}: {e}")

# Also fetch the Facebook page for images
print("\nFetching Facebook page...")
fb_url = "https://www.facebook.com/share/19CowhpbCn/"
for ua in [
    'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
]:
    try:
        req = urllib.request.Request(fb_url, headers={'User-Agent': ua, 'Accept-Language': 'en-US,en;q=0.9'})
        with urllib.request.urlopen(req, timeout=15) as resp:
            fb_content = resp.read().decode('utf-8', errors='ignore')
            with open('fb_page.html', 'w', encoding='utf-8') as f:
                f.write(fb_content)
            print(f"FB page size: {len(fb_content)} with UA: {ua[:30]}")
            
            og_imgs = re.findall(r'<meta\s+property=["\']og:image["\']\s+content=["\']([^"\']+)["\']', fb_content)
            og_imgs2 = re.findall(r'content=["\']([^"\']+)["\'][^>]+property=["\']og:image["\']', fb_content)
            print("FB OG Images:", (og_imgs + og_imgs2)[:3])
            break
    except Exception as e:
        print(f"FB failed with {ua[:30]}: {e}")

