import React, { useEffect, useState }  from "react";
import './VideoSlider.css';
import { useDispatch, useSelector } from "react-redux";
import {GetTrending} from '../../../Redux/actions/posts';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function VideoSlider () {
    const dispatch = useDispatch();
    
    
    /*****Trending*********************************************************************************** */
    useEffect(() => {
        dispatch(GetTrending());
    }, [dispatch])
    
        const TrendingPosts = useSelector((state) =>state.postReducer.trending.data)
        const ListTrending = TrendingPosts ? TrendingPosts.map((post, index) => 
                <div key={index} className="image-container">
                        <div className="image-wrapper">
                            <img src={post.Post === "Video" ? post.LinkImage : post.LinkImages[0]} />
                        </div>
                    <div className="image-description">{post.description}</div>
                </div>
            
        ): null   
 /*****Trending*********************************************************************************** */
    const [sliderIndex, setSliderIndex] = useState(0);

    const handleSlideClick = (direction) => {
        const progressBar = document.querySelector(".progress-bar");
        const slider = document.querySelector(".slider");
        const progressBarItemCount = progressBar.children.length;

        if (direction === "left") {
            if (sliderIndex - 1 < 0) {
                setSliderIndex(progressBarItemCount - 1);
                progressBar.children[sliderIndex].classList.remove("active");
                progressBar.children[progressBarItemCount - 1].classList.add("active");
            } else {
                setSliderIndex(prevIndex => prevIndex - 1);
                progressBar.children[sliderIndex].classList.remove("active");
                progressBar.children[sliderIndex - 1].classList.add("active");
            }
        }

        if (direction === "right") {
            if (sliderIndex + 1 >= progressBarItemCount) {
                setSliderIndex(0);
                progressBar.children[sliderIndex].classList.remove("active");
                progressBar.children[0].classList.add("active");
            } else {
                setSliderIndex(prevIndex => prevIndex + 1);
                progressBar.children[sliderIndex].classList.remove("active");
                progressBar.children[sliderIndex + 1].classList.add("active");
            }
        }
    };
    function calculateProgressBar(progressBar) {
        progressBar.innerHTML = "";
        const slider = progressBar.closest(".row").querySelector(".slider");
        const itemCount = TrendingPosts.length;
        const itemsPerScreen = parseInt(
            window.getComputedStyle(slider).getPropertyValue("--items-per-screen")
        );
        const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen);

        for (let i = 0; i < progressBarItemCount; i++) {
            const barItem = document.createElement("div");
            barItem.className = "progress-item";
            if (i === sliderIndex) {
                barItem.classList.add("active");
            }
            progressBar.appendChild(barItem);
        }
    }
    useEffect(() => {
        if(TrendingPosts !== undefined)
        document.querySelectorAll(".progress-bar").forEach(calculateProgressBar);
    }, [TrendingPosts]);
    
    
    return (
        <div className="row">
            <div className="header">
                <h3>Trending Now</h3>
                <div class="progress-bar"></div>
            </div>
            <div className="container">
                <button className="handle left-handle" onClick={() => handleSlideClick("left")}>
                <div className="text">
                    &#8249;   
                </div>
                </button>
                <div className="slider" style={{ transform: `translateX(calc(${sliderIndex} * -100%))` }}>
                 {ListTrending} 
                </div>

                <button className="handle right-handle" onClick={() => handleSlideClick("right")}>
                    <div className="text">
                        &#8250;  
                    </div>                 
                </button>
            </div>
        </div>
    )
}
export default VideoSlider;