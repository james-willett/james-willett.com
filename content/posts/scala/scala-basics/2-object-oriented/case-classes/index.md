---
title: 'Case Classes in Scala'
date: 2019-09-04
tags: [all, scala, scala_oo_series]
slug: scala-case-classes
summary: Case classes are a small but very powerful feature of Scala. They are a way of defining light data structures with as little boilerplate code as possible, and with a lot of features.
image: ./case-classes-cover.png
category: Scala
prev: scala-covariant-generic-list
---

[[info]]
| This post is **part 8** of the Object Oriented Programming in Scala series.

Often when using lightweight data structures in programming, it is necessary to re-implement all sorts of boilerplate code.
For example we might add [companion objects](https://docs.scala-lang.org/tour/singleton-objects.html). Or methods for serializing and then pretty printing - methods like equals, hashCode, toString etc.

In Scala, **case classes** are an ideal solution to this problem. They are exceptionally useful shorthand for defining both a class and a companion object.
They come with a lot of sensible defaults. Perfect for lightweight data holding classes with a minimum of hassle.

# Create a Case Class

To create a case class in Scala we can simply do:

```scala
case class Person(name: String, age: Int)
```

So the only difference is the keyword **case**. But that keyword is so powerful because it does multiple things:

## Case Class Feature 1 - Class Parameters are Promoted to Fields

All class parameters in case classes are promoted to fields. So taking our **Person** class above, we can do this:

```scala
val jim = new Person("Jim", 34)
println(jim.name)
```

If we didn't include the **case** keyword in the class definition, the parameters would not have been a field and the IDE would throw an error.

## Case Class Feature 2 - Sensible toString method

Case classes include a sensible **.toString** method, for ease of debugging:

```scala
println(jim.toString)
```

This returns **Person(Jim, 34)**, which is a pretty useful output.
If we didn't include the **case** keyword, the output would be something like **scalaBasics.objectOriented.CaseClasses\$Person@7c30a502**

One other small thing to note, if we println the _object_ jim, it will automatically defer to the **.toString** method:

```scala
println(jim)
```

So println(instance) is equal to println(instance.toString). This is another form of [syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar).

## Case Class Feature 3 - Equals and Hashcode are implemented out of the box

The methods **equals** and **hashcode** are included with case classes. This makes cases classes important for collections.

So if we do:

```scala
val jim2 = new Person("Jim", 34)
println(jim == jim2)
```

This now returns **true**.

## Case Class Feature 4 - Copy method

Case classes in Scala come with a handy copy method:

```scala
val jim3 = jim.copy(age = 45)
println(jim3)
```

We can also specify new parameters to overwrite from the existing instance when calling copy. We did this above when specifying age to be 45.

## Case Class Feature 5 - Companion Objects

Another great feature is that case classes come with companion objects by default. For example if we do:

```scala
val thePerson = Person
```

Then this is a valid definition. **Person** above is the companion object of this case class.

Additionally, note that we can call the default **.apply()** method of the companion object to create a new instance of Person:

```scala
val mary = Person("Mary", 23)
```

## Case Class Feature 6 - Serializable & Extractor Patterns

Case classes are **serializable**. This makes them exceptionally useful when used with distributed systems. You can send instances of case classes through the network and in between JVMs. This is especially important for [Akka](https://akka.io/), which sends serializable messages through the network.

Finally, case classes also have **extractor patterns**, meaning that they can be used for [pattern matching](https://docs.scala-lang.org/tour/pattern-matching.html). Pattern matching is one of the most powerful features of Scala.

# Case Objects

As well as case classes in Scala, there is also the concept of a **case object**:

```scala
case object UnitedKingdom {
  def name: String = "The UK of GB and NI"
}
```

Case objects have the same properties as case classes, except they don't get companion objects because they **are** their own companion objects.

# Expand the MyList application to use Case Classes

To finish this blog, we are going to expand the MyList application that we were developing in the [previous post](./scala-covariant-generic-list) to use Case Classes and Case Objects. We simply put the keyword **case** in front of the **Empty** object, so that it becomes:

```scala
case object Empty extends MyList[Nothing] {
  def head: Nothing = throw new NoSuchElementException
  def tail: MyList[Nothing] = throw new NoSuchElementException
  def isEmpty: Boolean = true
  def add[B >: Nothing](element: B): MyList[B] = new Cons(element, Empty)

  def printElements: String = ""

  def map[B](transformer: MyTransformer[Nothing, B]): MyList[B] = Empty
  def flatMap[B](transformer: MyTransformer[Nothing, MyList[B]]): MyList[B] = Empty
  def filter(predicate: MyPredicate[Nothing]): MyList[Nothing] = Empty

  def ++[B >: Nothing](list: MyList[B]): MyList[B] = list
}
```

And the **Cons** class becomes:

```scala
case class Cons[+A](h: A, t: MyList[A]) extends MyList[A] {
  def head: A = h
  def tail: MyList[A] = t
  def isEmpty: Boolean = false
  def add[B >: A](element: B): MyList[B] = new Cons(element, this)

  def printElements: String = {
    if(t.isEmpty) "" + h
    else h + " " + t.printElements
  }

  def filter(predicate: MyPredicate[A]): MyList[A] = {
    if (predicate.test(h)) new Cons(h, t.filter(predicate))
    else t.filter(predicate)
  }

  def map[B](transformer: MyTransformer[A, B]): MyList[B] = {
    new Cons(transformer.transform(h), t.map(transformer))
  }

 def ++[B >: A](list: MyList[B]): MyList[B] = new Cons(h, t ++ list)

  def flatMap[B](transformer: MyTransformer[A, MyList[B]]): MyList[B] = {
    transformer.transform(h) ++ t.flatMap(transformer)
  }
}
```

And thats it! With those two case keywords, we have added a lot of power to our MyList application.

We have implemented **equals** and **hashcode** out of the box, so we can use the list in collections as well. We have also made the list serializable, which makes it powerful to use in distributed systems.

If we add the following to the **ListTest** :

```scala
  val listOfIntegers: MyList[Int] = new Cons(1, new Cons(2, new Cons(3, Empty)))
  val clonelistOfIntegers: MyList[Int] = new Cons(1, new Cons(2, new Cons(3, Empty)))
```

Then this would now return true:

```scala
println(listOfIntegers == clonelistOfIntegers)
```

# Summary

Case classes are a small but very powerful feature of Scala.

They are a way of defining light data structures with as little boilerplate code as possible, and with a lot of features:

- Companion objects are already implemented
- Sensible methods are included like equals, hashCode and toString
- Parameters are auto-promoted to fields, so that we can use them as if they are vals
- Cloning is also implemented. Case classes are also serializable and also extractable in pattern matching
- Case objects are the same as case classes - only they are objects!

# Source Code

As always, the source code for this post is available on [Github](https://github.com/james-willett/ScalaBlog/blob/master/src/scalaBasics/objectOriented/CaseClasses.scala).
