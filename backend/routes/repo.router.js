const express = require("express");
const repoController = require("../controllers/repoController");

const repoRouter = express.Router();

repoRouter.post("/create", repoController.createRepository);
repoRouter.get("/repo/all", repoController.getAllRepository);
repoRouter.get("/repo/:id", repoController.fetchRepositoryById);
repoRouter.get("/repo/;name", repoController.fetchRepositoryByName);
repoRouter.get("/repo/:userID", repoController.fetchRepositoryForCurrentUser);
repoRouter.put("/repo/update/:id", repoController.updateRepositoryById);
repoRouter.delete("/repo/delete/:id", repoController.deleteRepositoryById);
repoRouter.patch("/repo/update/:id", repoController.toggleVisibilityById);

module.exports = repoRouter;