
const { User } = require('../models');
// const { validateUser } = require('../valodators/userValidator');


//Create All Users
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.send(users);
    } catch (error) {
        next(error);
    }
};


//Create User By Id
const getUserById = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) throw new Error('User not found');
        res.send(user);
    } catch (error) {
        next(error);
    }
};


//Create User
const createUser = async (req, res, next) => {
        try {
        const user = await User.create(req.body);
        res.send(user);
    } catch (error) {
        next(error);
    }
};


// Update User
const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) throw new Error('User not found');
        await user.update(req.body);
        res.send(user);
    } catch (error) {
        next(error);
    }
};


// Delete User
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) throw new Error('User not found');
        await user.destroy();
        res.send(user);
    } catch (error) {
        next(error);
    }
};





module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    // validateUser
};