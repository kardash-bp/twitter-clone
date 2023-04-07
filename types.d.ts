export type TPost = {
  id: string,
  name: string,
  username: string,
  userImg: string,
  img: string,
  text: string,
  timestamp: string,
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