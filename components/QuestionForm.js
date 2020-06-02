import {useState} from 'react';
import {Formik, Form, Field} from 'formik';

import Input from "../components/Input";

const initialValues = {
    question: '',
    questionAsset: '',
    type: '',
    option1: '',
    option1Asset: '',
    option2: '',
    option2Asset: '',
    option3: '',
    option3Asset: '',
    option4: '',
    option4Asset: '',
    correctOption: '',
    level: 0
};

const QuestionForm = ({onSubmit, INITIAL_VALUES = initialValues, useValidator = true}) => {
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
                  handleSubmit,
                  setFieldValue
              }) => (
                <Form onSubmit={handleSubmit}>
                    <Field type="text" name="question" component={Input} label="Question"/>
                    <Field type="file" name="questionAsset" component={Input} label="Question Asset"
                           onChange={(event) => {
                               setFieldValue("questionAsset", event.currentTarget.files[0]);
                           }}/>
                    <Field type="text" name="type" component={Input} label="Type"/>
                    <Field type="text" name="option1" component={Input} label="Option 1"/>
                    <Field type="file" name="option1Asset" component={Input} label="Option 1 Asset"
                           onChange={(event) => {
                               setFieldValue("option1Asset", event.currentTarget.files[0]);
                           }}/>
                    <Field type="text" name="option2" component={Input} label="Option 2"/>
                    <Field type="file" name="option2Asset" component={Input} label="Option 2 Asset"
                           onChange={(event) => {
                               setFieldValue("option2Asset", event.currentTarget.files[0]);
                           }}/>
                    <Field type="text" name="option3" component={Input} label="Option 3"/>
                    <Field type="file" name="option3Asset" component={Input} label="Option 3 Asset"
                           onChange={(event) => {
                               setFieldValue("option3Asset", event.currentTarget.files[0]);
                           }}/>
                    <Field type="text" name="option4" component={Input} label="Option 4"/>
                    <Field type="file" name="option4Asset" component={Input} label="Option 4 Asset"
                           onChange={(event) => {
                               setFieldValue("option4Asset", event.currentTarget.files[0]);
                           }}/>
                    <Field type="text" name="correctOption" component={Input} label="Correct Option"/>
                    <Field type="number" name="level" component={Input} label="Level"/>
                    <div className="error">{error}</div>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    )
};

export default QuestionForm;