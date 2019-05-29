import React, { Component } from "react"
import { ApolloConsumer } from "react-apollo"
import { withRouter } from "next/router"
import Link from "next/link"
import { Button } from "grommet"
import { Query } from "react-apollo";
import gql from "graphql-tag"

import Main from "../../../lib/layout/main"
import Card from "../../../components/card"

const GET_SUBMISSION_BY_ID = gql`
  query addSubmission($id: Int!) {
    fetchSubmission(id: $id) {
      id
    }
  }
`

class SubmissionSuccess extends Component {          
    render() {
        const { router, isSupervisor, isLead, isAdmin } = this.props
        const id = parseInt(router.query.id)
        return (
            <ApolloConsumer>
                {client => (
                    <Query query={GET_SUBMISSION_BY_ID} variables={{ id }}>
                        {({ loading, error, data }) => {
                            if (loading) return null;
                            if (error) return `Something went wrong, please contact IT: ${error}`;
                
                            return (
                                <Main isSupervisor={isSupervisor} isLead={isLead} isAdmin={isAdmin}>
                                    <Card title="Thank You" highlight={true}>
                                        <p><strong>Submission #{id}</strong></p>
                                        <p style={{ fontSize: "14px" }}>
                                            Thank you! Thank you for making Progress Manufacturing a better place to work! Our team of improvement experts will review your suggestion and let you know the conclusion.<br/><br/>
                                            If it's approved we'll move forward with it and you'll be handsomely rewarded!<br/><br/>
                                            Thanks again for participating in this wonderful program! You can see the progress of your other submissions in the side menu or you can even submit another improvement suggestion.
                                        </p>
                                        <ul className="ButtonList">
                                            <li>
                                                <Link href="/ci/submit-improvement" passHref>
                                                    <Button
                                                        className="SimpleButton"
                                                        label="Submit Another Continual Improvement"
                                                        pad="20px"
                                                    />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/ci/my-submissions" passHref>
                                                    <Button
                                                        className="SimpleButtonSecondary"
                                                        label="Check Status Of A Continual Improvement"
                                                        pad="20px"
                                                    />
                                                </Link>
                                            </li>
                                        </ul>
                                    </Card>
                                    <style jsx>{`
                                        .SubmissionForm {
                                            width: 100%;
                                        }
                                        sup {
                                            color: red;
                                            font-size: 12px;
                                        }
                                        ul.ButtonList {
                                            margin: 15px 0;
                                            padding: 0;
                                        }
                                        ul.ButtonList li {
                                            list-style-type: none;
                                            display: inline-block;
                                            margin-right: 25px
                                        }
                                    `}</style>
                                </Main>            
                            )
                        }}
                    </Query>
                )}
            </ApolloConsumer>
        )
    }
}

export default withRouter(SubmissionSuccess)