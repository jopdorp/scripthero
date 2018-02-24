import {BOARD_LOADED, BOARDS_FETCHED, TOGGLE_PRINT_VIEW} from "./actions";

const initialState = {
    lists: [],
    id: ""
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case BOARD_LOADED:
            return {
                lists: Object.keys(action.lists).map(listId => {
                    return action.lists[listId]
                }).sort((a, b) => {
                    return a.pos - b.pos;
                })
            };
        case TOGGLE_PRINT_VIEW:
            return {...state, isPrintView: !state.isPrintView};
        case BOARDS_FETCHED:
            return {...state, boards: action.boards};
    }
    return state;
};

export default rootReducer;