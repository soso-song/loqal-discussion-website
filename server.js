/* server.js */
'use strict';
const log = console.log
const path = require('path')

const express = require('express')
const app = express();

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')
mongoose.set('bufferCommands', false);
mongoose.set('useFindAndModify', false);

// import the mongoose models
const { User, Question, Notice, Tag, Report} = require('./models/loqal')

// to validate object IDs
const { ObjectID } = require('mongodb')

/*** Helper functions below **********************************/
function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser') 
app.use(bodyParser.json())

// express-session for managing user sessions
const session = require('express-session')
app.use(bodyParser.urlencoded({ extended: true }));

// For handling images
// multipart middleware: allows you to access uploaded file from req.file
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'csc309summer11',
    api_key: '565837127599264',
    api_secret: 'zUyJecwIy4lfJnsC9BSMxoda7i8'
});

// Our own express middleware to check for 
// an active user on the session cookie (indicating a logged in user.)
const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/dashboard'); // redirect to dashboard if logged in.
    } else {
        next(); // next() moves on to the route.
    }    
};

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} else {
		next()	
	}	
}

/*** Session handling **************************************/
// Create a session cookie
app.use(session({
    secret: 'oursecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 3600000,
        httpOnly: true
    }
}));

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
	if (req.session.user) {
		User.findById(req.session.user).then((user) => {
			if (!user) {
				return Promise.reject()
			} else {
				req.user = user
				next()
			}
		}).catch((error) => {
			res.status(401).send("Unauthorized")
		})
	} else {
		res.status(401).send("Unauthorized")
	}
}


// Middleware for authentication of resources
const adminAuthenticate = (req, res, next) => {
	if (req.session.user) {
		User.findById(req.session.user).then((user) => {
			if (!user || !user.isAdmin) {
				return Promise.reject()
			} else {
				req.user = user
				next()
			}
		}).catch((error) => {
			res.status(401).send("Unauthorized")
		})
	} else {
		res.status(401).send("Unauthorized")
	}
}

/*** User routes below ****************/
// Set up a POST route to create a user of your web app (*not* a student).
app.post('/users', mongoChecker, (req, res) => {
	log(req.body)

	// Create a new user
	const user = new User({
		email: req.body.email,
		password: req.body.password,
		username: req.body.username,
		displayname: req.body.displayname
	})

	// Save the user
	user.save().then((user) => {
		//res.send(user)
		//Behrad adding this:
		//Automatically logging the user in after registeration
		req.session.user = user._id;
        req.session.email = user.email
        res.redirect('/dashboard');
	})
	.catch((error) => {
		if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			log(error)
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	})
})

// A route to login and create a session
app.post('/users/login', mongoChecker, (req, res) => {
	const email = req.body.email
    const password = req.body.password

    // Use the static method on the User model to find a user
    // by their email and password
	User.findByEmailPassword(email, password).then((user) => {
	    if (!user) {
			//res.redirect('/login');
			res.status(404).send('Resource not found') 
        } else {
            // Add the user's id to the session cookie.
			// We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.email = user.email
            res.redirect('/dashboard');
        }
    }).catch((error) => {
		// redirect to login if can't login for any reason
    	if (isMongoError(error)) { 
			//res.status(500).redirect('/login');
			res.status(500).send('Internal server error')
		} else {
			log(error)
			//res.status(400).redirect('/login');
			res.status(400).send('Bad Request')
		}
		
    })
})

// A route to logout a user
app.get('/users/logout', (req, res) => {
	// Remove the session
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/')
		}
	})
})

