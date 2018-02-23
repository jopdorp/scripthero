export const SAVE_CARD = "SAVE_CARD";
export const BOARD_LOADED = "BOARD_LOADED";
export const LOAD_BOARD = "LOAD_BOARD";

export function saveCard(card) {
    Trello.put("/cards/" + card.id, card);
    return {
        type: SAVE_CARD,
        card
    };
}

export function loadBoard(id) {
    return dispatch => {
        return Trello.authorize({
            type: 'popup',
            name: 'Getting Started Application',
            scope: {
                read: 'true',
                write: 'true'
            },
            expiration: 'never',
            success: () => {
                Trello.get("/boards/" + id + "/cards", (cards) => {
                    Trello.get("/boards/" + id + "/lists", (lists) => {
                        const listsById = lists.reduce((result, list) => {
                            return {...result, [list.id]: {...list, cards: []}}
                        }, {});

                        const listsWithCards = cards.reduce((result, card) => {
                            return {
                                ...result,
                                [card.idList]: {
                                    cards: [...result[card.idList].cards, card],
                                    name: listsById[card.idList].name
                                }
                            }
                        }, listsById);
                        dispatch(boardLoaded(listsWithCards));
                    });
                });
            }
        })
    }
}

export function boardLoaded(lists) {
    return {
        type: BOARD_LOADED,
        lists
    }
}