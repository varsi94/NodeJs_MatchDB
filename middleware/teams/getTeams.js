module.exports = function(objectRepository) {
    var teams = objectRepository.teams;
    return function(req, res, next) {
        //JSON válaszként visszaadja az összes csapatot -> meccs létrehozásánál szükség lesz rá.
        return res.json(teams.getTeams());
        return next();
    }
};