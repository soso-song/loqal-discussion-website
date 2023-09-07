![Logo](./pub/images/logo.png)
 
# Team 11 Project: LOQAL - A Localized Q&A Web Application
We receive a vast amount of information about the COVID-19 daily. This information overload makes it difficult to find reliable and relevant information, especially for seniors and other vulnerable groups in our community who are not well versed with querying the search engine and fact checking. The goal of this project is to create a question and answer web application for reliable dissemination of information and knowledge [related to the pandemic] among members of the community. 
 
## Team Members
 
| Name | GitHub Username |
| ------------- | ------------- |
| Behrad Ghadiri Bashardoost  | burtonrider  |
| Tongzhou Li  | greysky10  |
| Zhifei Song  | soso-song  |
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
 
### Welcome Page (`/`)
This page serves as a welcome page. To get started, scroll down to the bottom of the page and click on the **Get Started** button.
 
### Register or Login (`/login`)
* Register by entering all required fields in the left side bar and press the "Register" button to create a new account.
* Validation is performed to check if the input information are valid
* Furthermore, backend validation is performed to make sure username and email are unique
* If successfully registered, it will lead you to a page showing some popular tags that you can subscribe to.
* Alternatively, use one of the login credentials provided below to log in.
 
    | Email | Password | Type of Account |
    | ------------- | ------------- | ------------- |
    | user@user.com  | user  | Regular User  |
    | user2@user2.com  | user2  | Regular User  |
    | admin@admin.com  | admin  | Admin User  |
* By logging in, you will be lead to your user dashboard

:star2: **New features:**
* Backend validation for verifying unique username and email 
* Password is encrypted using bcrypt for security reasons
 
### Subscribe to Tags (`/subscribe`)
* Subscribing to a tag will allow questions related to this tag to be shown on your webpage.
* Most popular tags and the tags you are currently following are shown
    * Most popular tags are the tags most followed by other users or most mentioned in questions (:star2: **New Feature**)
* Follow/unfollow a tag by clicking on them
* Type in any tag name to subscribe, a non-existing tag name will be created as a new tag.

     :star2: **New Feature:** Validation is performed to avoid following/unfollowing the same tag more than once
* All tags are stored in lowercase, and spaces in any tag will be replaced by dashes(-).
* Clicking on the "Continue" button will lead you to your user dashboard. If you are editing your tags from profile edit, you will be redirected back to that page.
 
### User Dashboard (`/dashboard`)
* Users user will be able to see the newest questions, under the three tabs (:star2: **New Feature**):
   1. Everyone: newest question from everyone
      * :star2: **New Feature**: Pagination: the number of questions displayed per page is currently set to 5 for demonstration purposes
   2. Tags: newest questions with the tags you are following
      * :star2: **New Feature**: Based on Phase 1 feedback, you can now filter the questions by selecting or deselecting tags
      * Click on "Edit your tags" button to redirect to Subscribe page to modify tags you are following
   3. Following: newest questions posted by people you are following.
   
* Sidebar displays your username and has some nice greetings.
* Users will be able to see the latest notice posted by the admins.
* Bottom of the sidebar contains buttons which allow users to ask a new question, or go to their profile page.
* The horizontal navigation bar allows searching for questions by keyword, go to user dashboard, ask a question, go to profile page, or logout of their account

:star: **Improvements:** 
   * Based on Phase 1 feedback: Removed the questions and answers posted by the current user from User Dashboard as User Profile already contains that information
 
### User Profile (`/profile`)
* Sidebar shows user's display name, username, profile picture, and tags this user subscribes to.
* If you are visiting your own profile page, you will see the "Edit Profile" button which leads you to the edit page for your basic account information.
* If you are visiting someone else's profile page, you will be able to follow or unfollow other users by clicking on the "Follow" or "Unfollow" button.
   * Notice how the follower list and its count is dynamically updated upon following a user
* Click on the "Report This User" button to report any suspicious activity of this user account.
* Under "Activity", the questions and answers posted by this user account are listed.
* The list of followers and followings of this profile are listed under "Followers" and "Following".
 
### Edit Profile (`/edit/profile`)
* Users can edit their username, display name and email
* Users can upload or replace their current profile picture by selecting an image and clicking Upload
   * The old profile picture will be deleted on the server
* Clicking on "Edit Your Tags" will redirect you to a page where you can follow some popular tags, unfollow current tags, or add a custom tag.
* Clicking on "Change Password" will redirect you to a page (`edit/password`) where you can change your password by entering the new password twice to confirm.
   * Passwords will be encrypted.
* Users can see their status (normal or flagged) and account type (admin or regular user), but they cannot edit it.
* Validation check is performed to check if information inputted is valid and no duplicating username and email.
 
### Ask/Edit a Question (`/ask`, `/edit/question`)
* Post a new question by clicking on the "Ask a New Question" button on the user dashboard or "Ask" on the main navigation bar.
* Provide a title, description and at least one related tag and preview your question before posting.
   * Separate tags with commas.
