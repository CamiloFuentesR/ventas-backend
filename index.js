const express = require('express');
const { db } = require('./config/db');
require('./models/Associaciones');
const cors = require('cors');


const app = express();
const whiteList = ['https://best-sale.netlify.app']; //hace accesible solo desde esta url acccion
const corsOptions = {
    origin: (origin, callbaback) => {
        console.log(origin);
        const existe = whiteList.some(dominio => dominio === origin);
        if (existe) {
            callbaback(null, true)
        } else {
            callbaback(new Error('No permitido por cors'))
        }
    }
}
//db conexion
db.authenticate()
    .then(() => console.log('bd on line'))
    .catch(error => console.log(error));
// db.sync({force:false});
app.use(cors(corsOptions))
app.use(express.json());
// app.use(express.static('public'));

app.use('/api/user', require('./routes/userRouter'));
app.use('/api/sales', require('./routes/salesRouter'));
app.use('/api/auth', require('./routes/authRouter'));

const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0.'

app.listen(port, host, () => {
    console.log(`Server run in port ${port}`)
})