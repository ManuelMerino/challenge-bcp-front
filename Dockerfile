# base image
FROM node:14.17.6 as node

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY . .
RUN npm install
RUN npm run build --prod

EXPOSE 80

FROM nginx:alpine
COPY --from=node /app/dist/challenge-bcp-front /usr/share/nginx/html
