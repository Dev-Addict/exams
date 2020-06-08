import TestRadioInput from "./TestRadioInput";
import DescriptiveQuestionInput from "./DescriptiveQuestionInput";
import exams from "../api/exams";

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
         type,
         questionNum,
         initial,
         questionId,
         token,
         student
     }) => {
        const onSelected = async (option, setError, setReady) => {
            setReady(false);
            try {
                await exams.post('/answers', {
                    question: questionId,
                    answer: option,
                    student
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } catch (err) {
                setError(err.response.data.message);
            }
            setReady(true);
        };

        const onSubmit = async (value, setError, setReady) => {
            setReady(false);
            try {
                await exams.post('/answers', {
                    question: questionId,
                    answer: value,
                    student
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } catch (err) {
                setError(err.response.data.message);
            }
            setReady(true);
        };

        return (
            <div className="question-block">
                <div className="question-question">
                    <div>{question}</div>
                    {questionAsset &&
                    <img src={questionAsset} alt={question}/>
                    }
                    {
                        type === 'test' ?
                            <TestRadioInput options={{
                                option1,
                                option1Asset,
                                option2,
                                option2Asset,
                                option3,
                                option3Asset,
                                option4,
                                option4Asset
                            }} questionNum={questionNum} onSelected={onSelected} initial={initial}/> :
                            <DescriptiveQuestionInput questionNum={questionNum} onSubmit={onSubmit} initial={initial}/>
                    }
                </div>
            </div>
        );
    };

export default Question;