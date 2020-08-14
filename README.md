![Logo](./pub/images/logo.png)
 
# Team 11 Project: LOQAL - A Localized Q&A Web Application
We receive a vast amount of information about the COVID-19 daily. This information overload makes it difficult to find reliable and relevant information, especially for seniors and other vulnerable groups in our community who are not well versed with querying the search engine and fact checking. The goal of this project is to create a question and answer web application for reliable dissemination of information and knowledge [related to the pandemic] among members of the community. 
 
## Team Members
 
| Name | GitHub Username |
| ------------- | ------------- |
| Behrad Ghadiri Bashardoost  | burtonrider  |
| Tongzhou Li  | greysky10  |
| Zhifei Song  | KylSong  |
| Nicole Xin Yue Wang  | niconicolii  |
 
 
# How To Use
 
## Getting Started
There are two ways to use this web application:
1. Visit our website by going to https://csc309-loqal-team11.herokuapp.com/
 
2. These instructions will help you get a copy of our completed assignment up and running on your local machine.
    * Clone this repository on your local machine
    ```shell
    git clone https://github.com/csc309-summer-2020/team11.git
    ```
    * Navigate to the cloned folder
    ```shell
    cd team11
    ```
    * Run MongoDB
    ```shell
    npm install
    mkdir mongo-data
    mongod --dbpath ./mongo-data
    ```
    * Open a new terminal window to start server
    ```shell
    cd team11
    node server.js
    ```
    * Visit `localhost:5000/` in your browser
 
# Features
 
