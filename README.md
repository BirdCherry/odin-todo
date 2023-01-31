Odin To-Do
===

Personal notes on how I made this (so I can revisit later if needed)

Setup
---
`cd [repo folder]`

`npm init -y`

`npm install --save-dev webpack webpack-cli style-loader css-loader html-webpack-plugin webpack-dev-server`

## Quick explanations

### style-loader css-loader

Load .css files

Setup `webpack.config.js`:
```
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
    ],
  },
```


### html-webpack-plugin

Generate .html file

Setup `webpack.config.js`:

```
const HtmlWebpackPlugin = require('html-webpack-plugin');
```
```
  plugins: [
  new HtmlWebpackPlugin({
    title: 'Odin To-Do',
    template: './src/index.html',
  }),
],
```

### webpack-dev-server

Run a development server that proves live reloading

Setup `webpack.config.js`:

```
devServer: {
    static: {
    directory: path.join(__dirname, 'dist'),
    },
  },
```

### Setup dev environment (remember to remove these for production)
Setup `webpack.config.js`:
```
mode: 'development',
```
```
devtool: 'inline-source-map',
```

### Define css file for custom web component with webpack
https://webpack.js.org/loaders/style-loader/#custom-elements-shadow-dom




## Problems I had

### Error "Multiple chunks emit assets to the same filename"

Change `webpack.config.js`
```
  output: {
    filename: 'main.js',
```
to
```
  output: {
    filename: '[name].js',
```

### webpack-dev-server not live reloading

On terminal, run `npm start`. This starts the server.
On another terminal session, run `npm run watch`. Now, when you make changes and save, it will compile automatically and the dev server will show changes automatically. 

Or, you can change `webpack.config.js` to:
```
devServer: {
    static: {
    directory: path.join(__dirname, 'src'),
    },
  },
```
Then I think devServer will look for changes in ./src folder and build from there, but it won't write anything to ./dist folder. You have to do `npm run build` separately.