import { Box, Text } from "grommet"

const LeadInfo = () => (
    <Box direction="row" wrap={true} margin={{ bottom: "15px" }}>
        <Box width="33.33%">
            <Text size="14px" margin={{ bottom: "15px" }}>
                <strong>Potential Start Date:</strong> 12/12/2019
            </Text>
            <Text size="14px">
                <strong>Actual Start Date:</strong> 12/12/2019
            </Text>                                    
        </Box>
        <Box width="33.33%">
            <Text size="14px" margin={{ bottom: "15px" }}>
                <strong>Potential End Date:</strong> 12/12/2019
            </Text>
            <Text size="14px">
                <strong>Actual End Date:</strong> 12/12/2019
            </Text>
        </Box>
        <Box width="33.33%">
            <Text size="14px">
                <strong>Resources Being Used:</strong>
                <ul>
                    <li>HR</li>
                    <li>Engineering</li>
                    <li>IT</li>
                </ul>
            </Text>
        </Box>
        <Box
            background="lightGray"
            height="1px"
            justify="center"
            align="center"
            direction="row"
            width="96%"
            margin={{ vertical: "25px", horizontal: "auto" }}
        />
        <style jsx>{`
            ul{
                margin: 0;
                padding: 0;
            }
            li{
                list-style-type: none;
                margin-top: 5px;
            }
        `}</style>
    </Box> 
)

export default LeadInfo