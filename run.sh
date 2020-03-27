#!/bin/bash
set -e

# Trick to get directory that script is located in
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"

docker build -t searchservice .
docker tag searchservice mohllal/searchservice
docker stop searchservice && docker container rm searchservice
docker container run -p 8088:8088 --name searchservice -d searchservice