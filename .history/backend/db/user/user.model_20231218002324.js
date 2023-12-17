const { model } = require('mongoose');
const { UserSchema } = require('./user.schema');


const UserModel = model("UserModel", UserSchema);


function createUser(user) {
    user.joinTimestamp = Date.now();
    return UserModel.create(user);
}

function findUserByUsername(username) {
    return UserModel.findOne({ username: username }).exec();
}


export default {
    createUser,
    findUserByUsername,
}