import * as React from "react";
import { getConsumedLocalStorageSize, getPersistedResponsesCount } from './index';
import { useState } from "react";

const OfflineModeDevToolsWidget = () => {

  const [mode, setMode] = useState(0);

  // @ts-ignore
  const handleModeSelection = (event, mode) => {
      event.preventDefault();
      setMode(mode);
      return true;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      background: 'rgba(50, 117, 168)',
      color: '#fafafa',
      borderRadius: '5px',
      boxShadow: '2px 2px 5px 1px rgba(0,0,0,0.35)',
      padding: '12px',
      width: '240px',
      fontSize: '9pt'
    }}>
      <span>{ getPersistedResponsesCount() } api calls captured ({ (getConsumedLocalStorageSize() / 1024 / 1024).toFixed(2) } MB)</span>
      <div>
        <br/>
        mode:&nbsp;
        <a href="#" onClick={(event) => handleModeSelection(event,0)} style={{ fontSize: '9pt', color: '#cccccc', textDecoration: mode === 0 ? 'none' : 'underline' }}>off</a>&nbsp;|&nbsp;
        <a href="#" onClick={(event) => handleModeSelection(event,1)} style={{ fontSize: '9pt', color: '#cccccc', textDecoration: mode === 1 ? 'none' : 'underline' }}>capturing</a>&nbsp;|&nbsp;
        <a href="#" onClick={(event) => handleModeSelection(event,2)} style={{ fontSize: '9pt', color: '#cccccc', textDecoration: mode === 2 ? 'none' : 'underline' }}>serving</a>
      </div>
    </div>
  );
}

export default OfflineModeDevToolsWidget;
