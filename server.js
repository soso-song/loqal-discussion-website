/* server.js - user & resource authentication */
'use strict';
const log = console.log
const path = require('path')

const express = require('express')
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models
const { User, Question, Notice, Tag} = require('./models/loqal')

// to validate object IDs
const { ObjectID } = require('mongodb')

/// handlebars server-side templating engine
//const hbs = require('hbs')
// Set express property 'view engine' to be 'hbs'
//app.set('view engine', 'hbs')
// setting up partials directory
//hbs.registerPartials(path.join(__dirname, '/views/partials'))

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

// A route to login and create a session
app.post('/users/login', mongoChecker, (req, res) => {
	log(req.body)
	const email = req.body.email
    const password = req.body.password

    // Use the static method on the User model to find a user
    // by their email and password
	User.findByEmailPassword(email, password).then((user) => {
	    if (!user) {
            res.redirect('/login');
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
			res.status(500).redirect('/login');
		} else {
			log(error)
			res.status(400).redirect('/login');
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

/*** User routes below **********************************/
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

//get all question for given userid
app.get('/users/questions/:user', mongoChecker, (req, res) => {
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

//get all answers for given userid
app.get('/users/answers/:user', mongoChecker, (req, res) => {
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


//get all questions with given tag
app.get('/questions/tags/:tagid', mongoChecker, (req, res) => {
	const tag = req.params.tagid;
	Question.find(
		{'tags.name': tag}
	).then((questions) => {
		res.send(questions) 
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
	
})



// Route for getting the current user, check to see if there is a better way
app.get('/currentuser', mongoChecker, authenticate, (req, res) => {
	res.send(req.user)
})

/*** Question routes below **********************************/
// Route for creating a new question
app.post('/questions', mongoChecker, authenticate, (req, res) => {

	const question = new Question({
		title: req.body.title,
		content: req.body.content,
		user: req.user,
		tags: [], 
		//tags: req.body.tags, //TODO: need to add tags
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
			res.status(404).send('Restaurant not found');
		} else {
			res.json({ question });
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
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
			// question.tags = req.body.tags;	// TODO: add tags
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



// Route for creating a new answers
app.post('/questions/:id', mongoChecker, authenticate, (req, res) => {

	const id = req.params.id;
	if(!ObjectID.isValid(id)){	// nor valid id
		res.status(404).send('question not valid');
		return;
	}
	Question.findById(id).then((question)=>{
		if(!question){	//undefined
			res.status(404).send('question not found');
		}else{
			const answers = {
				user: req.user,
				content: req.body.content
			};
			question.answers.push(answers);
			question.save().then((result)=>{
				res.send(result);
				//res.redirect('/question?question_id=' + question._id); // no need refresh page since answer add in frontend
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

//http://localhost:5000/questions/search/o
app.get('/questions/answers/search/:keyword', mongoChecker, (req, res) => {
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

//Notice route below**********/
app.get('/notice', mongoChecker, (req, res) => {
	Notice.find().then((notice) => {
		res.sendFile(path.join(__dirname, '/pub/admin/notice.html'))
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})

})

app.post('/notice/:id', mongoChecker, authenticate, (req, res) => {

	const id = req.params.id;
	if(!ObjectID.isValid(id)){	// nor valid id
		res.status(404).send('notice not valid');
		return;
	}
	Notice.findById(id).then((notice)=>{
		if(!question){	//undefined
			res.status(404).send('notice not found');
		}else{
			const notice = new Notice({
				title: req.body.title,
				content: req.body.content,
				user: req.user,
				time: Date.now
			});
			notice.save().then((result)=>{
				res.send(result);
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

app.post("/notice", mongoChecker, (req, res) => {
	const notice = new Notice({
		title: req.body.title,
		content: req.body.content,
		user: req.user,
		time: Date.now
	});

	// Save questions
	notice.save().then((notice) => {
        res.redirect('/notice');
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

//tag route below**********/
app.get('/tag', mongoChecker, (req, res) => {
	Tag.find().then((answers) => {
		res.sendFile(path.join(__dirname, '/pub/admin/edit_tag.html'))
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

app.post("/tag", mongoChecker, (req, res) => {
	const tag = new Tag({
		name: req.body.name
	});

	// Save questions
	tag.save().then((tag) => {
        res.redirect('/tag');
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