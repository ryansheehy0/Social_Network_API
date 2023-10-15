A social media api back end that allows for CRUD operations on users, thoughts from users, friends, and reactions to thoughts.

- Users can share thoughts
- React to friends thoughts
- create a friend list:w

Things to use
- express
- mongoose
- native JS date library

To Do
- Find all
  - Users(GET /api/users)
  - thoughts
- Find by id
  - User(GET /api/user/:id)
  - Thought
- Create Update Delete
  - User(POST /api/)
  - Thought
- Friends
  - Add
  - Remove

## Users
GET /api/users
GET /api/users/:id
PUT /api/users/:id
  - username
DELETE /api/users/:id
  - Remove user's associated thoughts
POST /api/users
  - username
  - email

POST /api/users/:userId/friends/:friendId
DELETE /api/users/:userId/friends/:friendId

## Thoughts
GET /api/thoughts
GET /api/thoughts/:id
PUT /api/thoughts/:id
  - thoughtText
DELETE /api/thoughts/:id
POST /api/thoughts
  - Push thought's id to the associated user's thoughts array field
  - thoughtText
  - username
  - userId

POST /api/thoughts/:thoughtId/reactions
  -
DELETE /api/thoughts/:thoughtId/reactions

- Create walkthrough video
  - Show all insomnia paths
- Readme and add walkthrough video to readme