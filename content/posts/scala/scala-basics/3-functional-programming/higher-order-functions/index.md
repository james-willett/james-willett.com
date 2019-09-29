---
title: 'Higher Order Functions in Scala'
date: 2019-09-25
tags: [all, scala, scala_fp_series]
slug: scala-higher-order-functions
image: ./hof-cover.png
summary: In this post we will look at higher order functions and curried functions in Scala. These are a critical concept for functional programming
category: Scala
prev: scala-anonymous-functions
next: scala-map-flatmap-filter
---

[[info]]
| This post is **part 3** of the _Functional Programming in Scala_ series. You can view [all the posts in the series](../blog/scala_fp_series) here.

# TLDR;

Functional programming is all about working with functions. We need to pass functions as parameters, and return functions as results. Basically we want to work with functions as we work with any other kind of values.

This introduces the concept of **Higher Order Functions**:

```scala
def nTimesBetter(f: Int => Int, n: Int): Int => Int = ...
```

**Currying** in Scala is a by product of dealing with higher order functions. Currying means functions that have multiple parameter lists:

```scala
def curriedFormatter(a: Int, b: Int)(c: String): String
```

You can have as many parameter lists as you want in a curried function. And you can define _helper_ functions with smaller parameter lists that you can then use later - supplying the additional parameter lists as required.

---

# Introducing Higher Order Functions

