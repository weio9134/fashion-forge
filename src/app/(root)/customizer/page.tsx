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
import FilePicker from '@/components/FilePIcker'

const Customizer = () => {
  const snap = useSnapshot(state);
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
                    handleClick={() => {}}
                  />
                ))}
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
                handleClick={() => {}}
                isFilterTab={true}
                isActivetab={false}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer