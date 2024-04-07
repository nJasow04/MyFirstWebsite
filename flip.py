from PIL import Image

image_path = "menotflipped.JPG"
print("Opening Image...")
image = Image.open(image_path)
print("Image opened successfully!")
print(image.size)

# Flip the image horizontally
flipped_image = image.transpose(Image.FLIP_LEFT_RIGHT)

flipped_image.save("me.JPG", "JPEG")

print("Flipped image saved as me.JPG")