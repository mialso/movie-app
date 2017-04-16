;(function(window, Vue, Vuex) {
  function Item (number) {
    this.number = number
  }
  function Movie (movieData, showTime) {
    this.id = movieData.id
    this.name = movieData.name
    this.showTime = showTime
    this.choosen = (movieData.id % 8) === 0
    this.description = `year ${movieData.year}`
    this.movieClass = `icon icon-${movieData.name.split(' ').join('_')}-${movieData.year}`
  }
  const categories = [
    {id: 'c1', name: '24 hours', items: []},
    {id: 'c2', name: 'comming', items: []},
    {id: 'c3', name: 'my choice', items: []}
  ]

  function calculateItems (maxItems) {
    const initialItems = []
    for (let i = 0; i < maxItems; ++i) {
      initialItems.push(new Item(i))
    }
    return initialItems
  }
  const movieItems = Math.floor(window.innerWidth / 240)

  window.document.addEventListener('keyup', (e) => {
    switch (e.which) {
      case 37: store.commit('moveLeft'); break
      case 38: store.commit('moveDown'); break
      case 39: store.commit('moveRight'); break
      case 40: store.commit('moveUp'); break
      case 32: store.commit('toggleMovie'); break
      default: break 
    }
  })
  window.fetch('movies.json')
  .then(function(response) {
    if (response.ok) return response.json()
    throw new Error('Response error')
  })
  .then(function(jsonData) {
    // some calculations to create showTime for each movie
    const hourMilisec = 1000 * 60 * 60
    const dayMilisec = hourMilisec * 24
    const time = Date.now()
    const today = new Date()
    const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() + dayMilisec
    const tomorrowEnd = todayEnd + dayMilisec
    const todayHoursLeft = 24 - today.getHours() - 1
    const todayMovies = todayHoursLeft * 2

    // populates movies data
      store.state.movies = jsonData.movies.map(item => {
        let showTime = 0
        if (item.id <= todayMovies) {
          showTime = Math.floor(Math.random() * (todayEnd - time)) + time
        } else {
          showTime = Math.floor(Math.random() * (tomorrowEnd - todayEnd)) + todayEnd
        }
        return new Movie(item, showTime)
      })

    // populate categories data
    store.state.movies.forEach(movie => {
      if (movie.choosen) categories[2].items.push(movie.id)
      if (movie.showTime < todayEnd) {
        categories[0].items.push(movie.id)
      } else {
        categories[1].items.push(movie.id)
      }
    })
    store.state.categories = categories.slice(0)

    store.state.loading = false
  })
  .catch(function(error) {
    // TODO create user error informer
  })

  window.setInterval(() => {store.state.appTime = Date.now()}, 60000)
  const store = new Vuex.Store({
    state: {
      catItems: calculateItems(3),
      // 230 x 350 movie item size
      items: calculateItems(movieItems),
      categories: categories.slice(0),
      movies: [],
      loading: true,
      appTime: Date.now(),
      currentCategory: ''
    },
    mutations: {
      moveRight: state => {
        if (state.items[1].number >= state.categories[state.catItems[1].number].items.length - 1) return
        state.items = state.items.map((item) => {
          return new Item(item.number + 1)
        })
      },
      moveLeft: state => {
        if (state.items[0].number === -1 || state.categories[state.catItems[1].number].items.length === 0) return
        state.items = state.items.map((item) => {
          return new Item(item.number - 1)
        })
      },
      moveUp: state => {
        state.catItems = state.catItems.map((item) => {
          return new Item((item.number + 1) % 3)
        })
        state.items = calculateItems(movieItems)
      },
      moveDown: state => {
        state.catItems = state.catItems.map((item) => {
          return new Item(item.number === 0 ? 2 : (item.number - 1))
        })
        state.items = calculateItems(movieItems)
      },
      toggleMovie: (state, movieId) => {
        if (!movieId) {
          const categoryItems = state.categories[state.catItems[1].number].items
          const movies = state.movies
            .filter(movie => categoryItems.indexOf(movie.id) !== -1)
          if (movies.length === 0 || state.items[1].number > movies.length) return
          var movieId = movies.sort((m1, m2) => m1.showTime - m2.showTime)[state.items[1].number].id
        }
        state.movies = state.movies.map((movie) => {
          if (movie.id === movieId) {
            movie.choosen 
              ? state.categories[2].items = state.categories[2].items.filter((id) => id !== movieId)
              : state.categories[2].items.push(movieId)
            return Object.assign({}, movie, {choosen: !movie.choosen})
          }
          return movie
        })
        if (state.catItems[1].number === 2 && state.categories[2].items.length === state.items[1].number) {
          store.commit('moveLeft')
        }
      },
    },
    actions: {
      previousMovie: (context, categoryId, firstMovieId) => {
        const category = context.state.categories.filter(cat => cat.id === categoryId)[0]
        if (category.items[0] === firstMovieId) return
        context.commit('moveLeft')
      },
      nextMovie: (context, categoryId, lastMovieId) => {
        const category = context.state.categories.filter(cat => cat.id === categoryId)[0]
        if (category.items.slice(-1)[0] === lastMovieId) return
        context.commit('moveRight')
      },
    },
    getters: {
      getMoviesByCategory: (state) => (categoryId) => {
        return state.movies
          .filter(movie => categories[categoryId[1] - 1].items.indexOf(movie.id) !== -1)
      }
    }
  })
  const app = new Vue({
    el: '#app',
    template: `
      <div class="app">
        <top-menu></top-menu>
        <category></category>
        <div class="footer"></div>
      </div>`,
    store: store
  })

})(window, Vue, Vuex);
