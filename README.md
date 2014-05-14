#Ω.js

Ω (opt-z on mac, alt-234 on pc) is a dependency-free DOM and image manipulation library. 

##Selection
Selection works like jQuery

```
Ω('tag')
Ω(".class")
Ω('#id')
```

Ω('document') returns document and Ω() and Ω('window') return window

##Events
Events work like jQuery. For a list of supported events, see http://www.w3schools.com/tags/ref_eventattributes.asp

```
Ω(selector).on(event, function);
```

click, drag, dragover, and mouseover have shorthand methods, because I needed them for something. 

```
Ω('button').click(function(e){
  Ω('img').hide();
});
//sets all image display properties to "none"
```
To reference the DOM element calling the event, pass the event into a Ω selector.

```
Ω('img').on('mouseover', function(e){
  Ω(e).noWhite();
});
// will remove all white from images on mouseover
```

Methods set are added cumulatively.

```
Ω('img').click(function(e){
  Ω(e).mirror;
});

Ω('#someImageId').on('click', function(e){
  Ω('#someImageId').draggable();
});
//when clicked, the referenced image will be both mirrored and draggable.
```

No event delegation yet! Coming soon!

##Methods

Methods are mostly chainable and work for both single elements and groups of elements. 

###.setBackground(color, url, options)

The second two arguements are optional, but options depend on am image url.

```
Ω('body').setBackground('white', 'image.png', 'right top');
Ω('div').setBackground('#32c9dd');
```

###.draggable()

Make the element draggable. Uses absolute positioning.

###.hide() .show() .toggleDisplay()

Change display propteries.

###.itsClass('new class')

Adds new classes, or returns the class if a single element is selected and no argument is given.

```
Ω('img').itsClass('image');
Ω('#anImage').itsClass();
//returns 'image'
```
###.noClass()

Removes all classes

###.destroy()

Totally removes element from the DOM.

###.thisObj()

Returns the elements selected by Ω.

###.duplicate()

Appends duplicates of the selected elements to the DOM with unique ID's.

###.mirro()

Flips stuff.

##Image Methods

##.noWhite()

Makes all white in an image transparent.

##.noBlack()

Makes all black in an image transparent.

##.static()

Randomly adjusts each opaque pixel's color in an image for a few seconds, then stops when the image is fully turned to static.













