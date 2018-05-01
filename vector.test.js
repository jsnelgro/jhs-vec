import * as veclib from './vector.js'

describe('Vector class', () => {
  const { Vec } = veclib

  test('vector should have x, y, and z properties', () => {
    let v = new Vec(1, 2, 3)
    expect(v).toHaveProperty('x')
    expect(v).toHaveProperty('y')
    expect(v).toHaveProperty('z')
  })

  test('x, y, z should proxy array indices 0, 1, 2', () => {
    let v = new Vec(4, 5, 6)
    expect(v.x === v[0] && v.y === v[1] && v.z === v[2]).toBe(true)
  })

  test('vectors with more or less than 3 dimensions work exactly the same', () => {
    let vLong = new Vec(1, 2, 3, 4, 5, 6)
    let vShort = new Vec(1)
    expect(vLong).toHaveLength(6)
    expect(vShort).toHaveLength(1)
  })

  test('mutating x, y, or z should update index and vise versa', () => {
    let v = new Vec(4, 5, 6)
    v.x = 8
    v[1] = 9
    expect(v[0] === 8 && v.y === 9).toBe(true)
  })

  describe('map, filter, reduce', () => {
    test('map returns a vector instance instead of a vanilla array', () => {
      let v = new Vec(5, 6, 7)
      let m = v.map((el) => el * 2)
      expect(m.x).toEqual(m[0])
      expect(m.x).toEqual(10)
    })

    test('filter sets false test values to zero', () => {
      let v = new Vec(5, 6, 7)
      let m = v.filter((el) => el > 5)
      expect(m.x).toBeDefined()
      expect(m.x).toEqual(0)
    })

    test('reduce should behave exactly like native Array.reduce', () => {
      let v = new Vec([4, 5, 6])
      expect(v.reduce((acc, d) => acc + d)).toBe(15)
      expect(v.reduce((acc, d) => ({ ...acc, [d]: true }), {})).toEqual({
        4: true,
        5: true,
        6: true,
      })
    })

    test('if reduce returns an array, it should be cast to a Vector', () => {
      let v = new Vec(2, 3, 4)
      let res = v.reduce((acc, d) => [...acc, d * 2], [])
      let resLong = v.reduce((acc, d) => [...acc, d, d * 2], [])
      expect(res).toHaveProperty('x')
      expect(resLong).toHaveProperty('x')
    })
  })

  test('vector is JSON serializable into an array', () => {
    let v = new Vec(4, 5, 6)
    expect(JSON.stringify(v) === JSON.stringify([4, 5, 6])).toBe(true)
  })

  test('An existing array can be "vectorized"', () => {
    let v = new Vec([3, 4, 5, 6])
    expect(v[0] === 3 && v[1] === 4 && v[2] === 5 && v[3] === 6).toBe(true)
  })

  test('a vector can be cast back into a plain array with toArray()', () => {
    let v = new Vec([3, 4, 5])
    expect(v.toArray()).not.toHaveProperty('x')
    expect(v).toHaveProperty('x')
  })
})

