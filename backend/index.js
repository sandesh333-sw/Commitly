const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init.js");
const { addRepo } = require("./controllers/add.js");
const { commitRepo } = require("./controllers/commit.js");
const { pushRepo } = require("./controllers/push.js");
const { pullRepo } = require("./controllers/pull.js");
const { revertRepo } = require("./controllers/revert.js");

yargs(hideBin(process.argv))
  .command("init", "Initialise a new repository", {}, initRepo)

  .command(
    "add<file>",
    "Add a file to repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to be added to staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    }
  )

  .command(
    "commit",
    "commit the staged files",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    commitRepo
  )

  .command("push", "Push commits", {}, pushRepo)

  .command("pull", "pull commits from repo", {}, pullRepo)

  .command(
    "revert",
    "revert to specific commit",
    (yargs) => {
      yargs.positional("commitId", "revert to specific commit", {
        describe: "Commit id ",
        type: "string",
      });
    },
    revertRepo
  )

  .demandCommand(1, "Please insert at least one command")
  .help().argv;
