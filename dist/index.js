/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ProgressBar = __webpack_require__(/*! progress */ \"progress\");\n\nconst {\n  exec\n} = __webpack_require__(/*! child-process-promise */ \"child-process-promise\");\n\nconst args = __webpack_require__(/*! args */ \"./node_modules/args/lib/index.js\");\n\nconst fs = __webpack_require__(/*! fs-extra */ \"./node_modules/fs-extra/lib/index.js\");\n\nargs.option('name', 'Project name').command('create', 'Create yeah');\nconst flags = args.parse(process.argv);\nlet pwd = \"/Users/lars/dev\";\n\nvar command = cmd => {\n  return new Promise(function (resolve, reject) {\n    console.log(cmd);\n    return exec(\"cd \" + pwd + \" && \" + cmd).then(result => {\n      var stdout = result.stdout;\n      var stderr = result.stderr; // console.log('stdout: ', stdout);\n      // console.log('stderr: ', stderr);\n      // var stdout = result.stdout;\n      // var stderr = result.stderr;\n      // console.log('stdout: ', stdout);\n      // console.log('stderr: ', stderr);\n\n      return resolve(stdout);\n    }).catch(err => {\n      var stdout = err.stdout;\n      var stderr = err.stderr;\n      console.log('err: ', err);\n      console.log('stderr: ', stderr);\n      console.log('stdout: ', stdout);\n      console.log(\"⚠️------⚠️\");\n      reject('yo');\n    });\n  });\n};\n\nasync function hello() {\n  console.log(flags);\n  var {\n    name\n  } = flags;\n  var bar = new ProgressBar(':bar', {\n    total: 10\n  });\n  var dir = \"/Users/lars/dev/\" + flags.name;\n\n  if (typeof name == \"undefined\") {\n    return quit(\"You have to specify name you looser\");\n  }\n\n  if (await fs.pathExists(dir)) {\n    return quit(\"Folder already exists\");\n  }\n\n  await command('cd ~/dev && npx create-react-app ' + name);\n  pwd = \"/Users/lars/dev/\" + flags.name;\n  await command('npx gitignore node ' + name);\n  await command('git init ' + name);\n  await command('hub create ' + name);\n  await command('yarn add --dev gh-pages');\n  await command('yarn add --dev react-app-rewired customize-cra @babel/plugin-proposal-optional-chaining');\n  var packageObj = await fs.readJson(pwd + '/package.json');\n  await fs.copy('./config-overrides.js', pwd + '/config-overrides.js');\n  packageObj.homepage = \"https://larskarbo.github.io/\" + name;\n  packageObj.scripts.predeploy = \"yarn build\";\n  packageObj.scripts.deploy = \"gh-pages -d build\";\n  packageObj.scripts.start = \"react-app-rewired start\";\n  packageObj.scripts.build = \"react-app-rewired build\";\n  packageObj.scripts.test = \"react-app-rewired test --env=jsdom\";\n  await fs.outputJson(pwd + '/package.json', packageObj);\n  await command('yarn deploy');\n  await command('git ac  -m \"Create a React app and publish it to GitHub Pages\"');\n  await command('git push origin master');\n}\n\nfunction quit(str) {\n  console.log(\" ⚠️ quitting, \", str);\n}\n\nhello();\nvar co = `\nconst {\n    override,\n    addBabelPlugin,\n} = require(\"customize-cra\");\n\nmodule.exports = override(\n    addBabelPlugin(\"@babel/plugin-proposal-optional-chaining\")\n)\n`;\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./node_modules/args/lib sync recursive":
/*!************************************!*\
  !*** ./node_modules/args/lib sync ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = function() { return []; };\nwebpackEmptyContext.resolve = webpackEmptyContext;\nmodule.exports = webpackEmptyContext;\nwebpackEmptyContext.id = \"./node_modules/args/lib sync recursive\";\n\n//# sourceURL=webpack:///./node_modules/args/lib_sync?");

/***/ }),

/***/ "./node_modules/args/lib/command.js":
/*!******************************************!*\
  !*** ./node_modules/args/lib/command.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function(usage, description, init, aliases) {\n  if (Array.isArray(init)) {\n    aliases = init\n    init = undefined\n  }\n\n  if (aliases && Array.isArray(aliases)) {\n    usage = [].concat([usage], aliases)\n  }\n\n  // Register command to global scope\n  this.details.commands.push({\n    usage,\n    description,\n    init: typeof init === 'function' ? init : false\n  })\n\n  // Allow chaining of .command()\n  return this\n}\n\n\n//# sourceURL=webpack:///./node_modules/args/lib/command.js?");

/***/ }),

/***/ "./node_modules/args/lib/example.js":
/*!******************************************!*\
  !*** ./node_modules/args/lib/example.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function(usage, description) {\n  if (typeof usage !== 'string' || typeof description !== 'string') {\n    throw new TypeError(\n      'Usage for adding an Example: args.example(\"usage\", \"description\")'\n    )\n  }\n\n  this.details.examples.push({ usage, description })\n\n  return this\n}\n\n\n//# sourceURL=webpack:///./node_modules/args/lib/example.js?");

/***/ }),

/***/ "./node_modules/args/lib/examples.js":
/*!*******************************************!*\
  !*** ./node_modules/args/lib/examples.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function(list) {\n  if (list.constructor !== Array) {\n    throw new Error('Item passed to .examples is not an array')\n  }\n\n  for (const item of list) {\n    const usage = item.usage || false\n    const description = item.description || false\n    this.example(usage, description)\n  }\n\n  return this\n}\n\n\n//# sourceURL=webpack:///./node_modules/args/lib/examples.js?");

/***/ }),

/***/ "./node_modules/args/lib/help.js":
/*!***************************************!*\
  !*** ./node_modules/args/lib/help.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function() {\n  const name = this.config.name || this.binary.replace('-', ' ')\n  const firstBig = word => word.charAt(0).toUpperCase() + word.substr(1)\n\n  const parts = []\n\n  const groups = {\n    commands: true,\n    options: true,\n    examples: true\n  }\n\n  for (const group in groups) {\n    if (this.details[group].length > 0) {\n      continue\n    }\n\n    groups[group] = false\n  }\n\n  const optionHandle = groups.options ? '[options] ' : ''\n  const cmdHandle = groups.commands ? '[command]' : ''\n  const value =\n    typeof this.config.value === 'string' ? ' ' + this.config.value : ''\n\n  parts.push([\n    `  Usage: ${this.printMainColor(name)} ${this.printSubColor(\n      optionHandle + cmdHandle + value\n    )}`,\n    ''\n  ])\n\n  for (const group in groups) {\n    if (!groups[group]) {\n      continue\n    }\n\n    parts.push(['', firstBig(group) + ':', ''])\n\n    if (group === 'examples') {\n      parts.push(this.generateExamples())\n    } else {\n      parts.push(this.generateDetails(group))\n    }\n\n    parts.push(['', ''])\n  }\n\n  let output = ''\n\n  // And finally, merge and output them\n  for (const part of parts) {\n    output += part.join('\\n  ')\n  }\n\n  if (!groups.commands && !groups.options) {\n    output = 'No sub commands or options available'\n  }\n\n  const { usageFilter } = this.config\n\n  // If filter is available, pass usage information through\n  if (typeof usageFilter === 'function') {\n    output = usageFilter(output) || output\n  }\n\n  console.log(output)\n\n  if (this.config.exit && this.config.exit.help) {\n    // eslint-disable-next-line unicorn/no-process-exit\n    process.exit()\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/args/lib/help.js?");

/***/ }),

/***/ "./node_modules/args/lib/index.js":
/*!****************************************!*\
  !*** ./node_modules/args/lib/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst chalk = __webpack_require__(/*! chalk */ \"chalk\")\nconst utils = __webpack_require__(/*! ./utils */ \"./node_modules/args/lib/utils.js\")\n\nconst publicMethods = {\n  option: __webpack_require__(/*! ./option */ \"./node_modules/args/lib/option.js\"),\n  options: __webpack_require__(/*! ./options */ \"./node_modules/args/lib/options.js\"),\n  command: __webpack_require__(/*! ./command */ \"./node_modules/args/lib/command.js\"),\n  parse: __webpack_require__(/*! ./parse */ \"./node_modules/args/lib/parse.js\"),\n  example: __webpack_require__(/*! ./example */ \"./node_modules/args/lib/example.js\"),\n  examples: __webpack_require__(/*! ./examples */ \"./node_modules/args/lib/examples.js\"),\n  showHelp: __webpack_require__(/*! ./help */ \"./node_modules/args/lib/help.js\"),\n  showVersion: __webpack_require__(/*! ./version */ \"./node_modules/args/lib/version.js\")\n}\n\nfunction Args() {\n  this.details = {\n    options: [],\n    commands: [],\n    examples: []\n  }\n\n  // Configuration defaults\n  this.config = {\n    exit: { help: true, version: true },\n    help: true,\n    version: true,\n    usageFilter: null,\n    value: null,\n    name: null,\n    mainColor: 'yellow',\n    subColor: 'dim'\n  }\n\n  this.printMainColor = chalk\n  this.printSubColor = chalk\n}\n\n// Assign internal helpers\nfor (const util in utils) {\n  if (!{}.hasOwnProperty.call(utils, util)) {\n    continue\n  }\n\n  Args.prototype[util] = utils[util]\n}\n\n// Assign public methods\nfor (const method in publicMethods) {\n  if (!{}.hasOwnProperty.call(publicMethods, method)) {\n    continue\n  }\n\n  Args.prototype[method] = publicMethods[method]\n}\n\nmodule.exports = new Args()\nmodule.exports.Args = Args;\n\n\n//# sourceURL=webpack:///./node_modules/args/lib/index.js?");

/***/ }),

/***/ "./node_modules/args/lib/option.js":
/*!*****************************************!*\
  !*** ./node_modules/args/lib/option.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function(name, description, defaultValue, init) {\n  let usage = []\n\n  const assignShort = (name, options, short) => {\n    if (options.find(flagName => flagName.usage[0] === short)) {\n      short = name.charAt(0).toUpperCase()\n    }\n\n    return [short, name]\n  }\n\n  // If name is an array, pick the values\n  // Otherwise just use the whole thing\n  switch (name.constructor) {\n    case String:\n      usage = assignShort(name, this.details.options, name.charAt(0))\n      break\n    case Array:\n      usage = usage.concat(name)\n      break\n    default:\n      throw new Error('Invalid name for option')\n  }\n\n  // Throw error if short option is too long\n  if (usage.length > 0 && usage[0].length > 1) {\n    throw new Error('Short version of option is longer than 1 char')\n  }\n\n  const optionDetails = {\n    defaultValue,\n    usage,\n    description\n  }\n\n  let defaultIsWrong\n\n  switch (defaultValue) {\n    case false:\n      defaultIsWrong = true\n      break\n    case null:\n      defaultIsWrong = true\n      break\n    case undefined:\n      defaultIsWrong = true\n      break\n    default:\n      defaultIsWrong = false\n  }\n\n  if (typeof init === 'function') {\n    optionDetails.init = init\n  } else if (!defaultIsWrong) {\n    // Set initializer depending on type of default value\n    optionDetails.init = this.handleType(defaultValue)[1]\n  }\n\n  // Register option to global scope\n  this.details.options.push(optionDetails)\n\n  // Allow chaining of .option()\n  return this\n}\n\n\n//# sourceURL=webpack:///./node_modules/args/lib/option.js?");

/***/ }),

/***/ "./node_modules/args/lib/options.js":
/*!******************************************!*\
  !*** ./node_modules/args/lib/options.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function(list) {\n  if (list.constructor !== Array) {\n    throw new Error('Item passed to .options is not an array')\n  }\n\n  for (const item of list) {\n    const preset = item.defaultValue\n    const init = item.init || false\n\n    this.option(item.name, item.description, preset, init)\n  }\n\n  return this\n}\n\n\n//# sourceURL=webpack:///./node_modules/args/lib/options.js?");

/***/ }),

/***/ "./node_modules/args/lib/parse.js":
/*!****************************************!*\
  !*** ./node_modules/args/lib/parse.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst path = __webpack_require__(/*! path */ \"path\")\nconst parser = __webpack_require__(/*! mri */ \"./node_modules/mri/lib/index.js\")\n\nmodule.exports = function(argv, options) {\n  // Override default option values\n  Object.assign(this.config, options)\n\n  if (Array.isArray(this.config.mainColor)) {\n    for (const item in this.config.mainColor) {\n      if (!{}.hasOwnProperty.call(this.config.mainColor, item)) {\n        continue\n      }\n\n      // Chain all colors to our print method\n      this.printMainColor = this.printMainColor[this.config.mainColor[item]]\n    }\n  } else {\n    this.printMainColor = this.printMainColor[this.config.mainColor]\n  }\n\n  if (Array.isArray(this.config.subColor)) {\n    for (const item in this.config.subColor) {\n      if (!{}.hasOwnProperty.call(this.config.subColor, item)) {\n        continue\n      }\n\n      // Chain all colors to our print method\n      this.printSubColor = this.printSubColor[this.config.subColor[item]]\n    }\n  } else {\n    this.printSubColor = this.printSubColor[this.config.subColor]\n  }\n\n  // Parse arguments using mri\n  this.raw = parser(argv.slice(1), this.config.mri || this.config.minimist)\n  this.binary = path.basename(this.raw._[0])\n\n  // If default version is allowed, check for it\n  if (this.config.version) {\n    this.checkVersion()\n  }\n\n  // If default help is allowed, check for it\n  if (this.config.help) {\n    this.checkHelp()\n  }\n\n  const subCommand = this.raw._[1]\n  const args = {}\n  const defined = this.isDefined(subCommand, 'commands')\n  const optionList = this.getOptions(defined)\n\n  Object.assign(args, this.raw)\n  args._.shift()\n\n  // Export sub arguments of command\n  this.sub = args._\n\n  // If sub command is defined, run it\n  if (defined) {\n    this.runCommand(defined, optionList)\n    return {}\n  }\n\n  // Hand back list of options\n  return optionList\n}\n\n\n//# sourceURL=webpack:///./node_modules/args/lib/parse.js?");

