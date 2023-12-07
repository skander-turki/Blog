import React from "react";
import './Style.css';

function TemplateTest (props) {

    return(
        <div className="TemplateMain">
            <div className="NavigationSectionTest">
                <div className="NavigationBar">
                    <img src={props.theme.Logo}/>
                    <ul className="Navigation">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Write</a></li>
                        <button>Get Started</button>
                    </ul>
                </div>  
                <div className="AppBarContent">
                    <h1>{props.theme.Title}</h1>
                    <p>{props.theme.SubTitle}</p>
                    <button>Start reading</button>
                </div>
            </div>
        </div>
    );
}
export default TemplateTest