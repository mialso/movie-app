Vue.component('category', {
  template: `
    <div class="category">
      <div class="text next">
        <button v-on:click="next">\></button>
        <p>{{nextCategory.name}}</p>
      </div>
      <div class="current">
        <p>{{currentCategory.name}}</p>
        <movies :categoryId="currentCategory.id"></movies>
      </div>
      <div class="text prev">
        <p>{{prevCategory.name}}</p>
        <button v-on:click="prev">\<</button>
      </div>
    </div>`,
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
    }
  }
})