In the previous blog posts so far in this series, we have spent time looking at [function types](https://www.scala-lang.org/files/archive/spec/2.11/03-types.html#function-types) in Scala.

Let's create a slightly more complex function, and go over how to read it:

```scala
val superFunction: (Int, (String, (Int => Boolean)) => Int) => (Int => Int) = null
```

- Starting with the _return type_, that comes after the final `scala±=>`. In this case, it is `scala±(Int => Int)` - so the return type is another function that takes an **Int** and returns an **Int**
- The first parameter of this function is simply an `scala±Int`
- The second parameter is `scala±(String, (Int => Boolean)) => Int`. This is _another_ function that takes a **String**, and the function **Int to Boolean**. The return type of this function is an **Int**

In short, the `scala±superFunction` takes two parameters, an **Int** and a **Function**. It returns another function.

As we touched upon in the last blog posts, such a function that takes a _function as parameters_, or returns a _function as its result_, is called a **Higher Order Function** or HOF for short.

Examples of higher order functions that we have seen so far are the `map`, `flatMap` and `filter` that we wrote in the [MyList application](../scala-covariant-generic-list). These are all higher order functions because each of them has a _function as a parameter_.

## Classic Higher Order Function Example

Say that we had the following function, that applies another function `n` times over a given value `x`:

```scala
def nTimes(f: Int => Int, n: Int, x: Int): Int = {
  // ... implementation todo
}
```

This function takes 3 parameters:

- The function `f` that will be applied
- The number of applications of this function `n`
- And the subject or value of the application of this function `x`

So if for example we called `scala±nTimes(f, 3, x)`, this will be 3 times the application of `f` over `x`. Or `f(x)` 3 times. We could express this as `scala±f(f(f(x)))`. This is a classic example of a higher order function. It takes a function as a parameter and applies it a number of times.

Our implementation of `nTimes` might look like this:

```scala
def nTimes(f: Int => Int, n: Int, x: Int): Int = {
  if (n <= 0) x
  else nTimes(f, n-1, f(x))
}
```

The first statement is `scala±if (n <= 0) x`. If this is true, there are no more applications of `f` to consider. So we can just return the value of `x`.

Otherwise, we recursively call `nTimes`. With the function `f`, the number of applications reduced `n-1`, and `f` being applied to `x`.

To explain this, think of our example with `nTimes(f, 3, x)`. This applies the `f` 3 times over the value `x`. Writing this out in pseudo code, we could say that `scala±nTimes(f, 3, x)` = `scala±f(f(f(x)))` = `scala±nTimes(f, 2, f(x))`. What we are saying here, is this is still `nTimes`, with the same function `f`, but `n` has been reduced to 2 and the value for x is now `f(x)` (or `f` applied to `x`). This is were the recursion is happening.

This is quite mathematically tricky to understand, so read it over carefully.

## Improving the nTimes Function

The function below simply takes an Int and increases the value by 1:

```scala
val plusOne = (x: Int) => x + 1
```

What happens when we call `nTimes` with this `plusOne` function, 10 times over the value 1?

```scala
println(nTimes(plusOne, 10, 1))
```

As you might expect, we will call `plusOne`, on the value `1`, 10 times. We increment by `1` 10 times, so we will print `11` to the console.

But there is a better way to implement the `nTimes` function. Instead of passing all the parameters at once (i.e. `scala±(f: Int => Int, n: Int, x: Int)`), we can instead say that the function `nTimes` does this:

- It takes a **function**
- And it takes a **number**
- And it returns **another function** which is the application of the first function `n` times

It would look like this:

```scala
def nTimesBetter(f: Int => Int, n: Int): (Int => Int) = {
  // ... implementation to follow
}
```

So this takes the function `f` as a parameter, and the number `n` as a parameter. But instead of taking the value `x` as a parameter as well, we can save for that later. Instead we just say that the return type will be `scala±(Int => Int)`.

The difference here with `nTimesBetter` is that instead of applying `f`, `n` times to the value `x`, we can save that for later.

In pseudo code, it would look like this: `scala±nTimesBetter(f,n) = x => f(f(f...(x)))` . So instead of actually _applying_ `f` `n` times to `x`, we are actually returning a **lambda** each time. You can then use that lambda as many times as you want, and apply it to various values.

Say we make a function called `increment10`, which is `nTimesBetter` of the increment `plusOne` that we made earlier, and `10`. This will return a lambda that applies `plus10` 10 times to `x`. In pseudo code it looks like this: `scala±increment10 = nTimesBetter(plusOne, 10) = x => plusOne(plusOne(plusOne...(x)))`.

You can then use this later, and say `scala±val y = increment10(1)`. You can use `increment10` as if it were a function that you computed earlier by calling `scala±nTimesBetter(plusOne, 10)`.

Let's get back to the implementation of `nTimesBetter`:

```scala
def nTimesBetter(f: Int => Int, n: Int): (Int => Int) = {
  if (n <= 0) (x: Int) => x
  else (x: Int) => nTimesBetter(f, n-1)(f(x))
}
```

And comparing it to the original `nTimes`:

```scala
def nTimes(f: Int => Int, n: Int, x: Int): Int = {
  if (n <= 0) x
  else nTimes(f, n-1, f(x))
}
```

It is similar to what we had before. Firstly if `scala±n <= 0` then instead of `x` we just return the identity function. This is a lambda that takes an Int and returns that value.

Otherwise it return a lambda, with the implementation basically the same as before.

So `nTimesBetter`, as we can see in the function definition returns a function, and that will be applied to `scala±f(x)`

Let's test out `nTimesBetter`, by creating a simple value of `plus10`:

```scala
val plus10 = nTimesBetter(plusOne, 10)
```

And then we will print `plus10` applied to the value `1` . We would expect to see the same value of `11` printed to the console:

```scala
println(plus10(1))
```

This is because `plus10` is `nTimesBetter` applied to `plusOne` and `10`. Which is a function that applies `plusOne` 10 times to whatever value we pass in (in this case `1`).

# Curried Functions

If you look at the style of writing for `scala±nTimesBetter(f, n-1)(f(x))`, you can see that we provide two sets of arguments in parentheses. This style is a concept called **curried functions**.

Previously we created this `superAdder` function:

```scala
val superAdder = (x: Int) => (y: Int) => x + y
```

The type of this function (as we can see in the IDE by hovering) is `scala±Int => Int => Int`. So we can say that this function receives an `Int`, and then return _another_ function that is `scala±Int => Int`. Therefore we could actually say that the type is `scala±Int => (Int => Int)`. The _parentheses_ is implied by the compiler.

So we could call superAdder by creating some additional helper functions. For example if we wanted to add 3:

```scala
val add3 = superAdder(3)
```

The above is actually a lambda from `scala±y => 3 + y`. So we could println `3` called with `10`:

```scala
println(add3(10)) // prints 13
```

These curried functions are very useful if you want to define helper functions that you want to use later on with various values.

So if you instead wanted to call `superAdder` _without_ the helper function `add3`, then you can pass in two sets of parameters instead:

```scala
println(superAdder(3)(10))
```

## Curried Functions with Multiple Parameter Lists

Scala supports another type of curried function, by specifying functions with _multiple parameter_ lists. Let's write out a curried formatter that will turn a double into a string according to some kind of format:

```scala
def curriedFormatter(c: String)(x: Double): String = c.format(x)
```

This function receives a format `c`, and a double `x`. It is receiving _two_ parameter lists. It will return a `String` as the result. The implementation will simply be `scala±c.format(x)`.

Here we have defined a function with _multiple parameter lists_, and it will act like a **curried function**.

Let's create a couple of different formats that make use of this function:

```scala
val standardFormat: (Double => String) = curriedFormatter("%4.2f")
val preciseFormat: (Double => String) = curriedFormatter("%10.8f")
```

Both of these functions are a `curriedFormatter`, with the format string supplied to them. They are a function from `Double` to `String`, that applies `curriedFormater` with the format already supplied.

Let's test these out with `Math.PI`:

```scala
println(standardFormat(Math.PI)) // prints 3.14
println(preciseFormat(Math.PI)) // prints 3.14159265
```

The function `curriedFormatter` acts like a curried function, because we can later create sub functions that apply `curriedFormatter` with fewer parameter lists. We can then use them with another value later on, in this case with `Math.PI`.

Curried functions like these can have as many parameter lists as you want.

For functions with multiple parameter lists, if you want to define smaller functions later, you have to specify their _type_. Otherwise the code will not compile.

---

# Source Code

As always, the source code for this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/functionalProgramming/HOFsCurries.scala).
