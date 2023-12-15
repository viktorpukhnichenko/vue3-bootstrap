export type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export type InputCreatePost = {
  title: string
  body: string
  userId: number
}

export type InputUpdatePost = {
  id: number
  title: string
  body: string
  userId: number
}
