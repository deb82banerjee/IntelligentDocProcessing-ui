FROM node:alpine as build-step
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=build-step /dist/Angular8UploadFile /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]