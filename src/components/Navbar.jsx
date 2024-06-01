import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-950 flex justify-around items-center px-4 h-14 text-green-500">
      <div className="logo font-bold text-white text-2xl">
        <span className="text-green-700">&lt; </span>
        Pass
        <span className="text-green-700">OP/ &gt;</span>
      </div>

      {/* <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
        </li>
    </ul> */}
      <button className="text-white bg-green-800 my-5 px-4  rounded-full flex gap-1 justify-center items-center">
        <img
          className="invert p-1"
          width={45}
          src="icons/icons8-github-64.png"
          alt="github logo"
        />
        GitHub
      </button>
    </nav>
  );
};

export default Navbar;
