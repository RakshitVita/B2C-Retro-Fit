import React from "react";
const Navbar = () => {
  return (
<>
 <nav className="bg-white shadow p-4 flex items-center justify-between">
      <div className="text-2xl font-bold text-blue-700">RETRO FIT</div>
      <div className="space-x-6 text-sm text-gray-700 font-semibold">
        <a href="/">Home</a>
        <a href="/downloads">Downloads Log</a>
        <a href="/subscriptions">Subscriptions</a>
      </div>
      <button className="bg-blue-500 text-white px-4 py-1 text-sm rounded">
        i m ganesh
      </button>
    </nav>
</>
  )
}

export default Navbar