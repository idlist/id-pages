import m from 'mithril';
import './mastery-tree.sass';
import SectionTitle from './section-title';

import svg_star from '@assets/skill-bar/star.svg';
import svg_heart from '@assets/skill-bar/heart.svg';
import icon_chinese from '@assets/mastery-tree/chinese.svg';
import icon_english from '@assets/mastery-tree/english.svg';
import icon_japanese from '@assets/mastery-tree/japanese.svg';
import icon_mithril from '@assets/mastery-tree/mithril.svg';
import icon_react from '@assets/mastery-tree/react.svg';
import icon_vue from '@assets/mastery-tree/vue.svg';
import icon_sass from '@assets/mastery-tree/sass.svg';
import icon_vite from '@assets/mastery-tree/vite.svg';
import icon_godot from '@assets/mastery-tree/godot.svg';
import icon_typescript from '@assets/mastery-tree/typescript.svg';
import icon_python from '@assets/mastery-tree/python.svg';
import icon_cpp from '@assets/mastery-tree/cpp.svg';
import icon_digital_art from '@assets/mastery-tree/digital-art.svg';
import icon_ui from '@assets/mastery-tree/ui.svg';
import icon_vector_graphics from '@assets/mastery-tree/vector-graphics.svg';
import icon_live from '@assets/mastery-tree/live.svg';

interface TreeItem {
  name: string
  icon?: string
  level?: number
  new?: boolean
  fav?: boolean
  link?: string
}

interface TreeAspect {
  title: string
  color?: string,
  level?: number
  new?: boolean
  contents: TreeItem[]
}

const TreeList: TreeAspect[] = [
  {
    title: 'Languages',
    color: '#9A5034',
    contents: [
      {
        name: 'Chinese (native)',
        icon: icon_chinese,
        level: 5,
      },
      {
        name: 'English',
        icon: icon_english,
        level: 4,
      },
      {
        name: 'Japanese',
        icon: icon_japanese,
        level: 3,
      },
    ],
  },
  {
    title: 'JS / Node.js',
    level: 5,
    color: '#6E552F',
    contents: [
      {
        name: 'Mithril.js',
        icon: icon_mithril,
        level: 4.5,
        fav: true,
        link: 'https://mithril.js.org/',
      },
      {
        name: 'React',
        icon: icon_react,
        level: 3,
        link: 'https://reactjs.org/',
      },
      {
        name: 'Vue',
        icon: icon_vue,
        level: 1,
        link: 'https://v3.vuejs.org/',
      },
      {
        name: 'Sass',
        icon: icon_sass,
        level: 4,
        link: 'https://sass-lang.com/',
      },
      {
        name: 'Vite',
        icon: icon_vite,
        level: 3,
        link: 'https://vitejs.dev/',
      },
    ],
  },
  {
    title: 'C#',
    level: 2,
    color: '#096148',
    contents: [
      {
        name: 'Godot',
        icon: icon_godot,
        level: 1.5,
        fav: true,
        link: 'https://godotengine.org/',
      },
    ],
  },
  {
    title: 'Other Programmings',
    contents: [
      {
        name: 'TypeScript',
        icon: icon_typescript,
        level: 4,
      },
      {
        name: 'Python',
        icon: icon_python,
        level: 3,
      },
      {
        name: 'C++',
        icon: icon_cpp,
        level: 1,
        new: true,
      },
    ],
  },
  {
    title: 'Graphics',
    level: 3,
    color: '#622954',
    contents: [
      {
        name: 'Digital Art',
        icon: icon_digital_art,
        level: 1.5,
        fav: true,
      },
      {
        name: 'UI / UX',
        icon: icon_ui,
        level: 3,
        fav: true,
      },
      {
        name: 'Vector Graphics',
        icon: icon_vector_graphics,
        level: 2,
      },
    ],
  },
  {
    title: 'Desktop Music',
    level: 2,
    color: '#0B346E',
    contents: [
      {
        name: 'Live',
        icon: icon_live,
        level: 2,
        link: 'https://www.ableton.com/en/live/',
      },
    ],
  },
];

