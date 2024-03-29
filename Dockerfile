# Production Build

# Stage 1: Build react client
FROM node:10.16-alpine as client

# Working directory be app
WORKDIR /usr/app/client/

COPY client/package*.json ./

# Install dependencies
RUN npm install

# copy local files to app folder
COPY client/ ./

RUN npm run build

# Stage 2 : Build Server

FROM node:10.16-alpine

WORKDIR /usr/src/app/
COPY --from=client /usr/app/client/build/ ./client/build/

WORKDIR /usr/src/app/api/
COPY api/package*.json ./
RUN npm install -qy
COPY api/ ./

ENV PORT 8080

EXPOSE 8080

CMD ["npm", "start"]