 const express = require('express');
const bookRouter = express.Router();    

function router(nav){
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
      gener: 'Driving',
      author: 'Mcgizzer',
      read: false
    }, 
    {
      title: 'Exploring the world', 
      gener: 'Traveling',
      author: 'Adham Hemshary',
      read: false
    }, 
    {
      title: 'The world war two', 
      gener: 'The history of the world',
      author: 'Levandoski',
      read: false
    }
  ]
  
  // this function is to get all the books from the store.
  // just to navigate the user to a specific page(BOOKS)..
  bookRouter.route('/').get((req, res) => {
    res.render('bookListView',
    {
      nav,
      title: 'Library',
      books
    }
    );
  });
  
  // this function is to go a single web page that describes the selected book item.(ONLY ONE BOOK)
  bookRouter.route('/:id') // sending the id of the book to the another page.. 
  .get((req, res) => {
    const { id } = req.params; // getting the id from the parameters sent in there.
    if(id > books.length){ // to handle if there's injection with a book ID that doesn't exist
    res.render('bookError',
    {
      nav, 
      title: 'Library'
    }
    )
    } // if the injected book ID exists it'll go to the bookView directly..
    else{
      res.render('bookView',
    {
      nav,
      title: 'Library',
      book: books[id]
    }
    );
  }
  });

  return bookRouter;
}

  
  module.exports = router;
  
