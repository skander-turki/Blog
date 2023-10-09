import * as React from 'react';
import './TopBar.css'
function TopBar(props) {
    const handleToggle = () => {
        props.toggleNavigation();
      };
    
    return(
            <div className='topbar'>
                <div className='toggle' onClick={handleToggle}>
                    <ion-icon name="menu-outline"></ion-icon>
                </div>
                <div className='search'>
                    <label>
                        <input type="text" placeholder="Search here"/>
                        <ion-icon name="search-outline"></ion-icon>
                    </label>
                </div>
                <div className='user'>
                    <img src={props.user.Image} alt="no image" />
                </div>
            </div>
    );
}
export default TopBar