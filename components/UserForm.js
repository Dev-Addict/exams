import {useState} from 'react';
import {Formik, Form, Field} from 'formik';

import Input from "../components/Input";

const initialValues = {
    name: '',
    username: '',
    password: '',
    roles: ''
};

const UserForm = ({onSubmit, INITIAL_VALUES = initialValues, useValidator = true}) => {
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
                    <Field type="text" name="username" component={Input} label="Username"/>
                    <Field type="text" name="roles" component={Input} label="Roles"/>
                    <Field type="password" name="password" component={Input} label="Password"/>
                    <div className="error">{error}</div>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    )
};

export default UserForm;