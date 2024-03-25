#!/bin/bash

# Assign your Docker image name to a variable
DOCKER_IMAGE="registry.gitlab.com/russelgroup/eshoptelephone"

# If there is no Dockerfile in the current directory, cd to the parent directory
if [ ! -f Dockerfile ]; then
  cd ..
fi

# Build the Docker image
docker build -t $DOCKER_IMAGE .

# Check the status of the previous command
if [ $? -eq 0 ]; then
  echo "Docker build successful, proceeding to push the image."
  
  # Push the Docker image
  docker push $DOCKER_IMAGE
  
  # Check the status of the push command
  if [ $? -eq 0 ]; then
    echo "Docker image pushed successfully."
  else
    echo "Failed to push Docker image. Please check the error messages above."
  fi

else
  echo "Docker build failed. Please check the error messages above."
fi