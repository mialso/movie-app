Vue.component('movies', {
  template: `
    <div class="content"
      v-bind:class="{active}"
      v-on:wheel.stop="wheelHandler"
      v-on:mouseenter="handleMouseEnter"
      v-on:mouseleave="handleMouseLeave"
      >
      <svg v-on:click="moveLeft" width="25px" height="200px"
        v-bind:style="{ visibility: scrollLeft ? 'visible' : 'hidden'}">
        <path class="svg-button" 
          d="M25,0 L0,100 L25,200"
          style="stroke-width: 3px; fill:none;"
        />
      </svg>
      <div v-if="loading">Loading...</div>
      <template v-else>
      <div
        v-for="(item, index) in items" :key="item.number"
        v-bind:class="{active: index  === 1, empty: movies.length <= item.number}"
        class="item">
        <movie v-if="movies[item.number]" :movie="movies[item.number]"></movie>
      </div>
      </template>
      <svg v-on:click="moveRight" width="25px" height="200px"
        v-bind:style="{ visibility: scrollRight ? 'visible' : 'hidden'}">
        <path class="svg-button" 
          d="M0,0 L25,100 L0,200"
          style="stroke-width: 3px; fill:none;"
        />
      </svg>
      </button>
    </div>`,
  props: {
    categoryId: String
  },
  data() {
    return {
      scrollLeft: false,
      scrollRight: false,
      active: false
    }
  },
  created: function () {
    if (this.items.length < this.movies.length) this.scrollRight = true
  },
  beforeUpdate () {
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
    },
    handleMouseEnter () {
      this.active = true
    },
    handleMouseLeave () {
      this.active = false
    }
  },
  computed: {
    items() {
      return this.$store.state.items || []
    },
    movies() {
      return this.$store.getters.getMoviesByCategory(this.categoryId).sort((m1, m2) => m1.showTime - m2.showTime)
    },
    loading() {
      return this.$store.state.loading
    }
  }
})
