import {useState} from 'react';

const StudentExamsList = ({exams}) => {
    const [isSubmitting, setSubmitting] = useState(false);
    const renderExams = () => exams.map(exam => {
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
                {new Date(exam.startAt).getTime() > Date.now() > new Date(exam.endAt) &&
                <button className="student-card-button" disabled={isSubmitting} onClick={() => {
                    setSubmitting(true);
                }}>
                    Join Exam
                </button>
                }
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