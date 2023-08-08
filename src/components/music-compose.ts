import m from 'mithril'
import './music-compose.sass'
import SectionTitle from './section-title'

const MusicCompose: m.ClosureComponent = () => {
  return {
    view() {
      return [
        m(SectionTitle, { title: 'Music Compose' }),
      ]
    },
  }
}

export default MusicCompose