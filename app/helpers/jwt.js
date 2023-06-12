const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION ?? '30s';
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION ?? '2m';

const JwtTokens = 
function AccessAndRefreshTokens({id, prenom, nom, adresse_mail}) {
  const user = {id, prenom, nom, adresse_mail};
  const accessToken = jwt.sign(user,JWT_SECRET,{expiresIn: ACCESS_TOKEN_EXPIRATION});
  const refreshToken = jwt.sign(user,JWT_REFRESH_SECRET,{expiresIn: REFRESH_TOKEN_EXPIRATION});
  return ({accessToken, refreshToken});
}

module.exports = JwtTokens;