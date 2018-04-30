# jhs-vec

## Description

An immutable vector library

## Setup

```bash
npm install
npm run build
```

## Test

```bash
npm test
```

or to watch:

```bash
npm run test:w
```

## Usage

```js
import { Vector, add } from 'jhs-vec'
let result = add([1, 2, 3], Vector(4, 5, 6)) // => Vector(5, 7, 9)
console.log(result)
```
