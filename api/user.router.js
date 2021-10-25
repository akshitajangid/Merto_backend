const {
	signupUserController,
	userLoginController,
	userSocialController,
	get_token,
	favTeamsController,
	favLeaguesController,
	favCompetitionController,
	followTeamController,
	InsertTeams,
	getTeams,
	insertPlayer,
	teamsController,
	playerController,
	playerDetails,
	teamDetails,
	leagueList,
	todaysMatchOrScore,
	liveGames,
	matchdetail,
	getLeaugeData,
	getCompetition,
	updateProfileController,
	updateMatchSettingController,
	appContentControll,
	getFaqControll,
	sendContactControll,
	ChangePasswordControll,
	getMatchSettingController,
	getNotificationController,
	updateNotificationSettingController,
	updateLanguageController,
	getUserListController,
	sendMessageController,
	viewMessageControler,
	getUserChatListController,
	deleteChatController,
	updateDeviceTokenController,
	getUserByIdController,
	getWheatherController,
	addBetController,
	getHomedataController,
	forgetPasswordController,
	verifyOTPController,
	updatePasswordController,
	isSocailController,
	storeMatchController,
	getMatchController,
	getallcompitionController,
	getmatchteamController,
	storeleagueController
} = require("./user.controller");

//validations
const router = require("express").Router();
const { checkToken,checkTokenRef, } =require('../auth/token_validation');

router.post('/get_token',get_token);

router.post('/signup',signupUserController);

router.post('/login',userLoginController);

router.post('/socialLogin',userSocialController);

router.post('/favTeam',favTeamsController);

router.post('/favLeagues',favLeaguesController);

router.post('/favCompetition',favCompetitionController);

router.post('/followTeam',followTeamController);

router.get('/InsertTeams',InsertTeams);

router.post('/getTeams',getTeams);

router.get('/insertPlayer',insertPlayer);

router.post('/teams',teamsController);

router.get('/player',playerController);

router.post('/playerDetails',playerDetails);

router.post('/teamDetails',teamDetails);

router.post('/leagueList',leagueList);

router.post('/todaysMatchOrScore',todaysMatchOrScore);

router.get('/liveGames',liveGames);

router.post('/matchdetial',matchdetail);

router.post('/getLeaugeData',getLeaugeData);

router.post('/getCompetition',getCompetition);


router.post('/updateProfile',updateProfileController);

router.post('/updateMatchSetting',updateMatchSettingController);

router.post('/appContent',appContentControll);

router.post('/getFaq',getFaqControll);

router.post('/sendContact',sendContactControll);

router.post('/ChangePassword',ChangePasswordControll);

router.post('/getMatchSetting',getMatchSettingController);

router.post('/getNotification',getNotificationController);

router.post('/updateNotificationSetting',updateNotificationSettingController);

router.post('/updateLanguage',updateLanguageController);

router.post('/getUserList',getUserListController);

router.post('/sendMessage',sendMessageController);

router.post('/viewMessage',viewMessageControler);

router.post('/getUserChatList',getUserChatListController);

router.post('/deleteChat',deleteChatController);

router.post('/updateDeviceToken',updateDeviceTokenController);

router.post('/getUserById',getUserByIdController);

router.post('/getWheather',getWheatherController);

router.post('/addBet',addBetController);

router.post('/getHomedata',getHomedataController);

router.post('/forgetPassword',forgetPasswordController);

router.post('/verifyOTP',verifyOTPController);

router.post('/updatePassword',updatePasswordController);

router.post('/isSocail',isSocailController);

router.get('/storeMatch',storeMatchController);

router.post('/getMatch',getMatchController);

router.post('/getallcompetition',getallcompitionController);

router.post('/getmatchteam',getmatchteamController);

router.get('/storeleague',storeleagueController);
//export
module.exports = router;