import React from 'react'
import CustomButton from './CustomButton'

type Props = {
  file: File | null,
  setFile: React.Dispatch<React.SetStateAction<File | null>>,
  readFile: (val: string) => void
}

const FilePicker = ({ file, setFile, readFile}: Props) => {
  return (
    <div className='filepicker-container'>
      <div className="flex-1 flex flex-col">
        <input 
          id="file-upload" 
          type='file' 
          accept='image/'
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
        <label htmlFor="file-upload" className='filepicker-label'>
          Upload File
        </label>

        <p className='mt-2 text-gray-500 text-xs'>
          <p className='text-gray-700'> Upload an image and change the logo or shirt designs! <br/><br/> </p>
          { file ? file.name : "No file selected"}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          type="filled"
          title="Logo"
          handleClick={() => readFile('logo')}
          styles='text-xs'
        />
        <CustomButton
          type="filled"
          title="Shirt"
          handleClick={() => readFile('full')}
          styles='text-xs'
        />
      </div>
    </div>
  )
}

export default FilePicker