/***/ }),

/***/ "./node_modules/args/lib/utils.js":
/*!****************************************!*\
  !*** ./node_modules/args/lib/utils.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { spawn } = __webpack_require__(/*! child_process */ \"child_process\")\nconst path = __webpack_require__(/*! path */ \"path\")\nconst camelcase = __webpack_require__(/*! camelcase */ \"camelcase\")\nconst leven = __webpack_require__(/*! leven */ \"./node_modules/leven/index.js\")\n\nfunction similarityBestMatch(mainString, targetStrings) {\n  let bestMatch\n  const ratings = targetStrings.map(targetString => {\n    const score = leven(mainString, targetString)\n\n    const res = {\n      target: targetString,\n      rating: leven(mainString, targetString)\n    }\n\n    if (!bestMatch || score < bestMatch.rating) bestMatch = res\n\n    return res\n  })\n\n  return {\n    ratings,\n    bestMatch\n  }\n}\n\nmodule.exports = {\n  handleType(value) {\n    let type = value\n    if (typeof value !== 'function') {\n      type = value.constructor\n    }\n\n    // Depending on the type of the default value,\n    // select a default initializer function\n    switch (type) {\n      case String:\n        return ['[value]']\n      case Array:\n        return ['<list>']\n      case Number:\n      case parseInt:\n        return ['<n>', parseInt]\n      default:\n        return ['']\n    }\n  },\n\n  readOption(option) {\n    let value = option.defaultValue\n    const contents = {}\n\n    // If option has been used, get its value\n    for (const name of option.usage) {\n      const fromArgs = this.raw[name]\n      if (typeof fromArgs !== 'undefined') {\n        value = fromArgs\n      }\n    }\n\n    // Process the option's value\n    for (let name of option.usage) {\n      let propVal = value\n\n      // Convert the value to an array when the option is called just once\n      if (\n        Array.isArray(option.defaultValue) &&\n        typeof propVal !== typeof option.defaultValue\n      ) {\n        propVal = [propVal]\n      }\n\n      if (\n        typeof option.defaultValue !== 'undefined' &&\n        typeof propVal !== typeof option.defaultValue\n      ) {\n        propVal = option.defaultValue\n      }\n\n      let condition = true\n\n      if (option.init) {\n        // Only use the toString initializer if value is a number\n        if (option.init === toString) {\n          condition = propVal.constructor === Number\n        }\n\n        if (condition) {\n          // Pass it through the initializer\n          propVal = option.init(propVal)\n        }\n      }\n\n      // Camelcase option name (skip short flag)\n      if (name.length > 1) {\n        name = camelcase(name)\n      }\n\n      // Add option to list\n      contents[name] = propVal\n    }\n\n    return contents\n  },\n\n  getOptions(definedSubcommand) {\n    const options = {}\n    const args = {}\n\n    // Copy over the arguments\n    Object.assign(args, this.raw)\n    delete args._\n\n    // Set option defaults\n    for (const option of this.details.options) {\n      if (typeof option.defaultValue === 'undefined') {\n        continue\n      }\n\n      Object.assign(options, this.readOption(option))\n    }\n\n    // Override defaults if used in command line\n    for (const option in args) {\n      if (!{}.hasOwnProperty.call(args, option)) {\n        continue\n      }\n\n      const related = this.isDefined(option, 'options')\n\n      if (related) {\n        const details = this.readOption(related)\n        Object.assign(options, details)\n      }\n\n      if (!related && !definedSubcommand) {\n        // Unknown Option\n        const availableOptions = []\n        this.details.options.forEach(opt => {\n          availableOptions.push(...opt.usage)\n        })\n\n        const suggestOption = similarityBestMatch(option, availableOptions)\n\n        process.stdout.write(`The option \"${option}\" is unknown.`)\n\n        if (suggestOption.bestMatch.rating >= 0.5) {\n          process.stdout.write(' Did you mean the following one?\\n')\n\n          const suggestion = this.details.options.filter(item => {\n            for (const flag of item.usage) {\n              if (flag === suggestOption.bestMatch.target) {\n                return true\n              }\n            }\n\n            return false\n          })\n\n          process.stdout.write(\n            this.generateDetails(suggestion)[0].trim() + '\\n'\n          )\n\n          // eslint-disable-next-line unicorn/no-process-exit\n          process.exit()\n        } else {\n          process.stdout.write(` Here's a list of all available options: \\n`)\n          this.showHelp()\n        }\n      }\n    }\n\n    return options\n  },\n\n  generateExamples() {\n    const { examples } = this.details\n    const parts = []\n\n    for (const item in examples) {\n      if (!{}.hasOwnProperty.call(examples, item)) {\n        continue\n      }\n\n      const usage = this.printSubColor('$ ' + examples[item].usage)\n      const description = this.printMainColor('- ' + examples[item].description)\n      parts.push(`  ${description}\\n    ${usage}\\n`)\n    }\n\n    return parts\n  },\n\n  generateDetails(kind) {\n    // Get all properties of kind from global scope\n    const items = []\n\n    // Clone passed objects so changing them here doesn't affect real data.\n    const passed = [].concat(\n      typeof kind === 'string' ? this.details[kind] : kind\n    )\n    for (let i = 0, l = passed.length; i < l; i++) {\n      items.push(Object.assign({}, passed[i]))\n    }\n\n    const parts = []\n    const isCmd = kind === 'commands'\n\n    // Sort items alphabetically\n    items.sort((a, b) => {\n      const first = isCmd ? a.usage : a.usage[1]\n      const second = isCmd ? b.usage : b.usage[1]\n\n      switch (true) {\n        case first < second:\n          return -1\n        case first > second:\n          return 1\n        default:\n          return 0\n      }\n    })\n\n    for (const item in items) {\n      if (!{}.hasOwnProperty.call(items, item)) {\n        continue\n      }\n\n      let { usage } = items[item]\n      let initial = items[item].defaultValue\n\n      // If usage is an array, show its contents\n      if (usage.constructor === Array) {\n        if (isCmd) {\n          usage = usage.join(', ')\n        } else {\n          const isVersion = usage.indexOf('v')\n          usage = `-${usage[0]}, --${usage[1]}`\n\n          if (!initial) {\n            initial = items[item].init\n          }\n\n          usage +=\n            initial && isVersion === -1 ? ' ' + this.handleType(initial)[0] : ''\n        }\n      }\n\n      // Overwrite usage with readable syntax\n      items[item].usage = usage\n    }\n\n    // Find length of longest option or command\n    // Before doing that, make a copy of the original array\n    const longest = items.slice().sort((a, b) => {\n      return b.usage.length - a.usage.length\n    })[0].usage.length\n\n    for (const item of items) {\n      let { usage, description, defaultValue } = item\n      const difference = longest - usage.length\n\n      // Compensate the difference to longest property with spaces\n      usage += ' '.repeat(difference)\n\n      // Add some space around it as well\n      if (typeof defaultValue !== 'undefined') {\n        if (typeof defaultValue === 'boolean') {\n          description += ` (${\n            defaultValue ? 'enabled' : 'disabled'\n          } by default)`\n        } else {\n          description += ` (defaults to ${JSON.stringify(defaultValue)})`\n        }\n      }\n\n      parts.push(\n        '  ' +\n          this.printMainColor(usage) +\n          '  ' +\n          this.printSubColor(description)\n      )\n    }\n\n    return parts\n  },\n\n  runCommand(details, options) {\n    // If help is disabled, remove initializer\n    if (details.usage === 'help' && !this.config.help) {\n      details.init = false\n    }\n\n    // If version is disabled, remove initializer\n    if (details.usage === 'version' && !this.config.version) {\n      details.init = false\n    }\n\n    // If command has initializer, call it\n    if (details.init) {\n      const sub = [].concat(this.sub)\n      sub.shift()\n\n      return details.init.bind(this)(details.usage, sub, options)\n    }\n\n    // Generate full name of binary\n    const subCommand = Array.isArray(details.usage)\n      ? details.usage[0]\n      : details.usage\n    let full = this.binary + '-' + subCommand\n\n    // Remove node and original command.\n    const args = process.argv.slice(2)\n\n    // Remove the first occurance of subCommand from the args.\n    for (let i = 0, l = args.length; i < l; i++) {\n      if (args[i] === subCommand) {\n        args.splice(i, 1)\n        break\n      }\n    }\n\n    if (process.platform === 'win32') {\n      const binaryExt = path.extname(this.binary)\n      const mainModule = process.env.APPVEYOR\n        ? '_fixture'\n        : process.mainModule.filename\n\n      full = `${mainModule}-${subCommand}`\n\n      if (path.extname(this.binary)) {\n        full = `${mainModule.replace(binaryExt, '')}-${subCommand}${binaryExt}`\n      }\n\n      // Run binary of sub command on windows\n      args.unshift(full)\n      this.child = spawn(process.execPath, args, {\n        stdio: 'inherit'\n      })\n    } else {\n      // Run binary of sub command\n      this.child = spawn(full, args, {\n        stdio: 'inherit'\n      })\n    }\n\n    // Throw an error if something fails within that binary\n    this.child.on('error', err => {\n      throw err\n    })\n\n    this.child.on('exit', (code, signal) => {\n      process.on('exit', () => {\n        this.child = null\n        if (signal) {\n          process.kill(process.pid, signal)\n        } else {\n          process.exit(code)\n        }\n      })\n    })\n\n    // Proxy SIGINT to child process\n    process.on('SIGINT', () => {\n      if (this.child) {\n        this.child.kill('SIGINT')\n        this.child.kill('SIGTERM') // If that didn't work, we're probably in an infinite loop, so make it die\n      }\n    })\n  },\n\n  checkHelp() {\n    // Register default option and command.\n    this.option('help', 'Output usage information')\n    this.command('help', 'Display help', this.showHelp)\n\n    // Immediately output if option was provided.\n    if (this.optionWasProvided('help')) {\n      this.showHelp()\n    }\n  },\n\n  checkVersion() {\n    // Register default option and command.\n    this.option('version', 'Output the version number')\n    this.command('version', 'Display version', this.showVersion)\n\n    // Immediately output if option was provided.\n    if (this.optionWasProvided('version')) {\n      this.showVersion()\n    }\n  },\n\n  isDefined(name, list) {\n    // Get all items of kind\n    const children = this.details[list]\n\n    // Check if a child matches the requested name\n    for (const child of children) {\n      const { usage } = child\n      const type = usage.constructor\n\n      if (type === Array && usage.indexOf(name) > -1) {\n        return child\n      }\n\n      if (type === String && usage === name) {\n        return child\n      }\n    }\n\n    // If nothing matches, item is not defined\n    return false\n  },\n\n  optionWasProvided(name) {\n    const option = this.isDefined(name, 'options')\n    return option && (this.raw[option.usage[0]] || this.raw[option.usage[1]])\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/args/lib/utils.js?");

/***/ }),

/***/ "./node_modules/args/lib/version.js":
/*!******************************************!*\
  !*** ./node_modules/args/lib/version.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst fs = __webpack_require__(/*! fs */ \"fs\")\nconst path = __webpack_require__(/*! path */ \"path\")\n\n/**\n * Retrieves the main module package.json information.\n *\n * @param {string} directory\n *   The directory to start looking in.\n *\n * @return {Object|null}\n *   An object containing the package.json contents or NULL if it could not be found.\n */\nfunction findPackage(directory) {\n  const file = path.resolve(directory, 'package.json')\n  if (fs.existsSync(file) && fs.statSync(file).isFile()) {\n    return __webpack_require__(\"./node_modules/args/lib sync recursive\")(file)\n  }\n\n  const parent = path.resolve(directory, '..')\n  return parent === directory ? null : findPackage(parent)\n}\n\nmodule.exports = function() {\n  const pkg = findPackage(path.dirname(process.mainModule.filename))\n  const version = (pkg && pkg.version) || '-/-'\n\n  console.log(version)\n\n  if (this.config.exit && this.config.exit.version) {\n    // eslint-disable-next-line unicorn/no-process-exit\n    process.exit()\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/args/lib/version.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/copy-sync/copy-sync.js":
