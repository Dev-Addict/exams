import {Fragment, useState} from 'react';

const TestRadioInput = ({options, onSelected, questionNum}) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [error, setError] = useState('');
    const [isReady, setReady] = useState(true);

    return (
        <Fragment>
            <div className="option-group">
                <input type="radio" name={`question-${questionNum}-answer`} value="option1" onClick={() => {
                    setSelectedOption('option1');
                    onSelected('option1', setError, setReady);
                }} checked={selectedOption === 'option1'} disabled={!isReady}/>
                <label>{options.option1}</label>
                {
                    options.option1Asset &&
                    <img src={options.option1Asset} alt={options.option1}/>
                }
            </div>
            <div className="option-group">
                <input type="radio" name={`question-${questionNum}-answer`} value="option2" onClick={() => {
                    setSelectedOption('option2');
                    onSelected('option2', setError, setReady);
                }} checked={selectedOption === 'option2'} disabled={!isReady}/>
                <label>{options.option2}</label>
                {
                    options.option1Asset &&
                    <img src={options.option2Asset} alt={options.option2}/>
                }
            </div>
            <div className="option-group">
                <input type="radio" name={`question-${questionNum}-answer`} value="option3" onChange={() => {
                    setSelectedOption('option3');
                    onSelected('option3', setError, setReady);
                }} checked={selectedOption === 'option3'} disabled={!isReady}/>
                <label>{options.option3}</label>
                {
                    options.option1Asset &&
                    <img src={options.option3Asset} alt={options.option3}/>
                }
            </div>
            <div className="option-group">
                <input type="radio" name={`question-${questionNum}-answer`} value="option4" onClick={() => {
                    setSelectedOption('option4');
                    onSelected('option4', setError, setReady);
                }} checked={selectedOption === 'option4'} disabled={!isReady}/>
                <label>{options.option4}</label>
                {
                    options.option1Asset &&
                    <img src={options.option4Asset} alt={options.option4}/>
                }
            </div>
            <div className="error">{error}</div>
        </Fragment>
    );
};

export default TestRadioInput;