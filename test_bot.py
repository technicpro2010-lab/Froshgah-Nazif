import urllib.request
import re

user_agents = [
    'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    'Twitterbot/1.0',
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    'WhatsApp/2.21.12.21 A',
    'TelegramBot (like TwitterBot)'
]

url = 'https://www.instagram.com/froshgahnazef/'

for ua in user_agents:
    print("Testing UA:", ua)
    req = urllib.request.Request(url, headers={'User-Agent': ua, 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            print(f"Success! Status: {resp.status}, length: {len(content)}")
            og_imgs = re.findall(r'<meta\s+property=["\']og:image["\']\s+content=["\']([^"\']+)["\']', content)
            og_desc = re.findall(r'<meta\s+property=["\']og:description["\']\s+content=["\']([^"\']+)["\']', content)
            og_title = re.findall(r'<meta\s+property=["\']og:title["\']\s+content=["\']([^"\']+)["\']', content)
            print("OG Title:", og_title)
            print("OG Desc:", og_desc)
            print("OG Imgs:", og_imgs)
            if og_imgs:
                with open('bot_page.html', 'w', encoding='utf-8') as f:
                    f.write(content)
                break
    except Exception as e:
        print("Failed:", e)