interface SkillLevelAttrs {
  level: number
  fav?: boolean
  width?: number
}

const SkillBar: m.ClosureComponent<SkillLevelAttrs> = () => {
  return {
    view({ attrs }) {
      const width = attrs.width ?? 160;
      const height = 24;
      const margin = 12;
      const length = width - 2 * margin;

      const styleLine = { stroke: '#ccc', strokeWidth: 2 };
      const stylePoint = { fill: '#ccc' };

      return [
        m('svg', {
          width: width, height: height,
          class: 'skill-bar',
        }, [
          m('line', {
            x1: margin, y1: margin,
            x2: width - margin, y2: margin,
            style: styleLine,
          }),
          ...[0, 1].map(i => {
            const lx = Math.round(margin + length * i);

            return [
              m('line', {
                x1: lx, y1: 6,
                x2: lx, y2: 18,
                style: styleLine,
              }),
            ];
          }),
          ...[1, 2, 3, 4].map(i => {
            const size = 5;
            const px = Math.round(margin + length / 5 * i);
            const py = height / 2;

            return [
              m('rect', {
                x: px - size / 2,
                y: py - size / 2,
                width: size,
                height: size,
                style: stylePoint,
                transform: `rotate(45, ${px}, ${py})`,
              }),
            ];
          }),
          m('image', {
            x: margin + length / 5 * attrs.level - 8, y: 4,
            width: 16, height: 16,
            href: attrs.fav ? svg_heart : svg_star,
          }),
        ]),
      ];
    },
  };
};

type MasteryItemNameAttrs = TreeItem

const MasteryItemName: m.ClosureComponent<MasteryItemNameAttrs> = () => {
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
        attrs.new && [
          m('div', { class: 'item-new' }, 'NEW'),
        ],
      ];
    },
  };
};

type MasteryItemAttrs = TreeItem

const MasteryItem: m.ClosureComponent<MasteryItemAttrs> = () => {
  return {
    view({ attrs }) {
      return [
        m('div', { class: 'item' }, [
          attrs.link
            ? [
              m('a', {
                class: 'item-link',
                href: attrs.link,
                target: '_blank',
                rel: 'noopener noreferer',
              }, [
                m(MasteryItemName, { ...attrs }),
              ]),
            ]
            : [
              m('div', { class: 'item-info' }, [
                m(MasteryItemName, { ...attrs }),
              ]),
            ]
          ,
          attrs.level && [
            m(SkillBar, {
              level: attrs.level,
              fav: attrs.fav,
            }),
          ],
        ]),
      ];
    },
  };
};

type MasteryTreeAspectAttrs = TreeAspect

const MasteryTreeAspect: m.ClosureComponent<MasteryTreeAspectAttrs> = () => {
  return {
    view({ attrs }) {
      return [
        m('div', { class: 'aspect' }, [
          m('div', {
            class: 'aspect-container',
            style: {
              backgroundColor: attrs.color,
              boxShadow: `0 0 8px ${attrs.color}`,
            },
          }, [
            m('div', { class: 'aspect-info' }, [
              m('div', { class: 'aspect-title' }, attrs.title),
              attrs.new && [
                m('div', { class: 'aspect-new' }, 'NEW'),
              ],
            ]),
            attrs.level && [
              m(SkillBar, { level: attrs.level }),
            ],
          ]),
          m('div', { class: 'aspect-content' }, [
            ...attrs.contents.map(item => [
              m(MasteryItem, { ...item }),
            ]),
          ]),
        ]),
      ];
    },
  };
};

const MasteryTree: m.ClosureComponent = () => {
  return {
    view() {
      return [
        m(SectionTitle, { title: 'Mastery Tree' }),
        m('div', { class: 'mastery-tree' }, [
          ...TreeList.map(aspect => [
            m(MasteryTreeAspect, { ...aspect }),
          ]),
        ]),
      ];
    },
  };
};

export default MasteryTree;
