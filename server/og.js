import { ventanas } from 'meteor/hacknlove:ventanas'
import { Meteor } from 'meteor/meteor'

const timestamp = Math.floor(Date.now() / 1000)

const portada = function (sink) {
  og(sink, {
    image: process.env.ROOT_URL + 'OG.jpg',
    width: 1200,
    height: 650
  })
}

const og = function (sink, data) {
  data = Object.assign({}, data, Meteor.settings.public.OG)
  sink.appendToHead(`
    <meta property="og:title" content="${data.title}"/>
    <title>${data.title}</title>
    <meta property="og:description" content="${data.description}"/>
    <meta property="og:image" itemprop="image" content="${data.image}"/>
    <meta property="og:image:secure_url" itemprop="image" content="${data.image}"/>
    <meta property="og:image:width" content="${data.width}"/>
    <meta property="og:image:height" content="${data.height}"/>
    <meta property="og:updated_time" content="${timestamp}" />
  `)
}

ventanas.use('/', portada)

ventanas.use('/:seccion(/)', function (sink, match, v) {
  if (!Meteor.settings.public.programa[match.seccion]) {
    return portada(sink)
  }
  og(sink, {
    title: Meteor.settings.public.programa.menu[match.seccion],
    description: Meteor.settings.public.programa.secciones[match.seccion],
    image: process.env.ROOT_URL + 'OG.jpg',
    width: 1200,
    height: 650
  })
})

ventanas.use('/:seccion/:propuesta(/)', function (sink, match, v) {
  if (!Meteor.settings.public.programa[match.seccion]) {
    return portada(sink)
  }
  if (!Meteor.settings.public.programa[match.seccion][match.propuesta]) {
    return portada(sink)
  }

  og(sink, {
    title: Meteor.settings.public.programa[match.seccion][match.propuesta].vistaPrevia.titulo,
    description: Meteor.settings.public.programa[match.seccion][match.propuesta].vistaPrevia.descripcion,
    image: `https://i.ytimg.com/vi/${Meteor.settings.public.programa[match.seccion][match.propuesta].vistaPrevia.video}/maxresdefault.jpg;`,
    width: '1280',
    height: '720'
  })
})
