import React from 'react';
import {connect} from "react-redux";
import {loadBoard} from './redux/actions'

class ConnectedMenu extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div className='menu'>
            <ul className='boards'>
                {this.props.boards && this.props.boards.map(board => {
                    const style = board.prefs.backgroundImageScaled ?
                        {backgroundImage: "url("+board.prefs.backgroundImageScaled[1].url+")"}
                        : {};
                    return <li className='fade' style={style}
                        onClick={_ => {
                            this.props.loadBoard(board)
                        }}>{board.name}</li>
                })}
            </ul>
        </div>
    }
}

const mapStateToProps = state => {
    return {boards: state.boards};
};

const mapDispatchToProps = dispatch => {
    return {
        loadBoard: board => dispatch(loadBoard(board))
    };
};

const MenuWithDispatchConnection = connect(null, mapDispatchToProps)(ConnectedMenu);
const Menu = connect(mapStateToProps)(MenuWithDispatchConnection);

export default Menu;