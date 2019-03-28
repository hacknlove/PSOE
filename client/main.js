import { Template } from 'meteor/templating'
import datos from '/common/programa.json'

Template.registerHelper('datos', function () {
  return datos
})
