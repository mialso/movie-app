Vue.component('topMenu', {
  template: '<div class="menu"><p>menu</p></div>'
})

Vue.component('category', {
  template: '<div class="category"><movies :categoryId="category.id"></movies></div>',
  computed: {
    category() {
      return this.$store.state.categories[0]
    }
  }
})

Vue.component('movies', {
  template: `
    <div class="content" v-on:wheel.stop="wheelHandler">
      <button 
        v-bind:style="{ visibility: scrollLeft ? 'visible' : 'hidden'}"
        v-on:click="moveLeft">
        \<
      </button>
      <div class="item" v-for="item in items">
        <movie :movie="movies[item.number]"></movie>
      </div>
      <button 
        v-bind:style="{ visibility: scrollRight ? 'visible' : 'hidden'}"
        v-on:click="moveRight">
        \>
      </button>
    </div>`,
  props: {
    categoryId: String
  },
  data() {
    return {
      scrollLeft: false,
      scrollRight: false
    }
  },
  created: function () {
    if (this.items.length < this.movies.length) this.scrollRight = true
  },
  beforeUpdate () {
    console.log('before update')
    if (this.items[0].number > 0) {
      this.scrollLeft = true
    } else {
      this.scrollLeft = false
    }
    if (this.items.slice(-1)[0].number + 1 >= this.movies.length) {
      this.scrollRight = false
    } else {
      this.scrollRight = true
    }
  },
  methods: {
    moveRight () {
      if (!this.scrollRight) return
      const movie = this.movies[this.items.slice(-1)[0].number]
      this.$store.dispatch('nextMovie', this.categoryId, movie.id)
    },
    moveLeft () {
      if (!this.scrollLeft) return
      const movieId = this.movies[this.items[0].number].id
      this.$store.dispatch('previousMovie', this.categoryId, movieId)
    },
    wheelHandler (e) {
      if (e.deltaY > 0) this.moveRight()
      if (e.deltaY < 0) this.moveLeft()
    }
  },
  computed: {
    items() {
      return this.$store.state.items
    },
    movies() {
      return this.$store.getters.getMoviesByCategory(this.categoryId)
    }
  }
})

Vue.component('movie', {
  template: `<div class="movie">{{movie.name}}</div>`,
  props: {
    movie: Object
  }
})
