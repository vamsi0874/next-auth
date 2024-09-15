"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger

} from "@/components/ui/dropdown-menu"

import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "@/components/ui/avatar"

import React from 'react'
import { FaUser } from "react-icons/fa6"
import { useCurrentUser } from "@/hooks/use-current-user"
import { LogoutButton } from "./logout-button"
import { ExitIcon } from "@radix-ui/react-icons"

export const UserButton = () => {

    const user = useCurrentUser()
  return (
    <DropdownMenu>
        {/* hi */}
        <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user?.image || ""}/>
                <AvatarFallback className="bg-sky-500">
                   <FaUser className="text-white"/>
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <LogoutButton>
                <DropdownMenuItem>
                    <ExitIcon className="h-4 w-4 mr-2"/>
                    Logout
                </DropdownMenuItem>
            </LogoutButton>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

// "use client";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import {
//   Avatar,
//   AvatarImage,
//   AvatarFallback,
// } from "@/components/ui/avatar";

// import React from "react";
// import { FaUser } from "react-icons/fa";
// import { useCurrentUser } from "@/hooks/use-current-user";

// export const UserButton = () => {
//   const user = useCurrentUser();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger>
//         <Avatar>
//           {/* Use the `src` prop for AvatarImage and provide fallback content */}
//           <AvatarImage src={user?.image || ""} />
//           <AvatarFallback className="bg-sky-500">
//             {user?.name?.[0] || <FaUser className="text-white" />}
//           </AvatarFallback>
//         </Avatar>
//       </DropdownMenuTrigger>

//       {/* Example Dropdown content */}
//       <DropdownMenuContent>
//         <DropdownMenuItem>Profile</DropdownMenuItem>
//         <DropdownMenuItem>Sign Out</DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };
