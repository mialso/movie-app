Vue.component('movie', {
  template: `
    <div class="movie">
      <div v-bind:class="movie.movieClass"></div>
      <div class="foot">
        <div class="movie-name">{{movie.name}}</div>
        <div class="movie-info">
           <svg><use xlink:href="#bell" transform="rotate(45, 20, 20)"></use></svg>
           <div class="movie-time">{{movieTime}}</div>
        </div>
      </div>
    </div>`,
  computed: {
    movieTime() {
      const hourMsec = 1000 * 60 * 60
      const minuteMsec = 1000 * 60
      const nowDate = new Date(this.$store.state.appTime)
      const showDate = new Date(this.movie.showTime)
      const today = nowDate.getDate() === showDate.getDate()
      if (today) {
        let timeString = 'in '
        const timeDiff = this.movie.showTime - nowDate.getTime()
        const inHours = timeDiff / hourMsec
        if (1 <= inHours) timeString += `${Math.floor(inHours)} h `
        const inMinutes = (timeDiff % hourMsec) / minuteMsec
        timeString += `${Math.floor(inMinutes)} min`
        return timeString
      } else {
        const hours = (showDate.getHours() < 10)
          ? `0${showDate.getHours()}` 
          : `${showDate.getHours()}`
        const minutes = (showDate.getMinutes() < 10)
          ? `0${showDate.getMinutes()}`
          : `${showDate.getMinutes()}`
        
        return `tomorrow at ${hours}:${minutes}`
      }
    }
  },
  props: {
    movie: Object
  }
})
