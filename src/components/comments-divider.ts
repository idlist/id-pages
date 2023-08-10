import m from 'mithril'
import './comments-divider.sass'

interface CommentsDividerAttrs {
  name?: string
  margin?: {
    x?: string
    y?: string
  }
}

const CommentsDivider: m.ClosureComponent<CommentsDividerAttrs> = () => {
  return {
    view({ attrs }) {
      console.log(attrs)
      return [
        m('div', {
          class: 'comments-divider',
          style: {
            marginTop: attrs.margin?.x,
            marginBottom: attrs.margin?.x,
            marginLeft: attrs.margin?.y,
            marginRight: attrs.margin?.y,
          },
        }, [
          m('div', { class: 'comments-divider-line' }),
          m('div', { class: 'comments-divider-text' }, attrs.name ?? 'comments'),
          m('div', { class: 'comments-divider-line' }),
        ]),
      ]
    },
  }
}

export default CommentsDivider