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

var chanel = true;      //true: 2-4, false: 1-3
var timer;
var algorithm = 0;

//AZIMUTH
var azimuth_left_position_l = 672;
var azimuth_right_position_l = 661.5;
var azimuth_left_position_r = 0;
var azimuth_right_position_r = 0;
var azimuth_top_position = 700;
var azimuth_bottom_position = 200;
var azimuth_index = "0";
var azimuth_ficu = 0;

function y_value(x_value, z_value){  
    var r = 998 * Math.cos(Math.asin(z_value/998));
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
        50, 130, 0
    ]
}
var azimuth_r_add_position = {
    positions: [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        50, 130, 0
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

//FAST
var fast_left_position_l = 672;
var fast_right_position_l = 661.5;
var fast_left_position_r = 0;
var fast_right_position_r = 0;
var fast_top_position = 700;
var fast_bottom_position = 200;
var fast_index = "0";

var fast_l_clips = [
    // Left
    {
        x: -1.0,
        y: 0.0,
        z: 0.0,
        dist: fast_left_position_l,
        mode: "inside"
    },
    // Right
    {
        x: 1.0,
        y: 0.0,
        z: 0.0,
        dist: fast_right_position_l,
        mode: "inside"
    },
    // Bottom
    {
        x: 0.0,
        y: -1.0,
        z: 0.0,
        dist: -fast_bottom_position,
        mode: "inside"
    },
    // Top
    {
        x: 0.0,
        y: 1.0,
        z: 0.0,
        dist: fast_top_position,
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
var fast_l_position = {
    positions: [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        -50, 130, 0
    ]
}
var fast_l_add_position = {
    positions: [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        -50, 130, 0
    ]
}
var fast_l_clips_add = [
    // Left
    {
        x: -1.0,
        y: 0.0,
        z: 0.0,
        dist: fast_left_position_l,
        mode: "inside"
    },
    // Right
    {
        x: 1.0,
        y: 0.0,
        z: 0.0,
        dist: fast_right_position_l,
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

var fast_r_clips = [
    // Left
    {
        x: -1.0,
        y: 0.0,
        z: 0.0,
        dist: fast_left_position_l,
        mode: "inside"
    },
    // Right
    {
        x: 1.0,
        y: 0.0,
        z: 0.0,
        dist: fast_right_position_l,
        mode: "inside"
    },
    // Bottom
    {
        x: 0.0,
        y: -1.0,
        z: 0.0,
        dist: -fast_bottom_position,
        mode: "inside"
    },
    // Top
    {
        x: 0.0,
        y: 1.0,
        z: 0.0,
        dist: fast_top_position,
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
var fast_r_position = {
    positions: [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        50, 130, 0
    ]
}
var fast_r_add_position = {
    positions: [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        50, 130, 0
    ]
}
var fast_r_clips_add = [
    // Left
    {
        x: -1.0,
        y: 0.0,
        z: 0.0,
        dist: fast_left_position_l,
        mode: "inside"
    },
    // Right
    {
        x: 1.0,
        y: 0.0,
        z: 0.0,
        dist: fast_right_position_l,
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

//SLOW
var slow_left_position_l = 672;
var slow_right_position_l = 661.5;
var slow_left_position_r = 0;
var slow_right_position_r = 0;
var slow_top_position = 700;
var slow_bottom_position = 200;
var slow_index = "0";
var slow_ficu = 5;

var slow_l_clips = [
    // Left
    {
        x: -1.0,
        y: 0.0,
        z: 0.0,
        dist: slow_left_position_l,
        mode: "inside"
    },
    // Right
    {
        x: 1.0,
        y: 0.0,
        z: 0.0,
        dist: slow_right_position_l,
        mode: "inside"
    },
    // Bottom
    {
        x: 0.0,
        y: -1.0,
        z: 0.0,
        dist: -slow_bottom_position,
        mode: "inside"
    },
    // Top
    {
        x: 0.0,
        y: 1.0,
        z: 0.0,
        dist: slow_top_position,
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
var slow_l_position = {
    positions: [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        -50, 130, 0
    ]
}

var slow_r_clips = [
    // Left
    {
        x: -1.0,
        y: 0.0,
        z: 0.0,
        dist: slow_left_position_l,
        mode: "inside"
    },
    // Right
    {
        x: 1.0,
        y: 0.0,
        z: 0.0,
        dist: slow_right_position_l,
        mode: "inside"
    },
    // Bottom
    {
        x: 0.0,
        y: -1.0,
        z: 0.0,
        dist: -slow_bottom_position,
        mode: "inside"
    },
    // Top
    {
        x: 0.0,
        y: 1.0,
        z: 0.0,
        dist: slow_top_position,
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
var slow_r_position = {
    positions: [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        50, 130, 0
    ]
}


// Define scene
var scene = SceneJS.createScene({
    nodes:[
        {
            type:"cameras/orbit",
            look:{ x: 0, y:200, z: 0 },
            yaw:50,
            pitch:-20,
            maxPitch: -12,
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
                                                            alpha: 0.4,
                                                            nodes: [
                                                                {
                                                                    type: "clips",
                                                                    clips: azimuth_l_clips,
                                                                    nodes:[{
                                                                        type:"geometry/sphere",
                                                                        latudeBands:36,
                                                                        longitudeBands:36,
                                                                        radius:998
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
                                                            alpha: 0.4,
                                                            nodes: [
                                                                {
                                                                    type: "clips",
                                                                    clips: azimuth_l_clips_add,
                                                                    nodes:[{
                                                                        type:"geometry/sphere",
                                                                        latudeBands:36,
                                                                        longitudeBands:36,
                                                                        radius:998
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
                                                            alpha: 0.4,
                                                            nodes: [
                                                                {
                                                                    type: "clips",
                                                                    clips: azimuth_r_clips,
                                                                    nodes:[{
                                                                        type:"geometry/sphere",
                                                                        latudeBands:36,
                                                                        longitudeBands:36,
                                                                        radius:998
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
                                                            alpha: 0.4,
                                                            nodes: [
                                                                {
                                                                    type: "clips",
                                                                    clips: azimuth_r_clips_add,
                                                                    nodes:[{
                                                                        type:"geometry/sphere",
                                                                        latudeBands:36,
                                                                        longitudeBands:36,
                                                                        radius:998
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
                                        {   
                                            type:"layer",
                                            id:"fast_l",
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
                                                            alpha: 0.4,
                                                            nodes: [
                                                                {
                                                                    type: "clips",
                                                                    clips: fast_l_clips,
                                                                    nodes:[{
                                                                        type:"geometry/sphere",
                                                                        latudeBands:36,
                                                                        longitudeBands:36,
                                                                        radius:998
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
                                            id:"fast_l_lines",
                                            enabled: false,
                                            nodes: [
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: fast_l_position.positions,
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
                                            id:"fast_l_add",
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
                                                            alpha: 0.4,
                                                            nodes: [
                                                                {
                                                                    type: "clips",
                                                                    clips: fast_l_clips_add,
                                                                    nodes:[{
                                                                        type:"geometry/sphere",
                                                                        latudeBands:36,
                                                                        longitudeBands:36,
                                                                        radius:998
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
                                            id:"fast_l_add_lines",
                                            enabled: false,
                                            nodes: [
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: fast_l_position.positions,
                                                    indices: [
                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                }
                                            ]
                                        },                                     
                                        //fast_right
                                        {   
                                            type:"layer",
                                            id:"fast_r",
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
                                                            alpha: 0.4,
                                                            nodes: [
                                                                {
                                                                    type: "clips",
                                                                    clips: fast_r_clips,
                                                                    nodes:[{
                                                                        type:"geometry/sphere",
                                                                        latudeBands:36,
                                                                        longitudeBands:36,
                                                                        radius:998
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
                                            id:"fast_r_lines",
                                            enabled: false,
                                            nodes: [
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: fast_r_position.positions,
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
                                            id:"fast_r_add",
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
                                                            alpha: 0.4,
                                                            nodes: [
                                                                {
                                                                    type: "clips",
                                                                    clips: fast_r_clips_add,
                                                                    nodes:[{
                                                                        type:"geometry/sphere",
                                                                        latudeBands:36,
                                                                        longitudeBands:36,
                                                                        radius:998
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
                                            id:"fast_r_add_lines",
                                            enabled: false,
                                            nodes: [
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: fast_r_position.positions,
                                                    indices: [
                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                }
                                            ]
                                        },  
                                        //slow_left
                                        {   
                                            type:"layer",
                                            id:"slow_l",
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
                                                            alpha: 0.4,
                                                            nodes: [
                                                                {
                                                                    type: "clips",
                                                                    clips: slow_l_clips,
                                                                    nodes:[{
                                                                        type:"geometry/sphere",
                                                                        latudeBands:36,
                                                                        longitudeBands:36,
                                                                        radius:998
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
                                            id:"slow_l_lines",
                                            enabled: false,
                                            nodes: [
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: slow_l_position.positions,
                                                    indices: [
                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                }
                                            ]
                                        },                                       
                                        //slow_right
                                        {   
                                            type:"layer",
                                            id:"slow_r",
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
                                                            alpha: 0.4,
                                                            nodes: [
                                                                {
                                                                    type: "clips",
                                                                    clips: slow_r_clips,
                                                                    nodes:[{
                                                                        type:"geometry/sphere",
                                                                        latudeBands:36,
                                                                        longitudeBands:36,
                                                                        radius:998
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
                                            id:"slow_r_lines",
                                            enabled: false,
                                            nodes: [
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: slow_r_position.positions,
                                                    indices: [
                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                }
                                            ]
                                        },                                       
                                        
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
    if(algorithm === 0){
        stop_azimuth();
        azimuth_index = 0;
    }
}

function change_azimuth_ficu(value){
    azimuth_ficu = value;
    stop_azimuth();
    azimuth_index = 0;
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

        if(azimuth_ficu === 0){
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
        else if(azimuth_ficu === 8){
            azimuth_bottom_position = 365;
            azimuth_top_position = 535;
            azimuth_l_clips[2].dist = -azimuth_bottom_position;
            azimuth_l_clips[3].dist = azimuth_top_position;
        }
        else if(azimuth_ficu === 12){
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

        if(azimuth_ficu === 0){
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
        else if(azimuth_ficu === 8){
            azimuth_bottom_position = 365;
            azimuth_top_position = 535;
            azimuth_r_clips[2].dist = -azimuth_bottom_position;
            azimuth_r_clips[3].dist = azimuth_top_position;
        }
        else if(azimuth_ficu === 12){
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
    document.getElementById("azimuth").value = azimuth_index;
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
    azimuth_index = 0;
    document.getElementById("azimuth").value = azimuth_index;
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
    algorithm = 0;
    stop_azimuth();
    stop_fast();
    stop_slow();
    document.getElementById("azimuth_start").disabled = false;
    document.getElementById("azimuth_stop").disabled = false;
    document.getElementById("azimuth").disabled = false;
    document.getElementById("phica0").disabled = false;
    document.getElementById("phica8").disabled = false;
    document.getElementById("phica12").disabled = false;
    document.getElementById("chanel1_3").disabled = false;
    document.getElementById("chanel2_4").disabled = false;
    document.getElementById("fast_start").disabled = true;
    document.getElementById("fast_stop").disabled = true;
    document.getElementById("fast").disabled = true;
    document.getElementById("slow_start").disabled = true;
    document.getElementById("slow_stop").disabled = true;
    document.getElementById("slow").disabled = true;
}

function start_fast() {
    clearInterval(timer);
    timer = setInterval(
        function () {
            fast_index++;
            if(fast_index > 8)  fast_index = 1;
            fast_update(fast_index);            
        }, 1000);
}

function fast_update(fast_index){
    var index = fast_index - 1;
    scene.getNode('fast_l', function (clipsNode){
        clipsNode.setEnabled(true);

        if(index === 0 || index === 4){
            scene.getNode('fast_l_add', function (clipsNode){
                clipsNode.setEnabled(false);
                scene.getNode('fast_l_add_lines',function (clipsNode) {
                    clipsNode.setEnabled(false);
                });
            });
            if(index === 0 ){
                fast_left_position_l = 672; 
                fast_right_position_l = 504;
            }
            else {
                fast_left_position_l = 336; 
                fast_right_position_l = 168;
            }
            fast_bottom_position = 365;
            fast_top_position = 535;
        }
        else if(index === 1 || index === 5){
            scene.getNode('fast_l_add', function (clipsNode){
                clipsNode.setEnabled(false);
                scene.getNode('fast_l_add_lines',function (clipsNode) {
                    clipsNode.setEnabled(false);
                });
            });
            if(index === 1){
                fast_left_position_l = 504; 
                fast_right_position_l = 336;
            }
            else {
                fast_left_position_l = 168; 
                fast_right_position_l = 0;
            }
            fast_bottom_position = 365;
            fast_top_position = 535;
        } 
        else if(index === 2 || index === 6){
            if(index === 2){
                fast_left_position_l = 672; 
                fast_right_position_l = 504;
            }
            else {
                fast_left_position_l = 336; 
                fast_right_position_l = 168;
            }
            fast_bottom_position = 200;
            fast_top_position = 365;
            scene.getNode('fast_l_add', function (clipsNode){
                clipsNode.setEnabled(true);
                fast_l_clips_add[0].dist = fast_left_position_l;        
                fast_l_clips_add[1].dist = -fast_right_position_l;
                clipsNode.nodes[0].nodes[0].nodes[0].setClips(fast_l_clips_add);
                scene.getNode('fast_l_add_lines',function (clipsNode) {
                    clipsNode.setEnabled(true);
                    fast_l_add_position.positions[0] = -fast_left_position_l;
                    fast_l_add_position.positions[1] = 535;
                    fast_l_add_position.positions[2] = -y_value(fast_left_position_l, 535);
            
                    fast_l_add_position.positions[3] = -fast_right_position_l;
                    fast_l_add_position.positions[4] = 535;
                    fast_l_add_position.positions[5] = -y_value(fast_right_position_l, 535);
                
                    fast_l_add_position.positions[6] = -fast_right_position_l;
                    fast_l_add_position.positions[7] = 700;
                    fast_l_add_position.positions[8] = -y_value(fast_right_position_l, 700);
            
                    fast_l_add_position.positions[9] = -fast_left_position_l;
                    fast_l_add_position.positions[10] = 700;
                    fast_l_add_position.positions[11] = -y_value(fast_left_position_l, 700);
            
                    clipsNode.nodes[0].setPositions(fast_l_add_position);
                });
            });
        }
        else if(index === 3 || index === 7){
            if(index === 3){
                fast_left_position_l = 504; 
                fast_right_position_l = 336;
            }
            else {
                fast_left_position_l = 168; 
                fast_right_position_l = 0;
            }
            fast_bottom_position = 200;
            fast_top_position = 365;
            scene.getNode('fast_l_add', function (clipsNode){
                clipsNode.setEnabled(true);
                fast_l_clips_add[0].dist = fast_left_position_l;        
                fast_l_clips_add[1].dist = -fast_right_position_l;
                clipsNode.nodes[0].nodes[0].nodes[0].setClips(fast_l_clips_add);
                scene.getNode('fast_l_add_lines',function (clipsNode) {
                    clipsNode.setEnabled(true);
                    fast_l_add_position.positions[0] = -fast_left_position_l;
                    fast_l_add_position.positions[1] = 535;
                    fast_l_add_position.positions[2] = -y_value(fast_left_position_l, 535);
            
                    fast_l_add_position.positions[3] = -fast_right_position_l;
                    fast_l_add_position.positions[4] = 535;
                    fast_l_add_position.positions[5] = -y_value(fast_right_position_l, 535);
                
                    fast_l_add_position.positions[6] = -fast_right_position_l;
                    fast_l_add_position.positions[7] = 700;
                    fast_l_add_position.positions[8] = -y_value(fast_right_position_l, 700);
            
                    fast_l_add_position.positions[9] = -fast_left_position_l;
                    fast_l_add_position.positions[10] = 700;
                    fast_l_add_position.positions[11] = -y_value(fast_left_position_l, 700);
            
                    clipsNode.nodes[0].setPositions(fast_l_add_position);
                });
            });
        }

        fast_l_clips[0].dist = fast_left_position_l;        //left
        fast_l_clips[1].dist = -fast_right_position_l;      //right
        fast_l_clips[2].dist = -fast_bottom_position;
        fast_l_clips[3].dist = fast_top_position;
        
        clipsNode.nodes[0].nodes[0].nodes[0].setClips(fast_l_clips);
        scene.getNode('fast_l_lines',function (clipsNode) {
            clipsNode.setEnabled(true);
            fast_l_position.positions[0] = -fast_left_position_l;  //left
            fast_l_position.positions[1] = fast_bottom_position;
            fast_l_position.positions[2] = -y_value(fast_left_position_l, fast_bottom_position);

            fast_l_position.positions[3] = -fast_right_position_l;
            fast_l_position.positions[4] = fast_bottom_position;
            fast_l_position.positions[5] = -y_value(fast_right_position_l, fast_bottom_position);
        
            fast_l_position.positions[6] = -fast_right_position_l;
            fast_l_position.positions[7] = fast_top_position;
            fast_l_position.positions[8] = -y_value(fast_right_position_l, fast_top_position);

            fast_l_position.positions[9] = -fast_left_position_l;
            fast_l_position.positions[10] = fast_top_position;
            fast_l_position.positions[11] = -y_value(fast_left_position_l, fast_top_position);

            clipsNode.nodes[0].setPositions(fast_l_position);
        });
    });       
    scene.getNode('fast_r', function (clipsNode){
        clipsNode.setEnabled(true);

        if(index === 0 || index === 4){
            scene.getNode('fast_r_add', function (clipsNode){
                clipsNode.setEnabled(false);
                scene.getNode('fast_r_add_lines',function (clipsNode) {
                    clipsNode.setEnabled(false);
                });
            });
            if(index === 0){
                fast_left_position_r = 0; 
                fast_right_position_r = 168;
            }
            else {
                fast_left_position_r = 336; 
                fast_right_position_r = 504;
            }
            fast_bottom_position = 365;
            fast_top_position = 535;
        }
        else if(index === 1 || index === 5){
            scene.getNode('fast_r_add', function (clipsNode){
                clipsNode.setEnabled(false);
                scene.getNode('fast_r_add_lines',function (clipsNode) {
                    clipsNode.setEnabled(false);
                });
            });
            if(index === 1){
                fast_left_position_r = 168; 
                fast_right_position_r = 336;
            }
            else {
                fast_left_position_r = 504; 
                fast_right_position_r = 672;
            }
            fast_bottom_position = 365;
            fast_top_position = 535;
        } 
        else if(index === 2 || index === 6){
            if(index === 2){
                fast_left_position_r = 0; 
                fast_right_position_r = 168;
            }
            else {
                fast_left_position_r = 336; 
                fast_right_position_r = 504;
            }
            fast_bottom_position = 200;
            fast_top_position = 365;
            scene.getNode('fast_r_add', function (clipsNode){
                clipsNode.setEnabled(true);
                fast_r_clips_add[0].dist = -fast_left_position_r;        
                fast_r_clips_add[1].dist = fast_right_position_r;
                clipsNode.nodes[0].nodes[0].nodes[0].setClips(fast_r_clips_add);
                scene.getNode('fast_r_add_lines',function (clipsNode) {
                    clipsNode.setEnabled(true);
                    fast_r_add_position.positions[0] = fast_left_position_r;
                    fast_r_add_position.positions[1] = 535;
                    fast_r_add_position.positions[2] = -y_value(fast_left_position_r, 535);
            
                    fast_r_add_position.positions[3] = fast_right_position_r;
                    fast_r_add_position.positions[4] = 535;
                    fast_r_add_position.positions[5] = -y_value(fast_right_position_r, 535);
                
                    fast_r_add_position.positions[6] = fast_right_position_r;
                    fast_r_add_position.positions[7] = 700;
                    fast_r_add_position.positions[8] = -y_value(fast_right_position_r, 700);
            
                    fast_r_add_position.positions[9] = fast_left_position_r;
                    fast_r_add_position.positions[10] = 700;
                    fast_r_add_position.positions[11] = -y_value(fast_left_position_r, 700);
            
                    clipsNode.nodes[0].setPositions(fast_r_add_position);
                });
            });
        }
        else if(index === 3 || index === 7){
            if(index === 3){
                fast_left_position_r = 168; 
                fast_right_position_r = 336;
            }
            else {
                fast_left_position_r = 504; 
                fast_right_position_r = 672;
            }
            fast_bottom_position = 200;
            fast_top_position = 365;
            scene.getNode('fast_r_add', function (clipsNode){
                clipsNode.setEnabled(true);
                fast_r_clips_add[0].dist = -fast_left_position_r;        
                fast_r_clips_add[1].dist = fast_right_position_r;
                clipsNode.nodes[0].nodes[0].nodes[0].setClips(fast_r_clips_add);
                scene.getNode('fast_r_add_lines',function (clipsNode) {
                    clipsNode.setEnabled(true);
                    fast_r_add_position.positions[0] = fast_left_position_r;
                    fast_r_add_position.positions[1] = 535;
                    fast_r_add_position.positions[2] = -y_value(fast_left_position_r, 535);
            
                    fast_r_add_position.positions[3] = fast_right_position_r;
                    fast_r_add_position.positions[4] = 535;
                    fast_r_add_position.positions[5] = -y_value(fast_right_position_r, 535);
                
                    fast_r_add_position.positions[6] = fast_right_position_r;
                    fast_r_add_position.positions[7] = 700;
                    fast_r_add_position.positions[8] = -y_value(fast_right_position_r, 700);
            
                    fast_r_add_position.positions[9] = fast_left_position_r;
                    fast_r_add_position.positions[10] = 700;
                    fast_r_add_position.positions[11] = -y_value(fast_left_position_r, 700);
            
                    clipsNode.nodes[0].setPositions(fast_r_add_position);
                });
            });
        }

        fast_r_clips[0].dist = -fast_left_position_r;        //left
        fast_r_clips[1].dist = fast_right_position_r;      //right
        fast_r_clips[2].dist = -fast_bottom_position;
        fast_r_clips[3].dist = fast_top_position;
        
        clipsNode.nodes[0].nodes[0].nodes[0].setClips(fast_r_clips);
        scene.getNode('fast_r_lines',function (clipsNode) {
            clipsNode.setEnabled(true);
            fast_r_position.positions[0] = fast_left_position_r;  //left
            fast_r_position.positions[1] = fast_bottom_position;
            fast_r_position.positions[2] = -y_value(fast_left_position_r, fast_bottom_position);

            fast_r_position.positions[3] = fast_right_position_r;
            fast_r_position.positions[4] = fast_bottom_position;
            fast_r_position.positions[5] = -y_value(fast_right_position_r, fast_bottom_position);
        
            fast_r_position.positions[6] = fast_right_position_r;
            fast_r_position.positions[7] = fast_top_position;
            fast_r_position.positions[8] = -y_value(fast_right_position_r, fast_top_position);

            fast_r_position.positions[9] = fast_left_position_r;
            fast_r_position.positions[10] = fast_top_position;
            fast_r_position.positions[11] = -y_value(fast_left_position_r, fast_top_position);

            clipsNode.nodes[0].setPositions(fast_r_position);
        });
    });       
    document.getElementById("fast").value = fast_index;
}


function stop_fast() {
    clearInterval(timer);
    scene.getNode('fast_l', function (myEnable) {
            myEnable.setEnabled(false);
        }
    );
    scene.getNode('fast_l_add', function (myEnable) {
            myEnable.setEnabled(false);
        }
    );
    scene.getNode('fast_l_lines', function (myEnable) {
            myEnable.setEnabled(false);
        }
    );
    scene.getNode('fast_l_add_lines', function (myEnable) {
            myEnable.setEnabled(false);
        }
    );
    scene.getNode('fast_r', function (myEnable) {
            myEnable.setEnabled(false);
        }
    );
    scene.getNode('fast_r_add', function (myEnable) {
            myEnable.setEnabled(false);
        }
    );
    scene.getNode('fast_r_lines', function (myEnable) {
            myEnable.setEnabled(false);
        }
    );
    scene.getNode('fast_r_add_lines', function (myEnable) {
            myEnable.setEnabled(false);
        }
    );
    fast_index = 0;
    document.getElementById("fast").value = fast_index;
    show_info('stop');
}

function show_fast(value) {
    stop_fast();
    if(value === "0"){
        return;
    }
    fast_index = value;
    fast_update(fast_index);
}

function fast_change() {
    algorithm = 1;
    stop_azimuth();
    stop_fast();
    stop_slow();
    document.getElementById("azimuth_start").disabled = true;
    document.getElementById("azimuth_stop").disabled = true;
    document.getElementById("azimuth").disabled = true;
    document.getElementById("phica0").disabled = true;
    document.getElementById("phica8").disabled = true;
    document.getElementById("phica12").disabled = true;
    document.getElementById("chanel1_3").disabled = true;
    document.getElementById("chanel2_4").disabled = true;
    document.getElementById("fast_start").disabled = false;
    document.getElementById("fast_stop").disabled = false;
    document.getElementById("fast").disabled = false;
    document.getElementById("slow_start").disabled = true;
    document.getElementById("slow_stop").disabled = true;
    document.getElementById("slow").disabled = true;    
}

function start_slow() {
    clearInterval(timer);
    timer = setInterval(
        function () {
            slow_index++;
            if(slow_index > 16)  slow_index = 1;
            slow_update(slow_index);  
        }, 1000);
}

function slow_update(slow_index){
    var index = slow_index - 1;
    scene.getNode('slow_l', function (clipsNode){
        clipsNode.setEnabled(true);
        
        slow_left_position_l = 672 - 42 * index; 
        slow_right_position_l = 630 - 42 * index;

        slow_bottom_position = 440;
        slow_top_position = 610;

        slow_l_clips[0].dist = slow_left_position_l;        //left
        slow_l_clips[1].dist = -slow_right_position_l;      //right
        slow_l_clips[2].dist = -slow_bottom_position;
        slow_l_clips[3].dist = slow_top_position;
        
        clipsNode.nodes[0].nodes[0].nodes[0].setClips(slow_l_clips);
        scene.getNode('slow_l_lines',function (clipsNode) {
            clipsNode.setEnabled(true);
            slow_l_position.positions[0] = -slow_left_position_l;  //left
            slow_l_position.positions[1] = slow_bottom_position;
            slow_l_position.positions[2] = -y_value(slow_left_position_l, slow_bottom_position);

            slow_l_position.positions[3] = -slow_right_position_l;
            slow_l_position.positions[4] = slow_bottom_position;
            slow_l_position.positions[5] = -y_value(slow_right_position_l, slow_bottom_position);
        
            slow_l_position.positions[6] = -slow_right_position_l;
            slow_l_position.positions[7] = slow_top_position;
            slow_l_position.positions[8] = -y_value(slow_right_position_l, slow_top_position);

            slow_l_position.positions[9] = -slow_left_position_l;
            slow_l_position.positions[10] = slow_top_position;
            slow_l_position.positions[11] = -y_value(slow_left_position_l, slow_top_position);

            clipsNode.nodes[0].setPositions(slow_l_position);
        });
    });

    scene.getNode('slow_r', function (clipsNode){
        clipsNode.setEnabled(true);
        
        slow_left_position_r = 0 + 42 * index; 
        slow_right_position_r = 42 + 42 * index;

        slow_bottom_position = 440;
        slow_top_position = 610;

        slow_r_clips[0].dist = -slow_left_position_r;        //left
        slow_r_clips[1].dist = slow_right_position_r;      //right
        slow_r_clips[2].dist = -slow_bottom_position;
        slow_r_clips[3].dist = slow_top_position;
        
        clipsNode.nodes[0].nodes[0].nodes[0].setClips(slow_r_clips);
        scene.getNode('slow_r_lines',function (clipsNode) {
            clipsNode.setEnabled(true);
            slow_r_position.positions[0] = slow_left_position_r;  //left
            slow_r_position.positions[1] = slow_bottom_position;
            slow_r_position.positions[2] = -y_value(slow_left_position_r, slow_bottom_position);

            slow_r_position.positions[3] = slow_right_position_r;
            slow_r_position.positions[4] = slow_bottom_position;
            slow_r_position.positions[5] = -y_value(slow_right_position_r, slow_bottom_position);
        
            slow_r_position.positions[6] = slow_right_position_r;
            slow_r_position.positions[7] = slow_top_position;
            slow_r_position.positions[8] = -y_value(slow_right_position_r, slow_top_position);

            slow_r_position.positions[9] = slow_left_position_r;
            slow_r_position.positions[10] = slow_top_position;
            slow_r_position.positions[11] = -y_value(slow_left_position_r, slow_top_position);

            clipsNode.nodes[0].setPositions(slow_r_position);
        });
    });
    document.getElementById("slow").value = slow_index;
}

function stop_slow() {
    clearInterval(timer);
    scene.getNode('slow_l', function (myEnable) {
            myEnable.setEnabled(false);
        }
    );
    scene.getNode('slow_l_lines', function (myEnable) {
            myEnable.setEnabled(false);
        }
    );
    scene.getNode('slow_r', function (myEnable) {
            myEnable.setEnabled(false);
        }
    );
    scene.getNode('slow_r_lines', function (myEnable) {
            myEnable.setEnabled(false);
        }
    );
    slow_index = 0;
    document.getElementById("slow").value = slow_index;
    show_info('stop');
}

function show_slow(value) {
    stop_slow();
    if(value === "0"){
        return;
    }
    slow_index = value;
    slow_update(slow_index);
}

function slow_change() {
    algorithm = 2;
    stop_azimuth();
    stop_fast();
    stop_slow();
    document.getElementById("azimuth_start").disabled = true;
    document.getElementById("azimuth_stop").disabled = true;
    document.getElementById("azimuth").disabled = true;
    document.getElementById("phica0").disabled = true;
    document.getElementById("phica8").disabled = true;
    document.getElementById("phica12").disabled = true;
    document.getElementById("chanel1_3").disabled = true;
    document.getElementById("chanel2_4").disabled = true;
    document.getElementById("fast_start").disabled = true;
    document.getElementById("fast_stop").disabled = true;
    document.getElementById("fast").disabled = true;
    document.getElementById("slow_start").disabled = false;
    document.getElementById("slow_stop").disabled = false;
    document.getElementById("slow").disabled = false;
}

function show_info (alg){

    // if(alg === "stop"){
    //     document.getElementById("kartin").src = '';
    // }
    // document.getElementById("label_angel").textContent  = str;
}