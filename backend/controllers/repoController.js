const createRepository = (req, res) => {
    res.send("Repositor created!");
};

const getAllRepository = (req, res) => {
    res.send("All repositoriees fetched");
};

const fetchRepositoryById = (req, res) => {
    res.send("All repositoriees  details fetched");
};

const fetchRepositoryByName = (req, res) => {
    res.send("All repositoriees  details fetched byname");
};

const fetchRepositoryForCurrentUser = (req, res) => {
    res.send("All repositories for logged in user fetched");
};

const updateRepositoryById = (req, res) => {
    res.send("Repository updated");
};
const toggleVisibilityById = (req, res) => {
    res.send("All repositoriees  details fetched");
};

const deleteRepositoryById = (req, res) => {
    res.send("All repositoriees  deleted");
};

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