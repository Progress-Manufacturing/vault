import {withRouter} from "next/router"
import withData from "../../lib/apollo"
import Main from "../../lib/layout"
import UserSubmission from "../../components/usersubmission"
import Comments from "../../components/comments"
import SubmissionProgress from "../../components/progress";
import SubmissionComplete from "../../components/usersubmission/complete"

const Submission = withRouter((props) => {
    const { router } = props
    const submissionId = parseInt(router.query.id)
    return (
        <Main>
            <SubmissionProgress id={submissionId} />
            <SubmissionComplete id={submissionId} />
            <Comments title="Project Lead Comments"/>
            <Comments title="Supervisor Comments"  announcement={{ title: "Approved", status: 1 }} />
            <Comments title="Committee Comments" announcement={{ title: "Thank You", status: 0 }}/>
            <UserSubmission id={submissionId} />
        </Main>    
    )
})

export default withData(Submission)