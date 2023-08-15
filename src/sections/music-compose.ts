import m from 'mithril'
import './music-compose.sass'
import SectionTitle from '@/components/section-title'
import IconLink, { IconLinkAttrs } from '@/components/icon-link'
import OuterLink from '@/components/outer-link'
import CommentsDivider from '@/components/comments-divider'

import cover_dreamless from '@/assets/music-compose/dreamless.jpg'
import cover_cogimp from '@/assets/music-compose/cognitive-impairment.jpg'
import cover_plr from '@/assets/music-compose/prime-lady-returns.jpg'

import icon_soundcloud from '@/assets/header/soundcloud.svg'
import icon_bandcamp from '@/assets/header/bandcamp.svg'
import icon_bilibili from '@/assets/header/bilibili.svg'
import icon_youtube from '@/assets/header/youtube.svg'

interface MusicCardAttrs {
  cover: string
  title: string
  year: number
  links: IconLinkAttrs[],
  comments?: m.Children,
}

const MusicCard: m.ClosureComponent<MusicCardAttrs> = () => {
  return {
    view({ attrs, children }) {
      return [
        m('div', { class: 'music-card' }, [
          m('img', {
            class: 'music-card-cover',
            src: attrs.cover,
            alt: attrs.title,
          }),
          m('div', { class: 'music-card-content' }, [
            m('h3', { class: 'music-card-title' }, attrs.title),
            m('div', { class: 'music-card-year' }, attrs.year),
            m('div', { class: 'music-link-list' }, [
              ...attrs.links.map((item) => m(IconLink, item)),
            ]),
            m(CommentsDivider, { margin: { y: '2rem' } }),
            m('div', { class: 'music-card-comments' }, children),
          ]),
        ]),
      ]
    },
  }
}

const MusicShowcaseData: MusicCardAttrs[] = [
  {
    cover: cover_plr,
    title: 'Prime Lady Returns',
    year: 2021,
    links: [
      {
        name: 'SoundCloud',
        icon: icon_soundcloud,
        link: 'https://soundcloud.com/idlist/prime-lady-returns',
      },
      {
        name: 'YouTube',
        icon: icon_youtube,
        link: 'https://www.youtube.com/watch?v=UebDr2YRWVU',
      },
      {
        name: 'Bilibili',
        icon: icon_bilibili,
        link: 'https://www.bilibili.com/video/BV1hL4y167xh/',
      },
    ],
    comments: [
      m('p', [
        'Participated in the BMS event ',
        m(OuterLink, {
          link: 'https://manbow.nothing.sh/event/event.cgi?action=More_def&num=135&event=137',
        }, 'BOFXVII'),
        '. BGA is made by ',
        m(OuterLink, {
          link: 'https://space.bilibili.com/2036555',
        }, '毛腿猪兔子'),
        '.',
      ]),
      m('p', [
        'A "sequence" of a "song" I made when I was exposed to desktop music for the first time. ',
        'The main idea is to have N (of prime number) -plet notes mixed with normal notes, thus the title. ',
      ]),
    ],
  },
  {
    cover: cover_cogimp,
    title: 'Cognitive Impairment',
    year: 2017,
    links: [
      {
        name: 'Bandcamp',
        icon: icon_bandcamp,
        link: 'https://1hzmusic.bandcamp.com/track/cognitive-impairment',
      },
    ],
    comments: [
      m('p', [
        'Participated in ',
        m(OuterLink, {
          link: 'https://1hzmusic.bandcamp.com/album/1hzgame-vol-1',
        }, '1HzGame Vol.1'),
        '.',
      ]),
      m('p', [
        'Just having some nice wave clips sliced and minced together.',
      ]),
    ],
  },
  {
    cover: cover_dreamless,
    title: 'Cosmic Dreamless Flight -i\'D Style-',
    year: 2016,
    links: [
      {
        name: 'SoundCloud',
        icon: icon_soundcloud,
        link: 'https://soundcloud.com/idlist/dreamless',
      },
      {
        name: 'Bandcamp',
        icon: icon_bandcamp,
        link: 'https://kian.bandcamp.com/track/--11',
      },
    ],
    comments: [
      m('p', [
        'A remix of ',
        m(OuterLink, {
          link: 'https://www.bilibili.com/video/av5368465',
        }, [
          'Kian - ',
          m('i', '宇宙无梦飞行'),
        ]),
        '. Participated in his ',
        m(OuterLink, {
          link: 'https://kian.bandcamp.com/album/remix-ep',
        }, '宇宙无梦飞行 REMIX EP'),
        '.',
      ]),
      m('p', [
        'Stretched the original song to two times slower, ',
        'and sliced it into a somewhat old-school House style. ',
        'And that\'s it. ',
      ]),
    ],
  },
]

const MusicCompose: m.ClosureComponent = () => {
  return {
    view() {
      return [
        m(SectionTitle, { title: 'Music Compose' }),
        m('div', { class: 'music-compose' }, [
          ...MusicShowcaseData.map((item) => m(MusicCard, item, item.comments)),
        ]),
      ]
    },
  }
}

export default MusicCompose