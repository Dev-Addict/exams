import {Fragment} from 'react';

const CustomInput = ({type, value, setValue, label}) => {
    return (
        <Fragment>
            <label>{label}</label>
            {
                type === 'file' ?
                    <input type={type} placeholder={label} onChangeCapture={(event) => {
                        setValue(event.currentTarget.files[0]);
                    }}/> :
                    <input type={type} placeholder={label} value={value} onChange={event => {
                        setValue(event.target.value)
                    }}/>
            }
        </Fragment>
    );
};

export default CustomInput;