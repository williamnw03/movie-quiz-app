import React, { useState } from "react"
import Game from "./components/Game"
import Opening from "./components/Opening"


const App = () => {
    const [play, setPlay] = useState(false)

    const playButton = () => {
        setPlay(prev => !prev)
    }
    return (
        <div className="App">
            {!play && <Opening playButton={playButton}/>}
            {play && <Game/>}
        </div>
    )
}

export default App