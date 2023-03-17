

// here the icon used for sidebar menu items is from heroicons --- npm install @heroicons/react

// here below we can use the props or just destructure it and use it accordinly 
export default function SidebarMenuItem({Icon,text,active}) {
  return (
    <div className="hoverEffect flex items-center text-gray-700 justify-center xl:justify-start text-lg space-x-3  ">
      <Icon className="h-7" />
      {/* here below in $ sign the template literals is being used  */}
      <span className={`${active && "font-bold"} hidden xl:inline`}>{text}</span>       {/* //or here instead of text we can use props.text if we pass props then   */}

    </div>
  )
}
