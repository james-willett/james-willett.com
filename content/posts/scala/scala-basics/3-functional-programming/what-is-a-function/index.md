---
title: 'What is a Function in Scala?'
date: 2019-09-18
tags: [all, scala, scala_fp_series]
slug: scala-functions-explained
image: ./what-function-cover.png
summary: This post is the introduction and overview to the Functional Programming in Scala post series. Covers what you can expect to learn in this series of posts
category: Scala
prev: scala-functional-programming-overview
---

# TLDR;

todo

---

For this first blog post in our series on Functional Programming in Scala, we will attempt to answer the question **What (really) is a function in Scala**. Functions were first introduced in an early post in the Absolute Basics in Scala series (see the post here). In this post, we will go into far greater depth.

# Functions - First Class Citizens

In Scala we want to treat functions as **first class citizens**. What we mean by that, is we want to work with **functions** like we would with regular **values**. There is a problem with this though... Coming from object oriented Java world, everything is an object. Or at least an instance of some kind of class.

## Functional Programming - Java Style

The only way to simulate functional programming in Java, was to use classes and instances of those classes.

So in Java we would write something like this:

```scala
class Action {
  def execute(element: Int): String = ???
}
```

Here we write out a class (**Action**) and then the method (**execute**). To make use of the **execute** function, we would need to instantiate the **Action** class (either anonymously or normally). As described in the anonymous classes post, we would instantiate instances of classes and then override the methods on the spot.

The most that you could do would be to generalize most of the boilerplate code, so you can use generic types.

For example say we have an abstract type (like a trait). It takes two type parameters, A and B. We would say that the method takes an element of type A and returns an element of type B:

```scala
trait Action[A, B] {
  def execute(element: A): B
}
```

A slightly better way to write this in Scala, would be to rename the trait to **MyFunction**, then rename the method to **apply**. The apply method has a special meaning in Scala:

```scala
trait MyFunction[A, B] {
  def apply(element: A): B
}
```

But this is the limits of what an object oriented language would be able to do.

The JVM is naturally constructed around these constraints. So Scala had to resort to some clever tricks to make it look like a truly functional programming language. We will explore those tricks in the rest of this post.

# Scala Function Types

Let's use the **MyFunction** trait that we just defined. We will create an instance of the **MyFunction** trait, which transforms an int into another int. The **apply** method of the class takes an element of type int and returns another int. The implementation is that we double the int:

```scala
  val doubler = new MyFunction[Int, Int] {
    override def apply(element: Int): Int = element * 2
  }
```

This is an **instance** of the little function like class, i.e. the trait **MyFunction**.

The advantage of doing this in Scala (as opposed to Java), is that we can call the doubler directly with a parameter, as if it were a function:

```scala
println(doubler(2)) // prints out 4
```

If you run this, **doubler** will call the _apply_ method within itself. The number 4 is printed out to the console.

So **doubler**, which is an instance of a function like class, can itself be called just like a function.

This is how Scala becomes a functional programming language.

## Function Types included Out of the Box

The interesting thing, is that Scala supports these function types right out of the box.

The function types are **Function1, Function2, Function3... up to Function22**.

But for a function with 1 parameter and 1 result, this is called as **Function1\[A,B]**. This is the function type which is by default supported in Scala.

Let's create another instance of **Function1**, to convert an string into an int:

```scala
val stringToIntConverter = new Function1[String, Int] {
    override def apply(string: String): Int = string.toInt
}
```

Notice that this time we supplied type parameters **String** and **Int**. We are providing a **String** and we want the value returned to be an **Int**.

We can now call **stringToIntConverter**, say with the string "3", and add the result to the number 4 straight away:

```scala
println(stringToIntConverter("3") + 4) // will return 7
```

## Function Types Supported up to 22 Parameters

As mentioned previously, Scala supports these function types up to **22 parameters**.

So for example, say we had a function called **adder** that takes two Ints and returns an Int. That would be a **Function2** , with [Int Int Int]. 2 Ints for the parameter types and the final Int for the result type:

```scala
val adder = new Function2[Int, Int, Int] {
    override def apply(a: Int, b: Int): Int = a + b
}
```

The apply method takes 2 parameters, a and b, both Int. And the return type is an Int.
