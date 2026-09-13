from PIL import Image
import io


ASCII_CHARS = "@#*:. "


def image_to_ascii(image_bytes):

    # Convert the uploaded bytes into an image
    image = Image.open(io.BytesIO(image_bytes))

    # Convert image to grayscale
    image = image.convert("L")

    # Decide how wide the ASCII image should be
    width = 60

    # Calculate height while accounting for character proportions
    ratio = image.height / image.width
    height = int(width * ratio * 0.5)

    # Resize image
    image = image.resize((width, height))

    # Get all pixels
    pixels = image.getdata()

    ascii_art = ""

    for i, pixel in enumerate(pixels):

        # Convert brightness (0-255)
        # into an ASCII character
        index = pixel * (len(ASCII_CHARS) - 1) // 255

        ascii_art += ASCII_CHARS[index]

        # Start a new line
        if (i + 1) % width == 0:
            ascii_art += "\n"

    return ascii_art