Vue.component('category', {
  template: `
    <div class="category"
      v-bind:class="{active}"
      >
      <div class="text next"
        v-on:wheel.stop="wheelHandler"
        v-on:mouseenter="handleMouseEnter"
        v-on:mouseleave="handleMouseLeave">
        <svg v-on:click="next" width="300px" height="90px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
            <linearGradient id="catName1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#000;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#fff;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path class="svg-button" 
            d="M20,20 L70,0 L120,20"
            style="stroke-width: 3px; fill:none;"
          />
          <text fill="url(#catName1)" font-size="40px" x="0" y="60">{{nextCategory.name}}</text>
        </svg>
      </div>
      <div class="text current"
        v-on:wheel.stop="wheelHandler"
        v-on:mouseenter="handleMouseEnter"
        v-on:mouseleave="handleMouseLeave">
        <div class="name">{{currentCategory.name}}</div>
      </div>
      <movies :categoryId="currentCategory.id"></movies>
      <div class="text prev"
        v-on:wheel.stop="wheelHandler"
        v-on:mouseenter="handleMouseEnter"
        v-on:mouseleave="handleMouseLeave">
        <svg v-on:click="prev" width="300px" height="90px" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
            <linearGradient id="catName2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#fff;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#000;stop-opacity:1" />
            </linearGradient>
          </defs>
          <text fill="url(#catName2)" font-size="40px" x="0" y="50">{{prevCategory.name}}</text>
          <path class="svg-button" 
            d="M20,70 L70,80 L120,70"
            style="stroke-width: 3px; fill:none;"
          />
        </svg>
      </div>
    </div>`,
  data: function () {
    return {
      active: false
    }
  },
  computed: {
    items () { return this.$store.state.catItems },
    nextCategory () { return this.$store.state.categories[this.items[0].number] },
    prevCategory () { return this.$store.state.categories[this.items[2].number] },
    currentCategory() { return this.$store.state.categories[this.items[1].number] }
  },
  methods: {
    next () {
      this.$store.commit('moveDown')
    },
    prev () {
      this.$store.commit('moveUp')
    },
    wheelHandler (e) {
      if (e.deltaY > 0) this.prev()
      if (e.deltaY < 0) this.next()
    },
    handleMouseLeave () {
      this.active = false
    },
    handleMouseEnter () {
      this.active = true
    }
  }
})
