AFRAME.registerComponent('cubemenu', {  
  schema: {
    button: {type: 'string', default: 'start'},
    webparent: {type: 'string', default: 'parent'},
    webrotateevent: {type: 'string'}, // should depend on being cube not flat
    vrparent: {type: 'string', default: 'parent'},
    vrrotateevent: {type: 'string', default: 'axismove'},
    color: {type: 'string', default: 'black'},
    opacity: {type: 'number', default: 0},
    shader: {type: 'string', default: 'standard'},
    transparent: {type: 'boolean', default: false},
    height: {type: 'number', default: 1},
    width: {type: 'number', default: 1},
    depth: {type: 'number', default: 1},
    toggleevent: {type: 'string'},
    show: {type: 'boolean', default: true},
    showinweb: {type: 'boolean', default: false}, // could have flat vs cube 
    axis: {type: 'string', default: 'x'},
  
  },
  
  init: function() {
    var data = this.data;
    var el = this.el;
    var buttons = ["pad","trigger","grip","button"];
    var parent = this.el.parentElement;
    var geom = el.getAttribute('geometry');
    var pos = parent.getAttribute('position');
    var rot = parent.getAttribute('rotation');
    var height = 1 * data.height;
    var depth = 1 * data.depth;
    var width = 1 * data.width;
    var color = data.color;
    var opacity = data.opacity;
    var show = data.show;
    var webparent = data.webparent;
    var vrparent = data.vrparent;
    var toggleevent = data.toggleevent;
    var webrotateevent = data.webrotateevent;
    var vrrotateevent = data.vrrotateevent;
    var axis = data.axis;
    
    // if() el.setAttribute('vrparent', parent);
    // if() el.setAttribute('webparent', data.webparent);
    
    /*
    document.addEventListener('exit-vr', evt => {
      el.removeEventListener(vrrotateevent);
      if(webparent !== '') {
        el.querySelectorAll('a-side').forEach(function(side) {
        
        });
      }
    });
    */
    
    var names = ['right', 'left', 'top', 'bottom', 'back', 'front'];  
    var faceNames = [{
        face: 'right',
        position: {x: pos.x + width/2, y: pos.y, z: pos.z},
        rotation: {x: rot.x, y: rot.y + 90, z: rot.z},
        height: height,
        width: depth,
      },
      {
        face: 'left',
        position: {x: pos.x - width/2, y: pos.y, z: pos.z},
        rotation: {x: rot.x, y: rot.y - 90, z: rot.z},
        height: height,
        width: depth,
      },
      {
        face: 'top',
        position: {x: pos.x, y: pos.y + height/2, z: pos.z},
        rotation: {x: -90, y: 0, z: 0},
        height: depth,
        width: width,
      },
      {
        face: 'bottom',
        position: {x: pos.x, y: pos.y - height/2, z: pos.z},
        rotation: {x: 90, y: 0, z: 0},
        height: depth,
        width: width,
      },
      {
        face: 'back',
        position: {x: pos.x, y: pos.y, z: pos.z - depth/2},
        rotation: {x: 0, y: 180, z: 0},
        height: height,
        width: width,
      },
      {
        face: 'front',
        position: {x: pos.x, y: pos.y, z: pos.z + depth/2},
        rotation: {x: rot.x, y: rot.y, z: rot.z},
        height: height,
        width: width,
      }];
        
    el.querySelectorAll('a-side').forEach(function(side) { 
      var faceName = side.getAttribute('face').toLowerCase();
      if(names.includes(faceName)) {      
        var i = names.indexOf(faceName); 
        faceNames.splice(i,1);     
      }
    });    
    
    faceNames.forEach(function(faceName) {    
      var face = document.createElement('a-side');    
      face.setAttribute('face', faceName.face);
      //face.setAttribute('color', color);
      face.setAttribute('material', 'opacity: '+opacity+'; color: '+color);
      el.appendChild(face);         
    });
    
    // does go ccw or just cw?
    parent.addEventListener(vrrotateevent, evt => { 
      el.object3D.rotation[axis] += (Math.abs(evt.detail.axis[0]) > 0.3) ? (evt.detail.axis[0])/10 : 0; 
    });
    
    document.addEventListener(webrotateevent, evt => {
      el.object3D.rotation[axis] += .5;
    });
    
    parent.addEventListener(toggleevent, function() {
      if(show) {
        el.setAttribute('animation', {
          property: 'scale',
          to: '0 0 0',
          dur: '1000',
        });       
      } else {
        el.setAttribute('animation', {
          property: 'scale',
          to: '1 1 1',
          dur: '1000',
        });       
      }
      show = !show;
    });  
    
    parent.addEventListener('switchhands', evt => {
      var menuparent = parent;
      var rayparent =  document.querySelector('');//
      rayparent.append(el);
      menuparent.remove(el);
    });
  },

});

