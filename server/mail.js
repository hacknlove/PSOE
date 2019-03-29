/* global  Assets */

import { _ } from 'meteor/underscore'
import { Email } from 'meteor/email'

const fs = require('fs')

const emails = {
  contacto: _.template(Assets.getText('contacto.html'))
}
const emailsText = {
  contacto: _.template(Assets.getText('contacto.text'))
}

export const enviarEmail = function (email) {
  email.ROOT_URL = process.env.ROOT_URL
  return Email.send({
    from: email.from,
    cc: email.cc,
    bcc: email.bcc,
    to: email.correo,
    subject: email.asunto,
    text: emailsText[email.template](email),
    html: emails[email.template](email),
    attachments: email.attachments
  })
}

export const adjuntarPrivado = function (config) {
  return {
    filename: config.filename,
    content: fs.createReadStream(Assets.absoluteFilePath(config.ruta))
  }
}
