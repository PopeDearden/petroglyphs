import React from 'react';
import { Bar } from 'react-chartjs-2';
import Axios from 'axios';
import './Charts.scss'
export default class BarChart extends React.Component {
  constructor() {
    super()
    this.state = {
      labels: ['Egyptian', 'Mayan', 'Ojibwa', 'Aztec', 'Hopi', 'Modern'],
      datasets: [
        {
          label: 'Rainfall',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: []
        }
      ],
      meanings: [],
    }
  }
  componentDidMount() {
    Axios.get('/api/meanings') 
    .then(res=>{
    const Egyptian = res.data.filter((element)=>{
      return element.language ==="Egyptian"
    })
    const Mayan = res.data.filter((element)=>{
      return element.language ==="Mayan"
    })
    const Ojibwa = res.data.filter((element)=>{
      return element.language ==="Ojibwa"
    })
    const Aztec = res.data.filter((element)=>{
      return element.language ==="Aztec"
    })
    const Hopi = res.data.filter((element)=>{
      return element.language ==="Hopi"
    })
    this.setState({
      datasets:[
        {
          label: 'Symbol matches',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [Egyptian.length, Mayan.length, Ojibwa.length,Aztec.length, Hopi.length]
        }
      ]
    })
    console.log(this.state)
  })
  }

  


render() {
  return (
    <div class="Chart-Container">
      <Bar
        data={this.state}
        options={{
          title: {
            display: true,
            text: 'Language Matches',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
      />
    </div>
  );
}
}
