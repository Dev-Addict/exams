import ErrorPage from "next/error";

import Question from "../../components/Question";
import exams from "../../api/exams";

const StudentExam = ({token, studentExam, questions}) => {
    if (!studentExam)
        return (
            <ErrorPage statusCode={404}/>
        );

    const renderQuestions = () => questions.map((question, index) => (
        <Question questionNum={index + 1} questionId={questions._id} token={token} {...question}/>
    ));

    return (
        <div>
            {renderQuestions()}
        </div>
    );
};

StudentExam.getInitialProps = async ({query: {id}, res: response}, {user}, token) => {
    let studentExam;
    let questions;
    if (token) {
        if (!/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(id)) {
            if (response)
                response.status(404);
            return {};
        }
        try {
            const res = await exams.get(`/studentexams/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            studentExam = res.data.data.doc;
        } catch (err) {
            if (response)
                response.status(404);
            studentExam = undefined
        }
        if (studentExam) {
            try {
                const res = await exams.get(`/questions?exam=${studentExam.exam}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                questions = res.data.data.docs;
            } catch (err) {
                if (response)
                    response.status(404);
                questions = undefined
            }
        }
        if (questions) {
            questions = questions.filter(question => studentExam.questions.includes(question._id));
        }
        return {
            studentExam,
            questions,
            token
        }
    }
    response.status(404);
    return {
    };
};

export default StudentExam;