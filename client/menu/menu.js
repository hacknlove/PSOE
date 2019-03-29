import { Template } from 'meteor/templating'
import { ventanas } from 'meteor/hacknlove:ventanas'
import { Meteor } from 'meteor/meteor'
import ClipboardJS from 'clipboard'

function esMovil () {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  return /android/i.test(userAgent) || (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
}

Template.menu.helpers({
  volver () {
    const propuesta = ventanas.findOne('propuesta')
    if (propuesta) {
      return {
        _id: 'seccion',
        seccion: propuesta.seccion,
        aDonde: 'Seccion'
      }
    }
    if (ventanas.findOne('seccion')) {
      return {
        _id: 'portada',
        aDonde: 'Portada'
      }
    }
  }
})

Template.menuInformacion.helpers({
  URLS () {
    return Meteor.settings.public.URLS
  }
})

Template.menuInformacion.events({
  'click .link' (e) {
    window.open(e.currentTarget.dataset.href)
  }
})

Template.menuCompartir.onRendered(function () {
  this.clipboard = new ClipboardJS(this.$('.js-copiar')[0], {
    text (trigger) {
      ventanas.insert({
        template: 'alerta',
        titulo: 'Copiado',
        contenido: 'La url ha sido copiada al portapaleles'
      })
      return _getURL()
    }
  })
})
Template.menuCompartir.onDestroyed(function () {
  this.clipboard.destroy()
})

Template.menuCompartir.events({
  'click .js-compartir' (event) {
    console.log(event.currentTarget.dataset.type)
    window.open(social[event.currentTarget.dataset.type]())
  }
})

const _getURL = function () {
  const compartir = ventanas.findOne('menuCompartir').pathname || window.location.pathname
  return window.__meteor_runtime_config__.ROOT_URL + compartir
}

export const social = {
  facebook () {
    return `https://www.facebook.com/sharer.php?u=${encodeURIComponent(_getURL())}`
  },
  linkedin () {
    return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(_getURL())}`
  },
  twitter () {
    const url = _getURL()
    return `http://twitter.com/share?&url=${encodeURIComponent(url)}&counturl=${encodeURIComponent(url)}`
  },
  telegram () {
    return `https://telegram.me/share/url?url=${encodeURIComponent(_getURL())}}`
  },
  whatsapp () {
    if (esMovil()) {
      return `https://wa.me/?text=${encodeURIComponent(_getURL())}`
    }
    return `https://web.whatsapp.com/send?text=${encodeURIComponent(_getURL())}`
  },
  viber () {
    return `viber://forward?text=${encodeURIComponent(_getURL())}`
  },
  skype () {
    return `'https://web.skype.com/share?url=${encodeURIComponent(_getURL())}`
  },
  line () {
    return `https://lineit.line.me/share/ui?url=${encodeURIComponent(_getURL())}`
  },
  gmail () {
    return `https://mail.google.com/mail/u/0/?view=cm&fs=1&body=${encodeURIComponent(_getURL())}&tf=1`
  },
  whatsappGeneral () {
    if (esMovil()) {
      return `https://wa.me/34651580030`
    }
    return `https://web.whatsapp.com/send?phone=34651580030`
  }
}
