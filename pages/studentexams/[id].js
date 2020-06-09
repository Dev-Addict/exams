import ErrorPage from "next/error";

import BaseLayout from "../../components/BaseLayout";
import Question from "../../components/Question";
import ExamDetails from "../../components/ExamDetails";
import exams from "../../api/exams";

const StudentExam = ({token, studentExam, questions, answers, student, auth, exam}) => {
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
        <BaseLayout auth={auth} title={`Exam(${exam.name})`}>
            <ExamDetails exam={exam} studentExam={studentExam}/>
            <div className="questions-container">
                {renderQuestions()}
            </div>
        </BaseLayout>
    );
};

StudentExam.getInitialProps = async ({query: {id}, res: response}, {user}, token) => {
    let studentExam;
    let questions;
    let answers;
    let exam;
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
            return {};
        }
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
        try {
            const res = await exams.get(`/exams/${studentExam.exam}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            exam = res.data.data.doc;
        } catch (err) {
            if (response)
                response.status(404);
            exam = undefined;
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
        exam,
        token
    };
};

export default StudentExam;