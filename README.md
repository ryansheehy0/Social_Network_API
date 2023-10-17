A social media api back end that allows for CRUD operations on users, thoughts from users, friends, and reactions to thoughts.

Order of API calls:
- Users
  - Create user1
  - Create user2
  - Create user3
  - Find all users
    - copy user1
  - Find user1 by id
  - Update user1 to ryan
  - Find all users
    - copy user3
  - Delete user3
  - Find all users
    - copy ryan
- Friend
  - Add friend
    - userId: ryan
    - friend: user2
  - Find all users
  - Delete friend

- Thought
  - Create new thought
    - ryan
  - Create new thought
    - user2
  - Get all thoughts
    - Copy ryan
  - Get thought by id
  - Update ryan's thought
  - Get all thoughts
  - Delete ryan's thought

- Show when you delete a user it deletes its associated thought Users
  - Find all users
  - Delete user2
  - Find all thoughts

- Reaction
  - Create reaction
  - Get all thoughts
  - Delete reaction