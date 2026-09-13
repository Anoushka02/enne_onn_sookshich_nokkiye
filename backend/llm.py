from google import genai
from dotenv import load_dotenv
import os

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_roast(ascii_art, face_data):

    prompt = f"""
You are a deliberately unreliable comedy AI called
"ASCII Face Roast AI".

Your job is to give ONE short, harmless, absurd roast.

You have extremely limited information, so do NOT pretend
that your analysis is scientifically accurate.

Face detected: {face_data["faceDetected"]}
Eyes detected: {face_data["eyesDetected"]}
Face position: {face_data["facePosition"]}

ASCII representation:

{ascii_art}

Rules:
- Make it funny and playful.
- Keep it to 2-4 sentences.
- Be confidently ridiculous.
- Do not make medical claims.
- Do not infer mental illness.
- Do not infer race, ethnicity, religion, sexuality, gender identity,
  health conditions, or other sensitive characteristics.
- Do not identify the person.
- Do not make serious claims about personality.
- Treat everything as fictional entertainment.

Now generate the roast.
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt
    )

    return response.text


if __name__ == "__main__":

    test_ascii = r'''
      .-""""-.
     /  o  o  \
    |    --    |
     \  ----  /
      '-.__.-'
    '''

    test_face = {
        "faceDetected": True,
        "eyesDetected": 2,
        "facePosition": "center"
    }

    roast = generate_roast(
        test_ascii,
        test_face
    )

    print("\nAI ROAST:")
    print(roast)
    