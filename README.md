# EclairJs-WordCount-App-ExpressJs

This is a simple NodeJS Express application using EclairJS and the standard Apache Spark "wordcount" example.

The intent of this example is to demonstrate hooking together a NodeJS application, Spark via EclairJS and a web UI via a web socket.

To run the demo

If docker is running with docker-machine or on a different server, please edit the JUPYTER_HOST variable in docker_env.sh

# 1. Launch the docker environment

docker pull eclairjs/minimal-gateway
docker run -p 8888:8888 -v <fullpath to location of text file>:/data eclairjs/minimal-gateway
For example, if you unzipped the files to a sub-directory "dataset" under your Downloads directory the docker run command [macOS] would be

docker run -p 8888:8888 -v /Users/<userid>/Downloads/dataset:/data eclairjs/minimal-gateway

# 2. Run the Node.js app

npm install
node --harmony app.js
Open a browser to http://localhost:3000
