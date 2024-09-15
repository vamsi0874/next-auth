

import { UserInfo } from "@/components/user-info"
import { currentUser } from "@/lib/auth"

const ServerPage = async () => {
    const user = await currentUser()

    return (
        <div className="flex  justify-center p-4  bg-gray-50">
            <UserInfo user={user} label="Server Component" />
        </div>
    )
}

export default ServerPage
