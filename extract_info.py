import re
import html
import urllib.request

with open('bot_page.html', 'r', encoding='utf-8') as f:
    page = f.read()

# Download profile image
og_imgs = re.findall(r'<meta\s+property=["\']og:image["\']\s+content=["\']([^"\']+)["\']', page)
if og_imgs:
    img_url = html.unescape(og_imgs[0])
    print("Downloading profile pic:", img_url)
    try:
        req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp, open('logo.jpg', 'wb') as out:
            out.write(resp.read())
        print("Successfully saved logo.jpg")
    except Exception as e:
        print("Failed to save logo:", e)

# Look for JSON data or bio
# Instagram bot response often embeds JSON-LD schema or script data
json_lds = re.findall(r'<script\s+type=["\']application/ld\+json["\']>(.*?)</script>', page, re.DOTALL)
print(f"JSON-LD count: {len(json_lds)}")
for j in json_lds:
    print("JSON-LD:", j[:500])

# Search for any bio, description or post links
descriptions = re.findall(r'<meta\s+(?:name|property)=["\'](?:description|twitter:description)["\']\s+content=["\']([^"\']+)["\']', page)
print("Descriptions:", descriptions)

# Look for text or strings
matches = re.findall(r'\"biography\":\"([^\"]+)\"', page)
print("Biography:", matches)

full_name = re.findall(r'\"full_name\":\"([^\"]+)\"', page)
print("Full Name:", full_name)

# Look for post shortcodes or image URLs
shortcodes = re.findall(r'\"shortcode\":\"([^\"]+)\"', page)
print("Shortcodes:", shortcodes)

# Search for any post images / captions
display_urls = re.findall(r'\"display_url\":\"([^\"]+)\"', page)
print(f"Display URLs found: {len(display_urls)}")
for u in display_urls[:5]:
    print("Display URL:", u)

