import {useState} from 'react';
import {Formik, Form, Field} from 'formik';

import Input from "../components/Input";
import BaseLayout from "../components/BaseLayout";

const INITIAL_VALUES = {
    name: '',
    username: '',
    password: '',
    roles: ''
};

const UserForm = ({auth, onSubmit, INITIAL_VALUES = INITIAL_VALUES}) => {
    const [error, setError] = useState('');

    const validate = values => {
        const errors = {};

        Object.entries(values).forEach(([key, value]) => {
            if (!value) {
                errors[key] = `${key} is required.`;
            }
        });

        return errors;
    };

    return (
        <BaseLayout auth={auth} title="Sign In">
            <Formik
                initialValues={INITIAL_VALUES}
                validate={validate}
                onSubmit={onSubmit}>
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
        </BaseLayout>
    )
};

export default UserForm;