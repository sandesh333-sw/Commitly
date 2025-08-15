const express = require("express");
const repoController = require("../controllers/repoController");

const repoRouter = express.Router();

repoRouter.post("/create", repoController.createRepository);
repoRouter.get("/repo/all", repoController.getAllRepository);
repoRouter.get("/repo/:id", repoController.fetchRepositoryById);
repoRouter.get("/repo/name/:name", repoController.fetchRepositoryByName);
repoRouter.get("/repo/user/:userID", repoController.fetchRepositoryForCurrentUser);
repoRouter.put("/repo/update/:id", repoController.updateRepositoryById);
repoRouter.delete("/repo/delete/:id", repoController.deleteRepositoryById);
repoRouter.patch("/repo/update/:id", repoController.toggleVisibilityById);

// Git-like file operations
repoRouter.post("/repo/:id/files", repoController.addFileToRepo);
repoRouter.get("/repo/:id/files", repoController.getRepositoryFiles);
repoRouter.get("/repo/:id/files/:filePath", repoController.getFileContent);
repoRouter.delete("/repo/:id/files/:filePath", repoController.deleteFileFromRepo);

module.exports = repoRouter;