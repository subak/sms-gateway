require(process.cwd() + "/app/config/require.js")(["lib/main"], (Main) => new Main);

process.on('unhandledRejection', console.dir);
process.on('uncaughtException', console.dir);