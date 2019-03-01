import { withRouter } from "next/router"
import Main from "../../../lib/layout/main"
import SubmissionProgress from "../../../components/progress"
import UserSubmission from "../../../components/usersubmission"

const Submission = (props) => {
    const { router } = props
    const submissionId = parseInt(router.query.id)
    
    return (
        <Main>
            <SubmissionProgress id={submissionId} />
            <UserSubmission id={submissionId} />
        </Main>  
    )
}

export default withRouter(Submission)