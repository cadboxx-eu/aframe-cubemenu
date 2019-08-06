## Credits
This component uses many ideas from Paul Armstrong's [host-menu cube](https://math.nist.gov/~SRessler/stm_scene/) and Roland Dubois' [A-GUI components](https://github.com/rdub80/aframe-gui). 

| Component  | What it is | Where it goes |
| ---------- | ---------- | - |
| [a-cube-menu](#a-cube-menu) | menu itself | inside of controller or anywhere |
| [a-side](#a-side) | one side of the cube, manually or automatically generated | inside of a-cube-menu |
| [a-button](#a-button) | button on a side | inside of a-side | 


## a-cube-menu

| Name      | Action      | Default  | Options |
| --------- | ----------- | -------- | ------- |
| color     | color of each side, unless specified in a-side | 'black' | |
| opacity   | opacity of each side | 1 | |
| height    | height | .1 | |
| width     | width | .1 | |
| depth     | depth | .1 | |
| show     | is cube small or full size | true |
| showinweb  | how to display menu in webVR | '' | 'cube', 'flat' |
| rotationaxis | which axis to rotate around | 'y' | 'x', 'y', 'z' |
| vrrotateevent | event to trigger rotation in VR | 'axismove' | any from oculus-touch-controls, vive-controls, raycaster, etc
| webrotatevent | event to trigger rotation in webVR | '' | 
| toggleevent | event to trigger expand / shrink of cube | '' | | 


## a-side

| Name      | Action      | Default | Options | 
| --------- | ----------- | ------- | ------- |
| color     | color of each side, overrides cube color | '' | |
| opacity   | opacity     | 1 | |
| face      | which face on the cube | 'front' | 'front', 'top', 'right', 'bottom', 'back', 'top' |
| flexdirection | which way the buttons should be arranged on the face | 'column' | 'column', 'row' |
| margin | spacing between buttons 'top right bottom left' | '0 0 0 0' | |
| distance | z-distance of buttons from face | .05 | |

## a-button

| Name      | Action      | Default | Options | 
| --------- | ----------- | ------- | ------- |
| type      | Kind of button | 'toggle' | 'toggle', 'radio' |
| hovercolor | color of button onhover or raycaster-intersected event | '' | |
| color     | color of button when not hovered | 'black' | |
| onclick  | function to perform on click or triggerdown or ... event | '' | |
| height    | height of button | 1 | | 
| width     | width of button | 1 | |

## Custom Events

| Name      | Action      | 
| --------- | ----------- | 
| switchhands | changes which hand holds the cube and which has the raycaster |


## More Information

- No text component. You can add your own to the button as in the example or <a-text> child.
- It is important to specify the width, height, and depth of the menu inside the <a-cubemenu> tag
- Currently buttons can only be aligned vertically


## Sample Usage
```html
<html>
  <head>
    <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
    <script src="http://github.io/justinslud/aframe-cubemenu/dist/aframe-cubemenu.js"></script>
  </head>
  
  <body>
    <a-scene>
      <a-entity id="right-hand" oculus-touch-controls="hand: right">
        <a-cube-menu height=".2" depth=".5" vrrotatevent="bbuttondown">
          <a-side face="front" color="blue" >
            <a-button width=".2" height=".3"></a-button>
          </a-side>
          <a-side face="back" opacity=".5" ></a-side>
        </a-cube-menu>
      </a-entity>
    </a-scene>
  </body>
</html>  
```

## Install
```
npm install -i aframe-cubemenu
```















