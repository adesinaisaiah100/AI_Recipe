import React from 'react';
import { createRoot } from 'react-dom/client';
import './input.css';
import Food from "./components/images/food.png"
import Main  from "./components/Main";
import Header from "./components/header";
// filepath: /c:/Users/Isaiah/project9/src/index.js


const root = createRoot(document.getElementById("root"))


root.render(
  <>
    {/* <Header /> */}
  <div className='relative body-bg flex flex-col w-full h-[100vh] overflow-hidden '>

      <Header />      
      <div className='flex flex-col h-full justify-center items-center w-full p-5'>
        <h1 className='h1 text-7xl text-center font-bold mb-10 text-neutral-200'>
          You don't have recipes? No problem! Just enter the ingredients you have and let <span className='h1_span text-yellow-300'>Chef Claude</span> do the rest!
        </h1>
        <button  onClick={() => {
          const mainSection = document.querySelector('.main_section');
          if (mainSection) {
            mainSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className='mt-5 px-6 w-50 py-3 bg-yellow-400 text-neutral-800 text-xl rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300'
        >
          Get Started
        </button>
      </div>
     
    </div>
     <div className='h-screen w-full flex flex-col justify-start items-center'>
        <Main/>
      </div>
  </>
)