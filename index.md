---
layout: project
---


# The pony mail express

This is a [design](https://dribbble.com/shots/1283529-The-Pony-Express-Mail) I found on Dribbble made by Victor Erixon. I decided to make it a challenge to turn the design into HTML and CSS. Towards the end, I started adding some JavaScript with React + Flux + React Router. The HTML and CSS took 3 days, and the React portion took me a couple weeks. 

A live preview can be seen here:
[The Pony Mail Express](http://www.anthonykoch.com/ponymail/inbox/)


## The layout 

Flexbox and vh units made it all possible. Most of the layout uses flexbox for centering. I could have not used flexbox for some things, but that would have required a lot more tedius work. Flexbox just made everything so easy. 


### Browser support 

The design seems to work and look as it should in the most recent versions of Chrome, IE, and Firefox. Chrome does seem to have an issue where if the window is resized back and forth, and then left in mobile size, scrolling to the bottom sometimes doesn't load the emails. 


### Individual scrolling panes

The hardest part about the HTML and CSS was figuring out how to get each pane to scroll individually, and then doing that with a fixed header in the middle pane, which I call the details pane. Each pane is set to a height of `100vh` and `overflow-y` scroll. This allows each pane to scroll individually. The wrapper surrounding each pane is set to display flex, which allows the sidebar and details pane to be assigned fixed widths, while the preview pane fills the remaining width. 


### Responsive Design

I didn't intend on making it responsive because the original idea was to just turn the design into HTML and CSS. But it would just bother me too much if I didn't make it responsive. 

At more than 1000px, the preview pane is set to overflow scroll and a min width of around 700px. This allows the pane's contents to retain its width and avoid scrunching up when the browser is being resized to a smaller width.

At 1000px, only the email list is shown. The sidebar can be viewed through hitting the hamburger menu icon. 

At around 500px, the sender/recipient and title are set on different lines, but the date is set at the middle of the far right. I originally had it to where everything remained on one line, but separating them saves a lot more space and allows a lot more of the title to be shown. 


## The JavaScript

I didn't originally plan on adding any JavaScript, but I took this as an opportunity to learn more about React, since this was my first time using it. I ended up spending more time researching api docs and examples for React, Flux, and React Router than I did actually coding, though. 

I haven't put in all the functionality. I just don't have the time to be working on this anymore. The portions I did make were favoriting emails, sending emails to trash, and previewing the emails, although there isn't a way to preview the email while on mobile.


### Influences

I read some of Eric Elliot's posts on Medium about classes and React, so I tried to follow what he said. I'm not sure if I did it correctly in the slightest, though. I avoided using class and just used functions that returned objects. To get the setState function, I assigned the protoype of `React.Component` to the object being returned using the ES7 spread operator, which is awesome by the way. That allowed me to use `setState` for the components that needed to hold state. 

I've also read that components should be stateless, so the only components that hold state are the mail list wrappers and the App itself. 


### Flux

Why did I choose Flux at all? Well, most real React apps that I've seen use some sort of architecture like it, whether it be Flux, Redux, etc. So, I thought I'd learn one of them while I'm learning React. I chose Flux specifically because it just seemed like the simplest one. It was very complicated at first, but after a while of working with it, I think I've got the basic idea down.


### React Router

I think most of my time was spent learning React Router. But, the troubles I was having with it were caused by some misconceptions I had about how rendering was supposed to work. 

Since I wasn't using classes that extended `React.Component`, I didn't have access to the `setState` function on the plain object components, and so I thought it wasn't needed. I thought I was supposed to call render everytime the store emitted a change, just like to todo app examples did. So, I was re-rendering the router each time the store store emitted a change. I didn't realize that there are some components that should hold state. 


## Performance

Sorting the emails by date takes a while when there are 1500+ emails. It starts to cause pauses which get noticeably longer as more emails are added. 


## Last thoughts 

Overall, it was a fun learning experience. There's definitely things I could have done better, such as eliminating redundant code, but for now I'm just going to leave it as is. 

