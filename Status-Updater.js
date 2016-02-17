/// <reference path="typings/main.d.ts" />
var discord = require("discord.js");
var readline = require("readline");
try { var config = require("./config.json");
} catch (error) { console.log("Config not found"); }

var bot = new discord.Client();
var auto = false;
var currentGame = "";

bot.on("ready", () => {
	console.log("Discord Status Updater ready to use! Logged in as " + bot.user.username);
	console.log("Press Ctrl+D to exit");

	setInterval(() => {
		autoUpdate();
	}, 30000);

	var rl = readline.createInterface(process.stdin, process.stdout);

	rl.setPrompt("> ");
	rl.prompt();

	rl.on("line", (line) => {
		if (line.trim() == "") { bot.setPlayingGame(null);
		} else if (line.trim() == "auto") {
			if (!auto) { auto = true; autoUpdate();
			} else { auto = false; bot.setPlayingGame(null); }
		} else {
			if (line != currentGame) { bot.setPlayingGame(line); }
		}
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

function autoUpdate() {
	if (auto) {
		getTasks();
	}
}

function getTasks() {
	var spawn = require("child_process").spawn;
	var tl = spawn("tasklist", ["-v", "/fo", "csv"]);
	var processes = [];

	tl.stdout.on("data", (data) => {
		processes.push(data);
	});
	tl.stderr.on("data", (data) => {
		console.log(`stderr: ${data}`);
	});
	tl.on("close", (code) => {
		checkForMatch(processes.join("").split("\r\n"));
	});
}

function checkForMatch(list) {
	for (var i = 0; i <= list.length; i++) {
		if (i == list.length) {
			if (currentGame !== "") {
				bot.setPlayingGame(null);
				currentGame = "";
				console.log("Unset game");
			}
		} else if (list[i].startsWith("\"mpc-hc.exe")) {
			if (/:\d\d",".+"$/.exec(list[i]) !== null) {
				var title = /:\d\d",".+"$/.exec(list[i])[0].substr(6).replace(/"$/, "");
				if (title !== "N/A") {
					title = title.replace(/\[[^\]]+\]/g, "").replace(/_/g, " ").replace(/\.[a-zA-Z]{3,5}$/, "").trim();
					if (title != currentGame) {
						bot.setPlayingGame(title);
						console.log(title);
						currentGame = title;
						i = list.length + 1;
					} else { i = list.length + 1; }
				}
			}
		}
	}
}
