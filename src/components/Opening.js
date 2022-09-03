import React from "react"

const Opening = (props) => {
    return (
        <div className="opening-section">
            <div className="bottom-left"></div>
            <div className="top-right"></div>
            <main className='start-content'>
                <h1 className="title">Quizzical</h1>
                <button className="start-game" onClick={props.playButton}>Start quiz</button>
                <div className="credit-web">
                        <p className="source-credit">Website design & idea from Scrimba React Course</p>
                        <a href="https://scrimba.com/learn/learnreact/react-section-4-solo-project-co24f49bea8aace7c174082c8" target="_blank">https://scrimba.com/learn/learnreact/react-section-4-solo-project-co24f49bea8aace7c174082c8</a>
                        <p className="madeby">Code by William Nurdin Wijaya</p>
                </div>
            </main>

        </div>
    )
}

export default Opening