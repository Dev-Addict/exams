import {useState} from 'react';
import Router from "next/router";
import Link from "next/link";
import Cookie from 'js-cookie';

import examsAPI from '../api/exams';

const ExamsList = ({exams, auth}) => {
    const renderExams = () => exams.map(exam => {
        const [error, setError] = useState('');
        return (
            <div className="list-card" key={exam._id}>
                <table>
                    <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{exam.name}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{exam.description}</td>
                    </tr>
                    <tr>
                        <td>Level 1 Questions</td>
                        <td>{exam.level1Amount}</td>
                    </tr>
                    <tr>
                        <td>Level 2 Questions</td>
                        <td>{exam.level1Amount}</td>
                    </tr>
                    <tr>
                        <td>Level 3 Questions</td>
                        <td>{exam.level1Amount}</td>
                    </tr>
                    <tr>
                        <td>Level 4 Questions</td>
                        <td>{exam.level1Amount}</td>
                    </tr>
                    <tr>
                        <td>Level 5 Questions</td>
                        <td>{exam.level1Amount}</td>
                    </tr>
                    <tr>
                        <td>Level 6 Questions</td>
                        <td>{exam.level1Amount}</td>
                    </tr>
                    <tr>
                        <td>Level 7 Questions</td>
                        <td>{exam.level1Amount}</td>
                    </tr>
                    <tr>
                        <td>Level 8 Questions</td>
                        <td>{exam.level1Amount}</td>
                    </tr>
                    <tr>
                        <td>Level 9 Questions</td>
                        <td>{exam.level1Amount}</td>
                    </tr>
                    <tr>
                        <td>Level 10 Questions</td>
                        <td>{exam.level1Amount}</td>
                    </tr>
                    <tr>
                        <td>For</td>
                        <td>{exam.for}</td>
                    </tr>
                    <tr>
                        <td>Start At</td>
                        <td>{exam.startAt.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>End At</td>
                        <td>{exam.endAt.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Time</td>
                        <td>{exam.time}</td>
                    </tr>
                    </tbody>
                </table>
                <Link href={`/exams/${exam._id}`}>
                    <a className="list-edit">Manage</a>
                </Link>
                <Link href={`/editexam/${exam._id}`}>
                    <a className="list-edit">Edit</a>
                </Link>
                <button className="list-delete" onClick={() => {
                    examsAPI.delete(`/exams/${exam._id}`, {
                        headers: {
                            authorization: `Bearer ${Cookie.get('jwtClient')}`
                        }
                    }).then(res => {
                        setTimeout(() => Router.push('/dashboard'), 10);
                    }).catch(err => {
                        setError(err.response.data.message);
                    });
                }}>Delete
                </button>
                <div className="error">{error}</div>
            </div>
        )
    });

    return (
        <div className="list-container">
            <h1>Exams</h1>
            {renderExams()}
        </div>
    );
};

export default ExamsList;