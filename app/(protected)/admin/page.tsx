
"use client"

import { admin } from "@/actions/admin"
import { RoleGate } from "@/components/auth/role-gate"
import { FormSuccess } from "@/components/FormSuccess"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { toast } from "sonner"

const AdminPage = () => {

  const onServerActionClick = () => {
    admin().then((res) => {
      if (res.success) {
        toast.success(res.success)
      }
      if (res.error) {
        toast.error(res.error)
      }
    })
  }

  const onApiRouteClick = () => {
    fetch('/api/admin').then((response) => {
      if (response.ok) {
        toast.success("Allowed API Route")
      } else {
        toast.error("FORBIDDEN API Route")
      }
    })
  }

  return (
    <div className="flex justify-center p-4 bg-gray-50">
      <Card className="w-[600px] shadow-md rounded-lg">
        <CardHeader className=" p-4 rounded-t-lg">
          <p className="text-2xl font-semibold text-center">
            Admin
          </p>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <RoleGate allowedRole="ADMIN">
            <FormSuccess message="You are allowed to see this content!" />
          </RoleGate>
          <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
            <p className="text-sm font-medium">Admin-only API route</p>
            <Button onClick={onApiRouteClick}>Click to test</Button>
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
            <p className="text-sm font-medium">Admin-only Server action</p>
            <Button onClick={onServerActionClick}>Click to test</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminPage
