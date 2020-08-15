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
* Users user will be able to see the newest questions, sorted by from most recent to less recent, under the three tabs:
   1. Everyone: newest question from everyone
   2. Tags: newest questions with the tags you are following to.
      * Filter the questions by optioning in/out the tags you currently have.
      * Click on "Edit your tags" button to redirect to Subscribe page to modify tags you are following.
   3. Following: newest questions posted by people you are following.
   * Questions are separated with pagination so number of questions shown on the page is limited, scroll to the bottom to continue viewing more questions on the next page.
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
This application uses Express server to manage endpoints respond to client requrests, and uses Mongoose to model application data with schema-based objects. 
 
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
Middleware checkers used in mini-apps:
   * mongoChecker - checks for mongo connection errors, this is implemented in basically every route therefore will not be listed in the table below 
   * authenticateAPI - checks for logged in users, will send error with status 401 "Unauthorized" if no login user
   * adminAuthenticateAPI - checks if a logged in user is an admin user, will send error with status 401 "Unauthorized" if failed to authenticate.
      * routes listed below with a `*` in front of the method are routes with adminAuthenticateAPI checking
 
### User (`users.js`)
#### User Schema Explanation
User Scheme is the schema for containing user information including 
* `displayname`, `username`, and `email` are Strings and requires the minimum length of 1
* `password` requires the minimum length of 3 and are stores as encrypted Strings
* `isFlagged`, `isAdmin` are Booleans
* `following`, `followers` are list of User IDs
* `tags` are list of Tag IDs
* `image_id`, `image_url` are Strings, default being empty Strings
 
#### Routes handling User related requests
   | Path | Method | Parameters | Body | Respond | Explanations|
   | ---- | ------ | ---------- | ---- | ------- | --------- |
   | /users | POST |  | { email, <br> password, <br> username, <br> displayname } | - redirect to `/subscribe` <br>- status 400: Bad request <br> - status 500: Internal server error | Add a new User to <br>the User collection. |
   | /users/login | POST |  | { email, <br> password } | - redirect to `/dashboard` <br>- status 404: Resource not found <br> - status 400: Bad request <br> - status 500: Internal server error | Log user in by <br>adding info to session. |\
   | /users/logout | GET |  | | - redirection to `/` <br> - 500: Internal server error | Log users out by <br>removing the session. |
   | /users<br>/current | GET | | | - (json) User<br> - status 401: Unauthorized | Get User object<br> representing current <br> logged in user |
   | /users/:id | GET | User ID | | - (json) User<br> - status 401: Unauthorized<br> - status 404: Resource not found<br> - status 500: Internal server error | Get the User object <br>with the given user ID. |
   | /users | * GET | | | - (json) array of Users <br> - status 401: Unauthorized <br> - 500: Internal server error | Get a list of all existing <br>User from User collection. |
   | /users<br>/mapping | POST | | {`ids`:<br> \<ID array\>} | - (json) object mapping ids to Users <br> - status 404: Can't find Users <br> - status 500: Internal server error | Given a list of User `ids`, return<br> an object that maps user<br> ids to corresponding Users. |
   | /users | PATCH | | { displayname, <br>username, <br>email } | - redirect to `/profile`<br> - status 401: Unauthorized<br> - status 404: User not found<br> - status 400: Bad Request<br> - status 500: Internal server error | Modify current user's<br> displayname, username, <br> and email; will check to<br> avoid user changing other's profiles. |
   | /users/:id |* PATCH | User ID | { displayname, <br>username, <br>email, <br>tags, <br>isFlagged, <br>isAdmin } | - redirect to `/profile`<br> - status 401: Unauthorized<br> - status 404: ID not valid<br> - status 404: User not found<br>- status 400: Bad Request<br> - status 500: Internal server error | Edit profile of user<br>(with given user id)<br> by admin user. |
   | /users<br>/password | PATCH | | { password } | - redirect to `/profile`<br> - status 401: Unauthorized<br> - status 404: User not found<br> - status 400: Bad Request<br> - status 500: Internal server error | Modify current user's<br> password. |
   | /users<br>/flag/:id | * PATCH | User ID | { `flag` } | - (json) User<br> - status 401: Unauthorized<br> - status 404: ID not valid<br> -status 404: User not found<br> - status 400: Bad Request<br> - status 500: Internal server error | Flag user with given<br> user id if `flag` is true, <br>otherwise unflag user. |
   | /users/picture | POST |  |  | - (json) current User<br> - status 401: Unauthorized<br> -status 404: User not found<br> - status 400: Bad Request<br> - status 500: Internal server error | Upload a new profile<br> photo. |
   | /users<br>/follow/:id | POST | User ID | | - (json) current User<br> - status 401: Unauthorized<br> - status 404: ID not valid<br> - status 404: User not found<br>-status 400: Already following<br> - status 400: Bad Request<br> - status 500: Internal server error | Add user ID to follow-<br>ing list of current user<br> logged in, will check to <br>avoid following twice. |
   | /users<br>/unfollow/:id | POST | User ID | | - (json) current User<br> - status 401: Unauthorized<br> - status 404: ID not valid<br> - status 404: User not found<br>-status 400: Already not following<br> - status 400: Bad Request<br> - status 500: Internal server error | Remove user ID from<br> following list of current <br>logged in user, will check<br> to avoid unfollowing twice. |
 
 