AFRAME.registerPrimitive('a-cubemenu', {
  defaultComponents: {
    'cubemenu': {},
  },
  
  mappings: {
    height: 'cubemenu.height',
    width: 'cubemenu.width',
    depth: 'cubemenu.depth',
    webparent: 'cubemenu.webparent',
    vrparent: 'cubemenu.vrparent',
    color: 'cubemenu.color',
    opacity: 'cubemenu.opacity',
    shader: 'cubemenu.shader',
    transparent: 'cubemenu.transparent',
    toggleevent: 'cubemenu.toggleevent',
    vrrotateevent: 'cubemenu.vrrotateevent',
    webrotateevent: 'cubemenu.webrotateevent',
    show: 'cube.show',
    showinweb: 'cube.showinweb',
    axis: 'cubemenu.axis',
  
  }
}); 


AFRAME.registerComponent('side', {
  schema: {
    face: {type: 'string', default: 'front'},
    color: {type: 'string', default: 'black'},
    opacity: {type: 'number', default: 0},
    flexdirection: {type: 'string', default: 'column'},
    margin: {type: 'string'},
    distance: {type: 'number'},
  },
  
  init: function() {
    var data = this.data;
    var el = this.el;
    
    var parent = el.parentElement;
    var geom = el.getAttribute('geometry');
    var pos = parent.getAttribute('position');
    var rot = parent.getAttribute('rotation');
    var width = parent.getAttribute('width');
    var height = parent.getAttribute('height');
    var depth = parent.getAttribute('depth');
    var color = data.color || parent.getAttribute('color');
    var opacity = data.opactiy || parent.getAttribute('opacity');
    var face = data.face;
    var distance = data.distance || (height + width) / 15;
    //var margin = data.margin;
    
    var names = ['right', 'left', 'top', 'bottom', 'back', 'front'];  
    var faceNames = [{
        face: 'right',
        position: {x: pos.x + width/2, y: pos.y, z: pos.z},
        rotation: {x: 0, y: rot.y + 90, z: rot.z},
        height: height,
        width: depth,
      },
      {
        face: 'left',
        position: {x: pos.x - width/2, y: pos.y, z: pos.z},
        rotation: {x: 0, y: rot.y - 90, z: rot.z},
        height: height,
        width: depth,
      },
      {
        face: 'top',
        position: {x: pos.x, y: pos.y + height/2, z: pos.z},
        rotation: {x: -90, y: 0, z: 0},
        height: depth,
        width: width,
      },
      {
        face: 'bottom',
        position: {x: pos.x, y: pos.y - height/2, z: pos.z},
        rotation: {x: 90, y: 0, z: 0},
        height: depth,
        width: width,
      },
      {
        face: 'back',
        position: {x: pos.x, y: pos.y, z: pos.z - depth/2},
        rotation: {x: 0, y: 180, z: 0},
        height: height,
        width: width,
      },
      {
        face: 'front',
        position: {x: pos.x, y: pos.y, z: pos.z + depth/2},
        rotation: {x: rot.x, y: rot.y, z: rot.z},
        height: height,
        width: width,
    }];
    
    if(names.includes(face)) {
      var i = names.indexOf(face);
      var geomText = 'primitive: plane; height: '+faceNames[i].height+'; width: '+faceNames[i].width;
      var matText = 'color: '+color;
      el.setAttribute('face', face);
      el.setAttribute('geometry', geomText);
      el.setAttribute('position', faceNames[i].position);
      el.setAttribute('rotation', faceNames[i].rotation);
      el.setAttribute('material', matText);
      // makeButtons();
    }
    // makeButtons();
    // function makeButtons();
    /*
    var buttons = el.querySelectorAll('a-button');
    if(buttons.length>0) {
      var count = buttons.length;
      var margin = data.margin || .05 * height;
      var ypos = (height / 2) - (height / count);
      buttons.forEach(function(button) {
        var buttonEl = document.createElement('a-button');
        var buttonWidth = .8 * width;
        var buttonHeight = (.8 * height) / count;
        var geomText="primitive: plane; height: "+buttonHeight+'; width: '+buttonWidth;
        buttonEl.setAttribute('geometry', geomText);
        buttonEl.setAttribute('material', 'color', 'blue');
        button.setAttribute('position', {x: 0, y: ypos, z: distance});
        ypos -= (height / count);
        el.appendChild(buttonEl);
      });
    }
    */
},

});

AFRAME.registerPrimitive('a-side', {
  defaultComponents: {
    'side': {},
  },
  
  mappings: {
    color: 'side.color',
    face: 'side.face',
    'flex-direction': 'side.flex-direction',
    opacity: 'side.opacity',
    margin: 'side.margin',
    distance: 'side.distance',
  }
  
});


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
