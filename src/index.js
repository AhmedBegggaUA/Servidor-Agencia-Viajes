const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methoOverride = require('method-override');
const session =  require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const { initialize } = require('passport');
const { response } = require('express');
//Initilizacions
const app = express();
require('./database');
require('./config/passport');
// Settings
app.set('port',process.env.PORT || 3100);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'

}));
app.set('view engine', '.hbs');
//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methoOverride('_method'));
app.use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//Global Variables
app.use((req,res,next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});
// Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//mis pruebas

app.get('/comprobar',(req, res) => {
    //res.send('Notes from database');
    //Aqui es donde haremos el fetch, de echo, lo hago?
    fetch("http://localhost:3200/banco/test").then((Response) => Response.json).then(data => console.log('hola'));
   
});

// Static files
app.use(express.static(path.join(__dirname, 'public'))); 

//Server is listening 
app.listen(app.get('port'), () =>{
    console.log('Server on port / servicio en el puerto', app.get('port'));
});