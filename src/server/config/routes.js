/** 
 * Routes - This file contains Express routes configuration
*/
import elasticSearchController from '../controller/elasticsearchController';

console.log(elasticSearchController.pingCluster);

const routes = {
 '/elasticsearch/ping': [{
  method: 'get',
  controller : elasticSearchController.pingCluster,
  options: null,
 }],

 '/index/:indexName' : [{
  method: 'post',
  controller: elasticSearchController.createIndex,
  options: null
 },{
  method: 'delete',
  controller: elasticSearchController.deleteIndex,
  options: null
 },{
  method: 'get',
  controller: elasticSearchController.getIndex,
  options: null
 }],

 '/index': [{
   method: 'delete',
   controller: elasticSearchController.deleteAllIndices,
   options: null
 }],

 '/document': [{
   method: 'put',
   controller: elasticSearchController.addDocument,
   options: null
 }],

 '/document/count/:filtertype/:filter': [{
  method: 'get',
  controller: elasticSearchController.getDocumentCount,
  options: null
}],

'/document/count': [{
  method: 'get',
  controller: elasticSearchController.getDocumentCountByCluster,
  options: null
}],

 '/document/:docId': [{
  method: 'get',
  controller: elasticSearchController.getDocumentById,
  options: null
}, {
  method: 'delete',
  controller: elasticSearchController.deleteDocument,
  options: null
}, {
  method: 'patch',
  controller: elasticSearchController.updateDocument,
  options: null
}]
};

export default routes;