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

//Notice route below**********/
//add a notice: set isShowing for all previous notices to false when a new notice is added
router.post('/', mongoChecker, authenticate, (req, res) => {
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
router.get('/current', mongoChecker, (req, res) => {
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
router.get('/', mongoChecker, (req, res) => {
	Notice.find().then((notice) => {
		res.send(notice) 
	})
	.catch((error) => {
		res.status(500).send("Internal Server Error")
	})
})

// Route for getting the notice by given id
router.get('/:id', mongoChecker, (req, res) => {
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

// manually edit notice from dashboard
router.patch('/:id', mongoChecker, (req, res) => {
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

module.exports = router;