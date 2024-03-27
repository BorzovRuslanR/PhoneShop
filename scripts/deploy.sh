#!/bin/bash

# connect to the remote host prod and pull the latest image from the GitLab registry
ssh prod "cd /root && docker compose -f docker-compose.prod.yml pull"

# connect to the remote host prod and restart the Docker containers
ssh prod "cd /root && docker compose -f docker-compose.prod.yml up -d"