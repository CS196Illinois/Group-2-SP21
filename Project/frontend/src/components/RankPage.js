import RankCard from './RankCard'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react';

function RankPage() {

  const [data, setData] = useState([]);

  const getData = async () => {
    await axios.get('http://localhost:5000')
    .then(response => {
        console.log(response);

        let data = response.data.cryptos;

        console.log(data);

        setData(data);
      }
    )
  }

  useEffect(() => {
    getData();
  },[]);

  const renderCard = (card, index) => {
    return (
      <div className='rank-card'>
          <RankCard rank={card.rank} name = {card.name} index = {index} hits = {card.hits} key = {card.rank}>
          </RankCard>
      </div>
    );
  };

  
  console.log(data);
  return <div className="rank-card">{data.map(renderCard)}</div>;
}

export default RankPage;
