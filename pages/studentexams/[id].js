import exams from "../../api/exams";

const StudentExam = ({token, studentExam}) => {
    return (
        <div>
            student exam
        </div>
    );
};

StudentExam.getInitialProps = async ({query: {id}, res: response}, {user}, token) => {
    let studentExam;
    if (token) {
        if (!/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(id)) {
            if (response)
                response.status(404);
            return {};
        }
        try {
            const res = await exams.get(`/studentexams/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            studentExam = res.data.data.doc;
        } catch (err) {
            if (response)
                response.status(404);
            return {};
        }
        return {
            studentExam,
            token
        }
    }
    response.status(404);
    return {
    };
};

export default StudentExam;