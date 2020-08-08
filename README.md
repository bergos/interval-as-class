# interval-as-class

`setTimeout`, just as a class.

## Usage

The package exports the `Interval` class as default export.

### Interval(func, time, { aligned, offset, start})

Creates a new `Interval` instance.
The following arguments are supported:

- `func`: The function that should be called at each interval
- `time`: The time between each function call in milliseconds
- `aligned`: If `true`, aligns the time of the function calls when `Date.now() % time` is close to zero (default: `false`)
- `offset`: If `aligned` is `true`, this value will be used as offset to the aligned time (default: `0`)
- `start`: If `true`, the `Interval` will start immediately without calling `start()`

### start()

Starts calling the function at the given intervals.

### stop()

Stops calling the function.
