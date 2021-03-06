export default {
  server: {
    host: '0.0.0.0',
    port: 12444
  },
  dataBaseServers: {
    'mongodb-server-01': {
      type: 'mongodb',
      host: '127.0.0.1',
      port: 27017,
      dbName: 'pro-server-1'
    },
    'mongoose-server-01': {
      type: 'mongoose',
      host: '127.0.0.1',
      port: 27017,
      dbName: 'pro-server-1'
    }
  }
}
