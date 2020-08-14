const express = require('express')
const router = express.Router()
const log = console.log

const {
   User,
   Question,
   ObjectID,
   isMongoError,
   mongoChecker,
   authenticateAPI,
   adminAuthenticateAPI
} = require('./setups');

/*** Answers routes below **********************************/

//get all answers for given userid
router.get('/users/:user', mongoChecker, authenticateAPI, (req, res) => {
	const userid = req.params.user;
	Question.find(
		{'answers.user' : {$eq : userid} }
	).then((questions) => {
		questions = questions.sort((a,b) => b.time - a.time);
		questions.forEach(ques=>{
			ques.answers = ques.answers.filter(ans => ans.user == userid);
			ques.answer = ques.answers.sort((a,b) => b.time - a.time);
		});
		res.send(questions) 
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})

// Route for getting all answers containing the given keyword
router.get('/search/:keyword', mongoChecker,  authenticateAPI, (req, res) => {
	const keyword = req.params.keyword;
	Question.find(
		{'answers.content'	: { $regex: keyword}} // $options: "i" 
	).then((answers) => {
		answers = answers.sort((a,b) => b.time - a.time);
		res.send(answers) 
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
	
})

// Route for getting the answer by given question id and answer id
router.get('/:question_id/:answer_id', mongoChecker, authenticateAPI, (req, res) => {
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

// Route for flagging answer
router.patch('/flag/:id', mongoChecker, adminAuthenticateAPI, (req, res) => {
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
				answer.lastUpdated = Date.now();
				question.save()
				.then(ques=>{
					//console.log(ques);
					res.send(ques);
				})
				.catch((error)=>{
					res.status(400).send('Bad request.');
				})
			}else{
				res.status(404).send('Answer not found');
			}
		})
	})
	.catch((error) => {
		console.error(error);
		res.status(500).send('Internal Server Error');
	})
})

// Gets question and answer based on answer id
router.get('/:answer_id', mongoChecker, authenticateAPI, (req, res) => {
	const answer_id = req.params.answer_id;
	// Validate id
	if (!ObjectID.isValid(answer_id)) {
		res.status(404).send('Invalid ID');
		return;  // so that we don't run the rest of the handler.
	}

	// If id valid, findById
	Question.find().then(questions=> {
		if (!questions) {
			res.status(404).send('Questions not found');
		} else {
			for(const question of questions){
				const answer = (question.answers.filter((ans)=>ans._id == answer_id))[0];
				if(answer){
					res.json({question,answer});
					return;
				}
			};
			res.status(404).send('Answer not found');
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

// Route for edting the answer
router.patch('/:question_id/:answer_id', mongoChecker, authenticateAPI, (req, res) => {
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
		}
		else {
			const answer = (question.answers.filter((ans)=>ans._id == answer_id))[0];
			if(answer && answer.user == req.session.user){
				answer.content = req.body.content;
				answer.lastUpdated = Date.now();
				question.save().then((result)=>{
					res.redirect(303, '/answer?question_id=' + question_id);
				}).catch((error)=>{
					console.log(error);
					res.status(400).send('Bad request.');
				})
			} else if(answer){
				res.status(403).send("No permission to edit");
			}
			else{
				res.status(404).send('Answer not found');
			}
		}
	})
	.catch((error) => {
		console.log(error)
		res.status(500).send('Internal Server Error');
	})
})

// Route for edting the answer on admin side
router.patch('/admin/:question_id/:answer_id', mongoChecker, adminAuthenticateAPI, (req, res) => {
	const question_id = req.params.question_id;
	const answer_id = req.params.answer_id;

	// Validate id
	if (!ObjectID.isValid(question_id) || !ObjectID.isValid(answer_id)) {
		res.status(404).send('Invalid Question ID');
		return;
	}
	// If id valid, findById
	Question.findById(question_id).then((question) => {
		if (!question) {
			res.status(404).send('Question not found');
		}
		else {
			const answer = (question.answers.filter((ans)=>ans._id == answer_id))[0];

			if(answer){
				answer.content = req.body.content;
				answer.lastUpdated = Date.now();
				if(req.body.isBest){
					question.answers.map((myans) => {
						myans.isBest = false;
					})
				}
				answer.isBest = req.body.isBest;
				answer.isFlagged = req.body.isFlagged;
				question.save().then((result)=>{
					res.send(result);
				}).catch((error)=>{
					console.log(error);
					res.status(400).send('Bad request.');
				})
			}else{
				res.status(404).send('Answer not found');
			}

		}
	})
	.catch((error) => {
		console.log(error)
		res.status(500).send('Internal Server Error');
	})
})


// Route for setting an answer as best answer
router.post('/best/:question_id/:answer_id', mongoChecker, authenticateAPI, (req, res) => {
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

			if(answer){
				answer.isBest = true;

				question.save().then((result)=>{
					res.status(200).send('Selected as best answer');
				}).catch((error)=>{
					console.log(error);
					res.status(400).send('Bad request.');
				})
			}else{
				res.status(404).send('Answer not found');
			}
			
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

// Route for creating a new answers
router.post('/:id', mongoChecker, authenticateAPI, (req, res) => {

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
			question.answers = question.answers.sort((a,b) => a.time - b.time);
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


module.exports = router;