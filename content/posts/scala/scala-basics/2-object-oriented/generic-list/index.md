---
title: 'Covariant Generic List in Scala'
date: 2019-07-27
tags: [tag1, tag2, tag3, tag4]
slug: scala-covariant-generic-list
image: ./preview.png
category: Scala
prev: scala-generics
---

[[info]]
| This post is **part 7** of the Object Oriented Programming in Scala series.

In this post, we are going to expand heavily on the functionality of the MyList application that we started developing in previous posts. The overall goal is to turn MyList into a complete **covariant generic list**.

# Process for Implementing the Generic List

To do this we will walk through a number of steps. The first thing we will do is create a couple of **traits**. One will be called **MyPredicate**, It will have a small method to check whether a value of type T passes some condition. If we have a class that extends this MyPredicate trait, the test method in EvenPredicate with take an int as a parameter and return whether that int is even or not

The other will be called **MyTransformer**, taking two type parameters. It will have a small method to convert a value of type A into a value of type B (for example a String into an Int). Every subclass of MyTransformer will have a different implementation of that method.

With the traits in place, we will be adding three new functions in the MyList abstract class:

### map

This will take a _MyTransformer_ trait, and returns a new MyList of a different type. So for example if you have a list \[1,2,3], if you **map** that to a Transformer that doubles an Int, then you will get back \[2,4,6]. In pseudo code it would like: **\[1,2,3].map(n \_ 2) = \[2,4,6]**.

### filter

Will take a _MyPredicate_ trait, and returns a new MyList. If you have a list \[1,2,3,4] that filters if a number is even, you should get the list \[2,4]. In psuedo code, **\[1,2,3,4].filter(n % 2) = \[2,4]**.

### flatMap

FlatMap is a little bit special. We will provide another _MyTransformer_ trait from A to MyList of B. It returns a MyList of B. If you have a list \[1,2,3] and flatMap it so that for each **n** you get **n+1** . This will return the concatenation of all the sub-lists for every element.

For example the sub-list for 1 will be \[1,2], the sub list for 2 will be \[2,3], the sub list for 3 will be \[3,4] etc.

The pseudo code looks like so: **\[1,2,3].flatMap(n => [n, n+1]) => \[1,2,2,3,3,4]**

## More Details on map, flatMap and Filter

Note that map, flatMap and filter are common methods used in functional programming. If you aren't familiar with how they work, you may find it beneficial to read up on them before we start implementing our own version here. See the [Twitter Scala School Collections](https://twitter.github.io/scala_school/collections.html#map) for a good starting point.

## A Note on Contravariance

Just a hint before we press ahead with implementing this. We will define **MyPredicate** with a minus sign for T, i.e. MyPredicate\[-T]. We will be making it **contravariant**.

Also **MyTransformer** will have a minus sign for A to make that contravariant as well, i.e. MyTransformer\[-A,B].

The reasons for this will be explored in later blog posts, but for now please just accept this small hack to get our generic list up and running.

# Declare the Traits

Let's start our implementation of a generic list by declaring the traits, starting with **MyPredicate**. (Note: a [predicate](https://stackoverflow.com/questions/40009857/scala-predicates) is just a function that returns a Boolean value.) :

```scala
trait MyPredicate[-T] {
  def test(elem: T): Boolean
}
```

So we have a trait called **MyPredicate**, that takes a type parameter of T (which is contravariant with the minus sign). It has a single method **test**, which takes an **elem** of type T and returns a Boolean. There is no implementation yet for the method, we will do that on the fly when we use the MyPredicate in our code.

Next for **MyTransformer**, it will look like this:

```scala
trait MyTransformer[-A, B] {
  def transform(elem: A): B
}
```

We have a trait called **MyTransformer**. It takes two type parameters A and B (A is contravariant). It has a single method **transform**, which takes an element of type A and returns a type B. Again, the implementation is missing and will be added by us when we use the MyTransformer in code.

# Add the Function Signatures to MyList

We will now go into the **MyList** abstract class, and add in the function signatures for the three new methods. As a reminder, here is what MyList originally looked like:

```scala
abstract class MyList[+A] {
  def head: A
  def tail: MyList[A]
  def isEmpty: Boolean
  def add[B >: A](element: B): MyList[B]
  def printElements: String
  override def toString: String = "[" + printElements + "]"
}
```

### map

Starting with **map**, our function signature will look like so:

```scala
abstract class MyList[+A] {
  // .. other methods excluded for brevity
  def map[B](transformer: MyTransformer[A, B]): MyList[B]
}
```

The function **map** will receive a type parameter of B. Because we are turning a MyList of A into a MyList of B, we need to provide this type parameter here. It will also receive a **transformer**, the trait that we declared previously, from A to B. Finally, it will return a MyList of type B

### flatMap

The function signature for flatMap looks like so:

```scala
abstract class MyList[+A] {
  // .. other methods excluded for brevity
  def flatMap[B](transformer: MyTransformer[A, MyList[B]]): MyList[B]
}
```

The method again receives a type parameter of B, for the same reason as above (we are returning a MyList of B so need to be aware of the type parameter here). The method then receives a **transformer** from A to MyList\[B]. The return type is a MyList of type B.

### filter

The signature for filter is easiest of all:

```scala
abstract class MyList[+A] {
  // .. other methods excluded for brevity
  def filter(predicate: MyPredicate[A]): MyList[A]
}
```

It receives a **predicate** of type A. The end result is a MyList of type A.

This is the first step in solving the implementation, deciding on the function signatures for map flatMap and filter.

Done to 18
