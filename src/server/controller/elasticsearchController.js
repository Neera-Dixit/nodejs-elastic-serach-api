/** 
 * 
*/

import ESService from '../services/elasticsearchService';

const elasticsearchController = {

  pingCluster: (pingOptions) => {
    return async (request, response) => {
      try {
        const pingMsg = await ESService.pingCluster(pingOptions);
        response.status(200).send(pingMsg);
      } catch (error) {
        response.status(500).send(error);
      }
    }
  },

  getIndex: (indexOptions) => {
    return async (request, response) => {
      const { indexName } = request.params;
      try {
        const createIndexResp = await ESService.getIndex({indexName});
        response.status(200).send(createIndexResp);
      } catch (err) {
        response.status(400).send(err);
      }
    }
  },

  createIndex: (indexOptions) => {
    return async (request, response) => {
      const { indexName } = request.params;
      try {
        const createIndexResp = await ESService.createIndex({indexName});
        response.status(200).send(createIndexResp);
      } catch (err) {
        response.status(400).send(err);
      }
    }
  },

  deleteIndex: (indexOptions) => {
    return async (request, response) => {
      const { indexName } = request.params;
      try {
        const delIndexResp = await ESService.deleteIndex({indexName});
        response.status(200).send(delIndexResp);
      } catch (err) {
        response.status(400).send(err);
      }
    }
  },

  deleteAllIndices: (indexOptions) => {
    return async (request, response) => {
      try {
        const delAllIndexResp = await ESService.deleteAllIndices(indexOptions);
        response.status(200).send(delAllIndexResp);
      } catch (err) {
        response.status(400).send(err);
      }
    }
  },

  addDocument: function addDocument(documentOptions) {
    return async (request, response) => {
      const {indexName, docType, docId,  doc} = request.body;
      try {
        const addDocResp = await ESService.addDocument({indexName, docType, docId, doc});
        response.status(200).send(addDocResp);
      } catch (err) {
        response.status(400).send({
          error: err.message
        });
      }
    }
  },

  getDocumentById: function getDocumentById(documentOptions) {
    return async (request, response) => {
      const {index,type} = request.query;
      const {docId} = request.params;
      try {
        const docByIdResp = await ESService.getDocumentById({
          docId,
          index,
          type
        });
        response.status(200).send(docByIdResp);
       } catch (err) {
        response.status(400).send({
          error: err.message
        });
      }
    }
  },

  deleteDocument: function deleteDocument(documentOptions) {
    return async (request, response) => {
      const {index,type} = request.query;
      const {docId} = request.params;
      try {
        const docDelResp = await ESService.deleteDocument({
          docId,
          index,
          type
        });
        response.status(200).send(docDelResp);
      } catch (err) {
        response.status(400).send({
          error: err.message
        });
      } 
    }
  },

  updateDocument: function updateDocument(documentOptions) {
    return async (request, response) => {
      const {docId} = request.params;
      const {indexName, docType,  doc} = request.body;
      try {
        const docUpdateResp = await ESService.updateDocument({
          docId,
          index: indexName,
          type: docType,
          doc
        });
        response.status(200).send(docUpdateResp);
      } catch (err) {
        response.status(400).send({
          error: err.message
        });
      } 
    }
  },

  getDocumentCount: function getDocumentCount(documentOptions) {
    return (request, response) => {
      const {filtertype, filter} = request.params;
      if(filtertype === 'index') return elasticsearchController.getDocumentCountByIndexName(request, response, filter);

      response.status(400).send({
        error: "Bad Request"
      });
    }
  },

  getDocumentCountByIndexName: async function getDocumentCountByIndexName(request, response, indexName) {
    try {
      const docCountByName = await ESService.getDocumentCountByIndexName(indexName);
      response.status(200).send({"count": docCountByName});
    } catch (err) {
      response.status(400).send({
        error: err.message
      });
    } 
  },

  getDocumentCountByCluster: function getDocumentCountByCluster(documentOptions) {
    return async (request, response) => {
      try {
        const docCountResp = await ESService.getDocumentCountByCluster();
        response.status(200).send({"count" : docCountResp});
      } catch (err) {
        response.sendStatus(400).send({
          error: err.message
        });
      } 
    }
  }
};

export default elasticsearchController;