# Use nginx alpine for a lightweight base image
FROM nginx:alpine

# Copy the game files to nginx html directory
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY README.md /usr/share/nginx/html/

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3099
EXPOSE 3099

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 