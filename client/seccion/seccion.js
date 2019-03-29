import { Template } from 'meteor/templating'
import { ventanas } from 'meteor/hacknlove:ventanas'
import { Meteor } from 'meteor/meteor'
const datos = Meteor.settings.public.programa

Template.seccion.onCreated(function () {
  ventanas.conf('path', `/${this.data.seccion}`)
  ventanas.close('portada')
  ventanas.close('propuesta')
})

Template.seccion.helpers({
  titulo () {
    return datos.menu[this.seccion]
  },
  propuestas () {
    const seccion = datos[this.seccion]
    return Object.keys(seccion).map(e => ({
      seccion: this.seccion,
      propuesta: e,
      vistaPrevia: seccion[e].vistaPrevia
    }))
  }
})
