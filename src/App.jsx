import { useState, useCallback } from 'react';

function App({ data, schema }) {
  const attrs = ['none', ...Object.keys(schema)];
  const [ xaxis, setXaxis ] = useState('none');
  const [ yaxis, setYaxis ] = useState('none');
  const handleXaxis = (event) => setXaxis(event.target.value);
  const handleYaxis = (event) => setYaxis(event.target.value);
  return (
    <div>
      <div className="grid grid-cols-2">
        <div onChange={handleXaxis}>
          X Axis
          <div className="grid grid-cols-3">
            {attrs.map(attr => (
              <div key={`xaxis-${attr}`}>
                <input type="radio" name="xaxis" id={`xaxis-${attr}`} value={attr} checked={xaxis === attr} />
                <label htmlFor={`xaxis-${attr}`}>{attr}</label>
              </div>
            ))}
          </div>
        </div>
        <div onChange={handleYaxis}>
          Y Axis
          <div className="grid grid-cols-3">
            {attrs.map(attr => (
              <div key={`yaxis-${attr}`}>
                <input type="radio" name="yaxis" id={`yaxis-${attr}`} value={attr} checked={yaxis === attr} />
                <label htmlFor={`yaxis-${attr}`}>{attr}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      { xaxis === 'none' || (
          <div className={`grid grid-cols-${schema[xaxis].length + 1}`}>
            <div></div>
            {schema[xaxis].map(col => (
              <div>{col}</div>
            ))
            }
            { yaxis === 'none' || schema[yaxis].map(row => (
              <>
                <div>{row}</div>
                {schema[xaxis].map(col => (
                  <div>{data.filter(item => item[xaxis] === col && item[yaxis] === row).map(item => (
                    <img className="inline" src={item.image} width="20" height="20" loading="lazy" />
                  ))}</div>
                ))
                }
              </>
              ))}
          </div>
        )}
    </div>
  );
}

export default App;
