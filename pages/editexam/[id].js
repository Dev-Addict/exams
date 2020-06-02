import Cookie from "js-cookie";
import Router from "next/router";

import BaseLayout from "../../components/BaseLayout";
import ExamForm from "../../components/ExamForm";
import exams from "../../api/exams";

const EditUser = ({auth, INITIAL_VALUES, id}) => {
    if (process.browser && !INITIAL_VALUES) {
        Router.push('/dashboard');
        return <div/>;
    }
    if (!INITIAL_VALUES) {
        return <div/>;
    }
    const onSubmit = (values, {setSubmitting}, setError) => {
        setSubmitting(true);
        if (values.startAtDate && values.startAtTime)
            values.startAt = new Date(`${values.startAtDate}T${values.startAtTime}`);
        if (values.endAtDate && values.endAtTime)
            values.endAt = new Date(`${values.endAtDate}T${values.endAtTime}`);
        const newValues = {...values};
        Object.entries(newValues).forEach(([key, value]) => {
            if (!value)
                newValues[key] = undefined;
        });
        exams.patch(`/exams/${id}`,
            newValues, {
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
            <ExamForm onSubmit={onSubmit} INITIAL_VALUES={INITIAL_VALUES} useValidator={false}/>
        </BaseLayout>
    );
};

EditUser.getInitialProps = async (context, {user}, token) => {
    let exam;
    if (token) {
        if (user.rote === 'admin') {
            try {
                const res = await exams.get(`/exams/${context.query.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                exam = res.data.data.doc;
            } catch (err) {
                exam = undefined;
            }
            return {
                INITIAL_VALUES: exam,
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