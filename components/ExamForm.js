import {useState} from 'react';
import {Formik, Form, Field} from 'formik';

import Input from "../components/Input";

const initialValues = {
    name: '',
    description: '',
    level1Amount: '',
    level2Amount: '',
    level3Amount: '',
    level4Amount: '',
    level5Amount: '',
    level6Amount: '',
    level7Amount: '',
    level8Amount: '',
    level9Amount: '',
    level10Amount: '',
    for: '',
    startAt: '',
    endAt: '',
    time: ''
};

const ExamForm = ({onSubmit, INITIAL_VALUES = initialValues, useValidator = true}) => {
    const [error, setError] = useState('');

    const validate = useValidator ? values => {
        const errors = {};

        Object.entries(values).forEach(([key, value]) => {
            if (!value) {
                errors[key] = `${key} is required.`;
            }
        });

        return errors;
    } : () => {
        return {};
    };

    return (
        <Formik
            initialValues={INITIAL_VALUES}
            validate={validate}
            onSubmit={(...args) => onSubmit(...args, setError)}>
            {({
                  isSubmitting,
                  handleSubmit
              }) => (
                <Form onSubmit={handleSubmit}>
                    <Field type="text" name="name" component={Input} label="Name"/>
                    <Field type="text" name="description" component={Input} label="Description"/>
                    <Field type="number" name="level1Amount" component={Input} label="Level 1 Questions"/>
                    <Field type="number" name="level2Amount" component={Input} label="Level 2 Questions"/>
                    <Field type="number" name="level3Amount" component={Input} label="Level 3 Questions"/>
                    <Field type="number" name="level4Amount" component={Input} label="Level 4 Questions"/>
                    <Field type="number" name="level5Amount" component={Input} label="Level 5 Questions"/>
                    <Field type="number" name="level6Amount" component={Input} label="Level 6 Questions"/>
                    <Field type="number" name="level7Amount" component={Input} label="Level 7 Questions"/>
                    <Field type="number" name="level8Amount" component={Input} label="Level 8 Questions"/>
                    <Field type="number" name="level9Amount" component={Input} label="Level 9 Questions"/>
                    <Field type="number" name="level10Amount" component={Input} label="Level 10 Questions"/>
                    <Field type="text" name="for" component={Input} label="For Roles"/>
                    <Field type="date" name="startAt" component={Input} label="Start At"/>
                    <Field type="date" name="endAt" component={Input} label="End At"/>
                    <Field type="text" name="time" component={Input} label="Time"/>
                    <div className="error">{error}</div>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    )
};

export default ExamForm;