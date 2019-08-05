AFRAME.registerComponent('button', {
  schema: {
    type: {type: 'string', default: 'toggle'},
    hovercolor: {type: 'string'},
    color: {type: 'string', default: 'black'},
    onclick: {type: 'string'},
    height: {type: 'number'},
    width: {type: 'number'},
    opacity: {type: 'string'},
    distance: {type: 'string'},
  },
  
  init: function() {
    var el = this.el;
    var parent = el.parentElement;
    var grandparent = parent.parentNode;
    var data = this.data;
    var height = grandparent.getAttribute('height') * data.height || data.height;
    //var width =  data.width;
    var face = parent.getAttribute('face');
    var text = data.text;
    var color = data.color;
    var opacity = data.opacity;
    var distance = data.distance || parent.getAttribute('distance') || grandparent.getAttribute('height') / 10;
    var pos = grandparent.getAttribute('position');
    var depth = grandparent.getAttribute('depth');
    var height = grandparent.getAttribute('height');
    var width = grandparent.getAttribute('width');
 
    var names = ['right', 'left', 'top', 'bottom', 'back', 'front'];  
    
    var faceNames = [{
        face: 'right',
        height: height,
        width: depth,
      },
      {
        face: 'left',
        height: height,
        width: depth,
      },
      {
        face: 'top',
        height: depth,
        width: width,
      },
      {
        face: 'bottom',
        height: depth,
        width: width,
      },
      {
        face: 'back',
        height: height,
        width: width,
      },
      {
        face: 'front',
        height: height,
        width: width,
      }];
      
    
    var buttons = Array.from(parent.querySelectorAll('a-button'));
    var buttonsCount = buttons.length;
    var i = buttons.indexOf(el) + 1;
    var faceWidth =  data.width || faceNames[names.indexOf(face)].width;
    var faceHeight =  data.height || faceNames[names.indexOf(face)].height;
    var margin = parent.getAttribute('margin') || height / 20;
    var buttonHeight = (faceHeight - (buttonsCount + 1 ) * margin) / buttonsCount //.8 * faceHeight / buttonsCount;
    var ypos = (faceHeight/2) - (i*(margin + buttonHeight) - buttonHeight/2);
    var buttonWidth = .8 * faceWidth; 
    console.log(ypos);
    var geomText = 'primitive: plane; height: '+buttonHeight+'; width: '+buttonWidth;
    var matText = 'color: '+color+'; opacity: '+opacity;
    el.setAttribute('material', matText);
    el.setAttribute('geometry', geomText);
    el.setAttribute('position', {x: 0, y: ypos, z: distance});
    
    el.addEventListener('mouseenter' || 'raycaster-intersected', function startHover() {
      var hovercolor = data.hovercolor; 
      el.setAttribute('material', 'color: '+ hovercolor);
    });
    
    el.addEventListener('mouseleave' || 'raycaster-intersection-cleared', function endHover() {
      var color = data.color;
      el.setAttribute('material', 'color', color);
    });
        
    //something for if button is toggle to change color on click
    el.addEventListener('click' || 'triggerdown', function click(evt) {
      var onclick = data.onclick;
      if (typeof onclick === "function") onclick(evt);
    });
  }
 
  
});

AFRAME.registerPrimitive('a-button', {
  defaultComponents: {
    'button': {},
  },
  
  mappings: {
    type: 'button.type',
    hovercolor: 'button.hovercolor',
    color: 'button.color',
    opacity: 'button.opacity',
    height: 'button.height',
    width: 'button.width',
    distance: 'button.distance',
    onclick: 'button.onclick',
  }
});
