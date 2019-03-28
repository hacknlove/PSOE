/* global location */

import { Template } from 'meteor/templating'
import { ventanas } from 'meteor/hacknlove:ventanas'
import datos from '/common/programa.json'
import UrlPaterrn from 'url-pattern'

Template.seccion.onCreated(function () {
  ventanas.conf('path', `/${this.data.seccion}`)
})

Template.seccion.helpers({
  titulo () {
    return datos.menu[this.seccion]
  },
  propuestas () {
    return datos[this.seccion]
  }
})
const encontrarSeccion = function encontrarSeccion (path) {
  const seccion = (new UrlPaterrn('/:seccion(/)')).match(path)
  if (!seccion) {
    return
  }

  if (!datos.menu[seccion.seccion]) {
    return
  }
  console.log(seccion.seccion)
  ventanas.conf('seccion', seccion.seccion)
}
encontrarSeccion(location.pathname)
