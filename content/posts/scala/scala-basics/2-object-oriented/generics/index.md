---
title: 'Generics in Scala'
date: 2019-07-19
tags: [tag1, all, scala, scala_oo_series]
slug: scala-generics
summary: |
  In this post we will look at the concept of generics in Scala, and how we can use them on multiple (potentially unrelated) data types
image: ./generics-cover.png
category: Scala
prev: scala-inheritance-traits
next: scala-anonymous-classes
---

[[info]]
| This post is **part 5** of the Object Oriented Programming in Scala series.

This blog post looks at **Generics** in Scala. It took me a while to get my head around a lot of these concepts, but hopefully this post will make things clear for you. _So what exactly are Generics all about in Scala?_

First let's consider that in the [previous blog post](/scala-inheritance-traits#detailed-example-of-inheritance--traits), we implemented a linked list for integers. But of course the problem is that the list is very limited to only _integers_. If we wanted to make one for say String instead, we would need to duplicate the entire code. _Enter generics to save the day._

# Introducing Generics in Scala

[Collections](https://docs.scala-lang.org/overviews/collections/overview.html) are a powerful use case where we could store elements of a certain type. To do this in Scala Generics, we would define a class **MyList** parameterised with a **Type A**. The type in the square brackets is the _generic type_:

```scala
class MyList[A] {

}
```

Once you define it, you can use the type A inside the class definition. When you later use the MyList class, you can do the following for a new MyList of type Int or String:

```scala
val listOfIntegers = new MyList[Int]
val listOfStrings = new MyList[String]
```

So class MyList parameterised with A, is a [Generic Class](https://docs.scala-lang.org/tour/generic-classes.html). The Type A is the name of a parameter. You can give it whatever name you want, but the general convention is to use a single letter.

You can also have a class with multiple type parameters, i.e.:

```scala
class MyMap[Key, Value]
```

In addition, you can also use type parameters with traits:

```scala
trait SomeTrait[A]
```

# Generic Methods

Let's define a [companion object](/scala-objects#companion-objects) for the MyList class. **Note that objects cannot be type parameterised**. Inside the object we will define a method that when given a type parameter will construct an empty MyList parameterised with that type:

```scala
object MyList {
  def empty[A]: MyList[A] = ???
}
```

When you declare the type parameter A after empty, you can then use it in the function definition. For now, we will assume that this function doesn't do anything and will return [Nothing](https://www.scala-lang.org/api/2.9.1/scala/Nothing.html).

So the object MyList, which is a companion for the MyList class defined above, has a generic method called **empty** which takes a type parameter of A, and returns a MyList of A.

To use this method we can do the following. This will return a MyList of integers:

```scala
val emptyListOfIntegers = MyList.empty[Int]
```

# The Variance Problem

Now that we know a bit about generics in Scala, there is a hard question that we need to answer. This question is known as the [variance problem](https://www.geeksforgeeks.org/scala-variances/).

To explain this, let's first define a small class hierarchy:

```scala
class Animal
class Cat extends Animal
class Dog extends Animal
```

The variance problem question here is:

> If Cat extends Animal, does a list of Cat also extend a list of Animal?

In Scala generics, we can provide three different answers to this question, as we see fit.

## 1. Covariance

If we say that **yes**, _a list of Cats extends a List of Animals_, then this is called **covariance**. To declare a covariant class in Scala we would do:

```scala
class CovariantList[+A]
```

In the square brackets for the type parameter we are putting **+A**. The PLUS symbol means that this is a covariant class.

To use a covariant list would be in the same style that you would use Cats for Animals:

```scala
val animal: Animal = new Cat
val animalList: CovariantList[Animal] = new CovariantList[Cat]
```

On the two line aboves, we first declare a new animal. We assign a new instance of a Cat (which is a subclass) to be the animal.
We next declare an animalList, which is of type a covariant list of animals. We assign this list to be a new covariant list of cats.

So given the above, the question is now:

> Once we declare an animalList to be of type Animal, can we add any type of animal to it?

For example, can we add a new dog to the list:

```scala
animalList.add(new Dog)
```

In theory we should be able to do this (i.e. add any type of animal). But adding a new Dog to a list of Cats would pollute the list.

(If you want to skip ahead, the answer to how Scala solves this problem is [explained below](/scala-generics#further-covariant-explanation).)

## Invariance

If the answer to our original question is **No**, we want lists of Cats and lists of Animal to be two separate things, then we use **invariance**. You would write an invariant list by not specifying any signs (i.e. +) before or after the type parameter:

```scala
class InvariantList[A]
```

Invariant classes are each in their own world, you can't substitute one for another. So the following code wouldn't work:

```scala
val invariantAnimalList: InvariantList[Animal] = new InvariantList[Cat]
```

For this type of list you have to supply a list of Animals, nothing else will work.

This is the default behavior in Scala.

# Contravariance

The third answer that we can give to the question is to declare a **contravariant** list. Contra-variance classes are defined with a minus sign before them:

```scala
class ContravariantList[-A]
```

To use a contravariant list, we would define the type parameters in the opposite way to the Covariant list, i.e.:

```scala
val contravariantList: ContravariantList[Cat] = new ContravariantList[Animal]
```

If you look again at the [Covariant list](/scala-generics#1-covariance), you can replace a list of Cats with a list of Animals, because Cats are Animals.

But in the contravariant case, we are initially specifying to replace a list of Cats with a list of Animals, even though Cat is a subtype of Animal.

The relationship is exactly opposite, and doesn't really make sense. How can you replace a list of Cats with a list of Animals? Because animals could also be Dogs etc.

Lets think about it another way. Instead of a ContravariantList class, lets create a class called **Trainer** - a class that trains animals:

```scala
class Trainer[-A]
```

Now if I say that I want a Trainer of **Cat**, but I am supplying a Trainer of **Animal**, this declaration on the right hand side is better because it can also train a Dog as well as a Cat.

```scala
val trainerOfCats: Trainer[Cat] = new Trainer[Animal]
```

And if we wanted a trainer of Dog, we could do:

```scala
val trainerOfDogs: Trainer[Dog] = new Trainer[Animal]
```

Hopefully with the above example, you can see where a contravariant list makes a bit more sense.

# Bounded Types

[Bounded types](https://apiumhub.com/tech-blog-barcelona/scala-type-bounds/) in Scala generics allow you to _use generic classes only for certain types_. Those types are are either a **subclass** or a **superclass** of a different type. For example:

```scala
class Cage[A <: Animal]
```

We define a class here called Cage. It has a type parameter of type A. We add a restriction in the form of the **<:** operator for the Animal type.

Basically we are saying class Cage only accepts type parameters A that are **Subtypes** of Animal.

Let's say that the class receives a parameter animal which is of type A, so our Cage class now looks like so:

```scala
class Cage[A <: Animal](animal: A)
```

If we now declare a val of cage, we can use the Cage generic class to put in a Dog:

```scala
val cage = new Cage(new Dog)
```

This is an acceptable type for the cage. But the following wouldn't work:

```scala
class Car
val newCage = new Cage(new Car) // throws an error
```

The Car class does not conform to the expected type. Although the IDE will not pick this up, the compiler will throw an error if we try to run this:

> Inferred type arguments do not conform to class Cage's type parameter bounds

The above is an example of **upper bounded** types.

We also have **lower bounded** types as well. Instead of <: you use >: , as you might expect. This is saying that Cage only accepts something that is a **supertype** of Animal.

Bounded types play a key role in helping to solve the variance problem that we discussed previously.

# Making MyList Covariant

Let's go back to the MyList that we introduced at the start of the post, and say that MyList is **covariant** in the type A:

```scala
class MyList[+A] {

}
```

A natural method to add in the MyList type would be an **add** method:

```scala
class MyList[+A] {
  def add(element: A): MyList[A] = ???
}
```

But the above will not work, even though MyList is covariant and is generic. The error you get is:

> Covariant type A occurs in contravariant position in type A of value element

This error is actually the technical version of the question we asked earlier. If we want to define covariant lists we need to be able to answer the question:

**If I have a list of Animals, which is in fact a List of Cats, what if I add a new Dog to it?**

The answer is that if to a list of Cats I add a new Dog, _that will turn this new list into a list of Animals._

Adding a Dog to a list of Cats will turn it into something more _Generic_, i.e a list of Animals.

Now that we know this, the technical implementation of the add method is as follows:

```scala
class MyList[+A] {
  def add[B >: A](element: B): MyList[B] = ???
}
```

Let's break this new method down carefully, because it is confusing at first:

- After declaring the add method, in square brackets we say it will take a **type parameter** of B, that is a super type of A.
- The **element** that will be passed into add will be of type B (not type A as previously)
- At the end, we return a new MyList of type B

So we are saying that, if to a list of **A**, we put in a **B** (which is a super type of A), then this list will turn into a MyList of **B**.

In the example with cats and dogs, say that A = Cat and B = Dog. The Dog is also an Animal (i.e. the super class). If we add a Dog (which is actually an Animal) into a list of Cats, that will turn the list into a list of Animals.

# Expanding the MyList class

Now that we know a bit about Generics, we can go ahead and expand the MyList class that we started in the previous blog post to be generic.

Let's start by adding the covariant type to the list, and substitute in the new type to the various methods:

**BEFORE**:

```scala
abstract class MyList {
  def head: Int
  def tail: MyList
  def isEmpty: Boolean
  def add(element: Int): MyList
  def printElements: String
  override def toString: String = "[" + printElements + "]"
}
```

**AFTER**:

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

We changed the head, tail and add elements to this class when we made it covariant.

The most complex change is to the add method. We added a type parameter of B, which is a super type of A, in the square brackets. Element is of type B, and the return type is a MyList of type B.

## Modify the Cons class

Lets now implement the newly modified abstract class in the Empty object and Cons class. We will start with Cons because it is a little bit easier to think about.

For reference, this is what the Cons class looked like originally:

```scala
class Cons(h: Int, t: MyList) extends MyList {
  def head: Int = h
  def tail: MyList = t
  def isEmpty: Boolean = false
  def add(element: Int): MyList = new Cons(element, this)

  def printElements: String = {
    if(t.isEmpty) "" + h
    else h + " " + t.printElements
  }
}
```

MyList is covariant so that means Cons must be covariant as well, so we add +A in square brackets. In the class definition, the head will be of type A and the tail returns MyList[A]. Finally we also extend from MyList[A]:

```scala
class Cons[+A](h: A, t: MyList[A]) extends MyList[A] {
  // class methods to follow
}
```

For the class methods, head now returns type A and tail returns MyList of type A.

The add method needs the new parameter B, which is a super type of A. The element is of type B, and the result is a MyList of type B. The implementation of the add method stays the same:

```scala
class Cons[+A](h: A, t: MyList[A]) extends MyList[A] {
  def head: A = h
  def tail: MyList[A] = t
  def isEmpty: Boolean = false
  def add[B >: A](element: B): MyList[B] = new Cons(element, this)

  def printElements: String = {
    if(t.isEmpty) "" + h
    else h + " " + t.printElements
  }
}
```

## Modify the Empty Object

Cons is now done, so let's next look at the Empty object. Empty should be a proper replacement of MyList of anything.

Inside our test object, let's first try some examples. If we have a list of integers, we should be able to assign this to Empty. But we should also be able to do this if we have a list of strings:

```scala
object ListTest extends App {
  val listOfIntegers: MyList[Int] = Empty
  val listOfStrings: MyList[String] = Empty
}
```

For reference, this is what the Empty object looked like before:

```scala
object Empty extends MyList {
  def head: Int = throw new NoSuchElementException
  def tail: MyList = throw new NoSuchElementException
  def isEmpty: Boolean = true
  def add(element: Int): MyList = new Cons(element, Empty)

  def printElements: String = ""
}
```

Remember that MyList is covariant. The Nothing type, which we learned about previously, is a proper substitution for _any type_.

We can therefore make Empty extend from MyList\[Nothing].

```scala
object Empty extends MyList[Nothing] {
  // object methods to follow
}
```

The head method will return Nothing, and the tail will return a MyList of type nothing:

```scala
object Empty extends MyList[Nothing] {
  def head: Nothing = throw new NoSuchElementException
  def tail: MyList[Nothing] = throw new NoSuchElementException
}
```

For the add method, we will need a type parameter of B which is a super type of **Nothing** (not of A). The element is of type B and the result is a MyList of type B. The final object looks like this:

```scala
object Empty extends MyList[Nothing] {
  def head: Nothing = throw new NoSuchElementException
  def tail: MyList[Nothing] = throw new NoSuchElementException
  def isEmpty: Boolean = true
  def add[B >: Nothing](element: B): MyList[B] = new Cons(element, Empty)

  def printElements: String = ""
}
```

Lets test our code to make sure that it runs well:

```scala
object ListTest extends App {
  val listOfIntegers: MyList[Int] = new Cons(1, new Cons(2, new Cons(3, Empty)))
  val listOfStrings: MyList[String] = new Cons("Hello", new Cons("Scala", Empty))
  println(listOfIntegers.toString)
  println(listOfStrings.toString)
}
```

And it prints out the list of integers and strings as expected.

# Summary

In this post, we learned how to use **Generics** in Scala. Generics allow us to use the same code on many (potentially unrelated) types.

You declare a generic by defining a **type parameter** in between **square brackets**. It works for classes and for traits, e.g:

```scala
trait List[T] {
  def add(elem: T)
}
```

We also learned how to use **generic methods**. This means adding the type parameter in square brackets of the method definition. This allows you to use the type parameter for the rest of the method signature:

```scala
object List {
  def single[A](element: A): List[A] = ???
}
```

You can define types with multiple type parameters, and you can name type parameters with whatever you want:

```scala
trait Map[Key, Value] {
  // ...
}
```

We also learned about an important problem in type signatures, which is the **Variance Problem**. This basically says that:

> "if B extends A, should List\[B] extend List\[A]?"

There are 3 possible options:

- 1. Yes - **Covariant**:

```scala
trait List[+A]
```

- 2. No - **Invariant** (which is the default):

```scala
trait List[A]
```

- 3. Opposite - **Contra-variant**:

```scala
trait List[-A]
```

Finally we learned about **Bounded types**, which are defined by the less than or equal sign ( <: ) for upper bounds, or >: for lower bounds.

# Source Code

As always, the source code for this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/objectOriented/Generics.scala).
