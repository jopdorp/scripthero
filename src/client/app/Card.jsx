import React from 'react';
import { connect } from "react-redux";
import {saveCard } from "./redux/actions";

class ConnectedCard extends React.Component {
    constructor(props) {
        super();
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = props;
    }

    render() {
        const {name, desc} = this.state;
        return <li className="card">
            <textarea className="name" value={name} onChange={this.onChange}></textarea>
            <textarea className="desc" value={desc} onChange={this.onChange}></textarea>
            <div>
                <button onClick={this.onSaveClick}>save</button>
            </div>
        </li>
    }

    onChange(e){
        this.setState({[e.target.className] : e.target.value});
    }

    onSaveClick (e) {
        const {name, desc, id} = this.state;
        this.props.saveCard({id: this.state.id, desc:this.state.desc, name:this.state.name});
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveCard: card => dispatch(saveCard(card))
    };
};


const Card = connect(null, mapDispatchToProps)(ConnectedCard);
export default Card;