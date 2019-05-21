import ProgressBar from 'progress'
import { exec } from 'child-process-promise'
import args from 'args'

const fs = require("fs-extra");

args
    .option('name', 'Project name')
    .command('create', 'Create yeah')

const flags = args.parse(process.argv)

let pwd = "/Users/lars/dev"

var command = (cmd) => {
    return new Promise(function (resolve, reject) {
        console.log(cmd)
        return exec("cd "+pwd+" && " + cmd).then(result => {

            var stdout = result.stdout;
            var stderr = result.stderr;
            // console.log('stdout: ', stdout);
            // console.log('stderr: ', stderr);
            
            // var stdout = result.stdout;
            // var stderr = result.stderr;
            // console.log('stdout: ', stdout);
            // console.log('stderr: ', stderr);

            return resolve(stdout)
        }).catch(err => {
            var stdout = err.stdout;
            var stderr = err.stderr;
            console.log('err: ', err);
            console.log('stderr: ', stderr);
            console.log('stdout: ', stdout);
            console.log("⚠️------⚠️")
            reject('yo')
        })
    });
} 

async function hello() {
    console.log(flags)
    var { name } = flags
    var bar = new ProgressBar(':bar', { total: 10 });

    var dir = "/Users/lars/dev/" + flags.name

    if (typeof name == "undefined") {
        return quit("You have to specify name you looser")
    }

    if (await fs.pathExists(dir)) {
        return quit("Folder already exists")
    }
    

    await command('cd ~/dev && npx create-react-app ' + name)
    pwd = "/Users/lars/dev/"+flags.name
    await command('npx gitignore node ' + name)
    await command('git init ' + name)
    await command('hub create ' + name)
    await command('yarn add gh-pages')
    await command('yarn add --dev react-app-rewired customize-cra @babel/plugin-proposal-optional-chaining')
    var packageObj = await fs.readJson(pwd + '/package.json')
    await fs.copy('./config-overrides.js', pwd + '/config-overrides.js')
    packageObj.homepage = "https://larskarbo.github.io/" + name
    packageObj.scripts.predeploy = "yarn build"
    packageObj.scripts.deploy = "gh-pages -d build"
    packageObj.scripts.start = "react-app-rewired start"
    packageObj.scripts.build = "react-app-rewired build"
    packageObj.scripts.test = "react-app-rewired test --env=jsdom"
    await fs.outputJson(pwd + '/package.json', packageObj)
    await command('yarn deploy')
    await command('git ac  -m "Create a React app and publish it to GitHub Pages"')
    await command('git push origin master')

}

function quit(str) {
    console.log(" ⚠️ quitting, ", str)
}

hello()

var co = `
const {
    override,
    addBabelPlugin,
} = require("customize-cra");

module.exports = override(
    addBabelPlugin("@babel/plugin-proposal-optional-chaining")
)
`