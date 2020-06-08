import ErrorPage from "next/error";

import Question from "../../components/Question";
import exams from "../../api/exams";

const StudentExam = ({token, studentExam, questions, answers, student}) => {
    if (!studentExam)
        return (
            <ErrorPage statusCode={404}/>
        );

    const renderQuestions = () => questions.map((question, index) => {
        const answer = (answers[answers.findIndex(answer => answer.question === question._id)] || {}).answer;
        return (
            <Question questionNum={index + 1} questionId={question._id} token={token} {...question} key={index}
                      initial={answer} student={student}/>
        );
    });

    return (
        <div>
            {renderQuestions()}
        </div>
    );
};

StudentExam.getInitialProps = async ({query: {id}, res: response}, {user}, token) => {
    let studentExam;
    let questions;
    let answers;
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
            studentExam = undefined;
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
                questions = undefined;
            }
            try {
                const res = await exams.get(`/answers?student=${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                answers = res.data.data.docs;
            } catch (err) {
                if (response)
                    response.status(404);
                answers = undefined;
            }
        }
        if (questions) {
            questions = questions.filter(question => studentExam.questions.includes(question._id));
        }
        if (answers && questions) {
            answers = answers.filter(answer => questions.map(({_id}) => _id).includes(answer.question));
        }
        return {
            studentExam,
            questions,
            answers,
            student: user._id,
            token
        }
    }
    if (response) {
        response.status(404);
    }
    return {};
};

export default StudentExam;