import { Template } from 'meteor/templating'
import { ventanas } from 'meteor/hacknlove:ventanas'
import datos from '/common/programa.json'

Template.menu.onCreated(function () {
  ventanas.conf('path', '/')
})

Template.menu.helpers({
  menu () {
    return Object.keys(datos.menu).map(e => ({
      seccion: e,
      titulo: datos.menu[e]
    }))
  }
})
