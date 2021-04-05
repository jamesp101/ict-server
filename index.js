
const expressConfig = require('./express.config')
const databaseConfig = require('./database.config')

const dotenv = require('dotenv')

dotenv.config()


expressConfig.app.listen(expressConfig.PORT, () => {
    console.log(`Express is runngin at ${expressConfig.PORT}`)
})

databaseConfig.testConnection()


