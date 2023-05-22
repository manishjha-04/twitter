import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { ChartBarIcon, ChatIcon, HeartIcon, ShareIcon, TrashIcon } from "@heroicons/react/outline";
import Moment from "react-moment";

// here we have destructured it in curly braces instead we can use props directly also 
export default function Post({ post }) {
    return (
        <div className="flex p-3 cursor-pointer border-b border-gray-200">
            {/* user image  */}

            <img className="h-11 2-11 rounded-full mr-4"  src={post.data().userImg} alt="user-img" />

            {/* right side of image */}
            <div>
                {/* Header   */}
                <div className="flex items-center justify-between">

                    {/* Post user info  */}
                    <div className="flex items-center  space-x-1 whitespace-nowrap">

                        <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post.data().name}</h4>

                        <span className="text-sm sm:text-[15px]">@{post.data().username} -</span>
                        {/* The fromNow() method in Moment.js can be used to display a date or time as a relative time from now, such as "5 minutes ago" or "2 hours from now"  */}

                        <span className="text-sm sm:text-[15px] hover:underline"><Moment fromNow>{post?.timestamp?.toDate()}</Moment></span>

                    </div>

                    {/* dot icon  */}
                    <DotsHorizontalIcon className="h-10 hoverEfect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />


                </div>

                {/* post text  */}

                <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 ">{post.data().text}</p>


                {/* post image  */}

                <img className="rounded-2xl mr-2" src={post.data().image} alt=""/>

                {/* icons  */}

                <div className="flex justify-between text-gray-500 p-2">

                <ChatIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
                <TrashIcon    className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"/>
                <HeartIcon  className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"/>
                <ShareIcon  className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
                <ChartBarIcon  className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>

                

                </div>
            </div>
        </div>
    )
}
