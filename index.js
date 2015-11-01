(function (factory) {
  'use strict';

  var ok      = {};

  var options = {

    /**
     * pattern on which to split object property paths
     * @type {String}
     */
    seperator: '.'

  };

  /**
   * Test wherther a reference is null or undefined
   * @param  {Any}     v Value to test
   * @return {Boolean} returns false when `v` is null or undefined, true otherwise
   */
  var isValue = function (v) {
    return v != null;
  };

  /**
   * More advanced typeof function, distinguises array and null
   * @param  {Any}      v value to test
   * @return {String}     the kind of value
   */
  var kindof = function (v) {
    if (!isValue(v)) {
      return v === null ? 'null' : 'undefined';
    }

    if (v.constructor === Array) {
      return 'array';
    }

    if (v.constructor.name) {
      return v.constructor.name.toLowerCase();
    }

    return typeof v;
  };

  /**
   * Test whether the current index of an iteration is the last
   * @param  {Number}  idx    The current index
   * @param  {Number}  length The length of the container
   * @return {Boolean}        true when it is the last iteration, false otherwise
   */
  var isLast = function (idx, length) {
    return idx === (length - 1);
  };

  /**
   * A utility function for splitting and reducing the property path
   * @param  {String}   property property path of the target value
   * @param  {Any}      context in which the target value resides
   * @param  {Function} an iterator which receives the current context,
   *                    the next property name, the next value
   *                    and whether the iteration is the last as arguments
   */
  var split = function (property, context, iterator) {
    return property
      .split(options.seperator)
      .reduce(function (ctx, token, i, a) {
        return iterator(ctx, token, ctx[token], isLast(i, a.length));
      }, context);
  };

  /**
   *	Ensures the existence of a property. if the value is undefined or null,
   *	the property withh be set to the provided value
   *
   * @param  {Object} context  the context in which to ensure a value exists
   * @param  {String} property the path of the property. Specify nested
   *                           properties by sperating with `.`.
   *                           @see options.seperator
   * @param  {Any}    value    The default to apply if the target value does not
   *                           exist.
   *
   * @return {Object}          returns the existing or ensured value.
   */
  ok.ensure = function (context, property, value) {

    // if no property was given, we just need to check the given context
    if (arguments.length === 2) {
      return isValue(context) ? context : property;
    }

    return split(property, context, function (ctx, token, next, last) {
      // on the last iteration we set the default if it does not exist
      if (last) {
        return ctx[token] = isValue(next) ? next : value;
      }

      // set the next property as an empty object if it does not exist
      return ctx[token] = isValue(next) ? next : {};
    });

  };

  /**
   * Get the property specified by the property path in the context object.
   * A default value can be passed which will be returned if the property is null
   * or undefined.
   *
   * @param  {Object} context         The context in which to find the property
   * @param  {String} property        the path of the property. Specify nested
   *                               		properties by sperating with `.`.
   *                               		@see options.seperator
   * @param  {[type]} [defaultValue]  an optional default which will be returned
   *                                  if the target property does not exist
   * @return {[type]}                 returns the property or undefined if not found
   */
  ok.get = function (context, property, defaultValue) {
    var useDefault = arguments.length === 3;

    if (!isValue(context)) {
      return;
    }

    return split(property, context, function (ctx, token, next, last) {
      if (last) {

        if (isValue(next)) {
            return next;
        }

        if (useDefault) {
          return defaultValue;
        }

        return next;
      }
      return isValue(next) ? next : {};
    });
  };

  /**
   * Set the property specified by the property path in the context object to
   * the provided value.
   *
   * @param  {Object} context      The context in which to set the property.
   * @param  {String} property     The path of the property. Specify nested
   *                               properties by sperating with `.`.
   *                               @see options.seperator
   * @param  {[type]} value        The value which will be set on the target
   *                               property
   * @return {[type]}              returns the passed in context
   */
  ok.set = function (context, property, value) {
    if (!isValue(context)) {
      context = {};
    }

    return split(property, context, function (ctx, token, next, last) {
      if (last) {
        ctx[token] = value;
        return context;
      }

      return ctx[token] = isValue(next) ? next : {};
    });
  };

  var Assertion = function (data) {
    this._data = data;

    this._functions().forEach(function (name) {
      var old = this[name];

      this[name] = function () {
        var ret = old.apply(this, arguments);
        return this._negate ? !ret : ret;
      };

    }, this);
  };

  Assertion.prototype = {
    constructor: Assertion,
    _data: null,
    _negate: false,
    _deep: false,

    _functions: function () {
      var
        names = [],
        name;

      for (name in Assertion.prototype) {
        if (!/^_/.test(name) && typeof Assertion.prototype[name] === 'function') {
          names.push(name);
        }
      }

      return names;
    },

    equals: function (value) {
      return this._data === value;
    },

    truthy: function () {
      return !!this._data;
    },

    falsy: function () {
      return !this._data;
    },

    typeof: function (type) {
      return typeof this._data === type;
    },

    kindof: function (type) {
      return kindof(this._data) === type;
    },

    lt: function (v) {
      return this._data < v;
    },

    lte: function (v) {
      return this._data <= v;
    },

    gt: function (v) {
      return this._data > v;
    },

    gte: function (v) {
      return this._data >= v;
    }
   };

  Object.defineProperty(Assertion.prototype, 'is', {
    get: function () {
      this._negate = false;
      return this;
    }
  });

  Object.defineProperty(Assertion.prototype, 'not', {
    get: function () {
      this._negate = true;
      return this;
    }
  })

  Object.defineProperty(Assertion.prototype, 'defined', {
    get: function () {
      return this._negate
        ? this._data === void 0
        : this._data !== void 0;
    }
  });

  Object.defineProperty(Assertion.prototype, 'undefined', {
    get: function () {
      return !this.defined;
    }
  });

  Object.defineProperty(Assertion.prototype, 'null', {
    get: function () {
      return this._negate
        ? this._data !== null
        : this._data === null;
    }
  });

  Object.defineProperty(Assertion.prototype, 'value', {
    get: function () {
      return this._negate
        ? !isValue(this._data)
        : isValue(this._data);
    }
  });

  ok.check = function (context, property) {
    var value;

    if (arguments.length === 2) {
      value = ok.get(context, property);
    } else {
      value = context;
    }

    return new Assertion(value);
  };

  factory(ok);

})(function (ok) {
  var root;

  if (typeof module !== 'undefined' && typeof module.exports === 'object') {
    if (typeof global !== 'undefined' && typeof global.window === 'object') {
      // it's probably a node-webkit type app
      root = global.window;
    } else {
      // looks like it's node, just export the package
      return module.exports = ok;
    }
  } else {
    root = window;
  }

  if (typeof root.ok !== 'undefined' && 'ok' in root) {
    // add a noconflict method
    var old = root.ok;

    ok.noconflict = function () {
      root.ok = old;
      return ok;
    };
  }

  root.ok = ok;
});
