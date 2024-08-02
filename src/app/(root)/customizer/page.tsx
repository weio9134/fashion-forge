"use client"
import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '@/store'
import config from '@/config/config'
import { downloadCanvasToImage, reader } from '@/config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '@/config/constants'
import { fadeAnimation, slideAnimation } from '@/config/motion'
import AIPicker from '@/components/AIPicker'
import ColorPicker from '@/components/ColorPicker'
import CustomButton from '@/components/CustomButton'
import CustomTab from '@/components/CustomTab'
import FilePicker from '@/components/FilePicker'
import { stylishShirt } from '../../../../public/assets'
import axios from 'axios'

type DecalProp = { 
  stateProperty: string; 
  filterTab: string;
}

const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState<File | null>(null)
  const [prompt, setPrompt] = useState('')
  const [generatingImg, setGeneratingImg] = useState(false)
  const [activeEditTab, setActiveEditTab] = useState('')
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false
  })

  const getTabContent = () => {
    switch (activeEditTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />
      case "aipicker":
        return <AIPicker prompt={prompt} setPrompt={setPrompt} generating={generatingImg} handleSubmit={handleSubmit}/>
      default:
        return null
    }
  }

  const handleSubmit = async (type: string) => {
    if(!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await axios.post('/api/dalle', { message: prompt })
      const b64Image = response.data.message

      handleDecals(type, `data:image/png;base64,${b64Image}`)
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false);
      setActiveEditTab("");
    }
  }

  const handleDecals = (type: string, result: any) => {
    const decalType: DecalProp = DecalTypes[type]

    state[decalType.stateProperty] = result

    if(!activeFilterTab[decalType.filterTab]) 
      handleActiveFilterTab(decalType.filterTab)
  }

  const readFile = async (type: string) => {
    reader(file)

    const result = await reader(file)
    handleDecals(type, result)
    setActiveEditTab("")
  }

  const handleActiveFilterTab = (tabName: string) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab["logoShirt"];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab["stylishShirt"];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  return (
    <AnimatePresence>
      { !snap.intro && (
        <>
          {/* left side editing tabs */}
          <motion.div key="custom" className='absolute top-0 left-0 z-10' {...slideAnimation('left')}>
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                { EditorTabs.map(tab => (
                  <CustomTab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditTab(tab.name)}
                  />
                ))}

                <>
                  {getTabContent()}
                  { activeEditTab && (
                    <div onClick={() => setActiveEditTab('')} className='cursor-pointer'> 
                      Close
                    </div>
                  )}
                </>
              </div>
            </div>
          </motion.div>
          
          {/* go back button */}
          <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
            <CustomButton 
              type='filled'
              title='Go Back'
              handleClick={() => state.intro = true}
              styles='w-fit px-4 py-2.5 font-bold text-sm'
            />
          </motion.div>

          <motion.div className='filtertabs-container' {...slideAnimation('up')}>
            { FilterTabs.map(tab => (
              <CustomTab
                key={tab.name}
                tab={tab}
                handleClick={() => handleActiveFilterTab(tab.name)}
                isFilterTab={true}
                isActivetab={activeFilterTab[tab.name]}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer