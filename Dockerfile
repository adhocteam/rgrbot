FROM ubuntu:latest
RUN apt-get update
RUN apt-get install -y gcc g++ make build-essential
RUN apt-get install -y curl gnupg2
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
COPY . .
RUN npm install
ENTRYPOINT [ "/bin/hubot", "-a", "slack", "--name", "rgrbot" ]
