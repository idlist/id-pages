import m from 'mithril'
import stream from 'mithril/stream'
import { throttle } from 'lodash-es'
import './logo-design.sass'
import SectionTitle from './section-title'
import CommentsDivider from './comments-divider'

import logo_idlist from '@/assets/logo-design/idlist.png'
import logo_eazytune from '@/assets/logo-design/eazy-tune.png'
import logo_echquale from '@/assets/logo-design/echquale.png'
import logo_rewl from '@/assets/logo-design/rewl.png'
import logo_bouncehall from '@/assets/logo-design/bounce-hall.png'
import logo_cursive from '@/assets/logo-design/curs1ve.png'
import logo_studio96 from '@/assets/logo-design/studio-96th.png'

interface LogoCardAttrs {
  path: string
  name: string
  selected: boolean
  onselected(value: boolean): void
}

const LogoCard: m.ClosureComponent<LogoCardAttrs> = () => {
  return {
    view({ attrs }) {
      return [
        m('div', {
          class: `logo-card ${attrs.selected ? 'selected' : ''}`,
          onclick() { attrs.onselected(!attrs.selected) },
        }, [
          m('img', {
            class: 'logo-card-content',
            src: attrs.path,
            alt: attrs.name,
          }),
        ]),
      ]
    },
  }
}

interface LogoCommentsAttrs {
  name: string
}

const LogoComments: m.ClosureComponent<LogoCommentsAttrs> = () => {
  return {
    view({ attrs, children }) {
      return [
        m('div', { class: 'logo-comments' }, [
          m('h3', { class: 'logo-comments-title' }, attrs.name),
          m(CommentsDivider, { margin: { x: '0', y: '0' } }),
          children,
        ]),
      ]
    },
  }
}

interface LogoListItem {
  path: string
  name: string
  comments?: m.Children
}

const LogoList: LogoListItem[] = [
  {
    path: logo_idlist,
    name: 'i\'DLisT',
  },
  {
    path: logo_eazytune,
    name: 'Eazy Tune',
  },
  {
    path: logo_echquale,
    name: 'echquale',
  },
  {
    path: logo_rewl,
    name: 'rewl',
  },
  {
    path: logo_bouncehall,
    name: 'Bounce Hall',
  },
  {
    path: logo_cursive,
    name: 'Curs1ve',
  },
  {
    path: logo_studio96,
    name: 'Studio 96th',
  },
]

interface CardCommentType {
  name: string
  comments?: m.Children
}

const LogoDesign: m.ClosureComponent = () => {
  const nCards = LogoList.length
  const nColumns = stream<number>()
  const nRows = nColumns.map((value) => Math.ceil(nCards / value))

  const statusCards: boolean[] = Array(nCards)
  let statusRows: boolean[] = Array(nRows())

  const cardComment: CardCommentType = {
    name: '',
    comments: [],
  }

  const getColumns = (width: number) => {
    if (width < 640) {
      return 2
    } else if (width < 1024) {
      return 3
    } else {
      return 4
    }
  }

  const initCardStatus = () => {
    const width = window.innerWidth
    nColumns(getColumns(width))

    statusCards.fill(false)
    statusRows = Array(nRows()).fill(false)
  }

  window.addEventListener('resize', throttle(() => {
    const nextColumns = getColumns(window.innerWidth)

    if (nextColumns != nColumns()) {
      initCardStatus()
      m.redraw()
    }
  }, 100))

  const toggleCardComment = (row: number, index: number, value: boolean) => {
    if (value) {
      statusCards.fill(false)
      statusCards[index] = true

      const content = LogoList[index]
      cardComment.name = content.name
      cardComment.comments = content.comments

      statusRows.fill(false)
      statusRows[row] = true
    } else {
      statusCards[index] = false
      statusRows.fill(false)
    }
  }

  const isCardDangle = () => nCards < nRows() * nColumns()

  return {
    oninit() {
      initCardStatus()
    },
    view() {
      return [
        m(SectionTitle, { title: 'Logo Design' }),
        m('div', { class: 'logo-design' }, [
          ...LogoList.flatMap((item, index) => {
            const column = index % nColumns()
            const row = Math.floor(index / nColumns())

            const vm: m.Children = [
              m(LogoCard, {
                path: item.path,
                name: item.name,
                selected: statusCards[index],
                onselected(value) { toggleCardComment(row, index, value) },
              }),
            ]

            if (column == nColumns() - 1 && statusRows[row]) {
              vm.push(m(LogoComments, {
                name: cardComment.name,
              }, cardComment.comments))
            }

            return vm
          }),
          isCardDangle() && statusRows[nRows() - 1] && [
            m(LogoComments, {
              name: cardComment.name,
            }, cardComment.comments),
          ],
        ]),
      ]
    },
  }
}

export default LogoDesign