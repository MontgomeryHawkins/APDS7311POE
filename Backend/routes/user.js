const router = require('express').Router();
const {User, validateUser} = require('../models/user');
const{hashPassword} = require ('../utils/hash');
const auth = require('../middleware/auth');


//creates a new users
router.post('/signup', async(req,res) => {
    const {error} = validateUser(req.body);
    if (error) return res.status(401).json(error.details[0].message);

    const isUnique = (await User.count({username: req.body.username})) === 0;
    if(!isUnique)
    return res
.status(400)
.json({error: 'The username or password is not valid'});

try{
    const user = new User(req.body);
    user.password=await hashPassword(user.password);
    await user.save();
    res.status(200).json({message:"Registered Succesfully"});
} catch(err) {
    return res.status(500).json(err);
}

})

module.exports = router;