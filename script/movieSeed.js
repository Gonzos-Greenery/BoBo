const fs = require('fs');
const { parse } = require('csv-parse');
const path = require('path');

const MovieSeed = [
];

const inputFile = path.resolve(__dirname, './BoBo_Titles.csv');

fs.createReadStream(inputFile)
  .pipe(
    parse({
      delimiter: ',',
      columns: true,
      ltrim: true,
    })
  )
  .on('data', function (row) {
    // 👇 push the object row into the array
    MovieSeed.push(row);
  })
  .on('error', function (error) {
    console.log(error.message);
  })
  .on('end', function () {
    // 👇 log the result array
    console.log('parsed csv data for movies');

  });

module.exports = MovieSeed;