### Tag (`tag.js`)
#### Tag Schema Explanation
Tag Schema contains two attributes: including name, and count.
* `name` which is name of the tag, with minimum length of 1
* `count` with default number 0, this is an indicator of how popular the tag is
 
#### Routes handling Tags related requests
   | Path | Method | Parameters | Body | Respond | Explanations|
   | ---- | ------ | ---------- | ---- | ------- | --------- |
   | /tag | GET | | | - (json) array of Tags<br> - status 401: Unauthorized <br>- status 500: Internal Server Error | Get all existing Tags. |
   | /tag<br>/popular | GET| | | - (json) array of Tags<br> - status 401: Unauthorized <br>- status 500: Internal Server Error | Get all existing Tags<br> sorted by number of usage. |
   | /tag/names | POST | | { ids: <br>\<ID array\> } | - (json) array of Strings<br> - status 401: Unauthorized <br> - status 404: Can't find all tags<br> - status 500: Internal Server Error | Input an array of Tag IDs,<br> return the corresponding <br>array of tag names. |
   | /tag/info | POST | | { ids: <br>\<ID array\> } | - (json) array of Tags<br> - status 401: Unauthorized<br> - status 404: Can't find all tags<br> - status 500: Internal Server Error | Input an array of Tag <br> IDs, return the corresponding <br>array of Tags. |
   | /tag | POST | | { name } | - (json) new created Tag <br> - status 400: Bad Request<br> - status 401: Unauthorized<br> - status 500: Internal Server Error | Adding a new Tag to<br>collection, will check to <br>avoid duplicate tag names. |
   | /tag/:id | * PATCH | Tag ID | { name } | - (json) updated Tag <br> - status 400: Bad Request<br> - status 401: Unauthorized<br> - status 404: Resource not found<br> - status 404: Tag not found <br> - status 500: Internal Server Error | Edit name of tag with given<br> id, will check to avoid<br> duplicate tag names. |
   | /tag | * DELETE| Tag ID | | - (json) deleted Tag<br> - status 401: Unauthorized <br> - status 404: Resource not found <br> - status 404: Tag not found<br> - status 500: Internal Server Error | Delete Tag with given ID<br> from collection. |
   | /tag<br>/follow<br>/:id | PATCH | Tag ID | | - (json) followed Tag <br> - status 400: Bad Request<br> - status 401: Unauthorized<br> - status 404: Invalid Tag ID<br> - status 404: Tag not found<br> - status 409: Already following Tag<br> - status 500: Internal Server Error | Add Tag ID to current <br>user’s list of following <br>tags, will check to avoid <br>following twice. |
   | /tag<br>/unfollow<br>/:id | PATCH | Tag ID | | - (json) unfollowed Tag <br> - status 400: Bad Request<br> - status 401: Unauthorized<br> - status 404: Invalid Tag ID<br> - status 404: Tag not found<br> - status 500: Internal Server Error | Remove Tag ID from current<br> user’s list of following <br>tags, will check to avoid <br>unfollowing twice. |
   | /tag<br>/increment<br>/:id | PATCH | Tag ID | | - (json) updated Tag <br> - status 400: Bad Request<br> - status 401: Unauthorized<br> - status 404: Invalid Tag ID<br> - status 404: Tag not found<br> - status 500: Internal Server Error | Count one more the usage of<BR> Tag with given Tag ID. |
   | /tag/:id | GET| Tag ID | | - (json) Tag <br> - status 400: Bad Request<br> - status 401: Unauthorized<br> - status 404: Invalid Tag ID<br> - status 404: Tag not found<br> - status 500: Internal Server Error | Get Tag with given Tag ID |
 
 
