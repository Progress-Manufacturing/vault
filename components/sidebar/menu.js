import { Dashboard, Language, User, Money, StatusInfo, Ticket, Tools, Cart, FormDown } from 'grommet-icons'

export const Menu = [
    {
        id: 1,
        icon: <Dashboard color='white' size='20px' style={{ position: 'relative', top: '5px', marginRight: '10px' }} />,
        main: {link: '/', name: 'Dashboard'}
    },
    {
        id: 2,
        icon: <Language color='white' size='20px' style={{ position: 'relative', top: '5px', marginRight: '10px' }} />,
        main: {link: null, name: 'Company Websites'},
        sub: [
            {id: 1, link: 'https://www.progressmfg.com', name: 'Progress Manufacturing'},
            {id: 2, link: 'https://www.equalizerhitch.com', name: 'Equal-i-zer Hitch'},
            {id: 3, link: 'https://www.fastwaytrailer.com', name: 'Fastway Trailer Products'},
            {id: 4, link: '#', name: 'Dealer Artwork Library'}
        ]
    },
    {
        id: 3,
        icon: <User color='white' size='20px' style={{ position: 'relative', top: '5px', marginRight: '10px' }} />,
        main: {link: null, name: 'Personal Links'},
        sub: [
            {id: 1, link: 'http://progressmfg.bamboohr.com', name: 'Bamboo HR'},
            {id: 2, link: 'https://my.healthequity.com/HE.aspx', name: 'HSA Account'},
            {id: 3, link: 'https://auth.hsahealthplan.com/identity/login?signin=821290af9ccee3ab96024c9c322d28bb', name: 'HSA Health Plan'},
            {id: 4, link: 'https://participant.empower-retirement.com/participant/#/login', name: 'Empower Retirement (401k)'},
            {id: 5, link: 'https://outlook.office365.com/owa/', name: 'Outlook Online (Email)'},
            {id: 6, link: '#', name: 'Timeclock'},
            {id: 7, link: '#', name: 'Timeclock Manager'}
        ]
    },
    {
        id: 4,
        icon: <Money color='white' size='20px' style={{ position: 'relative', top: '5px', marginRight: '10px' }} />,
        main: {link: null, name: 'Progress Points'},
        sub: [
            {id: 1, link: '/continual-improvement', name: 'Continual Improvement'},
            {id: 2, link: '/ipoints', name: 'iPoints'},
            {id: 3, link: '/safety-points', name: 'Safety Points'}
        ]
    },
    {
        id: 5,
        icon: <StatusInfo color='white' size='20px' style={{ position: 'relative', top: '5px', marginRight: '10px' }} />,
        main: {link: null, name: 'Company Information'},
        sub: [
            {id: 1, link: '#', name: 'Company Directory'},
            {id: 2, link: '#', name: 'Safety Information'},
            {id: 3, link: '#', name: 'Company History'},
            {id: 4, link: '#', name: 'Sharepoint (Intranet)'}           
        ]
    },
    {
        id: 6,
        icon: <Ticket color='white' size='20px' style={{ position: 'relative', top: '5px', marginRight: '10px' }} />,
        main: {link: null, name: 'Company Requests'},
        sub: [
            {id: 1, link: '#', name: 'Maintenance Requests'},
            {id: 2, link: '#', name: 'Helpdesk Tickets'},
            {id: 3, link: '#', name: 'Media Requests'},
            {id: 4, link: '#', name: 'New Product Ideas'}
        ]
    },
    {
        id: 7,
        icon: <Tools color='white' size='20px' style={{ position: 'relative', top: '5px', marginRight: '10px' }} />,
        main: {link: null, name: 'Company Tools'},
        sub: [
            {id: 1, link: '#', name: 'Salesforce'},
            {id: 2, link: '#', name: 'Sage 300C'},
            {id: 3, link: '#', name: 'CRM'},
            {id: 4, link: '#', name: 'Shipping'},
            {id: 5, link: 'https://asana.com/#login', name: 'Asana'},
            {id: 6, link: 'https://tasks.office.com/progressmfg.onmicrosoft.com', name: 'Microsoft Planner'},
            {id: 7, link: 'https://teams.microsoft.com', name: 'Microsoft Teams'},
            {id: 8, link: '#', name: 'SEI'}
        ]
    },
    {
        id: 8,
        icon: <Cart color='white' size='20px' style={{ position: 'relative', top: '5px', marginRight: '10px' }} />,
        main:  {link: 'http://store/', name: 'Company Store'}
    }
]