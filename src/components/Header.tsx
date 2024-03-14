import React, { useContext } from 'react'
import LogoIcon from '../assets/LogoIcon'
import MoonIcon from '../assets/MoonIcon'
import SunIcon from '../assets/SunIcon';
import { ThemeContext } from '../App';


const Header = () => {

    const { isDark, setIsDark } = useContext(ThemeContext);

    return (
        <header className="header">
            <div className="container">
                <div className="logo-wrapper">
                    <div className="logo">
                        <LogoIcon />
                        <span>Snipets-JS</span>
                    </div>
                    <button onClick={() => setIsDark(!isDark)} className="icon">{isDark ? <MoonIcon /> : <SunIcon />}</button>
                </div>
            </div>
        </header>
    )
}

export default Header