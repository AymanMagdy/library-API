// Course reservation center app

const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app'); // For debugging
const morgan = require('morgan');
const path = require('path');
const eps  = require('ejs');
var oracledb = require('oracledb');


const app = express();
const port = process.env.port || 3000;


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstarp/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views'); // Setting the path to the views.
app.set('view engine', 'ejs');   // Declaring what we gonna use in here.


// creating the navigation for the app
const nav = [
  { 
    link: '/books', title:'Book'
  },
  { 
    link: '/authors', title: 'Author'
  }
];

const bookRouter = require('./src/routes/bookRoutes')(nav);


// connecting to the databas and assingning the books array to the finalResult from the database.
// The list of books is righ here, as an array..
const books = [
  {
    title: 'The world war two', 
    gener: 'The history of the world',
    author: 'Levandoski',
    read: false
  }, 
  {
    title: 'How to rais a cat', 
    gener: 'Cats',
    author: 'Amal Mursal',
    read: false
  }, 
  {
    title: 'How to learn to code', 
    gener: 'Computer Science',
    author: 'Geek',
    read: false
  }, 
  {
    title: 'The helmet and the driver', 
    gener: 'Mcgizzer',
    author: 'Levandoski',
    read: false
  }, 
  {
    title: 'The world war two', 
    gener: 'The history of the world',
    author: 'Levandoski',
    read: false
  }, 
  {
    title: 'The world war two', 
    gener: 'The history of the world',
    author: 'Levandoski',
    read: false
  }
]

// just to navigate the user to a specific page(BOOKS)..
bookRouter.route('/').get((req, res) => {
  res.render('bookListView',
  {
    nav: [
      {
        link: '/books', title: 'Books'
      },
      {
      link: '/authors', title: 'Authors'
      }
    ],
    title: 'Library',
    books
  }
  );
});

// This is to render the page of a single book.
// When the customer is trying to open a single book, the app will render the 'bookView' page.
bookRouter.route('/:id').get((req, res) => {
  const { id } = req.params
  res.render(
    'bookView',
    {
      nav: [{link: '/books', title: 'Books'},
      {link: '/authors', title: 'Authors'}],
      title: 'Library',
      book: books[id]
    }
  )
});

// The main page of the app
app.use('/single', bookRouter);
app.use('/books', bookRouter); // calling the book router when it's called by the user.

app.get('/', (req, res) => { // Calling the html from the views file for the other pages..
  res.render('index', // The render is to read the .ejs files
   { // for the navigation and the title of the page, giving the link and the title to the loop in there.
     nav : [{link: '/books', title: 'Books'},
          {link: '/authors', title: 'Authors'}],
     title: 'Library'
    } 
    );
});

// The page of the about
name = app.get('/about', (req, res) => {
  res.render('about', {title: 'About'});
});

// The page of the contacts
app.get('/contacts', (req, res) => {
  res.render('contacts', {title: 'Contacts'})
});

// The signin page
app.get('/signin', (req, res) => {
  res.render('signin', {title: 'Sign in'});
});

// The sign up page
app.get('/signup', (req, res) => {
  res.render('signup', {title: 'Sign Up'});
});

// The port that we're using to connect to the server here.
app.listen(port, () => {
  debug(`Hello from the port ${chalk.green('8080')}`);
});
