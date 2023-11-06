import * as React from 'react';
import './CreatePost.css'

function CreatePost () {


    return (
        <div className='step-wizard'>
            <ul className='step-wizard-list'>
                <li className='step-wizard-item'>
                    <span className='progress-count'>1</span>
                    <span className='progress-label'>Type</span>
                </li>
                <li className='step-wizard-item '>
                    <span className='progress-count'>2</span>
                    <span className='progress-label'>Details</span>
                </li>
                <li className='step-wizard-item current-item'>
                    <span className='progress-count'>3</span>
                    <span className='progress-label'>Uploads</span>
                </li>
                <li className='step-wizard-item'>
                    <span className='progress-count'>4</span>
                    <span className='progress-label'>Content</span>
                </li>
                <li className='step-wizard-item'>
                    <span className='progress-count'>5</span>
                    <span className='progress-label'>Success</span>
                </li>
            </ul>
            
        </div>
    );
}

export default CreatePost;