require('dotenv').config();
const app = require('./server');
require('./db');
app.listen(app.get('port'),()=>{
    console.log('Server en puerto',app.get('port'))
});