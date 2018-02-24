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
        this.speak = this.speak.bind(this);
    }

    render() {
        const {id, isPrintView} = this.state;
        return <div className={this.props.isPrintView ? "script-hero print" : "script-hero"}>
            <div className='board-selection'>
                <p>Insert the second part of the board's url: <u>trello.com/b/<b>ttKuW0v3</b>/burn-it</u></p>
                <input placeholder="ttKuW0v3" value={id} onChange={this.onIdChange}/>
                <button onClick={this.onLoadClick}>Load</button>
            </div>
            <button className='print-view'
                    onClick={this.props.togglePrintView}>{this.props.isPrintView ? "edit" : "print view"}</button><br/>
            {this.props.isPrintView ?
                <button className='print-view' onClick={this.speak}>Speak</button>
                : ""}
            <Board/>
        </div>
    }

    onLoadClick(e) {
        this.props.loadBoard(this.state.id);
    }

    onIdChange(e) {
        this.setState({id: e.target.value});
    }

    speak(e) {
        const fullText = this.props.lists.reduce((result, list) => {
            return result + list.cards.map(card => {
                return card.name + ". " + card.desc +". "
            })
        }, "");

        const utterence = new SpeechSynthesisUtterance(fullText);
        utterence.rate = 0.7;
        utterence.pitch = 1;
        window.speechSynthesis.speak(utterence);
    }
}


const mapDispatchToProps = dispatch => {
    return {
        loadBoard: id => dispatch(loadBoard(id)),
        togglePrintView: () => {
            dispatch(togglePrintView())
        }
    };
};

const mapStateToProps = state => {
    return {isPrintView: state.isPrintView, lists: state.lists};
};

const AppWithDispatchConnection = connect(null, mapDispatchToProps)(ConnectedApp);
const App = connect(mapStateToProps)(AppWithDispatchConnection);

export default App;