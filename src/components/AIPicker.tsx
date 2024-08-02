import React from 'react'
import axios from 'axios'
import CustomButton from './CustomButton'

type Props = {
  prompt: string,
  setPrompt: React.Dispatch<React.SetStateAction<string>>,
  generating: boolean,
  handleSubmit: (val: string) => void
}

const AIPicker = ({ prompt, setPrompt, generating, handleSubmit }: Props) => {
  return (
    <div className='aipicker-container'>
      <textarea 
        placeholder='Ask AI to generate an image'
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className='aipicker-textarea'
      />

      <div className="flex flex-wrap gap-3">
        { generating ? (
          <CustomButton
            type="outline"
            title="Asking AI ..."
          />
        ) : (
          <>
            <CustomButton
              type="filled"
              title="Get AI Logo"
              handleClick={() => handleSubmit('logo')}
              styles='text-xs'
            />
            <CustomButton
              type="filled"
              title="Get AI Shirt"
              handleClick={() => handleSubmit('full')}
              styles='text-xs'
            />
          </>
        )}
      </div>
    </div>
  )
}

export default AIPicker