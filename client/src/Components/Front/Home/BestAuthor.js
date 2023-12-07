import React from "react";
import "./BestAuthor.css"

function BestAuthor () {

    return(
        <div className="BestAuthor">
            <span className="Title">Popular author</span>
            <div className="AuthorCard">
                <img src="https://res.cloudinary.com/turkiskander/image/upload/v1701221441/Internship/Assets/Author3_eta2a3.jpg" />
                <div className="AuthorInfo">
                    <span className="Title">Julio Glenn</span>
                    <span className="Description"> Bio: A wordsmith at heart, Julio Glenn crafts narratives that resonate with the complexities of life. His storytelling prowess captures the essence of human experience, navigating the intricacies of relationships and self-discovery. </span>
                </div>
                <button>Follow</button>
            </div>
            <div className="AuthorCard">
                <img src="https://res.cloudinary.com/turkiskander/image/upload/v1701221434/Internship/Assets/Author2_bwwh9a.jpg" />
                <div className="AuthorInfo">
                    <span className="Title">Jakobe Collier</span>
                    <span className="Description">Bio: Jakobe Collier, a master of suspense and intrigue, invites readers into the shadows where mysteries unfold. With a keen eye for detail and a penchant for plot twists, his stories keep readers on the edge of their seats.</span>
                </div>
                <button>Follow</button>
            </div>
            <div className="AuthorCard">
                <img src="https://res.cloudinary.com/turkiskander/image/upload/v1701222022/Internship/Assets/Author_4_kxk4lz.jpg" />
                <div className="AuthorInfo">
                    <span className="Title">Fatima Atkinson</span>
                    <span className="Description">Bio: Fatima Atkinson, a literary architect, constructs worlds with words, creating vibrant landscapes where characters breathe life into every page. Her narratives are a testament to the power of storytelling in igniting the imagination.</span>
                </div>
                <button>Follow</button>
            </div>

        </div>
    );
}
export default BestAuthor;