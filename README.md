# confcon

##Things you can do with the REST API

SIGN UP  
SIGN IN  

*The following endpoints require a valid token, provided with sign up or sign in*

VIEW POSTS  
CREATE POST  
DELETE POST  
UPDATE POST  

VIEW USERS  
VIEW USER DETAIL  
CREATE USER  
DELETE USER  
UPDATE USER  

VIEW AGENDA  
ADD AGENDA ITEM  
DELETE AGENDA ITEM  

VIEW EVENTS  
VIEW EVENT DETAIL  
CREATE EVENT  
DELETE EVENT  
UPDATE EVENT  

CREATE TOPIC  
DELETE TOPIC   
UPDATE TOPIC  

UPDATE CONFIG  

___


####SIGN UP
__URL:__ /api/signup  
__Method:__ GET  
__Description:__ Creates a new user and returns a token. The token must be included in all API calls in the header as the VALUE for the KEY 'token'.  
__Authorized roles:__ N/A  
__Inputs:__

- username  *--the username must be unique. an error will be returned if the username if found in the database.*
- password  *--The password is encrypted before saved to database.*
- email (OPTIONAL)
- organization (OPTIONAL)
- roles (OPTIONAL)  *--an admin role can only be assigned with the CREATE USER or UPDATE USER end points*
- profile_twitter_username

__Outputs:__

- token

___

####SIGN IN
__URL:__ /api/signin  
__Method:__ GET  
__Description:__ If the login returns a successful authentication, a token is returned. The token must be included in all API calls in the header as the VALUE for the KEY 'token'.  
__Authorized roles:__ N/A  
__Inputs:__

- username  
- password  *--The password is encrypted before saved to database.*

__Outputs:__

- token

___

*The following endpoints require a valid token, provided with sign up or sign in*  

####VIEW POSTS
__URL:__ /api/postlist  
__Method:__ GET  
__Description:__ Returns posts in reverse chronological order, includes all posts unless input has an optional filter parameter.  
__Authorized roles:__ attendee, admin  
__Inputs:__

- topic_id (OPTIONAL)
- event_id (OPTIONAL)
- user_id (OPTIONAL)
- date_range (OPTIONAL)

__Outputs:__  

- id
- body  *--the full text of the post*
- user  *--name of poster*
- topics  *--all associated topics*
- event  *--name of associated event*
- link  *--HTTP link associated with post*
- edit_history  *--array of datetimes of edits, an empty array if has never been edited*
- creation_date  *--timestamp of creation date*

___

####CREATE POST  
__URL:__ /api/post  
__Method:__ POST  
__Description:__ Creates a new message board post, returns post details with id.  
__Authorized roles:__ admin, attendee  
__Inputs:__  

- body  *--text body of message*
- user_id  *--id of User making the post*
- topic_ids (OPTIONAL)  *--array of topic ids*
- event_id (OPTIONAL)  *--id of associated Event*
- link (OPTIONAL)  *--String of HTTP URL*

__Outputs:__  

- id
- body
- user_id
- topic_ids
- event_id
- link
- edit_history
- creation_date

___

####DELETE POST  
__URL:__ /api/post  
__Method:__ DELETE  
__Description:__ Deletes a specified message board post, returns the deleted post details.  
__Authorized roles:__ admin, (attendee)  *--token of user making the request must be an admin role, or possess the same id as that of the attendee that created the post*    
__Inputs:__  

- id  *--id of the post to be deleted*

__Outputs:__  

- id
- body
- user_id
- topic_ids
- event_id
- link
- edit_history
- creation_date
- modification_date

___

####UPDATE POST  
__URL:__ /api/post  
__Method:__ PATCH  
__Description:__ Updates the details of a message board post, returns updated post details. Whatever optional inputs are provided are the fields that will be updated. Fields that are not updated are left with their original values. It will automatically add a new entry to the edit_history array with a new timestamp.   
__Authorized roles:__ admin, (attendee)  *--token of user making the request must be an admin role, or possess the same id as that of the attendee that created the post*     
__Inputs:__  

- id  *--id of the post to be updated*
- body (OPTIONAL)  *--text body of message*
- topic_ids (OPTIONAL)  *--array of topic ids*
- event_id (OPTIONAL)  *--id of associated Event*
- link (OPTIONAL)  *--String of HTTP URL*

__Outputs:__  

- id
- body
- user_id
- topic_ids
- event_id
- link
- edit_history
- creation_date

___

