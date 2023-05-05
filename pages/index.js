import Sidebar from '@/components/Sidebar'
import Feed from '@/components/Feed'
import Head from 'next/head'
import Widgets from '@/components/Widgets'



export default function Home({newsResults}) {
  return (
    <div>
      <Head>
        <title>TwitterClone</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* basically the maintag(a semantic tag) is used to show the main content of your site and also good for seo  */}
      <main className="flex min-h-screen  mx-auto "> 

        {/* sidebar */}

        <Sidebar />


        {/* feed */}

        <Feed />

        {/* widget  */}

        <Widgets newsResults={newsResults.articles}/>

        {/* modal --pops up  */}

      </main>
    </div>



  )
}


// https://saurav.tech/NewsAPI/top-headlines/category/business/in.json 

// server side rendering ...this rendering is be done inside Vercel only 
export async function getServerSideProps(){

  const newsResults = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/business/in.json"
  ).then((res)=> res.json());
  return{
    props:{
      newsResults,
    },
  }

}

