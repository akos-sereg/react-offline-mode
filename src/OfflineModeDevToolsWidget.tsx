import * as React from "react";
import { getConsumedLocalStorageSize, getPersistedResponsesCount } from './index';

const OfflineModeDevToolsWidget = () => {
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
      <p>Cached responses: { (getConsumedLocalStorageSize() / 1024 / 1024).toFixed(2) } MB</p>
      <p>
        Count: { getPersistedResponsesCount() }
      </p>
      <p>
        Mode: Capturing
      </p>
    </div>
  );
}

export default OfflineModeDevToolsWidget;
