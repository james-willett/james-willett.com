---
title: 'Anonymous Functions in Scala'
date: 2019-09-20
tags: [all, scala, scala_fp_series]
slug: scala-anonymous-functions
image: ./anonymous-functions-cover.png
summary: We already learned about anonymous classes in a previous blog post. In this post, we learn about anonymous functions in Scala
category: Scala
prev: scala-function-types
---

[[info]]
| This post is **part 2** of the _Functional Programming in Scala_ series. You can view [all the posts in the series](../blog/scala_fp_series) here.

# TLDR;

The problem with **function types** is that they are cumbersome and still heavily _object oriented_. Instead, we can use **lambda functions** - `scala±(x, y) => x + y`.

The anatomy of a lambda looks like this:

```scala
val lambdaFunction = (name: String, age: Int) => name + " is " + age + " years old"
```

- First you have the parameters - `scala±(name: String, age: Int)` - each parameter has a **name** and a **type**
- Then the implementation `scala±name + " is " + age + " years old"` - which is a single expression
- The return type is always inferred
- And the parentheses for the parameters are mandatory if there is more than one parameter
- This is heavy syntactic sugar for instantiating anonymous `FunctionX` types

We also use further syntactic sugar in lambda functions with **underscores**:

```scala
val add: (Int, Int) => Int = _ + _
```

---

# Function Types are Object Oriented

We now know about [function types](../scala-function-types) from the previous blog post. There is a problem with the approach outlined in that blog post though. It is still very much tied to object orientation.

Take a look at the function below:

```scala
val doubler = new Function1[Int, Int] {
  override def apply(x: Int) = x * 2
}
```

This function simply doubles an Int. To implement it, we need to create a new `scala±Function1[Int, Int]` and then `scala±override def apply` and return `scala±x * 2`. This is quite long winded. It follows the objected oriented approach of defining an _anonymous function_ and instantiating it on the spot.

# Lambda Functions

In Scala, we can do all of the above like this (this is the exact equivalent of the code above):

```scala
val doubler = (x: Int) => x * 2
```

It instantiates a new `Function1`, with the `scala±override def apply` which takes an Int `x`, and returns `scala±x * 2`.

This is syntactic sugar for the _function type_ code. It is called an _anonymous function_, or a **lambda**.

The lambda is a value which is an instance of `Function1`. The type of our `scala±val doubler` we can see in the IDE by hovering over it is `scala±Int => Int`. So we could actually explicitly declare it as such:

```scala
val doubler: Int => Int = (x: Int) => x * 2
```

Given that we have declared `doubler` as the type `scala±Int => Int` we can actually remove the `scala±(x: Int)`, and let it be matched by the compiler:

```scala
val doubler: Int => Int = x => x * 2
```

If the compiler already knows that doubler should be an `scala±Int => Int` , it will assume that the expression will match the types. So `x` will be an Int, and the return value will be `scala±x * 2` , and all the types will match.

## Lambda Functions with Multiple Parameters

What happens if you have multiple parameters in a lambda? Say we had a val called `adder` that adds 2 numbers, `a` and `b`. We give it a type of taking two Ints and returning an Int:

```scala
val adder: (Int, Int) => Int = (a: Int, b: Int) => a + b
```

Notice that we must put the `scala±(Int, Int)` in between parentheses. When we had a single parameter (as before) we didn't need to do that, but for multiple parameters we do.

We could also omit the type of the `adder` function, and let the compiler infer it for us:

```scala
val adder = (a: Int, b: Int) => a + b
```

## Lambda Functions with no Parameters

What about if we have no parameters? The syntax for a no param lambda is `scala±() =>` and the value that you want to return (e.g 3):

```scala
val justDoSomething = () => 3
```

The type of this lambda is `scala±() => Int` - we could pass that to the compiler if we so choose:

```scala
val justDoSomething: () => Int = () => 3
```

Now look at the two `println` statements below:

```scala
println(justDoSomething)
println(justDoSomething())
```

If we run this code, the first `println` returns something like `scalaBasics.functionalProgramming.AnonymousFunctions$$$Lambda$11/991505714@2acf57e3`.

The second statement returns `3`, which is probably what we wanted!

You might be used to using `justDoSomething` when calling **methods** in Scala. But for calling **lambdas**, you must use the parentheses, i.e. `justDoSomething()`.

