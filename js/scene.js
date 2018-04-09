//------------------------------------------------------------------------------------------------------------------
// A SceneJS minimal boilerplate to get you started
//
// Some resources you might need:
//
// Getting started: http://xeolabs.com/articles/scenejs-quick-start/
// Examples:        http://scenejs.org/examples/index.html
// Tutorials:       http://xeolabs.com
//
// Right, off you go - make something wicked!
//------------------------------------------------------------------------------------------------------------------


// Point SceneJS to the bundled plugins
SceneJS.setConfigs({
    pluginPath:"./plugins"
});

//AZIMUTH
var azimuth_left_position_l = 672;
var azimuth_right_position_l = 661.5;
var azimuth_left_position_r = 0;
var azimuth_right_position_r = 0;
var azimuth_top_position = 700;
var azimuth_bottom_position = 200;
var azimuth_index = 0;
var ficu = 0;

var chanel = true;      //true: 2-4, false: 1-3


var timer;

function y_value(x_value, z_value){  
    var r = 999 * Math.cos(Math.asin(z_value/999));
    var y0 = r * Math.cos(Math.asin(x_value/r));
    return y0;
}

var azimuth_l_clips = [
    // Left
    {
        x: -1.0,
        y: 0.0,
        z: 0.0,
        dist: azimuth_left_position_l,
        mode: "inside"
    },
    // Right
    {
        x: 1.0,
        y: 0.0,
        z: 0.0,
        dist: azimuth_right_position_l,
        mode: "inside"
    },
    // Bottom
    {
        x: 0.0,
        y: -1.0,
        z: 0.0,
        dist: -azimuth_bottom_position,
        mode: "inside"
    },
    // Top
    {
        x: 0.0,
        y: 1.0,
        z: 0.0,
        dist: azimuth_top_position,
        mode: "inside"
    },
    //Back
    {
        x: 0.0,
        y: 0.0,
        z: 1.0,
        dist: 0.0,
        mode: "inside"
    }
];
var azimuth_l_position = {
    positions: [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        // -azimuth_left_position_l, azimuth_bottom_position, -y_value(azimuth_left_position_l, azimuth_bottom_position),
        // -azimuth_right_position_l, azimuth_bottom_position, -y_value(azimuth_right_position_l, azimuth_bottom_position),
        // -azimuth_right_position_l, azimuth_top_position, -y_value(azimuth_right_position_l, azimuth_top_position),
        // -azimuth_left_position_l, azimuth_top_position, -y_value(azimuth_left_position_l, azimuth_top_position),
        -50, 130, 0
    ]
}
var azimuth_l_add_position = {
    positions: [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        -50, 130, 0
    ]
}
var azimuth_l_clips_add = [
    // Left
    {
        x: -1.0,
        y: 0.0,
        z: 0.0,
        dist: azimuth_left_position_l,
        mode: "inside"
    },
    // Right
    {
        x: 1.0,
        y: 0.0,
        z: 0.0,
        dist: azimuth_right_position_l,
        mode: "inside"
    },
    // Bottom
    {
        x: 0.0,
        y: -1.0,
        z: 0.0,
        dist: -535,
        mode: "inside"
    },
    // Top
    {
        x: 0.0,
        y: 1.0,
        z: 0.0,
        dist: 700,
        mode: "inside"
    },
    //Back
    {
        x: 0.0,
        y: 0.0,
        z: 1.0,
        dist: 0.0,
        mode: "inside"
    }
];

var azimuth_r_clips = [
    // Left
    {
        x: -1.0,
        y: 0.0,
        z: 0.0,
        dist: azimuth_left_position_l,
        mode: "inside"
    },
    // Right
    {
        x: 1.0,
        y: 0.0,
        z: 0.0,
        dist: azimuth_right_position_l,
        mode: "inside"
    },
    // Bottom
    {
        x: 0.0,
        y: -1.0,
        z: 0.0,
        dist: -azimuth_bottom_position,
        mode: "inside"
    },
    // Top
    {
        x: 0.0,
        y: 1.0,
        z: 0.0,
        dist: azimuth_top_position,
        mode: "inside"
    },
    //Back
    {
        x: 0.0,
        y: 0.0,
        z: 1.0,
        dist: 0.0,
        mode: "inside"
    }
];
var azimuth_r_position = {
    positions: [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        // -azimuth_left_position_l, azimuth_bottom_position, -y_value(azimuth_left_position_l, azimuth_bottom_position),
        // -azimuth_right_position_l, azimuth_bottom_position, -y_value(azimuth_right_position_l, azimuth_bottom_position),
        // -azimuth_right_position_l, azimuth_top_position, -y_value(azimuth_right_position_l, azimuth_top_position),
        // -azimuth_left_position_l, azimuth_top_position, -y_value(azimuth_left_position_l, azimuth_top_position),
        -50, 130, 0
    ]
}
var azimuth_r_add_position = {
    positions: [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        -50, 130, 0
    ]
}
var azimuth_r_clips_add = [
    // Left
    {
        x: -1.0,
        y: 0.0,
        z: 0.0,
        dist: azimuth_left_position_l,
        mode: "inside"
    },
    // Right
    {
        x: 1.0,
        y: 0.0,
        z: 0.0,
        dist: azimuth_right_position_l,
        mode: "inside"
    },
    // Bottom
    {
        x: 0.0,
        y: -1.0,
        z: 0.0,
        dist: -535,
        mode: "inside"
    },
    // Top
    {
        x: 0.0,
        y: 1.0,
        z: 0.0,
        dist: 700,
        mode: "inside"
    },
    //Back
    {
        x: 0.0,
        y: 0.0,
        z: 1.0,
        dist: 0.0,
        mode: "inside"
    }
];


