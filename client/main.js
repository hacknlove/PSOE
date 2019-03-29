import { Template } from 'meteor/templating'

import { Meteor } from 'meteor/meteor'
const datos = Meteor.settings.public.programa

Template.registerHelper('datos', function () {
  return datos
})

Template.registerHelper('arrayIndex', function (array, index) {
  return array[index]
})

window.onPlayerReady = function onPlayerReady (event) {
  console.log('YT ready')
}
