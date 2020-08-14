const express = require('express')
const router = express.Router()
const log = console.log

const {
   User,
   Report,
   ObjectID,
   isMongoError,
   mongoChecker,
   authenticateAPI,
   adminAuthenticateAPI
} = require('./setups');

//report route below********************************************************************/
// Route for creating a new report
router.post('/', mongoChecker, authenticateAPI, (req, res) => {
	const report = new Report({
		type: req.body.type,
		targetId: req.body.targetId,
		reason: req.body.reason,
		user: req.user
	});
	report.save().then(report=>{
		res.send(report);
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

/// Route for getting all exisiting reports
router.get('/', mongoChecker, adminAuthenticateAPI, (req, res) => {
	Report.find().then((reports) => {
		reports = reports.sort((a,b) => b.time - a.time);
		res.send(reports) 
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})

})

// get all reports with type of user
router.get('/type/user', mongoChecker, adminAuthenticateAPI, (req, res) => {
	Report.find(
		{type : {$eq : 'u'} }
	).then((report) => {
		if(!report){
			res.status(404).send('Reported user not found');
		}else{
			report = report.sort((a,b) => b.time - a.time);
			res.send(report) 
		}
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})

// get all reports with type of question
router.get('/type/question', mongoChecker, adminAuthenticateAPI, (req, res) => {
	Report.find(
		{type : {$eq : 'q'} }
	).then((report) => {
		if(!report){
			res.status(404).send('Reported question not found');
		}else{
			report = report.sort((a,b) => b.time - a.time);
			res.send(report) 
		}
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})

// get all reports with type of answer
router.get('/type/answer', mongoChecker, adminAuthenticateAPI, (req, res) => {
	Report.find(
		{type : {$eq : 'a'} }
	).then((report) => {
		if(!report){
			res.status(404).send('Reported answer not found');
		}else{
			report = report.sort((a,b) => b.time - a.time);
			res.send(report) 
		}
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})


// Route for getting the report by given id
router.get('/:id', mongoChecker, adminAuthenticateAPI, (req, res) => {
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


// Route for updating basic info from admin of a review given by id
router.patch('/:id', mongoChecker, adminAuthenticateAPI, (req, res) => {
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
			report.save().then(report=>{
				res.send(report);
			})
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

// Route for getting the report by given id
router.delete('/:id', mongoChecker, (req, res) => {
	const id = req.params.id;

	// Validate id
	if (!ObjectID.isValid(id)) {
		res.status(404).send('Invalid Report ID');
		return;  // so that we don't run the rest of the handler.
	}

	// If id valid, findById
	Report.findByIdAndDelete(id).then((report) => { // mongoose >= 2.7.1, more efficient than 
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

module.exports = router;