### Question (`questions.js`)
#### Question Schema Explanation
Question Schema includes:
* `title`, `content` are Strings requiring minimum length of 1
* `user` is the User ID of user who posted this question
* `answers` is a list of subdocument AnswerSchema
* `isResolved`, `is Flagged` are Booleans
* `time` is Date object with default being Date.now at initialization
* `lastUpdated` is Date objects that is Date.now for each question update
 
#### Routes handling Question related requests
   | Path | Method | Parameters | Body | Respond | Explanations|
   | ---- | ------ | ---------- | ---- | ------- | ---------|
   |/question|POST| |{ title,<br>content,<br>user,<br>tags,<br>answers,<br>isResolved,<br>isFlagged }|-send(questions)<br>-status(500)LInternal server error<br>-status(400):Bad Request<br><br> - status 401: Unauthorized|Add a new Question to the<br> collection.
   |/questions<br>/users/:user|GET|UserId| |-(json)questions<br>-status 500: Internal Server Error<br> - status 401: Unauthorized|Get all existing questions from<br> Question collection|
   |/questions<br>/following|GET| | |-(json) questions<br>-status 500: Internal Server Error<br> - status 401: Unauthorized|Get all questions posted by users the current user is following|
   |/questions/tags|POST| |{ tag_ids: <br>\<ID array\> }|-(json) questions<br>-status 500: Internal Server Error<br> - status 401: Unauthorized| Given an array of tag ids<br>, get all the questions that<br> each contain at least one tag <br> from the tag id array.|
   |questions<br>/tags/:tagname|GET|tagname| |-(json)Questions-<br>-status 500: Internal Server Error<br>-status 404: Tag name not found<br> - status 401: Unauthorized|Get all questions containing a tag with given tag name.|
   |/question<br>/search/:keyword|GET|keyword given by user||-(json)questions<br>-status 500: Internal Server Error<br> - status 401: Unauthorized| Get all questions containing the given keyword|
   |/questions/:id|GET|question Id||-(json)question<br>-status 404: Question not found<br>-status 500: Internal Server Error<br> - status 401: Unauthorized|Get the question with given ID|
   |/questions<br>/flag/:id| * PATCH|Question ID| { `flag` } |-(json)question<br>-status 404: ID not valid/Question not found<br>-status 400: Bad request<br>-status 500 :internal Server Error|Flag the question if<br> `flag` is true, otherwise <br> unflag it.|
   |/questions/:id|PATCH|question Id|{ title, <br>content, <br>tags, <br>isResolved }|-(redirect)answer?question_id= id<br>-status 403" No permission to edit question<br>-status 400: Bad request<br>-404: Question not found<br> - status 401: Unauthorized|Update information of the question<br> with given Question ID, will<br> check to avoid user with no<br> permission to edit question.|
   |/questions<br>/admin/:id|* PATCH|question Id|{ title, <br>content, <br>tags, <br>isResolved, <br>isFlagged }|-(json)info of the question<br>-status 404: Question not found/INvalid question ID<br>-status 400: Bad request.<br>-status 500: INternal Server Error<br> - status 401: Unauthorized|Edit a question with given<br> Question ID by an admin user. |
 

 
