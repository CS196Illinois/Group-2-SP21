import RankCard from './RankCard'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react';

function RankPage() {

  // const [data, setData] = useState([]);
  const [data, setData] = useState([{"name": "Etherium", "hits": "79", "rank": "1"}, {"name": "Bitcoin", "hits": "65", "rank": "2"}, {"name": "Litecoin", "hits": "6", "rank": "3"}]);

  const getData = async () => {
    await axios.get('http://localhost:5000')
    .then(response => {
        const data = response.data.cryptos;
        setData(data);
      }
    )
  }

  useEffect(() => {
    getData();
  },[]);

  return <div className='rank-card'>
    {
      (data || []).map((card) => (
        <RankCard rank={card.rank} name={card.name} hits ={card.hits} key={card.rank}>
        </RankCard>
      ))
    }
  </div>;
}

export default RankPage;
