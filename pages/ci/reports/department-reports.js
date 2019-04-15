import React, { Component } from "react"
import { ApolloConsumer } from "react-apollo"
import gql from "graphql-tag"

import { Form, Select, Button } from "grommet"
import { Bar, Doughnut } from "react-chartjs-2"

import Main from "../../../lib/layout/main"
import Card from "../../../components/card"

import Authorization from "../../../lib/auth/msal-auth"
import { getDepartments, getDepartmentUsersCount } from "../../../lib/auth/msal-graph"

const GET_DEPARTMENT_SUBMISSIONS = gql`
    query fetchDepartmentSubmissions(
        $dept: String!
        $startTime: DateTime!
        $endTime: DateTime!
    ) {
        submissions: fetchDepartmentSubmissions(
            dept: $dept
            startTime: $startTime
            endTime: $endTime
        ) {
            id
            createdAt
            user {
                id
            }
        }
    }
`

async function departmentCount(value) {
    const auth = new Authorization()
    
    try {
        const token = await auth.getToken()
        const departmentUserCount = await getDepartmentUsersCount(token, value)
        return departmentUserCount
    } catch(err) {
      console.log(err)
    }
}

async function fetchData(client, dept, time) {
    const departmentUsers = await departmentCount(dept)
    const year = new Date().getFullYear()
    const q1 = new Date(`${year - 1}-12-01 00:00:00`)
    const q2 = new Date(`${year}-03-01 00:00:00`)
    const q3 = new Date(`${year}-06-01 00:00:00`)
    const q4 = new Date(`${year}-09-01 00:00:00`)
    const yearEnd = new Date(`${year}-11-30 00:00:00`)
    let start = null, end = null, q1Subs = [], q2Subs = [], q3Subs = [], q4Subs = [], subs = [], deptUsers = [], percent = []

    switch (time.id) {
        case 1:
            start = q1
            end = yearEnd
            break
        case 2: 
            start = q1
            end = q2
            break
        case 3: 
            start = q2
            end = q3
            break
        case 4: 
            start = q3
            end = q4
            break
        case 5: 
            start = q4
            end = yearEnd
            break
    }

    const { data } = await client.query({
        query: GET_DEPARTMENT_SUBMISSIONS,
        variables: { 
            dept: dept,
            startTime: start,
            endTime: end
        }
    })
    
    for(let users of data.submissions) {
        deptUsers.push(users.user.id)
    }
    let participatingUsers = [...new Set(deptUsers)]
    let notParticipating = departmentUsers - participatingUsers.length
    percent = [participatingUsers.length, notParticipating]

    if (time.id === 1) {
        for(let subs of data.submissions) {
            let createdAt = new Date(subs.createdAt)
            
            if(q1 <= createdAt && createdAt <= q2) {
                q1Subs.push(subs)
            } else if (q2 <= createdAt && createdAt <= q3) {
                q2Subs.push(subs)
            } else if (q3 <= createdAt && createdAt <= q4) {
                q3Subs.push(subs)
            } else {
                q4Subs.push(subs)
            }
        }
        subs = [q1Subs.length, q2Subs.length, q3Subs.length, q4Subs.length]
    } else {
        subs = [data.submissions.length]
    }

    return { subs, percent }
}

class DepartmentReports extends Component {
    constructor() {
        super()
        this.state = { 
            departments: [],
            periodValue: "",
            departmentValue: "",
            submissions: [0,0,0,0],
            participation: [0,0],
            timePeriod: ["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"]
        }
    }

    onSubmissionsFetched = ({ subs, percent }) => {
        this.setState(() => ({ submissions: subs }))
        this.setState(() => ({ participation: percent }))
    }

    onTimePeriodChanged = (timePeriod) => {
        let time = []
        if (timePeriod.id === 1) {
            time = ["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"]
        } else {
            time = [timePeriod.label]
        }
        this.setState(() => ({ timePeriod: time }))
    }
        
