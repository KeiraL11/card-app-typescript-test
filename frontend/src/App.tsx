import React, { useState } from "react";
import NavBar from './components/NavBar'
import AllEntries from './routes/AllEntries'
import NewEntry from './routes/NewEntry'
import EditEntry from './routes/EditEntry'
import { EntryProvider } from './utilities/globalContext'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    if(!darkMode){
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };


  return (
    <section>
  <Router>
    <EntryProvider>
      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} min-h-screen`}>
        <NavBar darkMode={darkMode} handleToggle={handleDarkModeToggle} />
      <Routes>
        <Route path="/" element={<AllEntries darkMode={darkMode}/>}>
        </Route>
        <Route path="create" element={<NewEntry darkMode={darkMode}/>}>
        </Route>
        <Route path="edit/:id" element={<EditEntry darkMode={darkMode}/>}>
        </Route>
      </Routes>
      </div>
    </EntryProvider>
    </Router>
    </section>
    
  );
}
