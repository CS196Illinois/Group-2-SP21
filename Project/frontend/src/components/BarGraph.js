import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'
import axios from 'axios'

const BarGraph = () => {

    const [data, setData] = useState([]);

    const getData = async () => {
        await axios.get('http://localhost:5000')
        .then(response => {
            console.log(response);
    
            let data = response.data.cryptos;
    
            console.log(data);
            console.log('Keys ', Object.keys(data));
            console.log('Values ', Object.values(data));
    
            setData(data);
          }
        )
    }

    useEffect(() => {
        getData();
    },[]);

    return <div>
        <Bar
            data={{
                labels: data.map(item => item.name),
                datasets: [
                    {
                        label: 'hits',
                        data: data.map(item => item.hits),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            }}
            height={400}
            width={600}
            options={
                {
                    maintainAspectRatio: false
                }
            }
        />
    </div>
}

export default BarGraph;