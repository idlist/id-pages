import m from 'mithril'
import Stream from 'mithril/stream'
import { throttle } from 'lodash-es'
import './logo-design.sass'

import { wait } from '@/utils/wait'
import SectionTitle from '@/components/section-title'
import CommentsDivider from '@/components/comments-divider'
import Collapse from '@/components/collapse'

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

interface LogoCommentAttrs {
  name: string
}

const LogoComment: m.ClosureComponent<LogoCommentAttrs> = () => {
  const show = Stream<unknown>()

  return {
    oncreate({ attrs }) {
      show(attrs.name)
    },
    onupdate({ attrs }) {
      show(attrs.name)
    },
    onbeforeremove() {
      show(null)
      return wait(250)
    },
    view({ attrs, children }) {
      return [
        m(Collapse, { show: show }, [
          m('div', { class: 'logo-comment' }, [
            m('h3', { class: 'logo-comment-title' }, attrs.name),
            m(CommentsDivider, { margin: { y: '0' } }),
            children,
          ]),
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
    comments: [
      m('p', [
        'Personal logo. The design of this logo dates back to senior high school, ',
        'and has been continued using till now.',
      ]),
      m('p', [
        'Read as ',
        m('span', { class: 'logo-comment-bg' }, '/\'aɪdlɪst/'),
        '("I\'d list"). Doesn\'t mean "list of IDs".',
      ]),
    ],
  },
  {
    path: logo_eazytune,
    name: 'Eazy Tune',
    comments: [
      m('p', [
        'A logo for a personal hobby group that also dates back to senior high school.',
      ]),
      m('p', [
        'The group does still exists, but has changed a lot and is currently inactive. ',
        'Maybe one day it would get revived (maybe).',
      ]),
    ],
  },
  {
    path: logo_echquale,
    name: 'echquale',
    comments: [
    ],
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

interface LogoCommentHolderAttrs {
  row: number
  state: boolean
  name: string
}

const LogoCommentHolder: m.ClosureComponent<LogoCommentHolderAttrs> = () => {
  return {
    view({ attrs, children }) {
      return [
        m('div', {
          class: 'logo-comment-spanner',
        }, attrs.state
          ? m(LogoComment, {
            key: `comments-${attrs.row}`,
            name: attrs.name,
          }, children)
          : m('div', {
            key: `placeholder-${attrs.row}`,
            class: 'logo-comment-spanner',
          }),
        ),
      ]
    },
  }
}

interface CardCommentType {
  name: string
  comments?: m.Children
}

const LogoDesign: m.ClosureComponent = () => {
  const nCards = LogoList.length
  const nColumns = Stream<number>()
  const nRows = nColumns.map((value) => Math.ceil(nCards / value))

  const stateCards: boolean[] = Array(nCards)
  let stateRows: boolean[] = Array(nRows())

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

    stateCards.fill(false)
    stateRows = Array(nRows()).fill(false)
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
      stateCards.fill(false)
      stateCards[index] = true

      const content = LogoList[index]
      cardComment.name = content.name
      cardComment.comments = content.comments

      stateRows.fill(false)
      stateRows[row] = true
    } else {
      stateCards[index] = false
      stateRows.fill(false)
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

            return [
              m(LogoCard, {
                key: item.name,
                path: item.path,
                name: item.name,
                selected: stateCards[index],
                onselected(value) { toggleCardComment(row, index, value) },
              }),
              (column == nColumns() - 1)
                ? m(LogoCommentHolder, {
                  key: `spanner-${row}`,
                  row,
                  state: stateRows[row],
                  name: cardComment.name,
                }, cardComment.comments)
                : m.fragment({ key: 'skip' }, []),
            ]
          }),
          isCardDangle()
            ? m(LogoCommentHolder, {
              key: `spanner-${nRows() - 1}`,
              row: nRows() - 1,
              state: stateRows[nRows() - 1],
              name: cardComment.name,
            }, cardComment.comments)
            : m.fragment({ key: 'skip' }, []),
        ]),
      ]
    },
  }
}

export default LogoDesign