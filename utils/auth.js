const withAuth = (req,res, next) => {
    if(!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;


/* we are "authguard" a route which mean to restrict it to 
authenticated/logged-in users only */