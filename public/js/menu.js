Vue.component('topMenu', {
  template: `
    <div class="top-menu">
      <div class="name">cinema halls</div>
      <div class="time">
        <div style="display: inline-block">
          <div>{{date}}</div>
          <div>{{day}}</div>
        </div>
        <span>|</span>
        <span>{{time}}</span>
      </div>
    </div>`,
  data: function () {
    return {
      day: '',
      date: '',
      time: '',
      intervalId: null
    }
  },
  created () {
    console.log('create')
    this.updateTime()
    this.timer = window.setInterval(this.updateTime, 60000)
  },
  beforeUpdate () {
  },
  destroyed () {
    console.log('destroy')
  },
  methods: {
    updateTime () {
      console.log('update time')
      const date = new Date()
      this.day = this.getDayName(date.getDay())
      this.date = `${date.getDate()} ${this.getMonthName(date.getMonth())}`
      // TODO refactor all this
      this.time = `${this.getHours(date.getHours())}:${this.getHours(date.getMinutes())}`
    },
    getHours (hours) {
      if(1 === hours.toString().length) return `0${hours}`
      return `${hours}`
    },
    getDayName (dayNum) {
      switch (dayNum) {
        case 0: return 'sunday'
        case 1: return 'monday'
        case 2: return 'tuesday'
        case 3: return 'wednesday'
        case 4: return 'thursday'
        case 5: return 'friday'
        case 6: return 'saturday'
        default: return ''
      }
    },
    getMonthName (monthNum) {
      switch (monthNum) {
        case 0: return 'Jan'
        case 1: return 'Feb'
        case 2: return 'Mar'
        case 3: return 'Apr'
        case 4: return 'May'
        case 5: return 'Jun'
        case 6: return 'Jul'
        case 7: return 'Aug'
        case 8: return 'Sep'
        case 9: return 'Oct'
        case 10: return 'Nov'
        case 11: return 'Dec'
        default: return ''
      }
    }
  }
})
