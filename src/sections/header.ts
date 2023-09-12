import m from 'mithril'
import './header.sass'

import image_idlist from '@/assets/idlist.png'
import icon_email from '@/assets/header/email.svg'
import icon_blog from '@/assets/header/blog.svg'
import icon_discord from '@/assets/header/discord.svg'
import icon_twitter from '@/assets/header/twitter.svg'
import icon_soundcloud from '@/assets/header/soundcloud.svg'
import icon_github from '@/assets/header/github.svg'

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
    color: '#3081e3',
    link: 'mailto:i@idl.ist',
  },
  {
    name: 'Blog',
    icon: icon_blog,
    id: 'i\'D Blog',
    color: '#53A820',
    link: 'https://blog.idl.ist/',
  },
  {
    name: 'Discord',
    icon: icon_discord,
    id: 'i_dlist',
    color: '#7289DA',
    link: 'https://discord.com/',
  },
]

const SocialMediaContents: ContactListItemAttrs[] = [
  {
    name: 'Twitter',
    icon: icon_twitter,
    id: '@i_dlist',
    color: '#50b6e6',
    link: 'https://twitter.com/i_dlist',
  },
  {
    name: 'GitHub',
    icon: icon_github,
    color: '#ae62c4',
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
          class: 'contact-list-item end',
          href: attrs.link,
          rel: 'noopener noreferer',
        }, [
          m('div', {
            class: 'item-name',
            style: { backgroundColor: attrs.color },
          }, attrs.name),
        ]),
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
          m('div', { class: 'header-left' }, [
            m('div', { class: 'header-icon' }, [
              m('img', {
                class: 'header-icon-image',
                src: image_idlist,
                alt: 'idlist-icon',
              }),
            ]),
            m('div', { class: 'header-brief' }, [
              m('p', [
                m('span', { class: 'gender-icon' }, '♂'),
                m('span', { class: 'vertical-divider' }),
                '25 y.o.',
              ]),
              m('p', { class: 'slogan' }, '/*IDEALIST*/'),
            ]),
          ]),
          m('div', { class: 'contact-list' }, [
            ...ContactListContents.map((item) => [
              m(ContactListItem, { ...item }),
            ]),
            m('hr', { class: 'contact-list-divider' }),
            ...SocialMediaContents.map((item) => [
              m(ContactListItem, { ...item }),
            ]),
          ]),
        ]),
      ]
    },
  }
}

export default Header