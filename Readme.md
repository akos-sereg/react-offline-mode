# react-offline-mode

## Install and add to your project

1. git clone this repository
2. wherever you are using axios, use the axios-spy

```
// instead of this
import axios from 'axios';

// use this
import axios from '<react-offline-mode>/src/axios-spy'
```

3. Render OfflineModeDevToolsWidget component somewhere in your app (preferably close to the root of the component
   hierarchy). Make sure that you are not rendering the component on production environment.

```
<OfflineModeDevToolsWidget quotaInMb={ 5 } />
```

## Design consideration

- this package has minimal dependencies, so it relies on the packages of your project - this is helpful to avoid
package version conflicts
