import { db, storage } from "@/firebase";
import { EmojiHappyIcon, PhotographIcon, XIcon } from "@heroicons/react/solid";
import { useSession,signOut } from "next-auth/react";
import { useRef, useState } from "react";
import { addDoc,collection,doc,serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";


export default function Input() {
  const {data:session} = useSession();

  const[input,setInput] = useState("");

  const filePickerRef = useRef(null);

  const[selectedFile,setSelectedFile] = useState(null);

  // here we have added loading state to prevent user from sending multiple posts at a time and to prevent them thinking that its lagging or something
  const[loading,setLoading] = useState(false);

  
  const sendPost = async()=>{

    if(loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db,"posts"),{

      id:session.user.uid,
      text:input ,
      userImg :session.user.image,
      timestamp : serverTimestamp(),
      name:session.user.name,
      username:session.user.username,
  });

  //  heer below it means that each person have to upload image in its own id folder
  const imageRef = ref(storage,`posts/${docRef.id}/image`);

  if(selectedFile){
    await uploadString(imageRef,selectedFile,"data_url").then(async()=>{ 
      const downloadURL = await getDownloadURL(imageRef);

      // here below basically updatedoc is a function of firebase it first fected data from database we created as db and from the posts folder and then from the docRef.id which is the id of the post and then we are updating the image of the post with the downloadURL which is the url of the image we uploaded to the firebase storage 
      await updateDoc(doc(db,"posts",docRef.id),{image:downloadURL});
    
    })
  }
  setInput("");
  setSelectedFile(null);
  setLoading(false);
}; 

// here below we are adding image to post and simultaneously sending it to firebase storage


const addImageToPost = (e)=>{

  const reader = new FileReader();
  if (e.target.files[0]){
    reader.readAsDataURL(e.target.files[0]);
  }

  reader.onloadend = (readerEvent)=>{
    setSelectedFile(readerEvent.currentTarget.result); 
  }

};

  return (
    <>
    {session&&(
    <div className="flex border-b border-gray-200 p-3 space-x-3 " >
              <img  src={session.user.image}
              onClick={signOut}
              alt="user-image"
              className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95 " />
       {/* here divide-y could be  used to = Add borders between stacked elements using the divide-y-{width} utilities. */}


        <div className="w-full divide-y divide-gray-200 ">
           <div>
            <textarea className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700" rows="2" placeholder="What's happening?" 
            value={input}
            onChange={(e)=>setInput(e.target.value)} 
            ></textarea>
           </div> 
           {selectedFile&&(<div className="relative"> 
           <XIcon onClick={()=>setSelectedFile(null)}
            className="h-7 text-black absolute cursor-pointer shadow-md shadow-white rounded-full" />
           <img src={selectedFile} alt="selected-image" className={`${loading && "animate-pulse" }`} /> </div>)}
      {/* items-center will make the element centered vertically as well as from horizontal elements   */}
        <div className="flex  items-center justify-between pt-2.5">
        {!loading &&(<>
            <div className="flex">
            <div className="" onClick={()=>filePickerRef.current.click()}>
                <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
               <input type="file" hidden ref={filePickerRef}  onChange={addImageToPost}/>
                </div>
                
                
                <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />

            </div>
            <button onClick={sendPost} disabled ={!input.trim()} className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50" >Tweet</button>
            </>)}
            </div>
         
            
        </div>
    </div>
    )}
    </>

  )
}