describe('static vector methods', () => {
  const { Vec, Vector } = veclib
  describe('add', () => {
    const { add } = veclib
    test('if an array is passed in, it is cast to a vector', () => {
      let v = [2, 3, 4]
      let res = add(v, 5)
      expect(res).toBeInstanceOf(Vec)
    })

    test('can add a vector and a scalar', () => {
      let v = [2, 3, 4]
      let res = add(v, 5)
      expect(res).toHaveProperty('x', 7)
      expect(res).toHaveProperty('y', 8)
      expect(res).toHaveProperty('z', 9)
      let res2 = add(3, v)
      expect(res2.toArray()).toEqual([5, 6, 7])
    })

    test('trying to add a single vector returns the vector', () => {
      expect(add([1, 2, 3]).toArray()).toEqual([1, 2, 3])
    })

    test('can add a scalars together', () => {
      expect(add(1, 2)).toBe(3)
      expect(add(1, 2, 3)).toBe(6)
    })

    test('adds two vectors together', () => {
      let v1 = [2, 3, 4]
      let v2 = [1, 2, 3]
      let res = add(v1, v2)
      expect(res.toArray()).toEqual([3, 5, 7])
    })

    test('adds n vectors together', () => {
      let v1 = [2, 3, 4]
      let v2 = [2, 3, 4]
      let v3 = [2, 3, 4]
      let v4 = [2, 3, 4]
      expect(add(v1, v2, v3, v4).toArray()).toEqual([8, 12, 16])
    })

    test('can add 2d vecs together', () => {
      let vecs = [[3, 3], [3, 3]]
      expect(add(vecs).toArray()).toEqual([6, 6])
    })

    test('trying to add different sized vecs together throws an error', () => {
      let vecs = [[3, 3], [3, 3, 3], 3]
      expect(() => add(vecs)).toThrow()
    })

    test('can add n-dimensional vecs together', () => {
      let vecs = [3, [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]]
      expect(add(vecs).toArray()).toEqual([6, 6, 6, 6, 6])
    })

    test('can pass vectors in either an array or as arguments', () => {
      let vecs = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
      expect(add(vecs).toArray()).toEqual([12, 15, 18])
    })
  })

  describe('subtract', () => {
    const { sub } = veclib
    test('if an array is passed in, it is cast to a vector', () => {
      let v = [2, 3, 4]
      let res = sub(v, 5)
      expect(res).toBeInstanceOf(Vec)
    })

    test('can pass vectors in either an array or as arguments', () => {
      let vecs = [[5, 2, 3], [4, 5, 6], [1, 8, 9]]
      expect(sub(vecs).toArray()).toEqual([0, -11, -12])
    })

    test('processes args from left to right', () => {
      let v = [1, 1, 1]
      expect(sub(v, 1).toArray()).toEqual([0, 0, 0])
    })

    test('trying to subtract a vector from a scalar should throw an error', () => {
      let v = [1, 1, 1]
      expect(() => sub(1, v)).toThrow()
    })
  })

  describe('multiply', () => {
    const { mult } = veclib
    test('if an array is passed in, it is cast to a vector', () => {
      let v = [2, 3, 4]
      let res = mult(v, 5)
      expect(res).toBeInstanceOf(Vec)
    })

    test('can multiply a vector and a scalar', () => {
      let v = [2, 3, 4]
      let res = mult(v, 2)
      expect(res).toHaveProperty('x', 4)
      expect(res).toHaveProperty('y', 6)
      expect(res).toHaveProperty('z', 8)
      let res2 = mult(0, v)
      expect(res2.toArray()).toEqual([0, 0, 0])
    })

    test('can multiply a scalars together', () => {
      expect(mult(1, 2)).toBe(2)
      expect(mult(1, 2, 3)).toBe(6)
    })

    test('multiplies two vectors together', () => {
      let v1 = [2, 3, 4]
      let v2 = [1, 2, 3]
      let res = mult(v1, v2)
      expect(res.toArray()).toEqual([2, 6, 12])
    })

    test('multiply n vectors together', () => {
      let v1 = [1, 0, 2]
      let v2 = [1, 3, 2]
      let v3 = [1, 3, 2]
      let v4 = [1, 3, 2]
      expect(mult(v1, v2, v3, v4).toArray()).toEqual([1, 0, 16])
    })

    test('can multiply 2d vecs together', () => {
      let vecs = [[3, 3], [3, 3]]
      expect(mult(vecs).toArray()).toEqual([9, 9])
    })

    test('trying to multiply different sized vecs together throws an error', () => {
      let vecs = [[3, 3], [3, 3, 3], 3]
      expect(() => mult(vecs)).toThrow()
    })

    test('can mult n-dimensional vecs together', () => {
      let vecs = [3, [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]]
      expect(mult(vecs).toArray()).toEqual([3, 3, 3, 3, 3])
    })

    test('can pass vectors in either an array or as arguments', () => {
      let vecs = [[1, 2, 2], [1, 1, 0], [1, 1, 9]]
      expect(mult(vecs).toArray()).toEqual([1, 2, 0])
    })
  })

  describe('divide', () => {
    const { div } = veclib
    test('if an array is passed in, it is cast to a vector', () => {
      let v = [2, 3, 4]
      let res = div(v, 5)
      expect(res).toBeInstanceOf(Vec)
    })

    test('can pass vectors in either an array or as arguments', () => {
      let vecs = [[5, 2, 3], [4, 5, 6], [1, 8, 9]]
      let res = div(vecs).toArray()
      let expected = [1.25, 0.05, 0.05555555555555555]
      res.forEach((val, i) => expect(val).toBeCloseTo(expected[i]))
    })

    test('processes args from left to right', () => {
      let v1 = [10, 4, 6]
      let v2 = [2, 2, 2]
      expect(div(v1, 1, v2).toArray()).toEqual([5, 2, 3])
    })

    test('trying to subtract a vector from a scalar should throw an error', () => {
      let v = [1, 1, 1]
      expect(() => sub(1, v)).toThrow()
    })
  })

  describe ('sum', () => {
    const { sum } = veclib

    test('if one vector is passed in, returns the sum of its dimensions', () => {
      let v = [1,2]
      let result = sum(v)
      let expected = 3
      expect(result).toEqual(expected)
    })
  })
})
