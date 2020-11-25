

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

cd ~/dev && npx create-react-app $NAME --template typescript
cd $NAME
npx gitignore node
yarn add node-sass
cp ~/dev/autor/netlify.toml .
git init
hub create $NAME
git ac -m "Lars AUTOR INIT"
git push
