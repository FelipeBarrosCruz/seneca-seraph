# SenecaSeraph
Seneca plugin for [Seraph Library](https://github.com/brikteknologier/seraph) to connect a Neo4j Database.

## Install

```
npm install seneca-seraph
```

## Options
  See plugin options [here](https://github.com/brikteknologier/seraph#seraph)

## Plugin Interface

```javascript
seneca.seraph
```
 - Methods and properties list [here](https://github.com/brikteknologier/seraph#documentation)

## Quick Example

```javascript
const Seneca = require('Seneca')
const SenecaSeraphPlugin = require('seneca-seraph')

const seneca = Seneca()
  .use(SenecaSeraphPlugin, {
    pass: '1q2w3e4r'
  }).ready((err) => {
    if (err) throw err
    seneca.seraph.query('MATCH (n) RETURN n;', (err, result) => {
      if (err) throw err
      console.log('Seraph result', result)
    })
  })
```
