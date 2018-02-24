export const SAVE_ALL = 'SAVE_ALL';
export const CANCEL_ALL = 'CANCEL_ALL';
export const SAVE_CARD = 'SAVE_CARD';
export const BOARDS_FETCHED = 'BOARDS_FETCHED';
export const BOARD_LOADED = 'BOARD_LOADED';
export const TOGGLE_PRINT_VIEW = 'TOGGLE_PRINT_VIEW';
export const CARD_EDITED = 'CARD_EDITED';

export function saveCard(card) {
    Trello.put("/cards/" + card.id, card);
    return {
        type: SAVE_CARD,
        card
    };
}

export function saveAll(){
    return {
        type: SAVE_ALL,
    };
}

export function cancelAll(){
    return {
        type: CANCEL_ALL,
    };
}

export function cardEdited(){
    return {
        type: CARD_EDITED,
    };
}

export function authorize() {
    return dispatch => {
        Trello.authorize({
            type: 'popup',
            name: 'Script Hero',
            scope: {
                read: 'true',
                write: 'true'
            },
            expiration: 'never',
            success: fetchBoards
        });

        function fetchBoards() {
            Trello.get('/members/me/boards', boards => {
                dispatch(boardsFetched(boards));
            });
        }
    }
}

export function boardsFetched(boards) {
    return {
        type: BOARDS_FETCHED,
        boards
    }
}

export function loadBoard(board) {
    return dispatch => {
        return Trello.get('/boards/' + board.id + '/cards', fetchLists);

        function fetchLists(cards) {
            Trello.get('/boards/' + board.id + '/lists', (lists) => {
                dispatch(boardLoaded(addCardsToLists({lists, cards})));
            });
        }

        function addCardsToLists({lists, cards}) {
            const listsById = lists.reduce((result, list) => {
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

export function togglePrintView() {
    return {
        type: TOGGLE_PRINT_VIEW
    }
}