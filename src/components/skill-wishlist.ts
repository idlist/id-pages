import m from 'mithril'
import './skill-wishlist.sass'
import SectionTitle from './section-title'

import icon_dart from '@assets/skill-wishlist/dart.svg'
import icon_flutter from '@assets/skill-wishlist/flutter.svg'
import icon_rust from '@assets/skill-wishlist/rust.svg'
import icon_blender from '@assets/skill-wishlist/blender.svg'

interface WishlistSkill {
  name: string
  icon?: string
  link?: string
}

const WishlistContent: WishlistSkill[] = [
  {
    name: 'Dart',
    icon: icon_dart,
    link: 'https://dart.dev/',
  },
  {
    name: 'Flutter',
    icon: icon_flutter,
    link: 'https://flutter.dev/',
  },
  {
    name: 'Rust',
    icon: icon_rust,
    link: 'https://www.rust-lang.org/',
  },
  {
    name: 'Blender',
    icon: icon_blender,
    link: 'https://www.blender.org/',
  },
]

type SkillItemNameAttrs = WishlistSkill

const SkillItemName: m.ClosureComponent<SkillItemNameAttrs> = () => {
  return {
    view({ attrs }) {
      return [
        m('div', { class: 'item-icon' }, [
          attrs.icon && [
            m('img', {
              class: 'item-icon-image',
              src: attrs.icon,
              alt: attrs.name,
            }),
          ],
        ]),
        m('div', { class: attrs.link && 'item-link-text' }, attrs.name),
      ]
    },
  }
}

type SkillItemAttrs = WishlistSkill

const SkillItem: m.ClosureComponent<SkillItemAttrs> = () => {
  return {
    view({ attrs }) {
      return [
        attrs.link
          ? [
            m('a', {
              class: 'item',
              href: attrs.link,
              target: '_blank',
              rel: 'noopener noreferer',
            }, [
              m(SkillItemName, { ...attrs }),
            ]),
          ]
          : [
            m('div', { class: 'item' }, [
              m(SkillItemName, { ...attrs }),
            ]),
          ],
      ]
    },
  }
}

const SkillWishlist: m.ClosureComponent = () => {
  return {
    view() {
      return [
        m(SectionTitle, { title: 'Skill Wishlist' }),
        m('div', { class: 'skill-wishlist' }, [
          m('div', { class: 'skill-wishlist-list' }, [
            ...WishlistContent.map(item => [
              m(SkillItem, { ...item }),
            ]),
          ]),
          m('div', { class: 'skill-wishlist-gossip' }, [
            m('p', 'Wish someday I would actually have a chance'),
            m('p', 'to take a look at them...'),
          ]),
        ]),
      ]
    },
  }
}

export default SkillWishlist