
from langchain_community.llms import EdenAI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI , HTTPException
from fastapi.responses import RedirectResponse
from langchain_core.output_parsers import StrOutputParser
import uvicorn
from langchain.chains import LLMChain, SimpleSequentialChain
from langchain_core.prompts import PromptTemplate
from langchain import LLMChain
from typing import Dict, Any
import os
from supabase import create_client, Client

url: str = "https://oztbqxpgyoegukvgvmdd.supabase.co"
key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96dGJxeHBneW9lZ3Vrdmd2bWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY1NDkyODEsImV4cCI6MjAzMjEyNTI4MX0.exfq72iBDEtRKPoL0fhpgHmYBf2jUaGrxfdYi4m_uTs"
supabase: Client = create_client(url, key)
app = FastAPI()
origins = ['*',"http://localhost","http://127.0.0.1:5173"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def redirect_root_to_docs():
    return RedirectResponse("/docs")
     



@app.post("/generate")
async def generate(payload :  Dict[Any, Any]) -> Dict[str,str]: 

        brand = payload['params']['brand']
        feature = payload['params']['feature']
        length = payload['params']['length']
        tone = payload['params']['tone']
        # print()
        d = {"Long" : "15-20 sentences","Medium": "8-10 sentences","Short": "4-6 sentences"}

        

        prompt = PromptTemplate(
        input_variables=["brand","feature","tone","length"],
        template=""" 
                    You are a copywriter at a marketing agency working on a brochure for a real estate developer.
                Generate a narrative flow for the real estate brochure keeping in mind the brand positioning and features of the property.

                <BRAND POSITIONING>
                {brand}
                </BRAND POSITIONING> 

                <FEATURES>
                {feature}
                </FEATURES>


                Keep the tone of the narrative {tone}
                Also make sure that the length of the copy is $ {length}
                    
                    
        """,
        )


        llm = EdenAI(edenai_api_key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYTU5M2FiNDItZTE2NS00ZWEzLTg3YzctMTYyYTI0MWI1ODlkIiwidHlwZSI6ImFwaV90b2tlbiJ9.iGkirNWTu4L7bTXUUqC6BgJPPAYWa61XryN_X8KXKKg", provider="openai", temperature=0.2, max_tokens=250)
        chain = LLMChain(prompt=prompt, llm=llm)
        

        
        out = chain.run(brand= brand, feature=feature, tone=tone, length=d[length])
        return {"output": str(out) , "code": "200" }





@app.post('/insert')
async def ins(payload :  Dict[Any, Any]) -> Dict[str,int]:
    try:
        print(payload['params'])
        brand:str = payload['params']['brand']
        feature:str = payload['params']['feature']
        length:str = payload['params']['length']
        tone:str = payload['params']['tone']
        out:str = payload["params"]['out']
        data = supabase.table('house').select("*").execute()

        print(data, len(list(data)))

        next_id = len(list(data)) + 1
        print(next_id)

        data = supabase.table('house').insert({
        "id": 111,
        "Positioning": brand,
        "Features": feature,
        "Tone": tone,
        "Length": length,
        "Output": out
        }).execute()

        print(data)
        return {"code" : 200}
    except:
        return {"code" : 400}



uvicorn.run(app,port = 8000,reload = False)