import { Component } from "react"
import { ApolloConsumer, Query } from "react-apollo"

import checkLoggedIn from "../../../lib/auth/checkLoggedIn"
import redirect from "../../../lib/auth/redirect"

import { Box, Paragraph, Button, Text } from "grommet"
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
    static async getInitialProps (context, apolloClient) {
        const { loggedInUser } = await checkLoggedIn(context.apolloClient)
        
        if (!loggedInUser.me) {
          // If not signed in, send them somewhere more useful
          redirect(context, '/login')
        }
    
        return { loggedInUser }
    }

    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <Main avatar={this.props.avatar} admin={this.props.admin}>
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