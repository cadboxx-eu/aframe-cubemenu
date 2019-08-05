AFRAME.registerComponent('side', {
  schema: {
    face: {type: 'string', default: 'front'},
    color: {type: 'string'},
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
