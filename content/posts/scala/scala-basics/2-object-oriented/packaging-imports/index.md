---
title: 'Packaging and Imports in Scala'
date: 2019-09-16
tags: [all, scala, scala_oo_series]
slug: scala-packaging-imports
summary: In this the final blog post on our series of Object Oriented Programming in Scala, we take a look at how packaging and imports both work
image: ./TODO
category: Scala
prev: scala-exceptions
---

[[info]]
| This post is **part 10** and the final part of the _Object Oriented Programming in Scala_ series. You can view [all the posts in the series](../blog/scala_oo_series) here.

We will conclude our series of blogs posts on Object Oriented Programming in Scala with an in-depth look at packages.

# Packages in Scala

A package in Scala essentially means one or more class definitions that are grouped under the same name. Most of the time this matches the directory structure of the project.

As an example, at the top of a Scala file you will typically have something like:

```scala
package scalaBasics.objectedOriented
```

We can see from the screenshot of our project directory, how this structure relates:

## Accessing Members in a Package

Members within a package are visible and accessible by using their simple name, no matter where they are within the package.

For example they could be in a completely different file, but if that file is in the same package, they can be accessed.

If on the other hand they _aren't_ in the same package, then the member needs to be imported:

```scala
import someOtherPackage.SomeOtherClass
```

Alternatively, if you don't want to import the package, you can instead supply the full name to the IDE:

```scala
val someVal = new someOtherPackage.someOtherClass
```

This is known as supplying the **fully qualified name**

# The Package Object in Scala

A **Package Object** is a special feature of Scala. It originated from the problem that sometimes we might want to write methods or constants outside of everything else in our codebase. Currently we have to write out a member (i.e. a class, trait, object etc.) and put the values or constants in there

But for universal constants or methods that should reside outside of classes, package objects were created for this purpose.

So to create a package object in Intellij, we right click on the package that this object should sit in and choose **New > Package Object**
// SCREENSHOT

Package objects can only be _1 per package_. The name of this file is simply **package** - again, this naming convention is rarely broken:
// SCREENSHOT of the package object in the directory structure

Inside this package object, we can define methods or constants and use them by their simple name inside the rest of the package. So for example, if we had a **package** file that looked like this:

```scala
package scalaBasics

package object objectOriented {

  def sayHello: Unit = println("Hello, Scala")
  val SPEED_OF_LIGHT = 299792458
}
```

Now throughout the rest of the **objectOriented** package, we can access these methods:

```scala
  sayHello
  println(SPEED_OF_LIGHT)
```

// IMPORTS , 17, NEXT
