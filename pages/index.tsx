import Sidebar from '@/components/Sidebar'
import Head from 'next/head'
import TweetMain from '@/components/TweetMain'
import Widgets from '@/components/Widgets'
import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'
import { db } from '@/firebase'
import { TweetType } from '@/types'
import CommentModal from '@/components/CommentModal'
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
}

export default function Home({ data, users, tweets }: TProps) {
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
        <TweetMain posts={[...tweets]} />
        {/* widgets */}
        <Widgets data={data} users={users} />
        {/* modal */}
        <CommentModal />
      </main>
    </>
  )
}

// 'https://saurav.tech/NewsAPI/top-headlines/category/entertainment/rs.json'
export async function getServerSideProps() {
  const colRef = collection(db, 'posts')
  const q = query(colRef, orderBy('date', 'desc'))
  const docsSnap = await getDocs(q)
  let tweets = [] as DocumentData

  docsSnap.docs.forEach((doc) => {
    if (!doc) return
    const postDoc = doc.data()
    postDoc.id = doc.id
    console.log(postDoc)
    tweets.push(postDoc)
  })

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
    },
  }
}
