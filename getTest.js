'use strict';

// HTTP request
var request = require('request');
var cheerio = require('cheerio');
var s = require("underscore.string"); // Data Wranglinh : Get Data  + Cleaning data
var async = require('async');

var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'salle'
});

connection.connect();


var getTable = function() {
    const url = 'http://localhost/php/TestGet/index.html';
    var dataTable = [];
    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html); // Load html to cheerio


            $('#tableData > tbody > tr').each(function() {
                var data = $(this);
                var name1 = data.find('td:nth-child(1)').text();
                var name2 = data.find('td:nth-child(2)').text();
                var name3 = data.find('td:nth-child(3)').text();
                console.log('le nom1 est ====> ' + name1 );
                console.log('le nom2 est ====> ' + name2 );
                console.log('le nom3 est ====> ' + name3 );

                connection.query("INSERT INTO assist VALUES ('"+name1+"','"+name2+"','"+name3+"')", function (error, results, fields) {
                  if (error) throw error;
                });
            });

            // $('#quotesList > div').each(function() {
            //     var author = $(this).find('.bq-aut > a').text();
            //     var quote = $(this).find('.bqQuoteLink > a').text();
            //     var proverbe = {author: author, quote: quote};
            //     proverbes.push(proverbe);
            //     console.log(proverbe);
            // });
            return 0;

        } else {
            return 0;
        }
    });
};

getTable()

// async.times(39, function(n, next){
//     (n, function(err, proverbes) {
//       next(err, proverbes);
//   });
// }, function(err, allProverbes) {
//     if(err) {
//         console.log(err);
//     } else {

//     }
// });
