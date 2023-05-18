// import React from 'react' ---no need to import in nextjs

import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import { HomeIcon } from "@heroicons/react/solid"
import { HashtagIcon ,BellIcon,InboxIcon,BookmarkIcon,ClipboardIcon,UserIcon,DotsCircleHorizontalIcon,DotsHorizontalIcon} from "@heroicons/react/outline"
import { signIn, signOut, useSession } from "next-auth/react";
export default function Sidebar() {

  const {data:session} = useSession();


  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24" >

      {/* twitter logo */}

      <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1 ">
        <Image width="50" height="50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/1200px-Logo_of_Twitter.svg.png" ></Image>

      </div>


      {/* menu */}

      <div className=" mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active/>
        <SidebarMenuItem text="Explore" Icon={HashtagIcon} />

        {session&&(<>

        <SidebarMenuItem text="Notifications" Icon={BellIcon} />
        <SidebarMenuItem text="Messages" Icon={InboxIcon} />
        <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
        <SidebarMenuItem text="Profile" Icon={UserIcon} />
        <SidebarMenuItem text="More" Icon={DotsCircleHorizontalIcon} />
</>
        )}
      </div>


      {/* Button  */}

      {session?(<>

      <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline ">Tweet</button>


      {/* mini profile */}

      <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto ">
        <img onClick={signOut} className="h-10 w-10 rounded-full" src={session.user.image} alt="user-image" />
        <div className="leading-5 hidden xl:inline">
          <h1 className="font-bold">{session.user.name}</h1>
          <p className="text-gray-500">@{session.user.username}</p>
        </div>    
        <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
     
      </div>
      </>
      
      ):
      (<button onClick={signIn} className="bg-blue-400 text-white rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline ">Sign in</button>)}
      {/* signin is the default builtin function in react  */}


    </div>
  )
}
