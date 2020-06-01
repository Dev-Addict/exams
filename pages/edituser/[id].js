import Cookie from "js-cookie";
import Router from "next/router";

import BaseLayout from "../../components/BaseLayout";
import UserForm from "../../components/UserForm";
import exams from "../../api/exams";

const EditUser = ({auth, INITIAL_VALUES, id}) => {
    if (process.browser && (!INITIAL_VALUES || !(INITIAL_VALUES || {}).rote)) {
        Router.push('/dashboard');
        return <div/>;
    }
    if (!INITIAL_VALUES || !(INITIAL_VALUES || {}).rote) {
        return <div/>;
    }
    const onSubmit = (values, {setSubmitting}, setError) => {
        const newValues = {...values};
        Object.entries(newValues).forEach(([key, value]) => {
            if (!value)
                newValues[key] = undefined;
        });
        setSubmitting(true);
        exams.patch(`/users/${id}`,
            {...newValues, roles: (newValues.roles && newValues.roles.split(' '))}, {
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
        <BaseLayout auth={auth} title="Edit User">
            <UserForm onSubmit={onSubmit} INITIAL_VALUES={INITIAL_VALUES} useValidator={false}/>
        </BaseLayout>
    );
};

EditUser.getInitialProps = async (context, {user: authUser}, token) => {
    let user;
    if (token) {
        if (authUser.rote === 'admin') {
            try {
                const res = await exams.get(`/users/${context.query.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                user = res.data.data.doc;
            } catch (err) {
                user = undefined;
            }
            return {
                INITIAL_VALUES: {...user, roles: ((user || {}).roles || []).join(' ')},
                id: context.query.id
            }
        }
        return {
        };
    }
    return {
    };
};

export default EditUser;