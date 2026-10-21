import re
import json

with open('bot_page.html', 'r', encoding='utf-8') as f:
    page = f.read()

# Let's decode unicode escapes in the page to find anything interesting
# Look for phone numbers, whatsapp, address, posts
phone_matches = re.findall(r'(\+?\d[\d\s\-\(\)]{7,}\d)', page)
print("Possible phone numbers:", set(phone_matches[:10]))

# Search for any post info, media, edges
# Instagram embeds initial data in script tags like `{"require":...}` or `xdt_api`
edges = re.findall(r'\"node\":\{[^\}]+\}', page)
print(f"Nodes found: {len(edges)}")

# Look for any .jpg or .png urls
all_imgs = re.findall(r'(https?:\\/\\/[^"\'\s]+?\.(?:jpg|jpeg|png|webp)[^"\'\s]*)', page)
clean_imgs = [img.replace('\\/', '/').replace('&amp;', '&') for img in all_imgs]
print(f"Total image URLs found: {len(clean_imgs)}")
for u in set(clean_imgs):
    print("IMG URL:", u[:120])

