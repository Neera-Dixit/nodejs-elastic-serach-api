import _ from 'lodash';

const appUtil = {
  mountRoutes: (routes, router) => {
    if (!routes || !router) return null;

    _.forEach(routes, (routeOptions, route) => {
      _.forEach(routeOptions, (routeOption) => {
        router[routeOption.method](route, routeOption.controller(routeOption.options));
      });
    });

    return router;
  }
};

export default appUtil;