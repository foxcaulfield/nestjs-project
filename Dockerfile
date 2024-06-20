# Base image
FROM node:22 as base

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

EXPOSE 3000

# CMD [ "sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run start:dev; else node dist/main.js; fi" ]

# # Production stage
# FROM base as production

# # Start the server using the production build
CMD ["node", "dist/main.js"]

# # Development stage
# FROM base as development

# # Start the server using the development command
# CMD ["npm", "run", "start:dev"]
