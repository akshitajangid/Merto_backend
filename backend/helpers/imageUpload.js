var multer = require('multer');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
var path = require('path');
require('dotenv').config();
const S3 = new aws.S3({
    accessKeyId: process.env.S3_AccessKeyId,
    secretAccessKey: process.env.s3_secretAccessKey,
    region: process.env.Region
  });
// const S3 = new aws.S3({
//   secretAccessKey: process.env.S3_AccessKeyId,
//   accessKeyId: process.env.s3_secretAccessKey,
//    region: process.env.Region
// });
const storage = multerS3({
    s3: S3,
    bucket: "marsmedia/uploads",
    key: function (req, file, cb) {
        var ext=path.extname(file.originalname)
        cb(null, Date.now()+ext); //use Date.now() for unique file keys
    }
  })
const fileFilter = (req, file, cb) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
    } else{
        cb(null, false);

    }
};
let upload = multer({ storage: storage, fileFilter: fileFilter});
module.exports = {
   // console.log(process.env.S3_AccessKeyId);
  upload : upload.array('profile',3)
} 


// module.exports = {

//     uploadFile:(fileName) => {
//         return new Promise((resolve, reject) => {
//         // Read content from the file
//         const fileContent = fs.readFileSync(fileName);
    
//         // Setting up S3 upload parameters
//         const params = {
//             Bucket: process.env.Bucket,
//             Key: filename, // File name you want to save as in S3
//             Body: fileContent
//         };
    
//         // Uploading files to the bucket
//         s3.upload(params, function(err, data) {
//             if (err) {
//                 // throw err;
//                 reject(err)
//             }
//             console.log(`File uploaded successfully. ${data.Location}`);
//             resolve(data.location)
            
//         });
//         })
//     } 

//     // UploadImage: (req) => {
        
//     //     return new Promise((resolve, reject) => {
//     //         upload(req, function(err, data) {
//     //             if (err) {
//     //                 console.log(err);
//     //                 // throw err;
//     //             }
//     //             console.log(`File uploaded successfully. ${data.Location}`);
//     //         });
//     //         // upload(req, function(err,data){
//     //         //     if (err) {
//     //         //         console.log(err);
//     //         //         // res.status(400).json({message: err.message})
//     //         //     }else{
//     //         //         console.log(req);
//     //         //     }
//     //         // });
//     //     })
//     // }
// }
