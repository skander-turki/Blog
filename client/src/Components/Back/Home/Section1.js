import * as React from 'react';
import './Section1.css';

function Section1 () {

return(
    <div className='cardBox'>
        <div className='card'>
            <div>
                <div className='numbers'>150</div>
                <div className='cardName'>Total Accounts</div>
            </div>
            <div className='iconBx'>
                <ion-icon name="people-outline"></ion-icon>
            </div>
        </div>
        <div className='card'>
            <div>
                <div className='numbers'>2000</div>
                <div className='cardName'>Total Posts Views</div>
            </div>
            <div className='iconBx'>
                <ion-icon name='eye-outline'/>
            </div>
        </div>
        <div className='card'>
            <div>
                <div className='numbers'>1505</div>
                <div className='cardName'>Total Likes</div>
            </div>
            <div className='iconBx'>
                <ion-icon name="thumbs-up-outline"></ion-icon>
            </div>
        </div>
        <div className='card'>
            <div>
                <div className='numbers'>1505</div>
                <div className='cardName'>Total Comments</div>
            </div>
            <div className='iconBx'>
                <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
            </div>
        </div>
        
    </div>
);
}
export default Section1;