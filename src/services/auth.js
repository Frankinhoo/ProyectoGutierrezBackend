const { query } = require('express');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { userModel } = require('../models/user');

const strategyOptions = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
};

const login = async (req, username, password, done) => {
    try {
        const query = { username: username };
        const user = await userModel.findOne(query);
        
        if (!user) {
            return done(null, false, { mensaje: 'Usuario no encontrado' });
        } else {
            const match = await user.matchPassword(password);
            if (match) {
                console.log('LOGIN');
                return done(null, user);
            } else return done(null, false);
        }
    } catch (error) {
        console.log(error);
        return done(null, false, { mensaje: 'Error Inesperado!', error});
    }
};

const signup = async (req, username, password, done) => {
    try {
        const query = { username: username };
        const user = await userModel.findOne(query);
        
        if (user) {
            return done(null, false, { mensaje: 'El usuario ya existe' });
        }
        const newUser = new userModel({ username, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        console.log('SIGNUP!');
        return done(null, newUser);
    } catch (error) {
        console.log(error);
        return done(null, false, { mensaje: 'Error inesperado!' });
    }
};

const loginFunc = new LocalStrategy(strategyOptions, login);
const signUpFunc = new LocalStrategy(strategyOptions, signup);

passport.serializeUser((user, done) => {
    console.log('Se Ejecuta el serializeUser');
    done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
    console.log('Se Ejecuta el deserializeUser');
    const user =  await userModel.findById(userId);
    return done(null, user);
});

module.exports = {
    loginFunc,
    signUpFunc
}
