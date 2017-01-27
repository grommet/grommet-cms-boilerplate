
FROM node:6.9.1
MAINTAINER author
LABEL Name=grommet-cms Version=0.0.1 
COPY package.json /tmp/package.json
RUN cd /tmp && npm install --production
RUN mkdir -p /usr/src/app && mv /tmp/node_modules /usr/src
WORKDIR /usr/src/app
COPY . /usr/src/app
EXPOSE 8003
EXPOSE 8000
CMD npm prod-start