####VIEW USERS  
__URL:__ /api/userlist  
__Method:__ GET  
__Description:__ Returns a list of attendees.  
__Authorized roles:__ admin, attendee     
__Inputs:__  
__Outputs:__  

- id
- username
- organization

___

####VIEW USER DETAIL
__URL:__ /api/user  
__Method:__ GET  
__Description:__ Returns details for an specified user.  
__Authorized roles:__ admin (all details), attendee (a censored list based on profile settings)  *--token of user making the request must be an admin role, or possess the same id as that of the attendee to be updated to view full, uncensored details*  
__Inputs:__  

- id

__Outputs:__  

- id
- username
- organization
- email
- roles
- agenda
- profile_description
- profile_image
- profile_website
- profile\_twitter\_username

___

####CREATE USER
__URL:__ /api/user  
__Method:__ POST    
__Description:__ Returns details for the new User account including the id.    
__Authorized roles:__ admin  *--token of user making the request must be an admin role*  
__Inputs:__   

- username
- password  *--The password is encrypted before saved to database.*
- email (OPTIONAL)
- email_hidden (OPTIONAL)  *--default is true*
- roles (OPTIONAL)  
- organization (OPTIONAL)
- agenda (OPTIONAL)  *--an array of Event ids*
- profile_description (OPTIONAL)
- profile_image (OPTIONAL)
- profile_website (OPTIONAL)
- profile\_twitter\_username (OPTIONAL)
- profile\_twitter\_hidden (OPTIONAL)  *--default is true*

__Outputs:__  

- id
- username
- organization
- email
- email_hidden
- roles
- agenda
- profile_description
- profile_image
- profile_website
- profile\_twitter\_username
- profile\_twitter\_hidden

___

####DELETE USER
__URL:__ /api/user  
__Method:__ DELETE  
__Description:__ Deletes the specified user account. Returns the deleted user details.  
__Authorized roles:__ admin, (attendee)  *--token of user making the request must be an admin role, or possess the same id as that of the attendee to be updated*  
__Inputs:__   

- id

__Outputs:__

- id
- username
- organization
- email
- email_hidden
- roles
- agenda
- profile_description
- profile_image
- profile_website
- profile\_twitter\_username
- profile\_twitter\_hidden

____

####UPDATE USER
__URL:__ /api/user  
__Method:__ PATCH      
__Description:__ Updates a specified User account. Updates all optional fields included in the submission. Returns the updated User.    
__Authorized roles:__ admin, (attendee)  *--token of user making the request must be an admin role, or possess the same id as that of the attendee to be updated*  
__Inputs:__   

- id
- username (OPTIONAL)
- password (OPTIONAL)  *--The password is encrypted before saved to database.*
- email (OPTIONAL)
- email_hidden (OPTIONAL)  *--default is true*
- roles (OPTIONAL)  
- organization (OPTIONAL)
- agenda (OPTIONAL)  *--an array of Event ids*
- profile_description (OPTIONAL)
- profile_image (OPTIONAL)
- profile_website (OPTIONAL)
- profile\_twitter\_username (OPTIONAL)
- profile\_twitter\_hidden (OPTIONAL)  *--default is true*

__Outputs:__  

- id
- username
- organization
- email
- email_hidden
- roles
- agenda
- profile_description
- profile_image
- profile_website
- profile\_twitter\_username
- profile\_twitter\_hidden

___

####VIEW AGENDA
__URL:__ /api/agenda  
__Method:__ GET  
__Description:__ Returns the list of favorited Events (the agenda) for a specified user.  
__Authorized roles:__ admin, (attendee)  *--token of user making the request must be an admin role, or possess the same id as that of the attendee agenda*  
__Inputs:__   

- id  *--id of the specified User*

__Outputs:__

- id  *--id of the Event*
- title  *--title of the Event*
- date
- speakers
- topics
- max_attendance
- current_attendance
- location

___

####ADD AGENDA ITEM
__URL:__ /api/agenda  
__Method:__ PATCH  
__Description:__ Returns the updated list of favorited Events (the agenda) for a specified user.  
__Authorized roles:__ admin, (attendee)  *--token of user making the request must be an admin role, or possess the same id as that of the attendee agenda*  
__Inputs:__   

- id  *--id of the specified User*
- event_id  *--id of the specified event to be added to the agenda*

__Outputs:__

- id  *--id of the Event*
- title  *--title of the Event*
- date
- speakers
- topics
- max_attendance
- current_attendance
- location

___

