import Cookie from "js-cookie";
import Router from "next/router";

import BaseLayout from "../components/BaseLayout";
import UserForm from "../components/UserForm";
import exams from "../api/exams";

const CreateUser = ({auth}) => {
    const onSubmit = (values, {setSubmitting}, setError) => {
        setSubmitting(true);
        exams.post('/users', {...values, roles: values.roles.split(' ')}, {
            headers: {
                Authorization: `Bearer ${Cookie.get('jwtClient')}`
            }
        }).then(res => {
            Router.push('/dashboard');
        }).catch(err => {
            setError(err.response.data.message);
            setSubmitting(false);
        });
    };

    return (
        <BaseLayout auth={auth} title="Create User">
            <UserForm onSubmit={onSubmit}/>
        </BaseLayout>
    );
};

export default CreateUser;