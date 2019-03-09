import { Technology, Language, Link, Money, StatusInfo, Ticket, Tools, Cart } from "grommet-icons"

export const VaultMenu = [
    {
        id: 1,
        admin: null,
        icon: <Technology className="MenuIcon" size="20px" />,
        main: {link: "/", label: "The Vault"}
    },
    {
        id: 2,
        admin: null,
        icon: <Language size="20px" size="20px" />,
        main: {link: null, label: "Company Websites"},
        sub: [
            {id: 1, link: "https://www.progressmfg.com", label: "Progress Manufacturing"},
            {id: 2, link: "https://www.equalizerhitch.com", label: "Equal-i-zer Hitch"},
            {id: 3, link: "https://www.fastwaytrailer.com", label: "Fastway Trailer Products"},
            {id: 4, link: "#", label: "Dealer Artwork Library"}
        ]
    },
    {
        id: 3,
        admin: null,
        icon: <Link size="20px" size="20px" />,
        main: {link: null, label: "Personal Links"},
        sub: [
            {id: 1, link: "http://progressmfg.bamboohr.com", label: "Bamboo HR"},
            {id: 2, link: "https://my.healthequity.com/HE.aspx", label: "HSA Account"},
            {id: 3, link: "https://auth.hsahealthplan.com/identity/login?signin=821290af9ccee3ab96024c9c322d28bb", label: "HSA Health Plan"},
            {id: 4, link: "https://participant.empower-retirement.com/participant/#/login", label: "Empower Retirement (401k)"},
            {id: 5, link: "https://outlook.office365.com/owa/", label: "Outlook Online (Email)"},
            {id: 6, link: "#", label: "Timeclock"},
            {id: 7, link: "#", label: "Timeclock Manager"}
        ]
    },
    {
        id: 4,
        admin: null,
        icon: <Money size="20px" size="20px" />,
        main: {link: null, label: "Progress Points"},
        sub: [
            {id: 1, link: "/ci", label: "Continual Improvement"},
            {id: 2, link: "/ipoints", label: "iPoints"},
            {id: 3, link: "/safety-points", label: "Safety Points"}
        ]
    },
    {
        id: 5,
        admin: null,
        icon: <StatusInfo size="20px" size="20px" />,
        main: {link: null, label: "Company Information"},
        sub: [
            {id: 1, link: "#", label: "Company Directory"},
            {id: 2, link: "#", label: "Safety Information"},
            {id: 3, link: "#", label: "Company History"},
            {id: 4, link: "#", label: "Sharepoint (Intranet)"}           
        ]
    },
    {
        id: 6,
        admin: true,
        icon: <Ticket size="20px" size="20px" />,
        main: {link: null, label: "Company Requests"},
        sub: [
            {id: 1, link: "#", label: "Maintenance Requests"},
            {id: 2, link: "#", label: "Helpdesk Tickets"},
            {id: 3, link: "#", label: "Media Requests"},
            {id: 4, link: "#", label: "New Product Ideas"}
        ]
    },
    {
        id: 7,
        admin: null,
        icon: <Tools size="20px" size="20px" />,
        main: {link: null, label: "Company Tools"},
        sub: [
            {id: 1, link: "#", label: "Salesforce"},
            {id: 2, link: "#", label: "Sage 300C"},
            {id: 3, link: "#", label: "CRM"},
            {id: 4, link: "#", label: "Shipping"},
            {id: 5, link: "https://asana.com/#login", label: "Asana"},
            {id: 6, link: "https://tasks.office.com/progressmfg.onmicrosoft.com", label: "Microsoft Planner"},
            {id: 7, link: "https://teams.microsoft.com", label: "Microsoft Teams"},
            {id: 8, link: "#", label: "SEI"}
        ]
    },
    {
        id: 8,
        admin: null,
        icon: <Cart size="20px" size="20px" />,
        main:  {link: "http://store/", label: "Company Store"}
    }
]