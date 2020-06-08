import TestRadioInput from "./TestRadioInput";
import DescriptiveQuestionInput from "./DescriptiveQuestionInput";

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
         questionNum
     }) => {
        const onSelected = (option, setError, setReady) => {};

        const onSubmit = (value, setError, setReady) => {};

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
                            }} questionNum={questionNum} onSelected={onSelected}/> :
                            <DescriptiveQuestionInput questionNum={questionNum} onSubmit={onSubmit}/>
                    }
                </div>
            </div>
        );
    };

export default Question;