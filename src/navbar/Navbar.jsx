import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

export default function Navbar({ account, tokenBalance }) {
    const [formattedTokenBalance, setFormattedTokenBalance] = useState(
        parseInt(tokenBalance, 10).toLocaleString()
    );

    useEffect(() => {
        // Update the formattedTokenBalance whenever tokenBalance changes
        setFormattedTokenBalance(parseInt(tokenBalance, 10).toLocaleString());
    }, [tokenBalance]);

    return (
        <nav className = 'nav-loc component-spacing'>
            <a className = 'nav-container nav-title-font' 
                href='https://github.com/Minkun00/Betting'>
                VOTE FOR LEAGUE OF LEGEND CHAMPIONSHIP KOREA 
            </a>
            <div>
                <div className = 'nav-left nav-subtitle-font'>
                    Account Number: { account }<br/>
                    tokenBalance: { formattedTokenBalance }   
                </div>            
                <div className = 'nav-container'>
                    <Link to='/owner'>
                        <button className = 'nav-button'>OWNER PAGE</button>
                    </Link>
                    <div className = 'nav-space'></div>
                    <Link to='/'>
                        <button className = 'nav-button'>VOTE PAGE</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
