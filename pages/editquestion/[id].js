import Cookie from "js-cookie";
import Router from "next/router";

import BaseLayout from "../../components/BaseLayout";
import QuestionForm from "../../components/QuestionForm";
import exams from "../../api/exams";

const EditQuestion = ({auth, INITIAL_VALUES, id}) => {
    if (process.browser && !INITIAL_VALUES) {
        Router.push('/dashboard');
        return <div/>;
    }
    if (!INITIAL_VALUES) {
        return <div/>;
    }
    const onSubmit = (values, setSubmitting, setError) => {
        setSubmitting(true);
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (value)
                formData.append(key, value)
        });
        exams.patch(`/questions/${id}`,
            formData, {
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
        <BaseLayout auth={auth} title="Edit Question">
            <QuestionForm onSubmit={onSubmit} INITIAL_VALUES={INITIAL_VALUES}/>
        </BaseLayout>
    );
};

EditQuestion.getInitialProps = async (context, {user}, token) => {
    let question;
    if (token) {
        if (user.rote === 'admin') {
            try {
                const res = await exams.get(`/questions/${context.query.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                question = res.data.data.doc;
            } catch (err) {
                question = undefined;
            }
            return {
                INITIAL_VALUES: question,
                id: context.query.id
            }
        }
        return {
        };
    }
    return {
    };
};

export default EditQuestion;