import React from 'react';
import Textarea from "react-textarea-autosize";
import {connect} from "react-redux";
import {saveCard, SAVE_ALL, CANCEL_ALL} from "./redux/actions";

class ConnectedCard extends React.Component {
    constructor(props) {
        super();
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = props;
        this.originalState = {...this.state};
        window.addEventListener(SAVE_ALL,this.onSaveClick);
        window.addEventListener(CANCEL_ALL,this.onCancelClick);
    }

    render() {
        const {name, desc} = this.state;
        return <li className={this.state.isEdited ? 'card edited' : 'card fade'}>
            {this.props.isPrintView ?
                <h3 className="name">{name}</h3>
                : <input className="name" value={name} onChange={this.onChange}/>
            }
            {this.props.isPrintView ?
                <div className="desc">{desc}</div>
                : <Textarea className="desc" value={desc} onChange={this.onChange}/>
            }
        </li>
    }

    onChange(e) {
        this.setState({[e.target.className]: e.target.value, isEdited: true});
    }

    onSaveClick() {
        const {name, desc, id} = this.state;
        this.props.saveCard({id, desc, name});
        this.setState({isEdited: false});
        this.originalState = {...this.state};
    }

    onCancelClick(e) {
        this.setState(this.originalState);
        this.setState({isEdited: false});
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveCard: card => dispatch(saveCard(card))
    };
};

const mapStateToProps = state => {
    return {isPrintView: state.isPrintView};
};

const CardWithDispatchConnection = connect(null, mapDispatchToProps)(ConnectedCard);
const Card = connect(mapStateToProps)(CardWithDispatchConnection);

export default Card;