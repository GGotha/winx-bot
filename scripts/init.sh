cd ~/ &&
apt-get update &&
snap install docker &&
docker run --name winxbot --env-file ~/env/.env.production -d gothathemyth/winx-bot:latest
docker-compose -f ~/env/docker-compose.yml up