const express = require('express');
const app = express();

const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
    
const employeeRoutes = require('./routes/employees');


// Connecting to mongodb database
const DATABASE_LOCAL = 'mongodb+srv://Satyam:satyy09@cluster0.j50pohu.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(DATABASE_LOCAL , { 
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true 
  })
.then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB', err));



app.use(bodyParser.urlencoded({extended:true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

//middleware for  method override
app.use(methodOverride('_method'));

//middleware for express session
app.use(session({
    secret : "nodejs",
    resave : true,
    saveUninitialized:true
}));

//middleware for connect flash
app.use(flash());

//Setting messages variables globally
app.use((req, res, next)=> {
    res.locals.success_msg = req.flash(('success_msg'));
    res.locals.error_msg = req.flash(('error_msg'));
    next();
});

app.use(employeeRoutes);

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log('Server is started.');
});