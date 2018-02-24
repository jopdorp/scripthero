import React from 'react';
import Textarea from "react-textarea-autosize";
import {connect} from "react-redux";
import {saveCard} from "./redux/actions";

class ConnectedCard extends React.Component {
    constructor(props) {
        super();
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = props;
    }

    render() {
        const {name, desc} = this.state;
        return <li className={this.state.isEdited ? 'card edited' : 'card'}>
            <input className="name" value={name} onChange={this.onChange}/>
            <Textarea className="desc" value={desc} onChange={this.onChange}></Textarea>
            <div className="title-and-buttons">
                <button className="save" onClick={this.onSaveClick}>save</button>
            </div>
        </li>
    }

    onChange(e) {
        this.setState({[e.target.className]: e.target.value, isEdited: true});
    }

    onSaveClick(e) {
        const {name, desc, id} = this.state;
        this.props.saveCard({id: this.state.id, desc: this.state.desc, name: this.state.name})
        this.setState({isEdited: false});
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveCard: card => dispatch(saveCard(card))
    };
};


const Card = connect(null, mapDispatchToProps)(ConnectedCard);
export default Card;