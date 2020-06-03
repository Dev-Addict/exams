import {useState} from 'react';

import CustomInput from "./CustomInput";

const QuestionForm = ({onSubmit, INITIAL_VALUES = {}}) => {
    const [error, setError] = useState('');
    const [question, setQuestion] = useState('' || INITIAL_VALUES.question);
    const [questionAsset, setQuestionAsset] = useState('' || INITIAL_VALUES.questionAsset);
    const [type, setType] = useState('' || INITIAL_VALUES.type);
    const [option1, setOption1] = useState('' || INITIAL_VALUES.option1);
    const [option1Asset, setOption1Asset] = useState('' || INITIAL_VALUES.option1Asset);
    const [option2, setOption2] = useState('' || INITIAL_VALUES.option2);
    const [option2Asset, setOption2Asset] = useState('' || INITIAL_VALUES.option2Asset);
    const [option3, setOption3] = useState('' || INITIAL_VALUES.option3);
    const [option3Asset, setOption3Asset] = useState('' || INITIAL_VALUES.option3Asset);
    const [option4, setOption4] = useState('' || INITIAL_VALUES.option4);
    const [option4Asset, setOption4Asset] = useState('' || INITIAL_VALUES.option4Asset);
    const [correctOption, setCorrectOption] = useState('' || INITIAL_VALUES.correctOption);
    const [level, setLevel] = useState(0 || INITIAL_VALUES.level);
    const [isSubmitting, setSubmitting] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit({
            question,
            questionAsset,
            type,
            option1,
            option1Asset,
            option2,
            option2Asset,
            option3,
            option3Asset,
            option4,
            option4Asset,
            correctOption,
            level
        }, setSubmitting, setError);
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <CustomInput type="text" value={question} setValue={setQuestion} label="Question"/>
            <CustomInput type="file" value={questionAsset} setValue={setQuestionAsset} label="Question Asset"/>
            <CustomInput type="text" value={type} setValue={setType} label="Type"/>
            <CustomInput type="text" value={option1} setValue={setOption1} label="Option 1"/>
            <CustomInput type="file" value={option1Asset} setValue={setOption1Asset} label="Option 1 Asset"/>
            <CustomInput type="text" value={option2} setValue={setOption2} label="Option 2"/>
            <CustomInput type="file" value={option2Asset} setValue={setOption2Asset} label="Option 2 Asset"/>
            <CustomInput type="text" value={option3} setValue={setOption3} label="Option 3"/>
            <CustomInput type="file" value={option3Asset} setValue={setOption3Asset} label="Option 3 Asset"/>
            <CustomInput type="text" value={option4} setValue={setOption4} label="Option 4"/>
            <CustomInput type="file" value={option4Asset} setValue={setOption4Asset} label="Option 4 Asset"/>
            <CustomInput type="text" value={correctOption} setValue={setCorrectOption} label="Correct Option"/>
            <CustomInput type="number" value={level} setValue={setLevel} label="Level"/>
            <div className="error">{error}</div>
            <button type="submit" disabled={isSubmitting}>
                Submit
            </button>
        </form>
    )
};

export default QuestionForm;