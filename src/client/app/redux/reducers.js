import {BOARD_LOADED} from "./actions";

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
    }
    return state;
};

export default rootReducer;