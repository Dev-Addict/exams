import {useState, useEffect} from 'react';
import Router from "next/router";

const showFormattedTime = time => `${
    Math.floor(time / 1000 / 60 / 60 / 24)
}:${
    Math.floor(time / 1000 / 60 / 60 % 24)
}:${
    Math.floor(time / 1000 / 60 % 60)
}:${
    Math.floor(time / 1000 % 60)
}`;

const ExamDetails = ({exam, studentExam}) => {
    const [time, setTime] = useState(Date.now());
    const setTimeLoop = () => {
        setTime(Date.now());
        setTimeout(setTimeLoop, 1000)
    };
    useEffect(() => {
        setTimeLoop();
    }, []);

    if (new Date(studentExam.endDate).getTime() - Date.now() < 0)
        Router.push('/dashboard');

    return (
        <div className="exam-detail-container">
            <div className="exam-detail">
                Name: {exam.name}<sub>{exam.description}</sub>
            </div>
            <div className="exam-detail">
                {exam.level1Amount + exam.level2Amount + exam.level3Amount + exam.level4Amount + exam.level5Amount +
                exam.level6Amount + exam.level7Amount + exam.level8Amount + exam.level9Amount + exam.level10Amount} Questions
            </div>
            <div className="exam-detail">
                Ends In: {showFormattedTime(new Date(studentExam.endDate).getTime() - Date.now())}
            </div>
        </div>
    );
};

export default ExamDetails;