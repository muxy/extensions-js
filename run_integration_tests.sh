echo 'starting docker'
cd $GOPATH/src/bitbucket.org/muxy/lambda-extension-state/docker
docker-compose up -d psql redis web
cd -

while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:5000/v1/e/echo)" != "200" ]];
do sleep 1;
done

echo "running tests"
npm run test:integration
cd $GOPATH/src/bitbucket.org/muxy/lambda-extension-state/docker
docker-compose down
cd -
