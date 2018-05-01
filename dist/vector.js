'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

var Vec = exports.Vec = function (_extendableBuiltin2) {
  _inherits(Vec, _extendableBuiltin2);

  function Vec(x, y, z) {
    for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      rest[_key - 3] = arguments[_key];
    }

    _classCallCheck(this, Vec);

    var _this = _possibleConstructorReturn(this, (Vec.__proto__ || Object.getPrototypeOf(Vec)).call(this));

    _this.map = function (fn) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this;

      return new Vec(_get(Vec.prototype.__proto__ || Object.getPrototypeOf(Vec.prototype), 'map', _this).call(_this, fn, thisArg));
    };

    _this.filter = function (fn) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this;

      var filterRes = _get(Vec.prototype.__proto__ || Object.getPrototypeOf(Vec.prototype), 'map', _this).call(_this, function (el) {
        return fn(el);
      }, thisArg).map(function (el, i) {
        return el ? _this[i] : 0;
      });
      return new Vec(filterRes);
    };

    _this.reduce = function () {
      var _get2;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var res = (_get2 = _get(Vec.prototype.__proto__ || Object.getPrototypeOf(Vec.prototype), 'reduce', _this)).call.apply(_get2, [_this].concat(args));
      return Array.isArray(res) ? new Vec(res) : res;
    };

    _this.toArray = function () {
      return [].concat(_toConsumableArray(_this));
    };

    if (Array.isArray(x)) {
      var _x3 = _toArray(x),
          x = _x3[0],
          y = _x3[1],
          z = _x3[2],
          rest = _x3.slice(3);
    }
    if (x !== undefined) _this[0] = _this.x = x;
    if (y !== undefined) _this[1] = _this.y = y;
    if (z !== undefined) _this[2] = _this.z = z;
    rest.forEach(function (v) {
      return v !== undefined ? _this.push(v) : null;
    });
    // BUG: get and set syntax aren't being transpiled correctly
    // need to use this approach instead
    Object.defineProperties(_this, {
      x: {
        get: function get() {
          return _this[0] || 0;
        },
        set: function set(v) {
          return _this[0] = v;
        }
      },
      y: {
        get: function get() {
          return _this[1] || 0;
        },
        set: function set(v) {
          return _this[1] = v;
        }
      },
      z: {
        get: function get() {
          return _this[2] || 0;
        },
        set: function set(v) {
          return _this[2] = v;
        }
      }
    });
    return _this;
  }

  return Vec;
}(_extendableBuiltin(Array));

var Vector = exports.Vector = function Vector() {
  for (var _len3 = arguments.length, dimensions = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    dimensions[_key3] = arguments[_key3];
  }

  return new (Function.prototype.bind.apply(Vec, [null].concat(dimensions)))();
};

var create = exports.create = Vector;

var argsOrArray = function argsOrArray() {
  for (var _len4 = arguments.length, vecs = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    vecs[_key4] = arguments[_key4];
  }

  var res = vecs.length === 1 && Array.isArray(vecs[0]) ? vecs[0] : vecs;

  // TODO: THIS MUST BE WHY WE NEED TYPESCRIPT
  // if (typeof res[0] === 'number') {
  //   res = [res]
  // }
  return res;
};

var add = exports.add = function add() {
  for (var _len5 = arguments.length, vecs = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    vecs[_key5] = arguments[_key5];
  }

  vecs = argsOrArray.apply(undefined, _toConsumableArray(vecs));
  var scalars = 0;
  while (typeof vecs[vecs.length - 1] === 'number') {
    scalars += vecs.pop();
  }
  if (vecs.length === 0) {
    return scalars;
  }
  var res = vecs.reduceRight(function (acc, v) {
    if (typeof v === 'number') {
      scalars += v;
      return acc;
    }
    if (acc.length !== v.length) {
      throw 'Vectors must be equal length or a scalar';
    }
    return Vector(acc.map(function (d, i) {
      return d + (v[i] === undefined ? 1 : v[i]);
    }));
  });
  return typeof res === 'number' ? res : Vector(res.map(function (d) {
    return d + scalars;
  }));
};

