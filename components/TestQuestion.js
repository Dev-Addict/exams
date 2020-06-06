const TestQuestion =
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
         option4Asset
     }) => {
        return (
            <div className="question-block">
                <div className="question-question">
                    <div>{question}</div>
                    <img src={questionAsset} alt={question}/>
                </div>
            </div>
        );
    };

export default TestQuestion;