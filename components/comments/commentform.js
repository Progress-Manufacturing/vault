import gql from "graphql-tag"
import { Text } from "grommet"

import SupervisorComment from "./supervisorcomment"
import CommitteeComment from "./committecomment"
import LeadComment from "./leadcomment"
import Reward from "./reward"
import Comment from "./comment"

const CommentForm = (props) => {
    const { 
        commentType,
        submissionId,
        title,
        announcement,
        supervisorApproval,
        committeeApproval,
        supervisorEmail,
        improvementAreas,
        users,
        reward,
        rewarded
    } = props
    
    if (reward === true) {
        return (
            <Reward
                submissionId={submissionId}
                title={title}
                rewarded={rewarded}
            />
        )
    } else if (commentType === 1 && announcement.status === -1) {
        return (
            <CommitteeComment
                submissionId={submissionId}
                title={title}
                commentType={commentType}
                committeeApproval={committeeApproval}
                supervisorEmail={supervisorEmail}
                users={users}
                improvementAreas={improvementAreas}
            />
        )
    } else if (commentType === 2 && announcement.status === -1) {
        return (
            <SupervisorComment
                submissionId={submissionId}
                title={title}
                commentType={commentType} 
                supervisorApproval={supervisorApproval}
            />
        )
    } else if (commentType === 3) {
        return (
            <LeadComment
                submissionId={submissionId}
                title={title}
                commentType={commentType}
            />
        )
    } else {
        return (
            <Comment 
                submissionId={submissionId}
                title={title}
                commentType={commentType}
            />
        )
    }
}

export default CommentForm