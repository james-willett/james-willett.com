---
title: 'Sequences in Scala'
date: 2019-09-29
tags: [all, scala, scala_fp_series]
slug: scala-sequences
image: ./sequences-cover.png
summary: A Sequence in Scala programming is a very general interface for data structures that has certain properties. We will explore them in this blog post
category: Scala
prev: scala-map-flatmap-filter
---

[[info]]
| This post is **part 5** of the _Functional Programming in Scala_ series. You can view [all the posts in the series](../blog/scala_fp_series) here.

# TLDR;

Sequences in Scala are interfaces for data structures that have a well defined order and are indexable.

Types of sequence include:

- Lists - `scala±val aList = List(1,2,3)`
- Arrays - `scala±val numbers = Array(1,2,3,4)`
- Vectors - `scala±val vector: Vector[Int] = Vector(1,2,3)`

Each of these sequences have many useful utility methods that can be applied.

There are also **Ranges**, which are another type of Sequence - `scala±val aRange: Seq[Int] = 1 to 10` . These are very handy for iteration.

---

# Introducing Sequences in Scala

A **Sequence** (Seq) in Scala is a very general interface for data structures. They have a _well defined order_, and are _indexable_. They also support various other operations out of the box, such as; `apply`, `iterator`, `length` and `reverse`.

They also support _concatenation, appending and prepending_ to enable the construction of new collections.

Many other operations are included as well, such as _grouping, sorting, zipping, searching and slicing_. You can also use `map`, `flatmap` and `filter` - as we learned about in the [previous blog post](../scala-map-flatmap-filter).

## Sequences in practice

You can construct a sequence like so:

```scala
val aSequence = Seq(1,2,3,4)
println(aSequence)
```

This prints out `List(1,2,3,4)`. So the `Seq` companion object actually has an `apply` factory method, that can construct subclasses of **sequence**.

But the declared type of `aSequence` is `scala±Seq[Int]`.

To use some of the utility methods:

```scala
println(aSequence.reverse)
println(aSequence(2)) // takes the item at index 2 (in this case 3)
println(aSequence ++ Seq(7,5,6)) // for concatenation
println(aSequence.sorted) // sorts into order, if the type is by default ordered
```

# Ranges

There is also the concept of **Ranges** in Scala. Ranges are also sequences. The syntax looks like this:

```scala
val aRange: Seq[Int] = 1 to 10
```

The above is a _collection_, which is a _range_. If you wanted to print out every number in the range on a new line:

```scala
aRange.foreach(println) // prints all the numbers from 1 to 10
```

If you wanted to do something a certain number of times, without first having to declare a `val`, you could use a range like so:

```scala
(1 to 10).foreach(x => println("Hello"))
```

This is useful for writing code in a scripting like fashion (similar to Python for example).

# Lists

A **List** in Scala is _immutable_, and extends from **LinearSeq**. The `head`, `tail` and `isEmpty` methods are fast when they are used. A list is _sealed_, and has two subtypes: **object Nil** (when it is empty) and `class ::`.

```scala
val aList = List(1,2,3)
```

To pre-pend to a list you can do:

```scala
val prepended = 42 :: aList
```

The `::` is syntactic sugar to `apply` to a list.

You can also do pre-pending in combination with appending, using this syntax:

```scala
val prepend_append = 42 +: aList :+ 88
```

There is also the `fill` method, which is a curried function. It takes a value and constructs a list with that number of items:

```scala
val apple5 = List.fill(5)("apple")
```

We also have the `mkString` method. This concatenates all the items in the list and puts the specified string in between each item:

```scala
println(aList.mkString("-"))
```

# Arrays

**Arrays** are the equivalent of simple _Java_ arrays. Arrays are _mutable_, and are interoperable with Java's `T[]` arrays. Indexing is fast, you can access any element in any position.

```scala
val numbers = Array(1,2,3,4)
```

We can construct an array of three elements, without having to supply those elements, by using the `.ofDim` method:

```scala
val threeElements = Array.ofDim[Int](3)
```

But default values are applied, depending on the primitive type of value supplied. For example it will be `null` for a reference value like a string, or `0` for an Int. Print it out for yourself to check:

```scala
threeElements.foreach(println)
```

As we mentioned earlier, arrays are mutable. To update the number at index 2:

```scala
numbers(2) = 0
```

This is actually syntactic sugar for `scala±numbers.update(2, 0)`.

## Connection between Arrays and Sequences

We can create a special kind of sequence called a **WrappedArray**, that wraps over a sequence:

```scala
val numbersSeq: Seq[Int] = numbers
```

The `=` sign above stipulates to do an _implicit conversion_. This is an advanced topic that will be covered in later blog posts.

# Vectors

Vectors are extremely useful in Scala. They are the default implementation for immutable sequences because they are _very efficient_. They offer good performance for large sizes.

Vectors can be created like so:

```scala
val vector: Vector[Int] = Vector(1,2,3)
```

They offer the same functionality as other collections.

## Performance test of Vectors vs Lists

We can use the code below to measure the performance difference between a _vector_ and a _list_ in Scala:

```scala
val maxRuns = 1000
val maxCapacity = 1000000

def getWriteTime(collection: Seq[Int]): Double = {
  val r = new Random

  val times = for {
    it <- 1 to maxRuns
  } yield {
    val currentTime = System.nanoTime()
    collection.updated(r.nextInt(maxCapacity), r.nextInt()) // as this random index, put a value of r.nextInt() into the collection
    System.nanoTime() - currentTime
  }

  times.sum * 1.0 / maxRuns // this computes the average time it takes for the collection to be updated

}
```

In the code above, we are writing a value into a sequence 1000 times. We measure the average time that it look to write into the sequence.

Let's create a list and a vector:

```scala
val numbersList = (1 to maxCapacity).toList
val numbersVector = (1 to maxCapacity).toVector
```

And use the `getWriteTime` method to measure the response times:

```scala
println(getWriteTime(numbersList))
println(getWriteTime(numbersVector))
```

Feel free to run this a few times, you should see quite a big difference. For me, I got times of `9222912.368` for the List vs `10549.631` for the Vector.

The advantage of a **List** is that it keeps reference to tails. The disadvantage is that updating an element in the middle takes a long time.

The advantage of a **Vector** is that the depth of the tree is small. The disadvantage is that it needs to replace an entire 32 element chunk - but its not so much of a disadvantage!

---

# Source Code

As always, the source code for this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/functionalProgramming/Sequences.scala).
