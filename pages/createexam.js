import Cookie from "js-cookie";
import Router from "next/router";

import BaseLayout from "../components/BaseLayout";
import ExamForm from "../components/ExamForm";
import exams from "../api/exams";

const CreateExam = ({auth}) => {
    const onSubmit = (values, {setSubmitting}, setError) => {
        setSubmitting(true);
        values.startAt = new Date(`${values.startAtDate}T${values.startAtTime}`);
        values.endAt = new Date(`${values.endAtDate}T${values.endAtTime}`);
        if (values.startAt.getTime() > values.endAt.getTime()) {
            setError('start date can not be before end date');
            setSubmitting(false);
            return;
        }
        exams.post('/exams', values, {
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
        <BaseLayout auth={auth} title="Create Exam">
            <ExamForm onSubmit={onSubmit}/>
        </BaseLayout>
    );
};

export default CreateExam;