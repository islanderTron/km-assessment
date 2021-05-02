import React, { useEffect, useState } from 'react';

export default function Lines(props) {
  const DEFAULT_X = 15;
  const DEFAULT_Y = 15;

  var x1, y1, x2, y2;

  const [lines, setLines] = useState();
  const temp = [];

  useEffect(() => {
    if (Object.keys(props.lines).length > 0) {
      setLines(props.lines);
    }

    clearCircleMap();
  }, [props.lines, temp])

  const style = {
    position: "absolute",
    zIndex: '-111',
    width: '265px',
    height: '265px',
    marginLeft: '25px',
    marginTop: '25px'
  }

  /**
   * HANDLER METHODS
   * 
   */
  // Check if this object has both first  and second nodes. 
  function handerLines() {
    if (lines) {
      return Object.keys(lines).forEach(key => {
        var row = lines[key];
        var start = lines[key].start;
        var end = lines[key].end;

        if (start) {
          // For now we focus on the horiztonal and vertical first. 
          if (start.x === '0' && start.y === '0') {
            x1 = DEFAULT_X;
            y1 = DEFAULT_Y;
          }

          else if (start.y !== '0') {
            x1 = (parseInt(start.x) * 80) + DEFAULT_X;
            y1 = (parseInt(start.y) * 72) + (DEFAULT_Y * parseInt(start.y));
          }

          // For some reason, second and fourth row in ys are showing off the corridation. 
          else {
            x1 = (parseInt(start.x) * 80) + DEFAULT_X;
            y1 = (parseInt(start.y) * 72) + DEFAULT_Y;
          }
        }

        if (end) {
          if (end.x === '0' && end.y === '0') {
            x2 = DEFAULT_X;
            y2 = DEFAULT_Y;
          }
          else if (end.y !== '0') {
            x2 = parseInt(end.x) * 80 + DEFAULT_X;
            y2 = (parseInt(end.y) * 72) + (DEFAULT_Y * parseInt(end.y));
          }
          else {
            x2 = parseInt(end.x) * 80 + DEFAULT_X;
            y2 = (parseInt(end.y) * 72) + DEFAULT_Y;
          }
        }
        return temp.push([x1, y1, x2, y2]);
        // temp.push(<line x1={x1} y1={y1} x2={x2} y2={y2} />) // DON'T TOUCH THIS!
      });

    }
    // setTest(prevState => [prevState, x1])
  }

/**
 * RENDER METHODS
 * 
 */

  function clearCircleMap() {
    var circlesMap = props.circles
    var valid = 0;
    var tempActiveNodes = [];
    
    if(circlesMap.current && valid === 0) {
      Object.keys(circlesMap.current.childNodes).forEach(key => {
        if(circlesMap.current.childNodes[key].style.backgroundColor !== '') {
          valid++;
          tempActiveNodes.push(circlesMap.current.childNodes[key]);
        }
      });

      if(valid === 2) {
        return Object.keys(tempActiveNodes).forEach(key => {
          return tempActiveNodes[key].style.backgroundColor = ''
        })
      }
    }
  }

  function renderLines() {
    handerLines();
    if(temp) {
      return temp.map((x, index) => {
        return <line key={index} x1={x[0]} y1={x[1]} x2={x[2]} y2={x[3]} />
      });
    }

  }

  return (
    <svg style={style}>
      <g strokeWidth='6' stroke='grey'>
        {renderLines()}
      </g>
    </svg>
  )
}