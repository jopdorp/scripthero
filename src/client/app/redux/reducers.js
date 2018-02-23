import {BOARD_LOADED} from "./actions";

const initialState = {
    cards: [],
    id: ""
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case BOARD_LOADED:
            return { ...state, cards: action.cards};
    }
    return state;
};

export default rootReducer;