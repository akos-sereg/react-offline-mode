# react-offline-mode

## Install and add to your project

1. git clone this repository
2. wherever you are using axios, use the wrapper

```
// instead of this
const response = await axios.get('/path/to/your/api')

// use this
const response = await wrapper(axios).get('/path/to/your/api')
```

3. add OfflineModeDevToolsWidget to your App.tsx/App.jsx

## Design consideration

- this package has minimal dependencies, so it relies on the packages of your project - this is helpful to avoid
package version conflicts