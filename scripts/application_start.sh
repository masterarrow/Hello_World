#!/bin/bash

#give permission for everything in the app directory
sudo chmod -R 777 /home/ec2-user/node-app

#navigate into our working directory
cd /home/ec2-user/node-app

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

#install node modules
npm install

#start node app in the background
node index.js > app.out.log 2> app.err.log < /dev/null &
