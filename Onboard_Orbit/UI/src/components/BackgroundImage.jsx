import React from "react";
import DarkWallpaper from '../assets/Images/DarkWallpaper.png'

const BackgroundImage = ({ children }) => {
    return (
        <div
            style={{
                backgroundImage: `url(${DarkWallpaper})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100%",
                minHeight:"100%"
                // flex:1
            }}
        >
            {children}
        </div>
    );
};

export default BackgroundImage;
