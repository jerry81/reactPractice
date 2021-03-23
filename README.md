# reactPractice

### components 

component types
1.  React.Component 
    a.  re-render when data changes
    b.  takes in params aka props
    c.  has a render() method
    d.  jsx transforms during build time - (so react is compiled) example <!-- <div> --> (jsx) to React.createElement('div')
    e.  React.createElement(element_name, properties (such as className), ...children)

### lifting state
means moving state from child components to parent components

### JSX 
1.  can use JS in jsx
2.  when surrounding with round parens, cannot use semicolons inside the jsx block

### functional component 
1.  simpler way to write components
2.  only contain render method
3.  takes props as input return what should be rendered
4.  avoid writing classes

### benefits of immutability 
1.  dont traverse entire object tree for changes, just compare hashes for object re-assignment
2.  pure components - reduces work react has to do for re-rendering 

### definitions

npx - an npm package that runs from node_modules/.bin, installing packages needed to run 

