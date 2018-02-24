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
        return <div className={this.props.isPrintView ? "script-hero print" : "script-hero"}>
            <div className='header'>
                <div className='board-selection'>
                    <p>Insert the board's id: trello.com/b/<u><b>ttKuW0v3</b></u>/burn-it</p>
                    <input placeholder="ttKuW0v3" value={this.state.id} onChange={this.onIdChange}/>
                    <button onClick={this.onLoadClick}>Load</button>
                </div>
                <div>
                    <button className='print-view'
                            onClick={this.props.togglePrintView}>{this.props.isPrintView ? "edit" : "read"}</button>
                    <button className='print-view' onClick={this.speak}>speak</button>
                </div>
            </div>
            <Board/>
        </div>
        const {id, isPrintView} = this.state;
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
                return card.desc + ". "
            })
        }, "");

        const utterence = new SpeechSynthesisUtterance(fullText);
        var voices = window.speechSynthesis.getVoices();
        utterence.voice = voices[0];
        speechSynthesis.speak(utterence);
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