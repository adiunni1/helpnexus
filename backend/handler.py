"""
AWS Lambda handler (Mangum adapter).

Deploy with:  pip install mangum
              zip -r function.zip app/ handler.py requirements.txt
"""
from mangum import Mangum
from app.main import app

handler = Mangum(app, lifespan="off")
