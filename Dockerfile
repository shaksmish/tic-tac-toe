# pull the base image
FROM nginx:alpine

# set a working directory
WORKDIR /usr/share/nginx/html

# copy the app files
COPY . .

# expose the default nginx port
EXPOSE 80

# command to start the app
CMD ["nginx", "-g", "daemon off;"]