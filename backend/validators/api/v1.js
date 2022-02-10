const Joi = require('joi');
const JoiValidate = require('../../helpers/joiValidate');

class Validators {
	/**
	 * Request Validators
	 */
	constructor() {
		this.signup = new JoiValidate({
			'body': {
				'schema': Joi.object().keys({
					name: Joi.string().min(3).required(),
					email: Joi.string().required(),
					password: Joi.string().trim().required(),
					device_type:Joi.number().integer().required(),
					device_token:Joi.string().trim().required(),
					language:Joi.string().trim().required(),
				}).unknown(),
			},
		});
		this.login = new JoiValidate({
			'body': {
				'schema': Joi.object().keys({
					email: Joi.string().trim().required(),
					password: Joi.string().trim().required(),
					device_type:Joi.number().integer().required(),
					device_token:Joi.string().trim().required(),
				}).unknown(),
			},
		});
		
		this.socialAuth = new JoiValidate({
			'body': {
				'schema': Joi.object().keys({
					name: Joi.string().min(3).required(),
					device_type:Joi.number().integer().required(),
					device_token:Joi.string().trim().required(),
					language:Joi.string().trim().required(),
					social_id:Joi.string().trim().required(),
					login_type:Joi.string().trim().required(),
				}).unknown(),
			},
		});

		

		this.addcategories = new JoiValidate({
			'body': {
				'schema': Joi.object().keys({
					categories: Joi.string().trim().required()
				}).unknown(),
			},
		});
		
		this.deleteCategory = new JoiValidate({
			'body': {
				'schema': Joi.object().keys({
					categoryId: Joi.number().integer().required()
				}).unknown(),
			},
		});

		this.updateCategory = new JoiValidate({
			'body': {
				'schema': Joi.object().keys({
					categoryId: Joi.number().integer().required(),
					categoryName: Joi.string().trim().required()
				}).unknown(),
			},
		});
		
		this.addLanguages = new JoiValidate({
			'body': {
				'schema': Joi.object().keys({
					languages: Joi.string().trim().required()
				}).unknown(),
			},
		});
		
		this.deleteLanguage = new JoiValidate({
			'body': {
				'schema': Joi.object().keys({
					languageId: Joi.number().integer().required()
				}).unknown(),
			},
		});

		this.updateLanguage = new JoiValidate({
			'body': {
				'schema': Joi.object().keys({
					languageId: Joi.number().integer().required(),
					languageName: Joi.string().trim().required()
				}).unknown(),
			},
		});

		
		this.resendmail=new JoiValidate({
			'body': {
				'schema': Joi.object().keys({
					email: Joi.string().required(),
					type: Joi.string().trim().required()
				}).unknown(),
			},
		});
		this.verifyaccount=new JoiValidate({
			'body': {
				'schema': Joi.object().keys({
					email: Joi.string().required(),
					otp: Joi.string().trim().required()
				}).unknown(),
			},
		});
		this.updatepassword=new JoiValidate({
			'body': {
				'schema': Joi.object().keys({
					email: Joi.string().required(),
					password: Joi.string().trim().required()
				}).unknown(),
			},
		});
		this.changepassword=new JoiValidate({
			'body': {
				'schema': Joi.object().keys({
					old_password: Joi.string().trim().required(),
					new_password: Joi.string().trim().required()
				}).unknown(),
			},
		});
		
		
		

	}
}

module.exports = Validators;
