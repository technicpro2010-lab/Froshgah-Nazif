import os
import shutil

# Check sizes of images
for f in os.listdir('assets/images'):
    p = os.path.join('assets/images', f)
    print(f, os.path.getsize(p), "bytes")

# copy logo.jpg to assets/images/logo.jpg
shutil.copyfile('logo.jpg', 'assets/images/logo.jpg')
# product_10 is the 223KB full-res picture of the Afghan dress/Gand Afghani
shutil.copyfile('assets/images/product_10.jpg', 'assets/images/gand_afghani_showcase.jpg')
print("Assets organized successfully!")