* Submitting a question will redirect the user to the newly created question page which will show this new posted question and all its corresponding answers. 
   * There will be a "Edit Question" button on this redirected page which clicking on it will lead to an edit page for this question.
   * Edit page for the question is very similar to the question posting page.
 
### Question and Answers (`/answer`, `/edit/answer`)
* Contains a single question, showing the title and content of the question, the tags this question is related to, the user who posted this question, and the time this question is posted.
* The user posting this question can edit this question's title, content, and related tags.
* Right upper corner of the question information block shows if this question is resolved. Only the user posting this question can see a "Mark Solved" button to mark the question as resolved.
* Any user can post a reply to questions, and most recent posted answers will be added to the top of the stack of answers, with each answer block showing the content of the answer, the user account posting this answer, and the time this answer was posted.
* Users can edit their answers' content by clicking on the "Edit Answer" button.
* The user posting this question can select the best answer by clicking on the "Pick as Best Answer" button. A best answer will be shown in green and only one best answer is allowed.
* Clicking on the display name or username shown on the question block or any answer block will redirect to that user's profile page.
* Users can report a question or answer.
 
### Search (`/search`)
* Submit a query from any page in the search field provided in the navigation bar.
* Questions and Answers related to this keyword will be displayed on this page in the following three categories:
   * Question Results: questions with keyword included in the title or content, click on the search result to jump to corresponding question page
   * Answer Results: answers with keyword included in the content
      * :star2: **New Feature:** Clicking on the answer result will redirect to the corresponding question page and jump to the answer location.
   * Tag Results: questions with a tag which keyword is the exact name of the tag, click on the search result to jump to corresponding question page

:star2: **New Feature:** Clicking on a Tag from anywhere (such as the question page) would redirect to the search results page with that tag name as search keyword.
 
### Report (`/report`)
* Buttons for reporting questions or answers are provided in the individual question page.
* Buttons for reporting a user are provided in the user's profile page.
* Clicking on the report button will direct to a page for giving a reason of reporting this user, question, or answer.
* Will be redirected back to previous page after submitting the report.
 
## Admin Users
In addition to functionalities above, admin users have access to a variety of other features listed below through Admin Dashboard.
* A user can only become an admin user by changing the admin status by another admin user.
* A regular user attempting to visit an admin webpage will be alerted and redirected back to his/her regular dashboard.
* An admin user also have access to all the features a regular user has.
* An admin user can visit the admin dashboard by clicking on the "Admin Dashboard" button, showed only for admin users, in the sidebar of their regular dashboard.
 
### Admin Dashboard (`/admin/dashboard`)
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
  * Options for jumping to bookmarks on admin's dashboard to the list of reported users, reported questions or reported answers.
  * Options to redirect to a page for posting new notices, to view past reports, or to look at all existing users, questions, answers or tags.
 
### Post Notice (`/admin/notice`)
* An admin user could post important notices that are to be pinned on the sidebar of a regular user dashboard.
* A notice contains a title and its content.
* All notices will be shown at the bottom of this page.
* Admin can edit any notice's title, description, and active status.

:star2: **New Feature:** Only a notice with an active status will be shown on the regular user dashboard. A newly created notice will set the active status of previous notices to false and will be the only active notice
 
### Past Reports (`/admin/pastreport`)
:star2: **New Feature**:
* Any reviewed reports, which can be both accepted or rejected reports, will be listed in this page.
* An admin user can delete a report by clicking the "Remove Report" button
 
### All Users (`/admin/edituser`)
* An admin could see a list of all registered users.
* Search a user by his/her exact username or email to see his/her complete account information.
  * Searching a non-existing user will show "No user found".
  * Searching with no keyword input will show all users.
* An admin user could edit any account's information except for the password and profile photo.
* An admin user could mark a user as flagged or unflagged, and make the user to become an admin or regular user.
* The "See Profile" button will lead to this user's profile page.
* Clicking on the "save" button for editing the user profile will check validation of information inputs and check for duplicate username and email.
 
### All Questions (`/admin/editquestion`)
* Admin could see a list of existing questions in a table showing the title, content, posting user, tags, and the time the question is posted, also the admin could see if the question is flagged and if the question is resolved.
* Admin could edit any question's title, content, and tags, and also could mark questions as flagged or unflagged, resolved or not resolved.
* Editing a question with an empty title, an empty content, or no tag is invalid. 
 
### All Answers (`/admin/editanswer`)
* Admin could see a list of all answers in a table showing the which question it is answering to, the user posting the answer, content of the answer, whether it is the best answer, whether it is flagged, and the time posted.
* Admin could edit any answer's content, whether it is the best answer, and whether it is flagged.
* Editing an answer's content to be empty is invalid.
 
