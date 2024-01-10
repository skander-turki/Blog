import * as React from 'react';
import { useEffect, useState} from "react";
import './CreatePost.css'
import TypePicker from '../../../Components/Front/CreatePost/TypePicker';
import Details from '../../../Components/Front/CreatePost/Details';
import Uploads from '../../../Components/Front/CreatePost/Uploads';


function CreatePost () {
const [step , setStep] = useState(0);
const [post , setPost] = React.useState({
    Titre : "",
    tags:[],
    Description : "",
    Category: "", 
    LinkImage : "",
    LinkAudio : "",
    LinkVideo: "",
    Post : "" 
})
const handlestep = (e) => {
    setStep(step + 1)
}
const handlestepdown = (e) => {
    setStep(step - 1)
}
const handleType = (data) => {
    setPost({...post, Post: data})
}
const handleDetails = (data) => {
    setPost({
        ...post,
        Titre : data.Titre, 
        tags : data.Tags,
        Category: data.Category,
        Description : data.Description
    })
}
const handleUploads = (data) => {
    setPost({
        ...post,
        LinkAudio : data.LinkAudio, 
        LinkImage : data.LinkImage,
        LinkVideo: data.LinkVideo
    })
}

    return (
        <div className='post-container'>
            <div className='step-wizard'>
                <ul className='step-wizard-list'>
                    <li className={ step == 0 ? 'step-wizard-item current-item' : 'step-wizard-item'}>
                        <span className='progress-count'>1</span>
                        <span className='progress-label'>Type</span>
                    </li>
                    <li className={ step == 1 ? 'step-wizard-item current-item' : 'step-wizard-item'}>
                        <span className='progress-count'>2</span>
                        <span className='progress-label'>Details</span>
                    </li>
                    <li className={ step == 2 ? 'step-wizard-item current-item' : 'step-wizard-item'}>
                        <span className='progress-count'>3</span>
                        <span className='progress-label'>Uploads</span>
                    </li>
                    <li className='step-wizard-item'>
                        <span className='progress-count'>4</span>
                        <span className='progress-label'>Success</span>
                    </li>
                </ul>    
            </div>
            <div className='create-post-box'>
            {
                step == 0 ? <TypePicker  
                                handlestep={handlestep} 
                                sendDataToParent={handleType}
                                data={post}
                                /> :
                step ==1 ?  <Details 
                                handlestep={handlestep} 
                                handlestepdown={handlestepdown} 
                                sendDataToParent={handleDetails}
                                data={post}
                                /> :
                step ==2 ?  <Uploads 
                                handlestep={handlestep} 
                                handlestepdown={handlestepdown} 
                                sendDataToParent={handleUploads}
                                data={post}
                                /> :
                
                null
            }
            </div>
        </div>
    );
}

export default CreatePost;