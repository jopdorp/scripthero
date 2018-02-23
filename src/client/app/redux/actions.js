export const SAVE_CARD = "SAVE_CARD";
export const BOARD_LOADED = "BOARD_LOADED";
export const LOAD_BOARD = "LOAD_BOARD";

export function saveCard(card) {
    window.Trello.put("/cards/" + card.id, card);
    return {
        type: SAVE_CARD,
        card
    };
}

export function loadBoard(id) {
    return dispatch => {
        return window.Trello.authorize({
            type: 'popup',
            name: 'Getting Started Application',
            scope: {
                read: 'true',
                write: 'true'
            },
            expiration: 'never',
            success: () => {
                Trello.get("/boards/" + id + "/cards", (cards) => {
                    dispatch(boardLoaded(cards));
                })
            }
        })
    }
}

export function boardLoaded(cards) {
    return {
        type: BOARD_LOADED,
        cards
    };
}