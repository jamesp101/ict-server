
const expressConfig = require('./express.config')
const databaseConfig = require('./database.config')

const dotenv = require('dotenv')

dotenv.config()


expressConfig.app.listen(expressConfig.PORT, '0.0.0.0')

databaseConfig.testConnection()


