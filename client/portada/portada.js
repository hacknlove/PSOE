import { Template } from 'meteor/templating'
import { ventanas } from 'meteor/hacknlove:ventanas'
import { Meteor } from 'meteor/meteor'
const datos = Meteor.settings.public.programa

Template.portada.onCreated(function () {
  ventanas.conf('path', '/')
  ventanas.close('seccion')
  ventanas.close('propuesta')
})

Template.portada.helpers({
  portada () {
    return Object.keys(datos.menu).map(e => ({
      seccion: e,
      titulo: datos.menu[e]
    }))
  }
})