/*!**********************************************************!*\
  !*** ./node_modules/fs-extra/lib/copy-sync/copy-sync.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// TODO: enable this once graceful-fs supports bigint option.\n// const fs = require('graceful-fs')\nconst fs = __webpack_require__(/*! fs */ \"fs\")\nconst path = __webpack_require__(/*! path */ \"path\")\nconst mkdirpSync = __webpack_require__(/*! ../mkdirs */ \"./node_modules/fs-extra/lib/mkdirs/index.js\").mkdirsSync\nconst utimesSync = __webpack_require__(/*! ../util/utimes.js */ \"./node_modules/fs-extra/lib/util/utimes.js\").utimesMillisSync\nconst stat = __webpack_require__(/*! ../util/stat */ \"./node_modules/fs-extra/lib/util/stat.js\")\n\nfunction copySync (src, dest, opts) {\n  if (typeof opts === 'function') {\n    opts = {filter: opts}\n  }\n\n  opts = opts || {}\n  opts.clobber = 'clobber' in opts ? !!opts.clobber : true // default to true for now\n  opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber // overwrite falls back to clobber\n\n  // Warn about using preserveTimestamps on 32-bit node\n  if (opts.preserveTimestamps && process.arch === 'ia32') {\n    console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\\n\n    see https://github.com/jprichardson/node-fs-extra/issues/269`)\n  }\n\n  const { srcStat, destStat } = stat.checkPathsSync(src, dest, 'copy')\n  stat.checkParentPathsSync(src, srcStat, dest, 'copy')\n  return handleFilterAndCopy(destStat, src, dest, opts)\n}\n\nfunction handleFilterAndCopy (destStat, src, dest, opts) {\n  if (opts.filter && !opts.filter(src, dest)) return\n  const destParent = path.dirname(dest)\n  if (!fs.existsSync(destParent)) mkdirpSync(destParent)\n  return startCopy(destStat, src, dest, opts)\n}\n\nfunction startCopy (destStat, src, dest, opts) {\n  if (opts.filter && !opts.filter(src, dest)) return\n  return getStats(destStat, src, dest, opts)\n}\n\nfunction getStats (destStat, src, dest, opts) {\n  const statSync = opts.dereference ? fs.statSync : fs.lstatSync\n  const srcStat = statSync(src)\n\n  if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts)\n  else if (srcStat.isFile() ||\n           srcStat.isCharacterDevice() ||\n           srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts)\n  else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts)\n}\n\nfunction onFile (srcStat, destStat, src, dest, opts) {\n  if (!destStat) return copyFile(srcStat, src, dest, opts)\n  return mayCopyFile(srcStat, src, dest, opts)\n}\n\nfunction mayCopyFile (srcStat, src, dest, opts) {\n  if (opts.overwrite) {\n    fs.unlinkSync(dest)\n    return copyFile(srcStat, src, dest, opts)\n  } else if (opts.errorOnExist) {\n    throw new Error(`'${dest}' already exists`)\n  }\n}\n\nfunction copyFile (srcStat, src, dest, opts) {\n  if (typeof fs.copyFileSync === 'function') {\n    fs.copyFileSync(src, dest)\n    fs.chmodSync(dest, srcStat.mode)\n    if (opts.preserveTimestamps) {\n      return utimesSync(dest, srcStat.atime, srcStat.mtime)\n    }\n    return\n  }\n  return copyFileFallback(srcStat, src, dest, opts)\n}\n\nfunction copyFileFallback (srcStat, src, dest, opts) {\n  const BUF_LENGTH = 64 * 1024\n  const _buff = __webpack_require__(/*! ../util/buffer */ \"./node_modules/fs-extra/lib/util/buffer.js\")(BUF_LENGTH)\n\n  const fdr = fs.openSync(src, 'r')\n  const fdw = fs.openSync(dest, 'w', srcStat.mode)\n  let pos = 0\n\n  while (pos < srcStat.size) {\n    const bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos)\n    fs.writeSync(fdw, _buff, 0, bytesRead)\n    pos += bytesRead\n  }\n\n  if (opts.preserveTimestamps) fs.futimesSync(fdw, srcStat.atime, srcStat.mtime)\n\n  fs.closeSync(fdr)\n  fs.closeSync(fdw)\n}\n\nfunction onDir (srcStat, destStat, src, dest, opts) {\n  if (!destStat) return mkDirAndCopy(srcStat, src, dest, opts)\n  if (destStat && !destStat.isDirectory()) {\n    throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`)\n  }\n  return copyDir(src, dest, opts)\n}\n\nfunction mkDirAndCopy (srcStat, src, dest, opts) {\n  fs.mkdirSync(dest)\n  copyDir(src, dest, opts)\n  return fs.chmodSync(dest, srcStat.mode)\n}\n\nfunction copyDir (src, dest, opts) {\n  fs.readdirSync(src).forEach(item => copyDirItem(item, src, dest, opts))\n}\n\nfunction copyDirItem (item, src, dest, opts) {\n  const srcItem = path.join(src, item)\n  const destItem = path.join(dest, item)\n  const { destStat } = stat.checkPathsSync(srcItem, destItem, 'copy')\n  return startCopy(destStat, srcItem, destItem, opts)\n}\n\nfunction onLink (destStat, src, dest, opts) {\n  let resolvedSrc = fs.readlinkSync(src)\n  if (opts.dereference) {\n    resolvedSrc = path.resolve(process.cwd(), resolvedSrc)\n  }\n\n  if (!destStat) {\n    return fs.symlinkSync(resolvedSrc, dest)\n  } else {\n    let resolvedDest\n    try {\n      resolvedDest = fs.readlinkSync(dest)\n    } catch (err) {\n      // dest exists and is a regular file or directory,\n      // Windows may throw UNKNOWN error. If dest already exists,\n      // fs throws error anyway, so no need to guard against it here.\n      if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return fs.symlinkSync(resolvedSrc, dest)\n      throw err\n    }\n    if (opts.dereference) {\n      resolvedDest = path.resolve(process.cwd(), resolvedDest)\n    }\n    if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {\n      throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`)\n    }\n\n    // prevent copy if src is a subdir of dest since unlinking\n    // dest in this case would result in removing src contents\n    // and therefore a broken symlink would be created.\n    if (fs.statSync(dest).isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {\n      throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`)\n    }\n    return copyLink(resolvedSrc, dest)\n  }\n}\n\nfunction copyLink (resolvedSrc, dest) {\n  fs.unlinkSync(dest)\n  return fs.symlinkSync(resolvedSrc, dest)\n}\n\nmodule.exports = copySync\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/copy-sync/copy-sync.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/copy-sync/index.js":
/*!******************************************************!*\
  !*** ./node_modules/fs-extra/lib/copy-sync/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  copySync: __webpack_require__(/*! ./copy-sync */ \"./node_modules/fs-extra/lib/copy-sync/copy-sync.js\")\n}\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/copy-sync/index.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/copy/copy.js":
/*!************************************************!*\
  !*** ./node_modules/fs-extra/lib/copy/copy.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// TODO: enable this once graceful-fs supports bigint option.\n// const fs = require('graceful-fs')\nconst fs = __webpack_require__(/*! fs */ \"fs\")\nconst path = __webpack_require__(/*! path */ \"path\")\nconst mkdirp = __webpack_require__(/*! ../mkdirs */ \"./node_modules/fs-extra/lib/mkdirs/index.js\").mkdirs\nconst pathExists = __webpack_require__(/*! ../path-exists */ \"./node_modules/fs-extra/lib/path-exists/index.js\").pathExists\nconst utimes = __webpack_require__(/*! ../util/utimes */ \"./node_modules/fs-extra/lib/util/utimes.js\").utimesMillis\nconst stat = __webpack_require__(/*! ../util/stat */ \"./node_modules/fs-extra/lib/util/stat.js\")\n\nfunction copy (src, dest, opts, cb) {\n  if (typeof opts === 'function' && !cb) {\n    cb = opts\n    opts = {}\n  } else if (typeof opts === 'function') {\n    opts = {filter: opts}\n  }\n\n  cb = cb || function () {}\n  opts = opts || {}\n\n  opts.clobber = 'clobber' in opts ? !!opts.clobber : true // default to true for now\n  opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber // overwrite falls back to clobber\n\n  // Warn about using preserveTimestamps on 32-bit node\n  if (opts.preserveTimestamps && process.arch === 'ia32') {\n    console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\\n\n    see https://github.com/jprichardson/node-fs-extra/issues/269`)\n  }\n\n  stat.checkPaths(src, dest, 'copy', (err, stats) => {\n    if (err) return cb(err)\n    const { srcStat, destStat } = stats\n    stat.checkParentPaths(src, srcStat, dest, 'copy', err => {\n      if (err) return cb(err)\n      if (opts.filter) return handleFilter(checkParentDir, destStat, src, dest, opts, cb)\n      return checkParentDir(destStat, src, dest, opts, cb)\n    })\n  })\n}\n\nfunction checkParentDir (destStat, src, dest, opts, cb) {\n  const destParent = path.dirname(dest)\n  pathExists(destParent, (err, dirExists) => {\n    if (err) return cb(err)\n    if (dirExists) return startCopy(destStat, src, dest, opts, cb)\n    mkdirp(destParent, err => {\n      if (err) return cb(err)\n      return startCopy(destStat, src, dest, opts, cb)\n    })\n  })\n}\n\nfunction handleFilter (onInclude, destStat, src, dest, opts, cb) {\n  Promise.resolve(opts.filter(src, dest)).then(include => {\n    if (include) return onInclude(destStat, src, dest, opts, cb)\n    return cb()\n  }, error => cb(error))\n}\n\nfunction startCopy (destStat, src, dest, opts, cb) {\n  if (opts.filter) return handleFilter(getStats, destStat, src, dest, opts, cb)\n  return getStats(destStat, src, dest, opts, cb)\n}\n\nfunction getStats (destStat, src, dest, opts, cb) {\n  const stat = opts.dereference ? fs.stat : fs.lstat\n  stat(src, (err, srcStat) => {\n    if (err) return cb(err)\n\n    if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts, cb)\n    else if (srcStat.isFile() ||\n             srcStat.isCharacterDevice() ||\n             srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts, cb)\n    else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts, cb)\n  })\n}\n\nfunction onFile (srcStat, destStat, src, dest, opts, cb) {\n  if (!destStat) return copyFile(srcStat, src, dest, opts, cb)\n  return mayCopyFile(srcStat, src, dest, opts, cb)\n}\n\nfunction mayCopyFile (srcStat, src, dest, opts, cb) {\n  if (opts.overwrite) {\n    fs.unlink(dest, err => {\n      if (err) return cb(err)\n      return copyFile(srcStat, src, dest, opts, cb)\n    })\n  } else if (opts.errorOnExist) {\n    return cb(new Error(`'${dest}' already exists`))\n  } else return cb()\n}\n\nfunction copyFile (srcStat, src, dest, opts, cb) {\n  if (typeof fs.copyFile === 'function') {\n    return fs.copyFile(src, dest, err => {\n      if (err) return cb(err)\n      return setDestModeAndTimestamps(srcStat, dest, opts, cb)\n    })\n  }\n  return copyFileFallback(srcStat, src, dest, opts, cb)\n}\n\nfunction copyFileFallback (srcStat, src, dest, opts, cb) {\n  const rs = fs.createReadStream(src)\n  rs.on('error', err => cb(err)).once('open', () => {\n    const ws = fs.createWriteStream(dest, { mode: srcStat.mode })\n    ws.on('error', err => cb(err))\n      .on('open', () => rs.pipe(ws))\n      .once('close', () => setDestModeAndTimestamps(srcStat, dest, opts, cb))\n  })\n}\n\nfunction setDestModeAndTimestamps (srcStat, dest, opts, cb) {\n  fs.chmod(dest, srcStat.mode, err => {\n    if (err) return cb(err)\n    if (opts.preserveTimestamps) {\n      return utimes(dest, srcStat.atime, srcStat.mtime, cb)\n    }\n    return cb()\n  })\n}\n\nfunction onDir (srcStat, destStat, src, dest, opts, cb) {\n  if (!destStat) return mkDirAndCopy(srcStat, src, dest, opts, cb)\n  if (destStat && !destStat.isDirectory()) {\n    return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`))\n  }\n  return copyDir(src, dest, opts, cb)\n}\n\nfunction mkDirAndCopy (srcStat, src, dest, opts, cb) {\n  fs.mkdir(dest, err => {\n    if (err) return cb(err)\n    copyDir(src, dest, opts, err => {\n      if (err) return cb(err)\n      return fs.chmod(dest, srcStat.mode, cb)\n    })\n  })\n}\n\nfunction copyDir (src, dest, opts, cb) {\n  fs.readdir(src, (err, items) => {\n    if (err) return cb(err)\n    return copyDirItems(items, src, dest, opts, cb)\n  })\n}\n\nfunction copyDirItems (items, src, dest, opts, cb) {\n  const item = items.pop()\n  if (!item) return cb()\n  return copyDirItem(items, item, src, dest, opts, cb)\n}\n\nfunction copyDirItem (items, item, src, dest, opts, cb) {\n  const srcItem = path.join(src, item)\n  const destItem = path.join(dest, item)\n  stat.checkPaths(srcItem, destItem, 'copy', (err, stats) => {\n    if (err) return cb(err)\n    const { destStat } = stats\n    startCopy(destStat, srcItem, destItem, opts, err => {\n      if (err) return cb(err)\n      return copyDirItems(items, src, dest, opts, cb)\n    })\n  })\n}\n\nfunction onLink (destStat, src, dest, opts, cb) {\n  fs.readlink(src, (err, resolvedSrc) => {\n    if (err) return cb(err)\n    if (opts.dereference) {\n      resolvedSrc = path.resolve(process.cwd(), resolvedSrc)\n    }\n\n    if (!destStat) {\n      return fs.symlink(resolvedSrc, dest, cb)\n    } else {\n      fs.readlink(dest, (err, resolvedDest) => {\n        if (err) {\n          // dest exists and is a regular file or directory,\n          // Windows may throw UNKNOWN error. If dest already exists,\n          // fs throws error anyway, so no need to guard against it here.\n          if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return fs.symlink(resolvedSrc, dest, cb)\n          return cb(err)\n        }\n        if (opts.dereference) {\n          resolvedDest = path.resolve(process.cwd(), resolvedDest)\n        }\n        if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {\n          return cb(new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`))\n        }\n\n        // do not copy if src is a subdir of dest since unlinking\n        // dest in this case would result in removing src contents\n        // and therefore a broken symlink would be created.\n        if (destStat.isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {\n          return cb(new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`))\n        }\n        return copyLink(resolvedSrc, dest, cb)\n      })\n    }\n  })\n}\n\nfunction copyLink (resolvedSrc, dest, cb) {\n  fs.unlink(dest, err => {\n    if (err) return cb(err)\n    return fs.symlink(resolvedSrc, dest, cb)\n  })\n}\n\nmodule.exports = copy\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/copy/copy.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/copy/index.js":
/*!*************************************************!*\
  !*** ./node_modules/fs-extra/lib/copy/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst u = __webpack_require__(/*! universalify */ \"./node_modules/universalify/index.js\").fromCallback\nmodule.exports = {\n  copy: u(__webpack_require__(/*! ./copy */ \"./node_modules/fs-extra/lib/copy/copy.js\"))\n}\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/copy/index.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/empty/index.js":
