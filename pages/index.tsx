import Sidebar from '@/components/Sidebar'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>twitter</title>
        <meta name='description' content='twitter clone next tailwindcss app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/tw.png' />
      </Head>
      <main className='flex min-h-screen max-w-7xl mx-auto'>
        {/* sidebar */}
        <Sidebar />
        {/* feed */}

        {/* widgets */}

        {/* modal */}
      </main>
    </>
  )
}
