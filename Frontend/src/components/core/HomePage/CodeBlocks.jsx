import React from 'react'
import CTAButton from "../HomePage/Button"
import {FaArrowRight} from 'react-icons/fa'

import HighlightText from './HighlightText'

function CodeBlocks({position , heading , subheading , ctabtn1 , ctabtn2 , codeblock , backgroundGradient , codeColor}) {
  return (
    <div className={`flex flex-row ${position} my-20 justify-between gap-10` }>
        {/* {section 1} */}
         <div className='w-[50%] flex flex-col gap-10'>
              {heading} 
              <div className='text-richblack-300 font-bold '>
                    {subheading}
              </div>

              <div className='flex gap-7 mt-7'>
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                          <div className='flex gap-2 items-center'>
                                 {ctabtn1.btntext}
                                 <FaArrowRight/>
                          </div>
                    </CTAButton>
                    
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                            {ctabtn2.btntext}
                    </CTAButton>
              </div>


         </div>

         {/* {section 2} */}
          <div>
               
          </div>

    </div>
  )
}

export default CodeBlocks   