import './App.css';
import RankCard from './components/RankCard'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  let sampledata = [
    {rank: 12, name: "Bitcoin", imageurl: 'https://images.theconversation.com/files/194266/original/file-20171113-27585-1gdvg8x.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=496&fit=clip'},
    {rank: 12, name: "Bitcoin", imageurl: 'https://images.theconversation.com/files/194266/original/file-20171113-27585-1gdvg8x.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=496&fit=clip'}
  ]

  const renderCard = (card, index) => {
    return (
      <div className='rank-card'>
          <RankCard rank={card.rank} name = {card.name} index = {index} imageurl = {card.imageurl}>
          </RankCard>
      </div>
    );
  };

  return <div className="rank-card">{sampledata.map(renderCard)}</div>;
}

export default App;
