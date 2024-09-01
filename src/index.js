#!/usr/bin/env node

const yargs = require("yargs/yargs");
const configCmd = require("./config/command");
const createCmd = require("./create/command");

async function main() {
    const cli = yargs();
    cli
    .usage(`Usage: xh <command> [options]`)
    .demandCommand(1, "至少需要一个命令")
    .strict() 
    .recommendCommands()
    .command(configCmd)
    .command(createCmd)
    .parse(process.argv.slice(2));
}

main().catch((err) => {
    console.error(err);
});