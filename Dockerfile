FROM postgres:latest AS sql_stage

ENV POSTGRES_PASSWORD Secret123
ENV POSTGRES_DB channel_first

##################################

FROM node:18.12.1 AS client_stage

WORKDIR /usr/src/client
COPY /client/package*.json ./
RUN npm install
COPY ./client .
EXPOSE 3000
CMD [ "npm", "start" ]

##################################

FROM node:18.12.1 AS server_stage

WORKDIR /usr/src/server
COPY /server/package*.json ./
COPY ./server .
RUN npm install
EXPOSE 3002
CMD npm start