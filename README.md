# Instagram Clone Front-end
This is a simple UI built with React.js, for the "main" project, that is the 
[instagram_clone backend server](https://github.com/ttamalito/Instagram_Clone)
I built this just to have some visual and using the backend server

The backend server, has a lot of functionalities, that together with this UI,
they can be used and observed

## Features
In summary this project has a lot of features, almost every single one
of the main features that can be found in the real instagram
* Live In-App notifications using Server-Sent-Events
* Live chatting functionality with WebSockets
* Account creation and session storage in order to stay logged in
* Posting a picture or video (just like instagram)
* Liking and disliking a post, and the user receiving the like receives a notification
* Comment a post, the user receiving the comment gets a notification instantly
* Posting a Story for 24 hours, (after 24 hours the story will be deleted automatically)
* Follow/Unfollow users
* Being able to only chat with users the the client is following
* In terms of security all posts containing a form need a CSRF token, that is validated by the server
* Functionality to reject the follow request of a user
* Functionality to delete the notifications

## Run locally
In order to run locally you will need to clone the repository, as well as the 
[backend repository](https://github.com/ttamalito/Instagram_Clone) (follow the instructions to get the backend running in that repository)
Install all the dependencies using npm install, in your terminal
After that execute npm start go to http://localhost:8080 in the browser of your choice to star using the project
Make sure that the backend server is running, otherwise this will not work.

There are more things to come, I have worked for months in this project and I have learned a lot.

Thank you for reading!