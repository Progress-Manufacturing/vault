import { Component } from "react"
import { ApolloConsumer } from "react-apollo"
import Link from "next/link"

import Main from "../lib/layout/main"
import Card from "../components/card"
import { Button } from "grommet"

class Home extends Component {
  render() {
    const { user, supervisorAuth, leadAuth } = this.props    
    const userFirstName = (user.me.user.name).split(" ")[0]
    
    return (
      <ApolloConsumer>
        {client => (
          <Main supervisor={supervisorAuth} lead={leadAuth}>          
            <Card title={`Welcome, ${userFirstName}`} highlight={true}>
              <p style={{ fontSize: "14px" }}>
                Hello! Welcome to the world famous Continual Improvement App. It's world famous in that the world knows about it, pretty sure that makes you famous. Anyway, this is where you submit your absolutely brilliant idea to improve Progress Manufacturing. From there we'll decid if it's actually brilliant, because we can judge such things. Most likely it's just asking for a candy in the break room, so really not that brilliant. But hey, who doesn't like candy!? I mean, Hitler probably liked candy. Oh no, that means you and Hitler have something in common. Aw, that's actually a really depressing realization that Hitler was in fact just a human with small things he enjoyed like candy, which means he wasn't evil incarnate but just a man like you or I. Which means we have the same potential for such desctructive evil. Aw dear, that's really quite depressing.<br/>
                Moving on!<br/><br/>
                Submit ideas and get candy, cash, or just a solid pat on the back from Jed! I know most of you are hoping for the pat on the back, but Jed is a busy man and will at times send is liason James to give you a pat on the back; please be aware James is a bit touchy feely and the pat could possibly turn into a full fledged hug.<br/><br/>
                Below you'll find some exciting stats about our Continual Improvement Program.<br/><br/>
              </p>
              <Link href="/ci/submit-improvement" passHref>
                <Button
                  className="SimpleButton"
                  label="Submit Continual Improvement"
                  pad="20px"
                />
              </Link>
            </Card>
          </Main>
        )}
      </ApolloConsumer>
    )
  }
}

export default Home