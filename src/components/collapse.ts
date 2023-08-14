import m from 'mithril'
import Stream from 'mithril/stream'
import { animate } from 'popmotion'
import './collapse.sass'

interface CollapseAttrs {
  show: Stream<unknown>
}

const Collapse: m.ClosureComponent<CollapseAttrs> = () => {
  const height = Stream('auto')
  const heightRecord = height.map((current) => {
    return current == 'auto' ? Stream.SKIP : current
  })

  let show: Stream<unknown>
  let showPrev: unknown
  let el: HTMLDivElement
  let currentAnimation: ReturnType<typeof animate>

  const animateCollapse = (scroll: number, current: unknown) => {
    if (showPrev === current) {
      return
    }

    currentAnimation?.stop()
    const dest = `${scroll}px`

    if (current && heightRecord() != dest) {
      currentAnimation = animate({
        from: heightRecord(),
        to: dest,
        duration: 250,
        onPlay() { height(heightRecord()) },
        onUpdate(value) { height(value) },
        onComplete() { height('auto') },
      })
    }
    if (!current) {
      currentAnimation = animate({
        from: heightRecord(),
        to: '0px',
        duration: 250,
        onUpdate(latest) { height(latest) },
      })
    }

    showPrev = current
  }

  return {
    oninit({ attrs }) {
      show = attrs.show
      showPrev = show()

      if (!show()) {
        height('0px')
      }
    },
    oncreate({ dom }) {
      el = dom as HTMLDivElement

      height.map((current) => {
        el.style.height = current
      })

      show.map((current) => {
        animateCollapse(el.scrollHeight, current)
      })
    },
    view({ children }) {
      return [
        m('div', {
          class: 'collapse',
          style: { height },
        }, children),
      ]
    },
  }
}

export default Collapse