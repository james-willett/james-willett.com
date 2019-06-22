---
title: "Object Oriented Basics in Scala"
date: 2019-06-21
slug: scala-object-oriented-basics
image: ../../1-absolute-basics/values-variables-types/scala-title.png
category: Scala
---

[[info]]
| In this post we look at some of the basics of Object Oriented Programming in Scala.
| You should be able to follow along with the code examples either in the Scala REPL or Scala Playground of any IDE.
| Alternatively you can use [ScalaFiddle](https://scalafiddle.io/) to follow along in your browser.
| The source code for the examples in this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/objectOriented/OOBasics.scala).

We will kick off this series of blog posts on Object Oriented programming in Scala by looking at some of the basics. Scala is an unusual language in that it supports [both objected oriented and functional programming](https://underscore.io/blog/posts/2017/06/02/uniting-church-and-state.html) styles. In this series, we will focus on **Object Oriented** programming for the most part.

# Create a Class

To create the most basic kind of class in Scala, you would write:

```scala
class Person
```

Remember that a [class in any programming language](<https://en.wikipedia.org/wiki/Class_(computer_programming)>) is just a way of organising data and behavior that is code.

To instantiate our class, we simply do:

```scala
val person = new Person
```

When we say to [instantiate a class](https://whatis.techtarget.com/definition/instantiation), we mean to bring a concrete realisation of the class into memory. It conforms to the code and data structure that the class describes.

# Class Constructor

With that in mind, let's create a class with a bit more complexity. This class has some parameters that we need to pass to it:

```scala
class Person(name: String, age: Int)
```

This is called a class **constructor**. Every instance of the _Person_ class must be constructed by passing in a name and an age. So now when we instantiate our class, we would do so like this, passing in a name and an age:

```scala
val person = new Person("Bob", 31)
```

# Class Parameters vs Class Members

In other programming languages, you might think that you could print out the age of your person like so:

```scala
println(person.age)
```

But this won't work. In Scala, name and age are class parameters. But they are NOT class members, they cannot be accessed with dot notation. In other words, class parameters are not fields. Class parameters and class fields are two different things.

To convert a class parameter to a class field, you would add the **val** keyword before the parameter in the constructor:

```scala
class Person(name: String, val age: Int)
```

Now the compiler is happy and the age can be printed out like so:

```scala
val person = new Person("Anne", 43)
println(person.age)
```

# Class Body

Let's create a class with a body now, by supplying curly braces. The body of the class defines it's implementation. It can have val / var definitions, expressions etc.:

```scala
class Person(name: String, val age: Int) {

  // val definition
  val x = 5

  // expression with side effects
  println(2 + 3)
}
```

Essentially you can do anything inside the body of a function that you would do inside any normal block expression outside of a class.

# Methods within Classes

Still within our class body, we can define another function within our class with the _def_ keyword. You could also call this a **method** of the class:

```scala
class Person(name: String, val age: Int) {

  def greet(name: String): Unit = println(s"$name says: Hi, $name")

}
```

Outside of the class, we can call this method from our instantiated object:

```scala
val person = new Person4("Steve", 33)

person.greet("Andrew")
```

This will print out:

```scala
Andrew says: Hi, Andrew
```

Which is probably not what we wanted! Both of the **\$name** calls in the println statement resolve to the parameter that is supplied to the _method_. We actually wanted one of the parameters to resolve to the name of the person defined in the _class definition_.

To achieve that, we can use the **this** keyword:

```scala
def greet(name: String): Unit = println(s"${this.name} says: Hi, $name")
```

Notice that the first call to **name** here is NOT a class field... but it is still available within methods of a class.

# Overloading class methods

When we talk about overloading methods in programming languages, that is just a fancy way of saying:

> "Methods with the same name but different parameter signatures".

This is an overloaded method of greet(), as it doesn't have any parameters supplied:

```scala
def greet(): Unit = println(s"Hi, I am $name")
```

Just for clarity, the overloaded method below would NOT work in conjunction with the above method. Although the return type is different (Int instead of Unit), because the parameter signatures are the same (i.e. there are no parameters), we can't have another method with this signature as the compiler gets confused:

```scala
def greet(): Int = 43
```

# Overloading / Auxiliary constructors

We can also have multiple constructors within our classes, or **overloaded constructors**. The key thing to remember is that _The implementation of an overloaded constructor has to be another constructor and nothing else_. This calls the primary constructor with 2 parameters:

```scala
def this(name: String) = this(name, 0)
```

So now if we instantiated our class by just supplying a name, the age will default to 0.

You could define another constructor one more level down. So a constructor with no parameters:

```scala
def this() = this("Chris")
```

This constructor calls the constructor above, which calls the primary constructor. In practice, overloaded or auxiliary constructors are limited in use. A more common and easier practice would be to simply supply default parameters in the class definition, as we discussed in (this blog post)[./scala-basics-default-named-arguments].

# Summary

This post introduced some of the basics of Object Oriented programming in Scala. We looked at defining and instantiating some basics classes, what can make up the body of a class, and how we can define methods (or functions) within that class. We also looked at how classes can have multiple constructors.

# Source Code

As always, the source code for this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/objectOriented/OOBasics.scala).

---
