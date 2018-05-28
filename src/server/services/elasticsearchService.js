import elasticsearch from 'elasticsearch';
import ESConfig from '../config/elasticSearch';

const elasticsearchService = {

  createClusterClient: function createClusterClient(clientOptions = ESConfig.clientOptions) {
    this.ESClient = this.ESClient || new elasticsearch.Client(clientOptions);
  },

  getClusterClient: function getClusterClient(clientOptions) {
     this.ESClient = this.ESClient || this.createClusterClient(clientOptions);
     return this.ESClient
  },

  pingCluster: function pingCluster(pingOptions) {
    return new Promise((resolve, reject) => {
      (this.ESClient || this.createClusterClient()).ping(pingOptions || {
        requestTimeout: ESConfig.pingTimeOut,
      }, function pingCallBack(error) {
        if (error) {
          reject('elasticsearch cluster is down!');
        } 
        resolve('All is well');
      });
    });
  },

  getIndex: function getIndex(indexOptions) {
    return new Promise ((resolve, reject) => {
      this.getClusterClient().indices.get({
        index: indexOptions.indexName
      }).then( createIndexResp => {
        resolve(createIndexResp);
      }, err => {
        reject(err);
      })
    });
  },

  createIndex: function createIndex(indexOptions) {
    return new Promise ((resolve, reject) => {
      this.getClusterClient().indices.create({
        index: indexOptions.indexName
      }).then( createIndexResp => {
        resolve(createIndexResp);
      }, err => {
        reject(err);
      })
    });
  },

  deleteIndex: function deleteIndex(indexOptions) {
    return new Promise ((resolve, reject) => {
      this.getClusterClient().indices.delete({
        index: indexOptions.indexName
      }).then( createIndexResp => {
        resolve(createIndexResp);
      }, err => {
        reject(err);
      })
    });
  },

  deleteAllIndices: function deleteAllIndices(indexOptions) {
    return new Promise ((resolve, reject) => {
      this.getClusterClient().indices.delete(indexOptions || {
        index: '*'
      }).then( createIndexResp => {
        resolve(createIndexResp);
      }, err => {
        reject(err);
      })
    });
  },

  addDocument: async function addDocument({indexName, docType, docId, doc}) {
    try {
      const response = await this.getClusterClient().index({
        index: indexName,
        type: docType,
        id: docId,
        body: doc
      });
      return response;
    } catch (error) {
      throw error;
    }
  
  },

  getDocumentById: async function getDocumentById({docId, index, type}) {
    try {
      const response = await this.getClusterClient().get({
        index,
        type,
        id: docId
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteDocument: async function deleteDocument({docId, index, type}) {
    try {
      const response = await this.getClusterClient().delete({
        index,
        type,
        id: docId
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateDocument: async function updateDocument({docId, index, type, doc}) {
    try {
      const response = await this.getClusterClient().update({
        index,
        type,
        id: docId,
        body: {
          doc
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  getDocumentCountByIndexName: async function getDocumentCountByIndexName(indexName) {
    try {
      const { count } = await this.getClusterClient().count({
        index: indexName
      });
      return count;
    } catch (error) {
      throw error;
    }
  },

  getDocumentCountByCluster: async function getDocumentCountByCluster() {
    try {
      const { count } = await this.getClusterClient().count();
      return count;
    } catch (error) {
      throw error;
    }
  }
};

export default elasticsearchService;