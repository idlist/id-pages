import m from 'mithril'
import './back-to-top.sass'

import icon_arrow_up from '@/assets/arrow-up.svg'

const BackToTop: m.ClosureComponent = () => {
  const toTop = () => {
    document.body.scrollIntoView({ behavior: 'smooth' })
  }

  return {
    view() {
      return [
        m('div', { class: 'back-to-top' }, [
          m('a', {
            class: 'back-to-top-button',
            onclick: () => { toTop() },
          }, [
            m('img', {
              class: 'back-to-top-icon',
              src: icon_arrow_up,
              alt: 'back to top',
            }),
            'back to top',
          ]),
        ]),
        m('div', { class: 'back-to-top-padding' }),
      ]
    },
  }
}

export default BackToTop