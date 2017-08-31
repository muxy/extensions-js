NAME=${1:-testing}

openssl req -nodes -x509 -newkey rsa:2048 -keyout "${NAME}.key" -out "${NAME}.crt" -days 1001 -subj "/C=US/ST=Texas/L=Austin/O=Twitch/OU=web/CN=localhost.twitch.tv" -config v3.ext

echo ""
echo "Generated ${NAME}.key and ${NAME}.crt files in local directory"
echo ""

if [[ "$OSTYPE" == "darwin"* ]]; then
  echo "Installing cert into local Keychain."
  echo "To see or modify, run 'Keychain Access' app and look in the 'System' Folder"
  sudo security add-trusted-cert -d -p ssl -r trustRoot -k "/Library/Keychains/System.keychain" "${NAME}.crt"
else
  echo "Please install and trust cert at $DIR/server.crt"
  echo "See README.md to manual instructions."
fi
