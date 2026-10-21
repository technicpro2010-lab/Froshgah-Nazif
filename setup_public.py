import os
import shutil

os.makedirs('public/assets/images', exist_ok=True)

# Copy logo
if os.path.exists('logo.jpg'):
    shutil.copyfile('logo.jpg', 'public/assets/images/logo.jpg')
    print("Copied logo.jpg to public/assets/images/logo.jpg")

# Copy the high-res post image
if os.path.exists('assets/images/product_10.jpg'):
    shutil.copyfile('assets/images/product_10.jpg', 'public/assets/images/product_featured.jpg')
    print("Copied product_10.jpg to public/assets/images/product_featured.jpg")

# Copy other products if any
if os.path.exists('assets/images'):
    for f in os.listdir('assets/images'):
        src = os.path.join('assets/images', f)
        dst = os.path.join('public/assets/images', f)
        if os.path.isfile(src) and not os.path.exists(dst):
            shutil.copyfile(src, dst)

print("Public assets setup complete!")

