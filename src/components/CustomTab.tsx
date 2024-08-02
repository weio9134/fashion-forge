import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { useSnapshot } from 'valtio'
import state from '@/store'

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
  const snap = useSnapshot(state)
  const styles = isFilterTab && isActivetab ? {
    backgroundColor: snap.color,
    opacity: 0.5
  } : {
    backgroundColor: "transparent",
    opacity: 1
  }
  
  return (
    <div
      className={`tab-btn ${isFilterTab ? 'rounded-full glassmorphism' : 'rounded-4'}`}
      onClick={handleClick}
      style={styles}
    >
      <Image
        src={tab.icon}
        alt={tab.name}
        width={50}
        height={50}
        className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'}`}
      />
    </div>
  )
}

export default CustomTab