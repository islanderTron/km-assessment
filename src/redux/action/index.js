export const initalizeGame = text => ({
  type: 'INITALIZE_GAME',
  body: text
});

export const addNumber = firstNode => ({
  type: 'NODE_CLICKED',
  firstNode
});

export const addSecondNode = secondNode => ({
  type: 'SECOND_NODE',
  secondNode
});

export const invalidNode = invalideSecondNode => ({
  type: 'INVALID_START_NODE',
  invalideSecondNode
});

export const validEndNode = validEndNode => ({
  type: 'VALID_END_NODE',
  validEndNode
});