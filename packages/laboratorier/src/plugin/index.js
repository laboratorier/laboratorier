import { registerDBServers } from 'quick-d/lib'
import config from '@/config/index'

import getDataBaseServers from '@/plugin/dataBaseServer'

const registerPlugins = async () => {
  registerDBServers(
    await getDataBaseServers(config)
  )
}

export {
  registerPlugins
}
