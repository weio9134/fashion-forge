import { StaticImageData } from 'next/image'
import React from 'react'

type Props = {
  tab: {
    name: string,
    icon: StaticImageData
  },
  handleClick: () => void,
  isFilterTab?: boolean,
  isActivetab?: boolean
}

const CustomTab = ({ tab, handleClick, isFilterTab, isActivetab }: Props) => {
  return (
    <div>
      {tab.name}
    </div>
  )
}

export default CustomTab