# Use an official Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy code
COPY . .

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Add PostgreSQL wait script
COPY wait_for_db.py .

# Expose backend port
EXPOSE 8000

# Run database wait, then FastAPI server
CMD ["bash", "-c", "python wait_for_db.py && uvicorn main:app --host 0.0.0.0 --port 8000"]
