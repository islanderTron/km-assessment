import React, { useEffect, useState, useRef } from 'react';

// Components
import Lines from './Lines';

// Redux
import { connect } from 'react-redux';
import { addNumber, addSecondNode, invalidNode, validEndNode } from '../redux/action';

function Circles({ firstNodesState, addNumber, addSecondNode, invalidNode, invalidNodeState, validEndNode }) {

  const [activeNodes, setActiveNodes] = useState({});
  const [nodes, setNodes] = useState({});
  const [lines, setLines] = useState({});
  const [index, setIndex] = useState(0);
  const [player, setPlayer] = useState('Player 1');
  const circlesMap = useRef();
  const apiUri = process.env.REACT_APP_API_PATH;

  /**
   * LIFECYCLE METHODS
   */
  useEffect(() => {
    // Check if this obj has both `start` & `end` to create a new line
    if (nodes.start && nodes.end) {
      setNodes({
        newLine: nodes
      });

      setLines(prevState => {
        return {
          ...prevState,
          [Object.keys(lines).length]: nodes
        }
      });

      validEndNode({
        newLine: nodes,
        player: player ? 'Player 2': 'Player 2'
      });
    }
    // console.log(player);
    getInitalize();
  }, [nodes, lines, validEndNode, player]);

  /** */

  function getInitalize() {
    fetch(`${apiUri}/initalize`)
      .then(res => res)
      .then(result => result)
  }

  function getNodeClicked(firstNode) {
    fetch(`${apiUri}/node_clicked/${firstNode}`, {
      method: 'POST',
      body: JSON.stringify(firstNode)
    })
      .then(res => res)
      .then(result => result);
  }

  /**
   * EVENT HANDLERS
   * 
   */

  function nodesHandler(start, end) {

    var result = [];
    var flag = true;

    Object.keys(start).forEach(key => {
      result.push(Math.abs(start[key] - end[key]));
    });

    if ((result[0] === 2 && result[0] !== result[1]) || (result[1] === 2 && result[1] !== result[0])) {
      // Check if both xs are the same
      if (start.x !== end.x && start.y !== end.y) {
        flag = false;
      }
    }
    else if (Math.abs(result[0] - result[1]) === 2) {
      flag = false;
    }

    return flag;
  }

  function handleCircleClick(node) {
    // Get the node's x & y value. 
    var x = node.target.attributes[0].value;
    var y = node.target.attributes[1].value;
    var temp = { x, y };
    var clickedNodes = node.target.style.backgroundColor = '#bfbfbf';

    // Check if there's no first node
    if (!nodes.newLine) {
      if (!nodes.start) {
        
        addNumber(temp);
        // getNodeClicked(temp) // <-- HTTP METHOD 
        setActiveNodes({
          ...activeNodes,
          0: temp
        });

        setNodes({
          ...nodes,
          start: temp
        });

        return clickedNodes;
      }

      // Check if there's first node is clicked
      else if (nodes.start) {
        var valid = 0;

        Object.keys(activeNodes[0]).forEach(key => {
          if (activeNodes[0][key] === temp[key]) {
            valid++;
          }
        });

        var nodeLogic = nodesHandler(activeNodes[0], temp);

        // Double check if both nodes have exact values otherwise, add them to `addSecondNode`
        if (valid === 2 || nodeLogic === false) {
          invalidNode({
            message: 'Not a valid starting position'
          });
        }

        else {
          if(Object.keys(activeNodes).length !== 2) {
            setActiveNodes({
              ...activeNodes,
              1: temp
            });
          } else {
            setActiveNodes({
              ...activeNodes,
              [index]: temp
            });
          }

          setNodes({
            ...nodes,
            end: temp
          });

          if(player === 'Player 1') {
            setPlayer('Player 2');
          } else {
            setPlayer('Player 1')
          }

          addSecondNode(temp);
          return clickedNodes;
        }
      }
    }

    // Check if there's both nodes are actived
    else if (nodes.newLine) {
      var valid = 0;
      var newNode = '';

      Object.keys(activeNodes).forEach((row, index) => {
        Object.keys(temp).forEach(column => {
          if (activeNodes[row][column] === temp[column]) {
            valid++;
            if (valid === 2) {
              setIndex(index);
              newNode = activeNodes[row];
            }
          }
        });
        valid = 0;
      });

      if (newNode) {
        // Need to check the start and end node before creating a new line
        setNodes({
          start: newNode
        });

        addNumber({ newNode });

        return clickedNodes; 
      } else {
        invalidNode({
          message: 'Not a valid starting position'
        });
        node.target.style.backgroundColor = '';
      }
    }
  }

  /**
   * RENDERS
   * 
   */

  function renderCircles() {
    // Create 16 cirlces
    var arr = [[0, 1, 2, 3,],
    [0, 1, 2, 3,],
    [0, 1, 2, 3,],
    [0, 1, 2, 3,]];

    var circles = arr.map((circles, x) => {
      return circles.map((circle, y) => {
        return <span
          onClick={e => handleCircleClick(e)}
          key={y}
          datax={y}
          datay={x}
          className='dot' />
      })
    });

    return circles;
  }

  function renderInvalidNode() {
    if (invalidNodeState) {
      if (invalidNodeState.msg === 'INVALID_START_NODE') {
        var message = invalidNodeState.body.message;

        return (
          <div style={{ textAlign: 'center' }}>Error message: {message}.</div>
        )
      }
    }
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Connect The Dots Game</h2>
      <div ref={circlesMap} className='wrapper'>
        <Lines nodes={nodes} lines={lines} circles={circlesMap}/>
        {renderCircles()}
      </div>
      <p style={{textAlign: 'center'}}>{player}</p>
      {renderInvalidNode()}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    firstNodesState: state.circles.body,
    invalidNodeState: state.circles
  }
}

const mapDispatchToProps = dispatch => ({
  addNumber: number => dispatch(addNumber(number)),
  addSecondNode: number => dispatch(addSecondNode(number)),
  invalidNode: error => dispatch(invalidNode(error)),
  validEndNode: line => dispatch(validEndNode(line)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Circles);