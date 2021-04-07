from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import ORJSONResponse
from starlette.templating import Jinja2Templates, _TemplateResponse
from starlette.requests import Request

import mimetypes
mimetypes.init()
mimetypes.add_type('application/javascript', '.js')


app = FastAPI(
    title='Tutorial App',
    description='App for learing FastAPI',
    version='0.9 beta',
)

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")
jinja_env = templates.env

def canvas(request: Request):
    # mimetypes.add_type('application/javascript', '.js')
    return templates.TemplateResponse('testCanvas.html', {'request': request})

def index(request: Request):
    return templates.TemplateResponse('index.html', {'request': request})