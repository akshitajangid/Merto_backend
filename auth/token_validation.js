const { verify } = require("jsonwebtoken");


module.exports={

	checkToken:(req,res,next) => {

		let token = req.get("Authorization");

		// console.log(token);

		if(token){
			// token=token.slice(7);
			verify(token,process.env.API_SECRET,(err,decoded)=>{
				if(err){
					res.status(401).json({
						success:0,
						message:"invalid token"
					});
				}else{
					next();
				}
			});

		}else{
			res.status(401).json({
				success:0,
				message:'Unauth user'
			});
		}
	},

	checkTokenRef:(req,res,next) => {

		let token = req.get("Authorization");

		// console.log(token);

		if(token){
			// token=token.slice(7);
			verify(token,"clapioauth",(err,decoded)=>{
				if(err){
					res.status(500).json({
						success:0,
						message:"invalid token"
					});
				}else{
					next();
				}
			});

		}else{
			res.status(500).json({
				success:0,
				message:'Unauth user'
			});
		}
	}
};