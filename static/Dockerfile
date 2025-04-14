FROM nginx:alpine
# Copy files to Nginx directory
COPY . /usr/share/nginx/html
# Explicitly expose port 80 (Nginx's default)
EXPOSE 80
# Tell Cloud Run which port to use
ENV PORT 80
# Start Nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]