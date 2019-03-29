import { Template } from 'meteor/templating'
import { ventanas } from 'meteor/hacknlove:ventanas'
import { Meteor } from 'meteor/meteor'
const datos = Meteor.settings.public.programa

Template.propuesta.onCreated(function () {
  ventanas.conf('path', `/${this.data.seccion}/${this.data.propuesta}`)
})

Template.propuesta.helpers({
  titulo () {
    return datos.menu[this.seccion]
  },
  propuesta () {
    return datos[this.seccion][this.propuesta]
  }
})
