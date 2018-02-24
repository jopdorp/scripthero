import React from 'react';
import {connect} from "react-redux";
import List from './List.jsx';

class ConnectedBoard extends React.Component {
    render() {
        return <div>
            <ul className="board">
                {this.props.lists.map(list => (
                    <List key={list.id} {...list}></List>
                ))}
            </ul>
        </div>
    }
}

const mapStateToProps = state => {
    return {lists: state.lists};
};

const Board = connect(mapStateToProps)(ConnectedBoard);
export default Board;
