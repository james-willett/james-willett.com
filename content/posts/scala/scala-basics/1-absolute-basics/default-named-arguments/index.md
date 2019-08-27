---
title: 'Default and Named Arguments in Scala'
date: 2019-06-14
tags: [all, scala, scala_basics_series]
slug: scala-default-named-arguments
image: ./default-named-args-cover.png
summary: A detailed look at specifying default arguments in Scala functions, and naming arguments when calling functions. Includes examples of when you might use these techniques
category: Scala
prev: scala-call-by-name-or-value
next: scala-string-operations
---

[[info]]
| This blog post looks at specifying default arguments in Scala functions, and naming arguments when calling functions.
| You should be able to follow along with the code examples either in the Scala REPL or Scala Playground of any IDE.
| Alternatively you can use [ScalaFiddle](https://scalafiddle.io/) to follow along in your browser.
| The source code for the examples in this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/absoluteBasics/DefaultArgs.scala).

In our previous blog post on [Recursion in Scala functions](./scala-basics-recursion), we wrote a tail recursive factorial function that looked like this:

```scala
  def tailRecursiveFactorial(n: Int, acc: Int): Int = {
    if (n <= 1) acc
    else tailRecursiveFactorial(n - 1, n * acc)
  }
```

The only useful way to start this function is to supply a value of 1 for the accumulator. Every time we call the function, we need to provide the accumulator:

```scala
  val fact10 = tailRecursiveFactorial(10, 1)
  val fact5 = tailRecursiveFactorial(5, 1)
```

You could say that having the **acc: Int** parameter in our function signature pollutes it somewhat. 99% of the time, the value of this _acc_ is going to be 1 when we call the function. We only include the _acc_ parameter so that we can make the function recursive.

One way that we could get around this, is to wrap our _tailRecursiveFactorial_ function in another function. We did that in the [previous blog post on Recursion](./scala-basics-recursion). But this still adds a lot of unnecessary code to our project. There is a better way.

# Default Values for Parameter in Function Signatures

We can provide the default value for the _acc_ parameter of the function in the signature, like so:

```scala
  def tailRecursiveFactorial(n: Int, acc: Int = 1): Int = {
    if (n <= 1) acc
    else tailRecursiveFactorial(n - 1, n * acc)
  }
```

Now we don't need to supply a value for the _acc_ when calling the function:

```scala
  val fact8 = tailRecursiveFactorial(8)
```

We can however still override the default value for the _acc_ parameter by providing a value in the function call:

```scala
  val fact15 = tailRecursiveFactorial(15,2)
```

# Problems with Default Parameters

So far, so good. But there are some challenges with default parameters that we need to be aware of.

Say for example you had the following function, which is used to save the dimensions and image type of a picture:

```scala
  def savePicture(format: String, width: Int, height: Int): Unit = println("saving picture")
```

Suppose that whenever this function is being called, it is usually to save a **JPG** image. I.e. we are calling it like this:

```scala
  savePicture("jpg", 800, 600)
```

So if we rewrote our function and called it like this, you might think that this should be fine:

```scala
  def savePicture(format: String = "jpg", width: Int, height: Int): Unit = println("saving picture")
  savePicture1(800, 600)
```

But the compiler throws an error that it [cannot resolve reference with such a signature](https://stackoverflow.com/questions/39518635/intellij-error-with-scala-function-cannot-resolve-reference-format-with-such-s). The compiler is confused, because it thinks that 800 is the first parameter (i.e. the format).

Let's give all of our parameters in our function definition a default value then:

```scala
  def savePicture(format: String = "jpg", width: Int = 1200, height: Int = 1000): Unit = println("saving picture")
```

This still doesn't help, when we supply a parameter the compiler has no way of knowing which parameter we are supplying:

```scala
  savePicture(800)
```

# Named Arguments in Function Calls

To make this work, in Scala we can name our arguments as we supply them:

```scala
  savePicture(width = 800)
```

A handy side effect of being able to name arguments in Scala, means that we can pass our arguments to the function in any order if we name them:

```scala
  savePicture(height = 500, format = "bmp", width = 300)
```

Being able to name arguments also makes our code a bit easier to read, especially for another person.

# Summary

In this post, we learned that when you mostly call a function with the same parameter you can supply a **default parameter** in the function signature.

But you can't omit leading default arguments, or the compiler will get confused when you call the function. So we learned about **naming parameters**, and that we can then pass named parameters to our functions in any order.

# Source Code

As always, the source code for this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/absoluteBasics/DefaultArgs.scala).

---
