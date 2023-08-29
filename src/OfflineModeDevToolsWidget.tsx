import * as React from "react";
import { getConsumedLocalStorageSize, getMode, getPersistedResponsesCount } from './index';
import { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY_STATE, mode_off, mode_capturing, mode_capturing_and_serving } from "./constants";

const OfflineModeDevToolsWidget = () => {

  const [mode, setMode] = useState(getMode());

  // @ts-ignore
  const handleModeSelection = (event, mode) => {
      event.preventDefault();
      setMode(mode);
      localStorage.setItem(LOCAL_STORAGE_KEY_STATE, mode);
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
        <a href="#" onClick={(event) => handleModeSelection(event, mode_off)} style={{ fontSize: '9pt', color: '#cccccc', textDecoration: mode === mode_off ? 'none' : 'underline' }}>off</a>&nbsp;|&nbsp;
        <a href="#" onClick={(event) => handleModeSelection(event, mode_capturing)} style={{ fontSize: '9pt', color: '#cccccc', textDecoration: mode === mode_capturing ? 'none' : 'underline' }}>capturing</a>&nbsp;|&nbsp;
        <a href="#" onClick={(event) => handleModeSelection(event, mode_capturing_and_serving)} style={{ fontSize: '9pt', color: '#cccccc', textDecoration: mode === mode_capturing_and_serving ? 'none' : 'underline' }}>serving</a>
      </div>
    </div>
  );
}

export default OfflineModeDevToolsWidget;
