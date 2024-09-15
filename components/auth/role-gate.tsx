"use client"

import { UseCurrentRole } from "@/hooks/use-current-role"
import { FormError } from "../FormError"

interface RoleGateProps {
    children: React.ReactNode,
    allowedRole:any
}
export const RoleGate = ({
    children,
    allowedRole
}: RoleGateProps) =>{
    const role = UseCurrentRole()
    // const role = 'ADMIN'
    console.log(role) 

    if(role!== allowedRole) {
        return (
            <FormError message="you do not have permission to view this content"/>
        )
    }
    return (
        <>
        {children}
        </>
    )
}