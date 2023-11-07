const router = require('express').Router();
const auth = require('../middleware/auth');
const {Post, validatePost} = require('../models/post')

//Get all posts
router.get('/all',auth, async (req,res) => {
    const posts = await Post.find();
    res.send(posts);
})

//create new post
router.post('/new',auth, async (req,res) => {
    const {error} = validatePost(req.body);
    if (error) {
        //console.error(error.details);
        return res.status(401).json({ message: 'Validation failed', details: error.details });
      }

    const post = new Post(req.body);
    post.save();
    res.status(201).json({ message: 'Post has been created'});
});

//Get a single post
router.get('/:id',auth,  async (req,res) => {
    const post = await Post.findById(req.params.id);
    if (post) return res.send(post);
    res.sendStatus(404);
});

//Delete a single post
router.delete('/:id',auth,  async (req,res) => {
    const result = await Post.deleteOne({_id: req.params.id});
    res.status(200).json({ message: 'Post has been deleted' });
})

module.exports = router;