"use client"

import { logout } from "@/actions/logout"
import { settings } from "@/actions/settings"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useCurrentUser } from "@/hooks/use-current-user"
import { SettingsSchema } from "@/Schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Form,
  FormDescription,
  FormItem,
  FormControl,
  FormField,
  FormMessage,
  FormLabel
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { FormError } from "@/components/FormError"
import { FormSuccess } from "@/components/FormSuccess"

const Settings = () => {
  const user = useCurrentUser()

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      newpassword: undefined,
      password: undefined,
      name: user?.name || undefined,
      email: user?.email || undefined,
      role: user?.role || undefined
    }
  })

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values).then((data) => {
        if (data.error) {
          setError(data.error)
        }
        if (data.success) {
          setSuccess(data.success)
        }
      }).catch(() => setError("Something went wrong"))
    })
  }

  return (
    <Card className="bg-white shadow-md rounded-lg p-6">
      <CardHeader className="border-b border-gray-200 pb-4 mb-6">
        <p className="text-xl font-semibold text-gray-900">Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Name</FormLabel>
                    <FormControl>
                      <Input {...field}
                        placeholder="vamsi"
                        disabled={isPending}
                        className="border-gray-300 rounded-md shadow-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              {user?.isOAuth === false && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Email</FormLabel>
                        <FormControl>
                          <Input {...field}
                            placeholder="vamsi@gmail.com"
                            disabled={isPending}
                            className="border-gray-300 rounded-md shadow-sm"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Password</FormLabel>
                        <FormControl>
                          <Input {...field}
                            type="password"
                            placeholder="******"
                            disabled={isPending}
                            className="border-gray-300 rounded-md shadow-sm"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newpassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">New Password</FormLabel>
                        <FormControl>
                          <Input {...field}
                            type="password"
                            placeholder="******"
                            disabled={isPending}
                            className="border-gray-300 rounded-md shadow-sm"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Role</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='ADMIN'>
                          Admin
                        </SelectItem>
                        <SelectItem value='USER'>
                          User
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit" className="mt-4 bg-blue-500 text-white hover:bg-blue-600">
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default Settings
