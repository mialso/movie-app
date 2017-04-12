;(function(window, Vue, Vuex) {
  function Item (number) {
    this.number = number
  }
  function Movie (id, categoryId) {
    this.id = `m${id}`
    this.categoryId = categoryId
    this.name = `movie ${this.id}`
    this.description = `description for movie ${this.id}`
  }
  const categories = [
    {id: 'c1', name: '24 hours', items: ['1', '2', '3', '4', '5', '6', '7']},
    {id: 'c2', name: 'comming', items: ['8', '9', '10', '11', '12', '13', '14', '15']},
    {id: 'c3', name: 'my choice', items: ['16', '17', '18', '19', '20', '21']}
  ]
  const movies = []
  categories.forEach((category) => {
    category.items.forEach((id) => {
      movies.push(new Movie(id, category.id))
    })
  })

  function calculateItems () {
    const initialItems = []
    // 230 x 350
    for (let i = 0; i <= window.innerWidth / 120; ++i) {
      initialItems.push(new Item(i))
    }
    return initialItems
  }

  const store = new Vuex.Store({
    state: {
      items: calculateItems(),
      categories: categories.slice(0),
      movies: movies.slice(0)
    },
    mutations: {
      moveRight: state => {
        console.log('moveRight')
        state.items = state.items.map((item) => {
          return new Item(item.number + 1)
        })
      },
      moveLeft: state => {
        console.log('moveLeft')
        state.items = state.items.map((item) => {
          return new Item(item.number - 1)
        })
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
          .filter(movie => movie.categoryId === categoryId)
      }
    }
  })
  const app = new Vue({
    el: '#app',
    template: `
      <div class="app">
        <top-menu></top-menu>
        <category></category>
      </div>`,
    store: store
  })

})(window, Vue, Vuex);
