import React from 'react';
import styles from './abacusSwitch.module.css'

const AbacusSwitch = () => {
    // const [expression, setExpression] = useState('')

    return (
        <div className={styles.calculator}>
            <input type="text" className={styles.screen} disabled/>
            <div className={styles['buttons']}>
                <button className={styles["clear"]}>C</button>
                <button className={styles["operator"]}>(</button>
                <button className={styles["operator"]}>)</button>
                <button className={styles["operator"]}>mod</button>
                <button className={styles["operator"]}>!</button>

                <button>7</button>
                <button>8</button>
                <button>9</button>
                <button className={styles["operator"]}>√</button>
                <button className={styles["operator"]}>^</button>


                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button className={styles["operator"]}>÷</button>
                <button className={styles["operator"]}>x</button>

                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button className={styles["operator"]}>-</button>
                <button className={styles["equals"]} >=</button>

                <button>0</button>
                <button>.</button>
                <button>000</button>
                <button className={styles["operator"]}>+</button>
            </div>

        </div>
    )
}

export default AbacusSwitch;