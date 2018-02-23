import React from 'react';
import Card from './Card.jsx';

class List extends React.Component {
    render() {
        return <li>
            <h2>{this.props.name}</h2>
            <ul className="list">
                {this.props.cards.map(card => (
                    <Card key={card.id} {...card}></Card>
                ))}
            </ul>
        </li>
    }
}

export default List;
