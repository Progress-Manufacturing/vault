import { 
    Technology,
    Language,
    Link,
    Money,
    StatusInfo,
    Ticket,
    Tools,
    Cart 
} from 'grommet-icons'

export const VaultMenu = [
    {
        id: 1,
        icon: <Technology className='MenuIcon' size='20px' />,
        main: {link: '/', label: 'The Vault'}
    },
    {
        id: 2,
        icon: <Language size='20px' size='20px' />,
        main: {link: null, label: 'Company Websites'},
        sub: [
            {id: 1, link: 'https://www.progressmfg.com', label: 'Progress Manufacturing'},
            {id: 2, link: 'https://www.equalizerhitch.com', label: 'Equal-i-zer Hitch'},
            {id: 3, link: 'https://www.fastwaytrailer.com', label: 'Fastway Trailer Products'},
            {id: 4, link: 'http://www.progressmfg.com/library/', label: 'Dealer Artwork Library'}
        ]
    },
    {
        id: 3,
        icon: <Link size='20px' size='20px' />,
        main: {link: null, label: 'Personal Links'},
        sub: [
            {id: 1, link: 'http://progressmfg.bamboohr.com', label: 'Bamboo HR'},
            {id: 2, link: 'https://my.healthequity.com/HE.aspx', label: 'HSA Account'},
            {id: 3, link: 'https://member.hsahealthplan.com/', label: 'HSA Health Plan'},
            {id: 4, link: 'https://participant.empower-retirement.com/participant/#/login', label: 'Empower Retirement (401k)'},
            {id: 5, link: 'https://outlook.office365.com/owa/', label: 'Outlook Online (Email)'},
            {id: 6, link: 'http://10.10.1.38:83/app/webclock/#/EmployeeLogOn', label: 'Timeclock'},
            {id: 7, link: 'http://10.10.1.38:83/app/manager/#/ManagerLogOn', label: 'Timeclock Manager'}
        ]
    },
    {
        id: 4,
        icon: <Money size='20px' size='20px' />,
        main: {link: null, label: 'Progress Points'},
        sub: [
            {id: 1, link: '/ci', label: 'Continual Improvement'},
            {id: 2, link: '/comingsoon', label: 'iPoints'},
            {id: 3, link: '/comingsoon', label: 'Safety Points'}
        ]
    },
    {
        id: 5,
        icon: <StatusInfo size='20px' size='20px' />,
        main: {link: null, label: 'Company Information'},
        sub: [
            {id: 1, link: 'https://progressmfg-my.sharepoint.com/_layouts/15/me.aspx?v=profile', label: 'Company Directory'},
            {id: 2, link: 'https://progressmfg.sharepoint.com/Safety%20Manual/Forms/AllItems.aspx', label: 'Safety Information'},
            {id: 3, link: 'http://progressmfg.sharepoint.com/', label: 'Sharepoint (Intranet)'}           
        ]
    },
    {
        id: 6,
        icon: <Ticket size='20px' size='20px' />,
        main: {link: null, label: 'Company Requests'},
        sub: [
            {id: 1, link: 'mailto:maintenance@progressmfg.com?subject=New Maintenance Request', label: 'Maintenance Requests'},
            {id: 2, link: 'http://192.168.1.45/helpdesk/', label: 'Helpdesk Tickets'},
            {id: 3, link: 'http://media/', label: 'Media Requests'},
            {id: 4, link: 'https://progressmfg.sharepoint.com/_layouts/15/FormServer.aspx?XsnLocation=https://progressmfg.sharepoint.com/New%20Product%20Idea/Forms/template.xsn&SaveLocation=https%3A%2F%2Fprogressmfg.sharepoint.com%2FNew%20Product%20Idea&ClientInstalled=false&DefaultItemOpen=1&Source=https%3A%2F%2Fprogressmfg.sharepoint.com%2F', label: 'New Product Ideas'}
        ]
    },
    {
        id: 7,
        icon: <Tools size='20px' size='20px' />,
        main: {link: null, label: 'Company Tools'},
        sub: [
            {id: 1, link: 'https://progressmfg.my.salesforce.com/', label: 'Salesforce'},
            {id: 2, link: 'http://sage/Sage300/', label: 'Sage 300C'},
            {id: 3, link: 'http://shipping/processshipper/SuiteNLogon.aspx', label: 'Shipping'},
            {id: 4, link: 'https://asana.com/#login', label: 'Asana'},
            {id: 5, link: 'https://tasks.office.com/progressmfg.onmicrosoft.com', label: 'Microsoft Planner'},
            {id: 6, link: 'https://teams.microsoft.com', label: 'Microsoft Teams'},
            {id: 7, link: 'http://sei:81/', label: 'SEI'}
        ]
    },
    {
        id: 8,
        icon: <Cart size='20px' size='20px' />,
        main:  {link: 'http://store/', label: 'Company Store'}
    }
]