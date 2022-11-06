import { useState, useCallback } from 'react';

function App({ data, schema }) {
  const attrs = ['none', ...Object.keys(schema)];
  const [ xaxis, setXaxis ] = useState('none');
  const [ yaxis, setYaxis ] = useState('none');
  const handleXaxis = (event) => setXaxis(event.target.value);
  const handleYaxis = (event) => setYaxis(event.target.value);
  return (
    <div>
      <div className="grid grid-cols-2 p-5 gap-5">
        <div className="p-5 border-2 rounded" onChange={handleXaxis}>
          <div className="font-bold">X Axis</div>
          <div className="grid grid-cols-3">
            {attrs.map(attr => (
              <div key={`xaxis-${attr}`}>
                <input type="radio" name="xaxis" id={`xaxis-${attr}`} value={attr} checked={xaxis === attr} />
                <label htmlFor={`xaxis-${attr}`}>{attr}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="p-5 border-2 rounded" onChange={handleYaxis}>
          <div className="font-bold">Y Axis</div>
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
      { xaxis === 'none' || yaxis === 'none' || (
          <div className={`grid grid-cols-${schema[xaxis].length} p-5 gap-5`}>
            {schema[yaxis].map(row => (
              <>
                {schema[xaxis].map(col => (
                  <div>
                    <div className="text-xs">
                      {`${row}/${col}`}
                    </div>
                    <div>
                      {data.filter(item => item[xaxis] === col && item[yaxis] === row).map(item => (
                        <img className="inline" src={item.image} width="20" height="20" loading="lazy" />
                      ))}
                    </div>
                  </div>
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
