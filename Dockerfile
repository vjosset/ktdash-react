# Use an official node runtime as a parent image
FROM node:22

WORKDIR /app/

# Install dependencies
COPY package.json /app/

RUN npm install
RUN npm install webpack-dev-server -g

# Add rest of the client code
COPY ./ /app/

EXPOSE 3000

CMD npm start