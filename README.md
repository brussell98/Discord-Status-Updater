# Discord Status Updater

A status updater for Discord using NodeJS and [Discord.js](https://github.com/hydrabolt/discord.js/).

[Website](http://brussell98.github.io/Discord-Status-Updater/)   
[Get the latest version here](https://github.com/brussell98/Discord-Status-Updater/releases/latest)   

## How to use:
Install Python 2.7.X   
Install NodeJS 5.X.X   
(Make sure you add both of those to your PATH. It's in the installer options.)

Run `npm i` in the root directory (`C:\...\Discord-Status-Updater\> npm i`)   
If you don't have a C++ compiler you will see some warnings related to `node-opus`, but you can ignore those.   
Using `config.json.example` make a new file called `config.json` with your email and password.   
Now just open `run.bat` or run `node Status-Updater.js --harmony`

**Note:** You won't see your updated status but others will.

---

## Extra Features:

Automatic detection for MPC-HC (Windows only)   
To enable/disable this type `auto`   
   
__If you want a player added follow these steps:__   
1. Make sure the video player puts the filename in the window title   
2. Contact me on Discord or make an issue and state these things:   
> Name of the executable (ex: `mpc-hc.exe`) (case sensitive)   
> The format of the title (ex: `VLC - File Name`)   
