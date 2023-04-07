import Feed from '@/components/TweetMain'
import Sidebar from '@/components/Sidebar'
import Head from 'next/head'
import TweetMain from '@/components/TweetMain'
import Widgets from '@/components/Widgets'
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
}

export default function Home({ data, users }: TProps) {
  return (
    <>
      <Head>
        <title>twitter</title>
        <meta name='description' content='twitter clone next tailwindcss app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/tw.png' />
      </Head>
      <main className='flex flex-row gap-2 justify-center min-h-screen mx-auto'>
        {/* sidebar */}
        <Sidebar />
        {/* feed */}
        <TweetMain />
        {/* widgets */}
        <Widgets data={data} users={users} />
        {/* modal */}
      </main>
    </>
  )
}

// 'https://saurav.tech/NewsAPI/top-headlines/category/entertainment/rs.json'
export async function getServerSideProps() {
  const res = await fetch(
    'https://saurav.tech/NewsAPI/top-headlines/category/sports/us.json'
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
    },
  }
}
