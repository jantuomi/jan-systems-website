#!/bin/bash

IMAGE=registry.jan.systems/jan-systems-website:latest

set -euxo pipefail
docker build --platform linux/amd64 -t $IMAGE .
docker push $IMAGE
