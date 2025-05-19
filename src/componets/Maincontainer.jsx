import React from 'react'

const Maincontainer = ({ children }) => {
  return (
     <div className="flex justify-center items-center min-h-[80vh] ">
      <div>
        {children}
      </div>
    </div>
  )
}

export default Maincontainer