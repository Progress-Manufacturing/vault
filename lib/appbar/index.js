import { Box, Image } from "grommet"
import AppBarItem from "./appbaritem"
import AppBarAccordion from "./appbaraccordion"

const AppBar = (props) => {
    return (
        <Box
            fill="vertical"
            overflow={{ vertical: "scroll", horizontal: "hidden" }}
            width="250px"            
            direction="column"
            background="lightBlack"
            flex={{ grow: 1 }}
        >
            <Box
                background="black"
                height="55px"
                pad="12px"
                flex={{ grow: 0, shrink: 0 }}
            >
                <Image src="../../static/progress-logo.svg" fit="contain" alignSelf="start" style={{ maxHeight: "100%"}} />
            </Box>
            <Box 
                fill={false}
                flex={{ grow: 1, shrink: 0 }}
                basis="auto"
                direction="column"
            >
                {props.menu.map(item => { 
                    if(item.supervisor === props.supervisor) {
                        if(!item.sub) 
                            return (
                                <AppBarItem key={item.id} label={item.main.label} link={item.main.link} icon={item.icon} />
                            )
                        return (<AppBarAccordion key={item.id} label={item.main.label} icon={item.icon} submenu={item.sub} />)   
                    }
                    if(item.admin === undefined && item.supervisor === undefined && item.lead === undefined) {
                        if(!item.sub) 
                            return (
                                <AppBarItem key={item.id} label={item.main.label} link={item.main.link} icon={item.icon} />
                            )
                        return (<AppBarAccordion key={item.id} label={item.main.label} icon={item.icon} submenu={item.sub} />)                           
                    }
                    if(item.admin === props.admin) {
                        if(!item.sub) 
                            return (
                                <AppBarItem key={item.id} label={item.main.label} link={item.main.link} icon={item.icon} />
                            )
                        return (<AppBarAccordion key={item.id} label={item.main.label} icon={item.icon} submenu={item.sub} />)   
                    }
                    if(item.lead === props.lead) {
                        if(!item.sub) 
                            return (
                                <AppBarItem key={item.id} label={item.main.label} link={item.main.link} icon={item.icon} />
                            )
                        return (<AppBarAccordion key={item.id} label={item.main.label} icon={item.icon} submenu={item.sub} />)   
                    }
                })}
            </Box>
        </Box>
    )
}

export default AppBar