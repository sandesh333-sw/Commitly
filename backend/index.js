const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const {Server} = require("socket.io");
dotenv.config();
const mainRouter = require("./routes/main.router.js");

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init.js");
const { addRepo } = require("./controllers/add.js");
const { commitRepo } = require("./controllers/commit.js");
const { pushRepo } = require("./controllers/push.js");
const { pullRepo } = require("./controllers/pull.js");
const { revertRepo } = require("./controllers/revert.js");

yargs(hideBin(process.argv))
  .command("start", "Starts a new server", {}, startServer)
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
    "commit <message>",
    "commit the staged files",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    }
    
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
    (argv) => {
      revertRepo(argv.commitID);
    }
  )

  .demandCommand(1, "Please insert at least one command")
  .help().argv;

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(cors({ origin: '*' }));
  app.use(express.json());

  // Health check endpoint for Kubernetes/Render
  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  });

  const mongoURI = process.env.MONGO_URI;

  try {
    await mongoose.connect(mongoURI);
    console.log('Mongodb connected');
  } catch (err) {
    console.error('Unable to connect', err);
    process.exit(1); 
  }

  app.use("/", mainRouter);

  
  const httpServer = http.createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    socket.on('joinRoom', (userID) => {
      console.log('User joined room:', userID);
      socket.join(userID);
    });
  });

  httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
