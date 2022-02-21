(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('fs'), require('path'), require('util'), require('assert'), require('events'), require('child_process'), require('os')) :
  typeof define === 'function' && define.amd ? define(['fs', 'path', 'util', 'assert', 'events', 'child_process', 'os'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.funnyUtils = factory(global.fs, global.path, global.require$$0$1, global.assert, global.require$$0$2, global.child_process, global.os));
})(this, (function (fs, path$1, require$$0$1, assert, require$$0$2, ChildProcess, Os) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
  var path__default = /*#__PURE__*/_interopDefaultLegacy(path$1);
  var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
  var assert__default = /*#__PURE__*/_interopDefaultLegacy(assert);
  var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);
  var ChildProcess__default = /*#__PURE__*/_interopDefaultLegacy(ChildProcess);
  var Os__default = /*#__PURE__*/_interopDefaultLegacy(Os);

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  /** 数组工具 **/

  /**
   * @name 分组成员特性
   * @param {array} [arr=[]] 数组
   * @param {string} [key=""] 属性
   */
  function groupMemKey() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    return key ? arr.reduce(function (t, v) {
      return !t[v[key]] && (t[v[key]] = []), t[v[key]].push(v), t;
    }, {}) : {};
  }
  /**
   * @name 记录成员位置
   * @param {array} [arr=[]] 数组
   * @param {*} val 值
   */


  function recordMemPosition() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var val = arguments.length > 1 ? arguments[1] : undefined;
    return arr.reduce(function (t, v, i) {
      return v === val && t.push(i), t;
    }, []);
  }
  /**
   * @name 统计成员个数
   * @param {array} [arr=[]] 数组
   */


  function statMemCount() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return arr.reduce(function (t, v) {
      return t[v] = (t[v] || 0) + 1, t;
    }, {});
  }
  /**
   * @name 统计成员所含关键字
   * @param {array} [arr=[]] 数组
   * @param {array} [keys=[]] 关键字集合
   */


  function statMemKeyword() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return keys.reduce(function (t, v) {
      return arr.some(function (w) {
        return w.includes(v);
      }) && t.push(v), t;
    }, []);
  }

  /** 日期工具 **/

  /**
   * @name 格式倒计时
   * @param {string} [time=null] 日期：YYYY-MM-DD HH:mm:ss
   */
  function formatCountdown() {
    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var nowTime = +new Date();
    var nextTime = +new Date(time);
    var diff = nextTime - nowTime;

    if (diff >= 0) {
      var day = Math.floor(diff / 1000 / 3600 / 24);
      var hour = Math.floor(diff / 1000 / 60 / 60 % 24);
      var min = Math.floor(diff / 1000 / 60 % 60);
      var sec = Math.floor(diff / 1000 % 60);
      return "".concat(day ? day + "天" : "").concat(hour ? hour + "时" : "").concat(min ? min + "分" : "").concat(sec ? sec + "秒" : "");
    } else {
      return "时间已到";
    }
  }
  /**
   * @name 格式时间差
   * @param {string} [time=null] 日期：YYYY-MM-DD HH:mm:ss
   */


  function formatDiffTime() {
    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var nowTime = +new Date();
    var tgtTime = +new Date(time);
    var diff = nowTime - tgtTime;
    var slot = diff >= 0 ? "前" : "后";
    var absDiff = Math.abs(diff);
    var monNum = 1461 / 48;
    var yearNum = 1461 / 4;
    var min = 1000 * 60;
    var hour = min * 60;
    var day = hour * 24;
    var mon = day * monNum;
    var year = day * yearNum;
    var minDiff = absDiff / min;
    var hourDiff = absDiff / hour;
    var dayDiff = absDiff / day;
    var monDiff = absDiff / mon;
    var yearDiff = absDiff / year;

    if (yearDiff >= 1 || monDiff >= 12) {
      return tgtTime.format("YYYY-MM-DD HH:mm:ss");
    } else if (monDiff >= 1 && monDiff < 12) {
      return "".concat(parseInt(monDiff), "\u4E2A\u6708").concat(slot);
    } else if (dayDiff >= 1 && dayDiff < monNum) {
      return "".concat(parseInt(dayDiff), "\u5929").concat(slot);
    } else if (hourDiff >= 1 && hourDiff < 24) {
      return "".concat(parseInt(hourDiff), "\u5C0F\u65F6").concat(slot);
    } else if (minDiff >= 1 && minDiff < 60) {
      return "".concat(parseInt(minDiff), "\u5206\u949F").concat(slot);
    } else {
      return diff >= 0 ? "刚刚" : "准备";
    }
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  var runtime_1 = createCommonjsModule(function (module) {
    var runtime = function (exports) {

      var Op = Object.prototype;
      var hasOwn = Op.hasOwnProperty;
      var undefined$1; // More compressible than void 0.

      var $Symbol = typeof Symbol === "function" ? Symbol : {};
      var iteratorSymbol = $Symbol.iterator || "@@iterator";
      var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
      var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

      function define(obj, key, value) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
        return obj[key];
      }

      try {
        // IE 8 has a broken Object.defineProperty that only works on DOM objects.
        define({}, "");
      } catch (err) {
        define = function define(obj, key, value) {
          return obj[key] = value;
        };
      }

      function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.

        generator._invoke = makeInvokeMethod(innerFn, self, context);
        return generator;
      }

      exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
      // record like context.tryEntries[i].completion. This interface could
      // have been (and was previously) designed to take a closure to be
      // invoked without arguments, but in all the cases we care about we
      // already have an existing method we want to call, so there's no need
      // to create a new function object. We can even get away with assuming
      // the method takes exactly one argument, since that happens to be true
      // in every case, so we don't have to touch the arguments object. The
      // only additional allocation required is the completion record, which
      // has a stable shape and so hopefully should be cheap to allocate.

      function tryCatch(fn, obj, arg) {
        try {
          return {
            type: "normal",
            arg: fn.call(obj, arg)
          };
        } catch (err) {
          return {
            type: "throw",
            arg: err
          };
        }
      }

      var GenStateSuspendedStart = "suspendedStart";
      var GenStateSuspendedYield = "suspendedYield";
      var GenStateExecuting = "executing";
      var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
      // breaking out of the dispatch switch statement.

      var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
      // .constructor.prototype properties for functions that return Generator
      // objects. For full spec compliance, you may wish to configure your
      // minifier not to mangle the names of these two functions.

      function Generator() {}

      function GeneratorFunction() {}

      function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
      // don't natively support it.


      var IteratorPrototype = {};
      define(IteratorPrototype, iteratorSymbol, function () {
        return this;
      });
      var getProto = Object.getPrototypeOf;
      var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

      if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
        // This environment has a native %IteratorPrototype%; use it instead
        // of the polyfill.
        IteratorPrototype = NativeIteratorPrototype;
      }

      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
      GeneratorFunction.prototype = GeneratorFunctionPrototype;
      define(Gp, "constructor", GeneratorFunctionPrototype);
      define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
      GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
      // Iterator interface in terms of a single ._invoke method.

      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function (method) {
          define(prototype, method, function (arg) {
            return this._invoke(method, arg);
          });
        });
      }

      exports.isGeneratorFunction = function (genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
      };

      exports.mark = function (genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;
          define(genFun, toStringTagSymbol, "GeneratorFunction");
        }

        genFun.prototype = Object.create(Gp);
        return genFun;
      }; // Within the body of any async function, `await x` is transformed to
      // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
      // `hasOwn.call(value, "__await")` to determine if the yielded value is
      // meant to be awaited.


      exports.awrap = function (arg) {
        return {
          __await: arg
        };
      };

      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);

          if (record.type === "throw") {
            reject(record.arg);
          } else {
            var result = record.arg;
            var value = result.value;

            if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
              return PromiseImpl.resolve(value.__await).then(function (value) {
                invoke("next", value, resolve, reject);
              }, function (err) {
                invoke("throw", err, resolve, reject);
              });
            }

            return PromiseImpl.resolve(value).then(function (unwrapped) {
              // When a yielded Promise is resolved, its final value becomes
              // the .value of the Promise<{value,done}> result for the
              // current iteration.
              result.value = unwrapped;
              resolve(result);
            }, function (error) {
              // If a rejected Promise was yielded, throw the rejection back
              // into the async generator function so it can be handled there.
              return invoke("throw", error, resolve, reject);
            });
          }
        }

        var previousPromise;

        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }

          return previousPromise = // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        } // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).


        this._invoke = enqueue;
      }

      defineIteratorMethods(AsyncIterator.prototype);
      define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
        return this;
      });
      exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
      // AsyncIterator objects; they just return a Promise for the value of
      // the final result produced by the iterator.

      exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function (result) {
          return result.done ? result.value : iter.next();
        });
      };

      function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error("Generator is already running");
          }

          if (state === GenStateCompleted) {
            if (method === "throw") {
              throw arg;
            } // Be forgiving, per 25.3.3.3.3 of the spec:
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


            return doneResult();
          }

          context.method = method;
          context.arg = arg;

          while (true) {
            var delegate = context.delegate;

            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);

              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if (context.method === "next") {
              // Setting context._sent for legacy support of Babel's
              // function.sent implementation.
              context.sent = context._sent = context.arg;
            } else if (context.method === "throw") {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }

              context.dispatchException(context.arg);
            } else if (context.method === "return") {
              context.abrupt("return", context.arg);
            }

            state = GenStateExecuting;
            var record = tryCatch(innerFn, self, context);

            if (record.type === "normal") {
              // If an exception is thrown from innerFn, we leave state ===
              // GenStateExecuting and loop back for another invocation.
              state = context.done ? GenStateCompleted : GenStateSuspendedYield;

              if (record.arg === ContinueSentinel) {
                continue;
              }

              return {
                value: record.arg,
                done: context.done
              };
            } else if (record.type === "throw") {
              state = GenStateCompleted; // Dispatch the exception by looping back around to the
              // context.dispatchException(context.arg) call above.

              context.method = "throw";
              context.arg = record.arg;
            }
          }
        };
      } // Call delegate.iterator[context.method](context.arg) and handle the
      // result, either by returning a { value, done } result from the
      // delegate iterator, or by modifying context.method and context.arg,
      // setting context.delegate to null, and returning the ContinueSentinel.


      function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];

        if (method === undefined$1) {
          // A .throw or .return when the delegate iterator has no .throw
          // method always terminates the yield* loop.
          context.delegate = null;

          if (context.method === "throw") {
            // Note: ["return"] must be used for ES3 parsing compatibility.
            if (delegate.iterator["return"]) {
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              context.method = "return";
              context.arg = undefined$1;
              maybeInvokeDelegate(delegate, context);

              if (context.method === "throw") {
                // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
              }
            }

            context.method = "throw";
            context.arg = new TypeError("The iterator does not provide a 'throw' method");
          }

          return ContinueSentinel;
        }

        var record = tryCatch(method, delegate.iterator, context.arg);

        if (record.type === "throw") {
          context.method = "throw";
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }

        var info = record.arg;

        if (!info) {
          context.method = "throw";
          context.arg = new TypeError("iterator result is not an object");
          context.delegate = null;
          return ContinueSentinel;
        }

        if (info.done) {
          // Assign the result of the finished delegate to the temporary
          // variable specified by delegate.resultName (see delegateYield).
          context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

          context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
          // exception, let the outer generator proceed normally. If
          // context.method was "next", forget context.arg since it has been
          // "consumed" by the delegate iterator. If context.method was
          // "return", allow the original .return call to continue in the
          // outer generator.

          if (context.method !== "return") {
            context.method = "next";
            context.arg = undefined$1;
          }
        } else {
          // Re-yield the result returned by the delegate method.
          return info;
        } // The delegate iterator is finished, so forget it and continue with
        // the outer generator.


        context.delegate = null;
        return ContinueSentinel;
      } // Define Generator.prototype.{next,throw,return} in terms of the
      // unified ._invoke helper method.


      defineIteratorMethods(Gp);
      define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
      // @@iterator function is called on it. Some browsers' implementations of the
      // iterator prototype chain incorrectly implement this, causing the Generator
      // object to not be returned from this call. This ensures that doesn't happen.
      // See https://github.com/facebook/regenerator/issues/274 for more details.

      define(Gp, iteratorSymbol, function () {
        return this;
      });
      define(Gp, "toString", function () {
        return "[object Generator]";
      });

      function pushTryEntry(locs) {
        var entry = {
          tryLoc: locs[0]
        };

        if (1 in locs) {
          entry.catchLoc = locs[1];
        }

        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }

        this.tryEntries.push(entry);
      }

      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
      }

      function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [{
          tryLoc: "root"
        }];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }

      exports.keys = function (object) {
        var keys = [];

        for (var key in object) {
          keys.push(key);
        }

        keys.reverse(); // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.

        return function next() {
          while (keys.length) {
            var key = keys.pop();

            if (key in object) {
              next.value = key;
              next.done = false;
              return next;
            }
          } // To avoid creating an additional object, we just hang the .value
          // and .done properties off the next function object itself. This
          // also ensures that the minifier will not anonymize the function.


          next.done = true;
          return next;
        };
      };

      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];

          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }

          if (typeof iterable.next === "function") {
            return iterable;
          }

          if (!isNaN(iterable.length)) {
            var i = -1,
                next = function next() {
              while (++i < iterable.length) {
                if (hasOwn.call(iterable, i)) {
                  next.value = iterable[i];
                  next.done = false;
                  return next;
                }
              }

              next.value = undefined$1;
              next.done = true;
              return next;
            };

            return next.next = next;
          }
        } // Return an iterator with no values.


        return {
          next: doneResult
        };
      }

      exports.values = values;

      function doneResult() {
        return {
          value: undefined$1,
          done: true
        };
      }

      Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
          this.prev = 0;
          this.next = 0; // Resetting context._sent for legacy support of Babel's
          // function.sent implementation.

          this.sent = this._sent = undefined$1;
          this.done = false;
          this.delegate = null;
          this.method = "next";
          this.arg = undefined$1;
          this.tryEntries.forEach(resetTryEntry);

          if (!skipTempReset) {
            for (var name in this) {
              // Not sure about the optimal order of these conditions:
              if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                this[name] = undefined$1;
              }
            }
          }
        },
        stop: function stop() {
          this.done = true;
          var rootEntry = this.tryEntries[0];
          var rootRecord = rootEntry.completion;

          if (rootRecord.type === "throw") {
            throw rootRecord.arg;
          }

          return this.rval;
        },
        dispatchException: function dispatchException(exception) {
          if (this.done) {
            throw exception;
          }

          var context = this;

          function handle(loc, caught) {
            record.type = "throw";
            record.arg = exception;
            context.next = loc;

            if (caught) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              context.method = "next";
              context.arg = undefined$1;
            }

            return !!caught;
          }

          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            var record = entry.completion;

            if (entry.tryLoc === "root") {
              // Exception thrown outside of any try block that could handle
              // it, so set the completion value of the entire function to
              // throw the exception.
              return handle("end");
            }

            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc");
              var hasFinally = hasOwn.call(entry, "finallyLoc");

              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }
              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else {
                throw new Error("try statement without catch or finally");
              }
            }
          }
        },
        abrupt: function abrupt(type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }

          if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
            // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
          }

          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;

          if (finallyEntry) {
            this.method = "next";
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }

          return this.complete(record);
        },
        complete: function complete(record, afterLoc) {
          if (record.type === "throw") {
            throw record.arg;
          }

          if (record.type === "break" || record.type === "continue") {
            this.next = record.arg;
          } else if (record.type === "return") {
            this.rval = this.arg = record.arg;
            this.method = "return";
            this.next = "end";
          } else if (record.type === "normal" && afterLoc) {
            this.next = afterLoc;
          }

          return ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },
        "catch": function _catch(tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;

              if (record.type === "throw") {
                var thrown = record.arg;
                resetTryEntry(entry);
              }

              return thrown;
            }
          } // The context.catch method must only be called with a location
          // argument that corresponds to a known catch block.


          throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc
          };

          if (this.method === "next") {
            // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined$1;
          }

          return ContinueSentinel;
        }
      }; // Regardless of whether this script is executing as a CommonJS module
      // or not, return the runtime object so that we can declare the variable
      // regeneratorRuntime in the outer scope, which allows this module to be
      // injected easily by `bin/regenerator --include-runtime script.js`.

      return exports;
    }( // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    module.exports );

    try {
      regeneratorRuntime = runtime;
    } catch (accidentalStrictMode) {
      // This module should not be running in strict mode, so the above
      // assignment should always work unless something is misconfigured. Just
      // in case runtime.js accidentally runs in strict mode, in modern engines
      // we can explicitly access globalThis. In older engines we can escape
      // strict mode using a global Function call. This could conceivably fail
      // if a Content Security Policy forbids using Function, but in that case
      // the proper solution is to fix the accidental strict mode problem. If
      // you've misconfigured your bundler to force strict mode and applied a
      // CSP to forbid Function, and you're not willing to fix either of those
      // problems, please detail your unique predicament in a GitHub issue.
      if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === "object") {
        globalThis.regeneratorRuntime = runtime;
      } else {
        Function("r", "regeneratorRuntime = r")(runtime);
      }
    }
  });

  var regenerator = runtime_1;

  /** 函数工具 **/

  /**
   * @name 格式异步返回值
   * @param {function} [pfn=Promise.resolve(true)] Promise函数
   */
  function asyncTo() {
    var pfn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Promise.resolve(true);
    return pfn && pfn instanceof Promise ? pfn.then(function (data) {
      return [null, data];
    })["catch"](function (err) {
      return [err];
    }) : [null, null];
  }
  /**
   * @name 防抖
   * @param {function} [fn=v=>v] 函数
   * @param {number} [dura=50] 时延
   */


  function debounce() {
    var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (v) {
      return v;
    };
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    var timer = null;
    return function () {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      timer && clearTimeout(timer);
      timer = setTimeout(function () {
        return fn.apply(_this, args);
      }, delay);
    };
  }
  /**
   * @name 节流
   * @param {function} [fn=v=>v] 函数
   * @param {number} [dura=50] 时延
   */


  function throttle() {
    var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (v) {
      return v;
    };
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    var pass = 0;
    return function () {
      var now = +new Date();

      if (now - pass > delay) {
        pass = now;

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        fn.apply(this, args);
      }
    };
  }
  /**
   * @name 等待
   * @param {number} [dura=1000] 时延
   */


  function waitFor() {
    return _waitFor.apply(this, arguments);
  }

  function _waitFor() {
    _waitFor = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
      var dura,
          _args = arguments;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dura = _args.length > 0 && _args[0] !== undefined ? _args[0] : 1000;
              return _context.abrupt("return", new Promise(function (resolve) {
                return setTimeout(function () {
                  return resolve(true);
                }, dura);
              }));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _waitFor.apply(this, arguments);
  }

  /** 数值工具 **/

  /**
   * @name 字节大小
   * @param {number} [byte=0] 字节
   */
  function byteSize() {
    var _byte = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    if (_byte === 0) return "0 B";
    var unit = 1024;
    var sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    var i = Math.floor(Math.log(_byte) / Math.log(unit));
    return (_byte / Math.pow(unit, i)).toPrecision(3) + " " + sizes[i];
  }
  /**
   * @name 补零数值
   * @param {number} [num=0] 数值
   * @param {number} [len=0] 补位
   */


  function fillNum() {
    var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return num.toString().padStart(len, "0");
  }
  /**
   * @name 范围随机数
   * @param {number} [min=0] 最小数
   * @param {number} [max=10] 最大数
   */


  function randomNum() {
    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  /**
   * @name N个范围随机数
   * @param {number} [min=0] 最小数
   * @param {number} [max=10] 最大数
   * @param {number} [count=1] 个数
   */


  function randomNumPlus() {
    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var randoms = [];

    while (true) {
      var isExists = false;
      var random = RandomNum(min, max);

      for (var i = 0; i < randoms.length; i++) {
        if (random === randoms[i]) {
          isExists = true;
          break;
        }
      }

      if (!isExists) {
        randoms.push(random);
      }

      if (randoms.length === count) {
        return randoms;
      }
    }
  }
  /**
   * @name 精确数值(四舍五入和百分比)
   * @param {number} [num=0] 数值
   * @param {number} [dec=2] 小数个数
   * @param {boolean} [per=false] 是否百分比
   */


  function roundNum() {
    var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var dec = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var per = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    return per ? Math.round(num * Math.pow(10, dec) * 100) / Math.pow(10, dec) + "%" : Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
  }
  /**
   * @name 千分数值
   * @param {number} [num=0] 数值
   */


  function thousandNum() {
    var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  /** 对象工具 **/

  /**
   * @name 读取属性
   * @param {*} [obj={}] 对象
   * @param {*} [keys=[]] 属性集合
   */
  function getKeys() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return Object.keys(obj).reduce(function (t, v) {
      return keys.includes(v) && (t[v] = obj[v]), t;
    }, {});
  }
  /**
    * @description 深层对象获取
    * @param {*} obj 传入需要获取的对象数组
    * @param {*} paths 路径，['a', 'b', 'c', 'd'] || 'a.b.c.d' || '0.a.1.b'
    * @returns 获取后的对象属性，如果没有返回undefined
  */


  function getDeepObj(obj, paths) {
    if (typeof paths === 'string') {
      paths = paths.split('.');
    }

    function myReducer(arr, reducer, initVal) {
      for (var i = 0; i < arr.length; i++) {
        initVal = reducer(initVal, arr[i], i, arr);
      }

      return initVal;
    }

    return myReducer(paths, function (value, key) {
      if (!value) {
        return undefined;
      }

      if (/^[0-9]+$/.test(key)) {
        key = Number(key);
      }

      return value[key];
    }, obj);
  }

  /** 正则工具 **/
  var MATCH = {
    address: {
      msg: "地址只能由2到200位中文、英文、数字或空格组成",
      regexp: /^[\u4e00-\u9fa5A-Za-z0-9 ]{2,200}$/g
    },
    count: {
      msg: "数量只能由数字组成",
      regexp: /^\d{1,}$/g
    },
    date: {
      msg: "日期只能由YYYY-MM-DD hh:mm:ss形式组成",
      regexp: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/g
    },
    email: {
      msg: "邮箱只能由xxx@yyy.zzz形式组成",
      regexp: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g
    },
    idcard: {
      msg: "身份证只能由13位数字或12位数字和X组成",
      regexp: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/g
    },
    image: {
      msg: "图片只能是jpg、png、gif或svg类型",
      regexp: /\.(jpe?g|png|gif|svg)$/g
    },
    name: {
      msg: "名称只能由2到50位中文、英文、数字、下划线或中划线组成",
      regexp: /^[\u4e00-\u9fa5\w-]{2,50}$/g
    },
    number: {
      msg: "计数只能由数字或小数点组成",
      regexp: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g
    },
    password: {
      msg: "密码只能由8到20位英文、数字或符号至少两种组成",
      regexp: /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{8,20}$/g
    },
    phone: {
      msg: "手机只能由11位数字组成，且需符合通讯运营商的规范",
      regexp: /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/g
    }
  };
  var SIGN = "^$.*+-?=!:|\\/()[]{}".split("");
  /**
   * @name 校验文本
   * @param {string} [type=""] 类型：address、count、date、email、idcard、image、name、number、password、phone
   * @param {string} [text=""] 文本
   */

  function checkText() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var _MATCH$type = MATCH[type],
        regexp = _MATCH$type.regexp,
        msg = _MATCH$type.msg;
    var flag = regexp.test(text);
    return {
      flag: flag,
      msg: flag ? "" : msg
    };
  }
  /**
   * @name 自定义校验文本
   * @param {regexp} [regexp=new RegExp()] 正则
   * @param {string} [msg=""] 提示
   * @param {string} [text=""] 文本
   */


  function checkTextPlus() {
    var regexp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new RegExp();
    var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var text = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    var flag = regexp.test(text);
    return {
      flag: flag,
      msg: flag ? "" : msg
    };
  }
  /**
   * @name 匹配括号文本
   * @param {string} [tgt="(*)"] 括号形式(提取的内容必须使用*代替)
   * @param {string} [text=""] 文本
   */


  function matchBracketText() {
    var tgt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "(*)";
    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var bracket = tgt.split("*").map(function (v) {
      return SIGN.includes(v) ? "\\" + v : v;
    });
    var regexp = new RegExp(bracket[0] + "(.+?)" + bracket[1], "g");
    var match = text.match(regexp);
    return (match || []).map(function (v) {
      return v.replace(regexp, "$1");
    });
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  /**
   * @name 脱敏手机
   * @param {string} [phone=""] 手机
   */

  function desePhone() {
    var phone = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    return MATCH.phone.regexp.test(phone) ? phone.toString().replace(/(\d{3})\d*(\d{4})/g, "$1****$2") : phone;
  }
  /**
   * @name 格式手机
   * @param {string} [phone=""] 手机
   * @param {string} [sign="-"] 标记：-、\s
   */


  function formatPhone() {
    var phone = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var sign = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "-";
    return MATCH.phone.regexp.test(phone) && ["-", " "].includes(sign) ? phone.toString().replace(/(\d{3})(\d{4})(\d{4})/g, "$1".concat(sign, "$2").concat(sign, "$3")) : phone;
  }
  /**
   * @name 随机HEX色值
   */


  function randomColor() {
    return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
  }
  /**
   * @name 随机长度ID
   * @param {number} [len=3] 长度 在1~10之间
   */


  function randomId() {
    var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
    (len < 1 || len > 10) && (len = 5);
    return Math.random().toString(36).substr(3, len);
  }
  /**
   * @name 移除标签
   * @param {string} [text=""] 文本
   */


  function removeTag() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    return text.replace(/<[^>]*>/g, "");
  }
  /**
   * @name 翻转文本
   * @param {string} [text=""] 文本
   */


  function reverseText() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    return text.split("").reduceRight(function (t, v) {
      return t + v;
    });
  }
  /**
   * @name 星级评分
   * @param {number} [rate=0] 星级 在0~5之间
   * @param {number} [len=5] 长度
   */


  function startScore() {
    var rate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
    rate < 0 && (rate = 0);
    rate > len && (rate = len);
    return [].concat(_toConsumableArray(Array.from(new Array(len).keys()).fill("★")), _toConsumableArray(Array.from(new Array(len).keys()).fill("☆"))).join("").slice(len - rate, len * 2 - rate);
  }

  /** 类型工具 **/

  /**
   * @name 比较对象
   * @param {object} obj1 对象1
   * @param {object} obj2 对象
   */
  function compareObj(obj1, obj2) {
    var result = {};
    var keys = Object.keys(obj1);
    keys.forEach(function (k) {
      return result[k] = isEqual(obj1[k], obj2[k]);
    });
    return result;
  }
  /**
   * @name 环境类型
   */


  function envType() {
    return typeof window !== "undefined" ? "web" : typeof global !== "undefined" ? "node" : "unknow";
  }
  /**
   * @name 判断环境
   */


  function isWeb() {
    return envType() === "web";
  }

  function isNode() {
    return envType() === "node";
  }
  /**
   * @name 判断相等
   * @param {*} data1 数据1
   * @param {*} data2 数据2
   */


  function isEqual(data1, data2) {
    if (data1 === data2) {
      return true;
    }

    if (isArray$1(data1) && isArray$1(data2)) {
      if (data1.length !== data2.length) {
        return false;
      }

      return data1.map(function (v, i) {
        for (var j = 0; j < data2.length; j++) {
          if (isEqual(data1[i], data2[j])) {
            data2.splice(j, 1);
            return true;
          }
        }

        return false;
      }).every(function (v) {
        return v;
      });
    } else if (data1 && data2 && isObject(data1) && isObject(data2)) {
      var keys1 = Object.keys(data1);
      var keys2 = Object.keys(data2);

      if (keys1.length !== keys2.length) {
        return false;
      }

      return keys1.map(function (key) {
        return isEqual(data1[key], data2[key]);
      }).every(function (v) {
        return v;
      });
    }

    return false;
  }
  /**
   * @name 数据类型
   * @param {*} data 数据
   * @param {*} type 类型
   */


  function typeOf(data, type) {
    var dataType = Object.prototype.toString.call(data).replace(/\[object (\w+)\]/, "$1").toLowerCase();
    return type ? dataType === type : dataType;
  }
  /**
   * @name 判断基础数据类型：undefined、null、string、number、boolean、array、object、symbol、date、regexp、function、class
   * @param {*} data 数据
   */


  function isUndefined(data) {
    return typeOf(data, "undefined");
  }

  function isNull(data) {
    return typeOf(data, "null");
  }

  function isString(data) {
    return typeOf(data, "string");
  }

  function isNumber(data) {
    return typeOf(data, "number");
  }

  function isBoolean(data) {
    return typeOf(data, "boolean");
  }

  function isArray$1(data) {
    return typeOf(data, "array");
  }

  function isObject(data) {
    return typeOf(data, "object");
  }

  function isSymbol(data) {
    return typeOf(data, "symbol");
  }

  function isDate(data) {
    return typeOf(data, "date");
  }

  function isRegExp(data) {
    return typeOf(data, "regexp");
  }

  function isFunction(data) {
    return typeOf(data, "function");
  }

  function isClass(data) {
    var classRegexp = /^class\s|^function\s+[A-Z]/;
    return typeOf(data, "function") && classRegexp.test(data.toString());
  }
  /**
   * @name 判断复合数据类型：set、map、weakset、weakmap
   * @param {*} data 数据
   */


  function isSet(data) {
    return typeOf(data, "set");
  }

  function isMap(data) {
    return typeOf(data, "map");
  }

  function isWeakSet(data) {
    return typeOf(data, "weakset");
  }

  function isWeakMap(data) {
    return typeOf(data, "weakmap");
  }
  /**
   * @name 判断函数类型：asyncfunction、function、arguments
   * @param {*} data 数据
   */


  function isAsyncFunction(data) {
    return typeOf(data, "asyncfunction");
  }

  function isSyncFunction(data) {
    return typeOf(data, "function");
  }

  function isArguments(data) {
    return typeOf(data, "arguments");
  }
  /**
   * @name 判断空类型：error、empty、emptyarray、emptyobject
   * @param {*} data 数据
   */


  function isError(data) {
    return data instanceof Error;
  }

  function isEmpty(data) {
    return !data; // undefined null "" 0 false NaN
  }

  function isEmptyArray(data) {
    return Array.isArray(data) && !data.length;
  }

  function isEmptyObject(data) {
    return isObject(data) && !Object.keys(data).length;
  }

  var common$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    asyncTo: asyncTo,
    byteSize: byteSize,
    checkText: checkText,
    checkTextPlus: checkTextPlus,
    compareObj: compareObj,
    debounce: debounce,
    desePhone: desePhone,
    envType: envType,
    fillNum: fillNum,
    formatCountdown: formatCountdown,
    formatDiffTime: formatDiffTime,
    formatPhone: formatPhone,
    getKeys: getKeys,
    getDeepObj: getDeepObj,
    groupMemKey: groupMemKey,
    isArguments: isArguments,
    isArray: isArray$1,
    isAsyncFunction: isAsyncFunction,
    isBoolean: isBoolean,
    isClass: isClass,
    isDate: isDate,
    isEmpty: isEmpty,
    isEmptyArray: isEmptyArray,
    isEmptyObject: isEmptyObject,
    isEqual: isEqual,
    isError: isError,
    isFunction: isFunction,
    isMap: isMap,
    isNode: isNode,
    isNull: isNull,
    isNumber: isNumber,
    isObject: isObject,
    isRegExp: isRegExp,
    isSet: isSet,
    isString: isString,
    isSymbol: isSymbol,
    isSyncFunction: isSyncFunction,
    isUndefined: isUndefined,
    isWeakMap: isWeakMap,
    isWeakSet: isWeakSet,
    isWeb: isWeb,
    matchBracketText: matchBracketText,
    randomColor: randomColor,
    randomId: randomId,
    randomNum: randomNum,
    randomNumPlus: randomNumPlus,
    recordMemPosition: recordMemPosition,
    removeTag: removeTag,
    reverseText: reverseText,
    roundNum: roundNum,
    startScore: startScore,
    statMemCount: statMemCount,
    statMemKeyword: statMemKeyword,
    thousandNum: thousandNum,
    throttle: throttle,
    typeOf: typeOf,
    waitFor: waitFor
  });

  /*
    options: {
      utimes: false,  // Boolean | Object, keep utimes if true
      mode: false,    // Boolean | Number, keep file mode if true
      cover: true,    // Boolean, cover if file exists
      filter: true,   // Boolean | Function, file filter
    }
  */

  function copydir(from, to, options, callback) {
    if (typeof options === 'function') {
      if (!callback) {
        callback = options;
        options = {
          filter: function filter() {
            return true;
          }
        };
      } else {
        options = {
          filter: options
        };
      }
    }

    if (typeof callback !== 'function') {
      callback = function callback() {};
    }

    if (typeof options.cover === 'undefined') {
      options.cover = true;
    }

    options.filter = typeof options.filter === 'function' ? options.filter : function (state, filepath, filename) {
      return options.filter;
    };
    fs__default["default"].lstat(from, function (err, stats) {
      if (err) {
        callback(err);
      } else {
        var statsname = stats.isDirectory() ? 'directory' : stats.isFile() ? 'file' : stats.isSymbolicLink() ? 'symbolicLink' : '';
        var valid = options.filter(statsname, from, path__default["default"].basename(from));

        if (statsname === 'directory' || statsname === 'symbolicLink') {
          // Directory or SymbolicLink
          if (valid) {
            fs__default["default"].stat(to, function (err) {
              if (err) {
                if (err.code === 'ENOENT') {
                  fs__default["default"].mkdir(to, function (err) {
                    if (err) {
                      callback(err);
                    } else {
                      options.debug && console.log('>> ' + to);
                      rewrite(to, options, stats, function (err) {
                        if (err) {
                          callback(err);
                        } else {
                          listDirectory(from, to, options, callback);
                        }
                      });
                    }
                  });
                } else {
                  callback(err);
                }
              } else {
                rewrite(to, options, stats, function (err) {
                  if (err) {
                    callback(err);
                  } else {
                    listDirectory(from, to, options, callback);
                  }
                });
              }
            });
          } else {
            callback();
          }
        } else if (stats.isFile()) {
          // File
          if (valid) {
            if (options.cover) {
              writeFile(from, to, options, stats, callback);
            } else {
              fs__default["default"].stat(to, function (err) {
                if (err) {
                  if (err.code === 'ENOENT') {
                    writeFile(from, to, options, stats, callback);
                  } else {
                    callback(err);
                  }
                } else {
                  callback();
                }
              });
            }
          } else {
            callback();
          }
        } else {
          callback(new Error('stats invalid: ' + from));
        }
      }
    });
  }

  function listDirectory(from, to, options, callback) {
    fs__default["default"].readdir(from, function (err, files) {
      if (err) {
        callback(err);
      } else {
        copyFromArray(files, from, to, options, callback);
      }
    });
  }

  function copyFromArray(files, from, to, options, callback) {
    if (files.length === 0) {
      callback(null);
    } else {
      var f = files.shift();
      copydir(path__default["default"].join(from, f), path__default["default"].join(to, f), options, function (err) {
        if (err) {
          callback(err);
        } else {
          copyFromArray(files, from, to, options, callback);
        }
      });
    }
  }

  function chmod(f, mode, callback) {
    if (mode) {
      fs__default["default"].chmod(f, mode, callback);
    } else {
      callback();
    }
  }

  function utimes(f, mode, callback) {
    if (mode) {
      fs__default["default"].utimes(f, mode.atime, mode.mtime, callback);
    } else {
      callback();
    }
  }

  function writeFile(from, to, options, stats, callback) {
    fs__default["default"].readFile(from, 'binary', function (err, data) {
      if (err) {
        callback(err);
      } else {
        fs__default["default"].writeFile(to, data, 'binary', function (err) {
          if (err) {
            callback(err);
          } else {
            options.debug && console.log('>> ' + to);
            rewrite(to, options, stats, callback);
          }
        });
      }
    });
  }

  function rewrite(f, options, stats, callback) {
    if (options.cover) {
      chmod(f, options.mode === true ? stats.mode : options.mode, function (err) {
        if (err) {
          callback(err);
        } else {
          utimes(f, options.utimes === true ? {
            atime: stats.atime,
            mtime: stats.mtime
          } : options.utimes, callback);
        }
      });
    } else {
      callback();
    }
  }

  var copydir_1 = copydir;

  /*
    options: {
      utimes: false,  // Boolean | Object, keep utimes if true
      mode: false,    // Boolean | Number, keep file mode if true
      cover: true,    // Boolean, cover if file exists
      filter: true,   // Boolean | Function, file filter
    }
  */

  function copydirSync(from, to, options) {
    if (typeof options === 'function') {
      options = {
        filter: options
      };
    }

    if (typeof options === 'undefined') options = {};

    if (typeof options.cover === 'undefined') {
      options.cover = true;
    }

    options.filter = typeof options.filter === 'function' ? options.filter : function (state, filepath, filename) {
      return options.filter;
    };
    var stats = fs__default["default"].lstatSync(from);
    var statsname = stats.isDirectory() ? 'directory' : stats.isFile() ? 'file' : stats.isSymbolicLink() ? 'symbolicLink' : '';
    var valid = options.filter(statsname, from, path__default["default"].basename(from));

    if (statsname === 'directory' || statsname === 'symbolicLink') {
      // Directory or SymbolicLink
      if (valid) {
        try {
          fs__default["default"].statSync(to);
        } catch (err) {
          if (err.code === 'ENOENT') {
            fs__default["default"].mkdirSync(to);
            options.debug && console.log('>> ' + to);
          } else {
            throw err;
          }
        }

        rewriteSync(to, options, stats);
        listDirectorySync(from, to, options);
      }
    } else if (stats.isFile()) {
      // File
      if (valid) {
        if (options.cover) {
          writeFileSync(from, to, options, stats);
        } else {
          try {
            fs__default["default"].statSync(to);
          } catch (err) {
            if (err.code === 'ENOENT') {
              writeFileSync(from, to, options, stats);
            } else {
              throw err;
            }
          }
        }
      }
    } else {
      throw new Error('stats invalid: ' + from);
    }
  }

  function listDirectorySync(from, to, options) {
    var files = fs__default["default"].readdirSync(from);
    copyFromArraySync(files, from, to, options);
  }

  function copyFromArraySync(files, from, to, options) {
    if (files.length === 0) return true;
    var f = files.shift();
    copydirSync(path__default["default"].join(from, f), path__default["default"].join(to, f), options);
    copyFromArraySync(files, from, to, options);
  }

  function writeFileSync(from, to, options, stats) {
    fs__default["default"].writeFileSync(to, fs__default["default"].readFileSync(from, 'binary'), 'binary');
    options.debug && console.log('>> ' + to);
    rewriteSync(to, options, stats);
  }

  function rewriteSync(f, options, stats, callback) {
    if (options.cover) {
      var mode = options.mode === true ? stats.mode : options.mode;
      var utimes = options.utimes === true ? {
        atime: stats.atime,
        mtime: stats.mtime
      } : options.utimes;
      mode && fs__default["default"].chmodSync(f, mode);
      utimes && fs__default["default"].utimesSync(f, utimes.atime, utimes.mtime);
    }

    return true;
  }

  var copydirSync_1 = copydirSync;

  copydir_1.sync = copydirSync_1;
  var copyDir$1 = copydir_1;

  var semver = createCommonjsModule(function (module, exports) {
    exports = module.exports = SemVer;
    var debug;
    /* istanbul ignore next */

    if ((typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object' && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
      debug = function debug() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift('SEMVER');
        console.log.apply(console, args);
      };
    } else {
      debug = function debug() {};
    } // Note: this is the semver.org version of the spec that it implements
    // Not necessarily the package version of this code.


    exports.SEMVER_SPEC_VERSION = '2.0.0';
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
    /* istanbul ignore next */
    9007199254740991; // Max safe segment length for coercion.

    var MAX_SAFE_COMPONENT_LENGTH = 16; // The actual regexps go on exports.re

    var re = exports.re = [];
    var src = exports.src = [];
    var t = exports.tokens = {};
    var R = 0;

    function tok(n) {
      t[n] = R++;
    } // The following Regular Expressions can be used for tokenizing,
    // validating, and parsing SemVer version strings.
    // ## Numeric Identifier
    // A single `0`, or a non-zero digit followed by zero or more digits.


    tok('NUMERICIDENTIFIER');
    src[t.NUMERICIDENTIFIER] = '0|[1-9]\\d*';
    tok('NUMERICIDENTIFIERLOOSE');
    src[t.NUMERICIDENTIFIERLOOSE] = '[0-9]+'; // ## Non-numeric Identifier
    // Zero or more digits, followed by a letter or hyphen, and then zero or
    // more letters, digits, or hyphens.

    tok('NONNUMERICIDENTIFIER');
    src[t.NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'; // ## Main Version
    // Three dot-separated numeric identifiers.

    tok('MAINVERSION');
    src[t.MAINVERSION] = '(' + src[t.NUMERICIDENTIFIER] + ')\\.' + '(' + src[t.NUMERICIDENTIFIER] + ')\\.' + '(' + src[t.NUMERICIDENTIFIER] + ')';
    tok('MAINVERSIONLOOSE');
    src[t.MAINVERSIONLOOSE] = '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')\\.' + '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')\\.' + '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')'; // ## Pre-release Version Identifier
    // A numeric identifier, or a non-numeric identifier.

    tok('PRERELEASEIDENTIFIER');
    src[t.PRERELEASEIDENTIFIER] = '(?:' + src[t.NUMERICIDENTIFIER] + '|' + src[t.NONNUMERICIDENTIFIER] + ')';
    tok('PRERELEASEIDENTIFIERLOOSE');
    src[t.PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[t.NUMERICIDENTIFIERLOOSE] + '|' + src[t.NONNUMERICIDENTIFIER] + ')'; // ## Pre-release Version
    // Hyphen, followed by one or more dot-separated pre-release version
    // identifiers.

    tok('PRERELEASE');
    src[t.PRERELEASE] = '(?:-(' + src[t.PRERELEASEIDENTIFIER] + '(?:\\.' + src[t.PRERELEASEIDENTIFIER] + ')*))';
    tok('PRERELEASELOOSE');
    src[t.PRERELEASELOOSE] = '(?:-?(' + src[t.PRERELEASEIDENTIFIERLOOSE] + '(?:\\.' + src[t.PRERELEASEIDENTIFIERLOOSE] + ')*))'; // ## Build Metadata Identifier
    // Any combination of digits, letters, or hyphens.

    tok('BUILDIDENTIFIER');
    src[t.BUILDIDENTIFIER] = '[0-9A-Za-z-]+'; // ## Build Metadata
    // Plus sign, followed by one or more period-separated build metadata
    // identifiers.

    tok('BUILD');
    src[t.BUILD] = '(?:\\+(' + src[t.BUILDIDENTIFIER] + '(?:\\.' + src[t.BUILDIDENTIFIER] + ')*))'; // ## Full Version String
    // A main version, followed optionally by a pre-release version and
    // build metadata.
    // Note that the only major, minor, patch, and pre-release sections of
    // the version string are capturing groups.  The build metadata is not a
    // capturing group, because it should not ever be used in version
    // comparison.

    tok('FULL');
    tok('FULLPLAIN');
    src[t.FULLPLAIN] = 'v?' + src[t.MAINVERSION] + src[t.PRERELEASE] + '?' + src[t.BUILD] + '?';
    src[t.FULL] = '^' + src[t.FULLPLAIN] + '$'; // like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
    // also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
    // common in the npm registry.

    tok('LOOSEPLAIN');
    src[t.LOOSEPLAIN] = '[v=\\s]*' + src[t.MAINVERSIONLOOSE] + src[t.PRERELEASELOOSE] + '?' + src[t.BUILD] + '?';
    tok('LOOSE');
    src[t.LOOSE] = '^' + src[t.LOOSEPLAIN] + '$';
    tok('GTLT');
    src[t.GTLT] = '((?:<|>)?=?)'; // Something like "2.*" or "1.2.x".
    // Note that "x.x" is a valid xRange identifer, meaning "any version"
    // Only the first item is strictly required.

    tok('XRANGEIDENTIFIERLOOSE');
    src[t.XRANGEIDENTIFIERLOOSE] = src[t.NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
    tok('XRANGEIDENTIFIER');
    src[t.XRANGEIDENTIFIER] = src[t.NUMERICIDENTIFIER] + '|x|X|\\*';
    tok('XRANGEPLAIN');
    src[t.XRANGEPLAIN] = '[v=\\s]*(' + src[t.XRANGEIDENTIFIER] + ')' + '(?:\\.(' + src[t.XRANGEIDENTIFIER] + ')' + '(?:\\.(' + src[t.XRANGEIDENTIFIER] + ')' + '(?:' + src[t.PRERELEASE] + ')?' + src[t.BUILD] + '?' + ')?)?';
    tok('XRANGEPLAINLOOSE');
    src[t.XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' + '(?:\\.(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' + '(?:\\.(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' + '(?:' + src[t.PRERELEASELOOSE] + ')?' + src[t.BUILD] + '?' + ')?)?';
    tok('XRANGE');
    src[t.XRANGE] = '^' + src[t.GTLT] + '\\s*' + src[t.XRANGEPLAIN] + '$';
    tok('XRANGELOOSE');
    src[t.XRANGELOOSE] = '^' + src[t.GTLT] + '\\s*' + src[t.XRANGEPLAINLOOSE] + '$'; // Coercion.
    // Extract anything that could conceivably be a part of a valid semver

    tok('COERCE');
    src[t.COERCE] = '(^|[^\\d])' + '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' + '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' + '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' + '(?:$|[^\\d])';
    tok('COERCERTL');
    re[t.COERCERTL] = new RegExp(src[t.COERCE], 'g'); // Tilde ranges.
    // Meaning is "reasonably at or greater than"

    tok('LONETILDE');
    src[t.LONETILDE] = '(?:~>?)';
    tok('TILDETRIM');
    src[t.TILDETRIM] = '(\\s*)' + src[t.LONETILDE] + '\\s+';
    re[t.TILDETRIM] = new RegExp(src[t.TILDETRIM], 'g');
    var tildeTrimReplace = '$1~';
    tok('TILDE');
    src[t.TILDE] = '^' + src[t.LONETILDE] + src[t.XRANGEPLAIN] + '$';
    tok('TILDELOOSE');
    src[t.TILDELOOSE] = '^' + src[t.LONETILDE] + src[t.XRANGEPLAINLOOSE] + '$'; // Caret ranges.
    // Meaning is "at least and backwards compatible with"

    tok('LONECARET');
    src[t.LONECARET] = '(?:\\^)';
    tok('CARETTRIM');
    src[t.CARETTRIM] = '(\\s*)' + src[t.LONECARET] + '\\s+';
    re[t.CARETTRIM] = new RegExp(src[t.CARETTRIM], 'g');
    var caretTrimReplace = '$1^';
    tok('CARET');
    src[t.CARET] = '^' + src[t.LONECARET] + src[t.XRANGEPLAIN] + '$';
    tok('CARETLOOSE');
    src[t.CARETLOOSE] = '^' + src[t.LONECARET] + src[t.XRANGEPLAINLOOSE] + '$'; // A simple gt/lt/eq thing, or just "" to indicate "any version"

    tok('COMPARATORLOOSE');
    src[t.COMPARATORLOOSE] = '^' + src[t.GTLT] + '\\s*(' + src[t.LOOSEPLAIN] + ')$|^$';
    tok('COMPARATOR');
    src[t.COMPARATOR] = '^' + src[t.GTLT] + '\\s*(' + src[t.FULLPLAIN] + ')$|^$'; // An expression to strip any whitespace between the gtlt and the thing
    // it modifies, so that `> 1.2.3` ==> `>1.2.3`

    tok('COMPARATORTRIM');
    src[t.COMPARATORTRIM] = '(\\s*)' + src[t.GTLT] + '\\s*(' + src[t.LOOSEPLAIN] + '|' + src[t.XRANGEPLAIN] + ')'; // this one has to use the /g flag

    re[t.COMPARATORTRIM] = new RegExp(src[t.COMPARATORTRIM], 'g');
    var comparatorTrimReplace = '$1$2$3'; // Something like `1.2.3 - 1.2.4`
    // Note that these all use the loose form, because they'll be
    // checked against either the strict or loose comparator form
    // later.

    tok('HYPHENRANGE');
    src[t.HYPHENRANGE] = '^\\s*(' + src[t.XRANGEPLAIN] + ')' + '\\s+-\\s+' + '(' + src[t.XRANGEPLAIN] + ')' + '\\s*$';
    tok('HYPHENRANGELOOSE');
    src[t.HYPHENRANGELOOSE] = '^\\s*(' + src[t.XRANGEPLAINLOOSE] + ')' + '\\s+-\\s+' + '(' + src[t.XRANGEPLAINLOOSE] + ')' + '\\s*$'; // Star ranges basically just allow anything at all.

    tok('STAR');
    src[t.STAR] = '(<|>)?=?\\s*\\*'; // Compile to actual regexp objects.
    // All are flag-free, unless they were created above with a flag.

    for (var i = 0; i < R; i++) {
      debug(i, src[i]);

      if (!re[i]) {
        re[i] = new RegExp(src[i]);
      }
    }

    exports.parse = parse;

    function parse(version, options) {
      if (!options || _typeof(options) !== 'object') {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }

      if (version instanceof SemVer) {
        return version;
      }

      if (typeof version !== 'string') {
        return null;
      }

      if (version.length > MAX_LENGTH) {
        return null;
      }

      var r = options.loose ? re[t.LOOSE] : re[t.FULL];

      if (!r.test(version)) {
        return null;
      }

      try {
        return new SemVer(version, options);
      } catch (er) {
        return null;
      }
    }

    exports.valid = valid;

    function valid(version, options) {
      var v = parse(version, options);
      return v ? v.version : null;
    }

    exports.clean = clean;

    function clean(version, options) {
      var s = parse(version.trim().replace(/^[=v]+/, ''), options);
      return s ? s.version : null;
    }

    exports.SemVer = SemVer;

    function SemVer(version, options) {
      if (!options || _typeof(options) !== 'object') {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }

      if (version instanceof SemVer) {
        if (version.loose === options.loose) {
          return version;
        } else {
          version = version.version;
        }
      } else if (typeof version !== 'string') {
        throw new TypeError('Invalid Version: ' + version);
      }

      if (version.length > MAX_LENGTH) {
        throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters');
      }

      if (!(this instanceof SemVer)) {
        return new SemVer(version, options);
      }

      debug('SemVer', version, options);
      this.options = options;
      this.loose = !!options.loose;
      var m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);

      if (!m) {
        throw new TypeError('Invalid Version: ' + version);
      }

      this.raw = version; // these are actually numbers

      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];

      if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
        throw new TypeError('Invalid major version');
      }

      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
        throw new TypeError('Invalid minor version');
      }

      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
        throw new TypeError('Invalid patch version');
      } // numberify any prerelease numeric ids


      if (!m[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m[4].split('.').map(function (id) {
          if (/^[0-9]+$/.test(id)) {
            var num = +id;

            if (num >= 0 && num < MAX_SAFE_INTEGER) {
              return num;
            }
          }

          return id;
        });
      }

      this.build = m[5] ? m[5].split('.') : [];
      this.format();
    }

    SemVer.prototype.format = function () {
      this.version = this.major + '.' + this.minor + '.' + this.patch;

      if (this.prerelease.length) {
        this.version += '-' + this.prerelease.join('.');
      }

      return this.version;
    };

    SemVer.prototype.toString = function () {
      return this.version;
    };

    SemVer.prototype.compare = function (other) {
      debug('SemVer.compare', this.version, this.options, other);

      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }

      return this.compareMain(other) || this.comparePre(other);
    };

    SemVer.prototype.compareMain = function (other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }

      return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    };

    SemVer.prototype.comparePre = function (other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      } // NOT having a prerelease is > having one


      if (this.prerelease.length && !other.prerelease.length) {
        return -1;
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1;
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0;
      }

      var i = 0;

      do {
        var a = this.prerelease[i];
        var b = other.prerelease[i];
        debug('prerelease compare', i, a, b);

        if (a === undefined && b === undefined) {
          return 0;
        } else if (b === undefined) {
          return 1;
        } else if (a === undefined) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i);
    };

    SemVer.prototype.compareBuild = function (other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }

      var i = 0;

      do {
        var a = this.build[i];
        var b = other.build[i];
        debug('prerelease compare', i, a, b);

        if (a === undefined && b === undefined) {
          return 0;
        } else if (b === undefined) {
          return 1;
        } else if (a === undefined) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i);
    }; // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.


    SemVer.prototype.inc = function (release, identifier) {
      switch (release) {
        case 'premajor':
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc('pre', identifier);
          break;

        case 'preminor':
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc('pre', identifier);
          break;

        case 'prepatch':
          // If this is already a prerelease, it will bump to the next version
          // drop any prereleases that might already exist, since they are not
          // relevant at this point.
          this.prerelease.length = 0;
          this.inc('patch', identifier);
          this.inc('pre', identifier);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.

        case 'prerelease':
          if (this.prerelease.length === 0) {
            this.inc('patch', identifier);
          }

          this.inc('pre', identifier);
          break;

        case 'major':
          // If this is a pre-major version, bump up to the same major version.
          // Otherwise increment major.
          // 1.0.0-5 bumps to 1.0.0
          // 1.1.0 bumps to 2.0.0
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
            this.major++;
          }

          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;

        case 'minor':
          // If this is a pre-minor version, bump up to the same minor version.
          // Otherwise increment minor.
          // 1.2.0-5 bumps to 1.2.0
          // 1.2.1 bumps to 1.3.0
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }

          this.patch = 0;
          this.prerelease = [];
          break;

        case 'patch':
          // If this is not a pre-release version, it will increment the patch.
          // If it is a pre-release it will bump up to the same patch version.
          // 1.2.0-5 patches to 1.2.0
          // 1.2.0 patches to 1.2.1
          if (this.prerelease.length === 0) {
            this.patch++;
          }

          this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.

        case 'pre':
          if (this.prerelease.length === 0) {
            this.prerelease = [0];
          } else {
            var i = this.prerelease.length;

            while (--i >= 0) {
              if (typeof this.prerelease[i] === 'number') {
                this.prerelease[i]++;
                i = -2;
              }
            }

            if (i === -1) {
              // didn't increment anything
              this.prerelease.push(0);
            }
          }

          if (identifier) {
            // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
            // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
            if (this.prerelease[0] === identifier) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = [identifier, 0];
              }
            } else {
              this.prerelease = [identifier, 0];
            }
          }

          break;

        default:
          throw new Error('invalid increment argument: ' + release);
      }

      this.format();
      this.raw = this.version;
      return this;
    };

    exports.inc = inc;

    function inc(version, release, loose, identifier) {
      if (typeof loose === 'string') {
        identifier = loose;
        loose = undefined;
      }

      try {
        return new SemVer(version, loose).inc(release, identifier).version;
      } catch (er) {
        return null;
      }
    }

    exports.diff = diff;

    function diff(version1, version2) {
      if (eq(version1, version2)) {
        return null;
      } else {
        var v1 = parse(version1);
        var v2 = parse(version2);
        var prefix = '';

        if (v1.prerelease.length || v2.prerelease.length) {
          prefix = 'pre';
          var defaultResult = 'prerelease';
        }

        for (var key in v1) {
          if (key === 'major' || key === 'minor' || key === 'patch') {
            if (v1[key] !== v2[key]) {
              return prefix + key;
            }
          }
        }

        return defaultResult; // may be undefined
      }
    }

    exports.compareIdentifiers = compareIdentifiers;
    var numeric = /^[0-9]+$/;

    function compareIdentifiers(a, b) {
      var anum = numeric.test(a);
      var bnum = numeric.test(b);

      if (anum && bnum) {
        a = +a;
        b = +b;
      }

      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    }

    exports.rcompareIdentifiers = rcompareIdentifiers;

    function rcompareIdentifiers(a, b) {
      return compareIdentifiers(b, a);
    }

    exports.major = major;

    function major(a, loose) {
      return new SemVer(a, loose).major;
    }

    exports.minor = minor;

    function minor(a, loose) {
      return new SemVer(a, loose).minor;
    }

    exports.patch = patch;

    function patch(a, loose) {
      return new SemVer(a, loose).patch;
    }

    exports.compare = compare;

    function compare(a, b, loose) {
      return new SemVer(a, loose).compare(new SemVer(b, loose));
    }

    exports.compareLoose = compareLoose;

    function compareLoose(a, b) {
      return compare(a, b, true);
    }

    exports.compareBuild = compareBuild;

    function compareBuild(a, b, loose) {
      var versionA = new SemVer(a, loose);
      var versionB = new SemVer(b, loose);
      return versionA.compare(versionB) || versionA.compareBuild(versionB);
    }

    exports.rcompare = rcompare;

    function rcompare(a, b, loose) {
      return compare(b, a, loose);
    }

    exports.sort = sort;

    function sort(list, loose) {
      return list.sort(function (a, b) {
        return exports.compareBuild(a, b, loose);
      });
    }

    exports.rsort = rsort;

    function rsort(list, loose) {
      return list.sort(function (a, b) {
        return exports.compareBuild(b, a, loose);
      });
    }

    exports.gt = gt;

    function gt(a, b, loose) {
      return compare(a, b, loose) > 0;
    }

    exports.lt = lt;

    function lt(a, b, loose) {
      return compare(a, b, loose) < 0;
    }

    exports.eq = eq;

    function eq(a, b, loose) {
      return compare(a, b, loose) === 0;
    }

    exports.neq = neq;

    function neq(a, b, loose) {
      return compare(a, b, loose) !== 0;
    }

    exports.gte = gte;

    function gte(a, b, loose) {
      return compare(a, b, loose) >= 0;
    }

    exports.lte = lte;

    function lte(a, b, loose) {
      return compare(a, b, loose) <= 0;
    }

    exports.cmp = cmp;

    function cmp(a, op, b, loose) {
      switch (op) {
        case '===':
          if (_typeof(a) === 'object') a = a.version;
          if (_typeof(b) === 'object') b = b.version;
          return a === b;

        case '!==':
          if (_typeof(a) === 'object') a = a.version;
          if (_typeof(b) === 'object') b = b.version;
          return a !== b;

        case '':
        case '=':
        case '==':
          return eq(a, b, loose);

        case '!=':
          return neq(a, b, loose);

        case '>':
          return gt(a, b, loose);

        case '>=':
          return gte(a, b, loose);

        case '<':
          return lt(a, b, loose);

        case '<=':
          return lte(a, b, loose);

        default:
          throw new TypeError('Invalid operator: ' + op);
      }
    }

    exports.Comparator = Comparator;

    function Comparator(comp, options) {
      if (!options || _typeof(options) !== 'object') {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }

      if (comp instanceof Comparator) {
        if (comp.loose === !!options.loose) {
          return comp;
        } else {
          comp = comp.value;
        }
      }

      if (!(this instanceof Comparator)) {
        return new Comparator(comp, options);
      }

      debug('comparator', comp, options);
      this.options = options;
      this.loose = !!options.loose;
      this.parse(comp);

      if (this.semver === ANY) {
        this.value = '';
      } else {
        this.value = this.operator + this.semver.version;
      }

      debug('comp', this);
    }

    var ANY = {};

    Comparator.prototype.parse = function (comp) {
      var r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
      var m = comp.match(r);

      if (!m) {
        throw new TypeError('Invalid comparator: ' + comp);
      }

      this.operator = m[1] !== undefined ? m[1] : '';

      if (this.operator === '=') {
        this.operator = '';
      } // if it literally is just '>' or '' then allow anything.


      if (!m[2]) {
        this.semver = ANY;
      } else {
        this.semver = new SemVer(m[2], this.options.loose);
      }
    };

    Comparator.prototype.toString = function () {
      return this.value;
    };

    Comparator.prototype.test = function (version) {
      debug('Comparator.test', version, this.options.loose);

      if (this.semver === ANY || version === ANY) {
        return true;
      }

      if (typeof version === 'string') {
        try {
          version = new SemVer(version, this.options);
        } catch (er) {
          return false;
        }
      }

      return cmp(version, this.operator, this.semver, this.options);
    };

    Comparator.prototype.intersects = function (comp, options) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError('a Comparator is required');
      }

      if (!options || _typeof(options) !== 'object') {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }

      var rangeTmp;

      if (this.operator === '') {
        if (this.value === '') {
          return true;
        }

        rangeTmp = new Range(comp.value, options);
        return satisfies(this.value, rangeTmp, options);
      } else if (comp.operator === '') {
        if (comp.value === '') {
          return true;
        }

        rangeTmp = new Range(this.value, options);
        return satisfies(comp.semver, rangeTmp, options);
      }

      var sameDirectionIncreasing = (this.operator === '>=' || this.operator === '>') && (comp.operator === '>=' || comp.operator === '>');
      var sameDirectionDecreasing = (this.operator === '<=' || this.operator === '<') && (comp.operator === '<=' || comp.operator === '<');
      var sameSemVer = this.semver.version === comp.semver.version;
      var differentDirectionsInclusive = (this.operator === '>=' || this.operator === '<=') && (comp.operator === '>=' || comp.operator === '<=');
      var oppositeDirectionsLessThan = cmp(this.semver, '<', comp.semver, options) && (this.operator === '>=' || this.operator === '>') && (comp.operator === '<=' || comp.operator === '<');
      var oppositeDirectionsGreaterThan = cmp(this.semver, '>', comp.semver, options) && (this.operator === '<=' || this.operator === '<') && (comp.operator === '>=' || comp.operator === '>');
      return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
    };

    exports.Range = Range;

    function Range(range, options) {
      if (!options || _typeof(options) !== 'object') {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }

      if (range instanceof Range) {
        if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
          return range;
        } else {
          return new Range(range.raw, options);
        }
      }

      if (range instanceof Comparator) {
        return new Range(range.value, options);
      }

      if (!(this instanceof Range)) {
        return new Range(range, options);
      }

      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease; // First, split based on boolean or ||

      this.raw = range;
      this.set = range.split(/\s*\|\|\s*/).map(function (range) {
        return this.parseRange(range.trim());
      }, this).filter(function (c) {
        // throw out any that are not relevant for whatever reason
        return c.length;
      });

      if (!this.set.length) {
        throw new TypeError('Invalid SemVer Range: ' + range);
      }

      this.format();
    }

    Range.prototype.format = function () {
      this.range = this.set.map(function (comps) {
        return comps.join(' ').trim();
      }).join('||').trim();
      return this.range;
    };

    Range.prototype.toString = function () {
      return this.range;
    };

    Range.prototype.parseRange = function (range) {
      var loose = this.options.loose;
      range = range.trim(); // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`

      var hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
      range = range.replace(hr, hyphenReplace);
      debug('hyphen replace', range); // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`

      range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
      debug('comparator trim', range, re[t.COMPARATORTRIM]); // `~ 1.2.3` => `~1.2.3`

      range = range.replace(re[t.TILDETRIM], tildeTrimReplace); // `^ 1.2.3` => `^1.2.3`

      range = range.replace(re[t.CARETTRIM], caretTrimReplace); // normalize spaces

      range = range.split(/\s+/).join(' '); // At this point, the range is completely trimmed and
      // ready to be split into comparators.

      var compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
      var set = range.split(' ').map(function (comp) {
        return parseComparator(comp, this.options);
      }, this).join(' ').split(/\s+/);

      if (this.options.loose) {
        // in loose mode, throw out any that are not valid comparators
        set = set.filter(function (comp) {
          return !!comp.match(compRe);
        });
      }

      set = set.map(function (comp) {
        return new Comparator(comp, this.options);
      }, this);
      return set;
    };

    Range.prototype.intersects = function (range, options) {
      if (!(range instanceof Range)) {
        throw new TypeError('a Range is required');
      }

      return this.set.some(function (thisComparators) {
        return isSatisfiable(thisComparators, options) && range.set.some(function (rangeComparators) {
          return isSatisfiable(rangeComparators, options) && thisComparators.every(function (thisComparator) {
            return rangeComparators.every(function (rangeComparator) {
              return thisComparator.intersects(rangeComparator, options);
            });
          });
        });
      });
    }; // take a set of comparators and determine whether there
    // exists a version which can satisfy it


    function isSatisfiable(comparators, options) {
      var result = true;
      var remainingComparators = comparators.slice();
      var testComparator = remainingComparators.pop();

      while (result && remainingComparators.length) {
        result = remainingComparators.every(function (otherComparator) {
          return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
      }

      return result;
    } // Mostly just for testing and legacy API reasons


    exports.toComparators = toComparators;

    function toComparators(range, options) {
      return new Range(range, options).set.map(function (comp) {
        return comp.map(function (c) {
          return c.value;
        }).join(' ').trim().split(' ');
      });
    } // comprised of xranges, tildes, stars, and gtlt's at this point.
    // already replaced the hyphen ranges
    // turn into a set of JUST comparators.


    function parseComparator(comp, options) {
      debug('comp', comp, options);
      comp = replaceCarets(comp, options);
      debug('caret', comp);
      comp = replaceTildes(comp, options);
      debug('tildes', comp);
      comp = replaceXRanges(comp, options);
      debug('xrange', comp);
      comp = replaceStars(comp, options);
      debug('stars', comp);
      return comp;
    }

    function isX(id) {
      return !id || id.toLowerCase() === 'x' || id === '*';
    } // ~, ~> --> * (any, kinda silly)
    // ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
    // ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
    // ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
    // ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
    // ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0


    function replaceTildes(comp, options) {
      return comp.trim().split(/\s+/).map(function (comp) {
        return replaceTilde(comp, options);
      }).join(' ');
    }

    function replaceTilde(comp, options) {
      var r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
      return comp.replace(r, function (_, M, m, p, pr) {
        debug('tilde', comp, _, M, m, p, pr);
        var ret;

        if (isX(M)) {
          ret = '';
        } else if (isX(m)) {
          ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
        } else if (isX(p)) {
          // ~1.2 == >=1.2.0 <1.3.0
          ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
        } else if (pr) {
          debug('replaceTilde pr', pr);
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr + ' <' + M + '.' + (+m + 1) + '.0';
        } else {
          // ~1.2.3 == >=1.2.3 <1.3.0
          ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';
        }

        debug('tilde return', ret);
        return ret;
      });
    } // ^ --> * (any, kinda silly)
    // ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
    // ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
    // ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
    // ^1.2.3 --> >=1.2.3 <2.0.0
    // ^1.2.0 --> >=1.2.0 <2.0.0


    function replaceCarets(comp, options) {
      return comp.trim().split(/\s+/).map(function (comp) {
        return replaceCaret(comp, options);
      }).join(' ');
    }

    function replaceCaret(comp, options) {
      debug('caret', comp, options);
      var r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
      return comp.replace(r, function (_, M, m, p, pr) {
        debug('caret', comp, _, M, m, p, pr);
        var ret;

        if (isX(M)) {
          ret = '';
        } else if (isX(m)) {
          ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
        } else if (isX(p)) {
          if (M === '0') {
            ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
          } else {
            ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
          }
        } else if (pr) {
          debug('replaceCaret pr', pr);

          if (M === '0') {
            if (m === '0') {
              ret = '>=' + M + '.' + m + '.' + p + '-' + pr + ' <' + M + '.' + m + '.' + (+p + 1);
            } else {
              ret = '>=' + M + '.' + m + '.' + p + '-' + pr + ' <' + M + '.' + (+m + 1) + '.0';
            }
          } else {
            ret = '>=' + M + '.' + m + '.' + p + '-' + pr + ' <' + (+M + 1) + '.0.0';
          }
        } else {
          debug('no pr');

          if (M === '0') {
            if (m === '0') {
              ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + m + '.' + (+p + 1);
            } else {
              ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';
            }
          } else {
            ret = '>=' + M + '.' + m + '.' + p + ' <' + (+M + 1) + '.0.0';
          }
        }

        debug('caret return', ret);
        return ret;
      });
    }

    function replaceXRanges(comp, options) {
      debug('replaceXRanges', comp, options);
      return comp.split(/\s+/).map(function (comp) {
        return replaceXRange(comp, options);
      }).join(' ');
    }

    function replaceXRange(comp, options) {
      comp = comp.trim();
      var r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
      return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
        debug('xRange', comp, ret, gtlt, M, m, p, pr);
        var xM = isX(M);
        var xm = xM || isX(m);
        var xp = xm || isX(p);
        var anyX = xp;

        if (gtlt === '=' && anyX) {
          gtlt = '';
        } // if we're including prereleases in the match, then we need
        // to fix this to -0, the lowest possible prerelease value


        pr = options.includePrerelease ? '-0' : '';

        if (xM) {
          if (gtlt === '>' || gtlt === '<') {
            // nothing is allowed
            ret = '<0.0.0-0';
          } else {
            // nothing is forbidden
            ret = '*';
          }
        } else if (gtlt && anyX) {
          // we know patch is an x, because we have any x at all.
          // replace X with 0
          if (xm) {
            m = 0;
          }

          p = 0;

          if (gtlt === '>') {
            // >1 => >=2.0.0
            // >1.2 => >=1.3.0
            // >1.2.3 => >= 1.2.4
            gtlt = '>=';

            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === '<=') {
            // <=0.7.x is actually <0.8.0, since any 0.7.x should
            // pass.  Similarly, <=7.x is actually <8.0.0, etc.
            gtlt = '<';

            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }

          ret = gtlt + M + '.' + m + '.' + p + pr;
        } else if (xm) {
          ret = '>=' + M + '.0.0' + pr + ' <' + (+M + 1) + '.0.0' + pr;
        } else if (xp) {
          ret = '>=' + M + '.' + m + '.0' + pr + ' <' + M + '.' + (+m + 1) + '.0' + pr;
        }

        debug('xRange return', ret);
        return ret;
      });
    } // Because * is AND-ed with everything else in the comparator,
    // and '' means "any version", just remove the *s entirely.


    function replaceStars(comp, options) {
      debug('replaceStars', comp, options); // Looseness is ignored here.  star is always as loose as it gets!

      return comp.trim().replace(re[t.STAR], '');
    } // This function is passed to string.replace(re[t.HYPHENRANGE])
    // M, m, patch, prerelease, build
    // 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
    // 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
    // 1.2 - 3.4 => >=1.2.0 <3.5.0


    function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
      if (isX(fM)) {
        from = '';
      } else if (isX(fm)) {
        from = '>=' + fM + '.0.0';
      } else if (isX(fp)) {
        from = '>=' + fM + '.' + fm + '.0';
      } else {
        from = '>=' + from;
      }

      if (isX(tM)) {
        to = '';
      } else if (isX(tm)) {
        to = '<' + (+tM + 1) + '.0.0';
      } else if (isX(tp)) {
        to = '<' + tM + '.' + (+tm + 1) + '.0';
      } else if (tpr) {
        to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
      } else {
        to = '<=' + to;
      }

      return (from + ' ' + to).trim();
    } // if ANY of the sets match ALL of its comparators, then pass


    Range.prototype.test = function (version) {
      if (!version) {
        return false;
      }

      if (typeof version === 'string') {
        try {
          version = new SemVer(version, this.options);
        } catch (er) {
          return false;
        }
      }

      for (var i = 0; i < this.set.length; i++) {
        if (testSet(this.set[i], version, this.options)) {
          return true;
        }
      }

      return false;
    };

    function testSet(set, version, options) {
      for (var i = 0; i < set.length; i++) {
        if (!set[i].test(version)) {
          return false;
        }
      }

      if (version.prerelease.length && !options.includePrerelease) {
        // Find the set of versions that are allowed to have prereleases
        // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
        // That should allow `1.2.3-pr.2` to pass.
        // However, `1.2.4-alpha.notready` should NOT be allowed,
        // even though it's within the range set by the comparators.
        for (i = 0; i < set.length; i++) {
          debug(set[i].semver);

          if (set[i].semver === ANY) {
            continue;
          }

          if (set[i].semver.prerelease.length > 0) {
            var allowed = set[i].semver;

            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        } // Version has a -pre, but it's not one of the ones we like.


        return false;
      }

      return true;
    }

    exports.satisfies = satisfies;

    function satisfies(version, range, options) {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }

      return range.test(version);
    }

    exports.maxSatisfying = maxSatisfying;

    function maxSatisfying(versions, range, options) {
      var max = null;
      var maxSV = null;

      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }

      versions.forEach(function (v) {
        if (rangeObj.test(v)) {
          // satisfies(v, range, options)
          if (!max || maxSV.compare(v) === -1) {
            // compare(max, v, true)
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    }

    exports.minSatisfying = minSatisfying;

    function minSatisfying(versions, range, options) {
      var min = null;
      var minSV = null;

      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }

      versions.forEach(function (v) {
        if (rangeObj.test(v)) {
          // satisfies(v, range, options)
          if (!min || minSV.compare(v) === 1) {
            // compare(min, v, true)
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    }

    exports.minVersion = minVersion;

    function minVersion(range, loose) {
      range = new Range(range, loose);
      var minver = new SemVer('0.0.0');

      if (range.test(minver)) {
        return minver;
      }

      minver = new SemVer('0.0.0-0');

      if (range.test(minver)) {
        return minver;
      }

      minver = null;

      for (var i = 0; i < range.set.length; ++i) {
        var comparators = range.set[i];
        comparators.forEach(function (comparator) {
          // Clone to avoid manipulating the comparator's semver object.
          var compver = new SemVer(comparator.semver.version);

          switch (comparator.operator) {
            case '>':
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }

              compver.raw = compver.format();

            /* fallthrough */

            case '':
            case '>=':
              if (!minver || gt(minver, compver)) {
                minver = compver;
              }

              break;

            case '<':
            case '<=':
              /* Ignore maximum versions */
              break;

            /* istanbul ignore next */

            default:
              throw new Error('Unexpected operation: ' + comparator.operator);
          }
        });
      }

      if (minver && range.test(minver)) {
        return minver;
      }

      return null;
    }

    exports.validRange = validRange;

    function validRange(range, options) {
      try {
        // Return '*' instead of '' so that truthiness works.
        // This will throw if it's invalid anyway
        return new Range(range, options).range || '*';
      } catch (er) {
        return null;
      }
    } // Determine if version is less than all the versions possible in the range


    exports.ltr = ltr;

    function ltr(version, range, options) {
      return outside(version, range, '<', options);
    } // Determine if version is greater than all the versions possible in the range.


    exports.gtr = gtr;

    function gtr(version, range, options) {
      return outside(version, range, '>', options);
    }

    exports.outside = outside;

    function outside(version, range, hilo, options) {
      version = new SemVer(version, options);
      range = new Range(range, options);
      var gtfn, ltefn, ltfn, comp, ecomp;

      switch (hilo) {
        case '>':
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = '>';
          ecomp = '>=';
          break;

        case '<':
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = '<';
          ecomp = '<=';
          break;

        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      } // If it satisifes the range it is not outside


      if (satisfies(version, range, options)) {
        return false;
      } // From now on, variable terms are as if we're in "gtr" mode.
      // but note that everything is flipped for the "ltr" function.


      for (var i = 0; i < range.set.length; ++i) {
        var comparators = range.set[i];
        var high = null;
        var low = null;
        comparators.forEach(function (comparator) {
          if (comparator.semver === ANY) {
            comparator = new Comparator('>=0.0.0');
          }

          high = high || comparator;
          low = low || comparator;

          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        }); // If the edge version comparator has a operator then our version
        // isn't outside it

        if (high.operator === comp || high.operator === ecomp) {
          return false;
        } // If the lowest version comparator has an operator and our version
        // is less than it then it isn't higher than the range


        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }

      return true;
    }

    exports.prerelease = prerelease;

    function prerelease(version, options) {
      var parsed = parse(version, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    }

    exports.intersects = intersects;

    function intersects(r1, r2, options) {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2);
    }

    exports.coerce = coerce;

    function coerce(version, options) {
      if (version instanceof SemVer) {
        return version;
      }

      if (typeof version === 'number') {
        version = String(version);
      }

      if (typeof version !== 'string') {
        return null;
      }

      options = options || {};
      var match = null;

      if (!options.rtl) {
        match = version.match(re[t.COERCE]);
      } else {
        // Find the right-most coercible string that does not share
        // a terminus with a more left-ward coercible string.
        // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
        //
        // Walk through the string checking with a /g regexp
        // Manually set the index so as to pick up overlapping matches.
        // Stop when we get a match that ends at the string end, since no
        // coercible string can be more right-ward without the same terminus.
        var next;

        while ((next = re[t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)) {
          if (!match || next.index + next[0].length !== match.index + match[0].length) {
            match = next;
          }

          re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
        } // leave it in a clean state


        re[t.COERCERTL].lastIndex = -1;
      }

      if (match === null) {
        return null;
      }

      return parse(match[2] + '.' + (match[3] || '0') + '.' + (match[4] || '0'), options);
    }
  });

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

  var promisify = require$$0__default["default"].promisify;
  var useNativeRecursiveOption = semver.satisfies(process.version, '>=10.12.0'); // https://github.com/nodejs/node/issues/8987
  // https://github.com/libuv/libuv/pull/1088

  var checkPath = function checkPath(pth) {
    if (process.platform === 'win32') {
      var pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path__default["default"].parse(pth).root, ''));

      if (pathHasInvalidWinCharacters) {
        var error = new Error("Path contains invalid characters: ".concat(pth));
        error.code = 'EINVAL';
        throw error;
      }
    }
  };

  var processOptions = function processOptions(options) {
    // https://github.com/sindresorhus/make-dir/issues/18
    var defaults = {
      mode: 511,
      fs: fs__default["default"]
    };
    return _objectSpread$1(_objectSpread$1({}, defaults), options);
  };

  var permissionError = function permissionError(pth) {
    // This replicates the exception of `fs.mkdir` with native the
    // `recusive` option when run on an invalid drive under Windows.
    var error = new Error("operation not permitted, mkdir '".concat(pth, "'"));
    error.code = 'EPERM';
    error.errno = -4048;
    error.path = pth;
    error.syscall = 'mkdir';
    return error;
  };

  var makeDir = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(input, options) {
      var mkdir, stat, pth, make;
      return regenerator.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              checkPath(input);
              options = processOptions(options);
              mkdir = promisify(options.fs.mkdir);
              stat = promisify(options.fs.stat);

              if (!(useNativeRecursiveOption && options.fs.mkdir === fs__default["default"].mkdir)) {
                _context2.next = 9;
                break;
              }

              pth = path__default["default"].resolve(input);
              _context2.next = 8;
              return mkdir(pth, {
                mode: options.mode,
                recursive: true
              });

            case 8:
              return _context2.abrupt("return", pth);

            case 9:
              make = /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(pth) {
                  var stats;
                  return regenerator.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.prev = 0;
                          _context.next = 3;
                          return mkdir(pth, options.mode);

                        case 3:
                          return _context.abrupt("return", pth);

                        case 6:
                          _context.prev = 6;
                          _context.t0 = _context["catch"](0);

                          if (!(_context.t0.code === 'EPERM')) {
                            _context.next = 10;
                            break;
                          }

                          throw _context.t0;

                        case 10:
                          if (!(_context.t0.code === 'ENOENT')) {
                            _context.next = 18;
                            break;
                          }

                          if (!(path__default["default"].dirname(pth) === pth)) {
                            _context.next = 13;
                            break;
                          }

                          throw permissionError(pth);

                        case 13:
                          if (!_context.t0.message.includes('null bytes')) {
                            _context.next = 15;
                            break;
                          }

                          throw _context.t0;

                        case 15:
                          _context.next = 17;
                          return make(path__default["default"].dirname(pth));

                        case 17:
                          return _context.abrupt("return", make(pth));

                        case 18:
                          _context.prev = 18;
                          _context.next = 21;
                          return stat(pth);

                        case 21:
                          stats = _context.sent;

                          if (stats.isDirectory()) {
                            _context.next = 24;
                            break;
                          }

                          throw new Error('The path is not a directory');

                        case 24:
                          _context.next = 29;
                          break;

                        case 26:
                          _context.prev = 26;
                          _context.t1 = _context["catch"](18);
                          throw _context.t0;

                        case 29:
                          return _context.abrupt("return", pth);

                        case 30:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[0, 6], [18, 26]]);
                }));

                return function make(_x3) {
                  return _ref2.apply(this, arguments);
                };
              }();

              return _context2.abrupt("return", make(path__default["default"].resolve(input)));

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function makeDir(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var makeDir_1 = makeDir;

  var sync$1 = function sync(input, options) {
    checkPath(input);
    options = processOptions(options);

    if (useNativeRecursiveOption && options.fs.mkdirSync === fs__default["default"].mkdirSync) {
      var pth = path__default["default"].resolve(input);
      fs__default["default"].mkdirSync(pth, {
        mode: options.mode,
        recursive: true
      });
      return pth;
    }

    var make = function make(pth) {
      try {
        options.fs.mkdirSync(pth, options.mode);
      } catch (error) {
        if (error.code === 'EPERM') {
          throw error;
        }

        if (error.code === 'ENOENT') {
          if (path__default["default"].dirname(pth) === pth) {
            throw permissionError(pth);
          }

          if (error.message.includes('null bytes')) {
            throw error;
          }

          make(path__default["default"].dirname(pth));
          return make(pth);
        }

        try {
          if (!options.fs.statSync(pth).isDirectory()) {
            throw new Error('The path is not a directory');
          }
        } catch (_) {
          throw error;
        }
      }

      return pth;
    };

    return make(path__default["default"].resolve(input));
  };
  makeDir_1.sync = sync$1;

  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.

  var isWindows$1 = process.platform === 'win32'; // JavaScript implementation of realpath, ported from node pre-v6

  var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

  function rethrow() {
    // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
    // is fairly slow to generate.
    var callback;

    if (DEBUG) {
      var backtrace = new Error();
      callback = debugCallback;
    } else callback = missingCallback;

    return callback;

    function debugCallback(err) {
      if (err) {
        backtrace.message = err.message;
        err = backtrace;
        missingCallback(err);
      }
    }

    function missingCallback(err) {
      if (err) {
        if (process.throwDeprecation) throw err; // Forgot a callback but don't know where? Use NODE_DEBUG=fs
        else if (!process.noDeprecation) {
          var msg = 'fs: missing callback ' + (err.stack || err.message);
          if (process.traceDeprecation) console.trace(msg);else console.error(msg);
        }
      }
    }
  }

  function maybeCallback(cb) {
    return typeof cb === 'function' ? cb : rethrow();
  }

  path__default["default"].normalize; // Regexp that finds the next partion of a (partial) path
  // result is [base_with_slash, base], e.g. ['somedir/', 'somedir']

  if (isWindows$1) {
    var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
  } else {
    var nextPartRe = /(.*?)(?:[\/]+|$)/g;
  } // Regex to find the device root, including trailing slash. E.g. 'c:\\'.


  if (isWindows$1) {
    var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
  } else {
    var splitRootRe = /^[\/]*/;
  }

  var realpathSync$1 = function realpathSync(p, cache) {
    // make p is absolute
    p = path__default["default"].resolve(p);

    if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
      return cache[p];
    }

    var original = p,
        seenLinks = {},
        knownHard = {}; // current character position in p

    var pos; // the partial path so far, including a trailing slash if any

    var current; // the partial path without a trailing slash (except when pointing at a root)

    var base; // the partial path scanned in the previous round, with slash

    var previous;
    start();

    function start() {
      // Skip over roots
      var m = splitRootRe.exec(p);
      pos = m[0].length;
      current = m[0];
      base = m[0];
      previous = ''; // On windows, check that the root exists. On unix there is no need.

      if (isWindows$1 && !knownHard[base]) {
        fs__default["default"].lstatSync(base);
        knownHard[base] = true;
      }
    } // walk down the path, swapping out linked pathparts for their real
    // values
    // NB: p.length changes.


    while (pos < p.length) {
      // find the next part
      nextPartRe.lastIndex = pos;
      var result = nextPartRe.exec(p);
      previous = current;
      current += result[0];
      base = previous + result[1];
      pos = nextPartRe.lastIndex; // continue if not a symlink

      if (knownHard[base] || cache && cache[base] === base) {
        continue;
      }

      var resolvedLink;

      if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
        // some known symbolic link.  no need to stat again.
        resolvedLink = cache[base];
      } else {
        var stat = fs__default["default"].lstatSync(base);

        if (!stat.isSymbolicLink()) {
          knownHard[base] = true;
          if (cache) cache[base] = base;
          continue;
        } // read the link if it wasn't read before
        // dev/ino always return 0 on windows, so skip the check.


        var linkTarget = null;

        if (!isWindows$1) {
          var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);

          if (seenLinks.hasOwnProperty(id)) {
            linkTarget = seenLinks[id];
          }
        }

        if (linkTarget === null) {
          fs__default["default"].statSync(base);
          linkTarget = fs__default["default"].readlinkSync(base);
        }

        resolvedLink = path__default["default"].resolve(previous, linkTarget); // track this, if given a cache.

        if (cache) cache[base] = resolvedLink;
        if (!isWindows$1) seenLinks[id] = linkTarget;
      } // resolve the link, then start over


      p = path__default["default"].resolve(resolvedLink, p.slice(pos));
      start();
    }

    if (cache) cache[original] = p;
    return p;
  };

  var realpath$1 = function realpath(p, cache, cb) {
    if (typeof cb !== 'function') {
      cb = maybeCallback(cache);
      cache = null;
    } // make p is absolute


    p = path__default["default"].resolve(p);

    if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
      return process.nextTick(cb.bind(null, null, cache[p]));
    }

    var original = p,
        seenLinks = {},
        knownHard = {}; // current character position in p

    var pos; // the partial path so far, including a trailing slash if any

    var current; // the partial path without a trailing slash (except when pointing at a root)

    var base; // the partial path scanned in the previous round, with slash

    var previous;
    start();

    function start() {
      // Skip over roots
      var m = splitRootRe.exec(p);
      pos = m[0].length;
      current = m[0];
      base = m[0];
      previous = ''; // On windows, check that the root exists. On unix there is no need.

      if (isWindows$1 && !knownHard[base]) {
        fs__default["default"].lstat(base, function (err) {
          if (err) return cb(err);
          knownHard[base] = true;
          LOOP();
        });
      } else {
        process.nextTick(LOOP);
      }
    } // walk down the path, swapping out linked pathparts for their real
    // values


    function LOOP() {
      // stop if scanned past end of path
      if (pos >= p.length) {
        if (cache) cache[original] = p;
        return cb(null, p);
      } // find the next part


      nextPartRe.lastIndex = pos;
      var result = nextPartRe.exec(p);
      previous = current;
      current += result[0];
      base = previous + result[1];
      pos = nextPartRe.lastIndex; // continue if not a symlink

      if (knownHard[base] || cache && cache[base] === base) {
        return process.nextTick(LOOP);
      }

      if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
        // known symbolic link.  no need to stat again.
        return gotResolvedLink(cache[base]);
      }

      return fs__default["default"].lstat(base, gotStat);
    }

    function gotStat(err, stat) {
      if (err) return cb(err); // if not a symlink, skip to the next path part

      if (!stat.isSymbolicLink()) {
        knownHard[base] = true;
        if (cache) cache[base] = base;
        return process.nextTick(LOOP);
      } // stat & read the link if not read before
      // call gotTarget as soon as the link target is known
      // dev/ino always return 0 on windows, so skip the check.


      if (!isWindows$1) {
        var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);

        if (seenLinks.hasOwnProperty(id)) {
          return gotTarget(null, seenLinks[id], base);
        }
      }

      fs__default["default"].stat(base, function (err) {
        if (err) return cb(err);
        fs__default["default"].readlink(base, function (err, target) {
          if (!isWindows$1) seenLinks[id] = target;
          gotTarget(err, target);
        });
      });
    }

    function gotTarget(err, target, base) {
      if (err) return cb(err);
      var resolvedLink = path__default["default"].resolve(previous, target);
      if (cache) cache[base] = resolvedLink;
      gotResolvedLink(resolvedLink);
    }

    function gotResolvedLink(resolvedLink) {
      // resolve the link, then start over
      p = path__default["default"].resolve(resolvedLink, p.slice(pos));
      start();
    }
  };

  var old = {
    realpathSync: realpathSync$1,
    realpath: realpath$1
  };

  var fs_realpath = realpath;
  realpath.realpath = realpath;
  realpath.sync = realpathSync;
  realpath.realpathSync = realpathSync;
  realpath.monkeypatch = monkeypatch;
  realpath.unmonkeypatch = unmonkeypatch;
  var origRealpath = fs__default["default"].realpath;
  var origRealpathSync = fs__default["default"].realpathSync;
  var version = process.version;
  var ok = /^v[0-5]\./.test(version);

  function newError(er) {
    return er && er.syscall === 'realpath' && (er.code === 'ELOOP' || er.code === 'ENOMEM' || er.code === 'ENAMETOOLONG');
  }

  function realpath(p, cache, cb) {
    if (ok) {
      return origRealpath(p, cache, cb);
    }

    if (typeof cache === 'function') {
      cb = cache;
      cache = null;
    }

    origRealpath(p, cache, function (er, result) {
      if (newError(er)) {
        old.realpath(p, cache, cb);
      } else {
        cb(er, result);
      }
    });
  }

  function realpathSync(p, cache) {
    if (ok) {
      return origRealpathSync(p, cache);
    }

    try {
      return origRealpathSync(p, cache);
    } catch (er) {
      if (newError(er)) {
        return old.realpathSync(p, cache);
      } else {
        throw er;
      }
    }
  }

  function monkeypatch() {
    fs__default["default"].realpath = realpath;
    fs__default["default"].realpathSync = realpathSync;
  }

  function unmonkeypatch() {
    fs__default["default"].realpath = origRealpath;
    fs__default["default"].realpathSync = origRealpathSync;
  }

  var concatMap = function concatMap(xs, fn) {
    var res = [];

    for (var i = 0; i < xs.length; i++) {
      var x = fn(xs[i], i);
      if (isArray(x)) res.push.apply(res, x);else res.push(x);
    }

    return res;
  };

  var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
  };

  var balancedMatch = balanced;

  function balanced(a, b, str) {
    if (a instanceof RegExp) a = maybeMatch(a, str);
    if (b instanceof RegExp) b = maybeMatch(b, str);
    var r = range(a, b, str);
    return r && {
      start: r[0],
      end: r[1],
      pre: str.slice(0, r[0]),
      body: str.slice(r[0] + a.length, r[1]),
      post: str.slice(r[1] + b.length)
    };
  }

  function maybeMatch(reg, str) {
    var m = str.match(reg);
    return m ? m[0] : null;
  }

  balanced.range = range;

  function range(a, b, str) {
    var begs, beg, left, right, result;
    var ai = str.indexOf(a);
    var bi = str.indexOf(b, ai + 1);
    var i = ai;

    if (ai >= 0 && bi > 0) {
      if (a === b) {
        return [ai, bi];
      }

      begs = [];
      left = str.length;

      while (i >= 0 && !result) {
        if (i == ai) {
          begs.push(i);
          ai = str.indexOf(a, i + 1);
        } else if (begs.length == 1) {
          result = [begs.pop(), bi];
        } else {
          beg = begs.pop();

          if (beg < left) {
            left = beg;
            right = bi;
          }

          bi = str.indexOf(b, i + 1);
        }

        i = ai < bi && ai >= 0 ? ai : bi;
      }

      if (begs.length) {
        result = [left, right];
      }
    }

    return result;
  }

  var braceExpansion = expandTop;
  var escSlash = '\0SLASH' + Math.random() + '\0';
  var escOpen = '\0OPEN' + Math.random() + '\0';
  var escClose = '\0CLOSE' + Math.random() + '\0';
  var escComma = '\0COMMA' + Math.random() + '\0';
  var escPeriod = '\0PERIOD' + Math.random() + '\0';

  function numeric(str) {
    return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
  }

  function escapeBraces(str) {
    return str.split('\\\\').join(escSlash).split('\\{').join(escOpen).split('\\}').join(escClose).split('\\,').join(escComma).split('\\.').join(escPeriod);
  }

  function unescapeBraces(str) {
    return str.split(escSlash).join('\\').split(escOpen).join('{').split(escClose).join('}').split(escComma).join(',').split(escPeriod).join('.');
  } // Basically just str.split(","), but handling cases
  // where we have nested braced sections, which should be
  // treated as individual members, like {a,{b,c},d}


  function parseCommaParts(str) {
    if (!str) return [''];
    var parts = [];
    var m = balancedMatch('{', '}', str);
    if (!m) return str.split(',');
    var pre = m.pre;
    var body = m.body;
    var post = m.post;
    var p = pre.split(',');
    p[p.length - 1] += '{' + body + '}';
    var postParts = parseCommaParts(post);

    if (post.length) {
      p[p.length - 1] += postParts.shift();
      p.push.apply(p, postParts);
    }

    parts.push.apply(parts, p);
    return parts;
  }

  function expandTop(str) {
    if (!str) return []; // I don't know why Bash 4.3 does this, but it does.
    // Anything starting with {} will have the first two bytes preserved
    // but *only* at the top level, so {},a}b will not expand to anything,
    // but a{},b}c will be expanded to [a}c,abc].
    // One could argue that this is a bug in Bash, but since the goal of
    // this module is to match Bash's rules, we escape a leading {}

    if (str.substr(0, 2) === '{}') {
      str = '\\{\\}' + str.substr(2);
    }

    return expand(escapeBraces(str), true).map(unescapeBraces);
  }

  function embrace(str) {
    return '{' + str + '}';
  }

  function isPadded(el) {
    return /^-?0\d/.test(el);
  }

  function lte(i, y) {
    return i <= y;
  }

  function gte(i, y) {
    return i >= y;
  }

  function expand(str, isTop) {
    var expansions = [];
    var m = balancedMatch('{', '}', str);
    if (!m || /\$$/.test(m.pre)) return [str];
    var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
    var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
    var isSequence = isNumericSequence || isAlphaSequence;
    var isOptions = m.body.indexOf(',') >= 0;

    if (!isSequence && !isOptions) {
      // {a},b}
      if (m.post.match(/,.*\}/)) {
        str = m.pre + '{' + m.body + escClose + m.post;
        return expand(str);
      }

      return [str];
    }

    var n;

    if (isSequence) {
      n = m.body.split(/\.\./);
    } else {
      n = parseCommaParts(m.body);

      if (n.length === 1) {
        // x{{a,b}}y ==> x{a}y x{b}y
        n = expand(n[0], false).map(embrace);

        if (n.length === 1) {
          var post = m.post.length ? expand(m.post, false) : [''];
          return post.map(function (p) {
            return m.pre + n[0] + p;
          });
        }
      }
    } // at this point, n is the parts, and we know it's not a comma set
    // with a single entry.
    // no need to expand pre, since it is guaranteed to be free of brace-sets


    var pre = m.pre;
    var post = m.post.length ? expand(m.post, false) : [''];
    var N;

    if (isSequence) {
      var x = numeric(n[0]);
      var y = numeric(n[1]);
      var width = Math.max(n[0].length, n[1].length);
      var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
      var test = lte;
      var reverse = y < x;

      if (reverse) {
        incr *= -1;
        test = gte;
      }

      var pad = n.some(isPadded);
      N = [];

      for (var i = x; test(i, y); i += incr) {
        var c;

        if (isAlphaSequence) {
          c = String.fromCharCode(i);
          if (c === '\\') c = '';
        } else {
          c = String(i);

          if (pad) {
            var need = width - c.length;

            if (need > 0) {
              var z = new Array(need + 1).join('0');
              if (i < 0) c = '-' + z + c.slice(1);else c = z + c;
            }
          }
        }

        N.push(c);
      }
    } else {
      N = concatMap(n, function (el) {
        return expand(el, false);
      });
    }

    for (var j = 0; j < N.length; j++) {
      for (var k = 0; k < post.length; k++) {
        var expansion = pre + N[j] + post[k];
        if (!isTop || isSequence || expansion) expansions.push(expansion);
      }
    }

    return expansions;
  }

  var minimatch_1 = minimatch;
  minimatch.Minimatch = Minimatch$1;

  var path = function () {
    try {
      return path__default["default"];
    } catch (e) {}
  }() || {
    sep: '/'
  };

  minimatch.sep = path.sep;
  var GLOBSTAR = minimatch.GLOBSTAR = Minimatch$1.GLOBSTAR = {};
  var plTypes = {
    '!': {
      open: '(?:(?!(?:',
      close: '))[^/]*?)'
    },
    '?': {
      open: '(?:',
      close: ')?'
    },
    '+': {
      open: '(?:',
      close: ')+'
    },
    '*': {
      open: '(?:',
      close: ')*'
    },
    '@': {
      open: '(?:',
      close: ')'
    }
  }; // any single thing other than /
  // don't need to escape / when using new RegExp()

  var qmark = '[^/]'; // * => any number of characters

  var star = qmark + '*?'; // ** when dots are allowed.  Anything goes, except .. and .
  // not (^ or / followed by one or two dots followed by $ or /),
  // followed by anything, any number of times.

  var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'; // not a ^ or / followed by a dot,
  // followed by anything, any number of times.

  var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'; // characters that need to be escaped in RegExp.

  var reSpecials = charSet('().*{}+?[]^$\\!'); // "abc" -> { a:true, b:true, c:true }

  function charSet(s) {
    return s.split('').reduce(function (set, c) {
      set[c] = true;
      return set;
    }, {});
  } // normalizes slashes.


  var slashSplit = /\/+/;
  minimatch.filter = filter;

  function filter(pattern, options) {
    options = options || {};
    return function (p, i, list) {
      return minimatch(p, pattern, options);
    };
  }

  function ext(a, b) {
    b = b || {};
    var t = {};
    Object.keys(a).forEach(function (k) {
      t[k] = a[k];
    });
    Object.keys(b).forEach(function (k) {
      t[k] = b[k];
    });
    return t;
  }

  minimatch.defaults = function (def) {
    if (!def || _typeof(def) !== 'object' || !Object.keys(def).length) {
      return minimatch;
    }

    var orig = minimatch;

    var m = function minimatch(p, pattern, options) {
      return orig(p, pattern, ext(def, options));
    };

    m.Minimatch = function Minimatch(pattern, options) {
      return new orig.Minimatch(pattern, ext(def, options));
    };

    m.Minimatch.defaults = function defaults(options) {
      return orig.defaults(ext(def, options)).Minimatch;
    };

    m.filter = function filter(pattern, options) {
      return orig.filter(pattern, ext(def, options));
    };

    m.defaults = function defaults(options) {
      return orig.defaults(ext(def, options));
    };

    m.makeRe = function makeRe(pattern, options) {
      return orig.makeRe(pattern, ext(def, options));
    };

    m.braceExpand = function braceExpand(pattern, options) {
      return orig.braceExpand(pattern, ext(def, options));
    };

    m.match = function (list, pattern, options) {
      return orig.match(list, pattern, ext(def, options));
    };

    return m;
  };

  Minimatch$1.defaults = function (def) {
    return minimatch.defaults(def).Minimatch;
  };

  function minimatch(p, pattern, options) {
    assertValidPattern(pattern);
    if (!options) options = {}; // shortcut: comments match nothing.

    if (!options.nocomment && pattern.charAt(0) === '#') {
      return false;
    }

    return new Minimatch$1(pattern, options).match(p);
  }

  function Minimatch$1(pattern, options) {
    if (!(this instanceof Minimatch$1)) {
      return new Minimatch$1(pattern, options);
    }

    assertValidPattern(pattern);
    if (!options) options = {};
    pattern = pattern.trim(); // windows support: need to use /, not \

    if (!options.allowWindowsEscape && path.sep !== '/') {
      pattern = pattern.split(path.sep).join('/');
    }

    this.options = options;
    this.set = [];
    this.pattern = pattern;
    this.regexp = null;
    this.negate = false;
    this.comment = false;
    this.empty = false;
    this.partial = !!options.partial; // make the set of regexps etc.

    this.make();
  }

  Minimatch$1.prototype.debug = function () {};

  Minimatch$1.prototype.make = make;

  function make() {
    var pattern = this.pattern;
    var options = this.options; // empty patterns and comments match nothing.

    if (!options.nocomment && pattern.charAt(0) === '#') {
      this.comment = true;
      return;
    }

    if (!pattern) {
      this.empty = true;
      return;
    } // step 1: figure out negation, etc.


    this.parseNegate(); // step 2: expand braces

    var set = this.globSet = this.braceExpand();
    if (options.debug) this.debug = function debug() {
      console.error.apply(console, arguments);
    };
    this.debug(this.pattern, set); // step 3: now we have a set, so turn each one into a series of path-portion
    // matching patterns.
    // These will be regexps, except in the case of "**", which is
    // set to the GLOBSTAR object for globstar behavior,
    // and will not contain any / characters

    set = this.globParts = set.map(function (s) {
      return s.split(slashSplit);
    });
    this.debug(this.pattern, set); // glob --> regexps

    set = set.map(function (s, si, set) {
      return s.map(this.parse, this);
    }, this);
    this.debug(this.pattern, set); // filter out everything that didn't compile properly.

    set = set.filter(function (s) {
      return s.indexOf(false) === -1;
    });
    this.debug(this.pattern, set);
    this.set = set;
  }

  Minimatch$1.prototype.parseNegate = parseNegate;

  function parseNegate() {
    var pattern = this.pattern;
    var negate = false;
    var options = this.options;
    var negateOffset = 0;
    if (options.nonegate) return;

    for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === '!'; i++) {
      negate = !negate;
      negateOffset++;
    }

    if (negateOffset) this.pattern = pattern.substr(negateOffset);
    this.negate = negate;
  } // Brace expansion:
  // a{b,c}d -> abd acd
  // a{b,}c -> abc ac
  // a{0..3}d -> a0d a1d a2d a3d
  // a{b,c{d,e}f}g -> abg acdfg acefg
  // a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
  //
  // Invalid sets are not expanded.
  // a{2..}b -> a{2..}b
  // a{b}c -> a{b}c


  minimatch.braceExpand = function (pattern, options) {
    return braceExpand(pattern, options);
  };

  Minimatch$1.prototype.braceExpand = braceExpand;

  function braceExpand(pattern, options) {
    if (!options) {
      if (this instanceof Minimatch$1) {
        options = this.options;
      } else {
        options = {};
      }
    }

    pattern = typeof pattern === 'undefined' ? this.pattern : pattern;
    assertValidPattern(pattern); // Thanks to Yeting Li <https://github.com/yetingli> for
    // improving this regexp to avoid a ReDOS vulnerability.

    if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
      // shortcut. no need to expand.
      return [pattern];
    }

    return braceExpansion(pattern);
  }

  var MAX_PATTERN_LENGTH = 1024 * 64;

  var assertValidPattern = function assertValidPattern(pattern) {
    if (typeof pattern !== 'string') {
      throw new TypeError('invalid pattern');
    }

    if (pattern.length > MAX_PATTERN_LENGTH) {
      throw new TypeError('pattern is too long');
    }
  }; // parse a component of the expanded set.
  // At this point, no pattern may contain "/" in it
  // so we're going to return a 2d array, where each entry is the full
  // pattern, split on '/', and then turned into a regular expression.
  // A regexp is made at the end which joins each array with an
  // escaped /, and another full one which joins each regexp with |.
  //
  // Following the lead of Bash 4.1, note that "**" only has special meaning
  // when it is the *only* thing in a path portion.  Otherwise, any series
  // of * is equivalent to a single *.  Globstar behavior is enabled by
  // default, and can be disabled by setting options.noglobstar.


  Minimatch$1.prototype.parse = parse;
  var SUBPARSE = {};

  function parse(pattern, isSub) {
    assertValidPattern(pattern);
    var options = this.options; // shortcuts

    if (pattern === '**') {
      if (!options.noglobstar) return GLOBSTAR;else pattern = '*';
    }

    if (pattern === '') return '';
    var re = '';
    var hasMagic = !!options.nocase;
    var escaping = false; // ? => one single character

    var patternListStack = [];
    var negativeLists = [];
    var stateChar;
    var inClass = false;
    var reClassStart = -1;
    var classStart = -1; // . and .. never match anything that doesn't start with .,
    // even when options.dot is set.

    var patternStart = pattern.charAt(0) === '.' ? '' // anything
    // not (start or / followed by . or .. followed by / or end)
    : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))' : '(?!\\.)';
    var self = this;

    function clearStateChar() {
      if (stateChar) {
        // we had some state-tracking character
        // that wasn't consumed by this pass.
        switch (stateChar) {
          case '*':
            re += star;
            hasMagic = true;
            break;

          case '?':
            re += qmark;
            hasMagic = true;
            break;

          default:
            re += '\\' + stateChar;
            break;
        }

        self.debug('clearStateChar %j %j', stateChar, re);
        stateChar = false;
      }
    }

    for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
      this.debug('%s\t%s %s %j', pattern, i, re, c); // skip over any that are escaped.

      if (escaping && reSpecials[c]) {
        re += '\\' + c;
        escaping = false;
        continue;
      }

      switch (c) {
        /* istanbul ignore next */
        case '/':
          {
            // completely not allowed, even escaped.
            // Should already be path-split by now.
            return false;
          }

        case '\\':
          clearStateChar();
          escaping = true;
          continue;
        // the various stateChar values
        // for the "extglob" stuff.

        case '?':
        case '*':
        case '+':
        case '@':
        case '!':
          this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c); // all of those are literals inside a class, except that
          // the glob [!a] means [^a] in regexp

          if (inClass) {
            this.debug('  in class');
            if (c === '!' && i === classStart + 1) c = '^';
            re += c;
            continue;
          } // if we already have a stateChar, then it means
          // that there was something like ** or +? in there.
          // Handle the stateChar, then proceed with this one.


          self.debug('call clearStateChar %j', stateChar);
          clearStateChar();
          stateChar = c; // if extglob is disabled, then +(asdf|foo) isn't a thing.
          // just clear the statechar *now*, rather than even diving into
          // the patternList stuff.

          if (options.noext) clearStateChar();
          continue;

        case '(':
          if (inClass) {
            re += '(';
            continue;
          }

          if (!stateChar) {
            re += '\\(';
            continue;
          }

          patternListStack.push({
            type: stateChar,
            start: i - 1,
            reStart: re.length,
            open: plTypes[stateChar].open,
            close: plTypes[stateChar].close
          }); // negation is (?:(?!js)[^/]*)

          re += stateChar === '!' ? '(?:(?!(?:' : '(?:';
          this.debug('plType %j %j', stateChar, re);
          stateChar = false;
          continue;

        case ')':
          if (inClass || !patternListStack.length) {
            re += '\\)';
            continue;
          }

          clearStateChar();
          hasMagic = true;
          var pl = patternListStack.pop(); // negation is (?:(?!js)[^/]*)
          // The others are (?:<pattern>)<type>

          re += pl.close;

          if (pl.type === '!') {
            negativeLists.push(pl);
          }

          pl.reEnd = re.length;
          continue;

        case '|':
          if (inClass || !patternListStack.length || escaping) {
            re += '\\|';
            escaping = false;
            continue;
          }

          clearStateChar();
          re += '|';
          continue;
        // these are mostly the same in regexp and glob

        case '[':
          // swallow any state-tracking char before the [
          clearStateChar();

          if (inClass) {
            re += '\\' + c;
            continue;
          }

          inClass = true;
          classStart = i;
          reClassStart = re.length;
          re += c;
          continue;

        case ']':
          //  a right bracket shall lose its special
          //  meaning and represent itself in
          //  a bracket expression if it occurs
          //  first in the list.  -- POSIX.2 2.8.3.2
          if (i === classStart + 1 || !inClass) {
            re += '\\' + c;
            escaping = false;
            continue;
          } // handle the case where we left a class open.
          // "[z-a]" is valid, equivalent to "\[z-a\]"
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.


          var cs = pattern.substring(classStart + 1, i);

          try {
            RegExp('[' + cs + ']');
          } catch (er) {
            // not a valid class!
            var sp = this.parse(cs, SUBPARSE);
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]';
            hasMagic = hasMagic || sp[1];
            inClass = false;
            continue;
          } // finish up the class.


          hasMagic = true;
          inClass = false;
          re += c;
          continue;

        default:
          // swallow any state char that wasn't consumed
          clearStateChar();

          if (escaping) {
            // no need
            escaping = false;
          } else if (reSpecials[c] && !(c === '^' && inClass)) {
            re += '\\';
          }

          re += c;
      } // switch

    } // for
    // handle the case where we left a class open.
    // "[abc" is valid, equivalent to "\[abc"


    if (inClass) {
      // split where the last [ was, and escape it
      // this is a huge pita.  We now have to re-walk
      // the contents of the would-be class to re-translate
      // any characters that were passed through as-is
      cs = pattern.substr(classStart + 1);
      sp = this.parse(cs, SUBPARSE);
      re = re.substr(0, reClassStart) + '\\[' + sp[0];
      hasMagic = hasMagic || sp[1];
    } // handle the case where we had a +( thing at the *end*
    // of the pattern.
    // each pattern list stack adds 3 chars, and we need to go through
    // and escape any | chars that were passed through as-is for the regexp.
    // Go through and escape them, taking care not to double-escape any
    // | chars that were already escaped.


    for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
      var tail = re.slice(pl.reStart + pl.open.length);
      this.debug('setting tail', re, pl); // maybe some even number of \, then maybe 1 \, followed by a |

      tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
        if (!$2) {
          // the | isn't already escaped, so escape it.
          $2 = '\\';
        } // need to escape all those slashes *again*, without escaping the
        // one that we need for escaping the | character.  As it works out,
        // escaping an even number of slashes can be done by simply repeating
        // it exactly after itself.  That's why this trick works.
        //
        // I am sorry that you have to see this.


        return $1 + $1 + $2 + '|';
      });
      this.debug('tail=%j\n   %s', tail, tail, pl, re);
      var t = pl.type === '*' ? star : pl.type === '?' ? qmark : '\\' + pl.type;
      hasMagic = true;
      re = re.slice(0, pl.reStart) + t + '\\(' + tail;
    } // handle trailing things that only matter at the very end.


    clearStateChar();

    if (escaping) {
      // trailing \\
      re += '\\\\';
    } // only need to apply the nodot start if the re starts with
    // something that could conceivably capture a dot


    var addPatternStart = false;

    switch (re.charAt(0)) {
      case '[':
      case '.':
      case '(':
        addPatternStart = true;
    } // Hack to work around lack of negative lookbehind in JS
    // A pattern like: *.!(x).!(y|z) needs to ensure that a name
    // like 'a.xyz.yz' doesn't match.  So, the first negative
    // lookahead, has to look ALL the way ahead, to the end of
    // the pattern.


    for (var n = negativeLists.length - 1; n > -1; n--) {
      var nl = negativeLists[n];
      var nlBefore = re.slice(0, nl.reStart);
      var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
      var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
      var nlAfter = re.slice(nl.reEnd);
      nlLast += nlAfter; // Handle nested stuff like *(*.js|!(*.json)), where open parens
      // mean that we should *not* include the ) in the bit that is considered
      // "after" the negated section.

      var openParensBefore = nlBefore.split('(').length - 1;
      var cleanAfter = nlAfter;

      for (i = 0; i < openParensBefore; i++) {
        cleanAfter = cleanAfter.replace(/\)[+*?]?/, '');
      }

      nlAfter = cleanAfter;
      var dollar = '';

      if (nlAfter === '' && isSub !== SUBPARSE) {
        dollar = '$';
      }

      var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
      re = newRe;
    } // if the re is not "" at this point, then we need to make sure
    // it doesn't match against an empty path part.
    // Otherwise a/* will match a/, which it should not.


    if (re !== '' && hasMagic) {
      re = '(?=.)' + re;
    }

    if (addPatternStart) {
      re = patternStart + re;
    } // parsing just a piece of a larger pattern.


    if (isSub === SUBPARSE) {
      return [re, hasMagic];
    } // skip the regexp for non-magical patterns
    // unescape anything in it, though, so that it'll be
    // an exact match against a file etc.


    if (!hasMagic) {
      return globUnescape(pattern);
    }

    var flags = options.nocase ? 'i' : '';

    try {
      var regExp = new RegExp('^' + re + '$', flags);
    } catch (er)
    /* istanbul ignore next - should be impossible */
    {
      // If it was an invalid regular expression, then it can't match
      // anything.  This trick looks for a character after the end of
      // the string, which is of course impossible, except in multi-line
      // mode, but it's not a /m regex.
      return new RegExp('$.');
    }

    regExp._glob = pattern;
    regExp._src = re;
    return regExp;
  }

  minimatch.makeRe = function (pattern, options) {
    return new Minimatch$1(pattern, options || {}).makeRe();
  };

  Minimatch$1.prototype.makeRe = makeRe;

  function makeRe() {
    if (this.regexp || this.regexp === false) return this.regexp; // at this point, this.set is a 2d array of partial
    // pattern strings, or "**".
    //
    // It's better to use .match().  This function shouldn't
    // be used, really, but it's pretty convenient sometimes,
    // when you just want to work with a regex.

    var set = this.set;

    if (!set.length) {
      this.regexp = false;
      return this.regexp;
    }

    var options = this.options;
    var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
    var flags = options.nocase ? 'i' : '';
    var re = set.map(function (pattern) {
      return pattern.map(function (p) {
        return p === GLOBSTAR ? twoStar : typeof p === 'string' ? regExpEscape(p) : p._src;
      }).join('\\\/');
    }).join('|'); // must match entire pattern
    // ending in a * or ** will make it less strict.

    re = '^(?:' + re + ')$'; // can match anything, as long as it's not this.

    if (this.negate) re = '^(?!' + re + ').*$';

    try {
      this.regexp = new RegExp(re, flags);
    } catch (ex)
    /* istanbul ignore next - should be impossible */
    {
      this.regexp = false;
    }

    return this.regexp;
  }

  minimatch.match = function (list, pattern, options) {
    options = options || {};
    var mm = new Minimatch$1(pattern, options);
    list = list.filter(function (f) {
      return mm.match(f);
    });

    if (mm.options.nonull && !list.length) {
      list.push(pattern);
    }

    return list;
  };

  Minimatch$1.prototype.match = function match(f, partial) {
    if (typeof partial === 'undefined') partial = this.partial;
    this.debug('match', f, this.pattern); // short-circuit in the case of busted things.
    // comments, etc.

    if (this.comment) return false;
    if (this.empty) return f === '';
    if (f === '/' && partial) return true;
    var options = this.options; // windows: need to use /, not \

    if (path.sep !== '/') {
      f = f.split(path.sep).join('/');
    } // treat the test path as a set of pathparts.


    f = f.split(slashSplit);
    this.debug(this.pattern, 'split', f); // just ONE of the pattern sets in this.set needs to match
    // in order for it to be valid.  If negating, then just one
    // match means that we have failed.
    // Either way, return on the first hit.

    var set = this.set;
    this.debug(this.pattern, 'set', set); // Find the basename of the path by looking for the last non-empty segment

    var filename;
    var i;

    for (i = f.length - 1; i >= 0; i--) {
      filename = f[i];
      if (filename) break;
    }

    for (i = 0; i < set.length; i++) {
      var pattern = set[i];
      var file = f;

      if (options.matchBase && pattern.length === 1) {
        file = [filename];
      }

      var hit = this.matchOne(file, pattern, partial);

      if (hit) {
        if (options.flipNegate) return true;
        return !this.negate;
      }
    } // didn't get any hits.  this is success if it's a negative
    // pattern, failure otherwise.


    if (options.flipNegate) return false;
    return this.negate;
  }; // set partial to true to test if, for example,
  // "/a/b" matches the start of "/*/b/*/d"
  // Partial means, if you run out of file before you run
  // out of pattern, then that's fine, as long as all
  // the parts match.


  Minimatch$1.prototype.matchOne = function (file, pattern, partial) {
    var options = this.options;
    this.debug('matchOne', {
      'this': this,
      file: file,
      pattern: pattern
    });
    this.debug('matchOne', file.length, pattern.length);

    for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
      this.debug('matchOne loop');
      var p = pattern[pi];
      var f = file[fi];
      this.debug(pattern, p, f); // should be impossible.
      // some invalid regexp stuff in the set.

      /* istanbul ignore if */

      if (p === false) return false;

      if (p === GLOBSTAR) {
        this.debug('GLOBSTAR', [pattern, p, f]); // "**"
        // a/**/b/**/c would match the following:
        // a/b/x/y/z/c
        // a/x/y/z/b/c
        // a/b/x/b/x/c
        // a/b/c
        // To do this, take the rest of the pattern after
        // the **, and see if it would match the file remainder.
        // If so, return success.
        // If not, the ** "swallows" a segment, and try again.
        // This is recursively awful.
        //
        // a/**/b/**/c matching a/b/x/y/z/c
        // - a matches a
        // - doublestar
        //   - matchOne(b/x/y/z/c, b/**/c)
        //     - b matches b
        //     - doublestar
        //       - matchOne(x/y/z/c, c) -> no
        //       - matchOne(y/z/c, c) -> no
        //       - matchOne(z/c, c) -> no
        //       - matchOne(c, c) yes, hit

        var fr = fi;
        var pr = pi + 1;

        if (pr === pl) {
          this.debug('** at the end'); // a ** at the end will just swallow the rest.
          // We have found a match.
          // however, it will not swallow /.x, unless
          // options.dot is set.
          // . and .. are *never* matched by **, for explosively
          // exponential reasons.

          for (; fi < fl; fi++) {
            if (file[fi] === '.' || file[fi] === '..' || !options.dot && file[fi].charAt(0) === '.') return false;
          }

          return true;
        } // ok, let's see if we can swallow whatever we can.


        while (fr < fl) {
          var swallowee = file[fr];
          this.debug('\nglobstar while', file, fr, pattern, pr, swallowee); // XXX remove this slice.  Just pass the start index.

          if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
            this.debug('globstar found match!', fr, fl, swallowee); // found a match.

            return true;
          } else {
            // can't swallow "." or ".." ever.
            // can only swallow ".foo" when explicitly asked.
            if (swallowee === '.' || swallowee === '..' || !options.dot && swallowee.charAt(0) === '.') {
              this.debug('dot detected!', file, fr, pattern, pr);
              break;
            } // ** swallows a segment, and continue.


            this.debug('globstar swallow a segment, and continue');
            fr++;
          }
        } // no match was found.
        // However, in partial mode, we can't say this is necessarily over.
        // If there's more *pattern* left, then

        /* istanbul ignore if */


        if (partial) {
          // ran out of file
          this.debug('\n>>> no match, partial?', file, fr, pattern, pr);
          if (fr === fl) return true;
        }

        return false;
      } // something other than **
      // non-magic patterns just have to match exactly
      // patterns with magic have been turned into regexps.


      var hit;

      if (typeof p === 'string') {
        hit = f === p;
        this.debug('string match', p, f, hit);
      } else {
        hit = f.match(p);
        this.debug('pattern match', p, f, hit);
      }

      if (!hit) return false;
    } // Note: ending in / means that we'll get a final ""
    // at the end of the pattern.  This can only match a
    // corresponding "" at the end of the file.
    // If the file ends in /, then it can only match a
    // a pattern that ends in /, unless the pattern just
    // doesn't have any more for it. But, a/b/ should *not*
    // match "a/b/*", even though "" matches against the
    // [^/]*? pattern, except in partial mode, where it might
    // simply not be reached yet.
    // However, a/b/ should still satisfy a/*
    // now either we fell off the end of the pattern, or we're done.


    if (fi === fl && pi === pl) {
      // ran out of pattern and filename at the same time.
      // an exact hit!
      return true;
    } else if (fi === fl) {
      // ran out of file, but still had pattern left.
      // this is ok if we're doing the match as part of
      // a glob fs traversal.
      return partial;
    } else
      /* istanbul ignore else */
      if (pi === pl) {
        // ran out of pattern, still have file left.
        // this is only acceptable if we're on the very last
        // empty segment of a file with a trailing slash.
        // a/* should match a/b/
        return fi === fl - 1 && file[fi] === '';
      } // should be unreachable.

    /* istanbul ignore next */


    throw new Error('wtf?');
  }; // replace stuff like \* with *


  function globUnescape(s) {
    return s.replace(/\\(.)/g, '$1');
  }

  function regExpEscape(s) {
    return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  var inherits_browser = createCommonjsModule(function (module) {
    if (typeof Object.create === 'function') {
      // implementation from standard node.js 'util' module
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      // old school shim for old browsers
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;

          var TempCtor = function TempCtor() {};

          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  });

  var inherits = createCommonjsModule(function (module) {
    try {
      var util = require$$0__default["default"];
      /* istanbul ignore next */

      if (typeof util.inherits !== 'function') throw '';
      module.exports = util.inherits;
    } catch (e) {
      /* istanbul ignore next */
      module.exports = inherits_browser;
    }
  });

  function posix(path) {
    return path.charAt(0) === '/';
  }

  function win32(path) {
    // https://github.com/nodejs/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
    var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
    var result = splitDeviceRe.exec(path);
    var device = result[1] || '';
    var isUnc = Boolean(device && device.charAt(1) !== ':'); // UNC paths are always absolute

    return Boolean(result[2] || isUnc);
  }

  var pathIsAbsolute = process.platform === 'win32' ? win32 : posix;
  var posix_1 = posix;
  var win32_1 = win32;
  pathIsAbsolute.posix = posix_1;
  pathIsAbsolute.win32 = win32_1;

  var setopts_1 = setopts$2;
  var ownProp_1 = ownProp$2;
  var makeAbs_1 = makeAbs;
  var finish_1 = finish;
  var mark_1 = mark;
  var isIgnored_1 = isIgnored$2;
  var childrenIgnored_1 = childrenIgnored$2;

  function ownProp$2(obj, field) {
    return Object.prototype.hasOwnProperty.call(obj, field);
  }

  var Minimatch = minimatch_1.Minimatch;

  function alphasort(a, b) {
    return a.localeCompare(b, 'en');
  }

  function setupIgnores(self, options) {
    self.ignore = options.ignore || [];
    if (!Array.isArray(self.ignore)) self.ignore = [self.ignore];

    if (self.ignore.length) {
      self.ignore = self.ignore.map(ignoreMap);
    }
  } // ignore patterns are always in dot:true mode.


  function ignoreMap(pattern) {
    var gmatcher = null;

    if (pattern.slice(-3) === '/**') {
      var gpattern = pattern.replace(/(\/\*\*)+$/, '');
      gmatcher = new Minimatch(gpattern, {
        dot: true
      });
    }

    return {
      matcher: new Minimatch(pattern, {
        dot: true
      }),
      gmatcher: gmatcher
    };
  }

  function setopts$2(self, pattern, options) {
    if (!options) options = {}; // base-matching: just use globstar for that.

    if (options.matchBase && -1 === pattern.indexOf("/")) {
      if (options.noglobstar) {
        throw new Error("base matching requires globstar");
      }

      pattern = "**/" + pattern;
    }

    self.silent = !!options.silent;
    self.pattern = pattern;
    self.strict = options.strict !== false;
    self.realpath = !!options.realpath;
    self.realpathCache = options.realpathCache || Object.create(null);
    self.follow = !!options.follow;
    self.dot = !!options.dot;
    self.mark = !!options.mark;
    self.nodir = !!options.nodir;
    if (self.nodir) self.mark = true;
    self.sync = !!options.sync;
    self.nounique = !!options.nounique;
    self.nonull = !!options.nonull;
    self.nosort = !!options.nosort;
    self.nocase = !!options.nocase;
    self.stat = !!options.stat;
    self.noprocess = !!options.noprocess;
    self.absolute = !!options.absolute;
    self.fs = options.fs || fs__default["default"];
    self.maxLength = options.maxLength || Infinity;
    self.cache = options.cache || Object.create(null);
    self.statCache = options.statCache || Object.create(null);
    self.symlinks = options.symlinks || Object.create(null);
    setupIgnores(self, options);
    self.changedCwd = false;
    var cwd = process.cwd();
    if (!ownProp$2(options, "cwd")) self.cwd = cwd;else {
      self.cwd = path__default["default"].resolve(options.cwd);
      self.changedCwd = self.cwd !== cwd;
    }
    self.root = options.root || path__default["default"].resolve(self.cwd, "/");
    self.root = path__default["default"].resolve(self.root);
    if (process.platform === "win32") self.root = self.root.replace(/\\/g, "/"); // TODO: is an absolute `cwd` supposed to be resolved against `root`?
    // e.g. { cwd: '/test', root: __dirname } === path.join(__dirname, '/test')

    self.cwdAbs = pathIsAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd);
    if (process.platform === "win32") self.cwdAbs = self.cwdAbs.replace(/\\/g, "/");
    self.nomount = !!options.nomount; // disable comments and negation in Minimatch.
    // Note that they are not supported in Glob itself anyway.

    options.nonegate = true;
    options.nocomment = true;
    self.minimatch = new Minimatch(pattern, options);
    self.options = self.minimatch.options;
  }

  function finish(self) {
    var nou = self.nounique;
    var all = nou ? [] : Object.create(null);

    for (var i = 0, l = self.matches.length; i < l; i++) {
      var matches = self.matches[i];

      if (!matches || Object.keys(matches).length === 0) {
        if (self.nonull) {
          // do like the shell, and spit out the literal glob
          var literal = self.minimatch.globSet[i];
          if (nou) all.push(literal);else all[literal] = true;
        }
      } else {
        // had matches
        var m = Object.keys(matches);
        if (nou) all.push.apply(all, m);else m.forEach(function (m) {
          all[m] = true;
        });
      }
    }

    if (!nou) all = Object.keys(all);
    if (!self.nosort) all = all.sort(alphasort); // at *some* point we statted all of these

    if (self.mark) {
      for (var i = 0; i < all.length; i++) {
        all[i] = self._mark(all[i]);
      }

      if (self.nodir) {
        all = all.filter(function (e) {
          var notDir = !/\/$/.test(e);
          var c = self.cache[e] || self.cache[makeAbs(self, e)];
          if (notDir && c) notDir = c !== 'DIR' && !Array.isArray(c);
          return notDir;
        });
      }
    }

    if (self.ignore.length) all = all.filter(function (m) {
      return !isIgnored$2(self, m);
    });
    self.found = all;
  }

  function mark(self, p) {
    var abs = makeAbs(self, p);
    var c = self.cache[abs];
    var m = p;

    if (c) {
      var isDir = c === 'DIR' || Array.isArray(c);
      var slash = p.slice(-1) === '/';
      if (isDir && !slash) m += '/';else if (!isDir && slash) m = m.slice(0, -1);

      if (m !== p) {
        var mabs = makeAbs(self, m);
        self.statCache[mabs] = self.statCache[abs];
        self.cache[mabs] = self.cache[abs];
      }
    }

    return m;
  } // lotta situps...


  function makeAbs(self, f) {
    var abs = f;

    if (f.charAt(0) === '/') {
      abs = path__default["default"].join(self.root, f);
    } else if (pathIsAbsolute(f) || f === '') {
      abs = f;
    } else if (self.changedCwd) {
      abs = path__default["default"].resolve(self.cwd, f);
    } else {
      abs = path__default["default"].resolve(f);
    }

    if (process.platform === 'win32') abs = abs.replace(/\\/g, '/');
    return abs;
  } // Return true, if pattern ends with globstar '**', for the accompanying parent directory.
  // Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents


  function isIgnored$2(self, path) {
    if (!self.ignore.length) return false;
    return self.ignore.some(function (item) {
      return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path));
    });
  }

  function childrenIgnored$2(self, path) {
    if (!self.ignore.length) return false;
    return self.ignore.some(function (item) {
      return !!(item.gmatcher && item.gmatcher.match(path));
    });
  }

  var common = {
    setopts: setopts_1,
    ownProp: ownProp_1,
    makeAbs: makeAbs_1,
    finish: finish_1,
    mark: mark_1,
    isIgnored: isIgnored_1,
    childrenIgnored: childrenIgnored_1
  };

  var require$$0 = glob_1;

  var sync = globSync;
  globSync.GlobSync = GlobSync$1;
  require$$0.Glob;
  var setopts$1 = common.setopts;
  var ownProp$1 = common.ownProp;
  var childrenIgnored$1 = common.childrenIgnored;
  var isIgnored$1 = common.isIgnored;

  function globSync(pattern, options) {
    if (typeof options === 'function' || arguments.length === 3) throw new TypeError('callback provided to sync glob\n' + 'See: https://github.com/isaacs/node-glob/issues/167');
    return new GlobSync$1(pattern, options).found;
  }

  function GlobSync$1(pattern, options) {
    if (!pattern) throw new Error('must provide pattern');
    if (typeof options === 'function' || arguments.length === 3) throw new TypeError('callback provided to sync glob\n' + 'See: https://github.com/isaacs/node-glob/issues/167');
    if (!(this instanceof GlobSync$1)) return new GlobSync$1(pattern, options);
    setopts$1(this, pattern, options);
    if (this.noprocess) return this;
    var n = this.minimatch.set.length;
    this.matches = new Array(n);

    for (var i = 0; i < n; i++) {
      this._process(this.minimatch.set[i], i, false);
    }

    this._finish();
  }

  GlobSync$1.prototype._finish = function () {
    assert__default["default"](this instanceof GlobSync$1);

    if (this.realpath) {
      var self = this;
      this.matches.forEach(function (matchset, index) {
        var set = self.matches[index] = Object.create(null);

        for (var p in matchset) {
          try {
            p = self._makeAbs(p);
            var real = fs_realpath.realpathSync(p, self.realpathCache);
            set[real] = true;
          } catch (er) {
            if (er.syscall === 'stat') set[self._makeAbs(p)] = true;else throw er;
          }
        }
      });
    }

    common.finish(this);
  };

  GlobSync$1.prototype._process = function (pattern, index, inGlobStar) {
    assert__default["default"](this instanceof GlobSync$1); // Get the first [n] parts of pattern that are all strings.

    var n = 0;

    while (typeof pattern[n] === 'string') {
      n++;
    } // now n is the index of the first one that is *not* a string.
    // See if there's anything else


    var prefix;

    switch (n) {
      // if not, then this is rather simple
      case pattern.length:
        this._processSimple(pattern.join('/'), index);

        return;

      case 0:
        // pattern *starts* with some non-trivial item.
        // going to readdir(cwd), but not include the prefix in matches.
        prefix = null;
        break;

      default:
        // pattern has some string bits in the front.
        // whatever it starts with, whether that's 'absolute' like /foo/bar,
        // or 'relative' like '../baz'
        prefix = pattern.slice(0, n).join('/');
        break;
    }

    var remain = pattern.slice(n); // get the list of entries.

    var read;
    if (prefix === null) read = '.';else if (pathIsAbsolute(prefix) || pathIsAbsolute(pattern.join('/'))) {
      if (!prefix || !pathIsAbsolute(prefix)) prefix = '/' + prefix;
      read = prefix;
    } else read = prefix;

    var abs = this._makeAbs(read); //if ignored, skip processing


    if (childrenIgnored$1(this, read)) return;
    var isGlobStar = remain[0] === minimatch_1.GLOBSTAR;
    if (isGlobStar) this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);else this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
  };

  GlobSync$1.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
    var entries = this._readdir(abs, inGlobStar); // if the abs isn't a dir, then nothing can match!


    if (!entries) return; // It will only match dot entries if it starts with a dot, or if
    // dot is set.  Stuff like @(.foo|.bar) isn't allowed.

    var pn = remain[0];
    var negate = !!this.minimatch.negate;
    var rawGlob = pn._glob;
    var dotOk = this.dot || rawGlob.charAt(0) === '.';
    var matchedEntries = [];

    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];

      if (e.charAt(0) !== '.' || dotOk) {
        var m;

        if (negate && !prefix) {
          m = !e.match(pn);
        } else {
          m = e.match(pn);
        }

        if (m) matchedEntries.push(e);
      }
    }

    var len = matchedEntries.length; // If there are no matched entries, then nothing matches.

    if (len === 0) return; // if this is the last remaining pattern bit, then no need for
    // an additional stat *unless* the user has specified mark or
    // stat explicitly.  We know they exist, since readdir returned
    // them.

    if (remain.length === 1 && !this.mark && !this.stat) {
      if (!this.matches[index]) this.matches[index] = Object.create(null);

      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];

        if (prefix) {
          if (prefix.slice(-1) !== '/') e = prefix + '/' + e;else e = prefix + e;
        }

        if (e.charAt(0) === '/' && !this.nomount) {
          e = path__default["default"].join(this.root, e);
        }

        this._emitMatch(index, e);
      } // This was the last one, and no stats were needed


      return;
    } // now test all matched entries as stand-ins for that part
    // of the pattern.


    remain.shift();

    for (var i = 0; i < len; i++) {
      var e = matchedEntries[i];
      var newPattern;
      if (prefix) newPattern = [prefix, e];else newPattern = [e];

      this._process(newPattern.concat(remain), index, inGlobStar);
    }
  };

  GlobSync$1.prototype._emitMatch = function (index, e) {
    if (isIgnored$1(this, e)) return;

    var abs = this._makeAbs(e);

    if (this.mark) e = this._mark(e);

    if (this.absolute) {
      e = abs;
    }

    if (this.matches[index][e]) return;

    if (this.nodir) {
      var c = this.cache[abs];
      if (c === 'DIR' || Array.isArray(c)) return;
    }

    this.matches[index][e] = true;
    if (this.stat) this._stat(e);
  };

  GlobSync$1.prototype._readdirInGlobStar = function (abs) {
    // follow all symlinked directories forever
    // just proceed as if this is a non-globstar situation
    if (this.follow) return this._readdir(abs, false);
    var entries;
    var lstat;

    try {
      lstat = this.fs.lstatSync(abs);
    } catch (er) {
      if (er.code === 'ENOENT') {
        // lstat failed, doesn't exist
        return null;
      }
    }

    var isSym = lstat && lstat.isSymbolicLink();
    this.symlinks[abs] = isSym; // If it's not a symlink or a dir, then it's definitely a regular file.
    // don't bother doing a readdir in that case.

    if (!isSym && lstat && !lstat.isDirectory()) this.cache[abs] = 'FILE';else entries = this._readdir(abs, false);
    return entries;
  };

  GlobSync$1.prototype._readdir = function (abs, inGlobStar) {
    if (inGlobStar && !ownProp$1(this.symlinks, abs)) return this._readdirInGlobStar(abs);

    if (ownProp$1(this.cache, abs)) {
      var c = this.cache[abs];
      if (!c || c === 'FILE') return null;
      if (Array.isArray(c)) return c;
    }

    try {
      return this._readdirEntries(abs, this.fs.readdirSync(abs));
    } catch (er) {
      this._readdirError(abs, er);

      return null;
    }
  };

  GlobSync$1.prototype._readdirEntries = function (abs, entries) {
    // if we haven't asked to stat everything, then just
    // assume that everything in there exists, so we can avoid
    // having to stat it a second time.
    if (!this.mark && !this.stat) {
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (abs === '/') e = abs + e;else e = abs + '/' + e;
        this.cache[e] = true;
      }
    }

    this.cache[abs] = entries; // mark and cache dir-ness

    return entries;
  };

  GlobSync$1.prototype._readdirError = function (f, er) {
    // handle errors, and cache the information
    switch (er.code) {
      case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205

      case 'ENOTDIR':
        // totally normal. means it *does* exist.
        var abs = this._makeAbs(f);

        this.cache[abs] = 'FILE';

        if (abs === this.cwdAbs) {
          var error = new Error(er.code + ' invalid cwd ' + this.cwd);
          error.path = this.cwd;
          error.code = er.code;
          throw error;
        }

        break;

      case 'ENOENT': // not terribly unusual

      case 'ELOOP':
      case 'ENAMETOOLONG':
      case 'UNKNOWN':
        this.cache[this._makeAbs(f)] = false;
        break;

      default:
        // some unusual error.  Treat as failure.
        this.cache[this._makeAbs(f)] = false;
        if (this.strict) throw er;
        if (!this.silent) console.error('glob error', er);
        break;
    }
  };

  GlobSync$1.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {
    var entries = this._readdir(abs, inGlobStar); // no entries means not a dir, so it can never have matches
    // foo.txt/** doesn't match foo.txt


    if (!entries) return; // test without the globstar, and with every child both below
    // and replacing the globstar.

    var remainWithoutGlobStar = remain.slice(1);
    var gspref = prefix ? [prefix] : [];
    var noGlobStar = gspref.concat(remainWithoutGlobStar); // the noGlobStar pattern exits the inGlobStar state

    this._process(noGlobStar, index, false);

    var len = entries.length;
    var isSym = this.symlinks[abs]; // If it's a symlink, and we're in a globstar, then stop

    if (isSym && inGlobStar) return;

    for (var i = 0; i < len; i++) {
      var e = entries[i];
      if (e.charAt(0) === '.' && !this.dot) continue; // these two cases enter the inGlobStar state

      var instead = gspref.concat(entries[i], remainWithoutGlobStar);

      this._process(instead, index, true);

      var below = gspref.concat(entries[i], remain);

      this._process(below, index, true);
    }
  };

  GlobSync$1.prototype._processSimple = function (prefix, index) {
    // XXX review this.  Shouldn't it be doing the mounting etc
    // before doing stat?  kinda weird?
    var exists = this._stat(prefix);

    if (!this.matches[index]) this.matches[index] = Object.create(null); // If it doesn't exist, then just mark the lack of results

    if (!exists) return;

    if (prefix && pathIsAbsolute(prefix) && !this.nomount) {
      var trail = /[\/\\]$/.test(prefix);

      if (prefix.charAt(0) === '/') {
        prefix = path__default["default"].join(this.root, prefix);
      } else {
        prefix = path__default["default"].resolve(this.root, prefix);
        if (trail) prefix += '/';
      }
    }

    if (process.platform === 'win32') prefix = prefix.replace(/\\/g, '/'); // Mark this as a match

    this._emitMatch(index, prefix);
  }; // Returns either 'DIR', 'FILE', or false


  GlobSync$1.prototype._stat = function (f) {
    var abs = this._makeAbs(f);

    var needDir = f.slice(-1) === '/';
    if (f.length > this.maxLength) return false;

    if (!this.stat && ownProp$1(this.cache, abs)) {
      var c = this.cache[abs];
      if (Array.isArray(c)) c = 'DIR'; // It exists, but maybe not how we need it

      if (!needDir || c === 'DIR') return c;
      if (needDir && c === 'FILE') return false; // otherwise we have to stat, because maybe c=true
      // if we know it exists, but not what it is.
    }
    var stat = this.statCache[abs];

    if (!stat) {
      var lstat;

      try {
        lstat = this.fs.lstatSync(abs);
      } catch (er) {
        if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
          this.statCache[abs] = false;
          return false;
        }
      }

      if (lstat && lstat.isSymbolicLink()) {
        try {
          stat = this.fs.statSync(abs);
        } catch (er) {
          stat = lstat;
        }
      } else {
        stat = lstat;
      }
    }

    this.statCache[abs] = stat;
    var c = true;
    if (stat) c = stat.isDirectory() ? 'DIR' : 'FILE';
    this.cache[abs] = this.cache[abs] || c;
    if (needDir && c === 'FILE') return false;
    return c;
  };

  GlobSync$1.prototype._mark = function (p) {
    return common.mark(this, p);
  };

  GlobSync$1.prototype._makeAbs = function (f) {
    return common.makeAbs(this, f);
  };

  // Returns a wrapper function that returns a wrapped callback
  // The wrapper function should do some stuff, and return a
  // presumably different callback function.
  // This makes sure that own properties are retained, so that
  // decorations and such are not lost along the way.
  var wrappy_1 = wrappy;

  function wrappy(fn, cb) {
    if (fn && cb) return wrappy(fn)(cb);
    if (typeof fn !== 'function') throw new TypeError('need wrapper function');
    Object.keys(fn).forEach(function (k) {
      wrapper[k] = fn[k];
    });
    return wrapper;

    function wrapper() {
      var args = new Array(arguments.length);

      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }

      var ret = fn.apply(this, args);
      var cb = args[args.length - 1];

      if (typeof ret === 'function' && ret !== cb) {
        Object.keys(cb).forEach(function (k) {
          ret[k] = cb[k];
        });
      }

      return ret;
    }
  }

  var once_1 = wrappy_1(once);
  var strict = wrappy_1(onceStrict);
  once.proto = once(function () {
    Object.defineProperty(Function.prototype, 'once', {
      value: function value() {
        return once(this);
      },
      configurable: true
    });
    Object.defineProperty(Function.prototype, 'onceStrict', {
      value: function value() {
        return onceStrict(this);
      },
      configurable: true
    });
  });

  function once(fn) {
    var f = function f() {
      if (f.called) return f.value;
      f.called = true;
      return f.value = fn.apply(this, arguments);
    };

    f.called = false;
    return f;
  }

  function onceStrict(fn) {
    var f = function f() {
      if (f.called) throw new Error(f.onceError);
      f.called = true;
      return f.value = fn.apply(this, arguments);
    };

    var name = fn.name || 'Function wrapped with `once`';
    f.onceError = name + " shouldn't be called more than once";
    f.called = false;
    return f;
  }
  once_1.strict = strict;

  var reqs = Object.create(null);
  var inflight_1 = wrappy_1(inflight);

  function inflight(key, cb) {
    if (reqs[key]) {
      reqs[key].push(cb);
      return null;
    } else {
      reqs[key] = [cb];
      return makeres(key);
    }
  }

  function makeres(key) {
    return once_1(function RES() {
      var cbs = reqs[key];
      var len = cbs.length;
      var args = slice(arguments); // XXX It's somewhat ambiguous whether a new callback added in this
      // pass should be queued for later execution if something in the
      // list of callbacks throws, or if it should just be discarded.
      // However, it's such an edge case that it hardly matters, and either
      // choice is likely as surprising as the other.
      // As it happens, we do go ahead and schedule it for later execution.

      try {
        for (var i = 0; i < len; i++) {
          cbs[i].apply(null, args);
        }
      } finally {
        if (cbs.length > len) {
          // added more in the interim.
          // de-zalgo, just in case, but don't call again.
          cbs.splice(0, len);
          process.nextTick(function () {
            RES.apply(null, args);
          });
        } else {
          delete reqs[key];
        }
      }
    });
  }

  function slice(args) {
    var length = args.length;
    var array = [];

    for (var i = 0; i < length; i++) {
      array[i] = args[i];
    }

    return array;
  }

  //
  // 1. Get the minimatch set
  // 2. For each pattern in the set, PROCESS(pattern, false)
  // 3. Store matches per-set, then uniq them
  //
  // PROCESS(pattern, inGlobStar)
  // Get the first [n] items from pattern that are all strings
  // Join these together.  This is PREFIX.
  //   If there is no more remaining, then stat(PREFIX) and
  //   add to matches if it succeeds.  END.
  //
  // If inGlobStar and PREFIX is symlink and points to dir
  //   set ENTRIES = []
  // else readdir(PREFIX) as ENTRIES
  //   If fail, END
  //
  // with ENTRIES
  //   If pattern[n] is GLOBSTAR
  //     // handle the case where the globstar match is empty
  //     // by pruning it out, and testing the resulting pattern
  //     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
  //     // handle other cases.
  //     for ENTRY in ENTRIES (not dotfiles)
  //       // attach globstar + tail onto the entry
  //       // Mark that this entry is a globstar match
  //       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
  //
  //   else // not globstar
  //     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
  //       Test ENTRY against pattern[n]
  //       If fails, continue
  //       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
  //
  // Caveat:
  //   Cache all stats and readdirs results to minimize syscall.  Since all
  //   we ever care about is existence and directory-ness, we can just keep
  //   `true` for files, and [children,...] for directories, or `false` for
  //   things that don't exist.

  var glob_1 = glob$1;
  var EE = require$$0__default$1["default"].EventEmitter;
  var setopts = common.setopts;
  var ownProp = common.ownProp;
  var childrenIgnored = common.childrenIgnored;
  var isIgnored = common.isIgnored;

  function glob$1(pattern, options, cb) {
    if (typeof options === 'function') cb = options, options = {};
    if (!options) options = {};

    if (options.sync) {
      if (cb) throw new TypeError('callback provided to sync glob');
      return sync(pattern, options);
    }

    return new Glob(pattern, options, cb);
  }

  glob$1.sync = sync;
  var GlobSync = glob$1.GlobSync = sync.GlobSync; // old api surface

  glob$1.glob = glob$1;

  function extend(origin, add) {
    if (add === null || _typeof(add) !== 'object') {
      return origin;
    }

    var keys = Object.keys(add);
    var i = keys.length;

    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }

    return origin;
  }

  glob$1.hasMagic = function (pattern, options_) {
    var options = extend({}, options_);
    options.noprocess = true;
    var g = new Glob(pattern, options);
    var set = g.minimatch.set;
    if (!pattern) return false;
    if (set.length > 1) return true;

    for (var j = 0; j < set[0].length; j++) {
      if (typeof set[0][j] !== 'string') return true;
    }

    return false;
  };

  glob$1.Glob = Glob;
  inherits(Glob, EE);

  function Glob(pattern, options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = null;
    }

    if (options && options.sync) {
      if (cb) throw new TypeError('callback provided to sync glob');
      return new GlobSync(pattern, options);
    }

    if (!(this instanceof Glob)) return new Glob(pattern, options, cb);
    setopts(this, pattern, options);
    this._didRealPath = false; // process each pattern in the minimatch set

    var n = this.minimatch.set.length; // The matches are stored as {<filename>: true,...} so that
    // duplicates are automagically pruned.
    // Later, we do an Object.keys() on these.
    // Keep them as a list so we can fill in when nonull is set.

    this.matches = new Array(n);

    if (typeof cb === 'function') {
      cb = once_1(cb);
      this.on('error', cb);
      this.on('end', function (matches) {
        cb(null, matches);
      });
    }

    var self = this;
    this._processing = 0;
    this._emitQueue = [];
    this._processQueue = [];
    this.paused = false;
    if (this.noprocess) return this;
    if (n === 0) return done();
    var sync = true;

    for (var i = 0; i < n; i++) {
      this._process(this.minimatch.set[i], i, false, done);
    }

    sync = false;

    function done() {
      --self._processing;

      if (self._processing <= 0) {
        if (sync) {
          process.nextTick(function () {
            self._finish();
          });
        } else {
          self._finish();
        }
      }
    }
  }

  Glob.prototype._finish = function () {
    assert__default["default"](this instanceof Glob);
    if (this.aborted) return;
    if (this.realpath && !this._didRealpath) return this._realpath();
    common.finish(this);
    this.emit('end', this.found);
  };

  Glob.prototype._realpath = function () {
    if (this._didRealpath) return;
    this._didRealpath = true;
    var n = this.matches.length;
    if (n === 0) return this._finish();
    var self = this;

    for (var i = 0; i < this.matches.length; i++) {
      this._realpathSet(i, next);
    }

    function next() {
      if (--n === 0) self._finish();
    }
  };

  Glob.prototype._realpathSet = function (index, cb) {
    var matchset = this.matches[index];
    if (!matchset) return cb();
    var found = Object.keys(matchset);
    var self = this;
    var n = found.length;
    if (n === 0) return cb();
    var set = this.matches[index] = Object.create(null);
    found.forEach(function (p, i) {
      // If there's a problem with the stat, then it means that
      // one or more of the links in the realpath couldn't be
      // resolved.  just return the abs value in that case.
      p = self._makeAbs(p);
      fs_realpath.realpath(p, self.realpathCache, function (er, real) {
        if (!er) set[real] = true;else if (er.syscall === 'stat') set[p] = true;else self.emit('error', er); // srsly wtf right here

        if (--n === 0) {
          self.matches[index] = set;
          cb();
        }
      });
    });
  };

  Glob.prototype._mark = function (p) {
    return common.mark(this, p);
  };

  Glob.prototype._makeAbs = function (f) {
    return common.makeAbs(this, f);
  };

  Glob.prototype.abort = function () {
    this.aborted = true;
    this.emit('abort');
  };

  Glob.prototype.pause = function () {
    if (!this.paused) {
      this.paused = true;
      this.emit('pause');
    }
  };

  Glob.prototype.resume = function () {
    if (this.paused) {
      this.emit('resume');
      this.paused = false;

      if (this._emitQueue.length) {
        var eq = this._emitQueue.slice(0);

        this._emitQueue.length = 0;

        for (var i = 0; i < eq.length; i++) {
          var e = eq[i];

          this._emitMatch(e[0], e[1]);
        }
      }

      if (this._processQueue.length) {
        var pq = this._processQueue.slice(0);

        this._processQueue.length = 0;

        for (var i = 0; i < pq.length; i++) {
          var p = pq[i];
          this._processing--;

          this._process(p[0], p[1], p[2], p[3]);
        }
      }
    }
  };

  Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
    assert__default["default"](this instanceof Glob);
    assert__default["default"](typeof cb === 'function');
    if (this.aborted) return;
    this._processing++;

    if (this.paused) {
      this._processQueue.push([pattern, index, inGlobStar, cb]);

      return;
    } //console.error('PROCESS %d', this._processing, pattern)
    // Get the first [n] parts of pattern that are all strings.


    var n = 0;

    while (typeof pattern[n] === 'string') {
      n++;
    } // now n is the index of the first one that is *not* a string.
    // see if there's anything else


    var prefix;

    switch (n) {
      // if not, then this is rather simple
      case pattern.length:
        this._processSimple(pattern.join('/'), index, cb);

        return;

      case 0:
        // pattern *starts* with some non-trivial item.
        // going to readdir(cwd), but not include the prefix in matches.
        prefix = null;
        break;

      default:
        // pattern has some string bits in the front.
        // whatever it starts with, whether that's 'absolute' like /foo/bar,
        // or 'relative' like '../baz'
        prefix = pattern.slice(0, n).join('/');
        break;
    }

    var remain = pattern.slice(n); // get the list of entries.

    var read;
    if (prefix === null) read = '.';else if (pathIsAbsolute(prefix) || pathIsAbsolute(pattern.join('/'))) {
      if (!prefix || !pathIsAbsolute(prefix)) prefix = '/' + prefix;
      read = prefix;
    } else read = prefix;

    var abs = this._makeAbs(read); //if ignored, skip _processing


    if (childrenIgnored(this, read)) return cb();
    var isGlobStar = remain[0] === minimatch_1.GLOBSTAR;
    if (isGlobStar) this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);else this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
  };

  Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
    var self = this;

    this._readdir(abs, inGlobStar, function (er, entries) {
      return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
    });
  };

  Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
    // if the abs isn't a dir, then nothing can match!
    if (!entries) return cb(); // It will only match dot entries if it starts with a dot, or if
    // dot is set.  Stuff like @(.foo|.bar) isn't allowed.

    var pn = remain[0];
    var negate = !!this.minimatch.negate;
    var rawGlob = pn._glob;
    var dotOk = this.dot || rawGlob.charAt(0) === '.';
    var matchedEntries = [];

    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];

      if (e.charAt(0) !== '.' || dotOk) {
        var m;

        if (negate && !prefix) {
          m = !e.match(pn);
        } else {
          m = e.match(pn);
        }

        if (m) matchedEntries.push(e);
      }
    } //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)


    var len = matchedEntries.length; // If there are no matched entries, then nothing matches.

    if (len === 0) return cb(); // if this is the last remaining pattern bit, then no need for
    // an additional stat *unless* the user has specified mark or
    // stat explicitly.  We know they exist, since readdir returned
    // them.

    if (remain.length === 1 && !this.mark && !this.stat) {
      if (!this.matches[index]) this.matches[index] = Object.create(null);

      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];

        if (prefix) {
          if (prefix !== '/') e = prefix + '/' + e;else e = prefix + e;
        }

        if (e.charAt(0) === '/' && !this.nomount) {
          e = path__default["default"].join(this.root, e);
        }

        this._emitMatch(index, e);
      } // This was the last one, and no stats were needed


      return cb();
    } // now test all matched entries as stand-ins for that part
    // of the pattern.


    remain.shift();

    for (var i = 0; i < len; i++) {
      var e = matchedEntries[i];

      if (prefix) {
        if (prefix !== '/') e = prefix + '/' + e;else e = prefix + e;
      }

      this._process([e].concat(remain), index, inGlobStar, cb);
    }

    cb();
  };

  Glob.prototype._emitMatch = function (index, e) {
    if (this.aborted) return;
    if (isIgnored(this, e)) return;

    if (this.paused) {
      this._emitQueue.push([index, e]);

      return;
    }

    var abs = pathIsAbsolute(e) ? e : this._makeAbs(e);
    if (this.mark) e = this._mark(e);
    if (this.absolute) e = abs;
    if (this.matches[index][e]) return;

    if (this.nodir) {
      var c = this.cache[abs];
      if (c === 'DIR' || Array.isArray(c)) return;
    }

    this.matches[index][e] = true;
    var st = this.statCache[abs];
    if (st) this.emit('stat', e, st);
    this.emit('match', e);
  };

  Glob.prototype._readdirInGlobStar = function (abs, cb) {
    if (this.aborted) return; // follow all symlinked directories forever
    // just proceed as if this is a non-globstar situation

    if (this.follow) return this._readdir(abs, false, cb);
    var lstatkey = 'lstat\0' + abs;
    var self = this;
    var lstatcb = inflight_1(lstatkey, lstatcb_);
    if (lstatcb) self.fs.lstat(abs, lstatcb);

    function lstatcb_(er, lstat) {
      if (er && er.code === 'ENOENT') return cb();
      var isSym = lstat && lstat.isSymbolicLink();
      self.symlinks[abs] = isSym; // If it's not a symlink or a dir, then it's definitely a regular file.
      // don't bother doing a readdir in that case.

      if (!isSym && lstat && !lstat.isDirectory()) {
        self.cache[abs] = 'FILE';
        cb();
      } else self._readdir(abs, false, cb);
    }
  };

  Glob.prototype._readdir = function (abs, inGlobStar, cb) {
    if (this.aborted) return;
    cb = inflight_1('readdir\0' + abs + '\0' + inGlobStar, cb);
    if (!cb) return; //console.error('RD %j %j', +inGlobStar, abs)

    if (inGlobStar && !ownProp(this.symlinks, abs)) return this._readdirInGlobStar(abs, cb);

    if (ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (!c || c === 'FILE') return cb();
      if (Array.isArray(c)) return cb(null, c);
    }

    var self = this;
    self.fs.readdir(abs, readdirCb(this, abs, cb));
  };

  function readdirCb(self, abs, cb) {
    return function (er, entries) {
      if (er) self._readdirError(abs, er, cb);else self._readdirEntries(abs, entries, cb);
    };
  }

  Glob.prototype._readdirEntries = function (abs, entries, cb) {
    if (this.aborted) return; // if we haven't asked to stat everything, then just
    // assume that everything in there exists, so we can avoid
    // having to stat it a second time.

    if (!this.mark && !this.stat) {
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (abs === '/') e = abs + e;else e = abs + '/' + e;
        this.cache[e] = true;
      }
    }

    this.cache[abs] = entries;
    return cb(null, entries);
  };

  Glob.prototype._readdirError = function (f, er, cb) {
    if (this.aborted) return; // handle errors, and cache the information

    switch (er.code) {
      case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205

      case 'ENOTDIR':
        // totally normal. means it *does* exist.
        var abs = this._makeAbs(f);

        this.cache[abs] = 'FILE';

        if (abs === this.cwdAbs) {
          var error = new Error(er.code + ' invalid cwd ' + this.cwd);
          error.path = this.cwd;
          error.code = er.code;
          this.emit('error', error);
          this.abort();
        }

        break;

      case 'ENOENT': // not terribly unusual

      case 'ELOOP':
      case 'ENAMETOOLONG':
      case 'UNKNOWN':
        this.cache[this._makeAbs(f)] = false;
        break;

      default:
        // some unusual error.  Treat as failure.
        this.cache[this._makeAbs(f)] = false;

        if (this.strict) {
          this.emit('error', er); // If the error is handled, then we abort
          // if not, we threw out of here

          this.abort();
        }

        if (!this.silent) console.error('glob error', er);
        break;
    }

    return cb();
  };

  Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
    var self = this;

    this._readdir(abs, inGlobStar, function (er, entries) {
      self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
    });
  };

  Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
    //console.error('pgs2', prefix, remain[0], entries)
    // no entries means not a dir, so it can never have matches
    // foo.txt/** doesn't match foo.txt
    if (!entries) return cb(); // test without the globstar, and with every child both below
    // and replacing the globstar.

    var remainWithoutGlobStar = remain.slice(1);
    var gspref = prefix ? [prefix] : [];
    var noGlobStar = gspref.concat(remainWithoutGlobStar); // the noGlobStar pattern exits the inGlobStar state

    this._process(noGlobStar, index, false, cb);

    var isSym = this.symlinks[abs];
    var len = entries.length; // If it's a symlink, and we're in a globstar, then stop

    if (isSym && inGlobStar) return cb();

    for (var i = 0; i < len; i++) {
      var e = entries[i];
      if (e.charAt(0) === '.' && !this.dot) continue; // these two cases enter the inGlobStar state

      var instead = gspref.concat(entries[i], remainWithoutGlobStar);

      this._process(instead, index, true, cb);

      var below = gspref.concat(entries[i], remain);

      this._process(below, index, true, cb);
    }

    cb();
  };

  Glob.prototype._processSimple = function (prefix, index, cb) {
    // XXX review this.  Shouldn't it be doing the mounting etc
    // before doing stat?  kinda weird?
    var self = this;

    this._stat(prefix, function (er, exists) {
      self._processSimple2(prefix, index, er, exists, cb);
    });
  };

  Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {
    //console.error('ps2', prefix, exists)
    if (!this.matches[index]) this.matches[index] = Object.create(null); // If it doesn't exist, then just mark the lack of results

    if (!exists) return cb();

    if (prefix && pathIsAbsolute(prefix) && !this.nomount) {
      var trail = /[\/\\]$/.test(prefix);

      if (prefix.charAt(0) === '/') {
        prefix = path__default["default"].join(this.root, prefix);
      } else {
        prefix = path__default["default"].resolve(this.root, prefix);
        if (trail) prefix += '/';
      }
    }

    if (process.platform === 'win32') prefix = prefix.replace(/\\/g, '/'); // Mark this as a match

    this._emitMatch(index, prefix);

    cb();
  }; // Returns either 'DIR', 'FILE', or false


  Glob.prototype._stat = function (f, cb) {
    var abs = this._makeAbs(f);

    var needDir = f.slice(-1) === '/';
    if (f.length > this.maxLength) return cb();

    if (!this.stat && ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (Array.isArray(c)) c = 'DIR'; // It exists, but maybe not how we need it

      if (!needDir || c === 'DIR') return cb(null, c);
      if (needDir && c === 'FILE') return cb(); // otherwise we have to stat, because maybe c=true
      // if we know it exists, but not what it is.
    }
    var stat = this.statCache[abs];

    if (stat !== undefined) {
      if (stat === false) return cb(null, stat);else {
        var type = stat.isDirectory() ? 'DIR' : 'FILE';
        if (needDir && type === 'FILE') return cb();else return cb(null, type, stat);
      }
    }

    var self = this;
    var statcb = inflight_1('stat\0' + abs, lstatcb_);
    if (statcb) self.fs.lstat(abs, statcb);

    function lstatcb_(er, lstat) {
      if (lstat && lstat.isSymbolicLink()) {
        // If it's a symlink, then treat it as the target, unless
        // the target does not exist, then treat it as a file.
        return self.fs.stat(abs, function (er, stat) {
          if (er) self._stat2(f, abs, null, lstat, cb);else self._stat2(f, abs, er, stat, cb);
        });
      } else {
        self._stat2(f, abs, er, lstat, cb);
      }
    }
  };

  Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
    if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
      this.statCache[abs] = false;
      return cb();
    }

    var needDir = f.slice(-1) === '/';
    this.statCache[abs] = stat;
    if (abs.slice(-1) === '/' && stat && !stat.isDirectory()) return cb(null, false, stat);
    var c = true;
    if (stat) c = stat.isDirectory() ? 'DIR' : 'FILE';
    this.cache[abs] = this.cache[abs] || c;
    if (needDir && c === 'FILE') return cb();
    return cb(null, c, stat);
  };

  var glob = undefined;

  try {
    glob = require$$0;
  } catch (_err) {// treat glob as optional.
  }

  var defaultGlobOpts = {
    nosort: true,
    silent: true
  }; // for EMFILE handling

  var timeout = 0;
  var isWindows = process.platform === "win32";

  var defaults = function defaults(options) {
    var methods = ['unlink', 'chmod', 'stat', 'lstat', 'rmdir', 'readdir'];
    methods.forEach(function (m) {
      options[m] = options[m] || fs__default["default"][m];
      m = m + 'Sync';
      options[m] = options[m] || fs__default["default"][m];
    });
    options.maxBusyTries = options.maxBusyTries || 3;
    options.emfileWait = options.emfileWait || 1000;

    if (options.glob === false) {
      options.disableGlob = true;
    }

    if (options.disableGlob !== true && glob === undefined) {
      throw Error('glob dependency not found, set `options.disableGlob = true` if intentional');
    }

    options.disableGlob = options.disableGlob || false;
    options.glob = options.glob || defaultGlobOpts;
  };

  var rimraf = function rimraf(p, options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }

    assert__default["default"](p, 'rimraf: missing path');
    assert__default["default"].equal(_typeof(p), 'string', 'rimraf: path should be a string');
    assert__default["default"].equal(_typeof(cb), 'function', 'rimraf: callback function required');
    assert__default["default"](options, 'rimraf: invalid options argument provided');
    assert__default["default"].equal(_typeof(options), 'object', 'rimraf: options should be object');
    defaults(options);
    var busyTries = 0;
    var errState = null;
    var n = 0;

    var next = function next(er) {
      errState = errState || er;
      if (--n === 0) cb(errState);
    };

    var afterGlob = function afterGlob(er, results) {
      if (er) return cb(er);
      n = results.length;
      if (n === 0) return cb();
      results.forEach(function (p) {
        var CB = function CB(er) {
          if (er) {
            if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") && busyTries < options.maxBusyTries) {
              busyTries++; // try again, with the same exact callback as this one.

              return setTimeout(function () {
                return rimraf_(p, options, CB);
              }, busyTries * 100);
            } // this one won't happen if graceful-fs is used.


            if (er.code === "EMFILE" && timeout < options.emfileWait) {
              return setTimeout(function () {
                return rimraf_(p, options, CB);
              }, timeout++);
            } // already gone


            if (er.code === "ENOENT") er = null;
          }

          timeout = 0;
          next(er);
        };

        rimraf_(p, options, CB);
      });
    };

    if (options.disableGlob || !glob.hasMagic(p)) return afterGlob(null, [p]);
    options.lstat(p, function (er, stat) {
      if (!er) return afterGlob(null, [p]);
      glob(p, options.glob, afterGlob);
    });
  }; // Two possible strategies.
  // 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
  // 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
  //
  // Both result in an extra syscall when you guess wrong.  However, there
  // are likely far more normal files in the world than directories.  This
  // is based on the assumption that a the average number of files per
  // directory is >= 1.
  //
  // If anyone ever complains about this, then I guess the strategy could
  // be made configurable somehow.  But until then, YAGNI.


  var rimraf_ = function rimraf_(p, options, cb) {
    assert__default["default"](p);
    assert__default["default"](options);
    assert__default["default"](typeof cb === 'function'); // sunos lets the root user unlink directories, which is... weird.
    // so we have to lstat here and make sure it's not a dir.

    options.lstat(p, function (er, st) {
      if (er && er.code === "ENOENT") return cb(null); // Windows can EPERM on stat.  Life is suffering.

      if (er && er.code === "EPERM" && isWindows) fixWinEPERM(p, options, er, cb);
      if (st && st.isDirectory()) return rmdir(p, options, er, cb);
      options.unlink(p, function (er) {
        if (er) {
          if (er.code === "ENOENT") return cb(null);
          if (er.code === "EPERM") return isWindows ? fixWinEPERM(p, options, er, cb) : rmdir(p, options, er, cb);
          if (er.code === "EISDIR") return rmdir(p, options, er, cb);
        }

        return cb(er);
      });
    });
  };

  var fixWinEPERM = function fixWinEPERM(p, options, er, cb) {
    assert__default["default"](p);
    assert__default["default"](options);
    assert__default["default"](typeof cb === 'function');
    options.chmod(p, 438, function (er2) {
      if (er2) cb(er2.code === "ENOENT" ? null : er);else options.stat(p, function (er3, stats) {
        if (er3) cb(er3.code === "ENOENT" ? null : er);else if (stats.isDirectory()) rmdir(p, options, er, cb);else options.unlink(p, cb);
      });
    });
  };

  var fixWinEPERMSync = function fixWinEPERMSync(p, options, er) {
    assert__default["default"](p);
    assert__default["default"](options);

    try {
      options.chmodSync(p, 438);
    } catch (er2) {
      if (er2.code === "ENOENT") return;else throw er;
    }

    var stats;

    try {
      stats = options.statSync(p);
    } catch (er3) {
      if (er3.code === "ENOENT") return;else throw er;
    }

    if (stats.isDirectory()) rmdirSync(p, options, er);else options.unlinkSync(p);
  };

  var rmdir = function rmdir(p, options, originalEr, cb) {
    assert__default["default"](p);
    assert__default["default"](options);
    assert__default["default"](typeof cb === 'function'); // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
    // if we guessed wrong, and it's not a directory, then
    // raise the original error.

    options.rmdir(p, function (er) {
      if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")) rmkids(p, options, cb);else if (er && er.code === "ENOTDIR") cb(originalEr);else cb(er);
    });
  };

  var rmkids = function rmkids(p, options, cb) {
    assert__default["default"](p);
    assert__default["default"](options);
    assert__default["default"](typeof cb === 'function');
    options.readdir(p, function (er, files) {
      if (er) return cb(er);
      var n = files.length;
      if (n === 0) return options.rmdir(p, cb);
      var errState;
      files.forEach(function (f) {
        rimraf(path__default["default"].join(p, f), options, function (er) {
          if (errState) return;
          if (er) return cb(errState = er);
          if (--n === 0) options.rmdir(p, cb);
        });
      });
    });
  }; // this looks simpler, and is strictly *faster*, but will
  // tie up the JavaScript thread and fail on excessively
  // deep directory trees.


  var rimrafSync = function rimrafSync(p, options) {
    options = options || {};
    defaults(options);
    assert__default["default"](p, 'rimraf: missing path');
    assert__default["default"].equal(_typeof(p), 'string', 'rimraf: path should be a string');
    assert__default["default"](options, 'rimraf: missing options');
    assert__default["default"].equal(_typeof(options), 'object', 'rimraf: options should be object');
    var results;

    if (options.disableGlob || !glob.hasMagic(p)) {
      results = [p];
    } else {
      try {
        options.lstatSync(p);
        results = [p];
      } catch (er) {
        results = glob.sync(p, options.glob);
      }
    }

    if (!results.length) return;

    for (var i = 0; i < results.length; i++) {
      var _p = results[i];
      var st = void 0;

      try {
        st = options.lstatSync(_p);
      } catch (er) {
        if (er.code === "ENOENT") return; // Windows can EPERM on stat.  Life is suffering.

        if (er.code === "EPERM" && isWindows) fixWinEPERMSync(_p, options, er);
      }

      try {
        // sunos lets the root user unlink directories, which is... weird.
        if (st && st.isDirectory()) rmdirSync(_p, options, null);else options.unlinkSync(_p);
      } catch (er) {
        if (er.code === "ENOENT") return;
        if (er.code === "EPERM") return isWindows ? fixWinEPERMSync(_p, options, er) : rmdirSync(_p, options, er);
        if (er.code !== "EISDIR") throw er;
        rmdirSync(_p, options, er);
      }
    }
  };

  var rmdirSync = function rmdirSync(p, options, originalEr) {
    assert__default["default"](p);
    assert__default["default"](options);

    try {
      options.rmdirSync(p);
    } catch (er) {
      if (er.code === "ENOENT") return;
      if (er.code === "ENOTDIR") throw originalEr;
      if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM") rmkidsSync(p, options);
    }
  };

  var rmkidsSync = function rmkidsSync(p, options) {
    assert__default["default"](p);
    assert__default["default"](options);
    options.readdirSync(p).forEach(function (f) {
      return rimrafSync(path__default["default"].join(p, f), options);
    }); // We only end up here once we got ENOTEMPTY at least once, and
    // at this point, we are guaranteed to have removed all the kids.
    // So, we know that it won't be ENOENT or ENOTDIR or anything else.
    // try really hard to delete stuff on windows, because it has a
    // PROFOUNDLY annoying habit of not closing handles promptly when
    // files are deleted, resulting in spurious ENOTEMPTY errors.

    var retries = isWindows ? 100 : 1;
    var i = 0;

    do {
      var threw = true;

      try {
        var ret = options.rmdirSync(p, options);
        threw = false;
        return ret;
      } finally {
        if (++i < retries && threw) continue;
      }
    } while (true);
  };

  var rimraf_1 = rimraf;
  rimraf.sync = rimrafSync;

  /**
   * @name 复制文件路径
   * @param {string} [src=""] 输入路径
   * @param {string} [dist=""] 输出路径
   * @param {function} [filter=false] 过滤函数(返回函数表示过滤规则，返回false表示不复制)
   */

  function copyDir() {
    var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var dist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var filter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    copyDir$1.sync(src, dist, {
      cover: true,
      filter: filter,
      mode: true,
      utimes: true
    });
  }
  /**
   * @name 创建文件路径
   * @param {string} [dir=""] 路径
   */


  function createDir() {
    var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    !fs__default["default"].existsSync(dir) && makeDir_1.sync(dir);
  }
  /**
   * @name BFS读取文件(广度优先遍历)
   * @param {string} [dir=""] 路径
   * @param {regexp} [igonre=/(node_modules|\.git|\.DS_Store)$/] 忽略文件正则
   */


  function readFileForBFS() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.cwd();
    var igonre = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /(node_modules|\.git|\.DS_Store)$/;
    var paths = [];
    var queue = [];
    !igonre.test(path) && queue.unshift(path);

    var _loop = function _loop() {
      var topPath = queue.shift();
      var stat = fs__default["default"].statSync(topPath);

      if (!igonre.test(topPath)) {
        if (stat.isDirectory()) {
          fs__default["default"].readdirSync(topPath).forEach(function (v) {
            var spath = path__default["default"].join(topPath, v);
            queue.push(spath);
          });
        } else if (stat.isFile()) {
          paths.push(topPath);
        }
      }
    };

    while (queue.length) {
      _loop();
    }

    return paths;
  }
  /**
   * @name DFS读取文件(深度优先遍历)
   * @param {string} [dir=""] 路径
   * @param {regexp} [igonre=""] 忽略文件正则
   */


  function readFileForDFS() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.cwd();
    var igonre = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /(node_modules|\.git|\.DS_Store)$/;
    var paths = [];
    var stat = fs__default["default"].statSync(path);

    if (!igonre.test(path)) {
      if (stat.isDirectory()) {
        fs__default["default"].readdirSync(path).reduce(function (t, v) {
          var spath = path__default["default"].join(path, v);
          var spaths = ReadFileForDFS(spath, igonre);
          t.push.apply(t, _toConsumableArray(spaths));
          return t;
        }, paths);
      } else if (stat.isFile()) {
        paths.push(path);
      }
    }

    return paths;
  }
  /**
   * @name 删除文件路径
   * @param {string} [dir=""] 路径
   */


  function removeDir() {
    var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    rimraf_1.sync(dir);
  }

  /** 进程工具 **/
  /**
   * @name 运行命令
   * @param {string} [cmd="node -v"] 命令行
   */

  function runCmd() {
    var cmd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "node -v";
    return ChildProcess__default["default"].execSync(cmd, {
      encoding: "utf8"
    });
  }

  /** 类型工具 **/
  /**
   * @name Node类型
   */

  function nodeType() {
    var info = Os__default["default"].type().toLocaleLowerCase();

    var testUa = function testUa(regexp) {
      return regexp.test(info);
    };
    /* eslint-disable sort-keys */


    var systemMap = {
      windows: /windows/g,
      // windows系统
      macos: /darwin/g,
      // macos系统
      linux: /linux/g // linux系统

    };
    /* eslint-enable */

    var system = Object.keys(systemMap).find(function (v) {
      return testUa(systemMap[v]);
    }) || "unknow";
    return {
      nodeVs: runCmd("node -v").replace(/(v|\n|\r\n)/g, ""),
      npmVs: runCmd("npm -v").replace(/\n/g, ""),
      system: system,
      systemVs: Os__default["default"].release().split("-")[0]
    };
  }

  var node = /*#__PURE__*/Object.freeze({
    __proto__: null,
    copyDir: copyDir,
    createDir: createDir,
    nodeType: nodeType,
    readFileForBFS: readFileForBFS,
    readFileForDFS: readFileForDFS,
    removeDir: removeDir,
    runCmd: runCmd
  });

  /** Cookie工具 **/

  /**
   * @name 读取Cookie
   */
  function getCookie() {
    var cookies = document.cookie;
    return cookies ? cookies.split("; ").reduce(function (t, v) {
      var cookie = v.split("=");
      t[cookie[0]] = cookie[1];
      return t;
    }, {}) : {};
  }
  /**
   * @name 删除Cookie
   * @param {string} [key=""] 键
   */


  function removeCookie() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    setCookie(key, "", -1);
  }
  /**
   * @name 设置Cookie
   * @param {string} [key=""] 键
   * @param {string} [val=""] 值
   * @param {number} [day=1] 过期时间(日)
   */


  function setCookie() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var day = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = "".concat(key, "=").concat(val, ";expires=").concat(date);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  /**
   * @name 自适应
   * @param {number} [width=750] 设计图宽度
   */

  function autoResponse() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 750;
    var target = document.documentElement;

    if (target.clientWidth >= 600) {
      target.style.fontSize = "80px";
    } else {
      target.style.fontSize = target.clientWidth / width * 100 + "px";
    }
  }
  /**
   * @name 复制粘贴
   * @param {element} [elem=document.body] 节点
   */


  function copyPaste() {
    var elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    var end = elem.childNodes.length;
    var range = document.createRange();
    var selection = getSelection();
    range.setStart(elem, 0);
    range.setEnd(elem, end);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy", false, null);
    selection.removeRange(range);
  }
  /**
   * @name 下载文件
   * @param {string} [url=""] 地址
   * @param {string} [name=""] 文件名
   */


  function downloadFile() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var target = document.createElement("a");
    var event = document.createEvent("MouseEvents");
    target.setAttribute("href", url);
    target.setAttribute("download", name);
    event.initEvent("click", true, true);
    target.dispatchEvent(event);
  }
  /**
   * @name 过滤XSS
   * @param {string} [html=""] HTML内容
   */


  function filterXss() {
    var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var elem = document.createElement("div");
    elem.innerText = html;
    var result = elem.innerHTML;
    return result;
  }
  /**
   * @name 图像转B64
   * @param {string} [url=""] 地址
   * @param {string} [type="image/png"] 类型：image/jpeg、image/png
   */


  function img2Base64() {
    return _img2Base.apply(this, arguments);
  }
  /**
   * @name JSONP
   * @param {string} [url=""] 地址
   * @param {string} [name="jsonp"] 全局变量
   * @param {function} [cb=null] 回调函数
   */


  function _img2Base() {
    _img2Base = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
      var url,
          type,
          promise,
          _yield$asyncTo,
          _yield$asyncTo2,
          err,
          res,
          _args = arguments;

      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              url = _args.length > 0 && _args[0] !== undefined ? _args[0] : "";
              type = _args.length > 1 && _args[1] !== undefined ? _args[1] : "image/png";
              promise = new Promise(function (resolve, reject) {
                var img = new Image();
                img.setAttribute("src", url);
                img.setAttribute("crossOrigin", "");
                img.addEventListener("load", function () {
                  var canvas = document.createElement("canvas");
                  canvas.width = img.width;
                  canvas.height = img.height;
                  canvas.getContext("2d").drawImage(img, 0, 0);
                  var dataURL = canvas.toDataURL(type);
                  canvas = null;
                  resolve(dataURL);
                });
                img.addEventListener("error", function (err) {
                  return reject(new Error(err));
                });
              });
              _context.next = 5;
              return asyncTo(promise);

            case 5:
              _yield$asyncTo = _context.sent;
              _yield$asyncTo2 = _slicedToArray(_yield$asyncTo, 2);
              err = _yield$asyncTo2[0];
              res = _yield$asyncTo2[1];
              return _context.abrupt("return", !err && res ? res : "");

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _img2Base.apply(this, arguments);
  }

  function jsonp() {
    return _jsonp.apply(this, arguments);
  }
  /**
   * @name 加载脚本
   * @param {string} [url=""] 地址
   * @param {string} [pst="body"] 插入位置
   */


  function _jsonp() {
    _jsonp = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
      var url,
          name,
          cb,
          promise,
          _yield$asyncTo3,
          _yield$asyncTo4,
          err,
          res,
          _args2 = arguments;

      return regenerator.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              url = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : "";
              name = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : "jsonp";
              cb = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : null;
              promise = new Promise(function (resolve, reject) {
                var script = document.createElement("script");
                script.setAttribute("src", url);
                script.setAttribute("async", true);
                script.addEventListener("load", function () {
                  return resolve(true);
                });
                script.addEventListener("error", function (err) {
                  return reject(new Error(err));
                });

                window[name] = function (data) {
                  return cb && cb(data);
                };

                document.body.appendChild(script);
              });
              _context2.next = 6;
              return asyncTo(promise);

            case 6:
              _yield$asyncTo3 = _context2.sent;
              _yield$asyncTo4 = _slicedToArray(_yield$asyncTo3, 2);
              err = _yield$asyncTo4[0];
              res = _yield$asyncTo4[1];
              return _context2.abrupt("return", !err && res);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _jsonp.apply(this, arguments);
  }

  function loadScript() {
    return _loadScript.apply(this, arguments);
  }

  function _loadScript() {
    _loadScript = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
      var url,
          pst,
          promise,
          _yield$asyncTo5,
          _yield$asyncTo6,
          err,
          res,
          _args3 = arguments;

      return regenerator.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              url = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : "";
              pst = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : "body";
              promise = new Promise(function (resolve, reject) {
                if (_toConsumableArray(document.getElementsByTagName("script")).some(function (v) {
                  return v.src === url || v.src.includes(url);
                })) {
                  reject(new Error("<".concat(pst, ">\u5DF2\u5B58\u5728").concat(url, "\u8BE5\u811A\u672C")));
                }

                var script = document.createElement("script");
                script.setAttribute("src", url);
                script.addEventListener("load", function () {
                  return resolve(true);
                });
                script.addEventListener("error", function (err) {
                  return reject(new Error(err));
                });
                document[pst].appendChild(script);
              });
              _context3.next = 5;
              return asyncTo(promise);

            case 5:
              _yield$asyncTo5 = _context3.sent;
              _yield$asyncTo6 = _slicedToArray(_yield$asyncTo5, 2);
              err = _yield$asyncTo6[0];
              res = _yield$asyncTo6[1];
              return _context3.abrupt("return", !err && res);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _loadScript.apply(this, arguments);
  }

  /**
   * @name URL参数反序列化
   */

  function parseUrlSearch() {
    var _location = location,
        search = _location.search;
    return search ? search.replace(/(^\?)|(&$)/g, "").split("&").reduce(function (t, v) {
      var _v$split = v.split("="),
          _v$split2 = _slicedToArray(_v$split, 2),
          key = _v$split2[0],
          val = _v$split2[1];

      t[key] = decodeURIComponent(val);
      return t;
    }, {}) : {};
  }
  /**
   * @name 删除URL参数
   * @param {array} search 参数集合
   */


  function removeUrlSearch() {
    for (var _len = arguments.length, search = new Array(_len), _key = 0; _key < _len; _key++) {
      search[_key] = arguments[_key];
    }

    if (isEmptyArray(search)) return;
    var url = location.origin + location.pathname;
    var hash = location.hash;
    var oldSearch = ParseUrlSearch();
    search.forEach(function (v) {
      return Reflect.deleteProperty(oldSearch, v);
    });
    var newSearchStr = StringifyUrlSearch(oldSearch);
    history.pushState({}, null, url + newSearchStr + hash);
  }
  /**
   * @name 设置URL参数
   * @param {object} [search={}] 参数集合
   */


  function setUrlSearch() {
    var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (isEmptyObject(search)) return;
    var url = location.origin + location.pathname;
    var hash = location.hash;
    var oldSearch = ParseUrlSearch();
    var newSearch = Object.assign({}, oldSearch, search);
    var newSearchStr = StringifyUrlSearch(newSearch);
    history.pushState({}, null, url + newSearchStr + hash);
  }
  /**
   * @name URL参数序列化
   * @param {object} [search={}] 参数集合
   * @param {boolean} [clear=false] 是否清除假值(undefined、null、""、NaN)
   */


  function stringifyUrlSearch() {
    var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var clear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return Object.entries(search).reduce(function (t, v) {
      if (clear) {
        return [undefined, null, "", NaN].includes(v[1]) ? t : "".concat(t).concat(v[0], "=").concat(encodeURIComponent(v[1]), "&");
      } else {
        return "".concat(t).concat(v[0], "=").concat(encodeURIComponent(v[1]), "&");
      }
    }, isEmptyObject(search) ? "" : "?").replace(/&$/, "");
  }

  /** 函数工具 **/
  /**
   * @name 异步请求
   * @param {object} [data={}] 参数集合
   * @param {function} [error=null] 失败回调函数
   * @param {function} [success=null] 成功回调函数
   * @param {string} [type="get"] 类型：get、post
   * @param {string} [url=""] 地址
   */

  function ajax(_ref) {
    var _ref$data = _ref.data,
        data = _ref$data === void 0 ? {} : _ref$data,
        _ref$error = _ref.error,
        error = _ref$error === void 0 ? null : _ref$error,
        _ref$success = _ref.success,
        success = _ref$success === void 0 ? null : _ref$success,
        _ref$type = _ref.type,
        type = _ref$type === void 0 ? "get" : _ref$type,
        _ref$url = _ref.url,
        url = _ref$url === void 0 ? "" : _ref$url;
    var xhr = new XMLHttpRequest();
    var method = type.toUpperCase();
    data = stringifyUrlSearch(data);

    if (method === "GET") {
      xhr.open("GET", data ? "".concat(url).concat(data) : "".concat(url, "?t=").concat(+new Date()), true);
      xhr.send();
    } else if (method === "POST") {
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(data);
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          success && success(xhr.responseText);
        } else {
          error && error(xhr.status);
        }
      }
    };
  }

  /** Storage工具 **/

  /**
   * @name 清空LocalStorage
   */
  function clearLStorage() {
    localStorage.clear();
  }
  /**
   * @name 清空SessionStorage
   */


  function clearSStorage() {
    sessionStorage.clear();
  }
  /**
   * @name 读取LocalStorage
   * @param {string} [key=""] 键
   */


  function getLStorage() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    return JSON.parse(localStorage.getItem(key));
  }
  /**
   * @name 读取SessionStorage
   * @param {string} [key=""] 键
   */


  function getSStorage() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    return JSON.parse(sessionStorage.getItem(key));
  }
  /**
   * @name 移除LocalStorage
   * @param {string} [key=""] 键
   */


  function removeLStorage() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    localStorage.removeItem(key);
  }
  /**
   * @name 移除SessionStorage
   * @param {string} [key=""] 键
   */


  function removeSStorage() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    sessionStorage.removeItem(key);
  }
  /**
   * @name 设置LocalStorage
   * @param {string} [key=""] 键
   * @param {string} [val=""] 值
   */


  function setLStorage() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    localStorage.setItem(key, JSON.stringify(val));
  }
  /**
   * @name 设置SessionStorage
   * @param {string} [key=""] 键
   * @param {string} [val=""] 值
   */


  function setSStorage() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    sessionStorage.setItem(key, JSON.stringify(val));
  }

  /** 类型工具 **/

  /**
   * @name 浏览器类型
   * @param {string} [ua=navigator.userAgent.toLowerCase()] 用户代理
   */
  function browserType() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent.toLowerCase();

    // 权重：系统 > 平台 > 内核 > 载体 > 外壳
    var testUa = function testUa(regexp) {
      return regexp.test(ua);
    };

    var testVs = function testVs(regexp) {
      return regexp ? (ua.match(regexp) || "").toString().replace(/[^0-9|_.]/g, "").replace(/_/g, ".") : "unknow";
    };
    /* eslint-disable sort-keys */
    // 系统


    var systemMap = {
      windows: /windows|win32|win64|wow32|wow64/g,
      // windows系统
      macos: /macintosh|macintel/g,
      // macos系统
      linux: /x11/g,
      // linux系统
      android: /android|adr/g,
      // android系统
      ios: /ios|iphone|ipad|ipod|iwatch/g // ios系统

    };
    var systemVsMap = {
      windows: function windows() {
        var ver = (ua.match(/(windows nt [\d._]+)|(windows [\w._]+)/g) || "").toString().replace(/windows( nt)? /g, "");
        var map = {
          2000: /^(5\.0|2000)/g,
          xp: /^(5\.1|xp)/g,
          2003: /^(5\.2|2003)/g,
          vista: /^(6\.0|vista)/g,
          7: /^(6\.1|7)/g,
          8: /^(6\.2|8)/g,
          8.1: /^(6\.3|8\.1)/g,
          10: /^(10\.0|10)/g
        };
        return Object.keys(map).find(function (v) {
          return map[v].test(ver);
        }) || "unknow";
      },
      macos: /os x [\d._]+/g,
      android: /android [\d._]+/g,
      ios: /os [\d._]+/g
    };
    var system = Object.keys(systemMap).find(function (v) {
      return testUa(systemMap[v]);
    }) || "unknow";
    var systemVs = system === "windows" ? systemVsMap.windows() : testVs(systemVsMap[system]); // 平台

    var platformMap = {
      desktop: ["windows", "macos", "linux"],
      // 桌面端
      mobile: ["android", "ios", testUa(/mobile/g)] // 移动端

    };
    var platform = Object.keys(platformMap).find(function (v) {
      return platformMap[v].includes(system) || v === true;
    }) || "unknow"; // 内核

    var engineMap = {
      webkit: [/applewebkit/g, /applewebkit\/[\d._]+/g],
      // webkit内核
      gecko: [/(?=.*gecko)(?=.*firefox)/g, /gecko\/[\d._]+/g],
      // gecko内核
      presto: [/presto/g, /presto\/[\d._]+/g],
      // presto内核
      trident: [/trident|compatible|msie/g, /trident\/[\d._]+/g] // trident内核

    };
    var engine = Object.keys(engineMap).find(function (v) {
      return testUa(engineMap[v][0]);
    }) || "unknow";
    var engineVs = testVs(engineMap[engine] && engineMap[engine][1]); // 载体

    var supporterMap = {
      webkit: function webkit() {
        var map = {
          edge: /edge/g,
          // edge浏览器
          opera: /opr/g,
          // opera浏览器
          chrome: /chrome/g,
          // chrome浏览器
          safari: /safari/g // safari浏览器

        };
        return Object.keys(map).find(function (v) {
          return testUa(map[v]);
        }) || "unknow";
      },
      gecko: "firefox",
      // firefox浏览器
      presto: "opera",
      // opera浏览器
      trident: "iexplore" // iexplore浏览器

    };
    var supporterVsMap = {
      chrome: /chrome\/[\d._]+/g,
      safari: /version\/[\d._]+/g,
      firefox: /firefox\/[\d._]+/g,
      opera: /opr\/[\d._]+/g,
      iexplore: /(msie [\d._]+)|(rv:[\d._]+)/g,
      edge: /edge\/[\d._]+/g
    };
    var supporter = supporterMap[engine] ? engine === "webkit" ? supporterMap.webkit() : supporterMap[engine] : "unknow";
    var supporterVs = testVs(supporterVsMap[supporter]); // 外壳

    var shellMap = {
      wechat: [/micromessenger/g, /micromessenger\/[\d._]+/g],
      // 微信浏览器
      qq: [/qqbrowser/g, /qqbrowser\/[\d._]+/g],
      // QQ浏览器
      uc: [/ucbrowser/g, /ucbrowser\/[\d._]+/g],
      // UC浏览器
      360: [/qihu 360se/g, ""],
      // 360浏览器(无版本)
      2345: [/2345explorer/g, /2345explorer\/[\d._]+/g],
      // 2345浏览器
      sougou: [/metasr/g, ""],
      // 搜狗浏览器(无版本)
      liebao: [/lbbrowser/g, ""],
      // 猎豹浏览器(无版本)
      maxthon: [/maxthon/g, /maxthon\/[\d._]+/g] // 遨游浏览器

    };
    var shell = Object.keys(shellMap).find(function (v) {
      return testUa(shellMap[v][0]);
    }) || "none";
    var shellVs = testVs(shellMap[shell] && shellMap[shell][1]);
    /* eslint-enable */

    return Object.assign({
      engine: engine,
      // webkit gecko presto trident
      engineVs: engineVs,
      platform: platform,
      // desktop mobile
      supporter: supporter,
      // chrome safari firefox opera iexplore edge
      supporterVs: supporterVs,
      system: system,
      // windows macos linux android ios
      systemVs: systemVs
    }, shell === "none" ? {} : {
      shell: shell,
      // wechat qq uc 360 2345 sougou liebao maxthon
      shellVs: shellVs
    });
  }
  /**
   * @name 判断Element
   * @param {*} data 数据
   */


  function isElement(data) {
    return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === "object" ? data instanceof HTMLElement : data ? _typeof(data) === "object" && data.nodeType === 1 && typeof data.nodeName === "string" : false;
  }

  var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ajax: ajax,
    autoResponse: autoResponse,
    browserType: browserType,
    clearLStorage: clearLStorage,
    clearSStorage: clearSStorage,
    copyPaste: copyPaste,
    downloadFile: downloadFile,
    filterXss: filterXss,
    getCookie: getCookie,
    getLStorage: getLStorage,
    getSStorage: getSStorage,
    img2Base64: img2Base64,
    isElement: isElement,
    jsonp: jsonp,
    loadScript: loadScript,
    parseUrlSearch: parseUrlSearch,
    removeCookie: removeCookie,
    removeLStorage: removeLStorage,
    removeSStorage: removeSStorage,
    removeUrlSearch: removeUrlSearch,
    setCookie: setCookie,
    setLStorage: setLStorage,
    setSStorage: setSStorage,
    setUrlSearch: setUrlSearch,
    stringifyUrlSearch: stringifyUrlSearch
  });

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var index = _objectSpread(_objectSpread(_objectSpread({}, common$1), node), web);

  return index;

}));
