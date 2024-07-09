import {useState} from 'react';
import {NavLink} from 'react-router-dom'

interface NavBarProps {
  darkMode: boolean;
  handleToggle: () => void;
}

const NavBar: React.FC<NavBarProps> = ({darkMode, handleToggle}) => {
    return(
      <nav className={`flex justify-center gap-5 p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} transition-colors duration-300`}>
        <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" to={'/'}>All Entries</NavLink>
        <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" to={'/create'}>New Entry</NavLink>
        <button onClick={handleToggle} className="m-3 p-4 text-x1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700 rounded-md front-medium text-black dark:text-white transition-colors duration-300">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>
    );
};

export default NavBar;