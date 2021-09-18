# How Javascript works behind the scenes

See slides - nothing more to add in addition to what is in the slide.

Never use a arrow function as an object method. it doesnt have their own _this_ pointer. It inherits the _this_ pointer from its parent.

Primitives are passsed by value.

Objects are passed by reference.

When you set a object to const. You can still change the values of the variables inside an object. Whats is constant is just the memory reference (adress) pointing towards where the data is stored.

Copy objects with `const copyObj = Object.assign({}, originalObh);`. Please note that this is a shallow copy. So if you have defined an object inside an object. The copy of the inside object will not follow.
