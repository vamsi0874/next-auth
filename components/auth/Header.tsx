import React from 'react'

interface HeaderProps {
    label : string
}
export const Header = ({label}:HeaderProps) => {
  return (
   <>
      <h1>Auth</h1>
      <p>{label}</p>
    </>
  )
}
