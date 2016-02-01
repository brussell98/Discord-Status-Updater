/// <reference path="typings/main.d.ts" />
var discord = require("discord.js");
var readline = require("readline");
try { var config = require("./config.json");
} catch (error) { console.log("Config not found"); }

var bot = new discord.Client();

bot.on("ready", () => {
	console.log("Discord Status Updater ready to use! Logged in as " + bot.user.username);
	console.log("Press Ctrl+D to exit");

	var rl = readline.createInterface(process.stdin, process.stdout);

	rl.setPrompt("Status> ");
	rl.prompt();

	rl.on("line", (line) => {
		if (line.trim() == "") { bot.setPlayingGame(null);
		} else { bot.setPlayingGame(line); }
		rl.prompt();
	}).on("close", () => {
		console.log("\nLogged out");
		process.exit(0);
	});
});

bot.on("disconnected", () => { console.log("\nLost connection to discord"); process.exit(0); });

if (config.email && config.password) { bot.login(config.email, config.password);
} else {
	if (!config.email) { console.log("email not found in config"); }
	if (!config.password) { console.log("password not found in config"); }
}
