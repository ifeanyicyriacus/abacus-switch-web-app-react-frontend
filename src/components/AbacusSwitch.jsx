import React, {useState} from 'react';
import styles from './abacusSwitch.module.css'

const AbacusSwitch = () => {
    const [expression, setExpression] = useState('0')
    const [displayExpression, setDisplayExpression] = useState('0')

    function appendSymbol(s) {
        if
        const newExpression = expression+s;
        setExpression(newExpression);
    }

    function evaluationHandler() {
        setExpression('23');
    }

    function clearScreenHandler() {
        setExpression("0")
    }

    function backspaceHandler() {
        const newExpression = expression.substring(0, expression.length - 1)
        if (newExpression.length === 0) {
            setExpression('0');
        } else {
            setExpression(newExpression);
        }
    }

    return (
        <div className={styles.calculator}>
            <input id="expression" value={expression} type="text" className={styles.screen} disabled />
            <div className={styles['buttons']}>
                <button onClick={clearScreenHandler} className={styles["clear"]}>C</button>
                <button onClick={() => appendSymbol("(")} className={styles["operator"]}>(</button>
                <button onClick={() => appendSymbol(")")} className={styles["operator"]}>)</button>
                <button onClick={() => appendSymbol("mod")} className={styles["operator"]}>mod</button>
                <button onClick={() => appendSymbol("!")} className={styles["operator"]}>!</button>

                <button onClick={() => appendSymbol("7")} >7</button>
                <button onClick={() => appendSymbol("8")} >8</button>
                <button onClick={() => appendSymbol("9")} >9</button>
                <button onClick={() => appendSymbol("√")}  className={styles["operator"]}>√</button>
                <button onClick={() => appendSymbol("^")}  className={styles["operator"]}>
                    <math xmlns="http://www.w3.org/1998/Math/MathML">
                        <semantics>
                            <msup>
                                <mi>x</mi>
                                <mi>n</mi>
                            </msup>
                            <annotation encoding="text/plain">x to the n-th power</annotation>
                        </semantics>
                    </math>
                </button>


                <button onClick={() => appendSymbol("4")} >4</button>
                <button onClick={() => appendSymbol("5")} >5</button>
                <button onClick={() => appendSymbol("6")} >6</button>
                <button onClick={() => appendSymbol("÷")}  className={styles["operator"]}>÷</button>
                <button onClick={() => appendSymbol("x")}  className={styles["operator"]}>x</button>

                <button onClick={() => appendSymbol("1")}>1</button>
                <button onClick={() => appendSymbol("2")}>2</button>
                <button onClick={() => appendSymbol("3")}>3</button>
                <button className={styles["operator"]} onClick={() => appendSymbol("-")}>-</button>
                <button className={styles["equals"]} onClick={evaluationHandler}>=</button>

                <button onClick={() => appendSymbol("0")}>0</button>
                <button onClick={() => appendSymbol(".")}>.</button>
                <button onClick={backspaceHandler} className={styles["backspace"]}>⌫</button>
                <button onClick={() => appendSymbol("+")} className={styles["operator"]} >+</button>
            </div>

        </div>
    )
}

export default AbacusSwitch;