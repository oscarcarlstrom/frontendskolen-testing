# frontendskolen-testing

Eksempler på hvordan sette opp testing og skrive forskjellige type tester

## Komme i gang

Kjør først `npm ci`

For å starte dev server, kjør `npm start`

For å kjøre tester, kjør `npm t` eller `npm test`

## Hvordan ble Jest og testing-library satt opp?

1. `npm i jest -D`
2. `npm install --save-dev @babel/plugin-transform-modules-commonjs` - dette er fordi Vite bruker ES modules, og jest CommonJS
3. La til [.babelrc](.babelrc), og følgende config:

```
{
  plugins": ["@babel/plugin-transform-modules-commonjs"]
}
```

4. `"test": "jest"` ble lagt til i [package.json](package.json)
5. `npm i @testing-library/react @testing-library/jest-dom -D`
6. `npm i @babel/preset-react -D`
7. Oppdaterte [.babelrc](.babelrc):

```
{
	"plugins": ["@babel/plugin-transform-modules-commonjs"],
	"presets": ["@babel/preset-react"]
}
```

8. `npm i jest-environment-jsdom -D`
9. La til [jest.config.json](jest.config.json), og følgende config:

```
{
	"testEnvironment": "jsdom"
}
```

<!-- prettier-ignore -->
10. Opprettet filen [__tests__/__mocks__/styleMock.js](__tests__/__mocks__/styleMock.js)
11. Oppdaterte [jest.config.json](jest.config.json) på nytt for å mocke ut css for å kunne kjøre integrasjonstester [src/App.jsx](src/App.jsx) importerer [src/App.css](src/App.css):

```
{
	"testEnvironment": "jsdom",
	"moduleNameMapper": {
		"\\.(css)$": "<rootDir>/__tests__/__mocks__/styleMock.js"
	},
	"testPathIgnorePatterns": ["/node_modules/", "__mocks__"]
}
```
