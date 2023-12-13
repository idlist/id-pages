import fs from 'fs/promises'
import dedent from 'dedent'

interface YearMonthDay {
  year: number
  month: number
  day: number
}

export const ymd = (date: Date): YearMonthDay => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  }
}

const date = ymd(new Date())
const update = `${date.year} / ${date.month} / ${date.day}`

const content = dedent`
  export const LastUpdate = '${update}'
  export const CopyrightYears = '2022 - ${date.year}'
  `

await fs.writeFile('src/generated.ts', content, { encoding: 'utf8' })