

NAME=$1
DIR="/Users/lars/dev/$NAME"
if [ -z $NAME ] 
then
    echo "You have to specify a name." 
    exit
fi

if [ -d $DIR ] 
then
    echo "Directory $DIR exists." 
    exit
fi

cd ~/dev && mkdir $NAME
cd $NAME
yarn init -y
npx gitignore node
git init
touch index.js
hub create $NAME
git ac -m "Lars AUTOR INIT"
git push