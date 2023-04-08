usersCtrl = {};

const passport = require('passport');
const User = require('../models/User');

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('user/signup');
}

usersCtrl.signUp = async (req, res) => {
    const errors = [];
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({ text: 'Contraseña incorrecta' });
    }
    if (password.length < 8) {
        errors.push({ text: 'Debe de tener 8 caracteres' });
    }
    if (errors.length > 0) {
        res.render('user/signup', { errors,name,email });
    }
    else {
        const emailUser = await User.findOne({email:email});
        if(emailUser){
            req.flash('error_msg','Correo ya en uso');
            res.redirect('/signup');
        }
        else{
            const newUser = new User({name,email,password});
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save();
            req.flash('success_msg', 'Estas registrado'); 
            res.redirect('/signin')
        }
    }
}

usersCtrl.renderSignInForm = (req, res) => {
    res.render('user/signin');
}

usersCtrl.signin = passport.authenticate('local',{
    failureRedirect: '/signin',
    successRedirect: '/notes',
    failureFlash: true 
})

usersCtrl.logout = (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
      });
      
    req.flash('success_msg','Sesion cerrada correctamente');
    res.redirect('/signin')
}
module.exports = usersCtrl;