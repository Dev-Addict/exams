import {Fragment} from 'react';
import DatePicker from "react-datepicker";
import {useState, useEffect} from 'react';
import moment from "moment";
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({label, form: {setFieldValue, setFieldTouched, touched, errors}, field: {name}, initialDate}) => {
    const [date, setDate] = useState(initialDate ? moment(initialDate) : moment());

    useEffect(() => {
        setFieldValue(name, date, true);
        setFieldTouched(name, true, true);
    }, []);

    const onChange = date => {
        setDate(date);
        setFieldValue(name, date, true);
        setFieldTouched(name, true, true);
    };

    return (
        <Fragment>
            <label>{label}</label>
            <DatePicker selected={date} onChange={onChange} peekNextMonth showMonthDropdown showYearDropdown
                        maxDate={moment()} dropdownMode="select" className="form-control"/>
            {
                touched[name] && errors[name] &&
                <div className="error">{errors[name]}</div>
            }
        </Fragment>
    );
};

export default DateInput;