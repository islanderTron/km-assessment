/**
 * IMPORTANT TO READ THIS TO UNDERSTAND HOW TO WRITE PROPERLY BETWEEN REDUCER AND ACTION
 * https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
 */

const initalizeState = {
  x: '',
  y: ''
}

export default function addNumber(state = initalizeState, action)  {
  switch(action.type) {
    case 'NODE_CLICKED':
      return {
        msg: 'NODE_CLICKED',
        body: {
          x: action.firstNode.x,
          y: action.firstNode.y
        }
      }

    case 'SECOND_NODE':
      return {
        ...state,
        msg: 'VALID_START_NODE',
        body: {
          x: action.secondNode.x,
          y: action.secondNode.y
        }
      }
    case 'INVALID_START_NODE':
      return {
        msg: 'INVALID_START_NODE',
        body: {
          newLine: null,
          message: action.invalideSecondNode.message
        }
      }

    case 'VALID_END_NODE': 
      return {
        ...state,
        msg: 'VALID_END_NODE',
        body: action.validEndNode,
        message: null
      }

    case 'INVALID_END_NODE':
      return {
        ...state,
      }

    default:
      return state
  }
}