"use client"
import state from '@/store'
import React from 'react'
import { useSnapshot } from 'valtio'

type Props = {
  type: string,
  title: string,
  handleClick: () => void,
  styles: string
}

const CustomButton = ({ type, title, handleClick, styles }: Props) => {
  const snap = useSnapshot(state)
  const getStyle = () => {
    if(type === 'filled') return {
      backgroundColor: snap.color,
      color: '#fff'
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