import Sidebar from '@/components/Sidebar'
import Head from 'next/head'
import Widgets from '@/components/Widgets'
import { DocumentData, doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { TPost } from '@/types'
import CommentModal from '@/components/CommentModal'
import Post from '@/components/Post'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next'
import { leftArrow } from '@/assets/icons'
import Link from 'next/link'
import Comments from '@/components/Comments'
import { useCommentsStore } from '@/store/commentsStore'
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
  post: TPost
}

export default function PostPage({ data, users, post }: TProps) {
  const router = useRouter()
  const { id } = router.query
  const { postComments } = useCommentsStore((state) => state)
  return (
    <>
      <Head>
        <title>Tweet</title>
        <meta name='description' content='twitter clone next tailwindcss app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/tw.png' />
      </Head>
      <main className='flex flex-row gap-2 justify-center min-h-screen mx-auto'>
        {/* sidebar navigation */}
        <Sidebar />
        {/* main twitter feed */}
        <div className='border-x md:max-w-[576px]'>
          {/* main header */}
          <div className='flex gap-5 sticky items-center py-2 px-3 top-0 bg-white opacity-80 '>
            <Link href='/'>
              {' '}
              <span>{leftArrow}</span>
            </Link>
            <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>
              Tweet
            </h2>
          </div>

          {post && (
            <Post
              key={id}
              post={post}
              totalComments={
                postComments[post.id] ? postComments[post.id].length : 0
              }
            />
          )}
          {Object.keys(postComments).length > 0 && postComments[post.id] && (
            <Comments comments={postComments[post.id]} />
          )}
        </div>
        {/* widgets */}
        <Widgets data={data} users={users} />
        {/* modal */}
        <CommentModal />
      </main>
    </>
  )
}

// 'https://saurav.tech/NewsAPI/top-headlines/category/helth/in.json'
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { id } = ctx.query
  const postId = id as string
  const postRef = doc(db, 'posts', postId)
  const docSnap = await getDoc(postRef)
  let post = {} as DocumentData
  if (docSnap.exists()) {
    post = docSnap.data()
    post!.id = id
  } else {
    console.log('No such document!')
  }

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
      post,
    },
  }
}
