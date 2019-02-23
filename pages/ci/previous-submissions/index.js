import Main from "../../../lib/layout"
import { Box, Text } from "grommet"
import Card from "../../../components/card"
import UserLastReward from "../../../components/usersubmission/lastreward"
import UserSubmissionsCount from "../../../components/usersubmission/submissioncount"
import SubmissionPreview from "../../../components/usersubmission/preview"
import SubmissionsImplemented from "../../../components/usersubmission/submissionimplemented"

export default (props) => (
  <Main>
    <Card>
        <Box
            direction="row"
            flex={true}
            fill={true}
        >
            <Box
                width="33.33%"
                align="center"
                border={{ width: "1px", side: "right", color: "lightGray" }}
            >
                <Text size="12px" color="lighterBlack">Number of Submissions</Text>
                <UserSubmissionsCount />
            </Box>
            <Box
                width="33.33%"
                align="center"
                border={{ width: "1px", side: "right", color: "lightGray" }}
            >
                <Text size="12px" color="lighterBlack">Last Reward</Text>
                <UserLastReward />
            </Box>
            <Box 
                width="33.33%"
                align="center"
            >
                <Text size="12px" color="lighterBlack">Submissions Implemented</Text>
                {/* TODO: Figure out how we'll figure out if submission was implemented */}
                <SubmissionsImplemented />
            </Box>
        </Box>
    </Card>
    <Card title="Your Previous Submissions">
        <SubmissionPreview />
    </Card>
  </Main>
)