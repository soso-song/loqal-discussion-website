const express = require('express')
const router = express.Router()
const log = console.log

const {
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
} = require('./setups');

/*** Question routes below **********************************/
// Route for creating a new question
router.post('/', mongoChecker, authenticate, (req, res) => {
	const question = new Question({
		title: req.body.title,
		content: req.body.content,
		user: req.user,
		tags: req.body.tags, 
		answers: [],
		isResolved: false,
		isFlagged: false
	});

	// Save questions
	question.save().then((quesiton) => {
        res.redirect('/answer?question_id=' + question._id);
	})
	.catch((error) => {
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	})
})

/// Route for getting all exisiting questions
router.get('/', mongoChecker, authenticate, (req, res) => {
	Question.find().then((questions) => {
		questions = questions.sort((a,b) => b.time - a.time);
		res.send(questions) 
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})

})

//get all question for given userid
router.get('/users/:user', mongoChecker, authenticate, (req, res) => {
	const userid = req.params.user;
	Question.find(
		{user : { $eq : userid} }
	).then((questions) => {
		questions = questions.sort((a,b) => b.time - a.time);
		res.send(questions) 
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})

// Route for getting questions posted by users the current user is following
router.get('/following', mongoChecker, authenticate, (req, res) => {
	const usersfollowing = req.user.following

	Question.find(
		{ user: { "$in": usersfollowing }}
	).then((questions) => {
		questions = questions.sort((a,b) => b.time - a.time);
		res.send(questions) 
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})

// Route for get all questions with given a list of tag ids in the body
router.post('/tags', mongoChecker, (req, res) => {
	const tag_ids = req.body.tag_ids;
	Question.find(
		{'tags': { $in : tag_ids} }
	).then((questions) => {
		questions = questions.sort((a,b) => b.time - a.time);
		res.send(questions) 
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
	
})

// Route for getting questions with given tag name
router.get('/tags/:tagname', mongoChecker, (req, res) => {
	const tagname = req.params.tagname;
	//log('inside questionsearch');
	Tag.find(
		{name: {$eq: tagname}}
	).then(tagdata => {
		const tag = tagdata[0]; // we chuold have tags have unique name, so
		if(!tag){
			res.send(false);//status(404).send('tag name not found'); // tell user tag name is not exist, instead no question
		}else{
			Question.find(
				{tags : tag._id}
			).then((questions) => {
				questions = questions.sort((a,b) => b.time - a.time);
				res.send(questions);
			})
			.catch((error) => {
				res.status(500).send("Internal Server Error")
			})
		}
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})

// Route for getting questions containing the given keyword
router.get('/search/:keyword', mongoChecker, (req, res) => {
	const keyword = req.params.keyword;
	//log('inside questionsearch');
	Question.find({$or:[
		{title 			: { $regex: keyword, $options: "i" }}, // "i" is for case insensitive match
		{content		: { $regex: keyword, $options: "i" }}
		//{tags 			: { $regex: keyword, $options: "i" }} //TODO: need to add tags
	]}).then((questions) => {
		questions = questions.sort((a,b) => b.time - a.time);
		res.send(questions) 
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})


// Route for getting the question by given id
router.get('/:id', mongoChecker, (req, res) => {
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

// Route for flagging question
router.patch('/flag/:id', mongoChecker, adminAuthenticate, (req, res) => {
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


// Route for updating info of a question given by id
router.patch('/:id', mongoChecker, authenticate, (req, res) => {
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
		} else if (req.session.user == question.user) {
			question.title = req.body.title;
			question.content = req.body.content;
			question.tags = req.body.tags;
			if (req.body.isResolved !== null){
				question.isResolved = req.body.isResolved;
			}
			question.save().then((result)=>{
				res.redirect(303, '/answer?question_id=' + id);
			}).catch((error)=>{
				console.log(error);
				res.status(400).send('Bad request.');
			})
		}
		else {
			console.log(req.session.user)
			console.log(question.user)
			res.status(403).send('No permission to edit quesiton');
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

// Route for updating info of a question given by id
router.patch('/admin/:id', mongoChecker, adminAuthenticate, (req, res) => {
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
			question.isResolved = req.body.isResolved;
			question.isFlagged = req.body.isFlagged;
			question.save().then((result)=>{
				res.send('Okay');
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

module.exports = router;