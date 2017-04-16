Vue.component('movie', {
  template: `
    <div class="movie" v-bind:class="{'my-choice': movie.choosen}">
      <div v-bind:class="movie.movieClass"></div>
      <div class="foot">
        <div class="movie-name">{{movie.name}}</div>
        <div class="movie-info">
          <svg v-on:click="handleBellAction">
            <use xlink:href="#bell" transform="rotate(45, 20, 20) scale(0.9)"></use>
          </svg>
          <div class="movie-time">
            {{movieTime.prefix}}
            <span>{{movieTime.timeString}}</span>
          </div>
        </div>
      </div>
    </div>`,
  computed: {
    movieTime() {
      const movieTime = {prefix: '', timeString: ''}
      const hourMsec = 1000 * 60 * 60
      const minuteMsec = 1000 * 60
      const nowDate = new Date(this.$store.state.appTime)
      const showDate = new Date(this.movie.showTime)
      const today = nowDate.getDate() === showDate.getDate()
      if (today) {
        movieTime.prefix = 'in'
        const timeDiff = this.movie.showTime - nowDate.getTime()
        const inHours = timeDiff / hourMsec
        if (1 <= inHours) movieTime.timeString += `${Math.floor(inHours)} h`
        const inMinutes = (timeDiff % hourMsec) / minuteMsec
        movieTime.timeString += ` ${Math.floor(inMinutes)} min`
      } else {
        movieTime.prefix = 'tomorrow at'
        const hours = (showDate.getHours() < 10)
          ? `0${showDate.getHours()}` 
          : `${showDate.getHours()}`
        const minutes = (showDate.getMinutes() < 10)
          ? `0${showDate.getMinutes()}`
          : `${showDate.getMinutes()}`
        
        movieTime.timeString = `${hours}:${minutes}`
      }
      return movieTime
    }
  },
  methods: {
    handleBellAction () {
      console.log(`bell action: ${this.movie.choosen}`)
      this.$store.dispatch('toggleMovieSelection', this.movie.id)
    }
  },
  props: {
    movie: Object
  }
})
