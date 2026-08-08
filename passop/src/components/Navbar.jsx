import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-10">
        <div className="logo font-bold text-white text-2xl">
          <span className='text-green-700'>/ &lt;</span>
          Pass
          <span className='text-green-700'>Op/ &gt;</span>
          </div>
      {/*<ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
        </li>
      </ul>*/}
     <button className="bg-green-700 hover:bg-green-600 text-white rounded-full flex items-center gap-2 px-4 py-2">
  <img
    className="invert w-6 h-6"
    src="/icons/github.svg"
    alt="GitHub logo"
  />
  <span className="font-bold">Github</span>
</button>
      </div>
    </nav>
  )
}

export default Navbar
