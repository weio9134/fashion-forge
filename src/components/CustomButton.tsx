import state from '@/store'
import React from 'react'
import { useSnapshot } from 'valtio'
import { getContrastingColor } from '@/config/helpers'

type Props = {
  type: string,
  title: string,
  handleClick: () => void,
  styles: string
}

const CustomButton = ({ type, title, handleClick, styles }: Props) => {
  const snap = useSnapshot(state)
  const getStyle = () => {
    if(type === 'filled') 
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color)
      }
    else 
      return {
        borderWidth: '1px',
        borderColor: snap.color,
        color: snap.color
      }
  }

  return (
    <button 
      className={`px-2 py-1.5 flex-1 rounded-md ${styles}`} 
      style={getStyle()}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton