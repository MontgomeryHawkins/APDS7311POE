const router = require('express').Router();
const jwt = require('jsonwebtoken');
const {User}=require('../models/user');
const auth = require('../middleware/auth');
const {isValidPassword} = require('../utils/hash');

router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(401).json({ error: 'Incorrect username or password', message: 'Incorrect username or password' });
    }

    const valid = await isValidPassword(req.body.password, user.password);

    if (!valid) {
        return res.status(401).json({ error: 'Incorrect username or password', message: 'Incorrect username or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
    res.status(201).json({ message: 'Successfully Logged In', token:token });
});


module.exports = router;