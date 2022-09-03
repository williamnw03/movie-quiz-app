import React, { useEffect, useState } from "react"
import Question from "./Question"

const Game = () => {

    const [dataQA, setDataQA] = useState([{
        question: null,
        correct: null,
        incorrect: null,
        allAnswers:[],
        answer: null,
        good: null,
        id: 0
    }])
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [score, setScore] = useState("")
    const [finish, setFinish] = useState(false)
    const [again, setAgain] = useState(false)

    useEffect(() => {
        const abortCont = new AbortController()

        const grabData = async () => {

            try {
                const response = await fetch("https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple", {signal: abortCont.signal})
                const data = await response.json()
                
                if(data.response_code == 0){
                    setDataQA(data.results.map((e, i) => {
                        return {
                            question: e.question,
                            correct: e.correct_answer,
                            incorrect: e.incorrect_answers,
                            allAnswers: [...e.incorrect_answers].concat(e.correct_answer),
                            answer: null,
                            good: null,
                            id: i + 1
                        } 
                    }))
                    setLoading(false)
                    setFailed(true)
                } else {
                    throw new Error("Failed to Fetch")
                }
            } 

            catch(err) {
                if(err.name === "AbortError"){
                } else {
                    setLoading(false)
                    setFailed(true)
                }
            }
        }
        grabData()

        return () => {
            abortCont.abort()
        }
    },[again])

    const clickAnswer = (event, id) => {
        const newData = dataQA.map(e => {
            if(e.id === id){
                return {
                    ...e,
                    answer: event.target.textContent,
                    good: event.target.textContent === e.correct
                }
            } else {
                return e
            }
        })

    const answers = document.querySelectorAll(`div.answer${id}`)
        answers.forEach(e => {
            if(e.className === event.target.className){
                e.style.backgroundColor = "rgb(252, 252, 142)"
            } else {
                e.style.backgroundColor = "white"
            }
        })
        setDataQA(newData)
    }

    const stopAnswer = (a, b) => {
        return undefined
    }

    const checkAnswer = () => {
        setFinish(prev => !prev)
        setScore(dataQA.filter(e => e.good).length)

        dataQA.forEach(eData => {
            if(!eData.good){
                const answers = document.querySelectorAll(`.answer${eData.id}`)
    
                answers.forEach(eAnswer => {
                    if(eAnswer.textContent == eData.answer){
                        eAnswer.style.backgroundColor = "rgba(255, 0, 0, 0.3)"
                    }

                    if(eAnswer.textContent == eData.correct){
                        eAnswer.style.backgroundColor = "rgba(50, 205, 50, 0.3)"
                    }
                })
            }
        })

    }

    const playAgain = () => {
        setAgain(prev => !prev)
        setFinish(prev => !prev)
        setLoading(true)
        setFailed(false)

        const answers = document.querySelectorAll(`div.answer`)
        answers.forEach(e =>  e.style.backgroundColor = "white")

        window.scrollTo(0,0)
    }

    return (
        <div className="game-content">


            <div className="bottom-left"></div>
            <div className="top-right"></div>

            {loading && <p className="loading">Loading...</p>}

            {loading && failed && <p>Failed to Fetch</p>}

            {!loading && <div className="questions-content">
                {dataQA.map(e => <Question 
                    key={e.id}
                    question={e.question} 
                    correct={e.correct} 
                    incorrect={e.incorrect}
                    id={e.id}
                    clickAnswer={finish ? stopAnswer : clickAnswer}
                    allAnswers={e.allAnswers}
                />)}
            </div>} 

            {!loading && failed && <div className="button-text">
                {finish && <p className="text">You scored <span>{score}</span>/5 correct answers</p>}
                <button className="play-finish-game" onClick={finish ? playAgain : checkAnswer}>{finish ? "Play Again" : "Finish"}</button>
            </div>}

        </div>
    )
}

export default Game