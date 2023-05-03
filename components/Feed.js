import { SparklesIcon } from "@heroicons/react/solid";
import Input from "./Input";
import Post from "./Post";



export default function Feed() {

  const posts =[
    {
      id:"1",
      name:"manish jha",
      username:"manish",
      userImg:"https://media.licdn.com/dms/image/D4E03AQECgMo4BO2ehQ/profile-displayphoto-shrink_800_800/0/1682057605889?e=2147483647&v=beta&t=LlgYJh7rbwdqa3RXYxY5UaELob-JAAI11llwagnYKiM",
      img:"https://images.unsplash.com/photo-1682685797743-3a7b6b8d8149?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      text: "nice view!",
      timestamp: "2 hours ago"
    },
    {
      id:"2",
      name:"manish jha",
      username:"manish",
      userImg :"https://media.licdn.com/dms/image/D4E03AQECgMo4BO2ehQ/profile-displayphoto-shrink_800_800/0/1682057605889?e=2147483647&v=beta&t=LlgYJh7rbwdqa3RXYxY5UaELob-JAAI11llwagnYKiM",
      img:"https://images.unsplash.com/photo-1682685797743-3a7b6b8d8149?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      text: "wow!",
      timestamp: "2 days ago"
    }
  ]





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
      {posts.map((post)=>
      (
        <Post key={post.id} post={post} />))}
    </div>
  )
}
