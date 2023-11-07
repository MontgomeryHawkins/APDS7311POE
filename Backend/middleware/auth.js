const jwt = require('jsonwebtoken');

 function auth(req, res, next) {
    const token = req.get('Authorization').split(" ")[1];
    let id;

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY)
        id = userId;
    } catch(err) {
        return res.sendStatus(401);
    }

    if (id) {
        req.user = { id };
        return next();
    }

    res.sendStatus(401);
 }

module.exports = auth;