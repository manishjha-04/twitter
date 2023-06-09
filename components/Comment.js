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
import { useRouter } from "next/router";

// here we have destructured it in curly braces instead we can use props directly also
export default function Comment({ comment,commentId,originalPostId }) {
  const { data: session } = useSession();

  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLikes] = useState(false);

  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);

  // setting the  noSSR. of comment 

  const router = useRouter();



  // to get data from fire base useEffect is used 
  // here below after comma in square bracket the dependency is given so that when ever the dependency changes the useEffect will run again bsically that is functionality of useEffect 



  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", originalPostId,"comments",commentId, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db,originalPostId,commentId]);  


  useEffect(() => {
    setHasLikes(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  async function likeComment() {

   if(session){

    if (hasLiked) {
      await deleteDoc(doc(db, "posts",originalPostId,"comments",commentId, id, "likes", session?.user.uid));
    } else {
      await setDoc(doc(db, "posts",originalPostId,"comments",commentId, id, "likes", session?.user.uid), {
        username: session.user.username,
      });
    }}
    else{
        signIn();
    }
  }

  async function deleteComments() {

    if(window.confirm("Are you sure you want to delete this comment?")){
      deleteDoc(doc(db, "posts", originalPostId,"comments",commentId));

      


    }

    
  }

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200 pl-20">
      {/* user image  */}

      <img
        className="h-11 2-11 rounded-full mr-4"
        src={comment?.userImg}
        alt="user-img"
      />

      {/* right side of image */}
      <div className="flex-1 ">
        {/* Header   */}
        <div className="flex items-center justify-between">
          {/* Post user info  */}
          <div className="flex items-center  space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {comment?.name}
            </h4>

            <span className="text-sm sm:text-[15px]">
              @{comment?.username} -
            </span>
            {/* The fromNow() method in Moment.js can be used to display a date or time as a relative time from now, such as "5 minutes ago" or "2 hours from now"  */}

            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
          </div>

          {/* dot icon  */}
          <DotsHorizontalIcon className="h-10 hoverEfect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>

        {/* post text  */}

        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 ">
          {comment?.comment}
        </p>



        {/* icons  */}

        <div className="flex justify-between text-gray-500 p-2">
        <div className="flex items-center select-none">
          <ChatIcon onClick={()=>{
            if(!session){
              signIn();
            }
            else {
            setPostId(originalPostId);
            setOpen(!open);}}} className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          </div>
          {session?.user.uid === comment?.userId&&

          <TrashIcon 
          onClick={deleteComments} className="h-9 w-9 hoverEffect p-2  hover:bg-red-100" />
          }
        <div className="flex items-center"> {hasLiked ? (
            <HeartIconFilled
              onClick={likeComment}
              className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
            />
          ) : (
            <HeartIcon
              onClick={likeComment}
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
