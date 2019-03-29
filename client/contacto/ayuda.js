import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { ventanas } from 'meteor/hacknlove:ventanas'

Template.contacto.events({
  'submit form' (event, template) {
    event.preventDefault()
    var data = template.$('form').validarFormulario()
    if (data.error) {
      return
    }
    ventanas.wait(template)
    Meteor.call('contacto', data.problema, function (e, r) {
      if (e) {
        ventanas.unwait(template)
        return ventanas.insert({
          template: 'alerta',
          error: 1,
          titulo: 'Error:',
          contenido: 'No se ha posido enviar el mensaje, inténtalo en unos minutos.'
        })
      }
      ventanas.close(template)
      ventanas.insert({
        template: 'alerta',
        titulo: 'Mensaje enviado:',
        contenido: 'Tu mensaje ha sido enviado.<br></br>Gracias por tu ayuda.'
      })
    })
  }
})
