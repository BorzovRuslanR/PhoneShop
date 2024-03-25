#!/bin/bash

if [ ! -f docker-compose.prod.yml ]; then
  cd ..
fi

ssh prod "apt-get update"
ssh prod "apt-get install nginx -y"

# Copy the Nginx configuration file to the remote host prod (for proxy to the Next.js app)
scp nginx/nginx.conf prod:/etc/nginx/sites-enabled/default

# Install certbot for HTTPS
ssh prod "snap install core; snap refresh core"
ssh prod "snap install --classic certbot"
ssh prod "ln -s /snap/bin/certbot /usr/bin/certbot"

# Get SSL certificate from Let's Encrypt (HTTPS)
ssh prod "certbot --nginx --email menejer.r@yandex.com --agree-tos --no-eff-email --force-renewal -d phoneshop.space -d www.phoneshop.space"