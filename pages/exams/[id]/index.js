import ErrorPage from 'next/error';

import ExamButtons from "../../../components/ExamButtons";
import exams from "../../../api/exams";

const Exam = ({id}) => {
    if (!id)
        return (
            <ErrorPage statusCode={404}/>
        );
    return (
        <div>
            <ExamButtons id={id}/>
        </div>
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
    return {
        id
    };
};

export default Exam;