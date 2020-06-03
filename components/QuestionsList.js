import {useState} from 'react';
import Router from "next/router";
import Link from "next/link";
import Cookie from 'js-cookie';

import exams from '../api/exams';

const QuestionsList = ({questions, exam}) => {
    const renderQuestions = () => questions.map(question => {
        const [error, setError] = useState('');
        return (
            <div className="list-card" key={question._id}>
                <table>
                    <tbody>
                    <tr>
                        <td>Question</td>
                        <td>{question.question}</td>
                    </tr>
                    <tr>
                        <td>Question Asset</td>
                        <td>{question.questionAsset}</td>
                    </tr>
                    <tr>
                        <td>type</td>
                        <td>{question.type}</td>
                    </tr>
                    <tr>
                        <td>Option 1</td>
                        <td>{question.option1}</td>
                    </tr>
                    <tr>
                        <td>Option 1 Asset</td>
                        <td>{question.option1Asset}</td>
                    </tr>
                    <tr>
                        <td>Option 2</td>
                        <td>{question.option2}</td>
                    </tr>
                    <tr>
                        <td>Option 2 Asset</td>
                        <td>{question.option2Asset}</td>
                    </tr>
                    <tr>
                        <td>Option 3</td>
                        <td>{question.option3}</td>
                    </tr>
                    <tr>
                        <td>Option 3 Asset</td>
                        <td>{question.option3Asset}</td>
                    </tr>
                    <tr>
                        <td>Option 4</td>
                        <td>{question.option4}</td>
                    </tr>
                    <tr>
                        <td>Option 4 Asset</td>
                        <td>{question.question}</td>
                    </tr>
                    <tr>
                        <td>Correct Option</td>
                        <td>{question.correctOption}</td>
                    </tr>
                    <tr>
                        <td>Level</td>
                        <td>{question.level}</td>
                    </tr>
                    </tbody>
                </table>
                <Link href={`/editquestion/${question._id}`}>
                    <a className="list-edit">Edit</a>
                </Link>
                <button className="list-delete" onClick={() => {
                    exams.delete(`/questions/${question._id}`, {
                        headers: {
                            authorization: `Bearer ${Cookie.get('jwtClient')}`
                        }
                    }).then(res => {
                        setTimeout(() => Router.push(`/exams/${exam}`), 10);
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
            <h1>Questions</h1>
            {renderQuestions()}
        </div>
    );
};

export default QuestionsList;