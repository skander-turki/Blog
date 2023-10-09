import React  from "react";
import './VideoSlider.css'
function VideoSlider () {
console.log("************************")
    return (
        <div className="container">
            <button className="handle left-handle">
              <div className="text">
                &#8249;   
              </div>
            </button>
            <div className="slider">
                <img src="https://via.placeholder.com/210/00FF00?text=1" />
                <img src="https://via.placeholder.com/220/00FF00?text=2" />
                <img src="https://via.placeholder.com/230/00FF00?text=3" />
                <img src="https://via.placeholder.com/240/00FF00?text=4" />
                <img src="https://via.placeholder.com/250/00FF00?text=5" />
                <img src="https://via.placeholder.com/260/00FF00?text=6" />
                <img src="https://via.placeholder.com/270/00FF00?text=7" />
                <img src="https://via.placeholder.com/280/00FF00?text=8" />
                <img src="https://via.placeholder.com/290/00FF00?text=9" />
            </div>
            <button className="handle right-handle">
                <div className="text">
                    &#8250;  
                </div>                 
            </button>
        </div>
    )
}
export default VideoSlider;