import { TComment } from "@/types"

export const removeElementFromState = (data: any, element: TComment, cb: any) => {
  const newData = {
    [element.postId]: data[element.postId].filter(
      (c: TComment) => c.text !== element.text
    ),
  }
  cb(newData)
}