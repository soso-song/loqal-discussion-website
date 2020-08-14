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
   adminAuthenticate,
   authenticateAPI,
   adminAuthenticateAPI
} = require('./setups');

//Notice route below**********/
//add a notice: set isShowing for all previous notices to false when a new notice is added
router.post('/', mongoChecker, adminAuthenticateAPI, (req, res) => {
	// disable all passed notices
	Notice.updateMany({isShowing:true},{$set:{isShowing:false}})
	.then(updated=>{
		const notice = new Notice({
		title: req.body.title,
		content: req.body.content,
		user: req.session.user
		});

		notice.save().
		then(notice =>{
			res.send(notice);
		})
		.catch((error) => {
			console.log(error)
			if (isMongoError(error)) { 
				res.status(500).send('Internal server error')
			} else {
				res.status(400).send('Bad Request')
			}
		})
	})
	.catch(err=>{
		res.status(500).send('Internal server error')
	})	
})

// get a notice with isShowing set to true
router.get('/current', mongoChecker, authenticateAPI, (req, res) => {
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

// get all notice
router.get('/', mongoChecker, adminAuthenticateAPI, (req, res) => {
	Notice.find().then((notice) => {
		notice = notice.sort((a,b) => b.time - a.time);
		res.send(notice) 
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})

// Route for getting the notice by given notice id
router.get('/:id', mongoChecker, adminAuthenticateAPI, (req, res) => {
	const id = req.params.id;
	// Validate id
	if (!ObjectID.isValid(id)) {
		res.status(404).send('Invalid Notice ID');
		return;
	}
	Notice.findById(id).then((notice) => {
		if (!notice) {
			res.status(404).send('Notice not found');
		} else {
			res.json(notice);
		}
	})
	.catch((error) => {
		res.status(500).send('Internal Server Error');
	})
})

// manually edit notice from admin dashboard
router.patch('/:id', mongoChecker, adminAuthenticateAPI, (req, res) => {
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
			notice.save().then(notice=>{
				res.send(notice);
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

module.exports = router;