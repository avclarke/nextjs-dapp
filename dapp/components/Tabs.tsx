import { useState } from 'react'

function TabItem({ children, selected, onClick }) {
  let style =
    'px-5 py-3 flex-1 text-center text-gray-400 border-b-2 border-grey-100 cursor-pointer'
  if (selected) {
    style = style + ' border-purple-600 color-grey text-purple-600'
  }
  return (
    <div className={style} onClick={onClick}>
      {children}
    </div>
  )
}

export default function Tabs({
  items,
  selected,
  onSelectTab,
}: {
  items: Array<string>
  selected: string
  onSelectTab: (tab: string) => any
}) {
  return (
    <div className="flex flex-row my-6">
      {items.map((i) => {
        return (
          <TabItem onClick={() => onSelectTab(i)} selected={selected === i}>
            {i}
          </TabItem>
        )
      })}
    </div>
  )
}