// Route for getting all users
app.get('/users', mongoChecker, (req, res) => {
	User.find().then((users) => {
		res.send(users) 
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})

// Route for updating basic info of current user
app.patch('/users', mongoChecker, authenticate, (req, res) => {
	User.findById(req.user._id).then((user) => {
		if (!user) {
			res.status(404).send('User not found');
		} else {
			user.displayname = req.body.displayname;
			user.email = req.body.email;
			user.username = req.body.username

			user.save().then((result)=>{
				const myurl = '/user/user_profile.html?user_id=' + user._id
				res.redirect(303, myurl);
			}).catch((error)=>{
				//console.log(error);
				res.status(400).send('Bad request.');
			})
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

// Route for changing password
app.patch('/users/password', mongoChecker, authenticate, (req, res) => {
	User.findById(req.user._id).then((user) => {
		if (!user) {
			res.status(404).send('User not found');
		} else {
			user.password = req.body.password;

			user.save().then((result)=>{
				const myurl = '/user/user_profile.html?user_id=' + user._id
				res.redirect(303, myurl);
			}).catch((error)=>{
				//console.log(error);
				res.status(400).send('Bad request.');
			})
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

// Route for getting the current user, check to see if there is a better way
app.get('/users/current', mongoChecker, authenticate, (req, res) => {
	res.send(req.user)
})


// a POST route to *create* an image
app.post("/users/picture", multipartMiddleware, authenticate, (req, res) => {

	User.findById(req.user._id).then((user) => {
		if (!user) {
			res.status(404).send('User not found');
		} else {
			const imageId = user.image_id
			if(imageId !== ''){
				cloudinary.uploader.destroy(imageId, function (result) {

					user.image_id= "", 
                	user.image_url= "",
					user.save().then((result)=>{
						//res.send(result);
						    // Use uploader.upload API to upload image to cloudinary server.
						cloudinary.uploader.upload(
							req.files.image.path, // req.files contains uploaded files
							function (result) {
								user.image_id= result.public_id, // image id on cloudinary server
								user.image_url= result.url,
								user.save().then((result2)=>{
									res.send(result2);
								}).catch((error)=>{
									console.log(error);
									res.status(400).send('Bad request.');
								})
						});
					}).catch((error)=>{
						console.log(error);
						res.status(400).send('Bad request.');
					})

				});
			}else{
				cloudinary.uploader.upload(
					req.files.image.path, // req.files contains uploaded files
					function (result) {
						cloudinary.uploader.upload(
							req.files.image.path, // req.files contains uploaded files
							function (result) {
								user.image_id= result.public_id, // image id on cloudinary server
								user.image_url= result.url,
								user.save().then((result2)=>{
									res.send(result2);
								}).catch((error)=>{
									console.log(error);
									res.status(400).send('Bad request.');
								})
						});
				});
			}
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})

});

// Route for updating basic info of current user
app.patch('/users/:id', mongoChecker, authenticate, (req, res) => {
	const id = req.params.id;
	if(!ObjectID.isValid(id)){
		res.status(404).send('ID not valid');
		return;
	}

	User.findById(id).then((user) => {
		if (!user) {
			res.status(404).send('User not found');
		} else if( !req.user.isAdmin ){
			res.status(403).send("No permission to edit");
		}
		else {
			user.displayname = req.body.displayname;
			console.log(user.username);
			console.log(req.body.username);
			user.username = req.body.username;
			user.email = req.body.email;
			user.tags = req.body.tags;
			user.isFlagged = req.body.isFlagged;
			user.isAdmin = req.body.isAdmin;

			user.save().then((result)=>{
				const myurl = '/user/user_profile.html?user_id=' + user._id
				res.redirect(303, myurl);
			}).catch((error)=>{
				console.log(error);
				res.status(400).send('Bad request.');
			})
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})


/*** Follow Unfollow routes below **********************************/
// Following a user
app.post('/users/follow/:id', mongoChecker, authenticate, (req, res) => {
	const id = req.params.id;
	if(!ObjectID.isValid(id)){
		res.status(404).send('ID not valid');
		return;
	}
	User.findById(id).then((user)=>{
		if(!user){
			res.status(404).send('user not found');
		}else{
			if(user.followers.includes(req.user._id)){
				res.status(400).send('Already following');
			}else{
				user.followers.push(req.user._id);
				user.save().then((result)=>{
					//res.send(result);

					User.findById(req.user._id).then((follower)=>{
						if(!follower){
							res.status(404).send('user not found');
						}else{
							if(follower.following.includes(user._id)){
								res.status(400).send('Already following');
							}else{
								follower.following.push(user._id);
								follower.save().then((result2)=>{
									res.send(result2);
								}).catch((error)=>{
									log(error)
									res.status(400).send('Bad request.');
								})
							}
						}
					})
					.catch((error) => {
						log(error)
						if (isMongoError(error)) {
							res.status(500).send('Internal server error')
						} else {
							res.status(400).send('Bad Request')
						}
					})

					
				}).catch((error)=>{
					log(error)
					res.status(400).send('Bad request.');
				})
			}
		}
	})
	.catch((error) => {
		log(error)
		if (isMongoError(error)) {
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	})
})

// Unfollowing a user
app.post('/users/unfollow/:id', mongoChecker, authenticate, (req, res) => {
	const id = req.params.id;
	if(!ObjectID.isValid(id)){
		res.status(404).send('ID not valid');
		return;
	}
	User.findById(id).then((user)=>{
		if(!user){
			res.status(404).send('user not found');
		}else{
			if(!user.followers.includes(req.user._id)){
				res.status(400).send('Already not following');
			}else{
				const index = user.followers.indexOf(req.user._id);
				user.followers.splice(index, 1);

				user.save().then((result)=>{
					//res.send(result);

					User.findById(req.user._id).then((follower)=>{
						if(!follower){
							res.status(404).send('user not found');
						}else{
							if(!follower.following.includes(user._id)){
								res.status(400).send('Already not following');
							}else{
								const index = follower.following.indexOf(user._id);
								follower.following.splice(index, 1);
				
								follower.save().then((result2)=>{
									res.send(result2);
								}).catch((error)=>{
									res.status(400).send('Bad request.');
								})
							}
						}
					})
					.catch((error) => {
						if (isMongoError(error)) {
							res.status(500).send('Internal server error')
						} else {
							res.status(400).send('Bad Request')
						}
					})

				}).catch((error)=>{
					res.status(400).send('Bad request.');
				})
			}
		}
	})
	.catch((error) => {
		if (isMongoError(error)) {
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	})
})

// Route for getting a user
app.get('/users/:id', mongoChecker, authenticate, (req, res) => {
	//log(req.params.id)
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}

	// If id valid, findById
	User.findOne({_id: id}).then((user) => {
		if (!user) {
			res.status(404).send('Resource not found')  // could not find this student
		} else {
			res.send(user)
		}
	})
	.catch((error) => {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	})

})

/*
// a GET route to get all images
app.get("/images", (req, res) => {
    Image.find().then(
        images => {
            res.send({ images }); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});


/// a DELETE route to remove an image by its id.
app.delete("/images/:imageId", (req, res) => {
    const imageId = req.params.imageId;

    // Delete an image by its id (NOT the database ID, but its id on the cloudinary server)
    // on the cloudinary server
    cloudinary.uploader.destroy(imageId, function (result) {

        // Delete the image from the database
        Image.findOneAndRemove({ image_id: imageId })
            .then(img => {
                if (!img) {
                    res.status(404).send();
                } else {
                    res.send(img);
                }
            })
            .catch(error => {
                res.status(500).send(); // server error, could not delete.
            });
    });
});

// Delete the image of the current user
app.delete("/images", (req, res) => {
    User.findById(req.user._id).then((user) => {
		if (!user) {
			res.status(404).send('User not found');
		} else {
			const imageId = user.image_id
			if(imageId !== ''){
				cloudinary.uploader.destroy(imageId, function (result) {

					user.image_id= "", 
                	user.image_url= "",
					user.save().then((result)=>{
						res.send(result);
					}).catch((error)=>{
						console.log(error);
						res.status(400).send('Bad request.');
					})

				});
			}else{
				res.status(404).send('No Image ID');
			}
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})

});
*/

/*** Question routes below **********************************/
// Route for creating a new question
app.post('/questions', mongoChecker, authenticate, (req, res) => {

	const question = new Question({
		title: req.body.title,
		content: req.body.content,
		user: req.user,
		tags: req.body.tags, 
		answers: [],
		isResolved: false,
		isFlagged: false
	});
	// log('this is user');
	// log(req.user);

	// Save questions
	question.save().then((quesiton) => {
        res.redirect('/answer?question_id=' + question._id);
	})
	.catch((error) => {
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error')
		} else {
			log("this is the error ",error, " end of error")
			res.status(400).send('Bad Request')
		}
	})
})

/// Route for getting all exisiting questions
app.get('/questions', mongoChecker, (req, res) => {
	Question.find().then((questions) => {
		res.send(questions) 
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})

})

//get all question for given userid
app.get('/questions/users/:user', mongoChecker, (req, res) => {
	const userid = req.params.user;
	Question.find(
		{user : { $eq : userid} }
	).then((questions) => {
		res.send(questions) 
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})

// Route for getting questions posted by users the current user is following
app.get('/questions/following', mongoChecker, authenticate, (req, res) => {
	const usersfollowing = req.user.following

	Question.find(
		{ user: { "$in": usersfollowing }}
	).then((questions) => {
		res.send(questions) 
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})

//get all questions with given tag
app.post('/questions/tags', mongoChecker, (req, res) => {
	const tag_ids = req.body.tag_ids;
	Question.find(
		{'tags': { $in : tag_ids} }
	).then((questions) => {
		res.send(questions) 
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
	
})

//http://localhost:5000/questions/search/o
app.get('/questions/search/:keyword', mongoChecker, (req, res) => {
	const keyword = req.params.keyword;
	//log('inside questionsearch');
	Question.find({$or:[
		{title 			: { $regex: keyword, $options: "i" }}, // "i" is for case insensitive match
		{content		: { $regex: keyword, $options: "i" }}
		//{tags 			: { $regex: keyword, $options: "i" }} //TODO: need to add tags
	]}).then((questions) => {
		res.send(questions) 
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})

// Route for getting the question by given id
app.get('/questions/:id', mongoChecker, (req, res) => {
	const id = req.params.id;

	// Validate id
	if (!ObjectID.isValid(id)) {
		res.status(404).send('Invalid Question ID');
		return;  // so that we don't run the rest of the handler.
	}

	// If id valid, findById
	Question.findById(id).then((question) => {
		if (!question) {
			res.status(404).send('Question not found');
		} else {
			res.json({ question });
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

// Route for updating basic info(title, desc, tags) of a question given by id
app.patch('/questions/:id', mongoChecker, (req, res) => {
	const id = req.params.id;

	// Validate id
	if (!ObjectID.isValid(id)) {
		res.status(404).send('Invalid quesiton ID');
		return;
	}
	// If id valid, findById
	Question.findById(id).then((question) => {
		if (!question) {
			res.status(404).send('Quesiton not found');
		} else {
			question.title = req.body.title;
			question.content = req.body.content;
			question.tags = req.body.tags;
			if (req.body.isResolved !== null){
				question.isResolved = req.body.isResolved;
			}
			if (req.body.isFlagged !== null){
				question.isFlagged = req.body.isFlagged;
			}
			question.save().then((result)=>{
				res.redirect(303, '/answer?question_id=' + id);
			}).catch((error)=>{
				console.log(error);
				res.status(400).send('Bad request.');
			})
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

/*** Flagging routes below **********************************/
// Route for flag user
app.patch('/users/flag/:id', mongoChecker, authenticate, (req, res) => {
	const id = req.params.id;
	if(!ObjectID.isValid(id)){
		res.status(404).send('ID not valid');
		return;
	}
	User.findById(id).then((user) => {
		if (!user) {
			// console.log(req.params._id);
			// console.log(user);
			// console.log('nonononoooo');
			res.status(404).send('User not found');
		} else {
			user.isFlagged = req.body.flag;
			user.save().then(use => {
				res.send(use);
			})
			.catch((error)=>{
				res.status(400).send('Bad request.');
			})
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

// Route for flag question
app.patch('/questions/flag/:id', mongoChecker, authenticate, (req, res) => {
	const id = req.params.id;
	if(!ObjectID.isValid(id)){
		res.status(404).send('ID not valid');
		return;
	}
	Question.findById(id).then((question) => {
		if (!question) {
			res.status(404).send('User not found');
		} else {
			question.isFlagged = req.body.flag;
			question.save().then(ques=>{
				res.send(ques);
			})
			.catch((error)=>{
				res.status(400).send('Bad request.');
			})
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

// Route for flag question
app.patch('/answers/flag/:id', mongoChecker, authenticate, (req, res) => {
	const id = req.params.id;
	if(!ObjectID.isValid(id)){
		res.status(404).send('ID not valid');
		return;
	}
	Question.find().then(questions => {
		questions.forEach(question => {
			const answer = (question.answers.filter(ans=>ans._id == id))[0];
			//console.log(answer);
			if(answer){
				//res.json({question,answer});
				answer.isFlagged = req.body.flag;
				question.save()
				.then(ques=>{
					//console.log(ques);
					res.send(ques);
				})
				.catch((error)=>{
				res.status(400).send('Bad request.');
			})
			}
		})
	})
	.catch((error) => {
		console.error(error);
		res.status(500).send('Internal Server Error');
	})
})

/*** Answers routes below **********************************/

//get all answers for given userid
app.get('/answers/users/:user', mongoChecker, (req, res) => {
	const userid = req.params.user;
	Question.find(
		{'answers.user' : {$eq : userid} }
	).then((questions) => {
		questions.forEach(ques=>{
			ques.answers = ques.answers.filter(ans => ans.user == userid);
		});
		res.send(questions) 
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})

// Route for getting the answer by given question id and answer id
app.get('/answers/:question_id/:answer_id', mongoChecker, (req, res) => {
	const question_id = req.params.question_id;
	const answer_id = req.params.answer_id;
	
	// Validate id
	if (!ObjectID.isValid(question_id) || !ObjectID.isValid(answer_id)) {
		res.status(404).send('Invalid ID');
		return;  // so that we don't run the rest of the handler.
	}

	// If id valid, findById
	Question.findById(question_id).then((question) => {
		if (!question) {
			res.status(404).send('Question not found');
		} else {
			const answer = (question.answers.filter((ans)=>ans._id == answer_id))[0];
			res.json(answer);
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

app.get('/answers/:answer_id', mongoChecker, (req, res) => {
	const answer_id = req.params.answer_id;
	// Validate id
	if (!ObjectID.isValid(answer_id)) {
		res.status(404).send('Invalid ID');
		return;  // so that we don't run the rest of the handler.
	}

	// If id valid, findById
	Question.find().then(questions=> {
		if (!questions) {
			res.status(404).send('Question not found');
		} else {
			for(const question of questions){
				const answer = (question.answers.filter((ans)=>ans._id == answer_id))[0];
				if(answer){
					res.json({question,answer});
					break;
				}
			};
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

// Route for edting the answer
app.patch('/answers/:question_id/:answer_id', mongoChecker, authenticate, (req, res) => {
	const question_id = req.params.question_id;
	const answer_id = req.params.answer_id;

	// Validate id
	if (!ObjectID.isValid(question_id) || !ObjectID.isValid(answer_id)) {
		res.status(404).send('Invalid Question ID');
		return;  // so that we don't run the rest of the handler.
	}
	// If id valid, findById
	Question.findById(question_id).then((question) => {
		if (!question) {

			//console.log('hi?')
			res.status(404).send('Question not found');
		} else if(question.user != req.session.user || !req.user.isAdmin){
			console.log('not admin??')
			res.status(403).send("No permission to edit");
		}
		else {
			//console.log('hi?')
			const answer = (question.answers.filter((ans)=>ans._id == answer_id))[0];
			answer.content = req.body.content;
			if(req.body.isBest !== null){
				if(req.body.isBest){
					question.answers.map((myans) => {
						myans.isBest = false;
					})
				}
				answer.isBest = req.body.isBest;
			}
			if(req.body.isFlagged !== null){
				answer.isFlagged = req.body.isFlagged;
			}
			question.save().then((result)=>{
				res.redirect(303, '/answer?question_id=' + question_id);
			}).catch((error)=>{
				console.log(error);
				res.status(400).send('Bad request.');
			})
		}
	})
	.catch((error) => {
		console.log(error)
		res.status(500).send('Internal Server Error');
	})
})


// Route for setting an answer as best answer
app.post('/answers/best/:question_id/:answer_id', mongoChecker, (req, res) => {
	const question_id = req.params.question_id;
	const answer_id = req.params.answer_id;

	// Validate id
	if (!ObjectID.isValid(question_id) || !ObjectID.isValid(answer_id)) {
		res.status(404).send('Invalid Question ID');
		return;  // so that we don't run the rest of the handler.
	}

	// If id valid, findById
	Question.findById(question_id).then((question) => {
		if (!question) {
			res.status(404).send('Question not found');
		} else if(question.user != req.session.user){
			res.status(403).send("No permission to edit");
		} 
		else {
			question.answers.map((myans) => {
				myans.isBest = false;
			})

			const answer = (question.answers.filter((ans)=>ans._id == answer_id))[0];
			answer.isBest = true;

			question.save().then((result)=>{
				res.status(200).send('Selected as best answer');
			}).catch((error)=>{
				console.log(error);
				res.status(400).send('Bad request.');
			})
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})


//http://localhost:5000/questions/search/o
app.get('/answers/search/:keyword', mongoChecker, (req, res) => {
	const keyword = req.params.keyword;
	Question.find(
		//{title 			: { $regex: keyword, $options: "i" }}, // "i" is for case insensitive match
		{'answers.content'	: { $regex: keyword, $options: "i" }}
	).then((answers) => {
		res.send(answers) 
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
	
})

// Route for creating a new answers
app.post('/answers/:id', mongoChecker, authenticate, (req, res) => {

	const id = req.params.id;
	if(!ObjectID.isValid(id)){	// nor valid id
		res.status(404).send('question not valid');
		return;
	}
	Question.findById(id).then((question)=>{
		if(!question){	//undefined
			res.status(404).send('question not found');
		}else{
			const answer = {
				user: req.user,
				content: req.body.content
			};
			question.answers.push(answer);
			question.save().then((question)=>{
				res.send(question.answers[question.answers.length-1]);	// return the answer
			}).catch((error)=>{
				res.status(400).send('Bad request.');
			})
		}
	})
	.catch((error) => {
		if (isMongoError(error)) {
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	})
})

//Notice route below**********/
//add a notice: set isShowing for all previous notices to false when a new notice is added
app.post('/notice', mongoChecker, authenticate, (req, res) => {
	// disable all passed notices
	Notice.updateMany({isShowing:true},{$set:{isShowing:false}}).then()
	.catch(err=>{
		console.error(err)
	})
	const notice = new Notice({
		title: req.body.title,
		content: req.body.content,
		user: req.user._id
	});
	notice.save().then((notice) => {
        //res.redirect('/admin/notice.html');
	})
	.catch((error) => {
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error')
		} else {
			log("this is the error ",error, " end of error")
			res.status(400).send('Bad Request')
		}
	})
})
// get a notice with isShowing set to true
app.get('/notice', mongoChecker, (req, res) => {
	Notice.findOne(
		{isShowing : {$eq : true} }
	).then((notice) => {
		if(!notice){
			res.status(404).send('Notice not found');
		}else{
			res.send(notice) 
		}
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})
// Route for getting the notice by given id
app.get('/notice/find/:id', mongoChecker, (req, res) => {
	const id = req.params.id;
	// Validate id
	if (!ObjectID.isValid(id)) {
		res.status(404).send('Invalid Notice ID');
		return;
	}
	Notice.findById(id).then((notice) => {
		if (!notice) {
			res.status(404).send('Restaurant not found');
		} else {
			res.json(notice);
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

// get all notice
app.get('/notice/all', mongoChecker, (req, res) => {
	Notice.find().then((notice) => {
		res.send(notice) 
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})

// manually edit notice from dashboard
app.patch('/notice/:id', mongoChecker, (req, res) => {
	const id = req.params.id;

	// Validate id
	if (!ObjectID.isValid(id)) {
		res.status(404).send('Invalid notice ID');
		return;
	}
	// If id valid, findById
	Notice.findById(id).then((notice) => {
		if (!notice) {
			res.status(404).send('Notice not found');
		} else {
			notice.title = req.body.title;
			notice.content = req.body.content;
			if (req.body.isShowing !== null){
				notice.isShowing = req.body.isShowing;
			}
			notice.save().then((result)=>{
				//res.redirect(303, '/answer?question_id=' + id);
			}).catch((error)=>{
				//console.log(error);
				res.status(400).send('Bad request.');
			})
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

//tag route below**********/
app.get('/tag', mongoChecker, (req, res) => {
	Tag.find().then((tags) => {
		res.send(tags)
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})

app.get('/tag/:id', mongoChecker, (req, res) => {
	const id = req.params.id;

	// Validate id
	if (!ObjectID.isValid(id)) {
		res.status(404).send('Invalid tag ID');
		return;  // so that we don't run the rest of the handler.
	}

	// If id valid, findById
	Tag.findById(id).then((tag) => {
		if (!tag) {
			res.status(404).send('tag not found');
		} else {
			res.json({ tag });
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

// Route which given a list of tag ids, return a list of tag names
app.post('/tagIdToName', mongoChecker, (req, res) => {
	const ids = req.body.ids;
	let names;

	Tag.find({'_id': { $in: ids} }).then((tags) => {
		if(tags.length != ids.length) {
			res.status(404).send("Can't find all tags");
		} else {
			names = tags.map(tag => tag.name);
			res.send(names);
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

// Route which given a list of tag ids, return a list of tags
app.post('/tagIdToList', mongoChecker, (req, res) => {
	const ids = req.body.ids;
	let names;

	Tag.find({'_id': { $in: ids} }).then((tags) => {
		if(tags.length != ids.length) {
			res.status(404).send("Can't find all tags");
		} else {
			res.send(tags);
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

// Route for creating a new tag but will check if tag already exist
app.post("/tag", mongoChecker, (req, res) => {
	const tagName = (req.body.name).toLowerCase();

	// check if tag already exist
	Tag.find({ name: tagName })
	.then((tags) => {
		if(tags.length > 0){
			res.send({
				tag: tags[0],
				duplicate: true
			});
		}
		else {
			const tag = new Tag({
				name: tagName
			});
			// Save questions
			tag.save().then((tag) => {
		        res.send({
		        	tag: tag,
		        	duplicate: false
		        })
			})
			.catch((error) => {
				if (isMongoError(error)) { 
					res.status(500).send('Internal server error');
				} else {
					res.status(400).send('Bad Request');
				}
			})
		}
	})
	.catch((error) => {
		console.log(error);
	})
})

app.patch('/tag/:id', mongoChecker, (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;  // so that we don't run the rest of the handler.
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// Find the fields to update and their values.
	const fieldsToUpdate = {
		name:req.body.name
	}
	// req.body.name((change) => {
	// 	const propertyToChange = change.path.substr(1). // getting rid of the '/' character
	// 	fieldsToUpdate[propertyToChange] = change.value
	// })

	Tag.findByIdAndUpdate(id, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false}).then((tag) => {
		if (!tag) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(tag)
		}
	}).catch((error) => {
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			log(error)
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	})
})

app.delete('/tag/:id', mongoChecker, (req,res) =>{
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found')
		return;
	}

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	Tag.findByIdAndRemove(id).then((tag) => {
		if (!tag) {
			res.status(404).send()
		} else {   
			res.send(tag)
		}
	})
	.catch((error) => {
		log(error)
		res.status(500).send() // server error, could not delete.
	})
})

app.get('/popularTags', mongoChecker, (req, res) => {
	Tag.find().then((tags) => {
		// sort the tags by count
		tags = tags.sort((a,b) =>  a.count - b.count);
		// tags = tags.slice(0,5);
		res.send(tags);
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})



app.patch('/followTag/:tag_id/:user_id', mongoChecker, (req, res) => {
	const tag_id = req.params.tag_id;
	const user_id = req.params.user_id;

	// Validate id
	if (!ObjectID.isValid(tag_id) || !ObjectID.isValid(user_id)) {
		res.status(404).send('Invalid ID');
		return;  // so that we don't run the rest of the handler.
	}

	User.findById(user_id).then((user) => {
		if(!user){
			res.status(404).send('User not found');
		} else if (!user.tags.includes(tag_id)){
			// add to tag count
			Tag.findById(tag_id).then((tag) => {
				if(!tag){
					res.status(404).send('Tag not found');
				}
				else {
					tag.count++;
					tag.save().then((tag) => {
						user.tags.push(tag_id);
						user.save().then()
						.catch((error) => {
							res.status(400).send('Bad request.');
						})
					})
					.catch((error) => {
						res.status(400).send('Bad request.');
					})
				}
			})
			.catch((error) => {
				res.status(500).send('Internal Server Error');
			})
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})

})

app.patch('/unfollowTag/:tag_id/:user_id', mongoChecker, (req, res) => {
	const tag_id = req.params.tag_id;
	const user_id = req.params.user_id;

	// Validate id
	if (!ObjectID.isValid(tag_id) || !ObjectID.isValid(user_id)) {
		res.status(404).send('Invalid ID');
		return;  // so that we don't run the rest of the handler.
	}

	User.findById(user_id).then((user) => {
		if(!user){
			res.status(404).send('User not found');
		} else if (user.tags.includes(tag_id)){
			Tag.findById(tag_id).then((tag) => {
				if(!tag){
					res.status(404).send('Tag not found');
				}
				else {
					tag.count = tag.count <= 0 ? 0 : tag.count-1;
					tag.save().then((tag) => {
						user.tags = user.tags.filter((tag) => tag._id != tag_id);
						user.save().then()
						.catch((error) => {
							res.status(400).send('Bad request.');
						})
					})
					.catch((error) => {
						res.status(400).send('Bad request.');
					})
				}
			})
			.catch((error) => {
				res.status(500).send('Internal Server Error');
			})
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})

})

// increment the number of tag used
app.patch('/countTagUse/:tag_id/', mongoChecker, (req, res) => {
	const tag_id = req.params.tag_id;

	// Validate id
	if (!ObjectID.isValid(tag_id)) {
		res.status(404).send('Invalid Tag ID');
		return;
	}

	Tag.findById(tag_id).then((tag) => {
		if(!tag){
			res.status(404).send('Tag not found');
		}
		else {
			tag.count++;
			tag.save().then()
			.catch((error) => {
				res.status(400).send('Bad request.');
			})
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

//report route below********************************************************************/
// Route for creating a new report
app.post('/report', mongoChecker, authenticate, (req, res) => {

	const report = new Report({
		type: req.body.type,
		targetId: req.body.targetId,
		reason: req.body.reason,
		user: req.user
		//reviewer: req.body.reviewer, // no admin review yet
		//isReviewed: false // by default
	});
	// log('this is user');
	// log(req.user);

	// Save questions
	// report.save().then((report) => {
 //        res.redirect('/answer?question_id=' + question._id);
	// })
	report.save().then()
	.catch((error) => {
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error')
		} else {
			log("this is the error ",error, " end of error")
			res.status(400).send('Bad Request')
		}
	})
})

/// Route for getting all exisiting reports
app.get('/report', mongoChecker, (req, res) => {
	Report.find().then((reports) => {
		res.send(reports) 
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})

})

// get a report with type is user
app.get('/reports/type/user', mongoChecker, (req, res) => {
	Report.find(
		{type : {$eq : 'u'} }
	).then((report) => {
		if(!report){
			res.status(404).send('Reported user not found');
		}else{
			res.send(report) 
		}
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})
// get a report with type is question
app.get('/reports/type/question', mongoChecker, (req, res) => {
	Report.find(
		{type : {$eq : 'q'} }
	).then((report) => {
		if(!report){
			res.status(404).send('Reported question not found');
		}else{
			res.send(report) 
		}
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})
// get a report with type is answer
app.get('/reports/type/answer', mongoChecker, (req, res) => {
	Report.find(
		{type : {$eq : 'a'} }
	).then((report) => {
		if(!report){
			res.status(404).send('Reported answer not found');
		}else{
			res.send(report) 
		}
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})


// Route for getting the report by given id
app.get('/reports/:id', mongoChecker, (req, res) => {
	const id = req.params.id;

	// Validate id
	if (!ObjectID.isValid(id)) {
		res.status(404).send('Invalid Report ID');
		return;  // so that we don't run the rest of the handler.
	}

	// If id valid, findById
	Report.findById(id).then((report) => {
		if (!report) {
			res.status(404).send('Report not found');
		} else {
			res.send(report);
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})


// Route for updating basic info fromt admin of a review given by id
app.patch('/reports/:id', mongoChecker, (req, res) => {
	const id = req.params.id;

	// Validate id
	if (!ObjectID.isValid(id)) {
		res.status(404).send('Invalid Report ID');
		return;
	}
	// If id valid, findById
	Report.findById(id).then((report) => {
		if (!report) {
			res.status(404).send('Report not found');
		} else {
			report.reviewer = req.body.reviewer;
			report.isReviewed = req.body.isReviewed; // either flag made or review denyed
			report.save().then()
			.catch((error)=>{
				console.log(error);
				res.status(400).send('Bad request.');
			})
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})


/*** Webpage routes below **********************************/
// Inject the sessionChecker middleware to any routes that require it.
// sessionChecker will run before the route handler and check if we are
// logged in, ensuring that we go to the dashboard if that is the case.

// The various redirects will ensure a proper flow between login and dashboard
// pages so that your users have a proper experience on the front-end.

// route for root: should redirect to login route
app.get('/', sessionChecker, (req, res) => {
	res.redirect('/login')
})

// login route serves the login page
app.get('/login', sessionChecker, (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/register/register.html'))
	//render the handlebars template for the login page
	//res.render('login.hbs');
})

// dashboard route will check if the user is logged in and server
// the dashboard page
app.get('/dashboard', (req, res) => {
	if (req.session.user) {
		res.sendFile(path.join(__dirname, '/pub/user/user_dashboard.html'))
		// render the handlebars template with the email of the user
		//res.render('dashboard.hbs', {
		//	email: req.session.email
		//})
	} else {
		res.redirect('/login')
	}
})

app.get('/answer', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/answer/answer.html'));
})

app.get('/subscribe', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/register/subscribe.html'));
})

app.get('/report', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/report/report.html'));
})

app.use(express.static(__dirname + '/pub'));


// static js directory
//app.use("/js", express.static(path.join(__dirname, '/public/js')))

// static image directory
//app.use("/img", express.static(path.join(__dirname, '/public/img')))

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})