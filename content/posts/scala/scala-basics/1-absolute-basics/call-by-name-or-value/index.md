---
title: 'Call by Name or Value in Scala'
date: 2019-06-13
tags: [tag1, all, scala, scala_basics_series]
slug: scala-call-by-name-or-value
image: ./call-name-value-cover.png
summary: This blog post looks at calling Scala functions either by name or by value and the difference between the two methods.
category: Scala
prev: scala-recursion
next: scala-default-named-arguments
---

[[info]]
| This blog post looks at calling Scala functions either by **Name** or by **Value** and the difference between the two methods.
| You should be able to follow along with the code examples either in the Scala REPL or Scala Playground of any IDE.
| Alternatively you can use [ScalaFiddle](https://scalafiddle.io/) to follow along in your browser.
| The source code for the examples in this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/absoluteBasics/CBNvsCBV.scala).

There are two ways of calling functions in Scala, either **call by name** or **call by value**. Let's dive straight into an example so that we can examine the difference:

```scala
  def calledByValue(x: Long): Unit = {
    println("by value: " + x)
    println("by value: " + x)
  }

  def calledByName(x: => Long): Unit = {
    println("by name: " + x)
    println("by name: " + x)
  }
```

These two functions are almost identical, apart from one key difference. The calledByName function has an arrow **=>** inside the function definition.

So what exactly is the difference between these two functions? Well let's call them both and see what we get back:

```scala
  calledByValue(System.nanoTime())
  calledByName(System.nanoTime())
```

And this is what we get back:

```scala
by value: 179116115013686
by value: 179116115013686
by name: 179116233824542
by name: 179116233862264
```

## Call By Value

In the **Call by Value** function, the exact value of the expression is computed _before_ the function evaluates. That same value then gets used in the function definition, and the same value is used everywhere in the function. The **calledByValue** function would technically look like this:

```scala
  def calledByValue(x: Long): Unit = {
    println("by value: " + 179116115013686L)
    println("by value: " + 179116115013686L)
  }

  calledByValue(179116115013686L)
```

This is most likely the style of calling parameters familiar to you if you are used to imperative programming languages like Java.

## Call By Name

For the **Call By Name** function, the expression is passed to the function _literally as it is_. The expression then gets evaluated every time it is called inside the function. Our function then might look like this:

```scala
  def calledByName(x: => Long): Unit = {
    println("by name: " + System.nanoTime())
    println("by name: " + System.nanoTime())
  }
```

This is why, in our example, we see two different values when we print out the value of the function twice. The **=>** arrow delays the evaluation of the expression passed as a parameter. The parameter is used _literally_ every time when it is called in the function.

## Another Example - Delay Evaluation

Let's look at another example to illustrate this point. Say you had two functions as follows:

```scala
  def infinite(): Int = 1 + infinite()
  def printFirst(x: Int, y: => Int) = println(x)
```

If we called **printFirst()** like so:

```scala
  printFirst(infinite(), 43)
```

Then our program with crash with a [stack overflow error](https://stackoverflow.com/questions/214741/what-is-a-stackoverflowerror), when we try to evaluate the infinite function. But if we call the function with the parameters _inversely_:

```scala
  printFirst(43, infinite())
```

Our program doesn't crash, and just prints out the number 43. This is because the second parameter (y) doesn't get evaluated when we call the parameter. The call by name arrow in the function definition delays the evaluation of the expression until its needed, and in this case it is not used or evaluated.

## Summary

In this short post we examined the differences between **call by value** and **call by name** in our Scala functions. We saw how to specify that a parameter in a function should be call by name (with the **=>** arrow), and looked at some examples of the two different types.

## Source Code

As always, the source code for this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/absoluteBasics/CBNvsCBV.scala).

---
