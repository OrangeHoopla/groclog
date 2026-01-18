import { Metadata } from "next"
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";


export const metadata: Metadata = {
  title: 'GrocLog',
  description: '...',
}



export default function Page() {
  
  return (

    <div>
      <LoginButton />
      <LogoutButton/>
      hello
    </div>

  )
}
