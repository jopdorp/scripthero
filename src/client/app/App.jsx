import React from 'react';
import {connect} from "react-redux";
import Board from './Board.jsx';
import Menu from './Menu.jsx';
import {togglePrintView, saveAll, cancelAll, authorize, SAVE_ALL, CANCEL_ALL} from "./redux/actions";

class ConnectedApp extends React.Component {
    constructor() {
        super();

        this.state = {
            id: "ttKuW0v3"
        };

        this.onLoadClick = this.onLoadClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onIdChange = this.onIdChange.bind(this);
        this.speak = this.speak.bind(this);
    }

    render() {
        return <div className={this.props.isPrintView ? "script-hero print" : "script-hero"}>
            <div className='header fade'>
                <div className='board-selection'>
                    <button onClick={this.onLoadClick}>Select</button>
                    <button className={ this.props.hasChanges ? "save button-primary" : "save"}
                                onClick={this.onSaveClick}>save</button>
                    <button className="cancel" onClick={this.onCancelClick}>cancel</button>
                </div>
                <div>
                    <button className='print-view'
                            onClick={this.props.togglePrintView}>{this.props.isPrintView ? "edit" : "read"}</button>
                    <button className='print-view' onClick={this.speak}>speak</button>
                </div>
                <Menu/>
            </div>
            <Board/>
        </div>
    }

    onLoadClick(e) {
        this.props.authorize();
    }

    onSaveClick(){
        window.dispatchEvent(new Event(SAVE_ALL));
        this.props.saveAll();
    }

    onCancelClick(){
        window.dispatchEvent(new Event(CANCEL_ALL));
        this.props.cancelAll();
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
        const voices = window.speechSynthesis.getVoices();
        utterence.voice = voices[0];
        speechSynthesis.speak(utterence);
    }
}


const mapDispatchToProps = dispatch => {
    return {
        saveAll: () => {
            dispatch(saveAll())
        },
        cancelAll: () => {
            dispatch(cancelAll())
        },
        authorize: () => {
            dispatch(authorize())
        },
        togglePrintView: () => {
            dispatch(togglePrintView())
        }
    };
};

const mapStateToProps = state => {
    return {isPrintView: state.isPrintView, lists: state.lists, hasChanges: state.hasChanges};
};

const AppWithDispatchConnection = connect(null, mapDispatchToProps)(ConnectedApp);
const App = connect(mapStateToProps)(AppWithDispatchConnection);

export default App;