---
title: 'Map, Flatmap and Filter in Scala'
date: 2019-09-27
tags: [all, scala, scala_fp_series]
slug: scala-map-flatmap-filter
image: ./map-flatmap-filter-cover.png
summary: Map, FlatMap and Filter are used extensively in functional programming and in Scala. This post will look at all three of them, as well as foreach comprehensions
category: Scala
prev: scala-higher-order-functions
next: scala-sequences
---

[[info]]
| This post is **part 4** of the _Functional Programming in Scala_ series. You can view [all the posts in the series](../blog/scala_fp_series) here.

# TLDR;

Three of the most common methods used on collections in Scala are `map`, `flatMap` and `filter`:

- `map` will perform the function given in parentheses on every element in the collection
- `filter` will only return elements of a collection that satisfy the expression provided
- `flatmap` will first perform the `map` method on a list and then then `flatten` method

We often chain these methods together to achieve iteration over collections of elements.

A more readable way to write these chains, is to use a **for-comprehension**.

---

# Map, FlatMap and Filter in Scala

If you have done any significant programming in Scala, you will likely have used one or all of `map`, `flatmap` and `filter` at some point. We will look at all three of them in this post.

Let's start by creating and printing out a very simple `List`:

```scala
val list = List(1,2,3)
println(list) // prints out 'List(1,2,3)'
```

Note that this list gets created by calling the `scala±List.apply()` method on the companion list object.

List comes with standard implementations to extract the head and tail:

```scala
println(list.head)
println(list.tail)
```

## Map

We can call the map implementation on the list like so:

```scala
println(list.map(_ + 1))
println(list.map(_ + " is a number"))
```

This will iterate over every element in the list, and apply the function in the parentheses.

Another syntax of writing the map method is :

```scala
list.map { x =>
  x * 2
}
```

## Filter

We can use the `filter` method if we only want to keep certain members of the list. For example, to only keep the even numbers:

```scala
println(list.filter(_ % 2 == 0))
```

## FlatMap

The `flatmap` method is similar to the `map` method. The difference is the inner grouping of an item is removed and a sequence is generated. Let's say that we have a function that turns a single element into another list:

```scala
val toPair = (x: Int) => List(x, x+1)
```

If we call our original list with `flatmap` and this function, then we should see the concatenation of the application of `toPair` on each element of the list.

```scala
println(list.flatMap(toPair)) // prints out 'List(1, 2, 2, 3, 3, 4)'
```

# Print all Combinations of two Lists

Say that we wanted to print out all the combinations of the following two lists:

```scala
val numbers = List(1,2,3,4)
val chars = List('a', 'b', 'c', 'd')
```

In imperative programming, we might be tempted to do this with a couple of loops. In functional programming in Scala, we could instead do something like this:

```scala
val combinations = numbers.flatMap(n => chars.map(c => "" + c + n))
```

We use `flatmap`, because for each element in `numbers` we are going to generate a new list. And then for every elements in `chars` we are going to return the string composed from the character and the number.

If you added a third element into the mix, such as colors:

```scala
val colors = List("black", "white")
```

Then you use two `flatmap` methods, and put a `map` in the most inside block:

```scala
val combinations = numbers.flatMap(n => chars.flatMap(c => colors.map(color => "" + c + n + "-" + color)))
```

# Foreach

Next let's look at the `foreach` method. This is similar to `map`, only that it receives a _function_ returning a _unit_.

This will print all the numbers in the list on a separate line:

```scala
list.foreach(println)
```

# For-Comprehensions

The flatmaps that we wrote above are quite difficult to read. In Scala, there is a more readable format that we can use. This format is called **for-comprehensions**. We could rewrite the `combinations` method above like this:

```scala
val forCombinations = for {
  n <- numbers
  c <- chars
  color <- colors
} yield "" + c + n + "-" + color
```

This is exactly equivalent of the `combinations` method that we wrote previously.

## Filter in For-Comprehensions

If you want to filter something out, you can put a **guard** in the for-comprehension. For example, to only keep even numbers:

```scala{2}
val forCombinationsGuard = for {
  n <- numbers if n % 2 == 0
  c <- chars
  color <- colors
} yield "" + c + n + "-" + color
```

This applies a filter on `numbers`. If we rewrote this in full, it would look like this:

```scala
val combinationsWithColorWithFilter = numbers.filter(_ % 2 == 0).flatMap(n => chars.flatMap(c => colors.map(color => "" + c + n + "-" + color)))
```

If you wanted to do something with side effects in a for-comprehension, such as `println`:

```scala
for {
  n <- numbers
} println(n)
```

---

# Source Code

As always, the source code for this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/functionalProgramming/MapFlatmapFilter.scala).
