/**
 * Elastic Search Cluster Service 
 */
import elasticsearch from 'elasticsearch';
import ESConfig from '../config/elasticSearch';

/** 
 * @namespace elasticsearchService
*/
const elasticsearchService = {

  /**
   * createClusterClient - Method used to create Cluster Client
   * @param {object} clientOptions - client Options
   * @returns {object}
  */
  createClusterClient: function createClusterClient(clientOptions = ESConfig.clientOptions) {
    this.ESClient = this.ESClient || new elasticsearch.Client(clientOptions);
    return this.ESClient
  },

  /**
   * getClusterClient - Method used to get Cluster Client
   * @param {object} clientOptions - clientOptions
   * @returns {object}
  */
  getClusterClient: function getClusterClient(clientOptions) {
     return this.ESClient || this.createClusterClient(clientOptions);
  },

  /**
   * pingCluster - ping Cluster Service
   * @param {object} pingOptions - pingOptions
   * @returns {object}
  */
  pingCluster: function pingCluster(pingOptions) {
    return this.getClusterClient().ping(pingOptions || {
      requestTimeout: ESConfig.pingTimeOut,
    });
  },

  /**
   * getIndex - get Index Service
   * @param {object} indexOptions - indexOptions
   * @returns {object}
  */
  getIndex: function getIndex(indexOptions) {
    return this.getClusterClient().indices.get({index: indexOptions.indexName});
  },

  /**
   * createIndex - create Index Service
   * @param {object} indexOptions - indexOptions
   * @returns {object}
  */
  createIndex: function createIndex(indexOptions) {
    return this.getClusterClient().indices.create({index: indexOptions.indexName})
  },

  /**
   * deleteIndex - delete Index Service
   * @param {object} indexOptions - indexOptions
   * @returns {object}
  */
  deleteIndex: function deleteIndex(indexOptions) {
    return this.getClusterClient().indices.delete({index: indexOptions.indexName})
  },

  /**
   * deleteAllIndices - delete All Indices Service
   * @param {object} indexOptions - indexOptions
   * @returns {object}
  */
  deleteAllIndices: function deleteAllIndices(indexOptions) {
    return this.getClusterClient().indices.delete(indexOptions || {index: '*'});
  },

  /**
   * addDocument - add Document Service
   * @param {object}
   *  @returns {object}
  */
  addDocument: async function addDocument({indexName, docType, docId, doc}) {
    return this.getClusterClient().index({index: indexName,type: docType,id: docId,body: doc});
  },

  /**
   * getDocumentById - get Document By Id Service
   * @param {object}
   * @returns {object}
  */
  getDocumentById: async function getDocumentById({docId, index, type}) {
    return this.getClusterClient().get({index,type,id: docId});
  },

  /**
   * deleteDocument - delete Document Service
   * @param {object}
   * @returns {object}
  */
  deleteDocument: async function deleteDocument({docId, index, type}) {
    return this.getClusterClient().delete({index,type,id: docId});
  },

  /** 
   * updateDocument - update Document Service
   * @param {object}
   * @returns {object}
  */
  updateDocument: async function updateDocument({docId, index, type, doc}) {
   return this.getClusterClient().update({index,type,id: docId,body:{doc}});
  },

  /** 
   * getDocumentCountByIndexName - get DocumentCount By IndexName Service
   * @param {string} indexName - indexName
   * @returns {object}
  */
  getDocumentCountByIndexName: async function getDocumentCountByIndexName(indexName) {
    return this.getClusterClient().count({index: indexName});
  },

  /** 
   * getDocumentCountByCluster - get DocumentCount By Cluster Service
   * @param {null}
   * @returns {number}
  */
  getDocumentCountByCluster: async function getDocumentCountByCluster() {
   return this.getClusterClient().count();
  },

  /**
   * getClusterInfo - get Cluster Info Service
   * @param {null}
   * @returns {object}
  */
  getClusterInfo: function getClusterInfo() {
    return this.getClusterClient().info();
  },

  /**
   * searchInIndex - search In Index Service
   * @param {object}
   * @returns {object}
  */
  searchInIndex: function searchInIndex({index, filter, search:searchKey}) {
    return this.getClusterClient().search({index,
      body: {
        query: {
            query_string:{
               query: `*${searchKey}*`
            }
        }
    }});
  }
};

export default elasticsearchService;