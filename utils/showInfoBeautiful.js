const chalk = require("chalk");
module.exports = function showInfoBeautiful(msg, importantMsg, color) {
    try {
        if (!msg) throw new Error('there must have a msg in function showInfoBeautiful!');
        if (color && chalk[color] === undefined) throw new Error('the color not defined');
        let time = new Date().toLocaleTimeString()
        if (importantMsg) console.log("[" + chalk.yellow(time) + "]" + chalk.white(msg) + " " + chalk[color || 'red'](importantMsg))
        else console.log("[" + chalk.yellow(time) + "]" + chalk.white(msg))
    } catch (err) {
        chalk.red(err);
    }
}