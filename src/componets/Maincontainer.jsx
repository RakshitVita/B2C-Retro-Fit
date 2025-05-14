import React from 'react'

const Maincontainer = ({ children }) => {
  return (
     <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full  max-w-5xl">
        {children}
      </div>
    </div>
  )
}

export default Maincontainer