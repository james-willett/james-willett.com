---
title: 'Values, Variables and Types in Scala'
date: 2019-05-12
tags: [all, scala, scala_basics_series]
slug: scala-values-variables-types
image: ./values-variables-types-cover.png
summary: In this the first post on our series of the absolute basics in Scala, we look at values, variables and types - the initial building blocks to get familiar with
category: Scala
next: scala-expressions
prev: scala-absolute-basics-overview
---

[[info]]
| This post is **part 1** of the _Scala - The Absolute Basics_ series. You can view [all the posts in the series](../blog/scala_basics_series) here.

Lets start our Scala journey by learning about values in Scala.

Create an object called Values and extend it from App, so that we can run it. Type in the following code:

```scala
object Values extends App {
    val x: Int = 99
    println(x)
}
```

Here we are declaring a **VALUE** called x, and we are telling the compiler it is of type **Int**.
We then assign it the value _99_.
On the next line, we simply print out the value

A key thing to note here, is that once a VAL has been declared, it can’t be reassigned.

For example, the following code would produce an error :

```scala
object Values extends App {

val x: Int = 42
println(x)

x = 66
}
```

So remember that Vals are immutable. The functional programming style of Scala encourages the use of these immutable vals.

## Type Inference

It isn’t always necessary to include the type when declaring a val. You could instead type:

```scala
object Values extends App {

val x = 42
println(x)
}
```

And this would run fine. The type is detected by the compiler by looking at the value assigned to the variable. This is known as **Type Inference**.

## The Basic Types

These are some of the really basic types in Scala, which you should be familiar with from other programming languages:

```scala
val myString: String = "James"
val myBoolean: Boolean = true
val myChar: Char = 'd'
val myInt: Int = 33
val myShort: Short = 326
val myLong: Long = 35263256234L // notice the L on the end - this tells the compiler its a Long
val myFloat: Float = 3.0f // again notice the f on the end
val myDouble: Double = 4.27
```

## Variables

In Scala you can declare a variable like so:

```scala
var myVariable: Int = 27
```

The difference between a VARIABLE and a VALUE, is that a VARIABLE can be reassigned:

```scala
myVariable = 6
```

Variables are used in Functional Programming for something called **SIDE EFFECTS**. Side effects allow us to see what our programs are doing.
Examples of side effects are changing a variable or printing to the console.
Programs without side effects are easier to understand, as there is no logic or variables to keep track of.
However, we can’t eliminate side effects completely, as we do need our programs to do something - otherwise they would serve no purpose!

## Summary

In this post you learned about values and variables in Scala, and the differences between them. Just remember that vals are immutable and vars are mutable (or can be changed).

In Scala, you generally what to try and prefer to use VALS over VARS. If you are coming from an imperative (i.e. Java) programming background, this may seem difficult at first.

We also learned that all vals and vars have types, whether we declare them explicitly or they are inferred by the compiler

## Source Code

As always, the source code for this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/absoluteBasics/ValuesVariablesTypes.scala).

---
