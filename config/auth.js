// This will ensure that no annonymous user can see the dashboard

module.exports = {
    ensureAuthenticated: function(req,res,next){
        // If user is auth it will throw them to next
        if(req.isAuthenticated()){
            return next();
        }
        //If user is not auth it will redirect them to login page
        req.flash('error_msg','Please login to see your profile')
        res.redirect('/users/login');
    }
}