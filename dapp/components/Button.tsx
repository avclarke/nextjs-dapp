import { ReactElement } from 'react'

type Props = {
  onClick: any
  children: ReactElement | string
}

export default function Button({ onClick, children }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 text-white font-bold py-3 px-4 w-full rounded">
      {children}
    </button>
  )
}
