"use client"
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import { headContainerAnimation, headContentAnimation, headTextAnimation, slideAnimation } from '../../../config/motion'
import state from '@/store'
import Image from 'next/image'
import CustomButton from '@/components/CustomButton'

const Home = () => {
  const snap = useSnapshot(state);
  
  return (
    <AnimatePresence>
      { snap.intro && (
        <motion.section className='home' {...slideAnimation('left')} id="home">
          <motion.header {...slideAnimation('down')}>
            <Image
              src={'/threejs.png'}
              alt={'logo'}
              width={32}
              height={32}
              className='w-8 h-8 object-contain'
            />

          </motion.header>

          <motion.div className='home-content' {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                Let's <br className='lg:block hidden'/> do it!
              </h1>
            </motion.div>

            <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
              <p className='max-w-md font-normal text-gray-700 text-base'>
                <strong>Create, visualize, and perfect</strong> your unique style effortlessly!
                Experience the future of fashion design with cutting-edge AI and Three.js technology, 
                bringing your custom shirt designs to life in stunning 3D detail.
              </p>

              <CustomButton 
                type='filled'
                title='Start Customizing'
                handleClick={() => state.intro = false}
                styles='w-fit px-4 py-2.5 font-bold text-sm'
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home