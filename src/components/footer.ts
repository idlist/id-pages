import m from 'mithril'
import './footer.sass'
import { LastUpdate, CopyrightYears } from '@/constants'

import icon_arrow_up from '@/assets/arrow-up.svg'

const BackToTop: m.ClosureComponent = () => {
  const toTop = () => {
    document.body.scrollIntoView({ behavior: 'smooth' })
  }

  return {
    view() {
      return [
        m('footer', { class: 'footer' }, [
          m('div', { class: 'credits' }, [
            m('div', `i'DLisT © ${CopyrightYears}`),
            m('a', {
              class: 'credits-email',
              href: 'mailto:i@idl.ist',
              rel: 'noopener noreferer',
            }, 'i@idl.ist'),
            m('div', { class: 'credits-divider' }),
            m('div', `Last Update: ${LastUpdate}`),
          ]),
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
        ]),
      ]
    },
  }
}

export default BackToTop