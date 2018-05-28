const elasticSearchConfig = {
  clientOptions: {
    host: 'localhost:9200',
    log: 'trace'
  },
  pingTimeOut: 30000,//in ms
};

export default elasticSearchConfig;