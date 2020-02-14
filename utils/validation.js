const User = require('../users/userDb');

module.exports = {
  validateUser,
  validateUserId,
  validatePost
}


function validateUser(req, res, next) {
  Object.keys(req.body).length === 0 && req.body.constructor === Object ? 
    res.status(400).json({message:"missing user data"}) :
    !req.body.name ? 
      res.status(400).json({message:"missing user name"}) : 
      next()
}

function validateUserId(req, res, next) {
  User.getById(req.params.id)
  .then(user => {
    !user ? res.status(404).json({message: "invalid user id"}) : 
    (
      req.user=user, 
      next()
    )
  })
  .catch(err => {
    res.status(500).json({message: "There was an error getting the user"})
  })  
}

function validatePost(req, res, next) {
  Object.keys(req.body).length === 0 && req.body.constructor === Object ? res.status(400).json({message:"missing post data"}) :
  !req.body.text ? res.status(400).json({message:"missing required text field"}) : next()
}