## Using Curly Braces with Lambdas

Another way of writing lambda functions is to use curly braces. The common style looks like this:

```scala
val stringToInt = { (str: String) =>
  str.toInt
}
```

At the level of the open curly brace we put `scala±(str: String) =>` , and right below we put the implementation of the lambda.

## Syntactic Sugar for Lambdas with Underscore (\_)

Lets look at more syntactic sugar. Say we had a function of type `scala±Int => Int`, which just increments the parameter. Normally we would write something like `scala±(x: Int) => x + 1`, for example:

```scala
val niceIncrementer: Int => Int = (x: Int) => x + 1
```

An even shorter way to write the above is:

```scala
val niceIncrementer: Int => Int = _ + 1
```

The above is equivalent to `scala±x => x + 1`.

Or if you had a two parameter function like this:

```scala
val niceAdder: (Int, Int) => Int = (a, b) => a + b
```

Instead of the above, this could be rewritten as:

```scala
val niceAdder: (Int, Int) => Int = _ + _
```

Where each of the underscores are a _different_ parameter. This is equivalent to `scala±(a,b) => a + b`.

This notation is extremely useful in practice when you want to chain higher order function calls.

But do note that the underscore notation is _extremely_ contextual. If you miss the type, the compiler won't know what each underscore means. For example if we wrote it like this:

```scala
val niceAdder = _ + _
```

This won't compile, the compiler doesn't know which underscore means what. It doesn't even know how many parameters the function should have.

# Replace FunctionX calls in MyList Application with Lambdas

We are going to replace all the `FunctionX` calls in **MyList** with lambdas. For reference, we first started writing the **MyList** application in the [Covariant Generic List in Scala](../scala-covariant-generic-list/) post.

### Map

The first `FunctionX` call that we are going to replace is the `map` call:

```scala
println(listOfIntegers.map(new Function1[Int, Int] {
  override def apply(elem: Int): Int = elem * 2
})).toString
```

This can be simply changed to:

```scala
println(listOfIntegers.map(elem => elem * 2).toString)
```

Or we can make an even shorter notation:

```scala
println(listOfIntegers.map(_ * 2).toString)
```

### Filter

Next for the `filter` method, we are going to replace this:

```scala
println(listOfIntegers.filter(new Function1[Int, Boolean] {
  override def apply(elem: Int): Boolean = elem % 2 == 0
})).toString
```

This we can change to:

```scala
println(listOfIntegers.filter(elem => elem % 2 == 0).toString)
```

Or for the even shorter notation:

```scala
println(listOfIntegers.filter(_ % 2 == 0).toString)
```

### FlatMap

Finally for the `flatMap`, we can change this:

```scala
println(listOfIntegers.flatMap(new Function1[Int, MyList[Int]] {
  override def apply(elem: Int): MyList[Int] = new Cons(elem, new Cons(elem + 1, Empty))
}).toString)
```

into this:

```scala
println(listOfIntegers.flatMap(elem => new Cons(elem, new Cons(elem + 1, Empty))).toString)
```

Note that the underscore notation doesn't work for this lambda, because we use the `elem` two times in the implementation. As we saw earlier, each underscore stands for a different parameter. You can't use an underscore multiple times.

# Lambda Version of SuperAdder

Next we will rewrite the `superAdder` function that we wrote in the [previous post](../scala-function-types) as an anonymous function. As a reminder, this is what the `superAdder` looked like previously:

```scala
val superAdder: Function1[Int, Function1[Int, Int]] = new Function1[Int, Function1[Int, Int]] {
  override def apply(x: Int): Function1[Int, Int] = new Function1[Int, Int] {
    override def apply(y: Int): Int = x + y
  }
}
```

Rewritten in a lambda, it looks like this:

```scala
val superAdder = (x: Int) => (y: Int) => x + y
```

So this reads as `scala±(x: Int)` then arrow and this pipes into another function, then `scala±(y: Int)`, and finally arrow into the implementation `scala±x + y`.

This is the lambda version of the curried function. This is a much more eloquent and shorter way to write it.

We can call it in the same way as before:

```scala
println(superAdder(3)(4)) // prints 7
```

Curried functions will be discussed more in upcoming posts.

---

# Source Code

As always, the source code for this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/functionalProgramming/AnonymousFunctions.scala).
