const express = require('express');
const { db } = require('./config/db');
require('./models/Associaciones');
const cors = require('cors');


const app = express();

//db conexion
db.authenticate()
    .then(() => console.log('bd on line'))
    .catch(error => console.log(error));
// db.sync({force:false});
app.use(express.json());
app.use(cors())
// app.use(express.static('public'));

app.use('/api/user', require('./routes/userRouter'));
app.use('/api/sales', require('./routes/salesRouter'));
app.use('/api/auth', require('./routes/authRouter'));

const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0.'
app.use(express.urlencoded({ extended: true }));
 
app.listen(port, host, () => {
     console.log(`Server run in port ${port}`)
})