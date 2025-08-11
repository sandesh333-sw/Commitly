const express = require("express");
const issueController = require("../controllers/issueController");

const issueRouter = express.Router();

//changes to be made later
issueRouter.post("/repo/create", issueController.createRepository);
issueRouter.get("/repo/all", issueController.getAllRepository);
issueRouter.get("/repo/:id", issueController.fetchRepositoryById);
issueRouter.get("/repo/;name", issueController.fetchRepositoryByName);
issueRouter.get("/repo/:userID", issueController.fetchRepositoryForCurrentUser);


module.exports = issueRouter;