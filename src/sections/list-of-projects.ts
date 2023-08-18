import m from 'mithril'
import { throttle } from 'lodash-es'
import './list-of-projects.sass'
import md5 from 'spark-md5'
import SectionTitle from '@/components/section-title'
import CommentsDivider from '@/components/comments-divider'
import IconLink, { IconLinkAttrs } from '@/components/icon-link'
import OuterLink from '@/components/outer-link'

import icon_2bot from '@/assets/projects/2bot.png'
import icon_monurls from '@/assets/projects/monurls.png'

import icon_github from '@/assets/header/github.svg'
import icon_link from '@/assets/outer-link.svg'

const TagColor: Record<string, string> = {
  'JavaScript': '#c3a13e',
  'TypeScript': '#4476c0',
  'Node.js': '#306e1d',
  'Koishi.js': '#53479d',
  'React': '#387ca0',
  'Fastify': '#488374',
  'MariaDB': '#b6795f',
}

interface ProjectTagAttrs {
  name: string
}

const ProjectTag: m.ClosureComponent<ProjectTagAttrs> = () => {
  const getColor = (name: string): string => {
    const preset = TagColor[name]
    if (preset) {
      return preset
    } else {
      const hash = md5.hash(name)
      const hue = parseInt(hash.substring(hash.length - 4), 16) % 360
      return `hsl(${hue}, 50%, 40%)`
    }
  }

  return {
    view({ attrs }) {
      return m('div', {
        class: 'project-tag',
        style: { backgroundColor: getColor(attrs.name) },
      }, attrs.name)
    },
  }
}

interface ProjectCardAttrs {
  icon: string
  name: string
  tags: string[]
  links: IconLinkAttrs[],
  comments?: m.Children,
}

const ProjectCard: m.ClosureComponent<ProjectCardAttrs> = () => {
  const isMobile = () => window.innerWidth <= 640

  let mobile = isMobile()

  window.addEventListener('resize', throttle(() => {
    if (mobile != isMobile()) {
      mobile = isMobile()
      m.redraw()
    }
  }, 100))

  return {
    view({ attrs, children }) {
      return [
        m('div', { class: 'project-card' }, [
          m('img', {
            class: 'project-icon',
            src: attrs.icon,
            alt: `${attrs.name} icon`,
          }),
          m('div', { class: 'project-content' }, [
            m('h3', { class: 'project-title' }, attrs.name),
            m('div', { class: 'project-link-list' }, [
              ...attrs.links.map((link) => m(IconLink, link)),
            ]),
            m('div', { class: 'project-tag-list' }, [
              ...attrs.tags.map((tag) => m(ProjectTag, { name: tag })),
            ]),
            !mobile && [
              m(CommentsDivider, { margin: { y: '2rem' } }),
              children,
            ],
          ]),
          mobile && m('div', { class: 'project-comment-mobile' }, [
            m(CommentsDivider),
            children,
          ]),
        ]),
      ]
    },
  }
}

const ProjectList: ProjectCardAttrs[] = [
  {
    icon: icon_2bot,
    name: '2bot',
    tags: ['Chatbot', 'JavaScript', 'Node.js', 'Koishi.js', 'MariaDB'],
    links: [
      {
        icon: icon_github,
        name: 'Github Repo',
        link: 'https://github.com/idlist/2bot-v4',
      },
    ],
    comments: [
      m('p', [
        'A chatbot developed on Node.js and deployed on multiple IM applications. ',
        'The name and the icon originates from "Ardbert" of Final Fantasy XIV.',
      ]),
      m('p', [
        'Beside functions related to FFXIV (e.g., market board query, wiki search), ',
        'it provides various utilities to enhance chat experience, ',
        'including duplicate image detection, chatlog statistics and go-live notification.',
      ]),
      m('p', [
        'Several plugins for ',
        m(OuterLink, { link: 'https://koishi.chat/zh-CN/' }, 'Koishi.js'),
        ' are also developed alongside the chatbot:',
      ]),
      m('ul', [
        m('li', [
          m(OuterLink, { link: 'https://github.com/idlist/koishi-plugin-aircon' }, 'aircon'),
          ': Virtual air conditioning for your chat.',
        ]),
        m('li', [
          m(OuterLink, { link: 'https://github.com/idlist/koishi-plugin-animal-picture' }, 'animal-picture'),
          ': Random animal picture.',
        ]),
        m('li', [
          m(OuterLink, { link: 'https://github.com/idlist/koishi-plugin-blive' }, 'blive'),
          ': Go-live notification for Bilibili.',
        ]),
        m('li', [
          m(OuterLink, { link: 'https://github.com/idlist/koishi-plugin-duplicate-checker' }, 'duplicate-checker'),
          ': Detect duplicated images in group chats.',
        ]),
        m('li', [
          m(OuterLink, { link: 'https://github.com/idlist/koishi-plugin-jrrp' }, 'jrrp'),
          ': Daily luck test.',
        ]),
      ]),
    ],
  },
  {
    icon: icon_monurls,
    name: 'monurls',
    tags: ['Microservice', 'TypeScript', 'Node.js', 'React', 'Fastify', 'MariaDB'],
    links: [
      {
        icon: icon_github,
        name: 'Github Repo',
        link: 'https://github.com/idlist/monurls',
      },
      {
        icon: icon_link,
        name: 'Self-hosted Instance',
        link: 'https://s.idl.ist/',
      },
    ],
    comments: [
      m('p', [
        'A simple URL shortener. Abbreviation for "My Own Node.js URL Shortener".',
      ]),
      m('p', [
        'Originates from the personal need to have a private URL shortener ',
        'that mainly depends on Node.js.',
      ]),
      m('p', [
        'Consists of a frontend using React and a backend using Fastify. ',
        'Can shorten links and manage shortened links, and nothing more.',
      ]),
      m('p', [
        'Test case: ',
        m(OuterLink, { link: 'https://s.idl.ist/b' }),
        ' would be redirected to ',
        m(OuterLink, { link: 'https://www.bing.com'}),
        '.',
      ]),
    ],
  },
]

const Projects: m.ClosureComponent = () => {
  return {
    view() {
      return [
        m(SectionTitle, { title: 'List of Projects' }),
        m('div', { class: 'project-list' }, [
          ...ProjectList.map((item) => m(ProjectCard, item, item.comments)),
        ]),
      ]
    },
  }
}

export default Projects