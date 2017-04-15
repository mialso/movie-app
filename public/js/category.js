Vue.component('category', {
  template: `
    <div class="category"
      v-bind:class="{active}"
      >
      <div class="text next"
        v-on:wheel.stop="wheelHandler"
        v-on:mouseenter="handleMouseEnter"
        v-on:mouseleave="handleMouseLeave">
        <svg v-on:click="next" width="100px" height="20px">
          <path class="svg-button" 
            d="M0,20 L50,0 L100,20"
            style="stroke-width: 3px; fill:none;"
          />
        </svg>
        <p>{{nextCategory.name}}</p>
      </div>
      <div class="current">
        <p>{{currentCategory.name}}</p>
        <movies :categoryId="currentCategory.id"></movies>
      </div>
      <div class="text prev"
        v-on:wheel.stop="wheelHandler"
        v-on:mouseenter="handleMouseEnter"
        v-on:mouseleave="handleMouseLeave">
        <p>{{prevCategory.name}}</p>
        <svg v-on:click="prev" width="100px" height="20px">
          <path class="svg-button" 
            d="M0,0 L50,10 L100,0"
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
      this.$store.commit('moveUp')
    },
    prev () {
      this.$store.commit('moveDown')
    },
    wheelHandler (e) {
      if (e.deltaY > 0) this.next()
      if (e.deltaY < 0) this.prev()
    },
    handleMouseLeave () {
      this.active = false
    },
    handleMouseEnter () {
      this.active = true
    }
  }
})
