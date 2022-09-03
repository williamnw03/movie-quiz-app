import React, { useEffect, useState } from "react"

const Question = (props) => {

    const [shuffled, setShuffled] = useState([...props.allAnswers])
    
    useEffect(() => {
        setShuffled(prev => {
            const newArr = [...prev]
            
            for(let i = 0; i < newArr.length; i++){
                const randomIndex = Math.floor(Math.random() * (i + 1));
                
                [newArr[i], newArr[randomIndex]] = [newArr[randomIndex], newArr[i]]
            }
    
            return newArr
    
        })
    }, [])

    const stringToHTML = str => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(str, 'text/html');
        return doc.body.textContent;
    };
    

    return (
        <div className="question-each">
            <p className="the-question">{stringToHTML(props.question)}</p>
            <div className="answer-content">
                <div className={`answer answer-1 answer${props.id}`} onClick={e => props.clickAnswer(e, props.id)}>{stringToHTML(shuffled[0])}</div>
                <div className={`answer answer-2 answer${props.id}`} onClick={e => props.clickAnswer(e, props.id)} >{stringToHTML(shuffled[1])}</div>
                <div className={`answer answer-3 answer${props.id}`} onClick={e => props.clickAnswer(e, props.id)} >{stringToHTML(shuffled[2])}</div>
                <div className={`answer answer-4 answer${props.id}`} onClick={e => props.clickAnswer(e, props.id)} >{stringToHTML(shuffled[3])}</div>                
            </div>
        </div>
    )
}

export default Question