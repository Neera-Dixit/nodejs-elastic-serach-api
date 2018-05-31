import express from 'express';
import path from 'path';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import es6Renderer from 'express-es6-template-engine';
import webpackConfig from '../../webpack.config';
import appUtil from './utility/appUtil';
import routesConfig from './config/routes';
import ESService from './services/elasticsearchService';
import bodyParser from 'body-parser';
import bearerToken from 'express-bearer-token';
import middleware from './config/middlewares';

const expressApp = express();
const expressPORT = process.env.PORT || 3000;

expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(bodyParser.json());
expressApp.use(bearerToken());

expressApp.engine('html', es6Renderer);
expressApp.set('views', path.join(process.cwd(), 'dist'));
expressApp.set('view engine', 'html');

initialiseServer();

if (process.env.NODE_ENV === 'development') {
  const webpackdevConfig = webpackConfig('development');
  const compiler = webpack(webpackdevConfig);

  expressApp.use(devMiddleware(compiler, {
    publicPath: webpackdevConfig.output.publicPath,
    historyApiFallback: true,
  }));

  expressApp.use(hotMiddleware(compiler));
}

expressApp.use(express.static(path.join(process.cwd(), 'dist')));

expressApp.use('/api/v1',middleware.authMiddleware, appUtil.mountRoutes(routesConfig, express.Router()));


expressApp.listen(expressPORT, (err) => {
  if (err) {
    console.error('Server ERROR : ', err);
  } else {
    console.log(`Express server listening at ${expressPORT}`);
  }
});

function initialiseServer(){
  ESService.createClusterClient();
}