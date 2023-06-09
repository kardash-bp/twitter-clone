import { useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import Head from 'next/head'
import TweetMain from '@/components/TweetMain'
import Widgets from '@/components/Widgets'
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'
import { auth, db } from '@/firebase'
import { TComment, TweetType } from '@/types'
import CommentModal from '@/components/CommentModal'
import { useCommentsStore } from '@/store/commentsStore'
import TweetModal from '@/components/TweetModal'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useUserStore } from '@/store/userStore'

export type TArticle = {
  source: {
    id: string | null
    name: string
  }
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}
export type TProps = {
  data: TArticle[]
  users: any
  tweets: TweetType[] | []
  comments: TComment[]
}

export default function Home({ data, users, tweets, comments }: TProps) {
  const { currentUser, setCurrentUser, setIsOpen } = useUserStore(
    (state) => state
  )
  const { postComments, setPostComments } = useCommentsStore((state) => state)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid!)
        const userSnap = await getDoc(userRef)
        if (userSnap.exists()) {
          setCurrentUser(user)
        }
      } else {
        setCurrentUser({ displayName: '', email: '', photoURL: '', uid: '' })
        signOut(auth)
      }
    })
  }, [])
  useEffect(() => {
    setPostComments(comments)
  }, [])
  return (
    <>
      <Head>
        <title>twitter</title>
        <meta name='description' content='twitter clone next tailwindcss app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/tw.png' />
      </Head>
      <main className='flex flex-row gap-2 justify-center min-h-screen mx-auto'>
        {/* sidebar navigation */}
        <Sidebar />
        {/* main twitter feed */}
        <TweetMain posts={[...tweets]} comments={postComments} />
        {/* widgets */}
        <Widgets data={data} users={users} />
        {/* modal */}
        <CommentModal />
        <TweetModal />
      </main>
    </>
  )
}

// 'https://saurav.tech/NewsAPI/top-headlines/category/entertainment/rs.json'
export async function getServerSideProps() {
  const colRef = collection(db, 'posts')
  const q = query(colRef, orderBy('timestamp', 'desc'))
  const docsSnap = await getDocs(q)
  let tweets = [] as DocumentData
  let comments = {} as DocumentData
  docsSnap.docs.forEach((doc) => {
    if (!doc) return
    const postDoc = doc.data()
    postDoc.id = doc.id
    tweets.push(postDoc)
  })
  const commentsRef = collection(db, 'comments')
  const commentsQuery = query(commentsRef)
  const commentsSnap = await getDocs(commentsQuery)

  commentsSnap.docs.forEach((doc) => (comments[doc.id] = doc.data().comments))

  const res = await fetch(
    'https://saurav.tech/NewsAPI/top-headlines/category/health/in.json'
  )
  const news = await res.json()
  // Who to follow - random user
  const data = await fetch(
    'https://randomuser.me/api/?gender=female&results=15&inc=name,picture,login,email'
  )
  const usersResponse = await data.json()
  return {
    props: {
      users: usersResponse.results,
      data: news.articles,
      tweets,
      comments,
    },
  }
}
