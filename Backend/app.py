from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import os, time
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for testing; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Google Generative AI
genai.configure(api_key=os.environ['GOOGLE_API_KEY'])


# Define request body model
class PostText(BaseModel):
    text: str

# Define the model instance
model = genai.GenerativeModel("gemini-1.5-flash")

@app.post("/generate_comment")
async def generate_comment(post_text: PostText):
    try:
        time.sleep(3)
        response = model.generate_content(f"""                       
                                          
       You are viewing a LinkedIn post in your feed. Carefully analyze the post, considering its tone, sentiment, and key technical points. Based on this analysis, write a short, professional, and insightful comment that:

        Highlights a specific technical part of the post that stood out to you, demonstrating your engagement and understanding of the topic.
        Adds value by sharing relevant thoughts, an additional technical insight, or an experience that complements or builds on the post’s content.
        Ends with a thoughtful, open-ended question that sparks further discussion and encourages engagement from others in the tech community.
        Make sure the comment is clear, concise, and adds real value to the discussion. Keep it professional but conversational, reflecting a tech-savvy perspective. Avoid generic responses and focus on contributing meaningfully to the topic. It should not look like an AI-generated comment and should have a human touch in it.

        Here’s the text of the post:\n\n{post_text.text}""")


        time.sleep(3)
        generated_comment = response.text.strip()
        return {"comment": generated_comment}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# uvicorn app:app --reload