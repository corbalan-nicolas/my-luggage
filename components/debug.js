const componentDebug = {
  template: `
    <div class="debug">
      <button class="debug__action" title="Marcar el outline de todos los elementos" @click="outlineElements()">
        <Icon name="outline"></Icon>
      </button>
      <button class="debug__action" @click="hideDebug()">
        <Icon name="eye-off"></Icon>
      </button>
    </div>
  `,
  methods: {
    outlineElements: function() {
      document.body.classList.toggle('outline')
    },
    hideDebug: function() {
      document.querySelector('.debug')?.classList.remove('active')
    }
  },
  mounted: function() {
    window.addEventListener('keydown', event => {
      if(event.altKey && event.shiftKey && event.key === 'D') {
        document.querySelector('.debug')?.classList.toggle('active')
      }
    })
  }
}