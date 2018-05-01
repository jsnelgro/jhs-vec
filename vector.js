export class Vec extends Array {
  constructor(x, y, z, ...rest) {
    super()
    if (Array.isArray(x)) {
      var [x, y, z, ...rest] = x
    }
    if (x !== undefined) this[0] = this.x = x
    if (y !== undefined) this[1] = this.y = y
    if (z !== undefined) this[2] = this.z = z
    rest.forEach((v) => (v !== undefined ? this.push(v) : null))
    // BUG: get and set syntax aren't being transpiled correctly
    // need to use this approach instead
    Object.defineProperties(this, {
      x: {
        get: () => this[0] || 0,
        set: (v) => (this[0] = v),
      },
      y: {
        get: () => this[1] || 0,
        set: (v) => (this[1] = v),
      },
      z: {
        get: () => this[2] || 0,
        set: (v) => (this[2] = v),
      },
    })
  }

  map = (fn, thisArg = this) => {
    return new Vec(super.map(fn, thisArg))
  }

  filter = (fn, thisArg = this) => {
    let filterRes = super.map((el) => fn(el), thisArg).map((el, i) => (el ? this[i] : 0))
    return new Vec(filterRes)
  }

  reduce = (...args) => {
    let res = super.reduce(...args)
    return Array.isArray(res) ? new Vec(res) : res
  }

  toArray = () => {
    return [...this]
  }
}

export const Vector = (...dimensions) => {
  return new Vec(...dimensions)
}

export const create = Vector

const argsOrArray = (...vecs) => {
  let res = vecs.length === 1 && Array.isArray(vecs[0]) ? vecs[0] : vecs

  // TODO: THIS MUST BE WHY WE NEED TYPESCRIPT
  // if (typeof res[0] === 'number') {
  //   res = [res]
  // }
  return res
}

export const add = (...vecs) => {
  vecs = argsOrArray(...vecs)
  let scalars = 0
  while (typeof vecs[vecs.length - 1] === 'number') {
    scalars += vecs.pop()
  }
  if (vecs.length === 0) {
    return scalars
  }
  let res = vecs.reduceRight((acc, v) => {
    if (typeof v === 'number') {
      scalars += v
      return acc
    }
    if (acc.length !== v.length) {
      throw 'Vectors must be equal length or a scalar'
    }
    return Vector(acc.map((d, i) => d + (v[i] === undefined ? 1 : v[i])))
  })
  return typeof res === 'number' ? res : Vector(res.map((d) => d + scalars))
}

export const sub = (...vecs) => {
  vecs = argsOrArray(...vecs)
  if (typeof vecs[0] === 'number') {
    throw 'Cannot subtract a vector from a scalar'
  }
  return vecs.reduce((acc, v) => {
    if (typeof v === 'number') {
      return Vector(acc.map((d) => d - v))
    }
    return Vector(acc.map((d, i) => d - v[i]))
  })
}

export const mult = (...vecs) => {
  vecs = argsOrArray(...vecs)
  let scalars = 1
  while (typeof vecs[vecs.length - 1] === 'number') {
    scalars *= vecs.pop()
  }
  if (vecs.length === 0) {
    return scalars
  }
  let res = vecs.reduceRight((acc, v) => {
    if (typeof v === 'number') {
      scalars *= v
      return acc
    }
    if (acc.length !== v.length) {
      throw 'Vectors must be equal length or a scalar'
    }
    return Vector(acc.map((d, i) => d * (v[i] === undefined ? 1 : v[i])))
  })
  return typeof res === 'number' ? res : Vector(res.map((d) => d * scalars))
}

export const div = (...vecs) => {
  vecs = argsOrArray(...vecs)
  if (typeof vecs[0] === 'number') {
    throw 'Cannot divide a scalar by a vector'
  }
  return vecs.reduce((acc, v) => {
    if (typeof v === 'number') {
      return Vector(acc.map((d) => d / v))
    }
    return Vector(acc.map((d, i) => d / v[i]))
  })
}

export const sum = (...vecs) => {
  return add(vecs).reduce((acc, d) => acc + d)
}

export const mag = (vec) => {
  let z = vec.z ** 2 || 0
  return Math.sqrt(sum(vec))
  return Math.sqrt(vec.x ** 2 + vec.y ** 2 + z)
}

export const magnitude = mag

export const norm = (vec) => {
  return mag(vec) > 0 ? div(vec, mag(vec)) : vec
}

export const centroid = (...vecs) => {
  return div(add(...vecs), vecs.length)
}

const _clamp = (val, lo, hi) => (val < lo ? lo : val > hi ? hi : val)
export const clamp = (vec, ...ranges) => {
  ranges = ranges.length === 0 ? [[-1, 1]] : ranges
  return create(vec).map((d, i) => {
    if (ranges[i]) {
      return _clamp(d, ...ranges[i])
    } else {
      return _clamp(d, ...ranges[ranges.length - 1])
    }
  })
}

const zip = (...rows) => [...rows[0]].map((_, c) => rows.map((row) => row[c]))
export const distance = (vec1, vec2) => {
  return Math.sqrt(
    zip(vec2Array(vec2), vec2Array(vec1))
      .map(([d1, d2]) => (d1 - d2) ** 2)
      .reduce((acc, x) => acc + x)
  )
}

export const array2Vec = (arr) => Vector(...arr)
export const a2v = array2Vec

export const vec2Array = (vec) => {
  return [vec.x, vec.y, vec.z ? vec.z : 0]
}
export const v2a = vec2Array
