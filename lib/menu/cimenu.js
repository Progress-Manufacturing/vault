import { Technology, Dashboard, Edit, DocumentText, Group, Copy, UserAdmin, Analytics } from "grommet-icons"

export const CiMenu = [
    {
        id: 1,
        admin: null,
        icon: <Technology className="MenuIcon" size="20px" />,
        main: {link: "/", label: "Vault"}
    },
    {
        id: 2,
        admin: null,
        icon: <Dashboard className="MenuIcon" size="20px" />,
        main: { link: "/ci", label: "CI Dashboard" }
    },
    {
        id: 3,
        admin: null,
        icon: <Edit className="MenuIcon" size="20px" />,
        main: { link: "/ci/submit-improvement", label: "Submit Improvement" }
    },
    {
        id: 4,
        admin: null,
        icon: <DocumentText className="MenuIcon" size="20px" />,
        main: { link: "/ci/previous-submissions", label: "Previous Submissions" }
    },
    {
        id: 5,
        admin: null,
        lead: true,
        supervisor: true,
        icon: <Group className="MenuIcon" size="20px" />,
        main: { link: "/ci/team", label: "My Team(s)" }
    },
    {
        id: 6,
        admin: null,
        supervisor: true,
        icon: <Copy className="MenuIcon" size="20px" />,
        main: { link: "/ci/all-submissions", label: "All Submissions" }
    },
    {
        id: 7,
        admin: true,
        icon: <UserAdmin className="MenuIcon" size="20px" />,
        main: { link: "/ci/admin", label: "Admin" }
    },
    {
        id: 8,
        admin: true,
        icon: <Analytics className="MenuIcon" size="20px" />,
        main: { link: null, label: "Reports" },
        sub: [
            { id: 1, link: "/ci/reports/teams-report", label: "Team Reports" },
            { id: 2, link: "/ci/reports/departments-report", label: "Department Reports" },
            { id: 3, link: "/ci/reports/users-report", label: "Individual Reports" },
            { id: 4, link: "/ci/reports/in-progress-report", label: "In-progress Reports" },
            { id: 5, link: "/ci/reports/completed-projects-report", label: "Finished Reports" }
        ]
    }
]