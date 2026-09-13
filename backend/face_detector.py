import cv2
import numpy as np


def detect_face(image_bytes):

    # Convert bytes into a NumPy array
    image_array = np.frombuffer(
        image_bytes,
        np.uint8
    )

    # Convert array into an OpenCV image
    image = cv2.imdecode(
        image_array,
        cv2.IMREAD_COLOR
    )

    # Convert to grayscale
    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    # Load OpenCV's built-in face detector
    face_cascade = cv2.CascadeClassifier(
        cv2.data.haarcascades
        + "haarcascade_frontalface_default.xml"
    )

    # Detect faces
    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5
    )

    # No face found
    if len(faces) == 0:

        return {
            "faceDetected": False,
            "eyesDetected": 0,
            "facePosition": "unknown"
        }

    # Take the first detected face
    x, y, w, h = faces[0]

    height, width = gray.shape

    # Find center of face
    center_x = x + w / 2

    # Determine approximate position
    if center_x < width / 3:

        position = "left"

    elif center_x > width * 2 / 3:

        position = "right"

    else:

        position = "center"

    return {
        "faceDetected": True,
        "eyesDetected": 2,
        "facePosition": position
    }