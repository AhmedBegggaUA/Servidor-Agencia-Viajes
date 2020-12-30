const express = require('express');
const router = express.Router();
const User  = require('../models/User');
const passport = require('passport');

router.get('/users/signin', (req, res) =>{
    res.render('users/signin');
});

router.post('/users/signin',passport.authenticate('local',{
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
    
}));

router.get('/users/signup',(req, res) =>{
    res.render('users/signup');
});

router.post('/users/signup',async (req, res) =>{
   const  { name, email, password, passwordConf} = req.body;
   const errors = [];
   if(password != passwordConf){
       errors.push({text: 'Las constraseñas no coinciden'});
    }
    if(name.length < 1){
        errors.push({text: 'Debe introducir un nombre'})
    }
    if(email.length < 1){
        errors.push({text: 'Debe introducir un email'})
    }
    if(password.length < 4){
        errors.push({text: 'La contraseña es demasiado corta'});
    }
    if(errors.length>0){
        res.render('users/signup', {errors,name, email,password,passwordConf});
    }else{
        const emailUser = await User.findOne({email:email});
        if(emailUser){
            req.flash('error_msg','El email ya se encuentra registrado');
            res.redirect('/users/signup');
        }
        const newUser = new User({name, email,password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Registro con exito');
        res.redirect('/users/signin');
        //res.send('ok');
    }
    //console.log(req.body);
   //res.send('ok');
});

router.get('/users/logout', (req,res) =>{
    req.logOut();
    res.redirect('/');
})

module.exports =router;