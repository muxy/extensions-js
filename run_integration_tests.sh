echo 'starting wait' && \
  sh -c 'while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:5000/v1/e/echo)" != "200" ]]; do sleep 1; done' && \
  sh -c 'echo "done" && npm run test:integration ; cd $GOPATH/src/bitbucket.org/muxy/lambda-extension-state/docker && sudo docker-compose down' &

echo 'starting docker' && \
  cd $GOPATH/src/bitbucket.org/muxy/lambda-extension-state/docker && \
  sudo docker-compose up
