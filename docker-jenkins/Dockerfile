FROM jenkins/jenkins:lts

USER root

# Install necessary packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    openssh-client \
    build-essential \
    python3 \
    python3-pip \
    zip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install NVM and Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# RUN mkdir -p $NVM_DIR && \
#     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash && \
#     bash -c "export NVM_DIR=$NVM_DIR && . $NVM_DIR/nvm.sh && \
#     nvm install $NODE_VERSION && \
#     ln -s $NVM_DIR/versions/node/v$NODE_VERSION/bin/node /usr/bin/node && \
#     ln -s $NVM_DIR/versions/node/v$NODE_VERSION/bin/npm /usr/bin/npm"

# Install PM2, yarn and otther dependencies globally
RUN npm install -g pm2 node-pre-gyp cross-env

# Add NPM global binaries to PATH
# ENV PATH=$PATH:$NVM_DIR/versions/node/v$NODE_VERSION/bin

# Switch back to jenkins user
USER jenkins

# Set the working directory for Jenkins jobs
WORKDIR /var/jenkins_home