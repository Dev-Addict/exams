import {Fragment} from 'react';

const TestRadioInput = ({label, options, field, form: {touched, errors}, ...props}) => {
    return (
        <Fragment>
            <input type="radio" name={field.name} value="option1"/>
            <label htmlFor="option1">{options.option1}</label>
            {options.option1Asset &&
            <img src={options.option1Asset} alt={options.option1}/>
            }
            <input type="radio" name={field.name} value="option2"/>
            <label htmlFor="option2">{options.option2}</label>
            {options.option2Asset &&
            <img src={options.option2Asset} alt={options.option2}/>
            }
            <input type="radio" name={field.name} value="option3"/>
            <label htmlFor="option3">{options.option3}</label>
            {options.option3Asset &&
            <img src={options.option3Asset} alt={options.option3}/>
            }
            <input type="radio" name={field.name} value="option4"/>
            <label htmlFor="option4">{options.option4}</label>
            {options.option4Asset &&
            <img src={options.option4Asset} alt={options.option4}/>
            }
            {
                touched[field.name] && errors[field.name] &&
                <div className="error">{errors[field.name]}</div>
            }
        </Fragment>
    );
};

export default TestRadioInput;