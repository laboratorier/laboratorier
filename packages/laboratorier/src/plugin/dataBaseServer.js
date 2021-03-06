const getMongodbClientUrl = dataBaseServer => {
    return 'mongodb://' +
        (dataBaseServer.user === undefined ? '' : dataBaseServer.user) +
        (dataBaseServer.password === undefined ? '' : ':' + dataBaseServer.password + '@') +
        (dataBaseServer.host ?? 'localhost') +
        (dataBaseServer.port === undefined ? '' : ':' + dataBaseServer.port) +
        (dataBaseServer.dbName === undefined ? '' : '/' + dataBaseServer.dbName)
}

const getMongoClient = dataBaseServer => {
  return new Promise((resolve, reject) => {
    const url = getMongodbClientUrl(dataBaseServer)
    require('mongodb').connect(url, { useUnifiedTopology: true }, (err, db) => {
      if (err) {
        reject(err)
        return
      }
      resolve(db)
    })
  })
}
const getMongooseClient = dataBaseServer => {
  return new Promise((resolve, reject) => {
    const url = getMongodbClientUrl(dataBaseServer)
    const mongoose = new (require('mongoose').Mongoose)()
    // Remove '(node:9716)DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead' warning
    mongoose.set('useCreateIndex', true)
    try {
      resolve(
        mongoose.connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          ...dataBaseServer.option
        })
      )
    } catch (e) {
      reject(e)
    }
  })
}

export default async (config) => {
  const
    dbClients = {},
    dataBaseServers = config?.dataBaseServers ?? {}
  for (const dataBaseServerName in dataBaseServers) {
    const dataBaseServer = dataBaseServers[dataBaseServerName]
    switch (dataBaseServer.type) {
      case 'mongodb':
        dbClients[dataBaseServerName] = ({
          type: 'mongodb',
          db: await getMongoClient(dataBaseServer)
        })
        break
      case 'mongoose':
        dbClients[dataBaseServerName] = {
          type: 'mongoose',
          db: await getMongooseClient(dataBaseServer)
        }
        break
      default:
        console.warn('This database type is not currently supported')
        break
    }
  }
  return dbClients
}
