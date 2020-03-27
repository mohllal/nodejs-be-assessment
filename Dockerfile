# version of node to use
FROM node:12
LABEL maintainer="kareem.mohllal@bosta.co"

# make dir for the application build output
RUN mkdir -p /usr/src/
RUN chown node -R /usr/src/

# install some useful dependicies
RUN apt-get update && apt-get install -y git curl wget g++ make python bzip2

# copy package.json and install npm dependicies
WORKDIR /usr/src/
COPY package.json ./
RUN npm install

# copy all other scripts into the working directory
COPY . .

# change the root user for more security
USER node

HEALTHCHECK --interval=12s --timeout=12s --start-period=30s \  
CMD node /usr/src/healthcheck.js

EXPOSE 8088

# start command as per package.json
CMD ["npm", "start"]
