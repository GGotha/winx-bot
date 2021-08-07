cd ~/ &&
mkdir ~/env &&
touch ~/env/.env.production &&
touch ~/env/docker-compose.yml &&
echo -e "TOKEN=\nPREFIX=\nMATCHES_CHANNEL_ID=\nNOTIFICATIONS_CHANNEL_ID=\n\nRIOT_GAMES_API_URL=\nRIOT_GAMES_API_TOKEN=\n\nDATABASE_ENGINE=mysql\nDB_HOST=\nDB_USER=\nDB_PASS=\nDB_NAME=" >> ~/env/.env.production &&
echo -e "version: '3'\n\nservices:\n  mysql:\n    image: mysql:5.7\n    container_name: 'winx-bot-mysql'\n    restart: always\n    ports:\n      - 3306:3306\n    environment:\n      MYSQL_DATABASE:\n      MYSQL_USER:\n      MYSQL_PASSWORD:\n      MYSQL_ROOT_PASSWORD:\n" >> ~/env/docker-compose.yml