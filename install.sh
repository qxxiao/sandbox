#!/bin/bash

###########################
# Docker SETUP
###########################
# uninstall old versions
sudo apt-get remove docker docker-engine docker.io containerd runc 
sudo apt-get update

sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
# set up repo
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
# install docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
echo "Docker Setup complete"

###########################
# Start Docker
###########################
chmod 777 docker-sandbox/DockerTimeout.sh
chmod 777 docker-sandbox/payload/script.sh
chmod 777 docker-sandbox/payload/javaRunner.sh

sudo service docker start
docker pull qxxiao/compile-sandbox:latest

echo "installed images:"
docker images
