import React, { useState, useEffect } from "react";
import './Welcome.css'
import styled from "styled-components";
function Welcome() {
    return (
        <>
            <div className="welcome_container">
                <img src="./assets/images/heart.gif"></img>
                <h1>
                    WELCOME 
                </h1>
                <h3>Please select a chat to Start messaging.</h3>
            </div>
        </>
    )
}

export default Welcome