/*!**************************************************!*\
  !*** ./node_modules/fs-extra/lib/empty/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst u = __webpack_require__(/*! universalify */ \"./node_modules/universalify/index.js\").fromCallback\nconst fs = __webpack_require__(/*! fs */ \"fs\")\nconst path = __webpack_require__(/*! path */ \"path\")\nconst mkdir = __webpack_require__(/*! ../mkdirs */ \"./node_modules/fs-extra/lib/mkdirs/index.js\")\nconst remove = __webpack_require__(/*! ../remove */ \"./node_modules/fs-extra/lib/remove/index.js\")\n\nconst emptyDir = u(function emptyDir (dir, callback) {\n  callback = callback || function () {}\n  fs.readdir(dir, (err, items) => {\n    if (err) return mkdir.mkdirs(dir, callback)\n\n    items = items.map(item => path.join(dir, item))\n\n    deleteItem()\n\n    function deleteItem () {\n      const item = items.pop()\n      if (!item) return callback()\n      remove.remove(item, err => {\n        if (err) return callback(err)\n        deleteItem()\n      })\n    }\n  })\n})\n\nfunction emptyDirSync (dir) {\n  let items\n  try {\n    items = fs.readdirSync(dir)\n  } catch (err) {\n    return mkdir.mkdirsSync(dir)\n  }\n\n  items.forEach(item => {\n    item = path.join(dir, item)\n    remove.removeSync(item)\n  })\n}\n\nmodule.exports = {\n  emptyDirSync,\n  emptydirSync: emptyDirSync,\n  emptyDir,\n  emptydir: emptyDir\n}\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/empty/index.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/ensure/file.js":
/*!**************************************************!*\
  !*** ./node_modules/fs-extra/lib/ensure/file.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst u = __webpack_require__(/*! universalify */ \"./node_modules/universalify/index.js\").fromCallback\nconst path = __webpack_require__(/*! path */ \"path\")\nconst fs = __webpack_require__(/*! graceful-fs */ \"graceful-fs\")\nconst mkdir = __webpack_require__(/*! ../mkdirs */ \"./node_modules/fs-extra/lib/mkdirs/index.js\")\nconst pathExists = __webpack_require__(/*! ../path-exists */ \"./node_modules/fs-extra/lib/path-exists/index.js\").pathExists\n\nfunction createFile (file, callback) {\n  function makeFile () {\n    fs.writeFile(file, '', err => {\n      if (err) return callback(err)\n      callback()\n    })\n  }\n\n  fs.stat(file, (err, stats) => { // eslint-disable-line handle-callback-err\n    if (!err && stats.isFile()) return callback()\n    const dir = path.dirname(file)\n    pathExists(dir, (err, dirExists) => {\n      if (err) return callback(err)\n      if (dirExists) return makeFile()\n      mkdir.mkdirs(dir, err => {\n        if (err) return callback(err)\n        makeFile()\n      })\n    })\n  })\n}\n\nfunction createFileSync (file) {\n  let stats\n  try {\n    stats = fs.statSync(file)\n  } catch (e) {}\n  if (stats && stats.isFile()) return\n\n  const dir = path.dirname(file)\n  if (!fs.existsSync(dir)) {\n    mkdir.mkdirsSync(dir)\n  }\n\n  fs.writeFileSync(file, '')\n}\n\nmodule.exports = {\n  createFile: u(createFile),\n  createFileSync\n}\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/ensure/file.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/ensure/index.js":
/*!***************************************************!*\
  !*** ./node_modules/fs-extra/lib/ensure/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst file = __webpack_require__(/*! ./file */ \"./node_modules/fs-extra/lib/ensure/file.js\")\nconst link = __webpack_require__(/*! ./link */ \"./node_modules/fs-extra/lib/ensure/link.js\")\nconst symlink = __webpack_require__(/*! ./symlink */ \"./node_modules/fs-extra/lib/ensure/symlink.js\")\n\nmodule.exports = {\n  // file\n  createFile: file.createFile,\n  createFileSync: file.createFileSync,\n  ensureFile: file.createFile,\n  ensureFileSync: file.createFileSync,\n  // link\n  createLink: link.createLink,\n  createLinkSync: link.createLinkSync,\n  ensureLink: link.createLink,\n  ensureLinkSync: link.createLinkSync,\n  // symlink\n  createSymlink: symlink.createSymlink,\n  createSymlinkSync: symlink.createSymlinkSync,\n  ensureSymlink: symlink.createSymlink,\n  ensureSymlinkSync: symlink.createSymlinkSync\n}\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/ensure/index.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/ensure/link.js":
/*!**************************************************!*\
  !*** ./node_modules/fs-extra/lib/ensure/link.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst u = __webpack_require__(/*! universalify */ \"./node_modules/universalify/index.js\").fromCallback\nconst path = __webpack_require__(/*! path */ \"path\")\nconst fs = __webpack_require__(/*! graceful-fs */ \"graceful-fs\")\nconst mkdir = __webpack_require__(/*! ../mkdirs */ \"./node_modules/fs-extra/lib/mkdirs/index.js\")\nconst pathExists = __webpack_require__(/*! ../path-exists */ \"./node_modules/fs-extra/lib/path-exists/index.js\").pathExists\n\nfunction createLink (srcpath, dstpath, callback) {\n  function makeLink (srcpath, dstpath) {\n    fs.link(srcpath, dstpath, err => {\n      if (err) return callback(err)\n      callback(null)\n    })\n  }\n\n  pathExists(dstpath, (err, destinationExists) => {\n    if (err) return callback(err)\n    if (destinationExists) return callback(null)\n    fs.lstat(srcpath, (err) => {\n      if (err) {\n        err.message = err.message.replace('lstat', 'ensureLink')\n        return callback(err)\n      }\n\n      const dir = path.dirname(dstpath)\n      pathExists(dir, (err, dirExists) => {\n        if (err) return callback(err)\n        if (dirExists) return makeLink(srcpath, dstpath)\n        mkdir.mkdirs(dir, err => {\n          if (err) return callback(err)\n          makeLink(srcpath, dstpath)\n        })\n      })\n    })\n  })\n}\n\nfunction createLinkSync (srcpath, dstpath) {\n  const destinationExists = fs.existsSync(dstpath)\n  if (destinationExists) return undefined\n\n  try {\n    fs.lstatSync(srcpath)\n  } catch (err) {\n    err.message = err.message.replace('lstat', 'ensureLink')\n    throw err\n  }\n\n  const dir = path.dirname(dstpath)\n  const dirExists = fs.existsSync(dir)\n  if (dirExists) return fs.linkSync(srcpath, dstpath)\n  mkdir.mkdirsSync(dir)\n\n  return fs.linkSync(srcpath, dstpath)\n}\n\nmodule.exports = {\n  createLink: u(createLink),\n  createLinkSync\n}\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/ensure/link.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/ensure/symlink-paths.js":
/*!***********************************************************!*\
  !*** ./node_modules/fs-extra/lib/ensure/symlink-paths.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst path = __webpack_require__(/*! path */ \"path\")\nconst fs = __webpack_require__(/*! graceful-fs */ \"graceful-fs\")\nconst pathExists = __webpack_require__(/*! ../path-exists */ \"./node_modules/fs-extra/lib/path-exists/index.js\").pathExists\n\n/**\n * Function that returns two types of paths, one relative to symlink, and one\n * relative to the current working directory. Checks if path is absolute or\n * relative. If the path is relative, this function checks if the path is\n * relative to symlink or relative to current working directory. This is an\n * initiative to find a smarter `srcpath` to supply when building symlinks.\n * This allows you to determine which path to use out of one of three possible\n * types of source paths. The first is an absolute path. This is detected by\n * `path.isAbsolute()`. When an absolute path is provided, it is checked to\n * see if it exists. If it does it's used, if not an error is returned\n * (callback)/ thrown (sync). The other two options for `srcpath` are a\n * relative url. By default Node's `fs.symlink` works by creating a symlink\n * using `dstpath` and expects the `srcpath` to be relative to the newly\n * created symlink. If you provide a `srcpath` that does not exist on the file\n * system it results in a broken symlink. To minimize this, the function\n * checks to see if the 'relative to symlink' source file exists, and if it\n * does it will use it. If it does not, it checks if there's a file that\n * exists that is relative to the current working directory, if does its used.\n * This preserves the expectations of the original fs.symlink spec and adds\n * the ability to pass in `relative to current working direcotry` paths.\n */\n\nfunction symlinkPaths (srcpath, dstpath, callback) {\n  if (path.isAbsolute(srcpath)) {\n    return fs.lstat(srcpath, (err) => {\n      if (err) {\n        err.message = err.message.replace('lstat', 'ensureSymlink')\n        return callback(err)\n      }\n      return callback(null, {\n        'toCwd': srcpath,\n        'toDst': srcpath\n      })\n    })\n  } else {\n    const dstdir = path.dirname(dstpath)\n    const relativeToDst = path.join(dstdir, srcpath)\n    return pathExists(relativeToDst, (err, exists) => {\n      if (err) return callback(err)\n      if (exists) {\n        return callback(null, {\n          'toCwd': relativeToDst,\n          'toDst': srcpath\n        })\n      } else {\n        return fs.lstat(srcpath, (err) => {\n          if (err) {\n            err.message = err.message.replace('lstat', 'ensureSymlink')\n            return callback(err)\n          }\n          return callback(null, {\n            'toCwd': srcpath,\n            'toDst': path.relative(dstdir, srcpath)\n          })\n        })\n      }\n    })\n  }\n}\n\nfunction symlinkPathsSync (srcpath, dstpath) {\n  let exists\n  if (path.isAbsolute(srcpath)) {\n    exists = fs.existsSync(srcpath)\n    if (!exists) throw new Error('absolute srcpath does not exist')\n    return {\n      'toCwd': srcpath,\n      'toDst': srcpath\n    }\n  } else {\n    const dstdir = path.dirname(dstpath)\n    const relativeToDst = path.join(dstdir, srcpath)\n    exists = fs.existsSync(relativeToDst)\n    if (exists) {\n      return {\n        'toCwd': relativeToDst,\n        'toDst': srcpath\n      }\n    } else {\n      exists = fs.existsSync(srcpath)\n      if (!exists) throw new Error('relative srcpath does not exist')\n      return {\n        'toCwd': srcpath,\n        'toDst': path.relative(dstdir, srcpath)\n      }\n    }\n  }\n}\n\nmodule.exports = {\n  symlinkPaths,\n  symlinkPathsSync\n}\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/ensure/symlink-paths.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/ensure/symlink-type.js":
/*!**********************************************************!*\
  !*** ./node_modules/fs-extra/lib/ensure/symlink-type.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst fs = __webpack_require__(/*! graceful-fs */ \"graceful-fs\")\n\nfunction symlinkType (srcpath, type, callback) {\n  callback = (typeof type === 'function') ? type : callback\n  type = (typeof type === 'function') ? false : type\n  if (type) return callback(null, type)\n  fs.lstat(srcpath, (err, stats) => {\n    if (err) return callback(null, 'file')\n    type = (stats && stats.isDirectory()) ? 'dir' : 'file'\n    callback(null, type)\n  })\n}\n\nfunction symlinkTypeSync (srcpath, type) {\n  let stats\n\n  if (type) return type\n  try {\n    stats = fs.lstatSync(srcpath)\n  } catch (e) {\n    return 'file'\n  }\n  return (stats && stats.isDirectory()) ? 'dir' : 'file'\n}\n\nmodule.exports = {\n  symlinkType,\n  symlinkTypeSync\n}\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/ensure/symlink-type.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/ensure/symlink.js":
/*!*****************************************************!*\
  !*** ./node_modules/fs-extra/lib/ensure/symlink.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst u = __webpack_require__(/*! universalify */ \"./node_modules/universalify/index.js\").fromCallback\nconst path = __webpack_require__(/*! path */ \"path\")\nconst fs = __webpack_require__(/*! graceful-fs */ \"graceful-fs\")\nconst _mkdirs = __webpack_require__(/*! ../mkdirs */ \"./node_modules/fs-extra/lib/mkdirs/index.js\")\nconst mkdirs = _mkdirs.mkdirs\nconst mkdirsSync = _mkdirs.mkdirsSync\n\nconst _symlinkPaths = __webpack_require__(/*! ./symlink-paths */ \"./node_modules/fs-extra/lib/ensure/symlink-paths.js\")\nconst symlinkPaths = _symlinkPaths.symlinkPaths\nconst symlinkPathsSync = _symlinkPaths.symlinkPathsSync\n\nconst _symlinkType = __webpack_require__(/*! ./symlink-type */ \"./node_modules/fs-extra/lib/ensure/symlink-type.js\")\nconst symlinkType = _symlinkType.symlinkType\nconst symlinkTypeSync = _symlinkType.symlinkTypeSync\n\nconst pathExists = __webpack_require__(/*! ../path-exists */ \"./node_modules/fs-extra/lib/path-exists/index.js\").pathExists\n\nfunction createSymlink (srcpath, dstpath, type, callback) {\n  callback = (typeof type === 'function') ? type : callback\n  type = (typeof type === 'function') ? false : type\n\n  pathExists(dstpath, (err, destinationExists) => {\n    if (err) return callback(err)\n    if (destinationExists) return callback(null)\n    symlinkPaths(srcpath, dstpath, (err, relative) => {\n      if (err) return callback(err)\n      srcpath = relative.toDst\n      symlinkType(relative.toCwd, type, (err, type) => {\n        if (err) return callback(err)\n        const dir = path.dirname(dstpath)\n        pathExists(dir, (err, dirExists) => {\n          if (err) return callback(err)\n          if (dirExists) return fs.symlink(srcpath, dstpath, type, callback)\n          mkdirs(dir, err => {\n            if (err) return callback(err)\n            fs.symlink(srcpath, dstpath, type, callback)\n          })\n        })\n      })\n    })\n  })\n}\n\nfunction createSymlinkSync (srcpath, dstpath, type) {\n  const destinationExists = fs.existsSync(dstpath)\n  if (destinationExists) return undefined\n\n  const relative = symlinkPathsSync(srcpath, dstpath)\n  srcpath = relative.toDst\n  type = symlinkTypeSync(relative.toCwd, type)\n  const dir = path.dirname(dstpath)\n  const exists = fs.existsSync(dir)\n  if (exists) return fs.symlinkSync(srcpath, dstpath, type)\n  mkdirsSync(dir)\n  return fs.symlinkSync(srcpath, dstpath, type)\n}\n\nmodule.exports = {\n  createSymlink: u(createSymlink),\n  createSymlinkSync\n}\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/ensure/symlink.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/fs/index.js":
