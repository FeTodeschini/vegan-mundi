FROM jenkins/jenkins:lts

USER root

# Install curl
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install nvm and Node.js
ENV NVM_DIR=/root/.nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash && \
    . $NVM_DIR/nvm.sh && \
    nvm install node && \
    nvm use node && \
    nvm alias default node && \
    echo "export PATH=\$NVM_DIR/versions/node/$(ls \$NVM_DIR/versions/node)/bin:\$PATH" >> /root/.bashrc

# Copy package.json and package-lock.json
COPY package*.json ./

# Install local dependencies (for the test.server.js unit test script)
RUN . $NVM_DIR/nvm.sh && npm install

USER jenkins