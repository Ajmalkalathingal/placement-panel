# FROM python:3.12.0-alpine

# WORKDIR /usr/src/app

# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1

# # Install necessary system dependencies
# RUN apk add --no-cache zlib-dev jpeg-dev gcc musl-dev

# # Upgrade pip
# RUN pip install --upgrade pip

# # Install Python dependencies from requirements.txt
# COPY ./requirements.txt /usr/src/app/requirements.txt
# RUN pip install -r requirements.txt

# # Copy the rest of the application code
# COPY . /usr/src/app/


# Dockerfile for Celery Worker and Beat

FROM python:3.11.3-alpine

# Add necessary packages
RUN apk add --no-cache bash

# Add non-root user 'celery'
RUN addgroup -S celery && adduser -S celery -G celery

# Set the working directory
WORKDIR /usr/src/app

# Copy the project files
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Change ownership of project files to the celery user
RUN chown -R celery:celery /usr/src/app

# Switch to non-root user
USER celery

# Define the default command (this can be overridden by Docker Compose)
CMD ["celery", "-A", "project", "worker", "--loglevel=info"]
