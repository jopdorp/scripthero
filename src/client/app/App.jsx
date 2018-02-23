import React from 'react';
import {connect} from "react-redux";
import Board from './Board.jsx';
import {loadBoard} from "./redux/actions";

class ConnectedApp extends React.Component {
    constructor() {
        super();

        this.state = {
            id: "ttKuW0v3"
        };

        this.onLoadClick = this.onLoadClick.bind(this)
        this.onIdChange = this.onIdChange.bind(this)
    }

    render() {
        const {id} = this.state;
        return <div>
            <div className='board-selection'>
                <p>The board id is the second part of the board's url like: https://trello.com/b/ttKuW0v3/burn-it</p>
                <input placeholder="ttKuW0v3" value={id} onChange={this.onIdChange}/>
                <button onClick={this.onLoadClick}>Load</button>
            </div>
            <Board/>
        </div>
    }

    onLoadClick(e) {
        this.props.loadBoard(this.state.id);
    }

    onIdChange(e) {
        this.setState({id: e.target.value});
    }
}


const mapDispatchToProps = dispatch => {
    return {
        loadBoard: id => dispatch(loadBoard(id))
    };
};

const App = connect(null, mapDispatchToProps)(ConnectedApp);
export default App;