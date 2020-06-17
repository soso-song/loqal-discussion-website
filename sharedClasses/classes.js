/* Ass1 Library - JS */

// question/answer/user id count
let num_questions = 0;
let num_answers = 0;
let num_users = 0;

// global arrays
const user = [];
const questions = [];
const answers = [];


class User{
	constructor(username, email, display_name, password, 
				list_of_tags, photo, is_admin){
		this.username = username;
		this.email = email;
		this.display_name = display_name;
		this.password = password;
		this.photo = photo;
		this.is_admin;
	}







}




class Question{
	constructor(title, content, user, tags){	
		this.title = title;
		this.content = content;
		this.user = user;
		this.tag = tag;
		this.is_resolved = false;
		this.is_flagged = user.is_flagged;			// in case flagged user posting questions
		// this.answer = [];
		this.time = new Date().toLocaleTimeString();
		// unique id
		this.id = num_questions;
		num_questions++;
	}
}

class Answer{
	constructor(content, user, question_id, answer_id=-1){
		this.is_best = false;
		this.content = content;
		this.user = user;
		this.question_id = question_id;
		this.answer_id = answer_id;				// -1 if this is an answer to answer
		this.time = new Date().toLocaleTimeString();
		this.is_flagged = user.flagged;			// in case flagged user posting answers
		// unique id
		this.id = num_answers;
		num_answers++;
	}
}


// hardcoded questions
questions.push(new Question('1st question title a1','1st qustion content a2', 'user1', 'tag is general'));
questions.push(new Question('2st question title a3','2st qustion content a4', 'user2', 'tag is general'));
questions.push(new Question('3st question a4 title','3st qustion content', 'user3', 'tag is pin_by_author'));
questions.push(new Question('4st question title','4st qustion content', 'user1', 'tag is flagged_by_user'));
// user make new answer note: when we are answering post, we should already know where is it
questions[1].add_answer(new Answer('answering xcc to post1', 'user1'));
questions[1].add_answer(new Answer('answering cxx to post1', 'user2'));
questions[2].add_answer(new Answer('answering xcc to post2', 'user2'));
questions[3].add_answer(new Answer('answering to post3', 'user1'));


