const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try{
        const {email, username, password} = req.body;
        const user = new User({email, username});
        //has password and store salt
        const registeredUser = await User.register(user, password);
         //console.log(registeredUser);
        //log in user when they register
        //this function requires a callback so we can't await it
        req.login(registeredUser, err => {
            if(err) return next(err);
            //otherwise, redirect to campgrounds
            req.flash('success', 'Welcome to YelpCamp!');
            res.redirect('/campgrounds');   
        })
    }
    catch(e){
        //passport local mongoose will throw an error if username is not unique
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    //if there is a returnTo, redirect to that, otherwise redirect to /campgrounds
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout();
    req.flash('success', 'Successfully logged out!');
    res.redirect('/campgrounds');
    /*
    req.logout(function(err) {
        if(err) return next(err);      
        req.flash('success', 'Successfully logged out!');
        res.redirect('/campgrounds');
    });*/
}