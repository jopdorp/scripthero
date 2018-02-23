import React from 'react';
import {connect} from "react-redux";
import Card from './Card.jsx';

const ConnectedBoard = ({cards}) => (
    <ul className="board">
        {cards.map(card => (
            <Card key={card.id} {...card}></Card>
        ))}
    </ul>
);

const mapStateToProps = state => {
    return {cards: state.cards};
};

const Board = connect(mapStateToProps)(ConnectedBoard);
export default Board;
