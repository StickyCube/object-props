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
   * @return {Object}          returns the passed `context`.
   */
  ok.ensure = function (context, property, value) {

    // if no property was given, we just need to check the given context
    if (arguments.length === 2) {
      return isValue(context) ? context : property;
    }

    return split(property, context, function (ctx, token, next, last) {
      // on the last iteration we set the default if it does not exist
      if (last) {
        ctx[token] = isValue(next) ? next : value;
        return context;
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

    return split(property, context, function (ctx, token, next, last) {
      if (last) {
        if (useDefault) {
          return isValue(next) ? next : defaultValue;
        }

        return isValue(next) ? next : {};
      }

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
    return split(property, context, function (ctx, token, next, last) {
      if (last) {
        ctx[token] = value;
        return context;
      }

      return ctx[token] = isValue(next) ? next : {};
    });
  }

  factory(ok);
  
})(function (package) {
  var
    root;

  if (typeof module !== 'undefined' && typeof module.exports === 'object') {
    return module.exports = package;
  }

  if (typeof window._ !== 'undefined') {
    var old = window.ok;

    package.noconflict = function () {
      window.ok = old;
      return package;
    };
  }

  window.ok = package;
});
