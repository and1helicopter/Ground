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
                                                    x : 0, y : 1, z : 0, angle : -60,
                                                    nodes:[
                                                        {
                                                            type:"geometry/box",
                                                            xSize: 15,
                                                            ySize: 30,
                                                            zSize: 40
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
                                                    x : 0, y : 1, z : 0, angle : 60,
                                                    nodes:[
                                                        {
                                                            type:"geometry/box",
                                                            xSize: 15,
                                                            ySize: 30,
                                                            zSize: 40
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            type: "translate",
                                            x:0, y:110, z:-20,
                                            nodes: [
                                                {
                                                    type: "rotate",
                                                    x : 0, y : 1, z : 0, angle : 45,
                                                    nodes:[
                                                        {
                                                            type:"geometry/box",
                                                            xSize: 15,
                                                            ySize: 20,
                                                            zSize: 15
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
            azimuth_left_position_r = 10.5 * index;
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
    document.getElementById("azimuth").value = chanel ? azimuth_index : azimuth_index + 32;
    show_info("azimuth");
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
    
    if(value > 32){ 
        chanel_change(false);
        azimuth_index = value - 32;
        document.getElementById("chanel2_4").checked = false;   
        document.getElementById("chanel1_3").checked = true;             
    }
    else{
        chanel_change(true);
        azimuth_index = value;
        document.getElementById("chanel2_4").checked = true;   
        document.getElementById("chanel1_3").checked = false;        
    }

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
    show_info("fast");
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
        
        slow_left_position_r = 42 * index;
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
    show_info("slow");
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

function show_info(alg){
    var str = '';
    if(alg === "azimuth"){
        if(chanel){
            str = String((azimuth_index - 1) * 8) + '-' + String(azimuth_index * 8);
        }
        else {
            str = String(256 + (azimuth_index - 1) * 8) + '-' + String(256 + azimuth_index * 8);
        }
        if(azimuth_index === 1 || azimuth_index === "1") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_01_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_01_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_01_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_01.jpg';
        }
        else if(azimuth_index === 2 || azimuth_index === "2") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_02_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_02_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_02_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_02.jpg';
        }
        else if(azimuth_index === 3 || azimuth_index === "3") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_03_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_03_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_03_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_03.jpg';
        }
        else if(azimuth_index === 4 || azimuth_index === "4") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_04_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_04_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_04_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_04.jpg';
        }
        else if(azimuth_index === 5 || azimuth_index === "5") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_05_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_05_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_05_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_05.jpg';
        }
        else if(azimuth_index === 6 || azimuth_index === "6") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_06_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_06_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_06_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_06.jpg';
        }
        else if(azimuth_index === 7 || azimuth_index === "7") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_07_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_07_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_07_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_07.jpg';
        }
        else if(azimuth_index === 8 || azimuth_index === "8") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_08_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_08_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_08_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_08.jpg';
        }
        else if(azimuth_index === 9 || azimuth_index === "9") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_09_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_09_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_09_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_09.jpg';
        }
        else if(azimuth_index === 10 || azimuth_index === "10") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_10_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_10_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_10_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_10.jpg';
        }
        else if(azimuth_index === 11 || azimuth_index === "11") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_11_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_11_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_11_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_11.jpg';
        }
        else if(azimuth_index === 12 || azimuth_index === "12") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_12_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_12_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_12_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_12.jpg';
        }
        else if(azimuth_index === 13 || azimuth_index === "13") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_13_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_13_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_13_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_13.jpg';
        }
        else if(azimuth_index === 14 || azimuth_index === "14") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_14_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_14_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_14_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_14.jpg';
        }
        else if(azimuth_index === 15 || azimuth_index === "15") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_15_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_15_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_15_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_15.jpg';
        }
        else if(azimuth_index === 16 || azimuth_index === "16") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_16_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_16_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_16_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_16.jpg';
        }
        else if(azimuth_index === 17 || azimuth_index === "17") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_17_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_17_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_17_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_17.jpg';
        }
        else if(azimuth_index === 18 || azimuth_index === "18") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_18_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_18_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_18_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_18.jpg';
        }
        else if(azimuth_index === 19 || azimuth_index === "19") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_19_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_19_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_19_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_19.jpg';
        }
        else if(azimuth_index === 20 || azimuth_index === "20") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_20_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_20_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_20_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_20.jpg';
        }
        else if(azimuth_index === 21 || azimuth_index === "21") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_21_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_21_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_21_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_21.jpg';
        }
        else if(azimuth_index === 22 || azimuth_index === "22") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_22_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_22_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_22_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_22.jpg';
        }
        else if(azimuth_index === 23 || azimuth_index === "23") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_23_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_23_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_23_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_23.jpg';
        }
        else if(azimuth_index === 24 || azimuth_index === "24") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_24_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_24_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_24_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_24.jpg';
        }
        else if(azimuth_index === 25 || azimuth_index === "25") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_25_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_25_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_25_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_25.jpg';
        }
        else if(azimuth_index === 26 || azimuth_index === "26") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_26_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_26_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_26_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_26.jpg';
        }
        else if(azimuth_index === 27 || azimuth_index === "27") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_27_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_27_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_27_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_27.jpg';
        }
        else if(azimuth_index === 28 || azimuth_index === "28") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_28_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_28_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_28_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_28.jpg';
        }
        else if(azimuth_index === 29 || azimuth_index === "29") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_29_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_29_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_29_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_29.jpg';
        }
        else if(azimuth_index === 30 || azimuth_index === "30") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_30_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_30_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_30_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_30.jpg';
        }
        else if(azimuth_index === 31 || azimuth_index === "31") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_31_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_31_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_31_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_31.jpg';
        }
        else if(azimuth_index === 32 || azimuth_index === "32") {
            if(azimuth_ficu === 0){
                document.getElementById("_zone").src = 'img/azimuth/zone_32_00.jpg';
            }
            else if(azimuth_ficu === 8){
                document.getElementById("_zone").src = 'img/azimuth/zone_32_08.jpg';
            }
            else {
                document.getElementById("_zone").src = 'img/azimuth/zone_32_12.jpg';
            }
            document.getElementById("_azimuth").src = 'img/azimuth/azimuth_32.jpg';
        }

        if(azimuth_ficu === 0){
            document.getElementById("_angel").src = 'img/azimuth/angel_02.jpg';
        }
        else if(azimuth_ficu === 8){
            document.getElementById("_angel").src = 'img/azimuth/angel_04.jpg';
        }
        else if(azimuth_ficu === 12){
            document.getElementById("_angel").src = 'img/azimuth/angel_05.jpg';
        }

        document.getElementById("label_info").textContent = chanel ? 'Сектор 2-4' : 'Сектор 1-3';

    }
    else if(alg === "fast"){
        if(fast_index.toString() === "1" || fast_index.toString() === "3"){
            str = String(0) + '-' + String(128);
        }
        else  if(fast_index.toString() === "2" || fast_index.toString() === "4"){
            str = String(128) + '-' + String(256);
        }
        else  if(fast_index.toString() === "5" || fast_index.toString() === "7"){
            str = String(256) + '-' + String(384);
        }
        else  if(fast_index.toString() === "6" || fast_index.toString() === "8"){
            str = String(384) + '-' + String(512);
        }

        if(fast_index.toString() === "1" || fast_index.toString() === "5"){
            document.getElementById("_zone").src = 'img/fast/zone_01.jpg';
            document.getElementById("_azimuth").src = 'img/fast/azimuth_01.jpg';
            document.getElementById("_angel").src = 'img/fast/angel_04.jpg';
        }
        else if(fast_index.toString() === "2" || fast_index.toString() === "6"){
            document.getElementById("_zone").src = 'img/fast/zone_02.jpg';
            document.getElementById("_azimuth").src = 'img/fast/azimuth_02.jpg';
            document.getElementById("_angel").src = 'img/fast/angel_04.jpg';
        }
        else if(fast_index.toString() === "3" || fast_index.toString() === "7"){
            document.getElementById("_zone").src = 'img/fast/zone_03.jpg';
            document.getElementById("_azimuth").src = 'img/fast/azimuth_01.jpg';
            document.getElementById("_angel").src = 'img/fast/angel_02.jpg';
        }
        else if(fast_index.toString() === "4" || fast_index.toString() === "8"){
            document.getElementById("_zone").src = 'img/fast/zone_04.jpg';
            document.getElementById("_azimuth").src = 'img/fast/azimuth_02.jpg';
            document.getElementById("_angel").src = 'img/fast/angel_02.jpg';
        }

        document.getElementById("label_info").textContent = fast_index < 5 ? 'Сектор 2-4' : 'Сектор 1-3';
    }
    else if(alg === "slow"){
        str = String((slow_index - 1) * 32) + '-' + String(slow_index * 32);

        if(slow_index.toString() === "1" || slow_index.toString() === "9"){
            document.getElementById("_zone").src = 'img/slow/zone_01.jpg';
            document.getElementById("_azimuth").src = 'img/slow/azimuth_01.jpg';
        }
        else if(slow_index.toString() === "2" || slow_index.toString() === "10"){
            document.getElementById("_zone").src = 'img/slow/zone_02.jpg';
            document.getElementById("_azimuth").src = 'img/slow/azimuth_02.jpg';
        }
        else if(slow_index.toString() === "3" || slow_index.toString() === "11"){
            document.getElementById("_zone").src = 'img/slow/zone_03.jpg';
            document.getElementById("_azimuth").src = 'img/slow/azimuth_03.jpg';
        }
        else if(slow_index.toString() === "4" || slow_index.toString() === "12"){
            document.getElementById("_zone").src = 'img/slow/zone_04.jpg';
            document.getElementById("_azimuth").src = 'img/slow/azimuth_04.jpg';
        }
        else if(slow_index.toString() === "5" || slow_index.toString() === "13"){
            document.getElementById("_zone").src = 'img/slow/zone_05.jpg';
            document.getElementById("_azimuth").src = 'img/slow/azimuth_05.jpg';
        }
        else if(slow_index.toString() === "6" || slow_index.toString() === "14"){
            document.getElementById("_zone").src = 'img/slow/zone_06.jpg';
            document.getElementById("_azimuth").src = 'img/slow/azimuth_06.jpg';
        }
        else if(slow_index.toString() === "7" || slow_index.toString() === "15"){
            document.getElementById("_zone").src = 'img/slow/zone_07.jpg';
            document.getElementById("_azimuth").src = 'img/slow/azimuth_07.jpg';
        }
        else if(slow_index.toString() === "8" || slow_index.toString() === "16"){
            document.getElementById("_zone").src = 'img/slow/zone_08.jpg';
            document.getElementById("_azimuth").src = 'img/slow/azimuth_08.jpg';
        }

        document.getElementById("label_info").textContent = slow_index < 9 ? 'Сектор 2-4' : 'Сектор 1-3';
        document.getElementById("_angel").src = 'img/slow/angel_05.jpg';
    }
    else if(alg === "stop"){
        document.getElementById("_azimuth").src = '';
        document.getElementById("_angel").src = '';
        document.getElementById("_zone").src = '';
        document.getElementById("label_info").textContent = '';        
    }
    document.getElementById("label_angel").textContent  = str;
}

function exit() {
    window.top.close();
}

function info() {
    window.open("./info.html")
}

function info_close() {
    this.top.close();
}