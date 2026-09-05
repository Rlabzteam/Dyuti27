# Official PHP with Apache image for Render deployment
FROM php:8.2-apache

# Install required PHP extensions (PDO MySQL, cURL, OpenSSL)
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    && docker-php-ext-install pdo pdo_mysql curl \
    && a2enmod rewrite headers \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /var/www/html

# Copy the API backend files
COPY public/api/ /var/www/html/api/

# Health check index file
RUN echo "<?php header('Content-Type: application/json'); echo json_encode(['status' => 'online', 'service' => 'DYUTI 2027 API Server']); ?>" > /var/www/html/index.php

# Expose HTTP port
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
