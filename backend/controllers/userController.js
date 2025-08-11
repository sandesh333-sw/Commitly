

const getAllUsers = (req, res) => {
    res.send("All user fetched");
};

const signup = (req, res) => {
    res.send("Signingup");
};

const login = (req, res) => {
    res.send("logging up");
};

const getUserProfile = (req, res) => {
    res.send("Profile fetched");
};

const updateUserProfile = (req, res) => {
    res.send("Profile updated");
};

const deleteUserProfile = (req, res) => {
    res.send("Profile deleted");
};

module.exports = {
    getAllUsers,
    signup,
    login,
    getAllUsers,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
};