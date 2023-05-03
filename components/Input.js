import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/solid";

export default function Input() {
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3 " >
              <img  src="https://media.licdn.com/dms/image/D4E03AQECgMo4BO2ehQ/profile-displayphoto-shrink_800_800/0/1682057605889?e=2147483647&v=beta&t=LlgYJh7rbwdqa3RXYxY5UaELob-JAAI11llwagnYKiM" 
              alt="user-image"
              className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95 " />
       {/* here divide-y could be  used to = Add borders between stacked elements using the divide-y-{width} utilities. */}


        <div className="w-full divide-y divide-gray-200 ">
           <div>
            <textarea className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700" rows="2" placeholder="What's happening?"></textarea>
           </div> 
      {/* items-center will make the element centered vertically as well as from horizontal elements   */}
        <div className="flex  items-center justify-between pt-2.5">
            <div className="flex">
                <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />

            </div>
            <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50" >Tweet</button>
            </div>
        </div>
    </div>

  )
}