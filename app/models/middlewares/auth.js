const jwt = require('jsonwebtoken');

// Vérifie si le accesstoken transporté est valide
// (ne pas oublier de mettre un accesstoken dans le Bearer lors des tests)
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split('Bearer ')[1];
  if (token == null)return res.status(401).json({error: "Null token"});
  jwt.verify(token,process.env.JWT_SECRET,(error, user) => {
    if(error) return res.status(403).json({error:error.message});
    req.user = user;
    next();
  });
}


module.exports = auth;