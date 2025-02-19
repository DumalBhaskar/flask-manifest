# Stage 1: Node.js Scraper
FROM node:23-slim AS scraper

# Install dependencies
RUN apt-get update && \
    apt-get install -y chromium && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set environment variable for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Copy and install Node.js dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install


ENV SCRAPE_URL=https://example.com

# Copy scraper script
COPY scrape.js .

# Run scraper

RUN node scrape.js

# Stage 2: Python Flask Server
FROM python:3.10-slim AS server

# Install dependencies
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy scraped data and server script
COPY --from=scraper /app/scraped_data.json .
COPY server.py .

# Expose port and run server
EXPOSE 5000
ENV FLASK_APP=server.py
ENV FLASK_RUN_HOST=0.0.0.0
CMD ["flask", "run"]