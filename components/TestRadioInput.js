import {Fragment, useState} from 'react';

const TestRadioInput = ({options, onSelected, error, questionNum}) => {
    const [selectedOption, setSelectedOption] = useState('');

    return (
        <Fragment>
            <div className="option-group">
                <input type="radio" name={`question-${questionNum}-answers`} value="option1" onClick={() => {
                    setSelectedOption('option1');
                    onSelected('option1');
                }} checked={selectedOption === 'option1'}/>
                <label>{options.option1}</label>
                {
                    options.option1Asset &&
                    <img src={options.option1Asset} alt={options.option1}/>
                }
                <div className="error">{error}</div>
            </div>
            <div className="option-group">
                <input type="radio" name={`question-${questionNum}-answers`} value="option2" onClick={() => {
                    setSelectedOption('option2');
                    onSelected('option2');
                }} checked={selectedOption === 'option2'}/>
                <label>{options.option2}</label>
                {
                    options.option1Asset &&
                    <img src={options.option2Asset} alt={options.option2}/>
                }
                <div className="error">{error}</div>
            </div>
            <div className="option-group">
                <input type="radio" name={`question-${questionNum}-answers`} value="option3" onClick={() => {
                    setSelectedOption('option3');
                    onSelected('option3');
                }} checked={selectedOption === 'option3'}/>
                <label>{options.option3}</label>
                {
                    options.option1Asset &&
                    <img src={options.option3Asset} alt={options.option3}/>
                }
                <div className="error">{error}</div>
            </div>
            <div className="option-group">
                <input type="radio" name={`question-${questionNum}-answers`} value="option4" onClick={() => {
                    setSelectedOption('option4');
                    onSelected('option4');
                }} checked={selectedOption === 'option4'}/>
                <label>{options.option4}</label>
                {
                    options.option1Asset &&
                    <img src={options.option4Asset} alt={options.option4}/>
                }
                <div className="error">{error}</div>
            </div>
        </Fragment>
    );
};

export default TestRadioInput;