import m from 'mithril'
import './header.sass'

import image_idlist from '@assets/idlist.png'
import icon_email from '@assets/icons/email.svg'
import icon_twitter from '@assets/icons/twitter.svg'
import icon_github from '@assets/icons/github.svg'
import icon_soundcloud from '@assets/icons/soundcloud.svg'

interface ContactListItemAttrs {
  name: string
  icon?: string
  id: string
  link: string
  color?: string
}

const ContactListContents: ContactListItemAttrs[] = [
  {
    name: 'Email',
    icon: icon_email,
    id: 'i@idl.ist',
    color: '#3A8FB7',
    link: 'mailto:i@idl.ist',
  },
]

const SocialMediaContents: ContactListItemAttrs[] = [
  {
    name: 'Twitter',
    icon: icon_twitter,
    id: '@i_dlist',
    color: '#58B2DC',
    link: 'https://twitter.com/i_dlist',
  },
  {
    name: 'GitHub',
    icon: icon_github,
    color: '#6F3381',
    id: 'i\'DLisT',
    link: 'https://github.com/idlist',
  },
  {
    name: 'SoundCloud',
    icon: icon_soundcloud,
    id: 'i\'DLisT',
    color: '#ED784A',
    link: 'https://soundcloud.com/idlist',
  },
]

const ContactListItem: m.ClosureComponent<ContactListItemAttrs> = () => {
  return {
    view({ attrs }) {
      return [
        m('a', {
          class: 'contact-list-item',
          href: attrs.link,
          rel: 'noopener noreferer',
        }, [
          m('div', { class: 'item-icon' }, [
            m('img', {
              class: 'item-icon-image',
              src: attrs.icon,
              alt: attrs.name,
            }),
          ]),
          m('div', {
            class: 'item-name',
            style: { backgroundColor: attrs.color },
          }, attrs.name),
          m('div', { class: 'item-id' }, attrs.id),
        ]),
      ]
    },
  }
}

const Header: m.ClosureComponent = () => {
  return {
    view() {
      return [
        m('header', { class: 'header' }, [
          m('div', { class: 'header-icon' }, [
            m('img', {
              class: 'header-icon-image',
              src: image_idlist,
              alt: 'idlist-icon',
            }),
          ]),
          m('div', { class: 'contact-list' }, [
            ...ContactListContents.map(item => [
              m(ContactListItem, { ...item }),
            ]),
            m('hr', { class: 'contact-list-divider' }),
            ...SocialMediaContents.map(item => [
              m(ContactListItem, { ...item }),
            ]),
          ]),
        ]),
      ]
    },
  }
}

export default Header