### Answer (`answer.js`)
#### Answer Schema Explanation
Answer Schema includes:
* `content` is a String requiring minimum length of 1
* `user` is a User ID
* `isFlagged`, `isBest` are Booleans
* `time` is Date object with default being Date.now at initialization
* `lastUpdated` is Date objects that is Date.now for each answer update
 
#### Routes handling Answer related requests
   | Path | Method | Parameters | Body | Respond | Explanations|
   | ---- | ------ | ---------- | ---- | ------- | --------- |
   | /answers<br>/users<br>/:users | GET | User ID | | - (json) array of Questions<br>- status 401: Unauthorize<br>- status 500: Internal Server Error | Get a list of Questions containing <br>Answer(s) posted by user with given <br>User ID | 
   | /answers<br>/search<br>/:keyword | GET | String | | - (json) array of Questions<br>- status 401: Unauthorize<br>- status 500: Internal Server Error | Get a list of Questions containing <br>Answer(s) containing the given <br>keyword | 
   | /answers<br>/:question_id<br>/:answer_id | GET | Question ID,<br>Answer ID | | - (json) Answer<br>- status 401: Unauthorize<br>- status 404: Invalid ID<br>- status 404: Question not found<br>- status 500: Internal Server Error | Get the answer with given <br>Answer ID that could be found<br>in the question with given <br>Question ID | 
   | /answers<br>/:answer_id | GET | Answer ID | | - (json) Question, Answer<br>- status 401: Unauthorize<br>- status 404: Invalid ID<br>- status 404: Question not found<br>- status 404: Answer not found<br>- status 500: Internal Server Error | Find answer using only given, <br>Answer ID. This is different <br>to previous one because we need<br>more steps to search into all ques-<br>tions since Answer is subdocument<br>of Question | 
   | /answers<br>/flag/:id | * PATCH | Answer ID | {`flag`} | - (json) Question<br>- status 400: Bad request<br>- status 401: Unauthorize<br>- status 404: ID not valid<br>- status 404: Answer not found<br>- status 500: Internal Server Error | Flag the answer with given <br>Answer ID if `flag` in body<br>is true, otherwise unflag it | 
   | /answers<br>/:question_id<br>/:answer_id | PATCH | Question ID,<br>Answer ID | { content } | - redirect to `/answer`<br>- status 400: Bad request<br>- status 401: Unauthorize<br>- status 403: No permission to edit<br>- status 404: Invalid ID<br>- status 404: Question not found<br>- status 404: Answer not found<br>- status 500: Internal Server Error | Edit the content of the answer <br>with given Answer ID that could <br>be found in the question with<br>given Question ID | 
   | /answers<br>/admin<br>/:question_id<br>/:answer_id | * PATCH | Question ID,<br>Answer ID | { body,<br>isBest,<br>isFlagged } | - (json) Question<br>- status 400: Bad request<br>- status 401: Unauthorize<br>- status 404: Invalid ID<br>- status 404: Question not found<br>- status 404: Answer not found<br>- status 500: Internal Server Error | Edit the information of the <br>answer with given Answer ID <br>that could be found in the <br>question with given Question ID,<br>by an admin user. | 
   | /answers<br>/best<br>/:question_id<br>/:answer_id | POST | Question ID,<br>Answer ID |  | - status 200: Selected as best answer<br>- status 400: Bad request<br>- status 401: Unauthorize<br>- status 403: No permission to edit<br>- status 404: Invalid ID<br>- status 404: Question not found<br>- status 404: Answer not found<br>- status 500: Internal Server Error | Edit the answer with given Answer <br>ID to be the best answer in the<br>question with given Question ID, <br>will check to avoid unrelated user <br>to edit this question |
  | /answers<br>/:id | POST | Question ID | { content } | - (json) Answer<br>- status 400: Bad request<br>- status 401: Unauthorize<br>- status 404: question not valid<br>- status 404: question not found<br>- status 500: Internal Server Error | Create a new Answer to be <br>stored in the array of answers<br>in the question with given <br>Question ID|
 
 
