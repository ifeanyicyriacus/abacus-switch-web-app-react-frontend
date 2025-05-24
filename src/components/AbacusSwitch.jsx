import React, {useState} from 'react';
import styles from './abacusSwitch.module.css'

const AbacusSwitch = () => {
    const [expression, setExpression] = useState("")
    const [displayExpression, setDisplayExpression] = useState('0')
    const [activeBackend, setActiveBackend] = useState('go'); // 'py' or 'go'
    const API_URL_PY = import.meta.env.VITE_API_URL_PY;
    const API_URL_GO = import.meta.env.VITE_API_URL_GO;

    const appendSymbol = (e) => {
        setExpression((prevState) => {
            const newExpression = prevState + e.target.value
            setDisplayExpression(() => newExpression)
            return newExpression
        });
    };

    async function queryServer(API_URL) {
        return await fetch(API_URL, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({expression : expression}),
        });
    }

    const evaluate = async () => {
        console.log('evaluate');
        try {
            const API_URL = activeBackend === 'go'
                ? API_URL_GO
                : API_URL_PY;
            console.log("API_URL: " + API_URL);
            const response = await queryServer(API_URL);
            if (!response.ok) throw new Error('Something went wrong.');

            const data = await response.json();
            setExpression(() => {
                setDisplayExpression(() => {
                    return data.result.toString()
                });
                return displayExpression;
            });
        } catch (error) {
            console.error(activeBackend);
            setActiveBackend(prev => prev === 'go' ? 'py' : 'go');
            setDisplayExpression(() => {
                setExpression(() => "");
                return error;
            });
        }
    }

    async function evaluationHandler() {
        if (expression !== "") await evaluate(expression);
    }

    function clearScreenHandler() {
        setExpression(() => "")
        setDisplayExpression(() => '0')
    }

    function backspaceHandler() {
        setExpression(prevState => {
            const newExpression = prevState.substring(0, prevState.length - 1);
            if (newExpression.length === 0) {
                setDisplayExpression(() => "0")
                return "";
            } else {
                setDisplayExpression(() => newExpression)
                return newExpression;
            }
        })
    }

    return (

        <>
            <div>
                <h1 className={styles.title}>Abacus-Switch Calculator</h1>
            </div>
            <div className={styles.calculator}>
                <input id="expression" value={displayExpression} type="text" className={styles.screen} disabled/>
                <div className={styles['buttons']}>
                    <button onClick={clearScreenHandler} className={styles["clear"]}>C</button>
                    <button value={"("} onClick={appendSymbol} className={styles["operator"]}>(</button>
                    <button value={")"} onClick={appendSymbol} className={styles["operator"]}>)</button>
                    <button value={"%"} onClick={appendSymbol} className={styles["operator"]}>mod</button>
                    <button value={"!"} onClick={appendSymbol} className={styles["operator"]}>!</button>

                    <button value={"7"} onClick={appendSymbol}>7</button>
                    <button value={"8"} onClick={appendSymbol}>8</button>
                    <button value={"9"} onClick={appendSymbol}>9</button>
                    <button value={"√"} onClick={appendSymbol} className={styles["operator"]}>√</button>
                    <button value={"^"} onClick={appendSymbol} className={styles["operator"]}>^</button>


                    <button value={"4"} onClick={appendSymbol}>4</button>
                    <button value={"5"} onClick={appendSymbol}>5</button>
                    <button value={"6"} onClick={appendSymbol}>6</button>
                    <button value={"÷"} onClick={appendSymbol} className={styles["operator"]}>÷</button>
                    <button value={"x"} onClick={appendSymbol} className={styles["operator"]}>x</button>

                    <button value={"1"} onClick={appendSymbol}>1</button>
                    <button value={"2"} onClick={appendSymbol}>2</button>
                    <button value={"3"} onClick={appendSymbol}>3</button>
                    <button value={"-"} onClick={appendSymbol} className={styles["operator"]}>-</button>
                    <button onClick={evaluationHandler} className={styles["equals"]}>=</button>

                    <button value={"0"} onClick={appendSymbol}>0</button>
                    <button value={"."} onClick={appendSymbol}>.</button>
                    <button onClick={backspaceHandler} className={styles["backspace"]}>⌫</button>
                    <button value={"+"} onClick={appendSymbol} className={styles["operator"]}>+</button>
                </div>

            </div>
        </>
    )
}

export default AbacusSwitch;