/*!***********************************************!*\
  !*** ./node_modules/fs-extra/lib/fs/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n// This is adapted from https://github.com/normalize/mz\n// Copyright (c) 2014-2016 Jonathan Ong me@jongleberry.com and Contributors\nconst u = __webpack_require__(/*! universalify */ \"./node_modules/universalify/index.js\").fromCallback\nconst fs = __webpack_require__(/*! graceful-fs */ \"graceful-fs\")\n\nconst api = [\n  'access',\n  'appendFile',\n  'chmod',\n  'chown',\n  'close',\n  'copyFile',\n  'fchmod',\n  'fchown',\n  'fdatasync',\n  'fstat',\n  'fsync',\n  'ftruncate',\n  'futimes',\n  'lchown',\n  'lchmod',\n  'link',\n  'lstat',\n  'mkdir',\n  'mkdtemp',\n  'open',\n  'readFile',\n  'readdir',\n  'readlink',\n  'realpath',\n  'rename',\n  'rmdir',\n  'stat',\n  'symlink',\n  'truncate',\n  'unlink',\n  'utimes',\n  'writeFile'\n].filter(key => {\n  // Some commands are not available on some systems. Ex:\n  // fs.copyFile was added in Node.js v8.5.0\n  // fs.mkdtemp was added in Node.js v5.10.0\n  // fs.lchown is not available on at least some Linux\n  return typeof fs[key] === 'function'\n})\n\n// Export all keys:\nObject.keys(fs).forEach(key => {\n  if (key === 'promises') {\n    // fs.promises is a getter property that triggers ExperimentalWarning\n    // Don't re-export it here, the getter is defined in \"lib/index.js\"\n    return\n  }\n  exports[key] = fs[key]\n})\n\n// Universalify async methods:\napi.forEach(method => {\n  exports[method] = u(fs[method])\n})\n\n// We differ from mz/fs in that we still ship the old, broken, fs.exists()\n// since we are a drop-in replacement for the native module\nexports.exists = function (filename, callback) {\n  if (typeof callback === 'function') {\n    return fs.exists(filename, callback)\n  }\n  return new Promise(resolve => {\n    return fs.exists(filename, resolve)\n  })\n}\n\n// fs.read() & fs.write need special treatment due to multiple callback args\n\nexports.read = function (fd, buffer, offset, length, position, callback) {\n  if (typeof callback === 'function') {\n    return fs.read(fd, buffer, offset, length, position, callback)\n  }\n  return new Promise((resolve, reject) => {\n    fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer) => {\n      if (err) return reject(err)\n      resolve({ bytesRead, buffer })\n    })\n  })\n}\n\n// Function signature can be\n// fs.write(fd, buffer[, offset[, length[, position]]], callback)\n// OR\n// fs.write(fd, string[, position[, encoding]], callback)\n// We need to handle both cases, so we use ...args\nexports.write = function (fd, buffer, ...args) {\n  if (typeof args[args.length - 1] === 'function') {\n    return fs.write(fd, buffer, ...args)\n  }\n\n  return new Promise((resolve, reject) => {\n    fs.write(fd, buffer, ...args, (err, bytesWritten, buffer) => {\n      if (err) return reject(err)\n      resolve({ bytesWritten, buffer })\n    })\n  })\n}\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/fs/index.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/index.js":
/*!********************************************!*\
  !*** ./node_modules/fs-extra/lib/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = Object.assign(\n  {},\n  // Export promiseified graceful-fs:\n  __webpack_require__(/*! ./fs */ \"./node_modules/fs-extra/lib/fs/index.js\"),\n  // Export extra methods:\n  __webpack_require__(/*! ./copy-sync */ \"./node_modules/fs-extra/lib/copy-sync/index.js\"),\n  __webpack_require__(/*! ./copy */ \"./node_modules/fs-extra/lib/copy/index.js\"),\n  __webpack_require__(/*! ./empty */ \"./node_modules/fs-extra/lib/empty/index.js\"),\n  __webpack_require__(/*! ./ensure */ \"./node_modules/fs-extra/lib/ensure/index.js\"),\n  __webpack_require__(/*! ./json */ \"./node_modules/fs-extra/lib/json/index.js\"),\n  __webpack_require__(/*! ./mkdirs */ \"./node_modules/fs-extra/lib/mkdirs/index.js\"),\n  __webpack_require__(/*! ./move-sync */ \"./node_modules/fs-extra/lib/move-sync/index.js\"),\n  __webpack_require__(/*! ./move */ \"./node_modules/fs-extra/lib/move/index.js\"),\n  __webpack_require__(/*! ./output */ \"./node_modules/fs-extra/lib/output/index.js\"),\n  __webpack_require__(/*! ./path-exists */ \"./node_modules/fs-extra/lib/path-exists/index.js\"),\n  __webpack_require__(/*! ./remove */ \"./node_modules/fs-extra/lib/remove/index.js\")\n)\n\n// Export fs.promises as a getter property so that we don't trigger\n// ExperimentalWarning before fs.promises is actually accessed.\nconst fs = __webpack_require__(/*! fs */ \"fs\")\nif (Object.getOwnPropertyDescriptor(fs, 'promises')) {\n  Object.defineProperty(module.exports, 'promises', {\n    get () { return fs.promises }\n  })\n}\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/index.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/json/index.js":
/*!*************************************************!*\
  !*** ./node_modules/fs-extra/lib/json/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst u = __webpack_require__(/*! universalify */ \"./node_modules/universalify/index.js\").fromCallback\nconst jsonFile = __webpack_require__(/*! ./jsonfile */ \"./node_modules/fs-extra/lib/json/jsonfile.js\")\n\njsonFile.outputJson = u(__webpack_require__(/*! ./output-json */ \"./node_modules/fs-extra/lib/json/output-json.js\"))\njsonFile.outputJsonSync = __webpack_require__(/*! ./output-json-sync */ \"./node_modules/fs-extra/lib/json/output-json-sync.js\")\n// aliases\njsonFile.outputJSON = jsonFile.outputJson\njsonFile.outputJSONSync = jsonFile.outputJsonSync\njsonFile.writeJSON = jsonFile.writeJson\njsonFile.writeJSONSync = jsonFile.writeJsonSync\njsonFile.readJSON = jsonFile.readJson\njsonFile.readJSONSync = jsonFile.readJsonSync\n\nmodule.exports = jsonFile\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/json/index.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/json/jsonfile.js":
/*!****************************************************!*\
  !*** ./node_modules/fs-extra/lib/json/jsonfile.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst u = __webpack_require__(/*! universalify */ \"./node_modules/universalify/index.js\").fromCallback\nconst jsonFile = __webpack_require__(/*! jsonfile */ \"./node_modules/jsonfile/index.js\")\n\nmodule.exports = {\n  // jsonfile exports\n  readJson: u(jsonFile.readFile),\n  readJsonSync: jsonFile.readFileSync,\n  writeJson: u(jsonFile.writeFile),\n  writeJsonSync: jsonFile.writeFileSync\n}\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/json/jsonfile.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/json/output-json-sync.js":
/*!************************************************************!*\
  !*** ./node_modules/fs-extra/lib/json/output-json-sync.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst fs = __webpack_require__(/*! graceful-fs */ \"graceful-fs\")\nconst path = __webpack_require__(/*! path */ \"path\")\nconst mkdir = __webpack_require__(/*! ../mkdirs */ \"./node_modules/fs-extra/lib/mkdirs/index.js\")\nconst jsonFile = __webpack_require__(/*! ./jsonfile */ \"./node_modules/fs-extra/lib/json/jsonfile.js\")\n\nfunction outputJsonSync (file, data, options) {\n  const dir = path.dirname(file)\n\n  if (!fs.existsSync(dir)) {\n    mkdir.mkdirsSync(dir)\n  }\n\n  jsonFile.writeJsonSync(file, data, options)\n}\n\nmodule.exports = outputJsonSync\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/json/output-json-sync.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/json/output-json.js":
/*!*******************************************************!*\
  !*** ./node_modules/fs-extra/lib/json/output-json.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst path = __webpack_require__(/*! path */ \"path\")\nconst mkdir = __webpack_require__(/*! ../mkdirs */ \"./node_modules/fs-extra/lib/mkdirs/index.js\")\nconst pathExists = __webpack_require__(/*! ../path-exists */ \"./node_modules/fs-extra/lib/path-exists/index.js\").pathExists\nconst jsonFile = __webpack_require__(/*! ./jsonfile */ \"./node_modules/fs-extra/lib/json/jsonfile.js\")\n\nfunction outputJson (file, data, options, callback) {\n  if (typeof options === 'function') {\n    callback = options\n    options = {}\n  }\n\n  const dir = path.dirname(file)\n\n  pathExists(dir, (err, itDoes) => {\n    if (err) return callback(err)\n    if (itDoes) return jsonFile.writeJson(file, data, options, callback)\n\n    mkdir.mkdirs(dir, err => {\n      if (err) return callback(err)\n      jsonFile.writeJson(file, data, options, callback)\n    })\n  })\n}\n\nmodule.exports = outputJson\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/json/output-json.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/mkdirs/index.js":
/*!***************************************************!*\
  !*** ./node_modules/fs-extra/lib/mkdirs/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst u = __webpack_require__(/*! universalify */ \"./node_modules/universalify/index.js\").fromCallback\nconst mkdirs = u(__webpack_require__(/*! ./mkdirs */ \"./node_modules/fs-extra/lib/mkdirs/mkdirs.js\"))\nconst mkdirsSync = __webpack_require__(/*! ./mkdirs-sync */ \"./node_modules/fs-extra/lib/mkdirs/mkdirs-sync.js\")\n\nmodule.exports = {\n  mkdirs,\n  mkdirsSync,\n  // alias\n  mkdirp: mkdirs,\n  mkdirpSync: mkdirsSync,\n  ensureDir: mkdirs,\n  ensureDirSync: mkdirsSync\n}\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/mkdirs/index.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/mkdirs/mkdirs-sync.js":
/*!*********************************************************!*\
  !*** ./node_modules/fs-extra/lib/mkdirs/mkdirs-sync.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst fs = __webpack_require__(/*! graceful-fs */ \"graceful-fs\")\nconst path = __webpack_require__(/*! path */ \"path\")\nconst invalidWin32Path = __webpack_require__(/*! ./win32 */ \"./node_modules/fs-extra/lib/mkdirs/win32.js\").invalidWin32Path\n\nconst o777 = parseInt('0777', 8)\n\nfunction mkdirsSync (p, opts, made) {\n  if (!opts || typeof opts !== 'object') {\n    opts = { mode: opts }\n  }\n\n  let mode = opts.mode\n  const xfs = opts.fs || fs\n\n  if (process.platform === 'win32' && invalidWin32Path(p)) {\n    const errInval = new Error(p + ' contains invalid WIN32 path characters.')\n    errInval.code = 'EINVAL'\n    throw errInval\n  }\n\n  if (mode === undefined) {\n    mode = o777 & (~process.umask())\n  }\n  if (!made) made = null\n\n  p = path.resolve(p)\n\n  try {\n    xfs.mkdirSync(p, mode)\n    made = made || p\n  } catch (err0) {\n    if (err0.code === 'ENOENT') {\n      if (path.dirname(p) === p) throw err0\n      made = mkdirsSync(path.dirname(p), opts, made)\n      mkdirsSync(p, opts, made)\n    } else {\n      // In the case of any other error, just see if there's a dir there\n      // already. If so, then hooray!  If not, then something is borked.\n      let stat\n      try {\n        stat = xfs.statSync(p)\n      } catch (err1) {\n        throw err0\n      }\n      if (!stat.isDirectory()) throw err0\n    }\n  }\n\n  return made\n}\n\nmodule.exports = mkdirsSync\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/mkdirs/mkdirs-sync.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/mkdirs/mkdirs.js":
/*!****************************************************!*\
  !*** ./node_modules/fs-extra/lib/mkdirs/mkdirs.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst fs = __webpack_require__(/*! graceful-fs */ \"graceful-fs\")\nconst path = __webpack_require__(/*! path */ \"path\")\nconst invalidWin32Path = __webpack_require__(/*! ./win32 */ \"./node_modules/fs-extra/lib/mkdirs/win32.js\").invalidWin32Path\n\nconst o777 = parseInt('0777', 8)\n\nfunction mkdirs (p, opts, callback, made) {\n  if (typeof opts === 'function') {\n    callback = opts\n    opts = {}\n  } else if (!opts || typeof opts !== 'object') {\n    opts = { mode: opts }\n  }\n\n  if (process.platform === 'win32' && invalidWin32Path(p)) {\n    const errInval = new Error(p + ' contains invalid WIN32 path characters.')\n    errInval.code = 'EINVAL'\n    return callback(errInval)\n  }\n\n  let mode = opts.mode\n  const xfs = opts.fs || fs\n\n  if (mode === undefined) {\n    mode = o777 & (~process.umask())\n  }\n  if (!made) made = null\n\n  callback = callback || function () {}\n  p = path.resolve(p)\n\n  xfs.mkdir(p, mode, er => {\n    if (!er) {\n      made = made || p\n      return callback(null, made)\n    }\n    switch (er.code) {\n      case 'ENOENT':\n        if (path.dirname(p) === p) return callback(er)\n        mkdirs(path.dirname(p), opts, (er, made) => {\n          if (er) callback(er, made)\n          else mkdirs(p, opts, callback, made)\n        })\n        break\n\n      // In the case of any other error, just see if there's a dir\n      // there already.  If so, then hooray!  If not, then something\n      // is borked.\n      default:\n        xfs.stat(p, (er2, stat) => {\n          // if the stat fails, then that's super weird.\n          // let the original error be the failure reason.\n          if (er2 || !stat.isDirectory()) callback(er, made)\n          else callback(null, made)\n        })\n        break\n    }\n  })\n}\n\nmodule.exports = mkdirs\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/mkdirs/mkdirs.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/mkdirs/win32.js":
