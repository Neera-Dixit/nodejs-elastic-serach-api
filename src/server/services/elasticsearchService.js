import elasticsearch from 'elasticsearch';
import ESConfig from '../config/elasticSearch';

const elasticsearchService = {

  createClusterClient: function createClusterClient(clientOptions = ESConfig.clientOptions) {
    this.ESClient = this.ESClient || new elasticsearch.Client(clientOptions);
    return this.ESClient
  },

  getClusterClient: function getClusterClient(clientOptions) {
     return this.ESClient || this.createClusterClient(clientOptions);
  },

  pingCluster: function pingCluster(pingOptions) {
    return this.getClusterClient().ping(pingOptions || {
      requestTimeout: ESConfig.pingTimeOut,
    });
  },

  getIndex: function getIndex(indexOptions) {
    return this.getClusterClient().indices.get({index: indexOptions.indexName});
  },

  createIndex: function createIndex(indexOptions) {
    return this.getClusterClient().indices.create({index: indexOptions.indexName})
  },

  deleteIndex: function deleteIndex(indexOptions) {
    return this.getClusterClient().indices.delete({index: indexOptions.indexName})
  },

  deleteAllIndices: function deleteAllIndices(indexOptions) {
    return this.getClusterClient().indices.delete(indexOptions || {index: '*'});
  },

  addDocument: async function addDocument({indexName, docType, docId, doc}) {
    return this.getClusterClient().index({index: indexName,type: docType,id: docId,body: doc});
  },

  getDocumentById: async function getDocumentById({docId, index, type}) {
    return this.getClusterClient().get({index,type,id: docId});
  },

  deleteDocument: async function deleteDocument({docId, index, type}) {
    return this.getClusterClient().delete({index,type,id: docId});
  },

  updateDocument: async function updateDocument({docId, index, type, doc}) {
   return this.getClusterClient().update({index,type,id: docId,body:{doc}});
  },

  getDocumentCountByIndexName: async function getDocumentCountByIndexName(indexName) {
    return this.getClusterClient().count({index: indexName});
  },

  getDocumentCountByCluster: async function getDocumentCountByCluster() {
   return this.getClusterClient().count();
  },

  getClusterInfo: function getClusterInfo() {
    return this.getClusterClient().info();
  },

  searchInIndex: function searchInIndex({index, filter, search:searchKey}) {
    const query = (filter && `${filter}:${searchKey}`) || `tag:{searchKey}`;
    return this.getClusterClient().search({index, q: query});
  }
};

export default elasticsearchService;