import {useState} from 'react';
import Router from 'next/router'
import {Formik, Form, Field} from 'formik';
import Cookie from 'js-cookie';

import Input from "../components/Input";
import exams from "../api/exams";
import BaseLayout from "../components/BaseLayout";

const INITIAL_VALUES = {
    username: '',
    password: ''
};

const Home = ({auth}) => {
    if (process.browser && auth.isSignedIn) {
        Router.push('/dashboard');
        return (<div/>);
    }
    if (auth.isSignedIn) {
        return (<div/>);
    }

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

    const onSubmit = (values, {setSubmitting}) => {
        setSubmitting(true);
        exams.post('/users/auth/signin', values)
            .then(res => {
                Cookie.set('jwtClient', res.data.token);
                Router.push('/dashboard');
            })
            .catch(err => {
                setError(err.response.data.message);
                setSubmitting(false);
            });
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
                        <Field type="text" name="username" component={Input} label="Username"/>
                        <Field type="password" name="password" component={Input} label="Password"/>
                        <div className="error">{error}</div>
                        <button type="submit" disabled={isSubmitting}>
                            Sign In
                        </button>
                    </Form>
                )}
            </Formik>
        </BaseLayout>
    )
};

export default Home