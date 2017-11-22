#/bin/bash

command="$1"

rm -rf ./build/elasticsearch-*/data

PID="$(lsof -i :9200 | awk '{print $2}'| sed -n '2p')"
if [ ! -z "$PID" ]; then
  echo "*** Stopping: $PID"
  $(kill -9 $PID)
fi

if [ "$command" == "stop" ]; then
  exit 0
fi

mkdir -p build
cd build

if [ ! -f "elasticsearch.zip" ]; then
  echo "*** Dowloading Elasticsearch"
  curl https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.6.0.zip > elasticsearch.zip
  echo "*** Unzipping"
  unzip elasticsearch.zip
fi

printf "*** Starting"
./elasticsearch-*/bin/elasticsearch > elasticsearch.log &

status="unknown"

tries=0

while [ "$status" != "green" ]; do

  printf "."
  sleep 1
  status=$(curl --silent http://localhost:9200/_cluster/health | grep -Po '(?<="status":")[^"]+')
  tries=$((tries+1))

  if [ "$tries" -gt "60" ]; then
    echo "fail"
    echo "!!! Timeout waiting for Elasticsearch to start!"
    exit 1
  fi

done

echo "done"
echo "*** Started [status=$status]"

echo "*** Creating schema"
#node ./scripts/create-schema.js
