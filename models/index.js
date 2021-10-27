// importing the User model, to collect User model data
const User = require('./User');
const Post = require('./Post');

// creating associations 
User.hasMany(Post, {
    foreignKey: 'user_id'
});


// relationship between the Post model to the User
Post.belongsTo(User, {
    foreignKey: 'user_id'
});


// exporting the User object with it as a property
module.exports = {User, Post};