### Report (`reports.js`)
#### Report Schema Explanation
* `type`: String belongs to \[`u`,`q`,`a`\] representing User, Question and Answer
* `targetId` is ObjectId, could be ID of User, Questions, or Answer
* `reason`: String
* `user` is User ID of user submitting report
* `reviewer` is User ID of admin reviewing report
* `time` is Date object with default being Date.now at initialization
* `lastUpdated` is Date objects that is Date.now for each report update
 
#### Routes handling Report related requests
   | Path | Method | Parameters | Body | Respond | Explanations|
   | ---- | ------ | ---------- | ---- | ------- | --------- |
   | /reports | POST | | {type,<br>targetId,<br>reason,<br>user} | - (json)Report<br>- status 400: Bad Request <br>- status 401: Unauthorized <br> - status 500: Internal Server Error | Creating a new report |
   | /reports| * GET | | | - (json)array of Report<br> - status 401: Unauthorized <br> -status 500: Internal Server Error |Getting all existing reports |
   | /reports<br>/type/user | * GET | | | - (json)array of Report<br> - status 401: Unauthorized <br> - status 404: Reported user not found<br> - status 500: Internal Server Error | Get all reports with the type of 'u'. |
   | /reports<br>/type/question | * GET | | | - (json)array of Report<br> - status 401: Unauthorized <br> - status 404: Reported user not found<br> - status 500: Internal Server Error | Get all reports with type 'q'. |
   | /reports<br>/type/answer | * GET | | | - (json)array of Report<br> - status 401: Unauthorized <br> - status 404: Reported user not found<br> - status 500: Internal Server Error | Get all reports with type 'a'. |
   | /reports/:id | * GET | Report ID| | - (json)Report<br> - status 401: Unauthorized <br> - status 404: Invalid Report ID<br> - status 404: Report not found<br> - status 500: Internal Server Error | Get report by given report id.|
   | /reports/:id | * PATCH | Report ID |{reviewer,<br>isReviewed}| - (json) updated Report <br>- status 400: Bed Request<br>  - status 401: Unauthorized <br>  - status 404: Invalid Report ID<br> - status 404: Report not found<br> - status 500: Internal Server Error | Edit state of report with given report id. |
 
### Notice (`notice.js`)
#### Notice Schema Explanation
Notice Schema includes attributes:
* `title` and `content` are Strings requiring minimum length of 1
* `time` is Date object of posted time
* `user` is User ID of user who posted this notice
* `isShowing` is a Boolean states whether to show notice or not
 
#### Routes handling Notice related requests
   | Path | Method | Parameters | Body| Respond |Explanations|
   | ---- | ------ | ---------- | ---- | ------- | --------- |
   | /notice | * POST | | {title,<br>content,<br>user} | 	- (json)Notice<br> - status 400: Bad Request <br>  - status 401: Unauthorized <br> - status 500: Internal Server Error | Creating a notice |
   | /notice<br>/current | GET | || 	- (json)Notice<br> - status 401: Unauthorized <br> - status 404: Bad Request <br>- status 500: Internal Server Error | Get an notice with isShowing set to true |
   | /notice | * GET | || 	- (json)array of Notice<br> - status 401: Unauthorized <br> - status 500: Internal Server Error | Get all notice|
   | /notice/:id | * GET | Notice ID || 	- (json)Notice<br> - status 401: Unauthorized <br> - status 404: Invalid Notice ID <br>- status 404: Notice not found <br>- status 500: Internal Server Error | Get the notice by given notice id|
   | /notice/:id | * PATCH | Notice ID | {title,<br>content,<br>isShowing(opt)}| 	- (json)updated Notice<br> - status 400: Bad request. <br> - status 401: Unauthorized <br> - status 404: Invalid Notice ID <br>- status 404: Notice not found <br>- status 500: Internal Server Error | Manually edit notice from admin dashboard|
 
 
# Development Log
Throughout the development of Phase 1, we used the following Google sheet to keep track of our progress and tasks and would like to keep it here for reference:  
https://docs.google.com/spreadsheets/d/1eXUJ3reDqHHjKZr3RrSvqVHPCbOBuvz-uzYq6QhfW8U/edit?usp=sharing


