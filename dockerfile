FROM node:20.12.2
RUN mkdir -p myfruitjs/server
WORKDIR /myfruitjs/server
COPY server /myfruitjs/server
EXPOSE 3000
RUN npm install
CMD ["npm", "start"]