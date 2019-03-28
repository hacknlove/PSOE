import { ventanas } from 'meteor/hacknlove:ventanas'
import { Template } from 'meteor/templating'

ventanas.upsert({
  _id: 'portada'
}, {
  $inc: {
    times: 1
  }
})
ventanas.updateUrl()

Template.portada.events({
  'animationend #logo' () {
    ventanas.close('portada')
    ventanas.insert({ _id: 'menu' })
  }
})
