import { Component } from "react"
import { ApolloConsumer, Query } from "react-apollo"

import { Box } from "grommet"
import gql from "graphql-tag"
import Main from "../../../lib/layout/main"
import Card from "../../../components/card"

const GET_MESSAGES = gql`
    query messages{
        messages: allMessages {
            id
            name
            message
        }
    }
`

// const UPDATE_MESSAGE = gql`
//   mutation updateMessage(
//         $id: Int!,
//         $name: String!,
//         $message: String!
//     ) {
//     addSubmission(
//         id: $id, 
//         name: $name,
//         message: $message
//     ) {
//       id
//     }
//   }
// `

class Admin extends Component {
    render() {
        const { supervisorAuth, leadAuth } = this.props

        return (
            <ApolloConsumer>
                {client => (
                    <Main supervisor={supervisorAuth} lead={leadAuth}>
                        <Query query={GET_MESSAGES}>
                        {({ loading, error, data }) => {
                            if (loading) return "Loading..."
                            if (error) return "Error :("
                            
                            return data.messages.map(({ id, message, name }) => {
                                return (
                                    <Card key={id} title={`${name} Message`} highlight={true}>
                                        <Box
                                            fill="horizontal"
                                            pad={{ vertical: "15px" }}
                                        >
                                        <div>
                                            {message.split("\n").map((i,key) => {
                                                return <div style={{ marginBottom: "20px" }} key={key}>{i}</div>;
                                            })}
                                        </div>
                                        </Box>                                                       
                                    </Card>
                                )
                            })
                        }}                
                        </Query>
                    </Main>
                )}
            </ApolloConsumer>
        )
    }
}
    
export default Admin