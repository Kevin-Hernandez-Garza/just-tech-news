// setting up the main homepage route
const router = require('express').Router();

//populating template with the sequelize data
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');

router.get('/', (req,res) => {
    console.log(req.session);
    
    Post.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT (*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment, 
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User, 
                    attributes: ['username']
                }
            },
            {
                model: User, 
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            // pass a single post object into the homepage template
            res.render('homepage', {posts});
        }) 
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// route that renders the login page
router.get('/login', (req,res) => {
    // redirect to homepage if a session already exist
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;