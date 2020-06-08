import {Fragment, useState} from "react";

const DescriptiveQuestionInput = ({onSubmit, questionNum}) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [isReady, setReady] = useState(true);

    return (
        <Fragment>
            <input type="text" name={`question-${questionNum}-answer`} value={value}
                   onChange={({target: {value}}) => setValue(value)} disabled={!isReady}/>
            <button onClick={() => {
                onSubmit(value, setError, setReady);
            }} disabled={!isReady}>
                Submit Answer
            </button>
            <div className="error">{error}</div>
        </Fragment>
    );
};

export default DescriptiveQuestionInput;