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
      face.setAttribute('color', color);
      face.setAttribute('material', 'opacity: '+opacity);
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