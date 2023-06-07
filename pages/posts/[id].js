import Sidebar from '../../components/Sidebar'
import Head from 'next/head'
import Widgets from '../../components/Widgets'
import Post from '../../components/Post'
import CommentModal from '../../components/CommentModal'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import { useEffect, useState } from 'react'
import { Snapshot } from 'recoil'


export default function PostPage({newsResults,randomUserResults}) {

    // initializing router 

    const router = useRouter();
    const {id} = router.query;
    const [post,setPost] = useState();
    useEffect(() =>onSnapshot(doc(db,"posts",id),(snapshot)=>setPost(snapshot)),[db,id])

  return (
    <div>
      <Head>
        <title>Post Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* basically the maintag(a semantic tag) is used to show the main content of your site and also good for seo  */}
      <main className="flex min-h-screen  mx-auto "> 

        {/* sidebar */}

        <Sidebar />


        {/* feed */}

        <div className="xl:ml-[370px] border-l border-r border-gray-100 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl  ">
      {/* sticky - It allows you to make elements stick when the scroll reaches a certain point.   */}
      <div className="flex  items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
    <div className='hoverEffect' onClick={()=>{router.push("/")}}>
        <ArrowLeftIcon className='h-5  '/>
    </div>

        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Tweet</h2>
        {/* To make sure that an element doesn't have any extra space around it, you could use the px-0 class on the element's padding property. This would ensure that the element doesn't have any padding, regardless of the size of the element's container. */}

      
      </div>

      <Post id={id} post={post}/>

    </div>



        

        {/* widget  */}

        <Widgets newsResults={newsResults.articles} randomUserResults={randomUserResults.results} />

        {/* modal --pops up  */}

        <CommentModal />

      </main>
    </div>



  )
}


// https://saurav.tech/NewsAPI/top-headlines/category/business/in.json 

// server side rendering ...this rendering is be done inside Vercel only 
export async function getServerSideProps(){

  const newsResults = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/business/in.json"
  ).then((res)=> res.json());
 
  // who to follow section 
  
  const randomUserResults = await fetch("https://randomuser.me/api/?results=30&inc=name,login,picture"
  ).then((res)=> res.json());
  return{
    props:{
      newsResults,
      randomUserResults,
    },
  }

}



