import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import './RankCard.css'

const RankCard = (props) => {
    return (
        <Card style={{ width: '30rem' }} key={props.index} className='card' >
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    Rank: {props.rank}
                </Card.Text>
                <Card.Text>
                    Hits: {props.hits}
                </Card.Text>
            <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default RankCard