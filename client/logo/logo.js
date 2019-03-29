/* global location */

import { ventanas } from 'meteor/hacknlove:ventanas'
import { Template } from 'meteor/templating'
import UrlPaterrn from 'url-pattern'
import { Meteor } from 'meteor/meteor'
const datos = Meteor.settings.public.programa

const iniciarUrl = function encontrarSeccion (path) {
  const propuesta = (new UrlPaterrn('/:seccion(/:propuesta(/))')).match(path)
  if (!propuesta) {
    return
  }
  if (!datos[propuesta.seccion]) {
    return
  }

  if (propuesta.propuesta && !datos[propuesta.seccion][propuesta.propuesta]) {
    return
  }

  ventanas.conf('seccion', propuesta.seccion)
  ventanas.conf('propuesta', propuesta.propuesta)
}
iniciarUrl(location.pathname)

ventanas.upsert({
  _id: 'logo'
}, {
  $inc: {
    times: 1
  }
})
ventanas.updateUrl()

Template.logo.events({
  'animationend #logo' () {
    ventanas.close('logo')
    const propuesta = ventanas.conf('propuesta')
    const seccion = ventanas.conf('seccion')
    ventanas.update('c', {
      $unset: {
        seccion: 1,
        propuesta: 1
      }
    })
    if (propuesta) {
      return ventanas.insert({
        _id: 'propuesta',
        seccion,
        propuesta
      })
    }
    if (seccion) {
      return ventanas.insert({
        _id: 'seccion',
        seccion
      })
    }
    ventanas.insert({ _id: 'portada' })
  }
})
