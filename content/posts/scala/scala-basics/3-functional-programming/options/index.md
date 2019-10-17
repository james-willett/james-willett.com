---
title: 'Options in Scala'
date: 2019-10-17
tags: [all, scala, scala_fp_series]
slug: scala-options
image: ./options-cover.png
summary: This post will explore the use of Options in Scala, and how they are used to guard against the dreaded null pointer exception that we so often see in programming
category: Scala
prev: scala-tuples-maps
---

[[info]]
| This post is **part 7** of the _Functional Programming in Scala_ series. You can view [all the posts in the series](../blog/scala_fp_series) here.

# TLDR;

We use **Options** in Scala to stay away from _nulls_, and avoid runtime crashes due to [null pointer exceptions](https://www.geeksforgeeks.org/null-pointer-exception-in-java/). They help us to avoid a large amount of null-related handling code.

They are a functional way of dealing with _absence_ of a value.

Options can be used with `map`, `flatMap` and `filter`.

You can also you the `orElse` method to chain unsafe APIs.

Additionally there are many other useful methods available such as `fold`, `collect` and `toList`.

If you design a method that might return a `null`, use the `scala±Option[type]` as the return instead.

---

# Introduction to Options in Scala

Options in Scala are a fundamental concept to learn and understand. The reason for their existence is to remedy the [Billion Dollar Mistake by Tony Hoare](https://medium.com/@hinchman_amanda/null-pointer-references-the-billion-dollar-mistake-1e616534d485) - the introduction of the null reference in 1965.

Null references cause big problems in programming. If you have been programming for any length of time, likely you will have come across the dreaded **null pointer exception**. To guard against these exceptions, we often have to resort to a swathe of spaghetti code.

But Scala has an answer to this problem - **Options**. The definition of **Option** looks like this:

```scala
sealed abstract class Option[+A]
case class Some[+A](x: A) extends Option[A]
case object None extends Option[Nothing]
```

So the `scala±case Class Some` wraps a concrete value. The object `None` is a singleton object for absent values.

Options are used throughout the Scala language. For example, when getting elements from a _map_, they are used in case an element doesn't exist:

```scala
val map = Map("key" -> "value")
map.get("key") // Some(value)
map.get("other") // None
```

And also with _lists_, in case we tried to get an element that again didn't exist a `None` would be returned:

```scala
val numbers = List(1,2,3)
list.headOption // Some(1) .... if the list didn't have a head (i.e. was empty), this would return None
list.find(_ % 2 == 0) // Some(2)
```

# Instantiate an Option in Scala

We can instantiate options like so:

```scala
val myFirstOption: Option[Int] = Some(4)
val noOption: Option[Int] = None

println(myFirstOption) // prints Some(4)
```

Options were invented to deal with unsafe APIs. Say that you had a method that returned `null`:

```scala
def unsafeMethod(): String = null
```

Using options, you might be tempted to call `unsafeMethod()` like this:

```scala
val result = Some(unsafeMethod())
```

But this is wrong! Because you might be getting `Some(null)`, which basically breaks the whole point of options.

`Some` should always have a valid value inside. Instead, use the Option companion's `apply` method:

```scala
val result = Option(unsafeMethod())
println(result) // returns None
```

This will build a Some or None, depending on whether the value is null or not.

# Chained Methods with Scala Options

We use Options in Scala with **chained methods**. Say that we had a method like this:

```scala
def backupMethod(): String = "A valid result"
```

We can then do this, using `.orElse` to invoke the backup method incase that `None` is returned:

```scala
val chainedResult = Option(unsafeMethod()).orElse(Option(backupMethod()))
```

If you are designing unsafe APIs, then make your methods return `Option` of something in the case of returning nulls:

```scala
def betterUnsafeMethod(): Option[String] = None
def betterBackupMethod(): Option[String] = Some("A valid result")
```

Then you can chain them like this:

```scala
val betterChainedResult = betterUnsafeMethod() orElse betterBackupMethod
```

If you design your API To return options, then the end user doesn't need to worry about wrapping them in `Option` when they call them (as we did previously).

# Functions on Scala Options

Let's look at some common functions on Options:

```scala
println(myFirstOption.isEmpty) // returns false
println(myFirstOption.get) // this is unsafe, could throw a null pointer exception, do not use this
```

The `map`, `flatMap` and `filter` are extremely useful:

```scala
println(myFirstOption.map(_ * 2)) // this returns Some(8)
```

`filter` can turn an option with a value into an option with no value (`None`) if the predicate doesn't match:

```scala
println(myFirstOption.filter(x => x > 10)) // returns None
```

`flatMap`, receives a function that turns an element into an option:

```scala
println(myFirstOption.flatMap(x => Option(x * 10))) // returns Some(40)
```

# Example of using Options

Let's look at a more detailed example of where we could use Options in Scala.

Say that you have the following config map, and a connection class with a companion object:

```scala
val config: Map[String, String] = Map(
  "host" -> "176.45.36.1",
  "port" -> "80"
)

class Connection {
  def connect = "Connected" // connect to some server
}

object Connection {
  val random = new Random((System.nanoTime()))

  def apply(host: String, port: String): Option[Connection] =
    if (random.nextBoolean()) Some(new Connection)
    else None
}
```

The `apply` method returns a connection or no connection depending on the random boolean. It simulates a connection or a faulty connection to the server.

The problem is that you do not have certainty that the values inside `config` are present. Imagine that the class `Connection` with the apply API was written by someone else.

If we can establish a connection, we want to print the `connect` method.

Let's first obtain the host and port:

```scala
val host = config.get("host")
val port = config.get("port")
```

The return type of these is `Option[String]`. We need to be able to obtain the values in these options and pass them on to the `apply` method. But the only way to do that, would be to `get` the values out of the options, which is unsafe. The alternative is to use functionals, specifically `flatmap`:

```scala
val connection = host.flatMap(h => port.flatMap(p => Connection.apply(h, p)))
```

So here we are saying: `host flatMap`, given the host we assume is there (it might not be), then `port.flatMap`, and given the port is there (it might not be), then we call `scala±Connection.apply` with `h` and `p` ... and this returns an `Option` of `Connection`.

The connection status that we are interested in is `connection.map` (if might be there, it might not be). We need to call the `connect` method on the `connection`:

```scala
val connectionStatus = connection.map(c => c.connect)
```

The return type of `connectionStatus` is `scala±Option[String]`. If `connection` is there, then the `connectionStatus` will contain the connectivity of `connection`.

In the end, we need to print out the connection status:

```scala
println(connectionStatus)
connectionStatus.foreach(println)
```

Run this a few times. You will either get `None`. Or you will get `Some(Connected)` and then `Connected`.

## Breaking it down further

To annotate this with what you might write in a conventional language:

```scala
val connection = host.flatMap(h => port.flatMap(p => Connection.apply(h, p)))
```

This could be written as:

> if (h != null) and if (p != null) then return Connection.apply(h, p) ...
> otherwise, return null

And for connection status:

```scala
val connectionStatus = connection.map(c => c.connect)
```

> if (c != null) then return c.connect ...
> otherwise, return null

For the `println` part, we are saying that if `scala±(connectionStatus == null)` then `println(None)`, otherwise print `scala±(Some(connectionstatus.get)`

The logic of each `println` part is:

> if the (status != null) then println(status)

The shorthand solution, with everything chained:

```scala
config.get("host")
  .flatMap(host => config.get("port")
    .flatMap(port => Connection(host, port))
    .map(connection => connection.connect))
  .foreach(println)
```

# For Comprehensions with Scala Options

We should know that `map`, `flatMap` and `filter` can be turned into for comprehensions. For example, with the above we can write:

```scala
val forConnectionStatus = for {
  host <- config.get("host")
  port <- config.get("port")
  connection <- Connection(host, port)
} yield connection.connect

forConnectionStatus.foreach(println)
```

This reads as, given a `host`, and given a `port`, and given a `connection` ... so assuming that `host` `port` and `connection` are not null, then give me `connection.connect`. Otherwise give me `None`.

---

# Source Code

As always, the source code for this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/functionalProgramming/Options.scala).
