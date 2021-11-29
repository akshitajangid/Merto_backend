'use strict';
const {Router} = require('express');
const ApiBase = require('./base');
const {socialAuth,login,refreshToken,signup,forgotMail,verifyAccount,updatePassword} = require('../../controllers/api/v1/auth/Controller');
const {getUser,changePassword,updateProfile} = require('../../controllers/api/v1/user/Controller');
const {getContent,getHelp} = require('../../controllers/api/v1/appcontent/Controller');
const {Storeleague,StoreTeam,StoreFixtures} = require('../../controllers/api/v1/cronjob/Controller');
const {leagueList,favLeague,leagueStanding} = require('../../controllers/api/v1/league/Controller');
const {teamList,favTeam} = require('../../controllers/api/v1/team/Controller');
const {getAllCompetition,getCompetition,getMatchPlayer,getMatchStatistics} = require('../../controllers/api/v1/home/Controller');
const {getplayerDetails} = require('../../controllers/api/v1/player/Controller');


const Validators = require('../../validators/api/v1');
// const {upload} =  require('../../helpers/imageUpload')

var multer = require('multer');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
var path = require('path');

const S3 = new aws.S3({
    accessKeyId:process.env.S3_AccessKeyId,
    secretAccessKey:process.env.s3_secretAccessKey,
    region: process.env.Region
  });
const storage = multerS3({
    s3: S3,
    bucket:process.env.Bucket,
    key: function (req, file, cb) {
        var ext=path.extname(file.originalname)
        cb(null, Date.now()+ext); //use Date.now() for unique file keys
    }
})


const fileFilter = (req, file, cb) => {
    console.log(file);
    //if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
    // } else{
    //     cb(null, false);

    // }
};
let upload = multer({ storage: storage, fileFilter: fileFilter});

/**
 * Api Router
 */
class Api extends ApiBase {
    constructor(app) {
        super(app);
        const validators = new Validators();
        //[START AUTH. ROUTES]
            this.router.use('/', new Router().post('/signup',validators.signup,signup));
            this.router.use('/', new Router().post('/login', validators.login, login));
            this.router.use('/', new Router().post('/socialLogin', validators.socialAuth, socialAuth));

            this.router.use('/', new Router().post('/refreshToken',refreshToken));
            this.router.use('/', new Router().post('/forgotMail',forgotMail));
            this.router.use('/', new Router().post('/verifyAccount',validators.verifyaccount,verifyAccount));
            this.router.use('/', new Router().post('/updatePassword',validators.updatepassword,updatePassword));
            
        //[END AUTH. ROUTES]

        //[START User. ROUTES]
        this.router.use('/user', new Router().get('/getUser', getUser));
        this.router.use('/user', new Router().post('/changePassword',validators.changepassword, changePassword));
        this.router.use('/user', new Router().post('/updateProfile',upload.array('profile',3),updateProfile));
        
        //[END AUTH. ROUTES]

        //[START AppContent. ROUTES]
        this.router.use('/', new Router().get('/getContent', getContent));
        this.router.use('/', new Router().get('/help', getHelp));

        
        //[END AppContent. ROUTES]


         //[START Cronjob ROUTES]
         this.router.use('/', new Router().get('/Storeleague', Storeleague));
         this.router.use('/', new Router().get('/StoreTeam', StoreTeam));
         this.router.use('/', new Router().post('/StoreFixtures', StoreFixtures));
         //[END Cronjob. ROUTES]

         //[START league ROUTES]
         this.router.use('/', new Router().post('/leagueList', leagueList));
         this.router.use('/', new Router().post('/favLeague', favLeague));
         this.router.use('/', new Router().post('/leagueStanding', leagueStanding));
         
         
         //[END league. ROUTES]

         //[START team ROUTES]
         this.router.use('/', new Router().post('/teamList', teamList));
         this.router.use('/', new Router().post('/favTeam', favTeam));
         
         //[END team. ROUTES]

         //[START home ROUTES]
         this.router.use('/', new Router().post('/getAllCompetition', getAllCompetition));
         this.router.use('/', new Router().post('/getCompetition', getCompetition));
         this.router.use('/', new Router().post('/getMatchPlayer', getMatchPlayer));
         this.router.use('/', new Router().post('/getMatchStatistics', getMatchStatistics));
         
         
         //[END home. ROUTES]

          //[START player ROUTES]
          this.router.use('/', new Router().post('/getplayerDetails', getplayerDetails));         
          //[END player. ROUTES]

        return this.router;
    }
}

module.exports = Api;
