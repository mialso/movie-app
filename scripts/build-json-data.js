'use strict'

const fs = require('fs')
const path = require('path')

const movies = fs.readdirSync(path.resolve('samples/posters'))
  .filter(posterName => posterName.split('.').pop() === 'jpg')
  .map((posterName, index) => {
    return {
      id: index.toString(),
      name: posterName.split('.')[0].split('-').shift().split('_').join(' ').toLowerCase(),
      year: posterName.split('.')[0].split('-').pop()
    }
  })

fs.writeFileSync(path.resolve('public/movies.json'), JSON.stringify({movies}))
/*
movies.forEach((movie) => {
  console.log(movie)
})
*/