/*!***************************************************!*\
  !*** ./node_modules/fs-extra/lib/mkdirs/win32.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst path = __webpack_require__(/*! path */ \"path\")\n\n// get drive on windows\nfunction getRootPath (p) {\n  p = path.normalize(path.resolve(p)).split(path.sep)\n  if (p.length > 0) return p[0]\n  return null\n}\n\n// http://stackoverflow.com/a/62888/10333 contains more accurate\n// TODO: expand to include the rest\nconst INVALID_PATH_CHARS = /[<>:\"|?*]/\n\nfunction invalidWin32Path (p) {\n  const rp = getRootPath(p)\n  p = p.replace(rp, '')\n  return INVALID_PATH_CHARS.test(p)\n}\n\nmodule.exports = {\n  getRootPath,\n  invalidWin32Path\n}\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/mkdirs/win32.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/move-sync/index.js":
/*!******************************************************!*\
  !*** ./node_modules/fs-extra/lib/move-sync/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  moveSync: __webpack_require__(/*! ./move-sync */ \"./node_modules/fs-extra/lib/move-sync/move-sync.js\")\n}\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/move-sync/index.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/move-sync/move-sync.js":
/*!**********************************************************!*\
  !*** ./node_modules/fs-extra/lib/move-sync/move-sync.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// TODO: enable this once graceful-fs supports bigint option.\n// const fs = require('graceful-fs')\nconst fs = __webpack_require__(/*! fs */ \"fs\")\nconst path = __webpack_require__(/*! path */ \"path\")\nconst copySync = __webpack_require__(/*! ../copy-sync */ \"./node_modules/fs-extra/lib/copy-sync/index.js\").copySync\nconst removeSync = __webpack_require__(/*! ../remove */ \"./node_modules/fs-extra/lib/remove/index.js\").removeSync\nconst mkdirpSync = __webpack_require__(/*! ../mkdirs */ \"./node_modules/fs-extra/lib/mkdirs/index.js\").mkdirpSync\nconst stat = __webpack_require__(/*! ../util/stat */ \"./node_modules/fs-extra/lib/util/stat.js\")\n\nfunction moveSync (src, dest, opts) {\n  opts = opts || {}\n  const overwrite = opts.overwrite || opts.clobber || false\n\n  const { srcStat } = stat.checkPathsSync(src, dest, 'move')\n  stat.checkParentPathsSync(src, srcStat, dest, 'move')\n  mkdirpSync(path.dirname(dest))\n  return doRename(src, dest, overwrite)\n}\n\nfunction doRename (src, dest, overwrite) {\n  if (overwrite) {\n    removeSync(dest)\n    return rename(src, dest, overwrite)\n  }\n  if (fs.existsSync(dest)) throw new Error('dest already exists.')\n  return rename(src, dest, overwrite)\n}\n\nfunction rename (src, dest, overwrite) {\n  try {\n    fs.renameSync(src, dest)\n  } catch (err) {\n    if (err.code !== 'EXDEV') throw err\n    return moveAcrossDevice(src, dest, overwrite)\n  }\n}\n\nfunction moveAcrossDevice (src, dest, overwrite) {\n  const opts = {\n    overwrite,\n    errorOnExist: true\n  }\n  copySync(src, dest, opts)\n  return removeSync(src)\n}\n\nmodule.exports = moveSync\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/move-sync/move-sync.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/move/index.js":
/*!*************************************************!*\
  !*** ./node_modules/fs-extra/lib/move/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst u = __webpack_require__(/*! universalify */ \"./node_modules/universalify/index.js\").fromCallback\nmodule.exports = {\n  move: u(__webpack_require__(/*! ./move */ \"./node_modules/fs-extra/lib/move/move.js\"))\n}\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/move/index.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/move/move.js":
/*!************************************************!*\
  !*** ./node_modules/fs-extra/lib/move/move.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// TODO: enable this once graceful-fs supports bigint option.\n// const fs = require('graceful-fs')\nconst fs = __webpack_require__(/*! fs */ \"fs\")\nconst path = __webpack_require__(/*! path */ \"path\")\nconst copy = __webpack_require__(/*! ../copy */ \"./node_modules/fs-extra/lib/copy/index.js\").copy\nconst remove = __webpack_require__(/*! ../remove */ \"./node_modules/fs-extra/lib/remove/index.js\").remove\nconst mkdirp = __webpack_require__(/*! ../mkdirs */ \"./node_modules/fs-extra/lib/mkdirs/index.js\").mkdirp\nconst pathExists = __webpack_require__(/*! ../path-exists */ \"./node_modules/fs-extra/lib/path-exists/index.js\").pathExists\nconst stat = __webpack_require__(/*! ../util/stat */ \"./node_modules/fs-extra/lib/util/stat.js\")\n\nfunction move (src, dest, opts, cb) {\n  if (typeof opts === 'function') {\n    cb = opts\n    opts = {}\n  }\n\n  const overwrite = opts.overwrite || opts.clobber || false\n\n  stat.checkPaths(src, dest, 'move', (err, stats) => {\n    if (err) return cb(err)\n    const { srcStat } = stats\n    stat.checkParentPaths(src, srcStat, dest, 'move', err => {\n      if (err) return cb(err)\n      mkdirp(path.dirname(dest), err => {\n        if (err) return cb(err)\n        return doRename(src, dest, overwrite, cb)\n      })\n    })\n  })\n}\n\nfunction doRename (src, dest, overwrite, cb) {\n  if (overwrite) {\n    return remove(dest, err => {\n      if (err) return cb(err)\n      return rename(src, dest, overwrite, cb)\n    })\n  }\n  pathExists(dest, (err, destExists) => {\n    if (err) return cb(err)\n    if (destExists) return cb(new Error('dest already exists.'))\n    return rename(src, dest, overwrite, cb)\n  })\n}\n\nfunction rename (src, dest, overwrite, cb) {\n  fs.rename(src, dest, err => {\n    if (!err) return cb()\n    if (err.code !== 'EXDEV') return cb(err)\n    return moveAcrossDevice(src, dest, overwrite, cb)\n  })\n}\n\nfunction moveAcrossDevice (src, dest, overwrite, cb) {\n  const opts = {\n    overwrite,\n    errorOnExist: true\n  }\n  copy(src, dest, opts, err => {\n    if (err) return cb(err)\n    return remove(src, cb)\n  })\n}\n\nmodule.exports = move\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/move/move.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/output/index.js":
/*!***************************************************!*\
  !*** ./node_modules/fs-extra/lib/output/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst u = __webpack_require__(/*! universalify */ \"./node_modules/universalify/index.js\").fromCallback\nconst fs = __webpack_require__(/*! graceful-fs */ \"graceful-fs\")\nconst path = __webpack_require__(/*! path */ \"path\")\nconst mkdir = __webpack_require__(/*! ../mkdirs */ \"./node_modules/fs-extra/lib/mkdirs/index.js\")\nconst pathExists = __webpack_require__(/*! ../path-exists */ \"./node_modules/fs-extra/lib/path-exists/index.js\").pathExists\n\nfunction outputFile (file, data, encoding, callback) {\n  if (typeof encoding === 'function') {\n    callback = encoding\n    encoding = 'utf8'\n  }\n\n  const dir = path.dirname(file)\n  pathExists(dir, (err, itDoes) => {\n    if (err) return callback(err)\n    if (itDoes) return fs.writeFile(file, data, encoding, callback)\n\n    mkdir.mkdirs(dir, err => {\n      if (err) return callback(err)\n\n      fs.writeFile(file, data, encoding, callback)\n    })\n  })\n}\n\nfunction outputFileSync (file, ...args) {\n  const dir = path.dirname(file)\n  if (fs.existsSync(dir)) {\n    return fs.writeFileSync(file, ...args)\n  }\n  mkdir.mkdirsSync(dir)\n  fs.writeFileSync(file, ...args)\n}\n\nmodule.exports = {\n  outputFile: u(outputFile),\n  outputFileSync\n}\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/output/index.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/path-exists/index.js":
/*!********************************************************!*\
  !*** ./node_modules/fs-extra/lib/path-exists/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst u = __webpack_require__(/*! universalify */ \"./node_modules/universalify/index.js\").fromPromise\nconst fs = __webpack_require__(/*! ../fs */ \"./node_modules/fs-extra/lib/fs/index.js\")\n\nfunction pathExists (path) {\n  return fs.access(path).then(() => true).catch(() => false)\n}\n\nmodule.exports = {\n  pathExists: u(pathExists),\n  pathExistsSync: fs.existsSync\n}\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/path-exists/index.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/remove/index.js":
/*!***************************************************!*\
  !*** ./node_modules/fs-extra/lib/remove/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst u = __webpack_require__(/*! universalify */ \"./node_modules/universalify/index.js\").fromCallback\nconst rimraf = __webpack_require__(/*! ./rimraf */ \"./node_modules/fs-extra/lib/remove/rimraf.js\")\n\nmodule.exports = {\n  remove: u(rimraf),\n  removeSync: rimraf.sync\n}\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/remove/index.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/remove/rimraf.js":
