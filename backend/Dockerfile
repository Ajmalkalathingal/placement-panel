FROM python:3.12.0-alpine

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install necessary system dependencies
RUN apk add --no-cache zlib-dev jpeg-dev gcc musl-dev

# Upgrade pip
RUN pip install --upgrade pip

# Install Python dependencies from requirements.txt
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt

# Copy the rest of the application code
COPY . /usr/src/app/
