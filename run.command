#! /bin/bash
echo "Hello! It is JS_test_app from first channel v0.1"

docker network create channel-first-net

docker build . -t channel_first/db --target sql_stage
docker run -p 5432:5432 -d --net channel-first-net --name channel-first-db channel_first/db

docker build . -t channel_first/js_test_front --target client_stage
docker run -p 3000:3000 -d --net channel-first-net --name channel-first-front channel_first/js_test_front

docker build . -t channel_first/js_test_server --target server_stage
docker run -p 3002:3002 -d --net channel-first-net --name channel-first-server channel_first/js_test_server

docker exec -it channel-first-server npm run db-up