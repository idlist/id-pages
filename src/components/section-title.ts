import m from 'mithril'
import './section-title.sass'

interface SectionTitleAttrs {
  title?: string
}

const SectionTitle: m.ClosureComponent<SectionTitleAttrs> = () => {
  return {
    view({ attrs }) {
      return [
        m('h2', { class: 'section-title' }, [
          attrs.title
            ? [
              m('div', { class: 'section-title-side' }),
              m('div', { class: 'section-title-text' }, attrs.title),
              m('div', { class: 'section-title-side' }),
            ]
            : [
              m('div', { class: 'section-title-divider' }),
            ],
        ]),
      ]
    },
  }
}

export default SectionTitle