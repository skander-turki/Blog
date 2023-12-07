import React from "react";
import "./Footer.css"

function Footer() {

    return(
        <div className="Footer">
            <div className="SocialMedia">
                <span className="TitleSM">Discover the latest data, inspiration and insights from us.</span>
                <div className="icons">
                    <a href=""><ion-icon className="icon" name="logo-linkedin"></ion-icon></a>
                    <a href=""><ion-icon className="icon" name="logo-facebook"></ion-icon></a>
                    <a href=""><ion-icon className="icon" name="logo-twitter"></ion-icon></a>
                    <a href=""><ion-icon className="icon" name="logo-rss"></ion-icon></a>
                </div>
            </div>
        </div>
    )
}
export default Footer;