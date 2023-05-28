import { SparklesIcon } from "@heroicons/react/solid";
import Input from "./Input";
import Post from "./Post";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { AnimatePresence,motion } from "framer-motion";



export default function Feed() {

  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    return onSnapshot
    (query(collection(db,"posts"),orderBy("timestamp","desc")),snapshot=>{setPosts(snapshot.docs)});
  },[]);





  return (
    // here flex grow will push the feed element whole to the right covering whole portion 
    <div className="xl:ml-[370px] border-l border-r border-gray-100 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl  ">
      {/* sticky - It allows you to make elements stick when the scroll reaches a certain point.   */}
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        {/* To make sure that an element doesn't have any extra space around it, you could use the px-0 class on the element's padding property. This would ensure that the element doesn't have any padding, regardless of the size of the element's container. */}

        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
            <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input/>

      {/* using animation using react framer  */}
      <AnimatePresence>
      {posts.map((post)=>
      (
        <motion.div key={post.id} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1}}>
        <Post key={post.id} post={post} />
        </motion.div>))}
        </AnimatePresence>
    </div>
  )
}
