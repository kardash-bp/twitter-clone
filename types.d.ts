export type TPost = {
  id: string,
  name: string,
  username: string,
  userImg: string,
  img: string,
  text: string,
  timestamp: any,
}
export type TComment = {
  text: string
  name: string
  username: string
  userImage: string
  timestamp?: number
  uid: string
  postId: string
}
export type TProvider = {
  providers: {
    google: {
      id: string,
      name: string,
      type: string,
      signinUrl: string,
      callbackUrl: string

    }
  }
}

export type TweetType = {
  text: string
  id: string
  image: string
  data: string
}
export type LikesType = {
  uid: string
  username: string
}

export interface IClickOutsideProps {
  children: React.ReactNode
  wrapperId: string // Id of our outside wrapper where we will listen for click
  listen: boolean // Toggle to listen for click
  onClickOutside: () => void // 
}
