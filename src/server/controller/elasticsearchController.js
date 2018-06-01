/** 
 *  Elastic search controller
*/

import ESService from '../services/elasticsearchService';

/** 
 * @namespace elasticsearchController
*/
const elasticsearchController = {

  /**
   * pingCluster - method used to ping cluster
   * @param {object} pingOptions - pingOptions
   * @returns {object} 
  */
  pingCluster: (pingOptions) => {
    return async (request, response) => {
      try {
        const pingMsg = await ESService.pingCluster(pingOptions);
        if (pingMsg) {
          return response.status(200).send({status: "Connected"});
        }
        response.status(400).send({error: "No Connections"});
      } catch (error) {
        response.status(500).send({
          error: error.message
        });
      }
    }
  },

  /**
   * getIndex - Method used to get index
   * @param {object} indexOptions - indexOptions
   * @returns {object} 
  */
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

  /**
   * createIndex - Method used to create Index
   * @param {object} indexOptions - indexOptions
   * @returns {object} 
  */
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

  /**
   * deleteIndex - Method used to delete Index
   * @param {object} indexOptions - indexOptions
   * @returns {object} 
  */
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

  /**
   * deleteAllIndices - Method used to delete All Indices
   * @param {object} indexOptions - indexOptions
   * @returns {object} 
  */
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

  /**
   * addDocument - Method used to add Document
   * @param {object} documentOptions - documentOptions
   * @returns {object} 
  */
  addDocument: function addDocument(documentOptions) {
    return async (request, response) => {
      const {indexName, docType, docId,  doc} = request.body;
      try {
        const addDocResp = await ESService.addDocument({indexName, docType, docId, doc});
        console.log("response ",addDocResp);
        response.status(200).send(addDocResp);
      } catch (err) {
        response.status(400).send({
          error: err.message
        });
      }
    }
  },

  /**
   * getDocumentById - Method used to getDocument By Id
   * @param {object} documentOptions - documentOptions 
   * @returns {object} 
  */
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

  /**
   * deleteDocument - Method used to delete Document
   * @param {object} documentOptions - documentOptions
   * @returns {object} 
  */
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

  /**
   * updateDocument - Method used to update Document
   * @param {object} documentOptions - documentOptions
   * @returns {object} 
  */
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

  /**
   * getDocumentCount - Method used to get Document Count
   * @param {object} documentOptions - documentOptions
   * @returns {object} 
  */
  getDocumentCount: function getDocumentCount(documentOptions) {
    return (request, response) => {
      const {filtertype, filter} = request.params;
      if(filtertype === 'index') return elasticsearchController.getDocumentCountByIndexName(request, response, filter);

      response.status(400).send({
        error: "Bad Request"
      });
    }
  },

  /**
   * getDocumentCountByIndexName -Method used to get DocumentCount By IndexName
   * @param {object} request - request object
   * @param {object} response - response object
   * @param {string} indexName - string
   * @returns {object} 
  */
  getDocumentCountByIndexName: async function getDocumentCountByIndexName(request, response, indexName) {
    try {
      const { count } = await ESService.getDocumentCountByIndexName(indexName);
      response.status(200).send({count});
    } catch (err) {
      response.status(400).send({
        error: err.message
      });
    } 
  },

  /** 
   * Method used to get Document Count By Cluster
   * @param {object} documentOptions - documentOptions
   * @returns {object} 
  */
  getDocumentCountByCluster: function getDocumentCountByCluster(documentOptions) {
    return async (request, response) => {
      try {
        const { count } = await ESService.getDocumentCountByCluster();
        response.status(200).send({count});
      } catch (err) {
        response.sendStatus(400).send({
          error: err.message
        });
      } 
    }
  },

  /**
   * getClusterInfo - Method used to get Cluster Info
   * @param {object} clusterOptions - clusterOptions
   * @returns {object} 
  */
  getClusterInfo: function getClusterInfo(clusterOptions) {
    return async (request, response) => {
      try {
        const clusterInfo = await ESService.getClusterInfo();
        response.status(200).send(clusterInfo);
      } catch (err) {
        response.sendStatus(400).send({
          error: err.message
        });
      }
    }
  },

  /**
   * searchInIndex - Method used to search In Index
   * @param {object} clusterOptions - clusterOptions
   * @returns {object} 
  */
  searchInIndex: function searchInIndex(clusterOptions) {
    return async (request, response) => {
      const {index, filter, search} = request.query;

      if (!index || !search) {
        return response.sendStatus(400).send({
          error: "Query params missing(index and search should be passed)"
        });
      }

      try {
        const searchResult = await ESService.searchInIndex({index, filter, search});
        console.log("serach Result",searchResult);
        response.status(200).send(searchResult);
      } catch (err) {
        response.sendStatus(400).send({
          error: err.message
        });
      }
    }
  }
};

export default elasticsearchController;