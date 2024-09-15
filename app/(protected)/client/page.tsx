"use client"
import { UserInfo } from "@/components/user-info"
import { useCurrentUser } from "@/hooks/use-current-user"


const ClientPage =  () => {

    const user =  useCurrentUser()
  return (
    <div className="flex  justify-center p-4  bg-gray-50">
     <UserInfo user={user} label="client component"/>
    </div>
  )
}

export default ClientPage