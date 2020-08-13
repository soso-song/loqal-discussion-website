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

const users = require('./routes/users')
app.use('/users', users)

const questions = require('./routes/questions')
app.use('/questions', questions)

const answers = require('./routes/answers')
app.use('/answers', answers)

const reports = require('./routes/reports')
app.use('/reports', reports)

const tag = require('./routes/tag')
app.use('/tag', tag)

const notice = require('./routes/notice')
app.use('/notice', notice)


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

app.get('/profile', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/user/user_profile.html'));
})

app.get('/edit/profile', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/user/edit_profile.html'));
})

app.get('/edit/password', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/user/edit_password.html'));
})

app.get('/answer', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/answer/answer.html'));
})

app.get('/edit/answer', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/answer/edit_answer.html'));
})

app.get('/ask', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/question/question.html'));
})

app.get('/edit/question', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/question/edit_question.html'));
})

app.get('/subscribe', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/register/subscribe.html'));
})

app.get('/report', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/report/report.html'));
})

app.get('/search', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/searchQuestion/search_question.html'));
})

app.get('/admin/dashboard', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/admin/admin_dashboard.html'));
})

app.get('/admin/editquestion', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/admin/edit_question.html'));
})

app.get('/admin/editanswer', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/admin/edit_answer.html'));
})

app.get('/admin/edituser', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/admin/edit_user.html'));
})

app.get('/admin/edittag', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/admin/edit_tag.html'));
})

app.get('/admin/notice', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/admin/notice.html'));
})

app.get('/admin/editnotice', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/admin/edit_notice.html'));
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