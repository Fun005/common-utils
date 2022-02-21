(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.funnyUtils = factory());
})(this, (function () { 'use strict';

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
   * @param {number} [dura=500] 时延
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
   * @param {number} [dura=500] 时延
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
   * @param {number} [wait=1000] 时延
   */


  function waitFor() {
    return _waitFor.apply(this, arguments);
  }

  function _waitFor() {
    _waitFor = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
      var wait,
          _args = arguments;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              wait = _args.length > 0 && _args[0] !== undefined ? _args[0] : 1000;
              return _context.abrupt("return", new Promise(function (resolve) {
                return setTimeout(function () {
                  return resolve(true);
                }, wait);
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

  function deepClone(obj) {
    var map = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakMap();
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    if (obj == null || _typeof(obj) != 'object') return obj;

    if (map.has(obj)) {
      return map.get(obj);
    }

    var t = new obj.constructor();
    map.set(obj, t);

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        t[key] = deepClone(obj[key], map);
      }
    }

    return t;
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

    if (isArray(data1) && isArray(data2)) {
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

  function isArray(data) {
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

  var common = /*#__PURE__*/Object.freeze({
    __proto__: null,
    asyncTo: asyncTo,
    byteSize: byteSize,
    checkText: checkText,
    checkTextPlus: checkTextPlus,
    compareObj: compareObj,
    debounce: debounce,
    deepClone: deepClone,
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
    isArray: isArray,
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

  function limitRunTask(tasks, n) {
    return new Promise(function (resolve, reject) {
      var index = 0,
          finish = 0,
          start = 0,
          result = [];
      var taskLen = tasks.length;

      function run() {
        if (finish === taskLen) {
          resolve(result);
          return;
        }

        var _loop = function _loop() {
          // 每阶段的任务数量++
          start++;
          var current = index;
          tasks[index++]().then(function (v) {
            start--;
            finish++;
            result[current] = v;
            run();
          });
        };

        while (start < n && index < taskLen) {
          _loop();
        }
      }

      run();
    });
  }

  function multipleRequest() {
    var urls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var maxNum = arguments.length > 1 ? arguments[1] : undefined;
    // 请求总数量
    var len = urls.length; // 根据请求数量创建一个数组，保存请求的结果

    var result = new Array(len).fill(false); // 当前完成数量

    var count = 0;
    return new Promise(function (resolve, reject) {
      // 最多请求maxNum
      while (count < maxNum) {
        run();
      }

      function run() {
        var current = count++; //处理边界条件

        if (current >= len) {
          // 请求全部完成就将promise置为成功的状态，然后将result作为promise值返回
          !result.includes(false) && resolve(result);
          return;
        }

        var url = urls[current];
        console.time("start ".concat(current));
        fetch(url).then(function (res) {
          // 保存请求结果
          result[current] = res;
          console.log("end ".concat(current, ", ").concat(new Date().toLocaleString())); // 请求没有完成，递归执行

          if (current < len) {
            run();
          }
        })["catch"](function (err) {
          console.time("end ".concat(current, ", ").concat(new Date().toLocaleString()));
          result[current] = err; // 请求没有完成，递归执行

          if (current < len) {
            run();
          }
        });
      }
    });
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
    limitRunTask: limitRunTask,
    loadScript: loadScript,
    multipleRequest: multipleRequest,
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
  var index = _objectSpread(_objectSpread({}, common), web);

  return index;

}));