####DELETE AGENDA ITEM
__URL:__ /api/agenda  
__Method:__ DELETE    
__Description:__ Returns the updated list of favorited Events (the agenda) for a specified user.  
__Authorized roles:__ admin, (attendee)  *--token of user making the request must be an admin role, or possess the same id as that of the attendee agenda*  
__Inputs:__   

- id  *--id of the specified User*
- event_id  *--id of the specified event to be removed from the agenda*

__Outputs:__

- id  *--id of the Event*
- title  *--title of the Event*
- date
- speakers
- topics
- max_attendance
- current_attendance
- location

____

####VIEW EVENTS
__URL:__ /api/eventlist  
__Method:__ GET  
__Description:__ Returns a list event title and date, includes all events unless input has the optional filter parameter.  
__Authorized roles:__ admin, attendee   
__Inputs:__  

- topic_id (OPTIONAL)  *--filters to return only records possessing this ID in its topic field*

__Outputs:__  

- id
- title  
- date  

___

####VIEW EVENT DETAIL
__URL:__ /api/event  
__Method:__ GET  
__Description:__ Returns all detailed information for a given event.  
__Authorized roles:__ admin, attendee    
__Inputs:__  

- id  *--id of event record*

__Outputs:__  

- id
- title
- date
- speakers
- topics
- max_attendance
- current_attendance
- location

___

####CREATE EVENT
__URL:__ /api/event  
__Method:__ POST  
__Description:__ Creates a new event. Returns event details including the id.    
__Authorized roles:__ admin *--token of user making the request must be an admin role*      
__Inputs:__  

- title
- date
- speakers (OPTIONAL)
- topics (OPTIONAL)
- max_attendance (OPTIONAL)
- current_attendance (OPTIONAL)
- location (OPTIONAL)

__Outputs:__  

- id
- title
- date
- speakers
- topics
- max_attendance
- current_attendance
- location

___

####DELETE EVENT
__URL:__ /api/event  
__Method:__ DELETE   
__Description:__ Deletes a specified event. Returns the deleted event details.  
__Authorized roles:__ admin *--token of user making the request must be an admin role*  
__Inputs:__  

- id

__Outputs:__  

- id
- title
- date
- speakers
- topics
- max_attendance
- current_attendance
- location

___

####UPDATE EVENT
__URL:__ /api/event  
__Method:__ PATCH  
__Description:__ Updates a specified event. Updates all optional fields submitted. Returns the updated event details.  
__Authorized roles:__ admin *--token of user making the request must be an admin role*  
__Inputs:__  

- id
- title (OPTIONAL)
- date (OPTIONAL)
- speakers (OPTIONAL)
- topics (OPTIONAL)
- max_attendance (OPTIONAL)
- current_attendance (OPTIONAL)
- location (OPTIONAL)

__Outputs:__  

- id
- title
- date
- speakers
- topics
- max_attendance
- current_attendance
- location

___

####CREATE TOPIC
__URL:__ /api/topic  
__Method:__ POST  
__Description:__ Create a new topic.  
__Authorized roles:__ admin *--token of user making the request must be an admin role*  
__Inputs:__  

- title
- color (OPTIONAL)

__Outputs:__

- id
- title
- color

___

####DELETE TOPIC
__URL:__ /api/topic  
__Method:__ DELETE  
__Description:__ Delete a specified topic. Returns the deleted topic.   
__Authorized roles:__ admin *--token of user making the request must be an admin role*  
__Inputs:__  

- id

__Outputs:__

- id
- title
- color

___

####UPDATE TOPIC
__URL:__ /api/topic  
__Method:__ PATCH  
__Description:__ Update a specified topic. It will updated whatever optional fields are provided. Returns the updated topic.   
__Authorized roles:__ admin *--token of user making the request must be an admin role*  
__Inputs:__  

- id
- title (OPTIONAL)
- color (OPTIONAL)

__Outputs:__

- id
- title
- color

___

####UPDATE CONFIG
__URL:__ /api/config  
__Method:__ PATCH  
__Description:__ Updates the conference site configuration details. Any fields submitted will be overwritten with the new info. Returns the updated Config.  
__Authorized roles:__ admin  
__Inputs:__

- name (OPTIONAL)
- year (OPTIONAL)
- city (OPTIONAL)
- description (OPTIONAL)
- contact_email (OPTIONAL)
- contact_phone (OPTIONAL)
- contact_address (OPTIONAL)
- posts\_are\_public (OPTIONAL)

__Outputs:__

- name
- year
- city
- description
- contact_email
- contact_phone
- contact_address
- posts\_are\_public

___
