import React from 'react'
import {FaArrowRight} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import HighlightText from '../components/core/HomePage/HighlightText'

import CTAButton from '../components/core/HomePage/Button'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'

const Home = () => {
  return (
    <div>
       {/* {Section 1} */}
        <div className=' relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between '>
            <   Link to ={"/signup"}>

               <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 
                   transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-8 py-[5px]
                            transition-all duration-200 group-hover:bg-richblack-900'>
                       <p>Become an Instructor</p>
                       <FaArrowRight></FaArrowRight>
                    </div>
               </div>


            </Link>

            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with 
                <HighlightText text={"Coding Skills"} />
            </div>

            <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world , and get access to a wealth of resources , including hands-on projects,quizzes,and personalized feedback from instructors.
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                 <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                 <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
            </div>

            <div className='mx-3 my-12 shadow -blue-200'>
                <video muted autoPlay loop >
                    <source src={Banner} type='video/mp4'/>
                </video>
            </div>

            {/* {Code section A} */}
            <div>
                <CodeBlocks 
                           position={"lg:flex-row"}
                           heading = {
                                 <div className='text-4xl font -semibold'>
                                    Unlock Your
                                    <HighlightText text={"Coding Potential"} />
                                    with our onlne courses
                                 </div>
                           } 
                            subheading = {
                                 <div>
                                      Our courses are designed to help you learn coding from scratch, 
                                      and provide you with the tools you need to succeed in the tech industry.
                                 </div>
                            }

                            ctabtn1 = {{
                                active : true,
                                linkto : "/signup",
                                btntext : "try it yourself"
                            }}

                            ctabtn2 = {{
                                active : false,
                                linkto : "/login",
                                btntext : "learn more"
                            }}

                            codeblock = {`<<!DOCTYPE html>\n <html> \n <head><title>Example</ \n 
                                title><link rel="stylesheet" href="styles.css"> \n
                                /head> \n 
                                <body> \n
                                h1>< a href="/">Header</a> \n
                                </h1> \n
                                <nav> <a href="one/">One</a> \n
                                <a href="two/">Two</a> \n 
                                /nav>`}

                            codeColor={text-yellow-25}

                />
            </div>
        </div>
        

       {/* {Section 2} */}


       {/* {Section 3} */}


       {/* {footer } */}



    </div>
  )
}

export default Home ;