### All Tags (`/admin/edittag`)
* Admin could see a list of all existing tags in a table showing the name of the tags and the number of usage of the tags..
* Admin could edit the name of any tag.
* Editing a tag with an empty name is invalid.
 
 
# Overview of Routes
This application uses Express server to handle requests, and Mongoose to model application data with schema-based objects. 
 
We have a server.js file where the main express app is implemented. Routes are separated into smaller files under `/routes` for a modular implementation of routes. Each of these files, which we refer to as mini-apps, creates an express Router instance as a module to be required in the main app. Each mini-app handles queries on a specific data type while the main app contains methods to serve HTML pages. Below you can see an overview of our main and mini-apps routes:
 
## Main app (`server.js`)
Routes in `server.js` serve HTML pages to the client.
   * sessionCheck - checks for existence of an active user on the session, and redirects to user dashboard if it exists.
   * authenticate - checks for logged in user, will redirect to register/login page otherwise.
   * adminAuthenticate - checks if logged in user is an admin user, will redirect to regular user dashboard otherwise.
   
   | Path | Middleware | Redirects to | Required Parameter(s) |
   | ---- | ---------- | ----------- | --------------------- |
   | /    | sessionChecker  | [Landing page](#user-content-welcome-page-)  |  |
   | /login | sessionChecker  | [Register/Login page](#user-content-register-or-login-login) |  |
   | /dashboard  |   | [User dashboard](#user-content-user-dashboard-dashboard) if a user is logged in, otherwise redirects to [register/login page](#user-content-register-or-login-login)  |  |
   | /profile   | authenticate  | [Current user profile page](#user-content-user-profile-profile) if no parameter given; redirects to other user profile page if given parameter `user_id`.  <br>- Redirects to `/404` page if can't find the user with given ID.| `user_id` |
   | /edit/profile | authenticate | [Page for editing current user’s profile](#user-content-edit-profile-editprofile)  |
   | /answer | authenticate | [Single question page](#user-content-question-and-answers-answer-editanswer)<br>- Redirects to `/404` page if can't find the question with given ID.| `question_id` |
   | /edit/answer | authenticate | [Editing answer page](#user-content-question-and-answers-answer-editanswer)<br>- Redirects to `/404` page if can't find the answer with given ID. | `question_id` and `answer_id` |
   | /ask | authenticate | [Asking a new question page](#user-content-askedit-a-question-ask-editquestion)  |
   | /edit/question | authenticate | [Editing question page](#user-content-askedit-a-question-ask-editquestion)<br>- Redirects to `/404` page if can't find the question<br>- Redirects to `/403` if user attempt to edit someone else's question. | `question_id` |
   | /subscribe | authenticate | [Subscribe page](#user-content-subscribe-to-tags-subscribe) |
   | /report | authenticate | [Report page](#user-content-report-report)<br>- Redirects to `/404` page if one of the parameters is missing. | `type`(=either 'u'(user),'q'(question), or 'a'(answer)), `taget_id`, `user_id`, `back_url` |
   | /search | authenticate | [Search page](#user-content-search-search) | `search_key` |
   | /admin/dashboard | adminAuthenticate | [Admin’s dashboard](#user-content-admin-dashboard-admindashboard) |  |
   | /admin/editquestion | adminAuthenticate | [Admin's edit question page](#user-content-all-questions-admineditquestion) |  |
   | /admin/editanswer | adminAuthenticate | [Admin's edit answer page](#user-content-all-answers-admineditanswer) |  |
   | /admin/edituser | adminAuthenticate | [Admin's edit user page](#user-content-all-users-adminedituser) |  |
   | /admin/edittag | adminAuthenticate | [Admin's edit tag page](#user-content-all-tags-adminedittag) |  |
   | /admin/notice | adminAuthenticate | [Admin's post important notices page](#user-content-post-notice-adminnotice) |  |
   | /admin/editnotice | adminAuthenticate | [Admin's edit notice page](#user-content-post-notice-adminnotice)  | `notice_id` |
   | /admin/pastreport | adminAuthenticate | [Admin's listing past reports page](#user-content-past-reports-adminpastreport)  |  |
   | /404 | authenticate | 404 error page | |
   | /403 | authenticate | 403 error page | |
   | /500 | authenticate | 500 error page | |

 
## Mini-apps
Middleware checkers used in mini-apps:
   * mongoChecker - checks for mongo connection errors, this is implemented in basically every route therefore will not be listed in the table below 
   * authenticateAPI - checks for logged in users, will send an error with status code 401 "Unauthorized" otherwise. This will be indicated as "authAPI" in the method tables below.
   * adminAuthenticateAPI - checks if a logged in user is an admin user, will send an error with status code 401 "Unauthorized" otherwise. This will be indicated as "adminAPI" in the method tables below.
 
### User (`users.js`)
#### User Schema Explanation
User Scheme contains user information including 
* `displayname`, `username`, and `email` are Strings and requires the minimum length of 1
* `password` requires the minimum length of 3 and are stores as encrypted Strings
* `isFlagged`, `isAdmin` are Booleans
* `following`, `followers` are list of User IDs
* `tags` are list of Tag IDs
* `image_id`, `image_url` are Strings, default being empty Strings
 
#### Routes handling User related requests
   | Path | Method<br>\[middleware\] | Parameters | Body | Respond | Explanations|
   | ---- | ------ | ---------- | ---- | ------- | --------- |
   | /users | POST |  | { email, <br> password, <br> username, <br> displayname } | - redirect to `/subscribe` <br>- status 400: Bad request <br> - status 500: Internal server error |  Add a new User to  <br>the User collection. |
   | /users/login | POST |  | { email, <br> password } | - redirect to `/dashboard`<br> - status 400: Bad request <br>- status 404: Resource not found <br> - status 500: Internal server error | Login user by adding  <br>info to session. |
   | /users/logout | GET |  | | - redirection to `/` <br> - status 500: Internal server error | Log users out by removing <br>the session. |
   | /users<br>/current | GET<br>\[authAPI\] | | | - (json) User<br> - status 401: Unauthorized | Get User object re- <br>presenting current  <br>logged in user |
   | /users/:id | GET<br>\[authAPI\] | User ID | | - (json) User<br> - status 401: Unauthorized<br> - status 404: Resource not found<br> - status 500: Internal server error | Get the User object <br>with the given User  <br>ID. |
   | /users | GET<br>\[adminAPI\] | | | - (json) array of Users <br> - status 401: Unauthorized <br> - status 500: Internal server error | Get a list of all <br>existing User from <br>User collection. |
   | /users<br>/mapping | POST<br>\[authAPI\] | | {`ids`:<br> \<ID array\>} | - (json) object mapping ids to Users <br> - status 404: Can't find Users <br> - status 500: Internal server error |Given a list of User  <br>IDs, return an object <br>that maps User IDs <br>to Users Objects. |
   | /users | PATCH<br>\[authAPI\] | | { displayname, <br>username, <br>email } | - redirect to `/profile`<br> - status 400: Bad Request<br> - status 401: Unauthorized<br> - status 404: User not found<br> - status 500: Internal server error | Modify current user's <br>displayname, username, <br>and email; will check  <br>to avoid user changing <br>other's profiles. |
   | /users/:id |PATCH<br>\[adminAPI\]| User ID | { displayname, <br>username, <br>email, <br>tags, <br>isFlagged, <br>isAdmin } | - redirect to `/profile`<br>- status 400: Bad Request<br> - status 401: Unauthorized<br> - status 404: ID not valid<br> - status 404: User not found<br> - status 500: Internal server error |Edit profile of user <br>(with given UserID) <br>by admin user. |
   | /users<br>/password | PATCH<br>\[authAPI\] | | { password } | - redirect to `/profile`<br> - status 400: Bad Request<br> - status 401: Unauthorized<br> - status 404: User not found<br> - status 500: Internal server error |Modify current user's <br>password. |
   | /users<br>/flag/:id | PATCH <br>\[adminAPI\]| User ID | { `flag`: <br>Boolean } | - (json) flagged User<br> - status 400: Bad Request<br> - status 401: Unauthorized<br> - status 404: ID not valid<br> -status 404: User not found<br> - status 500: Internal server error |Flag user with given <br>User ID if `flag` is <br>true, otherwise  <br>unflag user. |
   | /users/picture | POST<br>\[authAPI\]<br>\[multipart * \] |  |  | - (json) current User<br>- status 400: Bad Request<br>  - status 401: Unauthorized<br> -status 404: User not found<br> - status 500: Internal server error |Upload a new profile <br>photo. |
   | /users<br>/follow/:id | POST<br>\[authAPI\] | User ID | | - (json) current User<br>-status 400: Already following<br> - status 400: Bad Request<br> - status 401: Unauthorized<br> - status 404: ID not valid<br> - status 404: User not found<br> - status 500: Internal server error |Add user ID to fol- <br>lowing list of current <br>user, will check to <br>avoid following twice. |
   | /users<br>/unfollow/:id | POST<br>\[authAPI\] | User ID | | - (json) current User<br>-status 400: Already not following<br> - status 400: Bad Request<br> - status 401: Unauthorized<br> - status 404: ID not valid<br> - status 404: User not found<br> - status 500: Internal server error | Remove the User ID from<br>the following list of <br>current user, will <br>check to avoid un- <br>following twice. |

 \* multipart meaning the multipart middleware that allows you to access uploaded file from req.file
   
#### Example for testing a User route in postman:
 Ex. Testing a `post /user` route:
 
   * Set method as POST
   * Type in `http://localhost:5000/users` for request URL
   * In Body text area, choose JSON and input some data. By looking at the table above, we can see that a POST '/users' route requires a body object providing variables `email`, `password`, `username`, and `displayname`. By looking at the [User Schema Explanation](#user-content-user-usersjs), we know that these four variables are all Strings:
   
    {
        "email": "someuser@someuser.com",
        "password": "someuser",
        "username": "someuser",
        "displayname": "displaydisplay"
    }
   * After sending the request, subscribe.html should be returned
 
### Tag (`tag.js`)
#### Tag Schema Explanation
Tag Schema contains two attributes:
* `name` which is name of the tag, with minimum length of 1
* `count` with default number 0, this is an indicator of how popular the tag is
 
#### Routes handling Tags related requests
   | Path | Method<br>\[middleware\] | Parameters | Body | Respond | Explanations|
   | ---- | ------ | ---------- | ---- | ------- | --------- |
   | /tag | GET<br>\[authAPI\] | | | - (json) array of Tags<br> - status 401: Unauthorized <br>- status 500: Internal Server Error | Get all existing Tags. |
   | /tag<br>/popular | GET<br>\[authAPI\]| | | - (json) array of Tags<br> - status 401: Unauthorized <br>- status 500: Internal Server Error | Get all existing Tags<br> sorted by number of usage. |
   | /tag/names | POST<br>\[authAPI\] | | { ids: <br>\<ID array\> } | - (json) array of Strings<br> - status 401: Unauthorized <br> - status 404: Can't find all tags<br> - status 500: Internal Server Error | Input an array of Tag IDs,<br> return the corresponding <br>array of tag names. |
   | /tag/info | POST<br>\[authAPI\] | | { ids: <br>\<ID array\> } | - (json) array of Tags<br> - status 401: Unauthorized<br> - status 404: Can't find all tags<br> - status 500: Internal Server Error | Input an array of Tag <br> IDs, return the corresponding <br>array of Tags. |
   | /tag | POST<br>\[authAPI\] | | { name } | - (json) new created Tag <br> - status 400: Bad Request<br> - status 401: Unauthorized<br> - status 500: Internal Server Error | Adding a new Tag to<br>collection, will check to <br>avoid duplicate tag names. |
   | /tag/:id | PATCH<br>\[adminAPI\]| Tag ID | { name } | - (json) updated Tag <br> - status 400: Bad Request<br> - status 401: Unauthorized<br> - status 404: Resource not found<br> - status 404: Tag not found <br> - status 500: Internal Server Error | Edit name of tag with given<br> id, will check to avoid<br> duplicate tag names. |
   | /tag | DELETE<br>\[adminAPI\]| Tag ID | | - (json) deleted Tag<br> - status 401: Unauthorized <br> - status 404: Resource not found <br> - status 404: Tag not found<br> - status 500: Internal Server Error | Delete Tag with given ID<br> from collection. |
   | /tag<br>/follow<br>/:id | PATCH<br>\[authAPI\] | Tag ID | | - (json) followed Tag <br> - status 400: Bad Request<br> - status 401: Unauthorized<br> - status 404: Invalid Tag ID<br> - status 404: Tag not found<br> - status 409: Already following Tag<br> - status 500: Internal Server Error | Add Tag ID to current <br>user’s list of following <br>tags, will check to avoid <br>following twice. |
   | /tag<br>/unfollow<br>/:id | PATCH<br>\[authAPI\] | Tag ID | | - (json) unfollowed Tag <br> - status 400: Bad Request<br> - status 401: Unauthorized<br> - status 404: Invalid Tag ID<br> - status 404: Tag not found<br> - status 500: Internal Server Error | Remove Tag ID from current<br> user’s list of following <br>tags, will check to avoid <br>unfollowing twice. |
   | /tag<br>/increment<br>/:id | PATCH<br>\[authAPI\] | Tag ID | | - (json) updated Tag <br> - status 400: Bad Request<br> - status 401: Unauthorized<br> - status 404: Invalid Tag ID<br> - status 404: Tag not found<br> - status 500: Internal Server Error | Count one more the usage of<BR> Tag with given Tag ID. |
   | /tag/:id | GET<br>\[authAPI\]| Tag ID | | - (json) Tag <br> - status 400: Bad Request<br> - status 401: Unauthorized<br> - status 404: Invalid Tag ID<br> - status 404: Tag not found<br> - status 500: Internal Server Error | Get Tag with given Tag ID |

#### Example for testing a Tag route in postman:
 Ex. Testing a `get /tag` route:
 
   * By looking at the Method\[middleware\] column, we can see that all routes are running with either authenticateAPI or adminAuthenticateAPI middleware, so we need to log in before testing, or else you will receive status 401 Unauthorized error.
   * If you are not logged in, you can login using Postman by setting method to POST, with request URL: `http://localhost:5000/users/login`, with the account we just created in previous example in body and send request.
   
    {
        "email": "someuser@someuser.com",
        "password": "someuser"
    }
 
   * This will return `user_dashboard.html` to indicate you are logged in.
   * To test a get `/tag` routes, set method to GET, enter `http://localhost:5000/tag`, since we can see from the table above that we don't need any other inputs, simply send request.
   * A list of Tag Objects should be returned.

### Question (`questions.js`)
#### Question Schema Explanation
Question Schema includes:
* `title`, `content` are Strings requiring minimum length of 1
* `user` is the User ID of user who posted this question
* `tags` is a list of Tag IDs
* `answers` is a list of subdocument AnswerSchema
* `isResolved`, `is Flagged` are Booleans
* `time` is Date object with default being Date.now at initialization
* `lastUpdated` is Date objects that is Date.now for each question update
 
#### Routes handling Question related requests
   | Path | Method<br>\[middleware\] | Parameters | Body | Respond | Explanations|
   | ---- | ------ | ---------- | ---- | ------- | ---------|
   |/questions|POST<br>\[authAPI\]| |{ title,<br>content,<br>tags }|- redirects to `/answer`<br>-status 400 : Bad Request <br> - status 401: Unauthorized<br>-status 500: Internal server error| Add a new Question <br>to the collection.
   |/questions|GET<br>\[authAPI\]| | |-(json) array of Questions<br>-status 500: Internal Server Error<br> - status 401: Unauthorized| Get all existing <br>questions from the <br>Question collection|
   |/questions<br>/users/:user|GET<br>\[authAPI\]|User ID| |-(json) array of Questions<br> - status 401: Unauthorized<br>-status 500: Internal Server Error| Get all Questions <br>posted by user with<br>given User ID|
   |/questions<br>/following|GET<br>\[authAPI\]| | |-(json) array of Questions<br> - status 401: Unauthorized<br>-status 500: Internal Server Error| Get all Questions<br>posted by users which<br>the current user is<br>following.|
   |/questions/tags|POST<br>\[authAPI\]| |{ tag_ids: <br>\<ID array\> }|-(json) array of Questions<br> - status 401: Unauthorized<br>-status 500: Internal Server Error| Given an array of Tag <br>IDs, get all the <br>questions that each<br>contain at least one<br>tag from the Tag ID<br>array.|
   |questions<br>/tags/:tagname|GET<br>\[authAPI\]|tagname| |-(json) array of Questions<br> - status 401: Unauthorized<br>-status 404: Tag name not found<br>-status 500: Internal Server Error<br>| Get all questions<br>containing a tag with<br>given tag name.|
   |/question<br>/search/:keyword|GET<br>\[authAPI\]|keyword||-(json)array of Question<br> - status 401: Unauthorized<br>-status 500: Internal Server Error|  Get all questions con-<br>taining the given<br>keyword in either the<br>`title` or the `content`|
   |/questions/:id|GET<br>\[authAPI\]|Question ID||-(json) Question<br> - status 401: Unauthorized<br>-status 404: Question not found<br>-status 500: Internal Server Error| Get the question with<br>given ID|
   |/questions<br>/flag/:id| PATCH<br>\[adminAPI\]|Question ID| { `flag`: <br>Boolean } |-(json) Question<br>-status 400: Bad request<br>-status 404: ID not valid<br>-status 404: Question not found<br>-status 500: Internal Server Error| Flag the Question with<br>given Question ID if <br>`flag` is true, <br>otherwise unflag it.|
   |/questions/:id|PATCH<br>\[authAPI\]|Question ID|{ title, <br>content, <br>tags, <br>isResolved }|- redirect to  `/answer`<br>-status 400: Bad request<br> - status 401: Unauthorized<br>-status 403: No permission to edit question<br>-404: Question not found<br>-status 500: Internal Server Error| Update information of<br>the question with <br>given Question ID, <br>will check to avoid <br>user with no per-<br>mission to edit <br>question.|
   |/questions<br>/admin/:id|PATCH<br>\[adminAPI\]|Question ID|{ title, <br>content, <br>tags, <br>isResolved, <br>isFlagged }|-(json) updated Question<br>-status 400: Bad request<br> - status 401: Unauthorized<br>-status 404: Question not found<br>-status 404: Invalid question ID<br>-status 500: INternal Server Error| Edit a question with<br>given Question ID by<br>an admin user. |

#### Example for testing a Question route in Postman:
 Ex. Testing a `POST /questions` route:
 
   * Same as all the Tag routes, calling a question route requires you to log in from Postman first. 
   * To test a `POST /question` route, according to the table above, we need a body with `title`, `content`, `tags`. By lookin gat the [Question Schema Explanation](#user-content-question-schema-explanation), we know that `title` and `content` are Strings, and `tags` is a list of Tag IDs.
      * You can get a Tag ID by using the `POST /tag` route to create a new Tag, and the Tag object will be returned so you can get the ID of this Tag under the `_id` field. Also, you can get a list of Tags by using the `GET /tag` route if you already have Tags in the database.
   * Set the method to `POST`, type in `http://localhost:5000/questions` for request URL, and enter in the body text area something such as:
   
    {
        "title": "Some title for this question",
        "content": "Some content for this question",
        "tags": ["<Tag ID>", "<Tag ID>", "<Tag ID>"]
    }
   * After sending the request, `answer.html` should be returned with paramater `question_id` being the ID of this new created question.
 
### Answer (`answer.js`)
#### Answer Schema Explanation
Answer Schema includes:
* `content` is a String requiring minimum length of 1
* `user` is a User ID
* `isFlagged`, `isBest` are Booleans
* `time` is Date object with default being Date.now at initialization
* `lastUpdated` is Date objects that is Date.now for each answer update
 
#### Routes handling Answer related requests
   | Path | Method<br>\[middleware\] | Parameters | Body | Respond | Explanations|
   | ---- | ------ | ---------- | ---- | ------- | --------- |
   | /answers<br>/users<br>/:users | GET<br>\[authAPI\] | User ID | | - (json) array of Questions<br>- status 401: Unauthorize<br>- status 500: Internal Server Error | Get a list of Questions containing <br>Answer(s) posted by user with given <br>User ID | 
   | /answers<br>/search<br>/:keyword | GET<br>\[authAPI\] | String | | - (json) array of Questions<br>- status 401: Unauthorize<br>- status 500: Internal Server Error | Get a list of Questions containing <br>Answer(s) containing the given <br>keyword | 
   | /answers<br>/:question_id<br>/:answer_id | GET<br>\[authAPI\] | Question ID,<br>Answer ID | | - (json) Answer<br>- status 401: Unauthorize<br>- status 404: Invalid ID<br>- status 404: Question not found<br>- status 500: Internal Server Error | Get the answer with given <br>Answer ID that could be found<br>in the question with given <br>Question ID | 
   | /answers<br>/:answer_id | GET<br>\[authAPI\] | Answer ID | | - (json) Question, Answer<br>- status 401: Unauthorize<br>- status 404: Invalid ID<br>- status 404: Question not found<br>- status 404: Answer not found<br>- status 500: Internal Server Error | Find answer using given Answer ID<br> only. This is different from<br> previous route because this needs<br> more steps to search into all questions<br> since Answer is subdocument of Question | 
   | /answers<br>/flag/:id | PATCH<br>\[adminAPI\]| Answer ID | { `flag`: <br>Boolean } | - (json) Question<br>- status 400: Bad request<br>- status 401: Unauthorize<br>- status 404: ID not valid<br>- status 404: Answer not found<br>- status 500: Internal Server Error | Flag the answer with given <br>Answer ID if `flag` in body<br>is true, otherwise unflag it | 
   | /answers<br>/:question_id<br>/:answer_id | PATCH<br>\[authAPI\] | Question ID,<br>Answer ID | { content } | - redirect to `/answer`<br>- status 400: Bad request<br>- status 401: Unauthorize<br>- status 403: No permission to edit<br>- status 404: Invalid ID<br>- status 404: Question not found<br>- status 404: Answer not found<br>- status 500: Internal Server Error | Edit the content of the answer <br>with given Answer ID that could <br>be found in the question with<br>given Question ID | 
   | /answers<br>/admin<br>/:question_id<br>/:answer_id | PATCH<br>\[adminAPI\]| Question ID,<br>Answer ID | { content,<br>isBest,<br>isFlagged } | - (json) Question<br>- status 400: Bad request<br>- status 401: Unauthorize<br>- status 404: Invalid ID<br>- status 404: Question not found<br>- status 404: Answer not found<br>- status 500: Internal Server Error | Edit the information of the <br>answer with given Answer ID <br>that could be found in the <br>question with given Question ID,<br>by an admin user. | 
   | /answers<br>/best<br>/:question_id<br>/:answer_id | POST<br>\[authAPI\] | Question ID,<br>Answer ID |  | - status 200: Selected as best answer<br>- status 400: Bad request<br>- status 401: Unauthorize<br>- status 403: No permission to edit<br>- status 404: Invalid ID<br>- status 404: Question not found<br>- status 404: Answer not found<br>- status 500: Internal Server Error | Edit the answer with given Answer <br>ID to be the best answer in the<br>question with given Question ID, <br>will check to avoid unrelated user <br>to edit this question |
  | /answers<br>/:id | POST<br>\[authAPI\] | Question ID | { content } | - (json) Answer<br>- status 400: Bad request<br>- status 401: Unauthorize<br>- status 404: question not valid<br>- status 404: question not found<br>- status 500: Internal Server Error | Create a new Answer to be <br>stored in the array of answers<br>in the question with given <br>Question ID|

#### Example for testing an Answers route in Postman:
 Ex. Testing a `POST /answers` route:
 
   * We can see from the table above that calling an answers route requires you to log in from Postman first. 
   * To test a `POST /answers` route, according to the table above, we need a body with a `content` field, and we need a Question ID as parameter. By lookin gat the [Answer Schema Explanation](#user-content-answer-schema-explanation), we know that `content` is a Strings.
      * You can get Question IDs by querying as list of questions by using the `GET /questions` route if you already have Questions in the database and look at the `_id` field.
   * Set the method to `POST`, type in `http://localhost:5000/answers/<Quesiton ID>` for request URL, and enter in the body text area something such as:
   
    {
        "content": "Some content of this answer"
    }
   * After sending the request, a new created Answer object with the given `content` will be returned to you.
 
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
   | Path | Method<br>\[middleware\] | Parameters | Body | Respond | Explanations|
   | ---- | ------ | ---------- | ---- | ------- | --------- |
   | /reports | POST<br>\[authAPI\] | | {type,<br>targetId,<br>reason,<br>user} | - (json)Report<br>- status 400: Bad Request <br>- status 401: Unauthorized <br> - status 500: Internal Server Error | Creating a new report |
   | /reports| GET<br>\[adminAPI\]| | | - (json)array of Report<br> - status 401: Unauthorized <br> -status 500: Internal Server Error |Getting all existing reports |
   | /reports<br>/type/user | GET<br>\[adminAPI\]| | | - (json)array of Report<br> - status 401: Unauthorized <br> - status 404: Reported user not found<br> - status 500: Internal Server Error | Get all reports with the type of 'u'. |
   | /reports<br>/type/question | GET<br>\[adminAPI\]| | | - (json)array of Report<br> - status 401: Unauthorized <br> - status 404: Reported user not found<br> - status 500: Internal Server Error | Get all reports with type 'q'. |
   | /reports<br>/type/answer | GET<br>\[adminAPI\]| | | - (json)array of Report<br> - status 401: Unauthorized <br> - status 404: Reported user not found<br> - status 500: Internal Server Error | Get all reports with type 'a'. |
   | /reports/:id | GET<br>\[adminAPI\]| Report ID| | - (json)Report<br> - status 401: Unauthorized <br> - status 404: Invalid Report ID<br> - status 404: Report not found<br> - status 500: Internal Server Error | Get report by given report id.|
   | /reports/:id | PATCH<br>\[adminAPI\]| Report ID |{reviewer,<br>isReviewed}| - (json) updated Report <br>- status 400: Bed Request<br>  - status 401: Unauthorized <br>  - status 404: Invalid Report ID<br> - status 404: Report not found<br> - status 500: Internal Server Error | Edit state of report with given report id. |
   
#### Example for testing a Report route in Postman:
 Ex. Testing a `get /reports` route:
 
   * By looking at the Method\[middleware\] column, we can see that most `/reports` routes runs with the adminAuthenticateAPI middleware, so we need to log in with an admin account before testing, or else you will receive status 401 Unauthorized error.
       * The very first admin user is setted by changing the `isAdmin` field of a User from the database.
   * To test a get `/reports` routes, set method to GET, enter `http://localhost:5000/reports`, since we can see from the table above that we don't need any other inputs, simply send request.
   * A list of Report Objects will be returned.
 
### Notice (`notice.js`)
#### Notice Schema Explanation
Notice Schema includes attributes:
* `title` and `content` are Strings requiring minimum length of 1
* `time` is Date object of posted time
* `user` is User ID of user who posted this notice
* `isShowing` is a Boolean states whether to show notice or not
 
#### Routes handling Notice related requests
   | Path | Method<br>\[middleware\] | Parameters | Body| Respond |Explanations|
   | ---- | ------ | ---------- | ---- | ------- | --------- |
   | /notice | POST<br>\[adminAPI\]| | {title,<br>content,<br>user} | 	- (json)Notice<br> - status 400: Bad Request <br>  - status 401: Unauthorized <br> - status 500: Internal Server Error | Creating a notice |
   | /notice<br>/current | GET<br>\[authAPI\] | || 	- (json)Notice<br> - status 401: Unauthorized <br> - status 404: Bad Request <br>- status 500: Internal Server Error | Get an notice with isShowing set to true |
   | /notice | GET<br>\[adminAPI\]| || 	- (json)array of Notice<br> - status 401: Unauthorized <br> - status 500: Internal Server Error | Get all notice|
   | /notice/:id | GET<br>\[adminAPI\]| Notice ID || 	- (json)Notice<br> - status 401: Unauthorized <br> - status 404: Invalid Notice ID <br>- status 404: Notice not found <br>- status 500: Internal Server Error | Get the notice by given notice id|
   | /notice/:id | PATCH<br>\[adminAPI\]| Notice ID | {title,<br>content,<br>isShowing(opt)}| 	- (json)updated Notice<br> - status 400: Bad request. <br> - status 401: Unauthorized <br> - status 404: Invalid Notice ID <br>- status 404: Notice not found <br>- status 500: Internal Server Error | Manually edit notice from admin dashboard|
 
\* An example of testing a `/notice` route would be similar to the previous examples.