/*!****************************************************!*\
  !*** ./node_modules/fs-extra/lib/remove/rimraf.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst fs = __webpack_require__(/*! graceful-fs */ \"graceful-fs\")\nconst path = __webpack_require__(/*! path */ \"path\")\nconst assert = __webpack_require__(/*! assert */ \"assert\")\n\nconst isWindows = (process.platform === 'win32')\n\nfunction defaults (options) {\n  const methods = [\n    'unlink',\n    'chmod',\n    'stat',\n    'lstat',\n    'rmdir',\n    'readdir'\n  ]\n  methods.forEach(m => {\n    options[m] = options[m] || fs[m]\n    m = m + 'Sync'\n    options[m] = options[m] || fs[m]\n  })\n\n  options.maxBusyTries = options.maxBusyTries || 3\n}\n\nfunction rimraf (p, options, cb) {\n  let busyTries = 0\n\n  if (typeof options === 'function') {\n    cb = options\n    options = {}\n  }\n\n  assert(p, 'rimraf: missing path')\n  assert.strictEqual(typeof p, 'string', 'rimraf: path should be a string')\n  assert.strictEqual(typeof cb, 'function', 'rimraf: callback function required')\n  assert(options, 'rimraf: invalid options argument provided')\n  assert.strictEqual(typeof options, 'object', 'rimraf: options should be object')\n\n  defaults(options)\n\n  rimraf_(p, options, function CB (er) {\n    if (er) {\n      if ((er.code === 'EBUSY' || er.code === 'ENOTEMPTY' || er.code === 'EPERM') &&\n          busyTries < options.maxBusyTries) {\n        busyTries++\n        const time = busyTries * 100\n        // try again, with the same exact callback as this one.\n        return setTimeout(() => rimraf_(p, options, CB), time)\n      }\n\n      // already gone\n      if (er.code === 'ENOENT') er = null\n    }\n\n    cb(er)\n  })\n}\n\n// Two possible strategies.\n// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR\n// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR\n//\n// Both result in an extra syscall when you guess wrong.  However, there\n// are likely far more normal files in the world than directories.  This\n// is based on the assumption that a the average number of files per\n// directory is >= 1.\n//\n// If anyone ever complains about this, then I guess the strategy could\n// be made configurable somehow.  But until then, YAGNI.\nfunction rimraf_ (p, options, cb) {\n  assert(p)\n  assert(options)\n  assert(typeof cb === 'function')\n\n  // sunos lets the root user unlink directories, which is... weird.\n  // so we have to lstat here and make sure it's not a dir.\n  options.lstat(p, (er, st) => {\n    if (er && er.code === 'ENOENT') {\n      return cb(null)\n    }\n\n    // Windows can EPERM on stat.  Life is suffering.\n    if (er && er.code === 'EPERM' && isWindows) {\n      return fixWinEPERM(p, options, er, cb)\n    }\n\n    if (st && st.isDirectory()) {\n      return rmdir(p, options, er, cb)\n    }\n\n    options.unlink(p, er => {\n      if (er) {\n        if (er.code === 'ENOENT') {\n          return cb(null)\n        }\n        if (er.code === 'EPERM') {\n          return (isWindows)\n            ? fixWinEPERM(p, options, er, cb)\n            : rmdir(p, options, er, cb)\n        }\n        if (er.code === 'EISDIR') {\n          return rmdir(p, options, er, cb)\n        }\n      }\n      return cb(er)\n    })\n  })\n}\n\nfunction fixWinEPERM (p, options, er, cb) {\n  assert(p)\n  assert(options)\n  assert(typeof cb === 'function')\n  if (er) {\n    assert(er instanceof Error)\n  }\n\n  options.chmod(p, 0o666, er2 => {\n    if (er2) {\n      cb(er2.code === 'ENOENT' ? null : er)\n    } else {\n      options.stat(p, (er3, stats) => {\n        if (er3) {\n          cb(er3.code === 'ENOENT' ? null : er)\n        } else if (stats.isDirectory()) {\n          rmdir(p, options, er, cb)\n        } else {\n          options.unlink(p, cb)\n        }\n      })\n    }\n  })\n}\n\nfunction fixWinEPERMSync (p, options, er) {\n  let stats\n\n  assert(p)\n  assert(options)\n  if (er) {\n    assert(er instanceof Error)\n  }\n\n  try {\n    options.chmodSync(p, 0o666)\n  } catch (er2) {\n    if (er2.code === 'ENOENT') {\n      return\n    } else {\n      throw er\n    }\n  }\n\n  try {\n    stats = options.statSync(p)\n  } catch (er3) {\n    if (er3.code === 'ENOENT') {\n      return\n    } else {\n      throw er\n    }\n  }\n\n  if (stats.isDirectory()) {\n    rmdirSync(p, options, er)\n  } else {\n    options.unlinkSync(p)\n  }\n}\n\nfunction rmdir (p, options, originalEr, cb) {\n  assert(p)\n  assert(options)\n  if (originalEr) {\n    assert(originalEr instanceof Error)\n  }\n  assert(typeof cb === 'function')\n\n  // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)\n  // if we guessed wrong, and it's not a directory, then\n  // raise the original error.\n  options.rmdir(p, er => {\n    if (er && (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM')) {\n      rmkids(p, options, cb)\n    } else if (er && er.code === 'ENOTDIR') {\n      cb(originalEr)\n    } else {\n      cb(er)\n    }\n  })\n}\n\nfunction rmkids (p, options, cb) {\n  assert(p)\n  assert(options)\n  assert(typeof cb === 'function')\n\n  options.readdir(p, (er, files) => {\n    if (er) return cb(er)\n\n    let n = files.length\n    let errState\n\n    if (n === 0) return options.rmdir(p, cb)\n\n    files.forEach(f => {\n      rimraf(path.join(p, f), options, er => {\n        if (errState) {\n          return\n        }\n        if (er) return cb(errState = er)\n        if (--n === 0) {\n          options.rmdir(p, cb)\n        }\n      })\n    })\n  })\n}\n\n// this looks simpler, and is strictly *faster*, but will\n// tie up the JavaScript thread and fail on excessively\n// deep directory trees.\nfunction rimrafSync (p, options) {\n  let st\n\n  options = options || {}\n  defaults(options)\n\n  assert(p, 'rimraf: missing path')\n  assert.strictEqual(typeof p, 'string', 'rimraf: path should be a string')\n  assert(options, 'rimraf: missing options')\n  assert.strictEqual(typeof options, 'object', 'rimraf: options should be object')\n\n  try {\n    st = options.lstatSync(p)\n  } catch (er) {\n    if (er.code === 'ENOENT') {\n      return\n    }\n\n    // Windows can EPERM on stat.  Life is suffering.\n    if (er.code === 'EPERM' && isWindows) {\n      fixWinEPERMSync(p, options, er)\n    }\n  }\n\n  try {\n    // sunos lets the root user unlink directories, which is... weird.\n    if (st && st.isDirectory()) {\n      rmdirSync(p, options, null)\n    } else {\n      options.unlinkSync(p)\n    }\n  } catch (er) {\n    if (er.code === 'ENOENT') {\n      return\n    } else if (er.code === 'EPERM') {\n      return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er)\n    } else if (er.code !== 'EISDIR') {\n      throw er\n    }\n    rmdirSync(p, options, er)\n  }\n}\n\nfunction rmdirSync (p, options, originalEr) {\n  assert(p)\n  assert(options)\n  if (originalEr) {\n    assert(originalEr instanceof Error)\n  }\n\n  try {\n    options.rmdirSync(p)\n  } catch (er) {\n    if (er.code === 'ENOTDIR') {\n      throw originalEr\n    } else if (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM') {\n      rmkidsSync(p, options)\n    } else if (er.code !== 'ENOENT') {\n      throw er\n    }\n  }\n}\n\nfunction rmkidsSync (p, options) {\n  assert(p)\n  assert(options)\n  options.readdirSync(p).forEach(f => rimrafSync(path.join(p, f), options))\n\n  if (isWindows) {\n    // We only end up here once we got ENOTEMPTY at least once, and\n    // at this point, we are guaranteed to have removed all the kids.\n    // So, we know that it won't be ENOENT or ENOTDIR or anything else.\n    // try really hard to delete stuff on windows, because it has a\n    // PROFOUNDLY annoying habit of not closing handles promptly when\n    // files are deleted, resulting in spurious ENOTEMPTY errors.\n    const startTime = Date.now()\n    do {\n      try {\n        const ret = options.rmdirSync(p, options)\n        return ret\n      } catch (er) { }\n    } while (Date.now() - startTime < 500) // give up after 500ms\n  } else {\n    const ret = options.rmdirSync(p, options)\n    return ret\n  }\n}\n\nmodule.exports = rimraf\nrimraf.sync = rimrafSync\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/remove/rimraf.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/util/buffer.js":
/*!**************************************************!*\
  !*** ./node_modules/fs-extra/lib/util/buffer.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/* eslint-disable node/no-deprecated-api */\nmodule.exports = function (size) {\n  if (typeof Buffer.allocUnsafe === 'function') {\n    try {\n      return Buffer.allocUnsafe(size)\n    } catch (e) {\n      return new Buffer(size)\n    }\n  }\n  return new Buffer(size)\n}\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/util/buffer.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/util/stat.js":
/*!************************************************!*\
  !*** ./node_modules/fs-extra/lib/util/stat.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// TODO: enable this once graceful-fs supports bigint option.\n// const fs = require('graceful-fs')\nconst fs = __webpack_require__(/*! fs */ \"fs\")\nconst path = __webpack_require__(/*! path */ \"path\")\n\nconst NODE_VERSION_MAJOR_WITH_BIGINT = 10\nconst NODE_VERSION_MINOR_WITH_BIGINT = 5\nconst NODE_VERSION_PATCH_WITH_BIGINT = 0\nconst nodeVersion = process.versions.node.split('.')\nconst nodeVersionMajor = Number.parseInt(nodeVersion[0], 10)\nconst nodeVersionMinor = Number.parseInt(nodeVersion[1], 10)\nconst nodeVersionPatch = Number.parseInt(nodeVersion[2], 10)\n\nfunction nodeSupportsBigInt () {\n  if (nodeVersionMajor > NODE_VERSION_MAJOR_WITH_BIGINT) {\n    return true\n  } else if (nodeVersionMajor === NODE_VERSION_MAJOR_WITH_BIGINT) {\n    if (nodeVersionMinor > NODE_VERSION_MINOR_WITH_BIGINT) {\n      return true\n    } else if (nodeVersionMinor === NODE_VERSION_MINOR_WITH_BIGINT) {\n      if (nodeVersionPatch >= NODE_VERSION_PATCH_WITH_BIGINT) {\n        return true\n      }\n    }\n  }\n  return false\n}\n\nfunction getStats (src, dest, cb) {\n  if (nodeSupportsBigInt()) {\n    fs.stat(src, { bigint: true }, (err, srcStat) => {\n      if (err) return cb(err)\n      fs.stat(dest, { bigint: true }, (err, destStat) => {\n        if (err) {\n          if (err.code === 'ENOENT') return cb(null, { srcStat, destStat: null })\n          return cb(err)\n        }\n        return cb(null, { srcStat, destStat })\n      })\n    })\n  } else {\n    fs.stat(src, (err, srcStat) => {\n      if (err) return cb(err)\n      fs.stat(dest, (err, destStat) => {\n        if (err) {\n          if (err.code === 'ENOENT') return cb(null, { srcStat, destStat: null })\n          return cb(err)\n        }\n        return cb(null, { srcStat, destStat })\n      })\n    })\n  }\n}\n\nfunction getStatsSync (src, dest) {\n  let srcStat, destStat\n  if (nodeSupportsBigInt()) {\n    srcStat = fs.statSync(src, { bigint: true })\n  } else {\n    srcStat = fs.statSync(src)\n  }\n  try {\n    if (nodeSupportsBigInt()) {\n      destStat = fs.statSync(dest, { bigint: true })\n    } else {\n      destStat = fs.statSync(dest)\n    }\n  } catch (err) {\n    if (err.code === 'ENOENT') return { srcStat, destStat: null }\n    throw err\n  }\n  return { srcStat, destStat }\n}\n\nfunction checkPaths (src, dest, funcName, cb) {\n  getStats(src, dest, (err, stats) => {\n    if (err) return cb(err)\n    const { srcStat, destStat } = stats\n    if (destStat && destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {\n      return cb(new Error('Source and destination must not be the same.'))\n    }\n    if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {\n      return cb(new Error(errMsg(src, dest, funcName)))\n    }\n    return cb(null, { srcStat, destStat })\n  })\n}\n\nfunction checkPathsSync (src, dest, funcName) {\n  const { srcStat, destStat } = getStatsSync(src, dest)\n  if (destStat && destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {\n    throw new Error('Source and destination must not be the same.')\n  }\n  if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {\n    throw new Error(errMsg(src, dest, funcName))\n  }\n  return { srcStat, destStat }\n}\n\n// recursively check if dest parent is a subdirectory of src.\n// It works for all file types including symlinks since it\n// checks the src and dest inodes. It starts from the deepest\n// parent and stops once it reaches the src parent or the root path.\nfunction checkParentPaths (src, srcStat, dest, funcName, cb) {\n  const srcParent = path.resolve(path.dirname(src))\n  const destParent = path.resolve(path.dirname(dest))\n  if (destParent === srcParent || destParent === path.parse(destParent).root) return cb()\n  if (nodeSupportsBigInt()) {\n    fs.stat(destParent, { bigint: true }, (err, destStat) => {\n      if (err) {\n        if (err.code === 'ENOENT') return cb()\n        return cb(err)\n      }\n      if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {\n        return cb(new Error(errMsg(src, dest, funcName)))\n      }\n      return checkParentPaths(src, srcStat, destParent, funcName, cb)\n    })\n  } else {\n    fs.stat(destParent, (err, destStat) => {\n      if (err) {\n        if (err.code === 'ENOENT') return cb()\n        return cb(err)\n      }\n      if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {\n        return cb(new Error(errMsg(src, dest, funcName)))\n      }\n      return checkParentPaths(src, srcStat, destParent, funcName, cb)\n    })\n  }\n}\n\nfunction checkParentPathsSync (src, srcStat, dest, funcName) {\n  const srcParent = path.resolve(path.dirname(src))\n  const destParent = path.resolve(path.dirname(dest))\n  if (destParent === srcParent || destParent === path.parse(destParent).root) return\n  let destStat\n  try {\n    if (nodeSupportsBigInt()) {\n      destStat = fs.statSync(destParent, { bigint: true })\n    } else {\n      destStat = fs.statSync(destParent)\n    }\n  } catch (err) {\n    if (err.code === 'ENOENT') return\n    throw err\n  }\n  if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {\n    throw new Error(errMsg(src, dest, funcName))\n  }\n  return checkParentPathsSync(src, srcStat, destParent, funcName)\n}\n\n// return true if dest is a subdir of src, otherwise false.\n// It only checks the path strings.\nfunction isSrcSubdir (src, dest) {\n  const srcArr = path.resolve(src).split(path.sep).filter(i => i)\n  const destArr = path.resolve(dest).split(path.sep).filter(i => i)\n  return srcArr.reduce((acc, cur, i) => acc && destArr[i] === cur, true)\n}\n\nfunction errMsg (src, dest, funcName) {\n  return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`\n}\n\nmodule.exports = {\n  checkPaths,\n  checkPathsSync,\n  checkParentPaths,\n  checkParentPathsSync,\n  isSrcSubdir\n}\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/util/stat.js?");

/***/ }),

/***/ "./node_modules/fs-extra/lib/util/utimes.js":
/*!**************************************************!*\
  !*** ./node_modules/fs-extra/lib/util/utimes.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst fs = __webpack_require__(/*! graceful-fs */ \"graceful-fs\")\nconst os = __webpack_require__(/*! os */ \"os\")\nconst path = __webpack_require__(/*! path */ \"path\")\n\n// HFS, ext{2,3}, FAT do not, Node.js v0.10 does not\nfunction hasMillisResSync () {\n  let tmpfile = path.join('millis-test-sync' + Date.now().toString() + Math.random().toString().slice(2))\n  tmpfile = path.join(os.tmpdir(), tmpfile)\n\n  // 550 millis past UNIX epoch\n  const d = new Date(1435410243862)\n  fs.writeFileSync(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141')\n  const fd = fs.openSync(tmpfile, 'r+')\n  fs.futimesSync(fd, d, d)\n  fs.closeSync(fd)\n  return fs.statSync(tmpfile).mtime > 1435410243000\n}\n\nfunction hasMillisRes (callback) {\n  let tmpfile = path.join('millis-test' + Date.now().toString() + Math.random().toString().slice(2))\n  tmpfile = path.join(os.tmpdir(), tmpfile)\n\n  // 550 millis past UNIX epoch\n  const d = new Date(1435410243862)\n  fs.writeFile(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141', err => {\n    if (err) return callback(err)\n    fs.open(tmpfile, 'r+', (err, fd) => {\n      if (err) return callback(err)\n      fs.futimes(fd, d, d, err => {\n        if (err) return callback(err)\n        fs.close(fd, err => {\n          if (err) return callback(err)\n          fs.stat(tmpfile, (err, stats) => {\n            if (err) return callback(err)\n            callback(null, stats.mtime > 1435410243000)\n          })\n        })\n      })\n    })\n  })\n}\n\nfunction timeRemoveMillis (timestamp) {\n  if (typeof timestamp === 'number') {\n    return Math.floor(timestamp / 1000) * 1000\n  } else if (timestamp instanceof Date) {\n    return new Date(Math.floor(timestamp.getTime() / 1000) * 1000)\n  } else {\n    throw new Error('fs-extra: timeRemoveMillis() unknown parameter type')\n  }\n}\n\nfunction utimesMillis (path, atime, mtime, callback) {\n  // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)\n  fs.open(path, 'r+', (err, fd) => {\n    if (err) return callback(err)\n    fs.futimes(fd, atime, mtime, futimesErr => {\n      fs.close(fd, closeErr => {\n        if (callback) callback(futimesErr || closeErr)\n      })\n    })\n  })\n}\n\nfunction utimesMillisSync (path, atime, mtime) {\n  const fd = fs.openSync(path, 'r+')\n  fs.futimesSync(fd, atime, mtime)\n  return fs.closeSync(fd)\n}\n\nmodule.exports = {\n  hasMillisRes,\n  hasMillisResSync,\n  timeRemoveMillis,\n  utimesMillis,\n  utimesMillisSync\n}\n\n\n//# sourceURL=webpack:///./node_modules/fs-extra/lib/util/utimes.js?");

