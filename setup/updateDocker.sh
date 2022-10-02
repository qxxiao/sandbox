#!/bin/bash
echo "Creating Docker Image【tag: compile-sandbox】"
docker build -t 'compile-sandbox' - < Dockerfile
echo "Retrieving Installed Docker Images"
docker images