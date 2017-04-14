Vue.component('movies', {
  template: `
    <div class="content" v-on:wheel.stop="wheelHandler">
      <button 
        v-bind:style="{ visibility: scrollLeft ? 'visible' : 'hidden'}"
        v-on:click="moveLeft">
        \<
      </button>
      <div v-if="loading">Loading...</div>
      <template v-else>
      <div
        v-for="(item, index) in items" :key="item.number"
        v-bind:class="index  === 1 ? 'active' : ''"
        class="item">
        <movie v-if="movies[item.number]" :movie="movies[item.number]"></movie>
      </div>
      </template>
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
      return this.$store.state.items || []
    },
    movies() {
      return this.$store.getters.getMoviesByCategory(this.categoryId)
    },
    loading() {
      return this.$store.state.loading
    }
  }
})

Vue.component('movie', {
  template: `
    <div class="movie">
      <div v-bind:class="movie.movieClass"></div>
      <p>{{movie.name}}</p>
    </div>`,
  data() {
    return { movieClass: 'icon'}
  },
  props: {
    movie: Object
  }
})
