import React, { useEffect, useState } from "react";
import "./SignUpFlow.css"
import Welcome from "../../../Assets/Animation/Welcome";
function SignUpFlow (props) {
    const [step , setStep] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 8000);
    return () => clearTimeout(timeoutId);
  }, []);
 return (
    <div className="SignUpFlow">
        <div className="Popup">
            {isVisible && (
                < Welcome />
            )}
            
            <div className="stepper">
                <span class={step == 0 ? "dot active" : "dot"}></span>
                <span class={step == 1 ? "dot active" : "dot"}></span>
            </div>
            
           { step == 0 ? 
            <div className="first-step">    
                    <img src={props.user.Image} />
                    <span>{props.user.Mail}</span>
                    <div className="duo">
                        <span>{props.user.Firstname}</span>
                        <span>{props.user.Lastname}</span>
                    </div>
                    <span className="Desc">Your responses to the following questions will help us find the right ideas for you . Thank you for helping us create a personalized experience just for you!</span>
                    <button type="submit" onClick={() => setStep(step +1)}>Next</button>
                </div> :
                <div className="secpnd-step">
                    
                </div>
            }
            
        </div>
        
    </div>
 )
}
export default SignUpFlow;