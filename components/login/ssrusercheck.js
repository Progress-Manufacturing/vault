import { static } from "express";

export static async getInitialProps (context, apolloClient) { 
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)
    const { supervisorSubmissions } = await checkSupervisor(context.apolloClient)
    const { leadSubmissions } = await checkLead(context.apolloClient)
    let supervisorAuth = false
    let leadAuth = false
    
    if (!loggedInUser.me) {
        // If not signed in, send them somewhere more useful
        redirect(context, '/login')
    }

    if(supervisorSubmissions.length !== 0) {
        supervisorAuth = true
    }
      
    if(leadSubmissions.length !== 0) {
        leadAuth = true
    }

    return { loggedInUser, supervisorSubmissions, supervisorAuth, leadSubmissions, leadAuth }
}

