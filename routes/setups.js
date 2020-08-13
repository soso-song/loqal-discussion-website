// mongoose and mongo connection
const { mongoose } = require('../db/mongoose')
mongoose.set('bufferCommands', false);
mongoose.set('useFindAndModify', false);

const log = console.log

const { User, Question, Notice, Tag, Report} = require('../models/loqal')

// to validate object IDs
const { ObjectID } = require('mongodb')

/*** Helper functions below **********************************/
function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}


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
			res.redirect('/login')
		})
	} else {
		res.redirect('/login')
	}
}


// Middleware for authentication of resources
const adminAuthenticate = (req, res, next) => {
	if (req.session.user) {
		User.findById(req.session.user).then((user) => {
			if (!user || !user.isAdmin) {
				return Promise.reject();
			} else {
				req.user = user;
				next();
			}
		}).catch((error) => {
			res.redirect('/dashboard')
		})
	} else {
		res.redirect('/dashboard')
	}
}



module.exports = {
   User,
   Question,
   Notice,
   Tag,
   Report,
   ObjectID,
   isMongoError,
   sessionChecker,
   mongoChecker,
   authenticate,
   adminAuthenticate
};