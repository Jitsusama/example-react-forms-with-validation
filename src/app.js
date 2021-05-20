import React, {useEffect, useRef, useState} from "react";
import styles from "./app.module.css";

export const App = () => {
    const [state, setState] = useState('initial');

    const submit = () => setState('submitted')

    switch (state) {
        case 'submitted':
            return <Submitted/>
        default:
            return <Form onSubmit={submit}/>
    }
}

const Form = ({onSubmit}) => {
    const submit = e => {
        e.preventDefault();
        onSubmit();
    }

    return <form className={styles.form} onSubmit={submit}>
        <label>
            <p>PIN</p>
            <Input placeholder="1234" pattern="1234" patternMessage="4 digits" onChange={() => null} Icon={HashIcon}/>
        </label>
        <button type="submit">Send</button>
    </form>;
};

const Submitted = () => <p>Form submitted!</p>;

const Input = ({placeholder, pattern, patternMessage, onChange, Icon = null}) => {
    /** @type {{current:HTMLInputElement}} */
    const ref = useRef();
    const [value, setValue] = useState('');
    const [valid, setValid] = useState(true);

    useEffect(() => {
        let target = ref.current;
        if (target.validity.valueMissing)
            target.setCustomValidity('A value must be set')
    }, [])

    const changeValue = () => {
        const target = ref.current;
        if (target.validity.valueMissing) {
            target.setCustomValidity('A value must be set');
            setValid(true);
        } else if (target.validity.patternMismatch) {
            target.setCustomValidity(`Invalid Pattern: ${patternMessage}`)
            setValid(false)
        } else {
            target.setCustomValidity('')
            setValid(true);
        }
        setValue(target.value);
        onChange(value);
    }

    return <div className={valid ? styles.valid : styles.invalid}>
        <input type="text" placeholder={placeholder} required={true} pattern={pattern} value={value}
               onChange={changeValue} ref={ref}/>
        {Icon ? <Icon/> : null}
    </div>
}

const HashIcon = () => <span>
    <svg role="img" viewBox="0 0 14 16" aria-hidden={true} focusable={false} xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor"
              d="M13.7708 5.69091L13.994 4.44091C14.0351 4.21106 13.8583 4 13.6249 4H11.2871L11.744 1.44091C11.7851 1.21106 11.6084 1 11.3749 1H10.1051C10.0171 1 9.9319 1.03097 9.8644 1.08748C9.79691 1.14399 9.75145 1.22244 9.73598 1.30909L9.25545 4H6.17312L6.63008 1.44091C6.67115 1.21106 6.49443 1 6.26093 1H4.99118C4.90316 1 4.81794 1.03097 4.75045 1.08748C4.68296 1.14399 4.6375 1.22244 4.62203 1.30909L4.14149 4H1.66975C1.58173 4 1.49651 4.03097 1.42902 4.08748C1.36153 4.14399 1.31606 4.22244 1.30059 4.30909L1.07738 5.55909C1.03635 5.78894 1.21306 6 1.44653 6H3.78434L3.07006 10H0.598315C0.51029 10 0.425071 10.031 0.357581 10.0875C0.29009 10.144 0.24463 10.2224 0.229159 10.3091L0.00594093 11.5591C-0.0350902 11.7889 0.141628 12 0.375096 12H2.7129L2.25594 14.5591C2.21491 14.7889 2.39162 15 2.62509 15H3.89484C3.98286 15 4.06808 14.969 4.13557 14.9125C4.20306 14.856 4.24852 14.7776 4.26399 14.6909L4.74456 12H7.82686L7.36989 14.5591C7.32883 14.7889 7.50555 15 7.73905 15H9.0088C9.09682 15 9.18204 14.969 9.24953 14.9125C9.31702 14.856 9.36248 14.7776 9.37795 14.6909L9.85848 12H12.3302C12.4183 12 12.5035 11.969 12.571 11.9125C12.6385 11.856 12.6839 11.7776 12.6994 11.6909L12.9226 10.4409C12.9636 10.2111 12.7869 10 12.5534 10H10.2156L10.9299 6H13.4017C13.4897 6 13.5749 5.96903 13.6424 5.91252C13.7099 5.85601 13.7553 5.77756 13.7708 5.69091ZM8.18402 10H5.10171L5.81599 6H8.8983L8.18402 10Z"/>
    </svg>
</span>
