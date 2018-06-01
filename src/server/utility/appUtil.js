import _ from 'lodash';
import jwt from 'jsonwebtoken';
import constants from '../config/constants';

/** 
 * @namespace appUtil
*/
const appUtil = {
  /**
   * mountRoutes - Method used to mount Routes
   * @param {array} routes - Routes
   * @param {object} router - Router object
   * @returns {object}
  */
  mountRoutes: (routes, router) => {
    if (!routes || !router) return null;

    _.forEach(routes, (routeOptions, route) => {
      _.forEach(routeOptions, (routeOption) => {
        router[routeOption.method](route, routeOption.controller(routeOption.options));
      });
    });

    return router;
  },

  /**
   * verifyToken - Method used to verify Token
   * @param {string} token - Token
   * @returns {object}
  */
  verifyToken: (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, constants.jwtSecret, (error, decoded) => {
        if (error) reject(error);
        resolve(decoded);
      });
    })
  },

  /**
   * generateToken - Method used to generate Token
   * @param {object} payload - Payload
   * @returns {string}
   * 
  */
  generateToken: (payload) => {
    if (payload) {
      return jwt.sign(payload, constants.jwtSecret, {
        expiresIn: 24*60*60
      });
    }

    return null;
  }

};

export default appUtil;