var sub = exports.sub = function sub() {
  for (var _len6 = arguments.length, vecs = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    vecs[_key6] = arguments[_key6];
  }

  vecs = argsOrArray.apply(undefined, _toConsumableArray(vecs));
  if (typeof vecs[0] === 'number') {
    throw 'Cannot subtract a vector from a scalar';
  }
  return vecs.reduce(function (acc, v) {
    if (typeof v === 'number') {
      return Vector(acc.map(function (d) {
        return d - v;
      }));
    }
    return Vector(acc.map(function (d, i) {
      return d - v[i];
    }));
  });
};

var mult = exports.mult = function mult() {
  for (var _len7 = arguments.length, vecs = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    vecs[_key7] = arguments[_key7];
  }

  vecs = argsOrArray.apply(undefined, _toConsumableArray(vecs));
  var scalars = 1;
  while (typeof vecs[vecs.length - 1] === 'number') {
    scalars *= vecs.pop();
  }
  if (vecs.length === 0) {
    return scalars;
  }
  var res = vecs.reduceRight(function (acc, v) {
    if (typeof v === 'number') {
      scalars *= v;
      return acc;
    }
    if (acc.length !== v.length) {
      throw 'Vectors must be equal length or a scalar';
    }
    return Vector(acc.map(function (d, i) {
      return d * (v[i] === undefined ? 1 : v[i]);
    }));
  });
  return typeof res === 'number' ? res : Vector(res.map(function (d) {
    return d * scalars;
  }));
};

var div = exports.div = function div() {
  for (var _len8 = arguments.length, vecs = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    vecs[_key8] = arguments[_key8];
  }

  vecs = argsOrArray.apply(undefined, _toConsumableArray(vecs));
  if (typeof vecs[0] === 'number') {
    throw 'Cannot divide a scalar by a vector';
  }
  return vecs.reduce(function (acc, v) {
    if (typeof v === 'number') {
      return Vector(acc.map(function (d) {
        return d / v;
      }));
    }
    return Vector(acc.map(function (d, i) {
      return d / v[i];
    }));
  });
};

var sum = exports.sum = function sum() {
  for (var _len9 = arguments.length, vecs = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
    vecs[_key9] = arguments[_key9];
  }

  return add(vecs).reduce(function (acc, d) {
    return acc + d;
  });
};

var mag = exports.mag = function mag(vec) {
  var z = Math.pow(vec.z, 2) || 0;
  return Math.sqrt(sum(vec));
  return Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2) + z);
};

var magnitude = exports.magnitude = mag;

var norm = exports.norm = function norm(vec) {
  return mag(vec) > 0 ? div(vec, mag(vec)) : vec;
};

var centroid = exports.centroid = function centroid() {
  return div(add.apply(undefined, arguments), arguments.length);
};

var _clamp = function _clamp(val, lo, hi) {
  return val < lo ? lo : val > hi ? hi : val;
};
var clamp = exports.clamp = function clamp(vec) {
  for (var _len10 = arguments.length, ranges = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
    ranges[_key10 - 1] = arguments[_key10];
  }

  ranges = ranges.length === 0 ? [[-1, 1]] : ranges;
  return create(vec).map(function (d, i) {
    if (ranges[i]) {
      return _clamp.apply(undefined, [d].concat(_toConsumableArray(ranges[i])));
    } else {
      return _clamp.apply(undefined, [d].concat(_toConsumableArray(ranges[ranges.length - 1])));
    }
  });
};

var zip = function zip() {
  for (var _len11 = arguments.length, rows = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
    rows[_key11] = arguments[_key11];
  }

  return [].concat(_toConsumableArray(rows[0])).map(function (_, c) {
    return rows.map(function (row) {
      return row[c];
    });
  });
};
var distance = exports.distance = function distance(vec1, vec2) {
  return Math.sqrt(zip(vec2Array(vec2), vec2Array(vec1)).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        d1 = _ref2[0],
        d2 = _ref2[1];

    return Math.pow(d1 - d2, 2);
  }).reduce(function (acc, x) {
    return acc + x;
  }));
};

var array2Vec = exports.array2Vec = function array2Vec(arr) {
  return Vector.apply(undefined, _toConsumableArray(arr));
};
var a2v = exports.a2v = array2Vec;

var vec2Array = exports.vec2Array = function vec2Array(vec) {
  return [vec.x, vec.y, vec.z ? vec.z : 0];
};
var v2a = exports.v2a = vec2Array;
