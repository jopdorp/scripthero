export const SAVE_CARD = 'SAVE_CARD';
export const BOARD_LOADED = 'BOARD_LOADED';
export const TOGGLE_PRINT_VIEW = 'TOGGLE_PRINT_VIEW';

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
            success: fetchListsWithCards
        });

        function fetchListsWithCards(){
            Trello.get('/boards/' + id + '/cards', fetchLists);
        }

        function fetchLists(cards) {
            Trello.get('/boards/' + id + '/lists', (lists) => {
                dispatch(boardLoaded(addCardsToLists({lists, cards})));
            });
        }

        function addCardsToLists({lists, cards}) {
            const listsById  = lists.reduce((result, list) => {
                return {...result, [list.id]: {...list, cards: []}}
            }, {});

            const addCardsToListsById = (result, card) => {
                return {
                    ...result,
                    [card.idList]: {
                        cards: [...result[card.idList].cards, card],
                        name: listsById[card.idList].name
                    }
                }
            };

            return cards.reduce(addCardsToListsById, listsById);
        }
    }
}

export function boardLoaded(lists) {
    return {
        type: BOARD_LOADED,
        lists
    }
}

export function togglePrintView(){
    return {
        type: TOGGLE_PRINT_VIEW
    }
}