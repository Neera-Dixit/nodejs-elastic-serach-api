/** 
 * Middlwares
*/

import AppUtil from '../utility/appUtil';

/** 
 * @namespace middlewares
*/
const middlewares = {
  /**
   * authMiddleware - authentication Middleware
   * @param {object} request - Request object
   * @param {object} response - Response object
   * @returns {object}
   */
  authMiddleware: async (request, response, next) => {

    const {token} = request;

    // prevent authMiddlware for login route
    if (request.path === '/elasticsearch/login') {
      return next('route');
    }
    
    if (token) {
      try {
        const validTokenStatus = await AppUtil.verifyToken(token);
        return next();
      } catch (error) {
        return next(error);
      }
    }
    next('Token Missing');
  },
};

export default middlewares;