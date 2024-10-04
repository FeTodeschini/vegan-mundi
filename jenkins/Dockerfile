# Creates a custom image container with Jenkins, node and npm. 
# docker-compose.yaml build the image based on the definition in this Dockerfile
FROM jenkins/jenkins:lts

USER root

# Update package lists and install Node.js and npm
RUN apt-get update && \
    apt-get install -y nodejs npm && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Switch back to the jenkins user
USER jenkins