// Define scene
var scene = SceneJS.createScene({
    nodes:[
        {
            type:"cameras/orbit",
            look:{ x: 0, y:200, z: 0 },
            yaw:50,
            pitch:-20,
            //maxPitch: -12,
            zoom: 1000,
            zoomSensitivity:-50.0,
            cursorSize:1.0,

            nodes: [
                {
                    type:"depthBuffer",
                    enabled: true, // Default
//                        clearDepth:1.0, // Default is 1.0 - clamped to [0..1]
//                        depthFunc: "less", // Default - also "equal","lequal","greater","notequal" and "gequal"
                    nodes:[
                        {
                            type:"lights",
                            lights:[
                                {
                                    mode:"ambient",
                                    color:{ r:0.5, g:0.5, b:0.5 }, // Bluish ambient
                                    diffuse:true,
                                    specular:false
                                },
                                {
                                    mode:"dir",
                                    color:{ r:0.7, g:0.7, b:0.7 },
                                    diffuse:true,
                                    specular:false,
                                    dir:{ x:-0.9, y:-0.9, z:-0.9 },
                                    space:"world"
                                }
                            ],
                            nodes: [
                                //surface
                                {
                                    type: "name",
                                    name: "surface",
                                    nodes:[
                                        {
                                            type: "material",
                                            color: { r: 0.45, g: 0.8, b: 0.2 },
//                                                type: "texture",
//                                                src: 'textures/Island_02_FLOW.jpg',
//                                                src: 'textures/Island_02_HITE.jpg',
                                            applyTo: "color",
                                            blendMode: "add",
                                            specular: 0.0,

                                            nodes:[
                                                {
                                                    type: "texture",
                                                    src: "textures/Island_02_NRML.jpg",
                                                    applyTo: "normals",
                                                    nodes:[
                                                        {
                                                            type:"translate",
                                                            x:-200.0, y:0.0, z:-300.0,
                                                            nodes:[
                                                                {
                                                                    type:"geometry/heightmap",
                                                                    src: "textures/heightmap.jpg",
                                                                    // Wireframe or solid - default is false
                                                                    wire: false,
                                                                    // Dimensions
                                                                    xSize: 5000,
                                                                    zSize: 5000,
                                                                    ySize: 200
                                                                    // Segments on X and Z axis
                                                                    //                                                                xSegments: 100,
                                                                    //                                                                zSegments: 100,
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //sky
                                {
                                    type: "name",
                                    name: "sky",

                                    nodes:[
                                        {
                                            type: "skybox/cloudySea",
                                            size: 10000
                                        }
                                    ]
                                },
                                //building
                                {
                                    type: "material",
                                    color: { r: 0.45, g: 0.4, b: 0.2 },
                                    specular: 0.0,
                                    nodes:[
                                        {
                                            type: "translate",
                                            x:-50, y:110, z:0,
                                            nodes: [
                                                {
                                                    type: "rotate",
                                                    x : 0, y : 1, z : 0, angle : -45,
                                                    nodes:[
                                                        {
                                                            type:"geometry/box",
                                                            xSize: 20,
                                                            ySize: 30,
                                                            zSize: 50
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            type: "translate",
                                            x:50, y:110, z:0,
                                            nodes: [
                                                {
                                                    type: "rotate",
                                                    x : 0, y : 1, z : 0, angle : 45,
                                                    nodes:[
                                                        {
                                                            type:"geometry/box",
                                                            xSize: 20,
                                                            ySize: 30,
                                                            zSize: 50
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            type: "translate",
                                            x:0, y:110, z:0,
                                            nodes: [
                                                {
                                                    type: "rotate",
                                                    x : 0, y : 1, z : 0, angle : 45,
                                                    nodes:[
                                                        {
                                                            type:"geometry/box",
                                                            xSize: 25,
                                                            ySize: 50,
                                                            zSize: 25
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //sector
                                {
                                    type: "style",
                                    lineWidth: 4, // Default
                                    nodes:[
                                        {
                                            type: "flags",
                                            flags: {
                                                transparent: true,
                                                solid: false
                                            },
                                            nodes: [
                                                {
                                                    type: "clips",
                                                    clips: [
                                                            // Left
                                                            {
                                                                x: -1.0,
                                                                y: 0.0,
                                                                z: 0.0,
                                                                dist: 672.0,
                                                                mode: "inside"
                                                            },
                                                            // Right
                                                            {
                                                                x: 1.0,
                                                                y: 0.0,
                                                                z: 0.0,
                                                                dist: 672.0,
                                                                mode: "inside"
                                                            },
                                                            // Bottom
                                                            {
                                                                x: 0.0,
                                                                y: -1.0,
                                                                z: 0.0,
                                                                dist: -200.0,
                                                                mode: "inside"
                                                            },
                                                            // Top
                                                            {
                                                                x: 0.0,
                                                                y: 1.0,
                                                                z: 0.0,
                                                                dist: 700.0,
                                                                mode: "inside"
                                                            },
                                                            //Back
                                                            {
                                                                x: 0.0,
                                                                y: 0.0,
                                                                z: 1.0,
                                                                dist: 0.0,
                                                                mode: "inside"
                                                            }
                                                    ],
                                                    nodes: [
                                                        {
                         
                                                            nodes: [
                                                                {
                                                                    type: "material",
                                                                    color: {r: 0.2, g: 0.2, b: 0.8},
                                                                    alpha: 0.25,
                                                                    nodes: [
                            
                                                                        // Torus primitive, implemented by plugin at http://scenejs.org/api/latest/plugins/node/geometry/torus.js
                                                                        {
                                                                            type:"geometry/sphere",
                                                                            latudeBands:36,
                                                                            longitudeBands:36,
                                                                            radius:1000
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                            ]
                                        },
                                        //Left_azimuth
                                        {   
                                            type:"layer",
                                            id:"azimuth_l",
                                            enabled: false,
                                            nodes: [
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true,
                                                        solid: false
                                                    },
                                                    nodes: [
                                                        {
                                                            type: "material",
                                                            color: {r: 0.8, g: 0.2, b: 0.2},
                                                            alpha: 0.3,
                                                            nodes: [
                                                                {
                                                                    type: "clips",
                                                                    clips: azimuth_l_clips,
                                                                    nodes:[{
                                                                        type:"geometry/sphere",
                                                                        latudeBands:36,
                                                                        longitudeBands:36,
                                                                        radius:999
                                                                    }] 
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_lines",
                                            enabled: false,
                                            nodes: [
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: azimuth_l_position.positions,
                                                    indices: [
                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                }
                                            ]
                                        },
                                        {   
                                            type:"layer",
                                            id:"azimuth_l_add",
                                            enabled: false,
                                            nodes: [
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true,
                                                        solid: false
                                                    },
                                                    nodes: [
                                                        {
                                                            type: "material",
                                                            color: {r: 0.8, g: 0.2, b: 0.2},
                                                            alpha: 0.3,
                                                            nodes: [
                                                                {
                                                                    type: "clips",
                                                                    clips: azimuth_l_clips_add,
                                                                    nodes:[{
                                                                        type:"geometry/sphere",
                                                                        latudeBands:36,
                                                                        longitudeBands:36,
                                                                        radius:999
                                                                    }] 
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_add_lines",
                                            enabled: false,
                                            nodes: [
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: azimuth_l_position.positions,
                                                    indices: [
                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                }
                                            ]
                                        },                                        
                                        //Right_azimuth
                                        {   
                                            type:"layer",
                                            id:"azimuth_r",
                                            enabled: false,
                                            nodes: [
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true,
                                                        solid: false
                                                    },
                                                    nodes: [
                                                        {
                                                            type: "material",
                                                            color: {r: 0.8, g: 0.2, b: 0.2},
                                                            alpha: 0.3,
                                                            nodes: [
                                                                {
                                                                    type: "clips",
                                                                    clips: azimuth_r_clips,
                                                                    nodes:[{
                                                                        type:"geometry/sphere",
                                                                        latudeBands:36,
                                                                        longitudeBands:36,
                                                                        radius:999
                                                                    }] 
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_lines",
                                            enabled: false,
                                            nodes: [
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: azimuth_r_position.positions,
                                                    indices: [
                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                }
                                            ]
                                        },
                                        {   
                                            type:"layer",
                                            id:"azimuth_r_add",
                                            enabled: false,
                                            nodes: [
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true,
                                                        solid: false
                                                    },
                                                    nodes: [
                                                        {
                                                            type: "material",
                                                            color: {r: 0.8, g: 0.2, b: 0.2},
                                                            alpha: 0.3,
                                                            nodes: [
                                                                {
                                                                    type: "clips",
                                                                    clips: azimuth_r_clips_add,
                                                                    nodes:[{
                                                                        type:"geometry/sphere",
                                                                        latudeBands:36,
                                                                        longitudeBands:36,
                                                                        radius:999
                                                                    }] 
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_add_lines",
                                            enabled: false,
                                            nodes: [
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: azimuth_r_position.positions,
                                                    indices: [
                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                }
                                            ]
                                        },  
                                        //fast_left

                                        //fast_right

                                        //slow_left

                                        //slow_right
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});

function chanel_change(value){
    chanel = value;
    show_azimuth(azimuth_index);
}

function change_ficu(value){
    ficu = value;
    show_azimuth(azimuth_index);
}

function start_azimuth() {
    clearInterval(timer);
    if(chanel){
        azimuth_left_position_l = 672;
        azimuth_right_position_l = 661.5; 
        azimuth_left_position_r = 0;
        azimuth_right_position_r = 10.5;
    }
    else{
        azimuth_left_position_l = 336;
        azimuth_right_position_l = 325.5; 
        azimuth_left_position_r = 336;
        azimuth_right_position_r = 346.5;
    }
    timer = setInterval(
        function () {
            azimuth_index++;
            if(azimuth_index >= 32)  azimuth_index = 1;
            azimuth_update(azimuth_index);            
        }, 1000);
}

function azimuth_update(azimuth_index){
    var index = azimuth_index - 1;
    scene.getNode('azimuth_l', function (clipsNode){
        clipsNode.setEnabled(true);

        if(chanel){
            azimuth_left_position_l = 672 - 10.5 * index; 
            azimuth_right_position_l = 661.5 - 10.5 * index;
            if(azimuth_left_position_l <= 336){
                azimuth_left_position_l = 672;
                azimuth_right_position_l = 661.5;
            }
        }
        else {
            azimuth_left_position_l = 336 - 10.5 * index; 
            azimuth_right_position_l = 325.5 - 10.5 * index;
            if(azimuth_left_position_l <= 0){
                azimuth_left_position_l = 336;
                azimuth_right_position_l = 325.5;
            }  
        }

        if(ficu === 0){
            scene.getNode('azimuth_l_add', function (clipsNode){
                clipsNode.setEnabled(true);
                azimuth_l_clips_add[0].dist = azimuth_left_position_l;        
                azimuth_l_clips_add[1].dist = -azimuth_right_position_l;
                clipsNode.nodes[0].nodes[0].nodes[0].setClips(azimuth_l_clips_add);
                scene.getNode('azimuth_l_add_lines',function (clipsNode) {
                    clipsNode.setEnabled(true);
                    azimuth_l_add_position.positions[0] = -azimuth_left_position_l;
                    azimuth_l_add_position.positions[1] = 535;
                    azimuth_l_add_position.positions[2] = -y_value(azimuth_left_position_l, 535);
            
                    azimuth_l_add_position.positions[3] = -azimuth_right_position_l;
                    azimuth_l_add_position.positions[4] = 535;
                    azimuth_l_add_position.positions[5] = -y_value(azimuth_right_position_l, 535);
                
                    azimuth_l_add_position.positions[6] = -azimuth_right_position_l;
                    azimuth_l_add_position.positions[7] = 700;
                    azimuth_l_add_position.positions[8] = -y_value(azimuth_right_position_l, 700);
            
                    azimuth_l_add_position.positions[9] = -azimuth_left_position_l;
                    azimuth_l_add_position.positions[10] = 700;
                    azimuth_l_add_position.positions[11] = -y_value(azimuth_left_position_l, 700);
            
                    clipsNode.nodes[0].setPositions(azimuth_l_add_position);
                });
            });
            azimuth_bottom_position = 200;
            azimuth_top_position = 365;
            azimuth_l_clips[2].dist = -azimuth_bottom_position;
            azimuth_l_clips[3].dist = azimuth_top_position;
        }
        else if(ficu === 8){
            azimuth_bottom_position = 365;
            azimuth_top_position = 535;
            azimuth_l_clips[2].dist = -azimuth_bottom_position;
            azimuth_l_clips[3].dist = azimuth_top_position;
        }
        else if(ficu === 12){
            azimuth_bottom_position = 450;
            azimuth_top_position = 625;
            azimuth_l_clips[2].dist = -azimuth_bottom_position;
            azimuth_l_clips[3].dist = azimuth_top_position;
        }

        azimuth_l_clips[0].dist = azimuth_left_position_l;        //left
        azimuth_l_clips[1].dist = -azimuth_right_position_l;      //right
        
        clipsNode.nodes[0].nodes[0].nodes[0].setClips(azimuth_l_clips);
        scene.getNode('azimuth_l_lines',function (clipsNode) {
            clipsNode.setEnabled(true);
            azimuth_l_position.positions[0] = -azimuth_left_position_l;  //left
            azimuth_l_position.positions[1] = azimuth_bottom_position;
            azimuth_l_position.positions[2] = -y_value(azimuth_left_position_l, azimuth_bottom_position);

            azimuth_l_position.positions[3] = -azimuth_right_position_l;
            azimuth_l_position.positions[4] = azimuth_bottom_position;
            azimuth_l_position.positions[5] = -y_value(azimuth_right_position_l, azimuth_bottom_position);
        
            azimuth_l_position.positions[6] = -azimuth_right_position_l;
            azimuth_l_position.positions[7] = azimuth_top_position;
            azimuth_l_position.positions[8] = -y_value(azimuth_right_position_l, azimuth_top_position);

            azimuth_l_position.positions[9] = -azimuth_left_position_l;
            azimuth_l_position.positions[10] = azimuth_top_position;
            azimuth_l_position.positions[11] = -y_value(azimuth_left_position_l, azimuth_top_position);

            clipsNode.nodes[0].setPositions(azimuth_l_position);
        });
    });    

    scene.getNode('azimuth_r', function (clipsNode){
        clipsNode.setEnabled(true);

        if(chanel){
            azimuth_left_position_r = 0 + 10.5 * index; 
            azimuth_right_position_r = 10.5 + 10.5 * index;
            if(azimuth_left_position_r >= 336){
                azimuth_left_position_r = 0; 
                azimuth_right_position_r = 10.5;
            }
        }
        else {
            azimuth_left_position_r = 336 + 10.5 * index; 
            azimuth_right_position_r = 346.5 + 10.5 * index;
            if(azimuth_left_position_r >= 672){
                azimuth_left_position_r = 336; 
                azimuth_right_position_r = 346.5;
            }  
        }

        if(ficu === 0){
            scene.getNode('azimuth_r_add', function (clipsNode){
                clipsNode.setEnabled(true);
                azimuth_r_clips_add[0].dist = -azimuth_left_position_r;        
                azimuth_r_clips_add[1].dist = azimuth_right_position_r;
                clipsNode.nodes[0].nodes[0].nodes[0].setClips(azimuth_r_clips_add);
                scene.getNode('azimuth_r_add_lines',function (clipsNode) {
                    clipsNode.setEnabled(true);
                    azimuth_r_add_position.positions[0] = azimuth_left_position_r;
                    azimuth_r_add_position.positions[1] = 535;
                    azimuth_r_add_position.positions[2] = -y_value(azimuth_left_position_r, 535);
            
                    azimuth_r_add_position.positions[3] = azimuth_right_position_r;
                    azimuth_r_add_position.positions[4] = 535;
                    azimuth_r_add_position.positions[5] = -y_value(azimuth_right_position_r, 535);
                
                    azimuth_r_add_position.positions[6] = azimuth_right_position_r;
                    azimuth_r_add_position.positions[7] = 700;
                    azimuth_r_add_position.positions[8] = -y_value(azimuth_right_position_r, 700);
            
                    azimuth_r_add_position.positions[9] = azimuth_left_position_r;
                    azimuth_r_add_position.positions[10] = 700;
                    azimuth_r_add_position.positions[11] = -y_value(azimuth_left_position_r, 700);
            
                    clipsNode.nodes[0].setPositions(azimuth_r_add_position);
                });
            });
            azimuth_bottom_position = 200;
            azimuth_top_position = 365;
            azimuth_r_clips[2].dist = -azimuth_bottom_position;
            azimuth_r_clips[3].dist = azimuth_top_position;
        }
        else if(ficu === 8){
            azimuth_bottom_position = 365;
            azimuth_top_position = 535;
            azimuth_r_clips[2].dist = -azimuth_bottom_position;
            azimuth_r_clips[3].dist = azimuth_top_position;
        }
        else if(ficu === 12){
            azimuth_bottom_position = 450;
            azimuth_top_position = 625;
            azimuth_r_clips[2].dist = -azimuth_bottom_position;
            azimuth_r_clips[3].dist = azimuth_top_position;
        }

        azimuth_r_clips[0].dist = -azimuth_left_position_r;        //left
        azimuth_r_clips[1].dist = azimuth_right_position_r;      //right
        
        clipsNode.nodes[0].nodes[0].nodes[0].setClips(azimuth_r_clips);
        scene.getNode('azimuth_r_lines',function (clipsNode) {
            clipsNode.setEnabled(true);
            azimuth_r_position.positions[0] = azimuth_left_position_r;  //left
            azimuth_r_position.positions[1] = azimuth_bottom_position;
            azimuth_r_position.positions[2] = -y_value(azimuth_left_position_r, azimuth_bottom_position);

            azimuth_r_position.positions[3] = azimuth_right_position_r;
            azimuth_r_position.positions[4] = azimuth_bottom_position;
            azimuth_r_position.positions[5] = -y_value(azimuth_right_position_r, azimuth_bottom_position);
        
            azimuth_r_position.positions[6] = azimuth_right_position_r;
            azimuth_r_position.positions[7] = azimuth_top_position;
            azimuth_r_position.positions[8] = -y_value(azimuth_right_position_r, azimuth_top_position);

            azimuth_r_position.positions[9] = azimuth_left_position_r;
            azimuth_r_position.positions[10] = azimuth_top_position;
            azimuth_r_position.positions[11] = -y_value(azimuth_left_position_r, azimuth_top_position);

            clipsNode.nodes[0].setPositions(azimuth_r_position);
        });
    });    
   
}

function stop_azimuth() {
    clearInterval(timer);
    scene.getNode('azimuth_l', function (myEnable) {
            myEnable.setEnabled(false);
        }
    );
    scene.getNode('azimuth_l_add', function (myEnable) {
            myEnable.setEnabled(false);
        }
    );
    scene.getNode('azimuth_l_lines', function (myEnable) {
            myEnable.setEnabled(false);
        }
    );
    scene.getNode('azimuth_l_add_lines', function (myEnable) {
            myEnable.setEnabled(false);
        }
    );
    scene.getNode('azimuth_r', function (myEnable) {
            myEnable.setEnabled(false);
        }
    );
    scene.getNode('azimuth_r_add', function (myEnable) {
            myEnable.setEnabled(false);
        }
    );
    scene.getNode('azimuth_r_lines', function (myEnable) {
            myEnable.setEnabled(false);
        }
    );
    scene.getNode('azimuth_r_add_lines', function (myEnable) {
            myEnable.setEnabled(false);
        }
    );
    show_info('stop');
}

function show_azimuth(value) {
    stop_azimuth();
    if(value === "0"){
        return;
    }
    azimuth_index = value;
    azimuth_update(azimuth_index);

}

function azimuth_change() {
    stop_azimuth();
    stop_fast();
    stop_slow();
    document.getElementById("azimuth_start").disabled = false;
    document.getElementById("azimuth_stop").disabled = false;
    document.getElementById("azimuth").disabled = false;
    document.getElementById("fast_start").disabled = true;
    document.getElementById("fast_stop").disabled = true;
    document.getElementById("fast").disabled = true;
    document.getElementById("slow_start").disabled = true;
    document.getElementById("slow_stop").disabled = true;
    document.getElementById("slow").disabled = true;
}

var fast_index = 0;
var lastLayerNodeLeftFast;
var lastLayerNodeRightFast;

function start_fast() {
    clearInterval(timer);
    timer = setInterval(
        function () {
            scene.getNode(options_fast_r [fast_index % options_fast_r.length],
                function (layerNode) {
                    if (lastLayerNodeRightFast) {
                        lastLayerNodeRightFast.setEnabled(false);
                    }
                    layerNode.setEnabled(true);
                    lastLayerNodeRightFast = layerNode;
                });
            scene.getNode(options_fast_l [fast_index % options_fast_l.length],
                function (layerNode) {
                    if (lastLayerNodeLeftFast) {
                        lastLayerNodeLeftFast.setEnabled(false);
                    }
                    layerNode.setEnabled(true);
                    lastLayerNodeLeftFast = layerNode;
                    fast_index++;
                    if(fast_index === 9){
                        fast_index = 1;
                    }
                    document.getElementById("fast").value = fast_index;
                });
        }, 1000);
}

function stop_fast() {
    azimuth_index = 0;
    fast_index = 0;
    slow_index = 0;
    clearInterval(timer);
    for(var i = 0; i < options_fast_l.length; i++){
        scene.getNode(options_fast_l[i],
            function (myEnable) {
                myEnable.setEnabled(false);
            }
        )
    }
    for(var j = 0; j < options_fast_r.length; j++){
        scene.getNode(options_fast_r[j],
            function (myEnable) {
                myEnable.setEnabled(false);
            }
        )
    }
}

function show_fast(value) {
    stop_fast();
    var tempValue = value - 1;
    scene.getNode(options_fast_l[tempValue], function (myEnable) {
        myEnable.setEnabled(true);
    });
    scene.getNode(options_fast_r[tempValue], function (myEnable) {
        myEnable.setEnabled(true);
    });
}

function fast_change() {
    stop_azimuth();
    stop_fast();
    stop_slow();
    document.getElementById("azimuth_start").disabled = true;
    document.getElementById("azimuth_stop").disabled = true;
    document.getElementById("azimuth").disabled = true;
    document.getElementById("fast_start").disabled = false;
    document.getElementById("fast_stop").disabled = false;
    document.getElementById("fast").disabled = false;
    document.getElementById("slow_start").disabled = true;
    document.getElementById("slow_stop").disabled = true;
    document.getElementById("slow").disabled = true;
}

var slow_index = 0;
var lastLayerNodeLeftSlow;
var lastLayerNodeRightSlow;

function start_slow() {
    clearInterval(timer);
    timer = setInterval(
        function () {
            scene.getNode(options_slow_r [slow_index % options_slow_r.length],
                function (layerNode) {
                    if (lastLayerNodeRightSlow) {
                        lastLayerNodeRightSlow.setEnabled(false);
                    }
                    layerNode.setEnabled(true);
                    lastLayerNodeRightSlow = layerNode;
                });
            scene.getNode(options_slow_l [slow_index % options_slow_l.length],
                function (layerNode) {
                    if (lastLayerNodeLeftSlow) {
                        lastLayerNodeLeftSlow.setEnabled(false);
                    }
                    layerNode.setEnabled(true);
                    lastLayerNodeLeftSlow = layerNode;
                    slow_index++;
                    if(slow_index === 49){
                        slow_index = 1;
                    }
                    document.getElementById("slow").value = slow_index;
                });
        }, 1000);
}

function stop_slow() {
    azimuth_index = 0;
    fast_index = 0;
    slow_index = 0;
    clearInterval(timer);
    for(var i = 0; i < options_slow_l.length; i++){
        scene.getNode(options_slow_l[i],
            function (myEnable) {
                myEnable.setEnabled(false);
            }
        )
    }
    for(var j = 0; j < options_slow_r.length; j++){
        scene.getNode(options_slow_r[j],
            function (myEnable) {
                myEnable.setEnabled(false);
            }
        )
    }
}

function show_slow(value) {
    stop_slow();
    var tempValue = value - 1;
    scene.getNode(options_slow_l[tempValue], function (myEnable) {
        myEnable.setEnabled(true);
    });
    scene.getNode(options_slow_r[tempValue], function (myEnable) {
        myEnable.setEnabled(true);
    });
}

function slow_change() {
    stop_azimuth();
    stop_fast();
    stop_slow();
    document.getElementById("azimuth_start").disabled = true;
    document.getElementById("azimuth_stop").disabled = true;
    document.getElementById("azimuth").disabled = true;
    document.getElementById("fast_start").disabled = true;
    document.getElementById("fast_stop").disabled = true;
    document.getElementById("fast").disabled = true;
    document.getElementById("slow_start").disabled = false;
    document.getElementById("slow_stop").disabled = false;
    document.getElementById("slow").disabled = false;
}

function show_info (alg){
    var str = '';
    if(alg === "azimuth"){
        str = String(azimuth_index * 8) + '-' + String((azimuth_index + 1) * 8);
        if(azimuth_index === 0) document.getElementById("kartin").src = 'img/zone_01.jpg';
        else if(azimuth_index === 1) document.getElementById("kartin").src = 'img/zone_02.jpg';
        else if(azimuth_index === 2) document.getElementById("kartin").src = 'img/zone_03.jpg';
        else if(azimuth_index === 3) document.getElementById("kartin").src = 'img/zone_04.jpg';
        else if(azimuth_index === 4) document.getElementById("kartin").src = 'img/zone_05.jpg';
        else if(azimuth_index === 5) document.getElementById("kartin").src = 'img/zone_06.jpg';
        else if(azimuth_index === 6) document.getElementById("kartin").src = 'img/zone_07.jpg';
        else if(azimuth_index === 7) document.getElementById("kartin").src = 'img/zone_08.jpg';
        else if(azimuth_index === 8) document.getElementById("kartin").src = 'img/zone_09.jpg';
        else if(azimuth_index === 9) document.getElementById("kartin").src = 'img/zone_10.jpg';
        else if(azimuth_index === 10) document.getElementById("kartin").src = 'img/zone_11.jpg';
        else if(azimuth_index === 11) document.getElementById("kartin").src = 'img/zone_12.jpg';
        else if(azimuth_index === 12) document.getElementById("kartin").src = 'img/zone_13.jpg';
        else if(azimuth_index === 13) document.getElementById("kartin").src = 'img/zone_14.jpg';
        else if(azimuth_index === 14) document.getElementById("kartin").src = 'img/zone_15.jpg';
        else if(azimuth_index === 15) document.getElementById("kartin").src = 'img/zone_16.jpg';
        else if(azimuth_index === 16) document.getElementById("kartin").src = 'img/zone_17.jpg';
        else if(azimuth_index === 17) document.getElementById("kartin").src = 'img/zone_18.jpg';
        else if(azimuth_index === 18) document.getElementById("kartin").src = 'img/zone_19.jpg';
        else if(azimuth_index === 19) document.getElementById("kartin").src = 'img/zone_20.jpg';
        else if(azimuth_index === 20) document.getElementById("kartin").src = 'img/zone_21.jpg';
        else if(azimuth_index === 21) document.getElementById("kartin").src = 'img/zone_22.jpg';
        else if(azimuth_index === 22) document.getElementById("kartin").src = 'img/zone_23.jpg';
        else if(azimuth_index === 23) document.getElementById("kartin").src = 'img/zone_24.jpg';
        else if(azimuth_index === 24) document.getElementById("kartin").src = 'img/zone_25.jpg';
        else if(azimuth_index === 25) document.getElementById("kartin").src = 'img/zone_26.jpg';
        else if(azimuth_index === 26) document.getElementById("kartin").src = 'img/zone_27.jpg';
        else if(azimuth_index === 27) document.getElementById("kartin").src = 'img/zone_28.jpg';
        else if(azimuth_index === 28) document.getElementById("kartin").src = 'img/zone_29.jpg';
        else if(azimuth_index === 29) document.getElementById("kartin").src = 'img/zone_30.jpg';
        else if(azimuth_index === 30) document.getElementById("kartin").src = 'img/zone_31.jpg';
        else if(azimuth_index === 31) document.getElementById("kartin").src = 'img/zone_32.jpg';
        else if(azimuth_index === 32) document.getElementById("kartin").src = 'img/zone_33.jpg';
        else if(azimuth_index === 33) document.getElementById("kartin").src = 'img/zone_34.jpg';
        else if(azimuth_index === 34) document.getElementById("kartin").src = 'img/zone_35.jpg';
        else if(azimuth_index === 35) document.getElementById("kartin").src = 'img/zone_36.jpg';
        else if(azimuth_index === 36) document.getElementById("kartin").src = 'img/zone_37.jpg';
        else if(azimuth_index === 37) document.getElementById("kartin").src = 'img/zone_38.jpg';
        else if(azimuth_index === 38) document.getElementById("kartin").src = 'img/zone_39.jpg';
        else if(azimuth_index === 39) document.getElementById("kartin").src = 'img/zone_40.jpg';
        else if(azimuth_index === 40) document.getElementById("kartin").src = 'img/zone_41.jpg';
        else if(azimuth_index === 41) document.getElementById("kartin").src = 'img/zone_42.jpg';
        else if(azimuth_index === 42) document.getElementById("kartin").src = 'img/zone_43.jpg';
        else if(azimuth_index === 43) document.getElementById("kartin").src = 'img/zone_44.jpg';
        else if(azimuth_index === 44) document.getElementById("kartin").src = 'img/zone_45.jpg';
        else if(azimuth_index === 45) document.getElementById("kartin").src = 'img/zone_46.jpg';
        else if(azimuth_index === 46) document.getElementById("kartin").src = 'img/zone_47.jpg';
        else if(azimuth_index === 47) document.getElementById("kartin").src = 'img/zone_48.jpg';
        else if(azimuth_index === 48) document.getElementById("kartin").src = 'img/zone_49.jpg';
        else if(azimuth_index === 49) document.getElementById("kartin").src = 'img/zone_40.jpg';
        else if(azimuth_index === 50) document.getElementById("kartin").src = 'img/zone_51.jpg';
        else if(azimuth_index === 51) document.getElementById("kartin").src = 'img/zone_52.jpg';
        else if(azimuth_index === 52) document.getElementById("kartin").src = 'img/zone_53.jpg';
        else if(azimuth_index === 53) document.getElementById("kartin").src = 'img/zone_54.jpg';
        else if(azimuth_index === 54) document.getElementById("kartin").src = 'img/zone_55.jpg';
        else if(azimuth_index === 55) document.getElementById("kartin").src = 'img/zone_56.jpg';
        else if(azimuth_index === 56) document.getElementById("kartin").src = 'img/zone_57.jpg';
        else if(azimuth_index === 57) document.getElementById("kartin").src = 'img/zone_58.jpg';
        else if(azimuth_index === 58) document.getElementById("kartin").src = 'img/zone_59.jpg';
        else if(azimuth_index === 59) document.getElementById("kartin").src = 'img/zone_60.jpg';
        else if(azimuth_index === 60) document.getElementById("kartin").src = 'img/zone_61.jpg';
        else if(azimuth_index === 61) document.getElementById("kartin").src = 'img/zone_62.jpg';
        else if(azimuth_index === 62) document.getElementById("kartin").src = 'img/zone_63.jpg';
        else if(azimuth_index === 63) document.getElementById("kartin").src = 'img/zone_64.jpg';
    }
    if(alg === "stop"){
        document.getElementById("kartin").src = '';
    }
    document.getElementById("label_angel").textContent  = str;
}

options_azimuth_l = [

];

options_azimuth_r = [

];

options_fast_l = [

];

options_fast_r = [

];

options_slow_l = [

];

options_slow_r = [

];