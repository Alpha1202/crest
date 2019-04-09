
/**
     *@class Auth
  */
export default class Auth {
  /**
     * create a new token
     * @param {object} req request object
     * @param {object} returns an object
     */
  static checkToken(req, res, next) {
    try {
      // eslint-disable-next-line dot-notation
      const token = req.headers['authorization'];
      if (typeof token !== 'undefined') {
        const bearer = token.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
      } else {
        res.status(403).json({ error: 'You are not authorised' });
      }
    } catch (error) {
      res.status(400).json({ error: 'Access token not valid' });
    }
  }
}
