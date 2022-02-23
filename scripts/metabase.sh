#!/bin/bash

DB="prod";
COLLECTION="url-traffic";
CONTAINER_NAME="metabase-dwc";
PORT=3007;
METABASE_URL="http://localhost:$PORT";

openMetabase(){
     open -a "Google Chrome" "$METABASE_URL";
}

restart() {
  docker restart ${CONTAINER_NAME};
}

start() {
  if [[ $(restart) ]]
  then
    echo "$CONTAINER_NAME container restarted";
  else
    echo "need to start $CONTAINER_NAME - restart failed";

    docker run -d -p $PORT:3000 \
      -v ~/metabase-data:/metabase-data \
      -e "MB_DB_FILE=/metabase-data/metabase.db" \
      --name "$CONTAINER_NAME" metabase/metabase:latest


    echo "$CONTAINER_NAME container started";
  fi

  openMetabase;
  echo "$CONTAINER_NAME container running";
}

kill() {
  (docker kill ${CONTAINER_NAME} || true) && (docker rm ${CONTAINER_NAME} || true) && echo "$CONTAINER_NAME container killed";
}

update(){
    docker pull metabase/metabase:latest;
    startDocker;
}

"$@"
