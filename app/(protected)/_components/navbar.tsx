

"use client"

import { UserButton } from "@/components/auth/user-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Navbar = () => {
    const pathname = usePathname()

    return (
        <nav className="  p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex space-x-6">
                    <Button 
                        asChild
                        variant={pathname === "/settings" ? "default" : "outline"}
                       
                    >
                        <Link href="/settings">Settings</Link>
                    </Button>
                    <Button 
                        asChild
                        variant={pathname === "/server" ? "default" : "outline"}
                       
                    >
                        <Link href="/server">Server</Link>
                    </Button>
                    <Button 
                        asChild
                        variant={pathname === "/client" ? "default" : "outline"}
                       
                    >
                        <Link href="/client">Client</Link>
                    </Button>
                    <Button 
                        asChild
                        variant={pathname === "/admin" ? "default" : "outline"}
                        
                    >
                        <Link href="/admin">Admin</Link>
                    </Button>
                </div>
                <div className="flex items-center">
                    <UserButton />
                </div>
            </div>
        </nav>
    )
}
