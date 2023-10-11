FROM python:3-slim

WORKDIR /app
COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY main.py main.py
COPY templates templates
COPY static static
CMD ["waitress-serve", "--call", "main:get_app"]
