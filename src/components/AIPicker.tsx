import React from 'react'

type Props = {
  prompt: string,
  setPrompt: React.Dispatch<React.SetStateAction<string>>,
  generatingImg: boolean,
  handleSubmit: (val: string) => void
}

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }: Props) => {
  return (
    <div>AIPicker</div>
  )
}

export default AIPicker