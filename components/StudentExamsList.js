import {useState, useEffect} from 'react';
import Router from "next/router";
import Cookie from 'js-cookie';

import examsAPI from "../api/exams";

const showFormattedTime = time => `${
    Math.floor(time / 1000 / 60 / 60 / 24)
}:${
    Math.floor(time / 1000 / 60 / 60 % 24)
}:${
    Math.floor(time / 1000 / 60 % 60)
}:${
    Math.floor(time / 1000 % 60)
}`;

const StudentExamsList = ({exams, user, studentExams}) => {
    const [time, setTime] = useState(Date.now());
    const setTimeLoop = () => {
        setTime(Date.now());
        setTimeout(setTimeLoop, 1000)
    };
    useEffect(() => {
        setTimeLoop();
    }, []);
    const [isSubmitting, setSubmitting] = useState(false);
    const renderExams = () => exams.map(exam => {
        const [error, setError] = useState('');
        const studentExam = studentExams[studentExams.findIndex(studentExam => studentExam.exam === exam._id)];
        return (
            <div className="student-card" key={exam._id}>
                <div className="student-card-title">{exam.name}<sub>{exam.description}</sub></div>
                <div
                    className="student-card-detail">
                    {exam.level1Amount + exam.level2Amount + exam.level3Amount + exam.level4Amount + exam.level5Amount +
                    exam.level6Amount + exam.level7Amount + exam.level8Amount + exam.level9Amount + exam.level10Amount} Questions
                </div>
                <div className="student-card-detail">{exam.time} Minutes</div>
                <div className="student-card-detail">
                    Start
                    At: {new Date(exam.startAt).toDateString()} {new Date(exam.startAt).getHours()}:{new Date(exam.startAt).getMinutes()}
                </div>
                <div className="student-card-detail">
                    End
                    At: {new Date(exam.endAt).toDateString()} {new Date(exam.endAt).getHours()}:{new Date(exam.endAt).getMinutes()}
                </div>
                {new Date(exam.startAt).getTime() > Date.now() &&
                <div className="student-card-detail">
                    Starts In: {showFormattedTime(new Date(exam.startAt).getTime() - Date.now())}
                </div>
                }
                {studentExam && new Date(studentExam.endDate).getTime() > Date.now() &&
                <div className="student-card-detail">
                    Ends In: {showFormattedTime(new Date(studentExam.endDate).getTime() - Date.now())}
                </div>
                }
                {!studentExam && new Date(exam.endAt).getTime() > Date.now() &&
                <div className="student-card-detail">
                    Ends In: {showFormattedTime(new Date(exam.endAt).getTime() - Date.now())}
                </div>
                }
                {new Date(exam.startAt).getTime() < Date.now() && new Date(exam.endAt).getTime() > Date.now() && !studentExam &&
                <button className="student-card-button" disabled={isSubmitting} onClick={() => {
                    setSubmitting(true);
                    examsAPI.post('/studentexams', {
                        exam: exam._id,
                        student: user._id
                    }, {
                        headers: {
                            Authorization: Cookie.get('jwtClient')
                        }
                    }).then(res => {
                        Router.push(`/studentexams/${res.data.data.doc._id}`);
                    }).catch(err => {
                        setSubmitting(false);
                        setError(err.response.data.message);
                    });
                }}>
                    Join Exam
                </button>
                }
                {studentExam && Date.now() < new Date(studentExam.endDate).getTime() &&
                <button className="student-card-button" disabled={isSubmitting} onClick={() => {
                    Router.push(`/studentexams/${studentExam._id}`);
                }}>
                    Continue Exam
                </button>
                }
                <div className="error">{error}</div>
            </div>
        )
    });

    return (
        <div className="student-list-container">
            <h1>Exams</h1>
            {renderExams()}
        </div>
    );
};

export default StudentExamsList;