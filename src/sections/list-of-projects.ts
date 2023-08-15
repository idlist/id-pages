import m from 'mithril'
import './list-of-projects.sass'
import md5 from 'spark-md5'
import SectionTitle from '@/components/section-title'
import CommentsDivider from '@/components/comments-divider'
import IconLink, { IconLinkAttrs } from '@/components/icon-link'

import icon_github from '@/assets/header/github.svg'

const TagColor: Record<string, string> = {
  'Node.js': '#306e1d',
  'Koishi': '#53479d',
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
      const hue = parseInt(hash.substring(hash.length - 4), 16) % 256
      return `hsl(${hue}, 70%, 35%)`
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
  name: string
  tags: string[]
  links: IconLinkAttrs[],
}

const ProjectCard: m.ClosureComponent<ProjectCardAttrs> = () => {
  return {
    view({ attrs }) {
      return [
        m('div', { class: 'project-card' }, [
          m('img', { class: 'project-icon' }),
          m('div', { class: 'project-content' }, [
            m('h3', { class: 'project-title' }, attrs.name),
            m('div', { class: 'project-link-list' }, [
              ...attrs.links.map((link) => m(IconLink, link)),
            ]),
            m('div', { class: 'project-tag-list' }, [
              ...attrs.tags.map((tag) => m(ProjectTag, { name: tag })),
            ]),
            m(CommentsDivider, { margin: { y: '2rem' } }),
          ]),
        ]),
      ]
    },
  }
}

const ProjectList: ProjectCardAttrs[] = [
  {
    name: '2bot',
    tags: ['Chatbot', 'Node.js', 'Koishi'],
    links: [
      {
        icon: icon_github,
        name: 'Github Repo',
        link: 'https://github.com/idlist/2bot-v4',
      },
    ],
  },
]

const Projects: m.ClosureComponent = () => {
  return {
    view() {
      return [
        m(SectionTitle, { title: 'List of Projects' }),
        m('div', { class: 'project-list' }, [
          ...ProjectList.map((item) => m(ProjectCard, item)),
        ]),
      ]
    },
  }
}

export default Projects