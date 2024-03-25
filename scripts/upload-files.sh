#!/bin/bash

ssh prod "docker compose -f docker-compose.prod.yml down"

scp docker-compose.prod.yml prod:/root/docker-compose.prod.yml
scp .env.prod prod:/root/.env.production