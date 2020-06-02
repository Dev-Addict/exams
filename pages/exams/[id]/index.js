import ErrorPage from 'next/error';

import exams from "../../../api/exams";

const Exam = ({id}) => {
    if (!id)
        return (
            <ErrorPage statusCode={404}/>
        );
    return (
        <div>
            {id}
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
        const res = exams.get(`/exams/${id}`, {
            headers: {
                Authorization: token
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