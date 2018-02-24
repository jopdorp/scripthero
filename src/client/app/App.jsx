import React from 'react';
import {connect} from "react-redux";
import Board from './Board.jsx';
import {loadBoard, togglePrintView} from "./redux/actions";

class ConnectedApp extends React.Component {
    constructor() {
        super();

        this.state = {
            id: "ttKuW0v3"
        };

        this.onLoadClick = this.onLoadClick.bind(this);
        this.onIdChange = this.onIdChange.bind(this);
    }

    render() {
        const {id, isPrintView} = this.state;
        return <div className={this.props.isPrintView ? "script-hero print" : "script-hero"}>
            <div className='board-selection'>
                <a href='ScriptHero-win.exe'>Download for windows</a><br/>
                <a href='ScriptHero-macos'>Download for mac</a>
                <a href='ScriptHero-linux'>Download for linux</a>
                <p>The board id is the second part of the board's url like: https://trello.com/b/ttKuW0v3/burn-it</p>
                <input placeholder="ttKuW0v3" value={id} onChange={this.onIdChange}/>
                <button onClick={this.onLoadClick}>Load</button>
            </div>
            <button className='print-view' onClick={this.props.togglePrintView}>{this.props.isPrintView ? "edit" : "print view"}</button>
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
        loadBoard: id => dispatch(loadBoard(id)),
        togglePrintView: ()=>{
            dispatch(togglePrintView())
        }
    };
};

const mapStateToProps = state => {
    return {isPrintView: state.isPrintView};
};

const AppWithDispatchConnection = connect(null, mapDispatchToProps)(ConnectedApp);
const App = connect(mapStateToProps)(AppWithDispatchConnection);

export default App;