import ErrorPage from 'next/error';

import ExamButtons from "../../../components/ExamButtons";
import QuestionsList from "../../../components/QuestionsList";
import BaseLayout from "../../../components/BaseLayout";
import exams from "../../../api/exams";

const Exam = ({id, questions, auth}) => {
    if (!id)
        return (
            <ErrorPage statusCode={404}/>
        );
    return (
        <BaseLayout auth={auth} title="Manage Exam">
            <ExamButtons id={id}/>
            <QuestionsList questions={questions} exam={id}/>
        </BaseLayout>
    );
};

Exam.getInitialProps = async ({query: {id}, res: response}, auth, token) => {
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
    let questions;
    try {
        const res = await exams.get(`/questions?exam=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        questions = res.data.data.docs;
    } catch (err) {
        questions = [];
    }
    return {
        id,
        questions
    };
};

export default Exam;