/***/ }),

/***/ "./node_modules/jsonfile/index.js":
/*!****************************************!*\
  !*** ./node_modules/jsonfile/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _fs\ntry {\n  _fs = __webpack_require__(/*! graceful-fs */ \"graceful-fs\")\n} catch (_) {\n  _fs = __webpack_require__(/*! fs */ \"fs\")\n}\n\nfunction readFile (file, options, callback) {\n  if (callback == null) {\n    callback = options\n    options = {}\n  }\n\n  if (typeof options === 'string') {\n    options = {encoding: options}\n  }\n\n  options = options || {}\n  var fs = options.fs || _fs\n\n  var shouldThrow = true\n  if ('throws' in options) {\n    shouldThrow = options.throws\n  }\n\n  fs.readFile(file, options, function (err, data) {\n    if (err) return callback(err)\n\n    data = stripBom(data)\n\n    var obj\n    try {\n      obj = JSON.parse(data, options ? options.reviver : null)\n    } catch (err2) {\n      if (shouldThrow) {\n        err2.message = file + ': ' + err2.message\n        return callback(err2)\n      } else {\n        return callback(null, null)\n      }\n    }\n\n    callback(null, obj)\n  })\n}\n\nfunction readFileSync (file, options) {\n  options = options || {}\n  if (typeof options === 'string') {\n    options = {encoding: options}\n  }\n\n  var fs = options.fs || _fs\n\n  var shouldThrow = true\n  if ('throws' in options) {\n    shouldThrow = options.throws\n  }\n\n  try {\n    var content = fs.readFileSync(file, options)\n    content = stripBom(content)\n    return JSON.parse(content, options.reviver)\n  } catch (err) {\n    if (shouldThrow) {\n      err.message = file + ': ' + err.message\n      throw err\n    } else {\n      return null\n    }\n  }\n}\n\nfunction stringify (obj, options) {\n  var spaces\n  var EOL = '\\n'\n  if (typeof options === 'object' && options !== null) {\n    if (options.spaces) {\n      spaces = options.spaces\n    }\n    if (options.EOL) {\n      EOL = options.EOL\n    }\n  }\n\n  var str = JSON.stringify(obj, options ? options.replacer : null, spaces)\n\n  return str.replace(/\\n/g, EOL) + EOL\n}\n\nfunction writeFile (file, obj, options, callback) {\n  if (callback == null) {\n    callback = options\n    options = {}\n  }\n  options = options || {}\n  var fs = options.fs || _fs\n\n  var str = ''\n  try {\n    str = stringify(obj, options)\n  } catch (err) {\n    // Need to return whether a callback was passed or not\n    if (callback) callback(err, null)\n    return\n  }\n\n  fs.writeFile(file, str, options, callback)\n}\n\nfunction writeFileSync (file, obj, options) {\n  options = options || {}\n  var fs = options.fs || _fs\n\n  var str = stringify(obj, options)\n  // not sure if fs.writeFileSync returns anything, but just in case\n  return fs.writeFileSync(file, str, options)\n}\n\nfunction stripBom (content) {\n  // we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified\n  if (Buffer.isBuffer(content)) content = content.toString('utf8')\n  content = content.replace(/^\\uFEFF/, '')\n  return content\n}\n\nvar jsonfile = {\n  readFile: readFile,\n  readFileSync: readFileSync,\n  writeFile: writeFile,\n  writeFileSync: writeFileSync\n}\n\nmodule.exports = jsonfile\n\n\n//# sourceURL=webpack:///./node_modules/jsonfile/index.js?");

/***/ }),

/***/ "./node_modules/leven/index.js":
/*!*************************************!*\
  !*** ./node_modules/leven/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* eslint-disable no-nested-ternary */\n\nvar arr = [];\nvar charCodeCache = [];\n\nmodule.exports = function (a, b) {\n\tif (a === b) {\n\t\treturn 0;\n\t}\n\n\tvar swap = a;\n\n\t// Swapping the strings if `a` is longer than `b` so we know which one is the\n\t// shortest & which one is the longest\n\tif (a.length > b.length) {\n\t\ta = b;\n\t\tb = swap;\n\t}\n\n\tvar aLen = a.length;\n\tvar bLen = b.length;\n\n\tif (aLen === 0) {\n\t\treturn bLen;\n\t}\n\n\tif (bLen === 0) {\n\t\treturn aLen;\n\t}\n\n\t// Performing suffix trimming:\n\t// We can linearly drop suffix common to both strings since they\n\t// don't increase distance at all\n\t// Note: `~-` is the bitwise way to perform a `- 1` operation\n\twhile (aLen > 0 && (a.charCodeAt(~-aLen) === b.charCodeAt(~-bLen))) {\n\t\taLen--;\n\t\tbLen--;\n\t}\n\n\tif (aLen === 0) {\n\t\treturn bLen;\n\t}\n\n\t// Performing prefix trimming\n\t// We can linearly drop prefix common to both strings since they\n\t// don't increase distance at all\n\tvar start = 0;\n\n\twhile (start < aLen && (a.charCodeAt(start) === b.charCodeAt(start))) {\n\t\tstart++;\n\t}\n\n\taLen -= start;\n\tbLen -= start;\n\n\tif (aLen === 0) {\n\t\treturn bLen;\n\t}\n\n\tvar bCharCode;\n\tvar ret;\n\tvar tmp;\n\tvar tmp2;\n\tvar i = 0;\n\tvar j = 0;\n\n\twhile (i < aLen) {\n\t\tcharCodeCache[start + i] = a.charCodeAt(start + i);\n\t\tarr[i] = ++i;\n\t}\n\n\twhile (j < bLen) {\n\t\tbCharCode = b.charCodeAt(start + j);\n\t\ttmp = j++;\n\t\tret = j;\n\n\t\tfor (i = 0; i < aLen; i++) {\n\t\t\ttmp2 = bCharCode === charCodeCache[start + i] ? tmp : tmp + 1;\n\t\t\ttmp = arr[i];\n\t\t\tret = arr[i] = tmp > ret ? tmp2 > ret ? ret + 1 : tmp2 : tmp2 > tmp ? tmp + 1 : tmp2;\n\t\t}\n\t}\n\n\treturn ret;\n};\n\n\n//# sourceURL=webpack:///./node_modules/leven/index.js?");

/***/ }),

/***/ "./node_modules/mri/lib/index.js":
/*!***************************************!*\
  !*** ./node_modules/mri/lib/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function toArr(any) {\n\treturn any == null ? [] : Array.isArray(any) ? any : [any];\n}\n\nfunction toVal(out, key, val, opts) {\n\tvar x, old=out[key], nxt=(\n\t\t!!~opts.string.indexOf(key) ? (val == null || val === true ? '' : String(val))\n\t\t: typeof val === 'boolean' ? val\n\t\t: !!~opts.boolean.indexOf(key) ? (val === 'false' ? false : val === 'true' || (out._.push((x = +val,x * 0 === 0) ? x : val),!!val))\n\t\t: (x = +val,x * 0 === 0) ? x : val\n\t);\n\tout[key] = old == null ? nxt : (Array.isArray(old) ? old.concat(nxt) : [old, nxt]);\n}\n\nmodule.exports = function (args, opts) {\n\targs = args || [];\n\topts = opts || {};\n\n\tvar k, arr, arg, name, val, out={ _:[] };\n\tvar i=0, j=0, idx=0, len=args.length;\n\n\tconst alibi = opts.alias !== void 0;\n\tconst strict = opts.unknown !== void 0;\n\tconst defaults = opts.default !== void 0;\n\n\topts.alias = opts.alias || {};\n\topts.string = toArr(opts.string);\n\topts.boolean = toArr(opts.boolean);\n\n\tif (alibi) {\n\t\tfor (k in opts.alias) {\n\t\t\tarr = opts.alias[k] = toArr(opts.alias[k]);\n\t\t\tfor (i=0; i < arr.length; i++) {\n\t\t\t\t(opts.alias[arr[i]] = arr.concat(k)).splice(i, 1);\n\t\t\t}\n\t\t}\n\t}\n\n\topts.boolean.forEach(key => {\n\t\topts.boolean = opts.boolean.concat(opts.alias[key] = opts.alias[key] || []);\n\t});\n\n\topts.string.forEach(key => {\n\t\topts.string = opts.string.concat(opts.alias[key] = opts.alias[key] || []);\n\t});\n\n\tif (defaults) {\n\t\tfor (k in opts.default) {\n\t\t\topts.alias[k] = opts.alias[k] || [];\n\t\t\t(opts[typeof opts.default[k]] || []).push(k);\n\t\t}\n\t}\n\n\tconst keys = strict ? Object.keys(opts.alias) : [];\n\n\tfor (i=0; i < len; i++) {\n\t\targ = args[i];\n\n\t\tif (arg === '--') {\n\t\t\tout._ = out._.concat(args.slice(++i));\n\t\t\tbreak;\n\t\t}\n\n\t\tfor (j=0; j < arg.length; j++) {\n\t\t\tif (arg.charCodeAt(j) !== 45) break; // \"-\"\n\t\t}\n\n\t\tif (j === 0) {\n\t\t\tout._.push(arg);\n\t\t} else if (arg.substring(j, j + 3) === 'no-') {\n\t\t\tname = arg.substring(j + 3);\n\t\t\tif (strict && !~keys.indexOf(name)) {\n\t\t\t\treturn opts.unknown(arg);\n\t\t\t}\n\t\t\tout[name] = false;\n\t\t} else {\n\t\t\tfor (idx=j+1; idx < arg.length; idx++) {\n\t\t\t\tif (arg.charCodeAt(idx) === 61) break; // \"=\"\n\t\t\t}\n\n\t\t\tname = arg.substring(j, idx);\n\t\t\tval = arg.substring(++idx) || (i+1 === len || (''+args[i+1]).charCodeAt(0) === 45 || args[++i]);\n\t\t\tarr = (j === 2 ? [name] : name);\n\n\t\t\tfor (idx=0; idx < arr.length; idx++) {\n\t\t\t\tname = arr[idx];\n\t\t\t\tif (strict && !~keys.indexOf(name)) return opts.unknown('-'.repeat(j) + name);\n\t\t\t\ttoVal(out, name, (idx + 1 < arr.length) || val, opts);\n\t\t\t}\n\t\t}\n\t}\n\n\tif (defaults) {\n\t\tfor (k in opts.default) {\n\t\t\tif (out[k] === void 0) {\n\t\t\t\tout[k] = opts.default[k];\n\t\t\t}\n\t\t}\n\t}\n\n\tif (alibi) {\n\t\tfor (k in out) {\n\t\t\tarr = opts.alias[k] || [];\n\t\t\twhile (arr.length > 0) {\n\t\t\t\tout[arr.shift()] = out[k];\n\t\t\t}\n\t\t}\n\t}\n\n\treturn out;\n}\n\n\n//# sourceURL=webpack:///./node_modules/mri/lib/index.js?");

/***/ }),

/***/ "./node_modules/universalify/index.js":
/*!********************************************!*\
  !*** ./node_modules/universalify/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.fromCallback = function (fn) {\n  return Object.defineProperty(function () {\n    if (typeof arguments[arguments.length - 1] === 'function') fn.apply(this, arguments)\n    else {\n      return new Promise((resolve, reject) => {\n        arguments[arguments.length] = (err, res) => {\n          if (err) return reject(err)\n          resolve(res)\n        }\n        arguments.length++\n        fn.apply(this, arguments)\n      })\n    }\n  }, 'name', { value: fn.name })\n}\n\nexports.fromPromise = function (fn) {\n  return Object.defineProperty(function () {\n    const cb = arguments[arguments.length - 1]\n    if (typeof cb !== 'function') return fn.apply(this, arguments)\n    else fn.apply(this, arguments).then(r => cb(null, r), cb)\n  }, 'name', { value: fn.name })\n}\n\n\n//# sourceURL=webpack:///./node_modules/universalify/index.js?");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"assert\");\n\n//# sourceURL=webpack:///external_%22assert%22?");

/***/ }),

/***/ "camelcase":
/*!****************************!*\
  !*** external "camelcase" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"camelcase\");\n\n//# sourceURL=webpack:///external_%22camelcase%22?");

/***/ }),

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"chalk\");\n\n//# sourceURL=webpack:///external_%22chalk%22?");

/***/ }),

/***/ "child-process-promise":
/*!****************************************!*\
  !*** external "child-process-promise" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"child-process-promise\");\n\n//# sourceURL=webpack:///external_%22child-process-promise%22?");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"child_process\");\n\n//# sourceURL=webpack:///external_%22child_process%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "graceful-fs":
/*!******************************!*\
  !*** external "graceful-fs" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graceful-fs\");\n\n//# sourceURL=webpack:///external_%22graceful-fs%22?");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"os\");\n\n//# sourceURL=webpack:///external_%22os%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "progress":
/*!***************************!*\
  !*** external "progress" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"progress\");\n\n//# sourceURL=webpack:///external_%22progress%22?");

/***/ })

/******/ });