    componentDidMount() {
        this.getDepartments()
    }
  
    getDepartments = async () => {
        const auth = new Authorization()
    
        try {
            const token = await auth.getToken()
            const departments = await getDepartments(token)

            this.setState({
                departments: departments,
            })
        } catch(err) {
            console.log(err)
        }
    }

    render() {
        const { supervisorAuth, leadAuth } = this.props
        const { periodValue, departmentValue, submissions, timePeriod, participation } = this.state
        const timePeriods = [
            {id: 1, label: "This Year"},
            {id: 2, label: "1st Quarter"},
            {id: 3, label: "2nd Quarter"},
            {id: 4, label: "3rd Quarter"},
            {id: 5, label: "4th Quarter"},
        ]

        const barData = {
            labels: timePeriod,
            datasets: [
                {
                    label: "Target Submissions",
                    backgroundColor: "rgba(68,180,255,0.2)",
                    borderColor: "rgba(68,180,255,1)",
                    borderWidth: 1,
                    hoverBackgroundColor: "rgba(68,180,255,0.4)",
                    hoverBorderColor: "rgba(68,180,255,1)",
                    data: [15, 15, 15, 15]
                },
                {
                    label: "Actual Submissions",
                    backgroundColor: "rgba(255,99,132,0.2)",
                    borderColor: "rgba(255,99,132,1)",
                    borderWidth: 1,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,1)",
                    data: submissions
                }
            ]
        }

        const doughnutData = {
            labels: [
                "Participating",
                "Not Participating"
            ],
            datasets: [{
                data: participation,
                backgroundColor: [
                    "rgba(68,180,255,1)",
                    "rgba(255,99,132,1)"                
                ],
                hoverBackgroundColor: [
                    "rgba(68,180,255,0.4)",
                    "rgba(255,99,132,0.4)" 
                ]
            }]
        }
        
        return (
            <ApolloConsumer>
                {client => (
                    <Main supervisor={supervisorAuth} lead={leadAuth}>
                        <Card>
                            <Form
                                onSubmit={async e => {
                                    e.preventDefault() 
                                    let submissions = await fetchData(client, departmentValue, periodValue)
                                    this.onSubmissionsFetched(submissions)
                                    this.onTimePeriodChanged(periodValue)
                                }}
                            >
                                <Select 
                                    options={this.state.departments}
                                    className="suggestionDropDown"
                                    value={departmentValue}
                                    placeholder="Choose A Department"
                                    size="small"
                                    plain={true}
                                    style={{ textAlign: "left" }}
                                    onChange={({ option }) => this.setState({ departmentValue: option })}
                                />
                                <Select 
                                    labelKey="label"
                                    valueKey="id"
                                    options={timePeriods}
                                    className="suggestionDropDown"
                                    value={periodValue}
                                    placeholder="Choose Time Period"
                                    size="small"
                                    plain={true}
                                    style={{ textAlign: "left" }}
                                    onChange={({ option }) => this.setState({ periodValue: option })}
                                />
                                <Button type="submit" className="updateSubmissionButton" label="Run Report" />
                            </Form>
                        </Card>

                        <Card title="Department Reports" highlight={true}>
                            <Bar 
                                data={barData} 
                                options={{
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true
                                            }
                                        }]
                                    }
                                }}
                            />
                            <div style={{ height: "50px" }}></div>
                            <Doughnut data={doughnutData} />
                        </Card>
                        <style jsx global>{`
                            button.updateSubmissionButton {
                                border: none;
                                font-size: 15px;
                                color: white;
                                background: #D0011B;
                                border-radius: 4px;
                                margin-left: 15px;
                                transition: background 0.3s ease-in-out;
                                will-change: background;
                            }
                            button.updateSubmissionButton:hover {
                                border: none;
                                box-shadow: none;
                                background: black;
                            }
                        `}</style>
                    </Main>
                )}
            </ApolloConsumer>
        )
    }
}

export default DepartmentReports