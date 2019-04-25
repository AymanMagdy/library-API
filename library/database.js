// This file is to connect the ORACLE database with the library app..

const express = require('express');
var oracledb = require('oracledb');

// The function of selecting the data from the database and also connecting to the database..
function select(){


  // Establishing the connection with the database..
  oracledb.getConnection({
  
    user : 'emms', // the user's name
    password : 'emms', // the user's password
    connectString : 'localhost:1521/centerSystem.srv.world'   // the host:port/database's name.
  
  }, function (error, connect){
    if(error){ // if there's error  with connectint to the database
      console.log( "Error with connection");
    } else { // if there;s no error, then the process of selection will start
       sql = "SELECT * FROM books";
       // this line works for excecuting the SQL statment and assinging the type of getting the data from the DB
       result =  connect.execute(sql, [], { outFormat: oracledb.ARRAY }, function(executeError, finalResult){
           if(executeError){ // if there's any error with fetching the data
               console.log('Error fetching data..')
               return executeError; // The error is here.. 
           } else{ // after catching the data
            // accessing the element > finalResult[i]['index'] -> for accessing the result in an array form
            console.log( finalResult.rows) // printing the result
           }
       })
    }
  });
}


// TODO.. INSERT, REMOVE

select() // calling the function select..