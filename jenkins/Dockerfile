FROM jenkins/jenkins:lts

USER root

# Install curl and other dependencies
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

# Install express and axios
RUN . $NVM_DIR/nvm.sh && npm install -g express axios

USER jenkins