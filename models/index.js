// importing the User model, to collect User model data
const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');

// creating associations 
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});


// relationship between the Post model to the User
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// these two associations below query each other in the context of a vote
User.belongsToMany(Post, {
    through: Vote, 
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote, 
    as: 'voted_posts',
    foreignKey:'post_id'
});


// exporting the User object with it as a property
module.exports = {User, Post, Vote};
