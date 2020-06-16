/* Ass1 Library - JS */

// questions from database
questions = [];

// temporary post class and answer class
class Post{
	constructor(title, content, user, tag){	
		this.title = title;
		this.content = content;
		this.user = user;
		this.tag = tag;
		this.is_flagged = user.flagged;			// in case flagged user making function
		this.answer = [];
		this.time = new Date().toLocaleTimeString();
	}

	add_answer(new_answer){
		this.answer.push(new_answer);
	}
}
class Answer{
	constructor(content, user){
		this.content = content;
		this.user = user;
		this.is_flagged = user.flagged;			// in case flagged user making function
		this.time = new Date().toLocaleTimeString();
	}
}


// post are made by some users
questions.push(new Post('1st question title a1','1st qustion content a2', 'user1', 'general'));
questions.push(new Post('2st question title a3','2st qustion content a4', 'user2', 'general'));
questions.push(new Post('3st question a4 title','3st qustion content', 'user3', 'pin_by_author'));
questions.push(new Post('4st question title','4st qustion content', 'user1', 'flagged_by_user'));
// user make new answer note: when we are answering post, we should already know where is it
questions[1].add_answer(new Answer('answering xcc to post1', 'user1'));
questions[1].add_answer(new Answer('answering cxx to post1', 'user2'));
questions[2].add_answer(new Answer('answering xcc to post2', 'user2'));
questions[3].add_answer(new Answer('answering to post3', 'user1'));



const searchQuestionForm = document.querySelector('#searchQuestionForm');
searchQuestionForm.addEventListener('submit', search_questions);

function search_questions(e) {
	e.preventDefault();
	const keyword = searchQuestionForm.elements['keyword'].value;
	// console.log(searchQuestionForm.elements['keyword']);
	// console.log(keyword);
	result_post = [];
	result_answ = [];
	for(curr_que of questions){
		if(curr_que.title.includes(keyword) || curr_que.content.includes(keyword)){
			result_post.push(curr_que);
			//console.log(curr_que);
		}
		for(curr_ans of curr_que.answer){
			if(curr_ans.content.includes(keyword)){
				result_answ.push(curr_ans);
				//console.log(curr_ans);
			}
		}
	}
	console.log('post_result:');
	console.log(result_post);
	console.log('answ_result:');
	console.log( result_answ);
	// document.write(result_post);
	// document.write(result_answ);
}

