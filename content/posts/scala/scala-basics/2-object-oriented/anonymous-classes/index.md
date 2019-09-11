---
title: 'Anonymous Classes in Scala'
date: 2019-07-23
tags: [all, scala, scala_oo_series]
slug: scala-anonymous-classes
image: ./anonymous-classes-cover.png
summary: Follow up your learnings of inheritance and traits in Scala with an in-depth look at Anonymous Classes. Includes how the compiler instantiates anonymous classes
category: Scala
prev: scala-generics
next: scala-covariant-generic-list
---

[[info]]
| This post is **part 6** of the _Object Oriented Programming in Scala_ series. You can view [all the posts in the series](../blog/scala_oo_series) here.

We learned about [Inheritance in Scala](/scala-inheritance-traits) in a previous blog post in this series. In that post, we discussed how in Scala
(and as a general rule in programming), _you can't instantiate an abstract class_.

# Instantiate an Abstract Class ?

But is that actually true? Look at the code below:

```scala
abstract class Animal {
  def eat: Unit
}

val funnyAnimal: Animal = new Animal {
  override def eat: Unit = println("I am a funny animal")
}
```

This code works, and _does_ appear to instantiate an abstract class. So what exactly is going on here?

Well, we didn't _actually_ create an instance of the abstract class. It just appears that way. It is actually a **real** class that we instantiated.

If we do:

```scala
println(funnyAnimal.getClass)
```

The following is printed out to the console:

> class scalaBasics.objectOriented.AnonymousClasses\$$anon$1

# An Anonymous Class

With the code that we wrote earlier, the compiler took everything after the **new** keyword, i.e. :

```scala
Animal {
  override def eat: Unit = println("I am a funny animal")
}
```

And created a class with the long name that we saw above.

It then instantiated that class right away, and assigned it to the _funnyAnimal_ value. This is called an [Anonymous Class](https://alvinalexander.com/scala/anonymous-classes-in-scala-examples).

To visualise this, look at the code where we originally assigned a new instance of Animal to the _funnyAnimal_ value. To the compiler, it looks like this:

```scala
class AnonymousClasses$$anon$1 extends Animal {
  override def eat: Unit = println("I am a funny animal")
}
```

And when we use it, the compiler instantiates that class instead:

```scala
  val funnyAnimal: Animal = new AnonymousClasses$$anon$1
```

With **anonymous classes**, the compiler does a lot of work behind the scenes. This allows us to abstract that complexity away from our code.

# Pass Constructor Arguments to an Anonymous Class

Let's say we had the following simple Person class:

```scala
class Person(name: String) {
  def sayHi: Unit = println(s"Hi, my name is $name, how can I help?")
}
```

If we wanted to instantiate an **_anonymous_** class for Person, with the _sayHi()_ method overridden on the spot:

```scala
val bob = new Person {
  override def sayHi: Unit = println("Hi, my name is Bob, what's going on?")
}
```

The above would work fine, except the compiler is giving an error because we are missing the _parameters_ of the Person class. You would have to
pass in the parameters, i.e.:

```scala
val bob = new Person("Bob") {
  override def sayHi: Unit = println("Hi, my name is Bob, what's going on?")
}
```

We must always pass in the required parameters for an anonymous class implementation, even if they aren't used in the anonymous class definition.

# Anonymous Classes for both Abstract and Non-Abstract Data Types

Notice that in the above code, the **Person** class is _not_ declared abstract. The anonymous class that we are declaring of Person for _Bob_ works, even though Person is not abstract in any way.

Anonymous classes work for **abstract** and **non-abstract** data types just as well.

This means that we can use a **trait** instead of an abstract class, e.g.:

```scala
trait Animal {
  def eat: Unit
}
```

We can instantiate this trait, and provide a definition:

```scala
val predator = new Animal {
  override def eat: Unit = println("I am a predator eating")
}
```

# Summary

In this post, we learned how to create and immediately instantiate **anonymous classes** in our Scala code.

When creating anonymous classes, we need to remember to pass in the required constructor arguments if needed.

We also need to remember to implement all abstract fields or methods in the anonymous class.

Finally, remember that anonymous classes work for _both_ **traits** and **classes**, whether they are abstract or not.

# Source Code

As always, the source code for this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/objectOriented/AnonymousClasses.scala).
