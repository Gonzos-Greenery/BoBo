const fs = require('fs');
const { parse } = require('csv-parse');
const path = require('path');

const MovieSeed = [
  // {
  //   kaggle_id: 'tm1000022',
  //   title: 'Boonie Bears: The Wild Life',
  //   dup: '',
  //   type: 'MOVIE',
  //   description:
  //     'Bear brothers Briar and Bramble set off on an adventure with their hum...',
  //   release_year: 2021,
  //   age_certification: '',
  //   runtime: 99,
  //   genres: "['scifi', 'animation']",
  //   production_countries: "['CN']",
  //   seasons: '',
  //   imdb_id: 'tt11654032',
  //   imdb_score: 5.4,
  //   imdb_votes: 117,
  //   tmdb_popularity: 6.135,
  //   tmdb_score: 3.8,
  //   netflix: false,
  //   hulu: false,
  //   hbo: false,
  //   disney: false,
  //   prime: true,
  // },
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
    // console.log(MovieSeed[0]);
  });

module.exports = MovieSeed;
