import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div className="ui secondary pointing menu" >
            <Link to="/" className="item">
                Todos
            </Link>
            <div className="right menu">
            <Link to="/" className="item">
                All Todos
            </Link>
            </div>
        </div>
    );
};

export default Header;