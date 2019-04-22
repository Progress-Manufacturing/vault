import { Technology, Dashboard, Edit, DocumentText, Group, Run, Copy, UserAdmin, Analytics } from "grommet-icons"

export const CiMenu = [
    {
        id: 1,
        icon: <Technology className="MenuIcon" size="20px" />,
        main: {link: "/", label: "Vault"}
    },
    {
        id: 2,
        icon: <Dashboard className="MenuIcon" size="20px" />,
        main: { link: "/ci", label: "CI Dashboard" }
    },
    {
        id: 3,
        icon: <Edit className="MenuIcon" size="20px" />,
        main: { link: "/ci/submit-improvement", label: "Submit Improvement" }
    },
    {
        id: 4,
        icon: <DocumentText className="MenuIcon" size="20px" />,
        main: { link: "/ci/my-submissions", label: "My Submissions" }
    },
    {
        id: 5,
        supervisor: 1,
        icon: <Group className="MenuIcon" size="20px" />,
        main: { link: "/ci/team-submissions", label: "Team Submissions" }
    },
    {
        id: 6,
        lead: 1,
        icon: <Run className="MenuIcon" size="20px" />,
        main: { link: "/ci/team-lead-submissions", label: "Team Lead Projects" }
    },
    {
        id: 7,
        admin: 1, 
        icon: <Copy className="MenuIcon" size="20px" />,
        main: { link: "/ci/all-submissions", label: "All Submissions" }
    },
    {
        id: 8,
        admin: 1,
        icon: <UserAdmin className="MenuIcon" size="20px" />,
        main: { link: "/ci/admin", label: "Admin" }
    },
    {
        id: 9,
        admin: 1,
        icon: <Analytics className="MenuIcon" size="20px" />,
        main: { link: null, label: "Reports" },
        sub: [
            { id: 1, link: "/ci/reports/department-reports", label: "Department Reports" },
            { id: 2, link: "/ci/reports/users-report", label: "Individual Reports" },
            { id: 3, link: "/ci/reports/in-progress-report", label: "In-progress Reports" },
            { id: 4, link: "/ci/reports/completed-projects-report", label: "Finished Reports" }
        ]
    }
]