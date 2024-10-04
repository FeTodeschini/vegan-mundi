# Creates a custom image container with Jenkins, node and npm. 
# docker-compose.yaml build the image based on the definition in this Dockerfile
FROM jenkins/jenkins:lts

# Switch to root user to install Node.js
USER root

# Install Node.js and npm
RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Switch back to jenkins user
USER jenkins