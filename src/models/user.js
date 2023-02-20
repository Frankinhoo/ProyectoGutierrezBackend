const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new Schema(
    {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    },
    {
        versionKey: false
    }
);

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
};

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const userModel = model('user', userSchema);

module.exports = {
    userModel
}