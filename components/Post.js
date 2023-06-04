import { db, storage } from "@/firebase";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import {
  ChartBarIcon,
  ChatIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import signin from "@/pages/auth/signin";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@/atom/modalAtom";

// here we have destructured it in curly braces instead we can use props directly also
export default function Post({ post }) {
  const { data: session } = useSession();

  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLikes] = useState(false);

  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);


  // to get data from fire base useEffect is used 
  // here below after comma in square bracket the dependency is given so that when ever the dependency changes the useEffect will run again bsically that is functionality of useEffect 
  


  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", post.id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setHasLikes(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  async function likePost() {

   if(session){

    if (hasLiked) {
      await deleteDoc(doc(db, "posts", post.id, "likes", session?.user.uid));
    } else {
      await setDoc(doc(db, "posts", post.id, "likes", session?.user.uid), {
        username: session.user.username,
      });
    }}
    else{
        signIn();
    }
  }

  async function deletePost() {

    if(window.confirm("Are you sure you want to delete this post?")){
      deleteDoc(doc(db, "posts", post.id));

      if(post.data().image){
        deleteObject(ref(storage, `posts/${post.id}/image`));

      }

    }

    
  }

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* user image  */}

      <img
        className="h-11 2-11 rounded-full mr-4"
        src={post.data().userImg}
        alt="user-img"
      />

      {/* right side of image */}
      <div>
        {/* Header   */}
        <div className="flex items-center justify-between">
          {/* Post user info  */}
          <div className="flex items-center  space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.data().name}
            </h4>

            <span className="text-sm sm:text-[15px]">
              @{post.data().username} -
            </span>
            {/* The fromNow() method in Moment.js can be used to display a date or time as a relative time from now, such as "5 minutes ago" or "2 hours from now"  */}

            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{post?.data().timestamp?.toDate()}</Moment>
            </span>
          </div>

          {/* dot icon  */}
          <DotsHorizontalIcon className="h-10 hoverEfect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>

        {/* post text  */}

        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 ">
          {post.data().text}
        </p>

        {/* post image  */}

        <img className="rounded-2xl mr-2" src={post.data().image} alt="" />

        {/* icons  */}

        <div className="flex justify-between text-gray-500 p-2">
          <ChatIcon onClick={()=>{
            if(!session){
              signIn();
            }
            else {
            setPostId(post.id);
            setOpen(!open);}}} className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          
          {session?.user.uid === post.data().id&&

          <TrashIcon onClick={deletePost} className="h-9 w-9 hoverEffect p-2  hover:bg-red-100" />
          }
        <div className="flex items-center"> {hasLiked ? (
            <HeartIconFilled
              onClick={likePost}
              className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
            />
          ) : (
            <HeartIcon
              onClick={likePost}
              className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
            />
          )}{
            likes.length>0 && <span className={`${hasLiked && "text-red-600"} text-sm select-none`}>{likes.length}</span>
          }
          </div> 

          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
}
