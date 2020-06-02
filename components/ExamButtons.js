import Link from "next/link";

const ExamButtons = ({id}) => {
    return (
        <div className="buttons-container">
            <Link href={`/exams/${id}/createquestion`}>
                <a>Create Question</a>
            </Link>
        </div>
    );
};

export default ExamButtons;