const app = require('../app');
	queryAndReformat = app.queryAndReformat
const Promise = require('bluebird');
const models = require('../models'),
	Message = models.Messages,
	db = models.db;
const expect = require('chai').expect;
const supertest = require('supertest');
const agent = supertest.agent(app);

describe('Firebase Scheduled Notifications', function () {

	function toPlainObject (instance) {
	  return instance.get({plain: true});
	}	

	before(function () {
    	return db.sync({force: true});
  	});

  	afterEach(function () {
    	return db.sync({force:true});
  	});

	describe('post route', function() {

		it('Posts Message', function(done) {
			agent
			.post('/')
			.send({
				token: "dshA77uf3WA:APA91bGiNKIEQrfplRwp6aG7RbSj9zIGuh5LG9S-4DG8Atq7ezslwRUV0B8izwbyl6Ls_tYrk2aepg46Eyh9R-h2vQgX_AOVaOgGhOlnXtRhwIuX76uBKnxWShTHlw80UT2UGp5SV7BN",
				title:"This is a Test",
				content:"Test Test Test",
				time:"10\/2\/2016"
			})
			.end(function (err, res) {
		 	 if (err) return done(err);
		 	 	expect(res.body.message.content).to.equal('Test Test Test')
		 	 	expect(res.body.message.title).to.equal('This is a Test')
		  		Message.findOne({
		  			where: {
		  				title: res.body.message.title
		  			}
		  		})
		  		.then(message => {
		  			const response = {
		  				message: message,
		  				log: "Message saved"
		  			};
		  		  expect(res.body.message.changeFormat.body).to.eql(message.dataValues.content);
		  		  done();
		  		})
		  		.catch(done);
			});
		});

	});



	// describe('queryAndReformat', function() {


	// 	beforeEach(function () {
	// 		return Message.create({
	// 		token: 'dshA77uf3WA:APA91bGiNKIEQrfplRwp6aG7RbSj9zIGuh5LG9S-4DG8Atq7ezslwRUV0B8izwbyl6Ls_tYrk2aepg46Eyh9R-h2vQgX_AOVaOgGhOlnXtRhwIuX76uBKnxWShTHlw80UT2UGp5SV7BN',
	// 		title: 'Test',
	// 		content: "This is a Test",
	// 		time: "10\/3\/2016",
	// 		sent:false
	// 		})
	// 		.then(message => {
	// 		   messageShouldBeQuery = message;
	// 		});
	// 	});

	// 	beforeEach(function() {
	// 		return Message.create({
	// 			token: 'krsA77uf3WA:APA91bGiNKIEQrfplRwp6aG7RbSj9zIGuh5LG9S-4DG8Atq7ezslwRUV0B8izwbyl6Ls_tYrk2aepg46Eyh9R-h2vQgX_AOVaOgGhOlnXtRhwIuX76uBKnxWShTHlw80UT2UGp5SV7BN',
	// 			title: 'Should Not Be Reformated',
	// 			content: 'Should not Show up!',
	// 			time: "10\/3\/2016",
	// 			sent:true
	// 		})
	// 		.then(message => {
	// 			messageShouldNotBeQuery = message
	// 		});
	// 	});

	// 	let messageShouldBeQuery;
	// 	let messageShouldNotBeQuery;
	// 	let regTokens;
	// 	let testArray =[];

	// 	it('should push a new message token into regTokens', function(done){
	// 		let test = queryAndReformat(testArray,regTokens)
			
				
			
	// 		expect(test[1]).to.equal('dshA77uf3WA:APA91bGiNKIEQrfplRwp6aG7RbSj9zIGuh5LG9S-4DG8Atq7ezslwRUV0B8izwbyl6Ls_tYrk2aepg46Eyh9R-h2vQgX_AOVaOgGhOlnXtRhwIuX76uBKnxWShTHlw80UT2UGp5SV7BN');
	// 		done();
	// 	})
		
	// });
	

});


