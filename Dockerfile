# Use nginx to serve the application ##
FROM nginx:alpine
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
## Copy over the artifacts in dist folder to default nginx public folder
COPY /dist/MoneyShare /usr/share/nginx/html
## Not actually used, more for Doc purposes
EXPOSE 80 443
## nginx will run in the forground
CMD [ "nginx", "-g", "daemon off;" ]
