;(function(window, Vue, Vuex) {
  function Item (number) {
    this.number = number
  }
  function Movie (movieData) {
    this.id = movieData.id
    this.name = movieData.name
    this.description = `year ${movieData.year}`
    this.movieClass = `icon icon-${movieData.name.split(' ').join('_')}-${movieData.year}`
  }
  const categories = [
    {id: 'c1', name: '24 hours', items: ['1', '2', '3', '4', '5', '6', '7']},
    {id: 'c2', name: 'comming', items: ['8', '9', '10', '11', '12', '13', '14', '15']},
    {id: 'c3', name: 'my choice', items: ['16', '17', '18', '19', '20', '21']}
  ]

  function calculateItems (maxItems) {
    const initialItems = []
    for (let i = 0; i < maxItems; ++i) {
      initialItems.push(new Item(i))
    }
    return initialItems
  }
  const movieItems = parseInt(window.innerWidth / 200)

  window.fetch('movies.json')
  .then(function(response) {
    if (response.ok) return response.json()
    throw new Error('Response error')
  })
  .then(function(jsonData) {
    setTimeout(() => { 
      store.state.movies = jsonData.movies.map(item => new Movie(item))
      store.state.loading = false
    }, 2000)
  })
  .catch(function(error) {
  })

  const store = new Vuex.Store({
    state: {
      catItems: calculateItems(3),
      // 230 x 350 movie item size
      items: calculateItems(movieItems),
      categories: categories.slice(0),
      movies: [],
      loading: true
    },
    mutations: {
      moveRight: state => {
        state.items = state.items.map((item) => {
          return new Item(item.number + 1)
        })
      },
      moveLeft: state => {
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
      }
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
      }
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
