from flask import Flask, request, jsonify
from flask_cors import CORS

from ascii_converter import image_to_ascii
from face_detector import detect_face
from llm import generate_roast

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return "ASCII Face Roast backend is working!"


@app.route("/analyze", methods=["POST"])
def analyze():

    image = request.files["image"]
    image_bytes = image.read()

    # Convert image to ASCII
    ascii_art = image_to_ascii(image_bytes)

    # Detect face
    face_data = detect_face(image_bytes)

    # Generate AI roast
    roast = generate_roast(
        ascii_art,
        face_data
    )

    return jsonify({
        "ascii": ascii_art,
        "face": face_data,
        "roast": roast
    })


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )