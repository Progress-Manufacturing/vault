// --------------------------------
// 
// Initial email notifications 
//
// --------------------------------
const initialUserNotification = (email) => (
    {
        subject: "Continual Improvement Program - Thank You",
        toRecipients: [
            {
                emailAddress: {
                    address: email
                },
            },
        ],
        body: {
            content: "<h1>Thank You</h1><br/>We appreciate your participation in the Continual Improvement Program. We'll notify you with updates on your suggestion as the process continues.<br/><br/>In the mean time, feel free to view the progress of your suggestion in the CI application. <a href='https://vault.progressmfg.com/ci/my-submissions' style='background: #D0011B; padding: 15px 30px; color: black, text-align: center'>Your Submissions</a>",
            contentType: "html",
        }
    }
)

const initialSupervisorNotification = (email) => (
    {
        subject: "Continual Improvement Program - Submission",
        toRecipients: [
            {
                emailAddress: {
                    address: email
                },
            },
        ],
        body: {
            content: "<h1>New Submission</h1><br/>A member of your team has submitted a new Continual Improvement suggestion! This is really exciting! Please login to the CI web app to review the submission asap.<br/> <a href='https://vault.progressmfg.com/ci/team-submissions' style='background: #D0011B; padding: 15px 30px; color: black, text-align: center'>Team Submissions</a>",
            contentType: "html",
        }
    }
)

// --------------------------------
// 
// Supervisor decision email notifications 
//
// --------------------------------
const supervisorReviewNotification = (email, submission) => (
    {
        subject: "Continual Improvement Program - Submission Supervisor Review",
        toRecipients: [
            {
                emailAddress: {
                    address: email
                }
            }
        ],
        body: {
            content: `<h1>Submission #${submission}</h1><br/>Your supervisor has reviewed your suggestion. Please login to view their response.<br/> <a href='https://vault.progressmfg.com/ci/my-submissions/submission?id=${submission}' style='background: #D0011B; padding: 15px 30px; color: black, text-align: center'>Team Submissions</a>`,
            contentType: "html",
        }
    }
)

const initialAdminNotification = (emails, submission) => {
    let emailAddresses = [];
    
    for(let email of emails) {
        emailAddresses.push({ emailAddress: { address: email } });
    }

    return (
        {
            subject: "Continual Improvement Program - Submission Supervisor Review",
            toRecipients: emailAddresses,
            body: {
                content: `<h1>Submission #${submission}</h1><br/>A Continual Improvement has been reviewed by a supervisor. Please login to view their response.<br/> <a href='https://vault.progressmfg.com/ci/all-submissions/submission?id=${submission}' style='background: #D0011B; padding: 15px 30px; color: black, text-align: center'>Team Submissions</a>`,
                contentType: "html"
            }
        }
    )
}

// --------------------------------
// 
// Committee decision email notifications 
//
// --------------------------------
const committeeReviewNotificationToUser = (email, submission) => (
    {
        subject: "Continual Improvement Program - Submission Committee Review",
        toRecipients: [
            {
                emailAddress: {
                    address: email
                }
            }
        ],
        body: {
            content: `<h1>Submission #${submission}</h1><br/>The committee has reviewed your suggestion. Please login to view their response.<br/> <a href='https://vault.progressmfg.com/ci/my-submissions/submission?id=${submission}' style='background: #D0011B; padding: 15px 30px; color: black, text-align: center'>Team Submissions</a>`,
            contentType: "html",
        }
    }
)

const committeeReviewNotificationToSupervisor = (email, submission) => (
    {
        subject: "Continual Improvement Program - Submission Committee Review",
        toRecipients: [
            {
                emailAddress: {
                    address: email
                }
            }
        ],
        body: {
            content: `<h1>Submission #${submission}</h1><br/>The committee has reviewed your team members suggestion. Please login to view their response.<br/> <a href='https://vault.progressmfg.com/ci/team-submissions/submission?id=${submission}' style='background: #D0011B; padding: 15px 30px; color: black, text-align: center'>Team Submissions</a>`,
            contentType: "html",
        }
    }
)

const committeeReviewNotificationToLead = (email) => (
    {
        subject: "Continual Improvement Program - Assigned Lead",
        toRecipients: [
            {
                emailAddress: {
                    address: email
                }
            }
        ],
        body: {
            content: `<h1>Congratulations</h1><br/>You've been selected as the lead of a continual improvement project. Please login to view the project and make updates.<br/> <a href='https://vault.progressmfg.com/ci/team-lead-submissions' style='background: #D0011B; padding: 15px 30px; color: black, text-align: center'>Team Submissions</a>`,
            contentType: "html",
        }
    }

)

export {
    initialUserNotification,
    initialSupervisorNotification,
    supervisorReviewNotification,
    initialAdminNotification,
    committeeReviewNotificationToUser,
    committeeReviewNotificationToSupervisor,
    committeeReviewNotificationToLead
}