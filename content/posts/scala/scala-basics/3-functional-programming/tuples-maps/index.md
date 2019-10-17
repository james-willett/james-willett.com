---
title: 'Tuples and Maps in Scala'
date: 2019-10-02
tags: [all, scala, scala_fp_series]
slug: scala-tuples-maps
image: ./tuples-maps-cover.png
summary: In this blog post we will explore the relationship between Tuples and Maps, and how they can assist us with functional programming in Scala
category: Scala
prev: scala-sequences
next: scala-options
---

[[info]]
| This post is **part 6** of the _Functional Programming in Scala_ series. You can view [all the posts in the series](../blog/scala_fp_series) here.

# TLDR;

A **Tuple** is basically grouping data of different types.

- To create a tuple we can do `scala±val tuple = (43, "James Willett")`
- To access the members of a tuple: `scala±tuple._1`
- To copy a tuple and change some values: `scala±tuple.copy(_1 = 0)`
- To pretty print them: `scala±tuple.toString`
- And to swap the values: `scala±tuple.swap`

**Maps** are a useful data structure to make associations between _keys_ and _values_.

- We can create a map like so: `scala±val myMap = Map("John" -> 234, "Mary" -> 7879)`
- Check a value exists in the map - `scala±myMap.contains("John")`
- Access values in the map - `scala±myMap("Mary")`
- Add a new pairing to the map by creating a new one: `scala±val anotherMap = myMap + ("Bob", 123)`

The `filterKeys` and `mapValues` functionals are very useful for accessing data in maps.

`map`, `flatmap`, and `filter` are also used on the pairings of maps.

We can transform maps to and from other collections, with methods like `toList` and `toMap` and `groupBy`.

---

# Introducing Tuples in Scala

Tuples in Scala are similar to lists, they are finite orders of data. A tuple can be used to group together data of different types, for example Strings and Integers:

```scala
val aTuple = new Tuple2(2, "hello, Scala")
```

The type of the above tuple is `scala±Tuple2[Int, String]`. This is known to Scala as simply `(Int, String)`. The parentheses is syntactic sugar for _Tuple2 type parameterised with Int and String_.

In Scala you can create tuples either with or without the `new` keyword. Specifying the `new` keyword isn't necessary as each **Tuple** companion object has an appropriate `apply` method. So you can create a tuple like this:

```scala
val aTuple = Tuple2(2, "hello, Scala")
```

Or, you can actually create tuples with just parentheses:

```scala
val aTuple = (2, "hello, Scala")
```

Tuples can group at most 22 elements of different types. The reason for the number of elements being 22, is because they are used in conjunction with [Function Types](../scala-function-types).

## Tuple Operations

You can access members of a tuple like so:

```scala
println(aTuple._1)
```

`_1` is the first element, `_2` is the second element etc.

We can create copies, just as we did with case classes:

```scala
println(aTuple.copy(_2 = "hello, James"))
```

There is also a `swap` method, that swaps the elements in place:

```scala
println(aTuple.swap)
```

# Maps

Maps are _collections_ used to associate things with other things. With maps, we associate keys to values. **Keys** are the _index_, **values** are the _data corresponding_ to those keys:

```scala
val aMap: Map[String, Int] = Map()
```

In the map above, `String` is the key and `Int` is the value. We are instantiating the `Map()` by calling the `apply` method.

## Putting Tuples into a Map

Let's create a map, in which we put tuples into the map.

```scala
val phonebook = Map(("James", 555), ("Bob", 666))
```

You populate the map by specifying tuples, or _pairings_.

For a clearer, syntactic sugar for the pairings, you can also write the tuples with an `->` instead:

```scala
val phonebook = Map("James" -> 555, "Bob" -> 666)
```

If we print out the map now, it will look like this:

```scala
println(phonebook) // prints out: 'Map(James -> 555, Bob -> 666)'
```

## Map Operations

We can query a map if it has a **key**. The `contains` method takes a **key** and returns a **boolean**:

```scala
println(phonebook.contains("James"))
```

To obtain the value associated with the key, we can call the `apply` method:

```scala
println(phonebook.apply("James"))
```

Or we can leave the apply word out altogether:

```scala
println(phonebook("James"))
```

If you try to call the apply method on a map with a key that does not exist, the program will crash with an exception:

```scala
println(phonebook("Ted"))
```

This throws the exception:

> Exception in thread "main" java.util.NoSuchElementException: key not found: Ted

A way to guard against throwing these exceptions, is to create the map with the `.withDefaultValue()` method:

```scala
val phonebook = Map(("James", 555), "Bob" -> 666).withDefaultValue(-1)
```

To add a pairing to the map, first we create the pairing:

```scala
val newPairing = "Mary" -> 678
```

And then we add the pairing to the phonebook, by creating a new phonebook and concatenating:

```scala
val newPhonebook = phonebook + newPairing
```

We use this technique of creating a new object, because _maps are immutable_.

# Functionals on Map

There are several different functionals that we can use on **Map**.

## Map, Flatmap and Filter

Just like we did with lists, we can use `map`, `flatmap` and `filter` on maps.

For map, the argument that is supplied is a pairing which is a tuple:

```scala
println(phonebook.map(pair => pair._1.toLowerCase -> pair._2)) // returns: Map(james -> 555, bob -> 666)
```

What the above says is that, for every pairing in the map, transform the map by lowercasing just the keys.

With **Maps** in Scala, the methods `map`, `flatmap` and `filter` all take _pairings_ like this.

## Filter Keys

A more useful method for maps is `filterKeys`:

```scala
println(phonebook.filterKeys(x => x.startsWith("J")))
```

The above will print the mapping where the keys are filtered by the predicate `scala±x => x.startsWith("J")`.

This could be written in shorthand like this:

```scala
println(phonebook.filterKeys(_.startsWith("J")))
```

## Map Values

Another map specific function that is very useful is `mapValues`:

```scala
println(phonebook.mapValues(number => number * 10))
```

So here the lambda takes the _value_ type (in this case Int) and returns something else (in this case 10 times the number).

As another example, You could use this to put some text in front of the number:

```scala
println(phonebook.mapValues(number => "0845-" + number )) // returns: Map(James -> 0845-555, Bob -> 0845-666)
```

# Convertings Maps to Other Collections

We can put all the _pairings_ from a **map** into a **list**:

```scala
println(phonebook.toList) // returns: List((James,555), (Bob,666))
```

Conversions can also happen vice versa. We pass in a tuple for a single element and convert that into a map:

```scala
println(List(("Daniel", 555)).toMap) // returns: Map(Daniel -> 555)
```

Something else very useful is the `groupBy` functionality:

```scala
val names = List("Bob", "James", "Angela", "Mary", "Daniel", "Jim")
println(names.groupBy(name => name.charAt(0)))
```

This will create a map, that will group every element that has the same first character into a single list.

So the above returns:

> Map(J -> List(James, Jim), A -> List(Angela), M -> List(Mary), B -> List(Bob), D -> List(Daniel))

`groupBy` is very used in practice for grouping data.

---

# Source Code

As always, the source code for this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/functionalProgramming/TuplesAndMaps.scala).
