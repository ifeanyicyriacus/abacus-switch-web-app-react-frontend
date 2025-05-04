import React, {useState} from 'react';
import styles from './abacusSwitch.module.css'
import axios from 'axios';

const AbacusSwitch = () => {
    const [expression, setExpression] = useState("")
    const [displayExpression, setDisplayExpression] = useState('0')

    const appendSymbol = (e) => {
        setExpression((prevState) => {
            const newExpression = prevState + e.target.value
            setDisplayExpression(() => newExpression)
            return newExpression
        });
    };

    const postData = async () => {
        try {
            const response = await axios.post('http://localhost:5000/calculate',
                {
                    "expression" : expression
                });

            console.log('Success:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    async function evaluationHandler() {
        await postData();

        if (expression !== "") {
            const result = () => evaluate(expression);
            console.log(result);
            setExpression(prevState => {
                prevState = result();
                setDisplayExpression(() => prevState)
                return prevState;
            });
        }
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
    )
}

export default AbacusSwitch;