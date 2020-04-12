

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

cd ~/dev && npx create-react-app $NAME
cd $NAME
npx gitignore node $NAME
git init
hub create $NAME
git ac -m "Lars AUTOR INIT"
git push