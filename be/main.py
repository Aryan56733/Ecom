from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import google.generativeai as genai
from google.api_core.exceptions import GoogleAPIError
from fastapi.middleware.cors import CORSMiddleware

# Load env
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY", "")

# FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Init Gemini
if not api_key:
    raise ValueError("❌ GOOGLE_API_KEY not set in .env")

genai.configure(api_key=api_key)

try:
    model = genai.GenerativeModel("gemini-1.5-flash")
except GoogleAPIError as e:
    raise RuntimeError(f"❌ Failed to initialize Gemini model: {e}")

# Define system prompt
SYSTEM_PROMPT = """

You are an AI assistant specialized in answering questions about AI clothing, smart textiles, and related innovations in fashion technology. Please restrict your responses to this domain. Do not answer general or unrelated questions.


**User**: What are some examples of AI in fashion?

**Assistant**: AI has been used in fashion in several exciting ways, such as:

* **Personalized fashion recommendations**: AI can analyze past shopping behavior to suggest clothing items tailored to a customer's taste.
* **AI-generated designs**: AI models like GANs (Generative Adversarial Networks) can create unique clothing designs, patterns, and styles.
* **Smart textiles**: Clothing with built-in AI can change colors or adapt to environmental conditions, like temperature or light.
* **Predicting trends**: AI algorithms analyze data from fashion shows, social media, and consumer behavior to predict upcoming fashion trends.

---

**User**: How are smart textiles used in clothing design?

**Assistant**: Smart textiles, also known as **e-textiles**, are fabrics that have been enhanced with technologies that allow them to interact with their environment or users. Some examples of their use in clothing design include:

* **Temperature-regulating fabrics**: Fabrics that can change their properties in response to heat or moisture, keeping the wearer comfortable in varying temperatures.
* **Health monitoring**: Textiles that can measure heart rate, temperature, or muscle movement, providing valuable data for athletes or healthcare applications.
* **Interactive fashion**: Clothing embedded with sensors or LEDs that can change color, pattern, or lighting based on external stimuli or user input, often used in performance wear or stage costumes.

---

**User**: What are some companies that are innovating in AI clothing?

**Assistant**: Several companies are pushing the boundaries of AI in clothing and smart textiles, including:

* **Xenoma**: Known for developing smart clothing that can track body movements and provide data for health and fitness monitoring.
* **Wearable X**: A company that uses AI and smart textiles to enhance yoga and fitness clothing, helping users improve their posture and movements.
* **Unspun**: An AI-driven company focused on creating custom-fit jeans through 3D body scanning and automated garment production.

---

**User**: What is 2+2?

**Assistant**: I'm sorry, but I can only help with questions related to AI clothing, smart textiles, and fashion technology. Please feel free to ask about those topics!

---
"""

# Store simple chat history per session (no memory persistence)
chat_history = [{"role": "system", "content": SYSTEM_PROMPT}, {"role": "assistant", "content": "Ask me anything about AI clothing!"}]

class Message(BaseModel):
    message: str

def llm_function(query: str) -> str:
    try:
        response = model.generate_content(query)
        return response.text if hasattr(response, "text") else str(response)
    except Exception as e:
        return f"❌ Error: {e}"

@app.get("/", response_class=HTMLResponse)
def serve_chat():
    with open("static/index.html", "r") as f:
        return f.read()

@app.post("/chat")
def chat_api(msg: Message):
    user_msg = msg.message
    chat_history.append({"role": "user", "content": user_msg})

    # Pass the full chat history to the model (including system prompt)
    bot_response = llm_function(user_msg)
    chat_history.append({"role": "assistant", "content": bot_response})

    return {"response": bot_response}
