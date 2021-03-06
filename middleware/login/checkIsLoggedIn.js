//Ellenőrzi, hogy be van-e jelentkezve a felhaszánló

module.exports = function(app) {
    return function(req, res, next) {
        //Ha be van jelentkezve: redirect a főoldalra, egyébként pedig next
        if (req.session.isLoggedIn) {
            return next();
        } else {
            return res.redirect("/matches/?login=true");
        }
    }
};