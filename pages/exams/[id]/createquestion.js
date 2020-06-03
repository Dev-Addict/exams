import Cookie from "js-cookie";
import Router from "next/router";

import BaseLayout from "../../../components/BaseLayout";
import QuestionForm from "../../../components/QuestionForm";
import exams from "../../../api/exams";
import ErrorPage from "next/error";

const CreateQuestion = ({auth, id}) => {
    if (!id)
        return (
            <ErrorPage statusCode={404}/>
        );
    const onSubmit = (values, setSubmitting, setError) => {
        console.log(values);
        setSubmitting(true);
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (value)
                formData.append(key, value)
        });
        formData.append('exam', id);
        exams.post('/questions', formData, {
            headers: {
                Authorization: `Bearer ${Cookie.get('jwtClient')}`,
                'Content-Type': 'multipart/form-data'
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
            <QuestionForm onSubmit={onSubmit}/>
        </BaseLayout>
    );
};

CreateQuestion.getInitialProps = async ({query: {id}, res: response}, auth, token) => {
    if (!/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(id)) {
        if (response)
            response.status(404);
        return {};
    }
    try {
        await exams.get(`/exams/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (err) {
        if (response)
            response.status(404);
        return {};
    }
    return {
        id
    };
};

export default CreateQuestion;