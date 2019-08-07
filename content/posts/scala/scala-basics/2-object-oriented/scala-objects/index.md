---
title: 'Scala Objects'
date: 2019-07-02
tags: [tag1, tag2, tag3, tag4]
slug: scala-objects
image: ../../1-absolute-basics/values-variables-types/scala-title.png
category: Scala
prev: scala-method-notations
next: scala-inheritance-traits
---

[[info]]
| This post is **part 3** of the Object Oriented Programming in Scala series.

In this post we are going to do a deeper dive on **objects** in Scala. In the Scala world, objects are actually a _dedicated concept_. A fundamental aspect of objected oriented programming is [class level functionality](<https://en.wikipedia.org/wiki/Class_(computer_programming)>) - i.e. **functionality that does not depend on having an instance of a class**.

But often when writing programs, we don't wish to have the burden of instantiating a class in order to do something. For example, when defining universal constants, we don't want to have to create and instantiate a class to hold those constants.

# Class Level Functionality in Java with "Static"

In Java, to achieve class level functionality we would first have to write a new class. Then within that class we would define some constant. So that accessing the constant doesn't rely on an instance of the class, we would need to use the keywords **public static final**. For example like this:

```java
class Person {
    public static final int EYES = 2;
}
```

And we would then access the field within our Java class like so:

```java
public static void main(String args[]) {
  System.out.println(Person.EYES);
}
```

# Singleton Objects in Scala

Scala does not have class-level functionality. (i.e. it doesn't have the concept of "static"). But it has something even better - **objects**. These Scala objects have static like concepts. So the equivalent of the code we just wrote for Java, in Scala, would be this:

```scala
object Person {
  val EYES = 2
}
```

We can then access the field simply like so:

```scala
println(Person.EYES)
```

In our Scala objects we can also define **methods**. For example we can add a simple Boolean method:

```scala
object Person {
  val EYES = 2
  def canTalk: Boolean = false
}
```

We can call the method as you would expect:

```scala
println(Person.canTalk)
```

In fact objects in Scala can be defined in a similar way that classes can. The exception is that _Scala Objects do not receive parameters_.

# Singleton Instance

In Scala you can say that a Scala object is a [Singleton Instance](https://docs.scala-lang.org/tour/singleton-objects.html). This means that when we define the object, we define it's type (e.g. Person) AND it's only instance as well.

Let's take this further with an example. If we create two vals and point them to the same Person object, both vals point to the same object instance (i.e. the singleton instance):

```scala
val anne = Person
val bob = Person
println(anne == bob) // true
```

# Companion Objects

A common pattern in Scala is to write a class and an object with the same name (e.g. Person) in the same file, or in the same scope. For practical reasons, this is to separate instance functionality from static/class level functionality. We split the functionality between classes and objects.

This pattern is called [Companion Objects](http://daily-scala.blogspot.com/2009/09/companion-object.html). The class and object are in the same scope and they have the same name.

All the code we will ever access for **Person** is part of an instance. Either in a _regular_ instance of Person, or the _singleton_ instance.

This makes Scala a truly object oriented language, even more so than Java. This is ironic since [Scala was actually designed as a functional language](https://stackoverflow.com/questions/6166155/is-scala-a-functional-programming-language).

Back to the code, let's add a simple empty class definition for our **Person**:

```scala
class Person {

}
```

Now we can actually instantiate instances with the **new** keyword. These will no longer refer to the same instance of Person, they are separate instances:

```scala
val anne = new Person("Anne")
val bob = new Person("Bob")
println(anne == bob) // false
```

# Factory Methods in Singleton Objects

Let's talk about [factory methods](https://alvinalexander.com/scala/how-to-create-factory-method-in-scala-apply-object-trait) inside singleton objects. To demonstrate this, let's first add a class value to our Person class:

```scala
class Person(val name: String) {

}
```

And we will add a factory method to our Singleton Object. The factory method's whole purpose is to build new instances of Person given some parameters:

```scala
object Person {
  def from(mother: Person, father: Person): Person = new Person("Johnny")
}
```

To instantiate a new instance of person using this factory method, we do:

```scala
val johnny = Person.from(anne, bob)
```

But often in practice, these factory methods are called **apply** instead of some other name:

```scala
object Person {
  def from(mother: Person, father: Person): Person = new Person("Johnny")
  def apply(mother: Person, father: Person): Person = new Person("Johnny")
}
```

The apply method for the factory method can be called like so:

```scala
val johnny = Person.apply(anne, bob)
```

OR we can actually remove the word **apply** altogether, and make the Person singleton object **callable like a function**:

```scala
val johnny = Person(anne, bob)
```

# Scala Applications

In our project, the final Scala application that we run (i.e. the entry point for the application) is only a Scala object with a very important method:

```scala
def main(args: Array[String]): Unit
```

[Scala applications are turned into JVM applications](https://softwareengineering.stackexchange.com/questions/280169/if-scala-runs-on-the-jvm-how-can-scala-do-things-that-java-seemingly-cannot). If you are familiar with Java, then you know that the entry point has to be **public static void main** with an array of Strings, i.e.:

```java
public static void main(String args[]) {
  // code goes here
}
```

So in Scala, we can either include this method in our Scala object:

```scala
def main(args: Array[String]): Unit = {
  // code goes here
}
```

Or we can just do it the short and easy way, by extending the object from App:

```scala
object ourApplication extends App {
  // code goes here
}
```

# Summary

In this post we learned that:

- Scala doesn't have "**static**" values / methods in the way that other languages do for creating class level functionality, it has **Scala Objects** instead.
- An object in Scala is a separate concept - they are their own type (i.e. they are their own class) and they are the only instance of that class.
- Scala objects and Scala classes can stay in the same scope - these are called **Companion objects**. They can also access each others private members, which we will see in later posts.
- Scala applications have their single point of entry either from the "main" method, or from extending an object from App.

# Source Code

As always, the source code for this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/objectOriented/Objects.scala).
