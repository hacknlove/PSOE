/* global YT */
import { _ } from 'meteor/underscore'
import { Template } from 'meteor/templating'
const onStateChange = _.debounce(function (event) {
  console.log(event)
  switch (event.data) {
    case YT.PlayerState.UNSTARTED:
      break
    case YT.PlayerState.ENDED:
      document.exitFullscreen()
      break
    case YT.PlayerState.PLAYING:
      break
    case YT.PlayerState.PAUSED:
      document.exitFullscreen()
      break
    case YT.PlayerState.BUFFERING:
      break
    case YT.PlayerState.CUED:
      break
  }
}, 300)

Template.youtube.onRendered(function () {
  this.player = new YT.Player(this.$('iframe')[0], {
    events: {
      onStateChange
    }
  })
})

Template.youtube.events({
  'click .cover .play' (event, template) {
    template.$('iframe')[0].requestFullscreen()
    template.player.playVideo()
  },
  'fullscreenchange iframe' (event, template) {
    if (document.fullscreenElement === null) {
      return template.player.pauseVideo()
    }
    if (document.fullscreenElement.id !== template.$('iframe')[0].id) {
      return template.player.pauseVideo()
    }
  }
})
