//match requires
var createMatchMW = require("../middleware/matches/createMatch");
var deleteMatchMW = require("../middleware/matches/deleteMatch");
var updateMatchMW = require("../middleware/matches/updateMatch");
var validateMatchMW = require("../middleware/matches/validateMatch");
var checkMatchIdMW = require("../middleware/matches/checkMatchId");

//Login
var checkLoggedInMW = require("../middleware/login/checkIsLoggedIn");
var checkLoggedInJsonMW = require("../middleware/login/checkIsLoggedInForJson");
var setIsLoggedInMW = require("../middleware/login/setIsLoggedIn");

//common requires
var render = require("../middleware/common/render");
var renderJSON = require("../middleware/common/renderJson");
var setTitleMW = require("../middleware/common/setTitle");

//model requires
var objRepo = require("../model/objectRepository");

//team requires
var createTeamMW = require("../middleware/teams/createTeam");
var validateTeamMW = require("../middleware/teams/validateTeam");
var checkTeamMW = require("../middleware/teams/checkTeamId");
var getTeamsMW = require("../middleware/teams/getTeams");
var deleteTeamMW = require("../middleware/teams/deleteTeam");
var modifyTeamMW = require("../middleware/teams/modifyTeam");

module.exports = function(app) {
    //meccsek
    app.use("/match/:matchId/edit",
        checkLoggedInMW(app),
        checkMatchIdMW(objRepo),
        validateMatchMW(objRepo),
        updateMatchMW(objRepo),
        setIsLoggedInMW(),
        render(objRepo, "matches/matchForm")
    );

    app.use("/match/successfulEdit",
        checkLoggedInMW(app),
        setTitleMW("Sikeres módosítás"),
        setIsLoggedInMW(),
        render(objRepo, "matches/editSuccessful")
    );

    app.use("/match/:matchId/delete",
        checkLoggedInJsonMW(app),
        checkMatchIdMW(objRepo),
        deleteMatchMW(objRepo),
        setIsLoggedInMW(),
        renderJSON()
    );

    app.use("/match/create/",
        checkLoggedInMW(app),
        validateMatchMW(objRepo),
        createMatchMW(objRepo),
        setIsLoggedInMW(),
        render(objRepo, "matches/matchForm")
    );

    app.use("/match/successfulCreate/",
        checkLoggedInMW(app),
        setTitleMW("Sikeres létrehozás"),
        setIsLoggedInMW(),
        render(objRepo, "matches/createSuccessful")
    );

    app.use("/match/createFailed",
        checkLoggedInMW(app),
        setTitleMW("Sikertelen létrehozás"),
        setIsLoggedInMW(),
        render(objRepo, "matches/createFailed")
    );

    app.use("/match/editFailed",
        checkLoggedInMW(app),
        setTitleMW("Sikertelen módosítás"),
        setIsLoggedInMW(),
        render(objRepo, "matches/editFailed")
    );

    //csapatok
    app.param("teamId",
        checkTeamMW(objRepo)
    );

    app.use("/team/edit/:teamId",
        checkLoggedInMW(app),
        checkTeamMW(objRepo),
        validateTeamMW(objRepo),
        modifyTeamMW(objRepo),
        setIsLoggedInMW(),
        render(objRepo, "teams/create")
    );

    app.use("/team/delete/:teamId",
        checkLoggedInJsonMW(app),
        checkTeamMW(objRepo),
        deleteTeamMW(objRepo),
        renderJSON()
    );

    app.use("/teams/index",
        checkLoggedInMW(app),
        getTeamsMW(objRepo),
        setIsLoggedInMW(),
        render(objRepo, "teams/index")
    );

    app.use("/team/create",
        checkLoggedInMW(app),
        validateTeamMW(objRepo),
        createTeamMW(objRepo),
        setIsLoggedInMW(),
        render(objRepo, "teams/create")
    );

    app.use("/team/successfulCreate",
        checkLoggedInMW(app),
        setTitleMW("Sikeres létrehozás"),
        setIsLoggedInMW(),
        render(objRepo, "teams/createSuccessful")
    );

    app.use("/team/createFailed",
        checkLoggedInMW(app),
        setTitleMW("Sikertelen létrehozás"),
        setIsLoggedInMW(),
        render(objRepo, "teams/createFailed")
    );


    app.use("/team/successfulEdit",
        checkLoggedInMW(app),
        setTitleMW("Sikeres módosítás"),
        setIsLoggedInMW(),
        render(objRepo, "teams/successfulEdit")
    );

    app.use("/team/editFailed",
        checkLoggedInMW(app),
        setTitleMW("Sikertelen módosítás"),
        setIsLoggedInMW(),
        render(objRepo, "teams/editFailed")
    );
};