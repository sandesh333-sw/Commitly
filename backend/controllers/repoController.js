const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

async function createRepository(req, res) {
  const { owner, name, issues, content, description, visibility } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ error: "Repository name is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    if (issues && !mongoose.Types.ObjectId.isValid(issues)) {
      return res.status(400).json({ error: "Invalid issue id" });
    }

    const newRepository = new Repository({
      name,
      description,
      visibility,
      owner,
      content,
      issues,
    });

    const result = await newRepository.save();

    res.status(201).json({
      message: "Repo created ",
      repositoryId: result._id,
    });
  } catch (error) {
    console.error("Create repository error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


async function getAllRepository(req, res) {
  res.send("All repositoriees fetched");
}

async function fetchRepositoryById(req, res) {
  res.send("All repositoriees  details fetched");
}

async function fetchRepositoryByName(req, res) {
  res.send("All repositoriees  details fetched byname");
}

async function fetchRepositoryForCurrentUser(req, res) {
  res.send("All repositories for logged in user fetched");
}

async function updateRepositoryById(req, res) {
  res.send("Repository updated");
}
async function toggleVisibilityById(req, res) {
  res.send("All repositoriees  details fetched");
}

async function deleteRepositoryById(req, res) {
  res.send("All repositoriees  deleted");
}

module.exports = {
  createRepository,
  getAllRepository,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoryForCurrentUser,
  updateRepositoryById,
  deleteRepositoryById,
  toggleVisibilityById,
};
