import m from 'mithril'
import './about.sass'
import SectionTitle from './section-title'
import { LastUpdate, CopyrightYears } from '../constants'

import icon_un1c0de from '@/assets/links/un1c0de.png'

interface LinksListItem {
  site: string,
  icon: string,
  link: string
}

const LinksList: LinksListItem[] = [
  {
    site: 'UN1C0DE',
    icon: 'un1c0de',
    link: icon_un1c0de,
  },
]

const About: m.ClosureComponent = () => {
  return {
    view() {
      return [
        m(SectionTitle, { title: 'About' }),
        m('div', { class: 'about-links' }, [
          m('div', { class: 'title' }, 'Links'),
          m('div', { class: 'contents' }, [
            ...LinksList.map(item => [
              m('a', {
                class: 'contents-link',
                href: item.link,
                title: item.site,
                target: '_blank',
                rel: 'noopener noreferer',
              }, [
                m('img', {
                  class: 'contents-link-image',
                  src: item.link,
                  alt: item.site,
                }),
              ]),
            ]),
          ]),
        ]),
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
        ]),
      ]
    },
  }
}

export default About