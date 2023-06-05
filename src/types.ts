export interface Frontmatter {
  path?: string
  title?: string
  date?: string
  image?: string
  description?: string
  subtitle?: string
  type?: string
  author?: boolean
  display?: string
}

export interface Post {
  path?: string
  title?: string
  date?: string
  lang?: string
  desc?: string
  platform?: string
  duration?: string
  recording?: string
  radio?: boolean
  video?: boolean
  inperson?: boolean
}

export interface SubNav {
  path: string
  title: string
}
