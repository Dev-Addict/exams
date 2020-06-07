import {Formik, Form, Field} from 'formik';

import TestRadioInput from "./TestRadioInput";
import Input from "./Input";

const Question =
    ({
         question,
         questionAsset,
         option1,
         option1Asset,
         option2,
         option2Asset,
         option3,
         option3Asset,
         option4,
         option4Asset,
         type
     }) => {
        return (
            <div className="question-block">
                <div className="question-question">
                    <div>{question}</div>
                    {questionAsset &&
                    <img src={questionAsset} alt={question}/>
                    }
                    {type === 'test' ?
                        <TestRadioInput options={{
                            option1,
                            option1Asset,
                            option2,
                            option2Asset,
                            option3,
                            option3Asset,
                            option4,
                            option4Asset
                        }} name="answer"/> :
                        <Input type={text} name="answer"/>}
                </div>
            </div>
        );
    };

export default Question;