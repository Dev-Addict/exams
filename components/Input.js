import {Fragment} from 'react';

const Input = ({type, label, field, form: {touched, errors}, ...props}) => {
    return (
        <Fragment>
            <label>{label}</label>
            {
                type === 'file' ?
                    <input type={type} {...field} placeholder={label} {...props} onChangeCapture={(event) => {
                        props.setFieldValue(field.name, event.currentTarget.files[0]);
                    }}/> :
                    <input type={type} {...field} placeholder={label} {...props}/>
            }
            {
                touched[field.name] && errors[field.name] &&
                <div className="error">{errors[field.name]}</div>
            }
        </Fragment>
    );
};

export default Input;