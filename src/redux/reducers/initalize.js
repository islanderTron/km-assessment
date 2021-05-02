const playerTurn = {
  player: 'Player 1'
}

export default function initialize(state = playerTurn, action) {

  switch(action.type) {
    case 'INITALIZE':
      return {
        ...state,
        msg: 'INITALIZE_GAME',
        body: action
      }
      
    default: 
      return state;
  }
}