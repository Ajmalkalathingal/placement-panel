

# FROM python:3.11.3-alpine

# # Add necessary packages
# RUN apk add --no-cache bash

# # Add non-root user 'celery'
# RUN addgroup -S celery && adduser -S celery -G celery

# # Set the working directory
# WORKDIR /usr/src/app

# # Copy the project files
# COPY . .

# # Install dependencies
# RUN pip install --no-cache-dir -r requirements.txt

# # Change ownership of project files to the celery user
# RUN chown -R celery:celery /usr/src/app

# # Switch to non-root user
# USER celery

# # Define the default command (this can be overridden by Docker Compose)
# CMD ["celery", "-A", "project", "worker", "--loglevel=info"]


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
# CMD celery -A celery_app worker --loglevel=INFO --concurrency=8 -O fair -P prefork -n cel_app_worker