Below we have listed the main functionalities associated with each page for regular users. In addition to these functionalities, Admin users have access to additional functionalities through Admin Dashboard which are described further down below in the [Admin Users](#admin-users) section.
 
## Regular Users
 
### Welcome Page (`index.html`)
This page serves as a welcome page. To get started, scroll down to the bottom of the page and click on the **Get Started** button.
 
### Register or Login (`register/register.html`)
* Register by entering all required fields in the left block and press the “Register” to create a new account.
* Validation check is performed to check if information inputted are valid and no duplicating username and email.
* If successfully registered, it will lead you to a page showing some popular tags that you could subscribe to.
* Alternatively, use one of the login credentials provided below to log in.
 
    | Username | Password | Type of Account |
    | ------------- | ------------- | ------------- |
    | user  | user  | Regular User  |
    | user2  | user2  | Regular User  |
    | admin  | admin  | Admin User  |
* By logging in, you will be lead to your user dashboard
 
### Subscribe to Tags (`register/subscribe.html`)
* Subscribing to a tag will allow questions related to this tag to be shown on your webpage.
* Most popular tags are shown, and also the tags you are currently following are shown.
    * most popular tags meaning tags most followed by other users or most mentioned in questions
* Follow/unfollow a tag by clicking on them
* Type in any tag name to subscribe, a non-existing tag name will be created as a new tag.
* All tags are stored in lowercase, and spaces in any tag will be replaced by dashes(-).
* Clicking on the "Continue" button will lead you to your user dashboard if you are first registering, otherwise you will be redirected back to the previous page you were on.
 
### User Dashboard (`user/user_dashboard.html`)
* Users user will be able to see the newest questions sorted in three ways:
   1. Everyone: newest question from everyone
   2. Tags: Newest questions with the tags you are following to.
      * Filter the questions by optioning in/out the tags you currently have.
      * Clicking on "Edit your tags" will lead you to a subscribe page to modify tags you are following.
   3. Following: Newest questions posted by people you are following
* Sidebar displays your username and has some nice greetings.
* Users will be able to see the latest notice posted by the admins.
* Bottom of the sidebar contains buttons which allow users to ask a new question, or go to their profile page.
* The horizontal navigation bar allows searching for questions by keyword, go to user dashboard, ask a question, go to profile page, or logout of account
 
### User Profile (`user/user_profile.html`)
* Sidebar shows user's display name, username, profile picture, and tags this user subscribes to.
* If you are visiting your own profile page, you will see the "Edit Profile" button which leads you to the edit page for your basic account information.
* If you are visiting someone else's profile page, you will be able to follow or unfollow other users by clicking on the "Follow" or "Unfollow" button.
* Click on the "Report This User" button to report any suspicious activity of this user account.
* Under "Activity", the questions and answers posted by this user account are listed.
* The list of followers and followings of this profile are listed under "Followers" and "Following".
 
### Edit Profile (`user/edit_profile.html`)
* Users can edit their username, display name, email, password, and profile photo.
* Clicking on "Edit Your Tags" will redirect you to a page where you can follow some popular tags, unfollow current tags, or add a custom tag.
* Clicking on "Change Password" will redirect you to a page where you can change your password by entering the new password twice to confirm.
   * Passwords will be encrypted.
* Users can see their status (normal or flagged)and account type (admin or regular user), but they cannot edit it.
* Validation check is performed to check if information inputted is valid and no duplicating username and email.
 
### Ask/Edit a Question (`question/question.html`, `question/edit_question.html`)
* Post a new question by clicking on the "Ask a New Question" button on the user dashboard or "Ask" on the main navigation bar.
* Provide a title, description and at least one related tag and preview your question before posting.
   * Separate tags with commas.
* Submitting a question will redirect the user to the newly created question page which will show this new posted question and all its corresponding answers. 
   * There will be a "Edit Question" button on this redirected page which clicking on it will lead to an edit page for this question.
   * Edit page for the question is very similar to the question posting page.
 
### Question and Answers (`answer/answer.html`, `answer/edit_answer.html`)
* Contains a single question, showing the title and content of the question, the tags this question is related to, the user who posted this question, and the time this question is posted.
* The user posting this question can edit this question's title, content, and related tags.
* Right upper corner of the question information block shows if this question is resolved. Only the user posting this question can see a "Mark Solved" button to mark the question as resolved.
* Any user can post a reply to questions, and most recent posted answers will be added to the top of the stack of answers, with each answer block showing the content of the answer, the user account posting this answer, and the time this answer was posted.
* Users can edit their answers' content by clicking on the "Edit Answer" button.
* The user posting this question can select the best answer by clicking on the "Pick as Best Answer" button. A best answer will be shown in green and only one best answer is allowed.
* Clicking on the display name or username shown on the question block or any answer block will redirect to that user's profile page.
* User can report a question or answer.
 
### Search (`searchQuestion/search_question.html`)
* Submit a query from any page in the search field provided in the navigation bar.
* The questions and answers containing that keyword in the title, content, or related tags will be displayed.
 
### Report (`report/report.html`)
* Buttons for reporting questions or an answer is provided in the individual question page.
* Buttons for reporting a user are provided in the user's profile page.
* Clicking on the report button will direct to a page for giving a reason of reporting this user, question, or answer.
* Will be redirected back to previous page after submitting the report.
 
## Admin Users
In addition to functionalities above, admin users have access to a variety of other features listed below through Admin Dashboard.
* A user can only become an admin user by changing the admin status by another admin user.
* A regular user attempting to visit an admin webpage will be alerted and redirected back to his/her regular dashboard.
* An admin user also have access to all the features a regular user has.
* An admin user can visit the admin dashboard by clicking on the "Admin Dashboard" button, showed only for admin users, in the sidebar of their regular dashboard.
 
### Admin Dashboard (`admin/admin_dashboard.html`)
* View all reported users
  * Shows the user being reported, the user submitting this report, the reason for the report, and the time this report was submitted.
  * Click "View User" to see reported user's profile
  * Flag users or deny this report.
* View all reported questions
  * Shows the question being reported, the user submitting this report, the reason for the report, and the time this report was submitted.
  * Click "View Question" to jump to the question page.
  * Flag questions or deny this report.
* View all reported answers
  * Shows the question being reported, the user submitting this report, the reason for the report, and the time this report was submitted.
  * Click "View Question" to jump to the question page with this answer.
  * Flag answer or deny this report.
* Admin's sidebar
 * Option to go back to the admin's dashboard.
 * Option to go back to the regular dashboard.
 * Options for jumping to bookmarks on admin's dashboard at list of reported users, list of reported questions, and list of reported answers.
 * Options to redirect to a page for posting new notices, or to look at all existing users, questions, answers or tags.
 
### Post Notice (`admin/notice.html`)
* An admin user could post important notices that are to be pinned on the sidebar of a regular user dashboard.
* A notice contains a title and its content.
* All notices will be shown at the bottom of this page.
* Admin can edit any notice's title, description, and active status.
   * Only a notice with active status being true will be pinned on the regular user dashboard, and only the newest notice will be shown.
 
### Past Reports (`admin/past_report.html`)
* Any reviewed reports, either content flagged or report denied, will be listed in this page.
* An admin user could delete a report by clicking the "Remove Report" button for that report to be never seen again.
* An admin user could reactivate a report by clicking the "Reactive" button for that report to appear in the admin's dashboard and waiting to be reviewed again.
 
### All Users (`admin/edit_user.html`)
* An admin could see a list of all registered users.
* Search a user by his/her exact username or email to see his/her complete account information.
  * Searching a non-existing user will show "No user found".
  * Searching with no keyword input will show all users.
* An admin user could edit any account's information except for the password.
* An admin user could mark a user as flagged or unflagged, and make the user to become an admin or regular user.
* The "See Profile" button will lead to this user's profile page.
* Clicking on the "save" button for editing the user profile will check validation of information inputs and check for duplicate username and email.
 
### All Questions (`admin/edit_question.html`)
* Admin could see a list of existing questions in a table showing the title, content, posting user, tags, and the time the question is posted, also the admin could see if the question is flagged and if the question is resolved.
* Admin could edit any question's title, content, and tags, and also could mark questions as flagged or unflagged, resolved or not resolved.
* Editing a question with an empty title, an empty content, or no tag if invalid. 
 
### All Answers (`admin/edit_answer.html`)
* Admin could see a list of all answers in a table showing the which question it is answering to, the user posting the answer, content of the answer, whether it is the best answer, whether it is flagged, and the time posted.
* Admin could edit any answer's content, whether it is the best answer, and whether it is flagged.
* Editing an answer's content to be empty is invalid.
 
### All Tags (`admin/edit_tag.html`)
* Admin could see a list of all existing tags in a table showing the name of the tags and the number of usage of the tags..
* Admin could edit the name of any tag.
* Editing a tag with an empty name is invalid.
 
# Overview of Routes
This application uses Express server to manage endpoints repond to client requrests, and uses Mongoose to model application data with schema-based objects. 
 
We have a server.js file where the main express app is implemented. Routes are separated into smaller files under `/routes` to decrease the size of the main app. Each of these files, which we refer to as mini-apps, creates an  express.Router instance as a module to be required in the main app. Each min-app handles queries on a specific data type while the main app contains methods that redirect some URI to pages. Below are routes in each main/mini-app listed and explained with the schema-based application data.
 
## Main app (`server.js`)
Routes in `server.js` are webpage routes for responding URI with corresponding webpages, which are all GET methods.
   * sessionCheck - checks for existence of an active user on the session, and redirects to user dashboard if it exists.
   * authenticate - checks for logged in user, will redirect to register/login page if no account logged in.
   * adminAuthenticate - checks if logged in user is an admin user, will redirect to regular user dashboard if failed to authenticate.
   
   | Path | Middleware | Redirects to | Required Parameter(s) |
   | ---- | ---------- | ----------- | --------------------- |
   | /    | sessionChecker  | [Landing page](#welcome-pageindexhtml)  |  |
   | /login | sessionChecker  | [Register/Login page](#register-or-login-registerregisterhtml) |  |
   | /dashboard  |   | [User dashboard](#user-dashboard-useruser_dashboardhtml) if a user is logged in, otherwise redirects to [register/login page](#register-or-login-registerregisterhtml)  |  |
   | /profile   | authenticate  | [Current user profile page](#user-content-user-profile-useruser_profilehtml) if no parameter given; redirects to other user profile page if given parameter `user_id`.  | `user_id` |
   | /edit/profile | authenticate | [Page for editing current user’s profile](#user-content-edit-profile-useredit_profilehtml)  |
   | /answer | authenticate | [Single question page](#user-content-question-and-answers-answeranswerhtml-answeredit_answerhtml)| `question_id` |
   | /edit/answer | authenticate | [Editing answer page](#user-content-question-and-answers-answeranswerhtml-answeredit_answerhtml) | `question_id` and `answer_id` |
   | /ask | authenticate | [Asking a new question page](#user-content-askedit-a-question-questionquestionhtml-questionedit_questionhtml)  |
   | /edit/question | authenticate | [Editing question page](#user-content-askedit-a-question-questionquestionhtml-questionedit_questionhtml) | `question_id` |
   | /subscribe | authenticate | [Subscribe page](#user-content-subscribe-to-tags-registersubscribehtml) |
   | /report | authenticate | [Report page](#user-content-report-reportreporthtml) | `type`(=either 'u'(user),'q'(question), or 'a'(answer)), `taget_id`, `user_id`, `back_url` |
   | /search | authenticate | [Search page](#user-content-search-searchquestionsearch_questionhtml) | `search_key` |
   | /admin/dashboard | adminAuthenticate | [Admin’s dashboard](#user-content-admin-dashboard-adminadmin_dashboardhtml) |  |
   | /admin/editquestion | adminAuthenticate | [Admin's edit question page](#user-content-all-questions-adminedit_questionhtml) |  |
   | /admin/editanswer | adminAuthenticate | [Admin's edit answer page](#user-content-all-answers-adminedit_answerhtml) |  |
   | /admin/edituser | adminAuthenticate | [Admin's edit user page](#user-content-all-users-adminedit_userhtml) |  |
   | /admin/edittag | adminAuthenticate | [Admin's edit tag page](#user-content-all-tags-adminedit_taghtml) |  |
   | /admin/notice | adminAuthenticate | [Admin's post important notices page](#user-content-post-notice-adminnoticehtml) |  |
   | /admin/editnotice | adminAuthenticate | [Admin's edit notice page](#user-content-post-notice-adminnoticehtml)  | `notice_id` |
   | /admin/pastreport | adminAuthenticate | [Admin's listing past reports page](#past-reports-adminreporthtml)  |  |
   | /404 | authenticate | 404 error page | |
   | /403 | authenticate | 403 error page | |
   | /500 | authenticate | 500 error page | |
 
 
## Mini-apps
### User (`users.js`)
#### User Schema Explanation
User Scheme is the schema for containing user information includes displayname, username, email, password, isFlagged, isAdmin, following, followers, tags, image_id, image_url.
Displayname, username and email requires the minimum length of 1.
Password requires the minimum length of 3.
* displayname:type: String
* username:type: String
* email: type: String
* password: type: String
* isFlagged:type: Boolean
* isAdmin:type: Boolean
* following: type: mongoose.Schema.Types.ObjectId
* followers:type: mongoose.Schema.Types.ObjectId
* tags:[mongoose.Schema.Types.ObjectId]
* image_id: type: String
* image_url: type: String
 
#### Routes handling User related requests
Middleware checkers:
   * mongoChecker - checks for mongo connection errors, this is implemented in basically every route therefore will not be listed in the table below 
   * authenticateAPI - checks for logged in users, will send error with status 401 "Unauthorized" if no login user
   * adminAuthenticateAPI - checks if logged in user is an admin user, will send error with status 401 "Unauthorized" if failed to authenticate.
         * routes listed below with a `*` infront of the method are routes with adminAuthenticateAPI checking
   
   | Path | Method | Parameters | Body | Respond | Explanations|
   | ---- | ------ | ---------- | ---- | ------- | --------- |
   | /users | POST |  | { email, <br> password, <br> username, <br> displayname } | - redirect to `/subscribe` <br>- status 400: Bad request <br> - status 500: Internal server error | Add a new User to <br>the User collection. |
   | /users/login | POST |  | { email, <br> password } | - redirect to `/dashboard` <br>- status 404: Resource not found <br> - status 400: Bad request <br> - status 500: Internal server error | Log user in by <br>adding info to session. |\
   | /users/logout | GET |  | | - redirection to `/` <br> - 500: Internal server error | Log user out by <br>removing the session. |
   | /users | * GET | | | - (json) list of Users <br> -401: Unauthorized <br> - 500: Internal server error | Get a list of all existing <br>User from User collection. |
   | /users/mapping | POST | | \[ id, id, ... \] | - (json){id : User} <br> - status 404: Can't find Users <br> - status 500: Internal server error | Take in a list of user ids, <br>return an object that maps <br>user ids to corresponding Users. |
   | /users | PATCH | | { displayname, <br>username, <br>email } | - redirect to `/profile`<br> -401: Unauthorized<br> - status 404: User not found<br> - status 400: Bad Request<br> - status 500: Internal server error | Modify current user's<br> displayname, username, <br> and email. |
   | /users/password | PATCH | | { password } | - redirect to `/profile`<br> -401: Unauthorized<br> - status 404: User not found<br> - status 400: Bad Request<br> - status 500: Internal server error | Modify current user's<br> password. |
   | /users/current | GET | | | - (json) User<br> -401: Unauthorized | Get User object<br> representing current <br> logged in user |
   | /users/flag/:id | * PATCH | User ID | { (boolean)`flag` } | - (json) User<br> -401: Unauthorized<br> - status 404: ID not valid<br> -status 404: User not found<br> - status 400: Bad Request<br> - status 500: Internal server error | Flag user with given<br> user id if `flag==true`, <br>otherwise unflag user. |
   | /users/picture | POST |  |  | - (json) User<br> -401: Unauthorized<br> -status 404: User not found<br> - status 400: Bad Request<br> - status 500: Internal server error | Upload a new profile<br> photo. |
 
 
 
 
### Tag (`tag.js`)
#### Tag Schema Explanation
Tag Schema contains two attributes including name, and count.
The minimum length of tag name is 1
The default number of count is 0, and this is an indicator of how popular the tag is.
 
### Question (`questions.js`)
#### Question Schema Explanation
Question Schema includes title, content, user, tags, answer, isResolved, is Flagged, time, and lastUpdated.
Title and content require the minimum length of 1.
The default time for the time is Date.now and for each update, the lastUpdated will be updated as well.
 
* title:type: String
* content:type: String
* user: type: mongoose.Schema.Types.ObjectId
* tags: type: [mongoose.Schema.Types.ObjectId]
 
 
### Answer (`answer.js`)
#### Answer Schema Explanation
Answer Schema includes user, content, isFlagged, isBest, time and lastUpdated.
Attribute of content requires minimum length of 1.
### Report (`reports.js`)
#### Report Schema Explanation
* type:type: String
* targetId: type: mongoose.Schema.Types.ObjectId
* reason: type: String
* user: type: mongoose.Schema.Types.ObjectId
* reviewer:type: mongoose.Schema.Types.ObjectId
* time: type: Date
* isReviewed: type: Boolean
 
### Notice (`notice.js`)
## Notice Schema Explanation
Notice Schema includes attributes of anime, content, time, user and isShowing.
Name and content requires minimum length of 1
There is an option in front-end to control the boolean of isShowing 
* name:type: String
* content:type: String
* time:type: Date
* user:type: mongoose.Schema.Types.ObjectId
* isShowing: type: Boolean
 
 
# Development Log
Throughout the development of Phase 1, we used the following Google sheet to keep track of our progress and tasks and would like to keep it here for reference:  
https://docs.google.com/spreadsheets/d/1eXUJ3reDqHHjKZr3RrSvqVHPCbOBuvz-uzYq6QhfW8U/edit?usp=sharing
 

