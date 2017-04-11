;(function(window, Vue, Vuex) {
  function Item (number) {
    this.number = number
  }
  function calculateItems () {
    const initialItems = []
    for (let i = 0; i <= window.innerWidth / 120; ++i) {
      initialItems.push(new Item(i))
    }
    return initialItems
  }

  const store = new Vuex.Store({
    state: {
      items: calculateItems()
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
    }
  })
  const app = new Vue({
    el: '#app',
    computed: {
      items () {
        return store.state.items
      }
    },
    methods: {
      moveRight () {
        store.commit('moveRight')
      },
      moveLeft () {
        store.commit('moveLeft')
      },
      wheelHandler (e) {
        if (e.deltaY > 0) this.moveRight()
        if (e.deltaY < 0) this.moveLeft()
      }
    }
  })

})(window, Vue, Vuex);
