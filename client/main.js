import { Template } from 'meteor/templating'
import datos from '/common/programa.json'

Template.registerHelper('datos', function () {
  return datos
})

Template.registerHelper('arrayIndex', function (array, index) {
  return array[index]
})
