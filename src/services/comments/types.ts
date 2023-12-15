export type Comment = {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export type InputCreateComment = {
  postId: number
  name: string
  email: string
  body: string
}

export type InputUpdateComment = {
  postId: number
  id: number
  name: string
  email: string
  body: string
}
