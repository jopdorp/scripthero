import React from 'react';
import {connect} from "react-redux";
import List from './List.jsx';

const ConnectedBoard = ({lists}) => (
    <ul className="board">
        {lists.map(list => (
            <List key={list.id} {...list}></List>
        ))}
    </ul>
);

const mapStateToProps = state => {
    return {lists: state.lists};
};

const Board = connect(mapStateToProps)(ConnectedBoard);
export default Board;
