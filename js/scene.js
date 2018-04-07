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

var azimuth_left_position_l = 672;
var azimuth_right_position_l = 661.5;
var azimuth_left_position_r = 0;
var azimuth_right_position_r = 0;
var azimuth_top_position = 700;
var azimuth_bottom_position = 200;
var ficu = 0;

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
//                                 {
//                                     type: "flags",
//                                     flags: {
//                                         transparent: true
// //                                          solid: true
//                                     },
//                                     nodes: [
//                                         {
//                                             type: "material",
//                                             color: {r: 0.6, g: 0.6, b: 0.9},
//                                             alpha: 0.5,
//                                             nodes: [
//                                                 {
//                                                     type: "translate",
//                                                     x: 0, y: 130, z: 0,
//
//                                                     nodes: [
//                                                         {
//                                                             type: "rotate",
//                                                             x : 0, y : 1, z : 0, angle : 180,
//                                                             nodes: [
//                                                                 {
//                                                                     type: "rotate",
//                                                                     x : 1, y : 0, z : 0, angle : 67.5,
//                                                                     nodes: [
//                                                                         {
//                                                                             type:"scale",
//                                                                             x:1.00, y:1.00, z: 0.20,
//                                                                             nodes:[
//                                                                                 {
//                                                                                     type: "geometry/torus",
//                                                                                     radius: 475.0,
//                                                                                     tube: 475.0,
//                                                                                     segmentsR: 36,
//                                                                                     segmentsT: 360,
//                                                                                     arc: Math.PI
//                                                                                 }
//                                                                             ]
//                                                                         }
//                                                                     ]
//                                                                 }
//                                                             ]
//                                                         }
//                                                     ]
//                                                 }
//                                             ]
//                                         }
//                                     ]
//                                 },
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
                                                                            latudeBands:20,
                                                                            longitudeBands:30,
                                                                            radius:1000
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                // {
                                                //     type: "material",
                                                //     color: { r: 0.2, g: 0.4, b: 0.8 },
                                                //     alpha: 0.2,
                                                //     nodes: [{
                                                //         type: "geometry",
                                                //         primitive: "triangles",
                                                //         positions: [
                                                //             -850, 200, -500,
                                                //             -850, 700, -500,
                                                //             -820, 200, -545,
                                                //             -820, 700, -545,
                                                //             -780, 200, -590,
                                                //             -780, 700, -590,
                                                //             -740, 200, -635,
                                                //             -740, 700, -635,
                                                //             -695, 200, -680,
                                                //             -695, 700, -680,
                                                //             -645, 200, -725,
                                                //             -645, 700, -725,
                                                //             -580, 200, -770,
                                                //             -580, 700, -770,
                                                //             -510, 200, -810,
                                                //             -510, 700, -810,
                                                //             -400, 200, -860,
                                                //             -400, 700, -860,
                                                //             -240, 200, -905,
                                                //             -240, 700, -905,
                                                //             -0, 200, -925,
                                                //             -0, 700, -925,
                                                //         ],
                                                //         indices:[
                                                //             0, 1, 2, 1, 2, 3,
                                                //             2, 3, 4, 3, 4, 5,
                                                //             4, 5, 6, 5, 6, 7,
                                                //             6, 7, 8, 7, 8, 9,
                                                //             8, 9, 10, 9, 10, 11,
                                                //             10, 11, 12, 11, 12, 13,
                                                //             12, 13, 14, 13, 14, 15,
                                                //             14, 15, 16, 15, 16, 17,
                                                //             16, 17, 18, 17, 18, 19,
                                                //             18, 19, 20, 19, 20, 21,
                                                //         ]
                                                //     }]
                                                // },
                                                // {
                                                //     type: "material",
                                                //     color: { r: 0.2, g: 0.4, b: 0.8 },
                                                //     alpha: 0.2,
                                                //     nodes: [{
                                                //         type: "geometry",
                                                //         primitive: "triangles",
                                                //         positions: [
                                                //             850, 200, -500,
                                                //             850, 700, -500,
                                                //             820, 200, -545,
                                                //             820, 700, -545,
                                                //             780, 200, -590,
                                                //             780, 700, -590,
                                                //             740, 200, -635,
                                                //             740, 700, -635,
                                                //             695, 200, -680,
                                                //             695, 700, -680,
                                                //             645, 200, -725,
                                                //             645, 700, -725,
                                                //             580, 200, -770,
                                                //             580, 700, -770,
                                                //             510, 200, -810,
                                                //             510, 700, -810,
                                                //             400, 200, -860,
                                                //             400, 700, -860,
                                                //             240, 200, -905,
                                                //             240, 700, -905,
                                                //             0, 200, -925,
                                                //             0, 700, -925,
                                                //         ],
                                                //         indices:[
                                                //             0, 1, 2, 1, 2, 3,
                                                //             2, 3, 4, 3, 4, 5,
                                                //             4, 5, 6, 5, 6, 7,
                                                //             6, 7, 8, 7, 8, 9,
                                                //             8, 9, 10, 9, 10, 11,
                                                //             10, 11, 12, 11, 12, 13,
                                                //             12, 13, 14, 13, 14, 15,
                                                //             14, 15, 16, 15, 16, 17,
                                                //             16, 17, 18, 17, 18, 19,
                                                //             18, 19, 20, 19, 20, 21,
                                                //         ]
                                                //     }]
                                                // },
                                            ]
                                        },
                                        //Left
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
                                                                        latudeBands:20,
                                                                        longitudeBands:30,
                                                                        radius:975
                                                                    }] 
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        // {
                                        //     type:"layer",
                                        //     id:"azimuth_l",
                                        //     enabled: true,
                                        //     nodes: [
                                        //         {
                                        //             type: "flags",
                                        //             flags: {
                                        //                 transparent: true,
                                        //                 solid: false
                                        //             },
                                        //             nodes: [
                                        //                 { 
                                        //                 type: "material",
                                        //                 color: {r: 0.8, g: 0.2, b: 0.2},
                                        //                 alpha: 0.3,
                           
                                        //                     nodes:[{
                                        //                         type: "rotate",
                                        //                         // id:"myRotate",
                                        //                         x : 0, y : 1, z : 0, angle : -45,
                                        //                         spin: 0.1,
                                        //                         nodes: [
                                        //                             {
                                        //                                 type: "clips",
                                        //                                 clips: [
                                        //                                     //Right
                                        //                                     {
                                        //                                         x: 1.0,
                                        //                                         y: 0.0,
                                        //                                         z: 0.0,
                                        //                                         dist: 0.0,
                                        //                                         mode: "inside"
                                        //                                     },
                                        //                                     // Left
                                        //                                     {
                                        //                                         x: -1.0,
                                        //                                         y: 0.0,
                                        //                                         z: 0.0,
                                        //                                         dist: 100.0,
                                        //                                         mode: "inside"
                                        //                                     }
                                        //                                 ],
                                        //                                 nodes:[{
                                        //                                     type:"geometry/sphere",
                                        //                                     latudeBands:20,
                                        //                                     longitudeBands:30,
                                        //                                     radius:995
                                        //                                 }] 
                                        //                             }
                                        //                         ]
                                        //                     }] 
                                        //                 }
                                        //             ] 
                                        //         }
                                        //     ]
                                        // },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_64",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -15.9, 200, -921,
                                                        0, 200, -925,
                                                        0, 700, -925,
                                                        -15.9, 700, -921,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -15.9, 200, -921,
                                                                0, 200, -925,
                                                                0, 700, -925,
                                                                -15.9, 700, -921
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_63",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -31.8, 200, -917,
                                                        -15.9, 200, -921,
                                                        -15.9, 700, -921,
                                                        -31.8, 700, -917,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -31.8, 200, -917,
                                                                -15.9, 200, -921,
                                                                -15.9, 700, -921,
                                                                -31.8, 700, -917
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_62",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -47.7, 200, -913,
                                                        -31.8, 200, -917,
                                                        -31.8, 700, -917,
                                                        -47.7, 700, -913,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -47.7, 200, -913,
                                                                -31.8, 200, -917,
                                                                -31.8, 700, -917,
                                                                -47.7, 700, -913
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_61",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -63.7, 200, -909,
                                                        -47.7, 200, -913,
                                                        -47.7, 700, -913,
                                                        -63.7, 700, -909,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -63.7, 200, -909,
                                                                -47.7, 200, -913,
                                                                -47.7, 700, -913,
                                                                -63.7, 700, -909
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_60",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -79.7, 200, -905,
                                                        -63.7, 200, -909,
                                                        -63.7, 700, -909,
                                                        -79.7, 700, -905,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -79.7, 200, -905,
                                                                -63.7, 200, -909,
                                                                -63.7, 700, -909,
                                                                -79.7, 700, -905
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_59",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -95.6, 200, -901,
                                                        -79.7, 200, -905,
                                                        -79.7, 700, -905,
                                                        -95.6, 700, -901,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -95.6, 200, -901,
                                                                -79.7, 200, -905,
                                                                -79.7, 700, -905,
                                                                -95.6, 700, -901
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_58",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -111.6, 200, -897,
                                                        -95.6, 200, -901,
                                                        -95.6, 700, -901,
                                                        -111.6, 700, -897,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -111.6, 200, -897,
                                                                -95.6, 200, -901,
                                                                -95.6, 700, -901,
                                                                -111.6, 700, -897
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_57",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -127.5, 200, -893,
                                                        -111.6, 200, -897,
                                                        -111.6, 700, -897,
                                                        -127.5, 700, -893,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -127.5, 200, -893,
                                                                -111.6, 200, -897,
                                                                -111.6, 700, -897,
                                                                -127.5, 700, -893
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_56",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -143.4, 200, -889,
                                                        -127.5, 200, -893,
                                                        -127.5, 700, -893,
                                                        -143.4, 700, -889,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -143.4, 200, -889,
                                                                -127.5, 200, -893,
                                                                -127.5, 700, -893,
                                                                -143.4, 700, -889
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_55",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -159.4, 200, -885,
                                                        -143.4, 200, -889,
                                                        -143.4, 700, -889,
                                                        -159.4, 700, -885,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -159.4, 200, -885,
                                                                -143.4, 200, -889,
                                                                -143.4, 700, -889,
                                                                -159.4, 700, -885
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_54",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -175.3, 200, -881,
                                                        -159.4, 200, -885,
                                                        -159.4, 700, -885,
                                                        -175.3, 700, -881,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -175.3, 200, -881,
                                                                -159.4, 200, -885,
                                                                -159.4, 700, -885,
                                                                -175.3, 700, -881
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_53",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -191.2, 200, -877,
                                                        -175.3, 200, -881,
                                                        -175.3, 700, -881,
                                                        -191.2, 700, -877,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -191.2, 200, -877,
                                                                -175.3, 200, -881,
                                                                -175.3, 700, -881,
                                                                -191.2, 700, -877
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_52",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -207.2, 200, -873,
                                                        -191.2, 200, -877,
                                                        -191.2, 700, -877,
                                                        -207.2, 700, -873,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -207.2, 200, -873,
                                                                -191.2, 200, -877,
                                                                -191.2, 700, -877,
                                                                -207.2, 700, -873
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_51",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -223.1, 200, -869,
                                                        -207.2, 200, -873,
                                                        -207.2, 700, -873,
                                                        -223.1, 700, -869,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -223.1, 200, -869,
                                                                -207.2, 200, -873,
                                                                -207.2, 700, -873,
                                                                -223.1, 700, -869
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_50",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -239.1, 200, -865,
                                                        -223.1, 200, -869,
                                                        -223.1, 700, -869,
                                                        -239.1, 700, -865,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -239.1, 200, -865,
                                                                -223.1, 200, -869,
                                                                -223.1, 700, -869,
                                                                -239.1, 700, -865
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_49",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -255, 200, -861,
                                                        -239.1, 200, -865,
                                                        -239.1, 700, -865,
                                                        -255, 700, -861,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -255, 200, -861,
                                                                -239.1, 200, -865,
                                                                -239.1, 700, -865,
                                                                -255, 700, -861
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_48",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -270.1, 200, -857,
                                                        -255, 200, -861,
                                                        -255, 700, -861,
                                                        -270.1, 700, -857,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -270.1, 200, -857,
                                                                -255, 200, -861,
                                                                -255, 700, -861,
                                                                -270.1, 700, -857
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_47",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -286.9, 200, -853,
                                                        -270.1, 200, -857,
                                                        -270.1, 700, -857,
                                                        -286.9, 700, -853,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -286.9, 200, -853,
                                                                -270.1, 200, -857,
                                                                -270.1, 700, -857,
                                                                -286.9, 700, -853
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_46",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -302.8, 200, -849,
                                                        -286.9, 200, -853,
                                                        -286.9, 700, -853,
                                                        -302.8, 700, -849,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -302.8, 200, -849,
                                                                -286.9, 200, -853,
                                                                -286.9, 700, -853,
                                                                -302.8, 700, -849
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_45",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -318.8, 200, -845,
                                                        -302.8, 200, -849,
                                                        -302.8, 700, -849,
                                                        -318.8, 700, -845,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -318.8, 200, -845,
                                                                -302.8, 200, -849,
                                                                -302.8, 700, -849,
                                                                -318.8, 700, -845
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_44",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -334.7, 200, -841,
                                                        -318.8, 200, -845,
                                                        -318.8, 700, -845,
                                                        -334.7, 700, -841,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -334.7, 200, -841,
                                                                -318.8, 200, -845,
                                                                -318.8, 700, -845,
                                                                -334.7, 700, -841
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_43",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -350.6, 200, -837,
                                                        -334.7, 200, -841,
                                                        -334.7, 700, -841,
                                                        -350.6, 700, -837,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -350.6, 200, -837,
                                                                -334.7, 200, -841,
                                                                -334.7, 700, -841,
                                                                -350.6, 700, -837
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_42",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -366.6, 200, -833,
                                                        -350.6, 200, -837,
                                                        -350.6, 700, -837,
                                                        -366.6, 700, -833,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -366.6, 200, -833,
                                                                -350.6, 200, -837,
                                                                -350.6, 700, -837,
                                                                -366.6, 700, -833
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_41",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -382.5, 200, -829,
                                                        -366.6, 200, -833,
                                                        -366.6, 700, -833,
                                                        -382.5, 700, -829,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -382.5, 200, -829,
                                                                -366.6, 200, -833,
                                                                -366.6, 700, -833,
                                                                -382.5, 700, -829
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_40",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -398.5, 200, -825,
                                                        -382.5, 200, -829,
                                                        -382.5, 700, -829,
                                                        -398.5, 700, -825,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -398.5, 200, -825,
                                                                -382.5, 200, -829,
                                                                -382.5, 700, -829,
                                                                -398.5, 700, -825
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_39",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -414.4, 200, -821,
                                                        -398.5, 200, -825,
                                                        -398.5, 700, -825,
                                                        -414.4, 700, -821,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -414.4, 200, -821,
                                                                -398.5, 200, -825,
                                                                -398.5, 700, -825,
                                                                -414.4, 700, -821
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_38",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -430.3, 200, -817,
                                                        -414.4, 200, -821,
                                                        -414.4, 700, -821,
                                                        -430.3, 700, -817,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -430.3, 200, -817,
                                                                -414.4, 200, -821,
                                                                -414.4, 700, -821,
                                                                -430.3, 700, -817
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_37",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -446.3, 200, -813,
                                                        -430.3, 200, -817,
                                                        -430.3, 700, -817,
                                                        -446.3, 700, -813,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -446.3, 200, -813,
                                                                -430.3, 200, -817,
                                                                -430.3, 700, -817,
                                                                -446.3, 700, -813
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_36",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -462.2, 200, -809,
                                                        -446.3, 200, -813,
                                                        -446.3, 700, -813,
                                                        -462.2, 700, -809,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -462.2, 200, -809,
                                                                -446.3, 200, -813,
                                                                -446.3, 700, -813,
                                                                -462.2, 700, -809
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_35",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -478.2, 200, -805,
                                                        -462.2, 200, -809,
                                                        -462.2, 700, -809,
                                                        -478.2, 700, -805,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -478.2, 200, -805,
                                                                -462.2, 200, -809,
                                                                -462.2, 700, -809,
                                                                -478.2, 700, -805
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_34",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -494.1, 200, -801,
                                                        -478.2, 200, -805,
                                                        -478.2, 700, -805,
                                                        -494.1, 700, -801,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -494.1, 200, -801,
                                                                -478.2, 200, -805,
                                                                -478.2, 700, -805,
                                                                -494.1, 700, -801
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_33",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -510, 200, -797.5,
                                                        -494.1, 200, -801,
                                                        -494.1, 700, -801,
                                                        -510, 700, -797.5,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -510, 200, -797.5,
                                                                -494.1, 200, -801,
                                                                -494.1, 700, -801,
                                                                -510, 700, -797.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_32",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -520.6, 200, -788.2,
                                                        -510, 200, -797.5,
                                                        -510, 700, -797.5,
                                                        -520.6, 700, -788.2,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -520.6, 200, -788.2,
                                                                -510, 200, -797.5,
                                                                -510, 700, -797.5,
                                                                -520.6, 700, -788.2
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_31",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -531.3, 200, -778.9,
                                                        -520.6, 200, -788.2,
                                                        -520.6, 700, -788.2,
                                                        -531.3, 700, -778.9,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -531.3, 200, -778.9,
                                                                -520.6, 200, -788.2,
                                                                -520.6, 700, -788.2,
                                                                -531.3, 700, -778.9
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_30",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -541.9, 200, -769.6,
                                                        -531.3, 200, -778.9,
                                                        -531.3, 700, -778.9,
                                                        -541.9, 700, -769.6,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -541.9, 200, -769.6,
                                                                -531.3, 200, -778.9,
                                                                -531.3, 700, -778.9,
                                                                -541.9, 700, -769.6
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_29",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -552.5, 200, -760.3,
                                                        -541.9, 200, -769.6,
                                                        -541.9, 700, -769.6,
                                                        -552.5, 700, -760.3,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -552.5, 200, -760.3,
                                                                -541.9, 200, -769.6,
                                                                -541.9, 700, -769.6,
                                                                -552.5, 700, -760.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_28",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -563.1, 200, -751.1,
                                                        -552.5, 200, -760.3,
                                                        -552.5, 700, -760.3,
                                                        -563.1, 700, -751.1,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -563.1, 200, -751.1,
                                                                -552.5, 200, -760.3,
                                                                -552.5, 700, -760.3,
                                                                -563.1, 700, -751.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_27",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -573.8, 200, -741.7,
                                                        -563.1, 200, -751.1,
                                                        -563.1, 700, -751.1,
                                                        -573.8, 700, -741.7,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -573.8, 200, -741.7,
                                                                -563.1, 200, -751.1,
                                                                -563.1, 700, -751.1,
                                                                -573.8, 700, -741.7
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_26",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -584.4, 200, -732.4,
                                                        -573.8, 200, -741.7,
                                                        -573.8, 700, -741.7,
                                                        -584.4, 700, -732.4,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -584.4, 200, -732.4,
                                                                -573.8, 200, -741.7,
                                                                -573.8, 700, -741.7,
                                                                -584.4, 700, -732.4
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_25",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -595, 200, -723.1,
                                                        -584.4, 200, -732.4,
                                                        -584.4, 700, -732.4,
                                                        -595, 700, -723.1,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -595, 200, -723.1,
                                                                -584.4, 200, -732.4,
                                                                -584.4, 700, -732.4,
                                                                -595, 700, -723.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_24",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -605.6, 200, -713.8,
                                                        -595, 200, -723.1,
                                                        -595, 700, -723.1,
                                                        -605.6, 700, -713.8,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -605.6, 200, -713.8,
                                                                -595, 200, -723.1,
                                                                -595, 700, -723.1,
                                                                -605.6, 700, -713.8
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_23",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -616.2, 200, -704.5,
                                                        -605.6, 200, -713.8,
                                                        -605.6, 700, -713.8,
                                                        -616.2, 700, -704.5,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -616.2, 200, -704.5,
                                                                -605.6, 200, -713.8,
                                                                -605.6, 700, -713.8,
                                                                -616.2, 700, -704.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_22",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -626.9, 200, -695.2,
                                                        -616.2, 200, -704.5,
                                                        -616.2, 700, -704.5,
                                                        -626.9, 700, -695.2,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -626.9, 200, -695.2,
                                                                -616.2, 200, -704.5,
                                                                -616.2, 700, -704.5,
                                                                -626.9, 700, -695.2
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_21",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -637.5, 200, -685.9,
                                                        -626.9, 200, -695.2,
                                                        -626.9, 700, -695.2,
                                                        -637.5, 700, -685.9,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -637.5, 200, -685.9,
                                                                -626.9, 200, -695.2,
                                                                -626.9, 700, -695.2,
                                                                -637.5, 700, -685.9
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_20",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -648.1, 200, -676.6,
                                                        -637.5, 200, -685.9,
                                                        -637.5, 700, -685.9,
                                                        -648.1, 700, -676.6,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -648.1, 200, -676.6,
                                                                -637.5, 200, -685.9,
                                                                -637.5, 700, -685.9,
                                                                -648.1, 700, -676.6
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_19",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -658.8, 200, -667.3,
                                                        -648.1, 200, -676.6,
                                                        -648.1, 700, -676.6,
                                                        -658.8, 700, -667.3,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -658.8, 200, -667.3,
                                                                -648.1, 200, -676.6,
                                                                -648.1, 700, -676.6,
                                                                -658.8, 700, -667.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_18",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -669.4, 200, -658.0,
                                                        -658.8, 200, -667.3,
                                                        -658.8, 700, -667.3,
                                                        -669.4, 700, -658.0,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -669.4, 200, -658.0,
                                                                -658.8, 200, -667.3,
                                                                -658.8, 700, -667.3,
                                                                -669.4, 700, -658.0
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_17",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -680, 200, -648.8,
                                                        -669.4, 200, -658.0,
                                                        -669.4, 700, -658.0,
                                                        -680, 700, -648.8,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -680, 200, -648.8,
                                                                -669.4, 200, -658.0,
                                                                -669.4, 700, -658.0,
                                                                -680, 700, -648.8
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_16",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -690.6, 200, -639.5,
                                                        -680, 200, -648.8,
                                                        -680, 700, -648.8,
                                                        -690.6, 700, -639.5,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -690.6, 200, -639.5,
                                                                -680, 200, -648.8,
                                                                -680, 700, -648.8,
                                                                -690.6, 700, -639.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_15",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -701.3, 200, -630.2,
                                                        -690.6, 200, -639.5,
                                                        -690.6, 700, -639.5,
                                                        -701.3, 700, -630.2,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -701.3, 200, -630.2,
                                                                -690.6, 200, -639.5,
                                                                -690.6, 700, -639.5,
                                                                -701.3, 700, -630.2
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_14",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -711.9, 200, -620.9,
                                                        -701.3, 200, -630.2,
                                                        -701.3, 700, -630.2,
                                                        -711.9, 700, -620.9,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -711.9, 200, -620.9,
                                                                -701.3, 200, -630.2,
                                                                -701.3, 700, -630.2,
                                                                -711.9, 700, -620.9
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_13",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -722.5, 200, -611.6,
                                                        -711.9, 200, -620.9,
                                                        -711.9, 700, -620.9,
                                                        -722.5, 700, -611.6,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -722.5, 200, -611.6,
                                                                -711.9, 200, -620.9,
                                                                -711.9, 700, -620.9,
                                                                -722.5, 700, -611.6
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_12",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -733.1, 200, -602.3,
                                                        -722.5, 200, -611.6,
                                                        -722.5, 700, -611.6,
                                                        -733.1, 700, -602.3,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -733.1, 200, -602.3,
                                                                -722.5, 200, -611.6,
                                                                -722.5, 700, -611.6,
                                                                -733.1, 700, -602.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_11",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -743.8, 200, -592.9,
                                                        -733.1, 200, -602.3,
                                                        -733.1, 700, -602.3,
                                                        -743.8, 700, -592.9,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -743.8, 200, -592.9,
                                                                -733.1, 200, -602.3,
                                                                -733.1, 700, -602.3,
                                                                -743.8, 700, -592.9
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_10",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -754.4, 200, -583.7,
                                                        -743.8, 200, -592.9,
                                                        -743.8, 700, -592.9,
                                                        -754.4, 700, -583.7,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -754.4, 200, -583.7,
                                                                -743.8, 200, -592.9,
                                                                -743.8, 700, -592.9,
                                                                -754.4, 700, -583.7
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_09",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -765, 200, -574.4,
                                                        -754.4, 200, -583.7,
                                                        -754.4, 700, -583.7,
                                                        -765, 700, -574.4,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -765, 200, -574.4,
                                                                -754.4, 200, -583.7,
                                                                -754.4, 700, -583.7,
                                                                -765, 700, -574.4
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_08",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -775.6, 200, -565.1,
                                                        -765, 200, -574.4,
                                                        -765, 700, -574.4,
                                                        -775.6, 700, -565.1,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -775.6, 200, -565.1,
                                                                -765, 200, -574.4,
                                                                -765, 700, -574.4,
                                                                -775.6, 700, -565.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_07",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -786.3, 200, -555.8,
                                                        -775.6, 200, -565.1,
                                                        -775.6, 700, -565.1,
                                                        -786.3, 700, -555.8,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -786.3, 200, -555.8,
                                                                -775.6, 200, -565.1,
                                                                -775.6, 700, -565.1,
                                                                -786.3, 700, -555.8
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_06",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -796.9, 200, -546.5,
                                                        -786.3, 200, -555.8,
                                                        -786.3, 700, -555.8,
                                                        -796.9, 700, -546.5,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -796.9, 200, -546.5,
                                                                -786.3, 200, -555.8,
                                                                -786.3, 700, -555.8,
                                                                -796.9, 700, -546.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_05",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -807.5, 200, -537.2,
                                                        -796.9, 200, -546.5,
                                                        -796.9, 700, -546.5,
                                                        -807.5, 700, -537.2,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -807.5, 200, -537.2,
                                                                -796.9, 200, -546.5,
                                                                -796.9, 700, -546.5,
                                                                -807.5, 700, -537.2
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_04",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -818.1, 200, -527.9,
                                                        -807.5, 200, -537.2,
                                                        -807.5, 700, -537.2,
                                                        -818.1, 700, -527.9,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -818.1, 200, -527.9,
                                                                -807.5, 200, -537.2,
                                                                -807.5, 700, -537.2,
                                                                -818.1, 700, -527.9
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_03",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -828.8, 200, -518.6,
                                                        -818.1, 200, -527.9,
                                                        -818.1, 700, -527.9,
                                                        -828.8, 700, -518.6,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -828.8, 200, -518.6,
                                                                -818.1, 200, -527.9,
                                                                -818.1, 700, -527.9,
                                                                -828.8, 700, -518.6
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_02",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -839.4, 200, -509.3,
                                                        -828.8, 200, -518.6,
                                                        -828.8, 700, -518.6,
                                                        -839.4, 700, -509.3,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -839.4, 200, -509.3,
                                                                -828.8, 200, -518.6,
                                                                -828.8, 700, -518.6,
                                                                -839.4, 700, -509.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_l_01",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -850, 200, -500,
                                                        -839.4, 200, -509.3,
                                                        -839.4, 700, -509.3,
                                                        -850, 700, -500,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -850, 200, -500,
                                                                -839.4, 200, -509.3,
                                                                -839.4, 700, -509.3,
                                                                -850, 700, -500
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        //Right
                                        {
                                            type:"layer",
                                            id:"azimuth_r_01",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        15.9, 200, -921,
                                                        0, 200, -925,
                                                        0, 700, -925,
                                                        15.9, 700, -921,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                15.9, 200, -921,
                                                                0, 200, -925,
                                                                0, 700, -925,
                                                                15.9, 700, -921
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_02",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        31.8, 200, -917,
                                                        15.9, 200, -921,
                                                        15.9, 700, -921,
                                                        31.8, 700, -917,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                31.8, 200, -917,
                                                                15.9, 200, -921,
                                                                15.9, 700, -921,
                                                                31.8, 700, -917
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_03",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        47.7, 200, -913,
                                                        31.8, 200, -917,
                                                        31.8, 700, -917,
                                                        47.7, 700, -913,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                47.7, 200, -913,
                                                                31.8, 200, -917,
                                                                31.8, 700, -917,
                                                                47.7, 700, -913
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_04",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        63.7, 200, -909,
                                                        47.7, 200, -913,
                                                        47.7, 700, -913,
                                                        63.7, 700, -909,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                63.7, 200, -909,
                                                                47.7, 200, -913,
                                                                47.7, 700, -913,
                                                                63.7, 700, -909
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_05",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        79.7, 200, -905,
                                                        63.7, 200, -909,
                                                        63.7, 700, -909,
                                                        79.7, 700, -905,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                79.7, 200, -905,
                                                                63.7, 200, -909,
                                                                63.7, 700, -909,
                                                                79.7, 700, -905
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_06",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        95.6, 200, -901,
                                                        79.7, 200, -905,
                                                        79.7, 700, -905,
                                                        95.6, 700, -901,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                95.6, 200, -901,
                                                                79.7, 200, -905,
                                                                79.7, 700, -905,
                                                                95.6, 700, -901
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_07",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        111.6, 200, -897,
                                                        95.6, 200, -901,
                                                        95.6, 700, -901,
                                                        111.6, 700, -897,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                111.6, 200, -897,
                                                                95.6, 200, -901,
                                                                95.6, 700, -901,
                                                                111.6, 700, -897
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_08",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        127.5, 200, -893,
                                                        111.6, 200, -897,
                                                        111.6, 700, -897,
                                                        127.5, 700, -893,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                127.5, 200, -893,
                                                                111.6, 200, -897,
                                                                111.6, 700, -897,
                                                                127.5, 700, -893
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_09",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        143.4, 200, -889,
                                                        127.5, 200, -893,
                                                        127.5, 700, -893,
                                                        143.4, 700, -889,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                143.4, 200, -889,
                                                                127.5, 200, -893,
                                                                127.5, 700, -893,
                                                                143.4, 700, -889
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_10",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        159.4, 200, -885,
                                                        143.4, 200, -889,
                                                        143.4, 700, -889,
                                                        159.4, 700, -885,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                159.4, 200, -885,
                                                                143.4, 200, -889,
                                                                143.4, 700, -889,
                                                                159.4, 700, -885
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_11",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        175.3, 200, -881,
                                                        159.4, 200, -885,
                                                        159.4, 700, -885,
                                                        175.3, 700, -881,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                175.3, 200, -881,
                                                                159.4, 200, -885,
                                                                159.4, 700, -885,
                                                                175.3, 700, -881
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_12",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        191.2, 200, -877,
                                                        175.3, 200, -881,
                                                        175.3, 700, -881,
                                                        191.2, 700, -877,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                191.2, 200, -877,
                                                                175.3, 200, -881,
                                                                175.3, 700, -881,
                                                                191.2, 700, -877
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_13",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        207.2, 200, -873,
                                                        191.2, 200, -877,
                                                        191.2, 700, -877,
                                                        207.2, 700, -873,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                207.2, 200, -873,
                                                                191.2, 200, -877,
                                                                191.2, 700, -877,
                                                                207.2, 700, -873
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_14",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        223.1, 200, -869,
                                                        207.2, 200, -873,
                                                        207.2, 700, -873,
                                                        223.1, 700, -869,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                223.1, 200, -869,
                                                                207.2, 200, -873,
                                                                207.2, 700, -873,
                                                                223.1, 700, -869
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_15",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        239.1, 200, -865,
                                                        223.1, 200, -869,
                                                        223.1, 700, -869,
                                                        239.1, 700, -865,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                239.1, 200, -865,
                                                                223.1, 200, -869,
                                                                223.1, 700, -869,
                                                                239.1, 700, -865
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_16",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        255, 200, -861,
                                                        239.1, 200, -865,
                                                        239.1, 700, -865,
                                                        255, 700, -861,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                255, 200, -861,
                                                                239.1, 200, -865,
                                                                239.1, 700, -865,
                                                                255, 700, -861
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_17",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        270.1, 200, -857,
                                                        255, 200, -861,
                                                        255, 700, -861,
                                                        270.1, 700, -857,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                270.1, 200, -857,
                                                                255, 200, -861,
                                                                255, 700, -861,
                                                                270.1, 700, -857
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_18",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        286.9, 200, -853,
                                                        270.1, 200, -857,
                                                        270.1, 700, -857,
                                                        286.9, 700, -853,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                286.9, 200, -853,
                                                                270.1, 200, -857,
                                                                270.1, 700, -857,
                                                                286.9, 700, -853
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_19",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        302.8, 200, -849,
                                                        286.9, 200, -853,
                                                        286.9, 700, -853,
                                                        302.8, 700, -849,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                302.8, 200, -849,
                                                                286.9, 200, -853,
                                                                286.9, 700, -853,
                                                                302.8, 700, -849
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_20",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        318.8, 200, -845,
                                                        302.8, 200, -849,
                                                        302.8, 700, -849,
                                                        318.8, 700, -845,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                318.8, 200, -845,
                                                                302.8, 200, -849,
                                                                302.8, 700, -849,
                                                                318.8, 700, -845
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_21",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        334.7, 200, -841,
                                                        318.8, 200, -845,
                                                        318.8, 700, -845,
                                                        334.7, 700, -841,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                334.7, 200, -841,
                                                                318.8, 200, -845,
                                                                318.8, 700, -845,
                                                                334.7, 700, -841
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_22",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        350.6, 200, -837,
                                                        334.7, 200, -841,
                                                        334.7, 700, -841,
                                                        350.6, 700, -837,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                350.6, 200, -837,
                                                                334.7, 200, -841,
                                                                334.7, 700, -841,
                                                                350.6, 700, -837
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_23",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        366.6, 200, -833,
                                                        350.6, 200, -837,
                                                        350.6, 700, -837,
                                                        366.6, 700, -833,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                366.6, 200, -833,
                                                                350.6, 200, -837,
                                                                350.6, 700, -837,
                                                                366.6, 700, -833
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_24",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        382.5, 200, -829,
                                                        366.6, 200, -833,
                                                        366.6, 700, -833,
                                                        382.5, 700, -829,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                382.5, 200, -829,
                                                                366.6, 200, -833,
                                                                366.6, 700, -833,
                                                                382.5, 700, -829
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_25",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        398.5, 200, -825,
                                                        382.5, 200, -829,
                                                        382.5, 700, -829,
                                                        398.5, 700, -825,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                398.5, 200, -825,
                                                                382.5, 200, -829,
                                                                382.5, 700, -829,
                                                                398.5, 700, -825
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_26",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        414.4, 200, -821,
                                                        398.5, 200, -825,
                                                        398.5, 700, -825,
                                                        414.4, 700, -821,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                414.4, 200, -821,
                                                                398.5, 200, -825,
                                                                398.5, 700, -825,
                                                                414.4, 700, -821
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_27",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        430.3, 200, -817,
                                                        414.4, 200, -821,
                                                        414.4, 700, -821,
                                                        430.3, 700, -817,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                430.3, 200, -817,
                                                                414.4, 200, -821,
                                                                414.4, 700, -821,
                                                                430.3, 700, -817
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_28",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        446.3, 200, -813,
                                                        430.3, 200, -817,
                                                        430.3, 700, -817,
                                                        446.3, 700, -813,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                446.3, 200, -813,
                                                                430.3, 200, -817,
                                                                430.3, 700, -817,
                                                                446.3, 700, -813
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_29",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        462.2, 200, -809,
                                                        446.3, 200, -813,
                                                        446.3, 700, -813,
                                                        462.2, 700, -809,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                462.2, 200, -809,
                                                                446.3, 200, -813,
                                                                446.3, 700, -813,
                                                                462.2, 700, -809
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_30",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        478.2, 200, -805,
                                                        462.2, 200, -809,
                                                        462.2, 700, -809,
                                                        478.2, 700, -805,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                478.2, 200, -805,
                                                                462.2, 200, -809,
                                                                462.2, 700, -809,
                                                                478.2, 700, -805
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_31",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        494.1, 200, -801,
                                                        478.2, 200, -805,
                                                        478.2, 700, -805,
                                                        494.1, 700, -801,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                494.1, 200, -801,
                                                                478.2, 200, -805,
                                                                478.2, 700, -805,
                                                                494.1, 700, -801
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_32",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        510, 200, -797.5,
                                                        494.1, 200, -801,
                                                        494.1, 700, -801,
                                                        510, 700, -797.5,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                510, 200, -797.5,
                                                                494.1, 200, -801,
                                                                494.1, 700, -801,
                                                                510, 700, -797.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_33",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        520.6, 200, -788.2,
                                                        510, 200, -797.5,
                                                        510, 700, -797.5,
                                                        520.6, 700, -788.2,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                520.6, 200, -788.2,
                                                                510, 200, -797.5,
                                                                510, 700, -797.5,
                                                                520.6, 700, -788.2
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_34",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        531.3, 200, -778.9,
                                                        520.6, 200, -788.2,
                                                        520.6, 700, -788.2,
                                                        531.3, 700, -778.9,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                531.3, 200, -778.9,
                                                                520.6, 200, -788.2,
                                                                520.6, 700, -788.2,
                                                                531.3, 700, -778.9
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_35",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        541.9, 200, -769.6,
                                                        531.3, 200, -778.9,
                                                        531.3, 700, -778.9,
                                                        541.9, 700, -769.6,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                541.9, 200, -769.6,
                                                                531.3, 200, -778.9,
                                                                531.3, 700, -778.9,
                                                                541.9, 700, -769.6
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_36",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        552.5, 200, -760.3,
                                                        541.9, 200, -769.6,
                                                        541.9, 700, -769.6,
                                                        552.5, 700, -760.3,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                552.5, 200, -760.3,
                                                                541.9, 200, -769.6,
                                                                541.9, 700, -769.6,
                                                                552.5, 700, -760.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_37",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        563.1, 200, -751.1,
                                                        552.5, 200, -760.3,
                                                        552.5, 700, -760.3,
                                                        563.1, 700, -751.1,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                563.1, 200, -751.1,
                                                                552.5, 200, -760.3,
                                                                552.5, 700, -760.3,
                                                                563.1, 700, -751.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_38",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        573.8, 200, -741.7,
                                                        563.1, 200, -751.1,
                                                        563.1, 700, -751.1,
                                                        573.8, 700, -741.7,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                573.8, 200, -741.7,
                                                                563.1, 200, -751.1,
                                                                563.1, 700, -751.1,
                                                                573.8, 700, -741.7
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_39",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        584.4, 200, -732.4,
                                                        573.8, 200, -741.7,
                                                        573.8, 700, -741.7,
                                                        584.4, 700, -732.4,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                584.4, 200, -732.4,
                                                                573.8, 200, -741.7,
                                                                573.8, 700, -741.7,
                                                                584.4, 700, -732.4
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_40",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        595, 200, -723.1,
                                                        584.4, 200, -732.4,
                                                        584.4, 700, -732.4,
                                                        595, 700, -723.1,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                595, 200, -723.1,
                                                                584.4, 200, -732.4,
                                                                584.4, 700, -732.4,
                                                                595, 700, -723.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_41",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        605.6, 200, -713.8,
                                                        595, 200, -723.1,
                                                        595, 700, -723.1,
                                                        605.6, 700, -713.8,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                605.6, 200, -713.8,
                                                                595, 200, -723.1,
                                                                595, 700, -723.1,
                                                                605.6, 700, -713.8
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_42",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        616.2, 200, -704.5,
                                                        605.6, 200, -713.8,
                                                        605.6, 700, -713.8,
                                                        616.2, 700, -704.5,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                616.2, 200, -704.5,
                                                                605.6, 200, -713.8,
                                                                605.6, 700, -713.8,
                                                                616.2, 700, -704.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_43",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        626.9, 200, -695.2,
                                                        616.2, 200, -704.5,
                                                        616.2, 700, -704.5,
                                                        626.9, 700, -695.2,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                626.9, 200, -695.2,
                                                                616.2, 200, -704.5,
                                                                616.2, 700, -704.5,
                                                                626.9, 700, -695.2
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_44",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        637.5, 200, -685.9,
                                                        626.9, 200, -695.2,
                                                        626.9, 700, -695.2,
                                                        637.5, 700, -685.9,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                637.5, 200, -685.9,
                                                                626.9, 200, -695.2,
                                                                626.9, 700, -695.2,
                                                                637.5, 700, -685.9
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_45",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        648.1, 200, -676.6,
                                                        637.5, 200, -685.9,
                                                        637.5, 700, -685.9,
                                                        648.1, 700, -676.6,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                648.1, 200, -676.6,
                                                                637.5, 200, -685.9,
                                                                637.5, 700, -685.9,
                                                                648.1, 700, -676.6
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_46",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        658.8, 200, -667.3,
                                                        648.1, 200, -676.6,
                                                        648.1, 700, -676.6,
                                                        658.8, 700, -667.3,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                658.8, 200, -667.3,
                                                                648.1, 200, -676.6,
                                                                648.1, 700, -676.6,
                                                                658.8, 700, -667.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_47",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        669.4, 200, -658.0,
                                                        658.8, 200, -667.3,
                                                        658.8, 700, -667.3,
                                                        669.4, 700, -658.0,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                669.4, 200, -658.0,
                                                                658.8, 200, -667.3,
                                                                658.8, 700, -667.3,
                                                                669.4, 700, -658.0
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_48",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        680, 200, -648.8,
                                                        669.4, 200, -658.0,
                                                        669.4, 700, -658.0,
                                                        680, 700, -648.8,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                680, 200, -648.8,
                                                                669.4, 200, -658.0,
                                                                669.4, 700, -658.0,
                                                                680, 700, -648.8
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_49",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        690.6, 200, -639.5,
                                                        680, 200, -648.8,
                                                        680, 700, -648.8,
                                                        690.6, 700, -639.5,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                690.6, 200, -639.5,
                                                                680, 200, -648.8,
                                                                680, 700, -648.8,
                                                                690.6, 700, -639.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_50",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        701.3, 200, -630.2,
                                                        690.6, 200, -639.5,
                                                        690.6, 700, -639.5,
                                                        701.3, 700, -630.2,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                701.3, 200, -630.2,
                                                                690.6, 200, -639.5,
                                                                690.6, 700, -639.5,
                                                                701.3, 700, -630.2
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_51",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        711.9, 200, -620.9,
                                                        701.3, 200, -630.2,
                                                        701.3, 700, -630.2,
                                                        711.9, 700, -620.9,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                711.9, 200, -620.9,
                                                                701.3, 200, -630.2,
                                                                701.3, 700, -630.2,
                                                                711.9, 700, -620.9
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_52",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        722.5, 200, -611.6,
                                                        711.9, 200, -620.9,
                                                        711.9, 700, -620.9,
                                                        722.5, 700, -611.6,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                722.5, 200, -611.6,
                                                                711.9, 200, -620.9,
                                                                711.9, 700, -620.9,
                                                                722.5, 700, -611.6
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_53",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        733.1, 200, -602.3,
                                                        722.5, 200, -611.6,
                                                        722.5, 700, -611.6,
                                                        733.1, 700, -602.3,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                733.1, 200, -602.3,
                                                                722.5, 200, -611.6,
                                                                722.5, 700, -611.6,
                                                                733.1, 700, -602.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_54",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        743.8, 200, -592.9,
                                                        733.1, 200, -602.3,
                                                        733.1, 700, -602.3,
                                                        743.8, 700, -592.9,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                743.8, 200, -592.9,
                                                                733.1, 200, -602.3,
                                                                733.1, 700, -602.3,
                                                                743.8, 700, -592.9
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_55",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        754.4, 200, -583.7,
                                                        743.8, 200, -592.9,
                                                        743.8, 700, -592.9,
                                                        754.4, 700, -583.7,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                754.4, 200, -583.7,
                                                                743.8, 200, -592.9,
                                                                743.8, 700, -592.9,
                                                                754.4, 700, -583.7
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_56",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        765, 200, -574.4,
                                                        754.4, 200, -583.7,
                                                        754.4, 700, -583.7,
                                                        765, 700, -574.4,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                765, 200, -574.4,
                                                                754.4, 200, -583.7,
                                                                754.4, 700, -583.7,
                                                                765, 700, -574.4
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_57",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        775.6, 200, -565.1,
                                                        765, 200, -574.4,
                                                        765, 700, -574.4,
                                                        775.6, 700, -565.1,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                775.6, 200, -565.1,
                                                                765, 200, -574.4,
                                                                765, 700, -574.4,
                                                                775.6, 700, -565.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_58",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        786.3, 200, -555.8,
                                                        775.6, 200, -565.1,
                                                        775.6, 700, -565.1,
                                                        786.3, 700, -555.8,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                786.3, 200, -555.8,
                                                                775.6, 200, -565.1,
                                                                775.6, 700, -565.1,
                                                                786.3, 700, -555.8
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_59",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        796.9, 200, -546.5,
                                                        786.3, 200, -555.8,
                                                        786.3, 700, -555.8,
                                                        796.9, 700, -546.5,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                796.9, 200, -546.5,
                                                                786.3, 200, -555.8,
                                                                786.3, 700, -555.8,
                                                                796.9, 700, -546.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_60",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        807.5, 200, -537.2,
                                                        796.9, 200, -546.5,
                                                        796.9, 700, -546.5,
                                                        807.5, 700, -537.2,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                807.5, 200, -537.2,
                                                                796.9, 200, -546.5,
                                                                796.9, 700, -546.5,
                                                                807.5, 700, -537.2
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_61",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        818.1, 200, -527.9,
                                                        807.5, 200, -537.2,
                                                        807.5, 700, -537.2,
                                                        818.1, 700, -527.9,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                818.1, 200, -527.9,
                                                                807.5, 200, -537.2,
                                                                807.5, 700, -537.2,
                                                                818.1, 700, -527.9
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_62",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        828.8, 200, -518.6,
                                                        818.1, 200, -527.9,
                                                        818.1, 700, -527.9,
                                                        828.8, 700, -518.6,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                828.8, 200, -518.6,
                                                                818.1, 200, -527.9,
                                                                818.1, 700, -527.9,
                                                                828.8, 700, -518.6
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_63",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        839.4, 200, -509.3,
                                                        828.8, 200, -518.6,
                                                        828.8, 700, -518.6,
                                                        839.4, 700, -509.3,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                839.4, 200, -509.3,
                                                                828.8, 200, -518.6,
                                                                828.8, 700, -518.6,
                                                                839.4, 700, -509.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"azimuth_r_64",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        850, 200, -500,
                                                        839.4, 200, -509.3,
                                                        839.4, 700, -509.3,
                                                        850, 700, -500,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                850, 200, -500,
                                                                839.4, 200, -509.3,
                                                                839.4, 700, -509.3,
                                                                850, 700, -500
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        //fast_left
                                        {
                                            type:"layer",
                                            id:"fast_l_01",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -850, 365, -500,
                                                        -680, 365, -648.8,
                                                        -680, 535, -648.8,
                                                        -850, 535, -500,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -850, 365, -500,
                                                                -680, 365, -648.8,
                                                                -680, 535, -648.8,
                                                                -850, 535, -500
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"fast_l_02",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -510, 365, -797.5,
                                                        -680, 365, -648.8,
                                                        -680, 535, -648.8,
                                                        -510, 535, -797.5,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -510, 365, -797.5,
                                                                -680, 365, -648.8,
                                                                -680, 535, -648.8,
                                                                -510, 535, -797.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"fast_l_03",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -850, 200, -500,
                                                        -680, 200, -648.8,
                                                        -680, 365, -648.8,
                                                        -850, 365, -500,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -850, 200, -500,
                                                                -680, 200, -648.8,
                                                                -680, 365, -648.8,
                                                                -850, 365, -500
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                },
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -850, 535, -500,
                                                        -680, 535, -648.8,
                                                        -680, 700, -648.8,
                                                        -850, 700, -500,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -850, 535, -500,
                                                                -680, 535, -648.8,
                                                                -680, 700, -648.8,
                                                                -850, 700, -500
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"fast_l_04",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -510, 200, -797.5,
                                                        -680, 200, -648.8,
                                                        -680, 365, -648.8,
                                                        -510, 365, -797.5,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -510, 200, -797.5,
                                                                -680, 200, -648.8,
                                                                -680, 365, -648.8,
                                                                -510, 365, -797.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                },
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -510, 535, -797.5,
                                                        -680, 535, -648.8,
                                                        -680, 700, -648.8,
                                                        -510, 700, -797.5,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -510, 535, -797.5,
                                                                -680, 535, -648.8,
                                                                -680, 700, -648.8,
                                                                -510, 700, -797.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"fast_l_05",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -510, 365, -797.5,
                                                        -255, 365, -861.3,
                                                        -255, 535, -861.3,
                                                        -510, 535, -797.5,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -510, 365, -797.5,
                                                                -255, 365, -861.3,
                                                                -255, 535, -861.3,
                                                                -510, 535, -797.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"fast_l_06",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -0, 365, -925,
                                                        -255, 365, -861.3,
                                                        -255, 535, -861.3,
                                                        -0, 535, -925,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -0, 365, -925,
                                                                -255, 365, -861.3,
                                                                -255, 535, -861.3,
                                                                -0, 535, -925
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"fast_l_07",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -510, 200, -797.5,
                                                        -255, 200, -861.3,
                                                        -255, 365, -861.3,
                                                        -510, 365, -797.5,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -510, 200, -797.5,
                                                                -255, 200, -861.3,
                                                                -255, 365, -861.3,
                                                                -510, 365, -797.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                },
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -510, 535, -797.5,
                                                        -255, 535, -861.3,
                                                        -255, 700, -861.3,
                                                        -510, 700, -797.5,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -510, 535, -797.5,
                                                                -255, 535, -861.3,
                                                                -255, 700, -861.3,
                                                                -510, 700, -797.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"fast_l_08",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        0, 200, -925,
                                                        -255, 200, -861.3,
                                                        -255, 365, -861.3,
                                                        0, 365, -925,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                0, 200, -925,
                                                                -255, 200, -861.3,
                                                                -255, 365, -861.3,
                                                                0, 365, -925
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                },
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        0, 535, -925,
                                                        -255, 535, -861.3,
                                                        -255, 700, -861.3,
                                                        0, 700, -925,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                0, 535, -925,
                                                                -255, 535, -861.3,
                                                                -255, 700, -861.3,
                                                                0, 700, -925
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        //fast_right
                                        {
                                            type:"layer",
                                            id:"fast_r_06",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        850, 365, -500,
                                                        680, 365, -648.8,
                                                        680, 535, -648.8,
                                                        850, 535, -500,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                850, 365, -500,
                                                                680, 365, -648.8,
                                                                680, 535, -648.8,
                                                                850, 535, -500
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"fast_r_05",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        510, 365, -797.5,
                                                        680, 365, -648.8,
                                                        680, 535, -648.8,
                                                        510, 535, -797.5,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                510, 365, -797.5,
                                                                680, 365, -648.8,
                                                                680, 535, -648.8,
                                                                510, 535, -797.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"fast_r_08",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        850, 200, -500,
                                                        680, 200, -648.8,
                                                        680, 365, -648.8,
                                                        850, 365, -500,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                850, 200, -500,
                                                                680, 200, -648.8,
                                                                680, 365, -648.8,
                                                                850, 365, -500
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                },
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        850, 535, -500,
                                                        680, 535, -648.8,
                                                        680, 700, -648.8,
                                                        850, 700, -500,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                850, 535, -500,
                                                                680, 535, -648.8,
                                                                680, 700, -648.8,
                                                                850, 700, -500
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"fast_r_07",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        510, 200, -797.5,
                                                        680, 200, -648.8,
                                                        680, 365, -648.8,
                                                        510, 365, -797.5,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                510, 200, -797.5,
                                                                680, 200, -648.8,
                                                                680, 365, -648.8,
                                                                510, 365, -797.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                },
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        510, 535, -797.5,
                                                        680, 535, -648.8,
                                                        680, 700, -648.8,
                                                        510, 700, -797.5,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                510, 535, -797.5,
                                                                680, 535, -648.8,
                                                                680, 700, -648.8,
                                                                510, 700, -797.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"fast_r_02",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        510, 365, -797.5,
                                                        255, 365, -861.3,
                                                        255, 535, -861.3,
                                                        510, 535, -797.5,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                510, 365, -797.5,
                                                                255, 365, -861.3,
                                                                255, 535, -861.3,
                                                                510, 535, -797.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"fast_r_01",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        0, 365, -925,
                                                        255, 365, -861.3,
                                                        255, 535, -861.3,
                                                        0, 535, -925,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                0, 365, -925,
                                                                255, 365, -861.3,
                                                                255, 535, -861.3,
                                                                0, 535, -925
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"fast_r_04",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        510, 200, -797.5,
                                                        255, 200, -861.3,
                                                        255, 365, -861.3,
                                                        510, 365, -797.5,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                510, 200, -797.5,
                                                                255, 200, -861.3,
                                                                255, 365, -861.3,
                                                                510, 365, -797.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                },
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        510, 535, -797.5,
                                                        255, 535, -861.3,
                                                        255, 700, -861.3,
                                                        510, 700, -797.5,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                510, 535, -797.5,
                                                                255, 535, -861.3,
                                                                255, 700, -861.3,
                                                                510, 700, -797.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"fast_r_03",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        0, 200, -925,
                                                        255, 200, -861.3,
                                                        255, 365, -861.3,
                                                        0, 365, -925,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                0, 200, -925,
                                                                255, 200, -861.3,
                                                                255, 365, -861.3,
                                                                0, 365, -925
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                },
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        0, 535, -925,
                                                        255, 535, -861.3,
                                                        255, 700, -861.3,
                                                        0, 700, -925,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                0, 535, -925,
                                                                255, 535, -861.3,
                                                                255, 700, -861.3,
                                                                0, 700, -925
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        //slow_left
                                        {
                                            type:"layer",
                                            id:"slow_l_01",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -850, 200, -500,
                                                        -807.5, 200, -537.2,
                                                        -807.5, 365, -537.2,
                                                        -850, 365, -500,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -850, 200, -500,
                                                                -807.5, 200, -537.2,
                                                                -807.5, 365, -537.2,
                                                                -850, 365, -500
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_02",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -807.5, 200, -537.2,
                                                        -765, 200, -574.4,
                                                        -765, 365, -574.4,
                                                        -807.5, 365, -537.2,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -807.5, 200, -537.2,
                                                                -765, 200, -574.4,
                                                                -765, 365, -574.4,
                                                                -807.5, 365, -537.2
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_03",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -765, 200, -574.4,
                                                        -722.5, 200, -611.6,
                                                        -722.5, 365, -611.6,
                                                        -765, 365, -574.4,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -765, 200, -574.4,
                                                                -722.5, 200, -611.6,
                                                                -722.5, 365, -611.6,
                                                                -765, 365, -574.4
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_04",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -722.5, 200, -611.6,
                                                        -680, 200, -648.8,
                                                        -680, 365, -648.8,
                                                        -722.5, 365, -611.6,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -722.5, 200, -611.6,
                                                                -680, 200, -648.8,
                                                                -680, 365, -648.8,
                                                                -722.5, 365, -611.6
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_05",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -680, 200, -648.8,
                                                        -637.5, 200, -685.9,
                                                        -637.5, 365, -685.9,
                                                        -680, 365, -648.8,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -680, 200, -648.8,
                                                                -637.5, 200, -685.9,
                                                                -637.5, 365, -685.9,
                                                                -680, 365, -648.8
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_06",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -637.5, 200, -685.9,
                                                        -595, 200, -723.1,
                                                        -595, 365, -723.1,
                                                        -637.5, 365, -685.9,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -637.5, 200, -685.9,
                                                                -595, 200, -723.1,
                                                                -595, 365, -723.1,
                                                                -637.5, 365, -685.9
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_07",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -595, 200, -723.1,
                                                        -552.5, 200, -760.3,
                                                        -552.5, 365, -760.3,
                                                        -595, 365, -723.1,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -595, 200, -723.1,
                                                                -552.5, 200, -760.3,
                                                                -552.5, 365, -760.3,
                                                                -595, 365, -723.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_08",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -552.5, 200, -760.3,
                                                        -510, 200, -797.5,
                                                        -510, 365, -797.5,
                                                        -552.5, 365, -760.3,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -552.5, 200, -760.3,
                                                                -510, 200, -797.5,
                                                                -510, 365, -797.5,
                                                                -552.5, 365, -760.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_09",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -850, 365, -500,
                                                        -807.5, 365, -537.2,
                                                        -807.5, 535, -537.2,
                                                        -850, 535, -500,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -850, 365, -500,
                                                                -807.5, 365, -537.2,
                                                                -807.5, 535, -537.2,
                                                                -850, 535, -500
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_10",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -807.5, 365, -537.2,
                                                        -765, 365, -574.4,
                                                        -765, 535, -574.4,
                                                        -807.5, 535, -537.2,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -807.5, 365, -537.2,
                                                                -765, 365, -574.4,
                                                                -765, 535, -574.4,
                                                                -807.5, 535, -537.2
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_11",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -765, 365, -574.4,
                                                        -722.5, 365, -611.6,
                                                        -722.5, 535, -611.6,
                                                        -765, 535, -574.4,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -765, 365, -574.4,
                                                                -722.5, 365, -611.6,
                                                                -722.5, 535, -611.6,
                                                                -765, 535, -574.4
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_12",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -722.5, 365, -611.6,
                                                        -680, 365, -648.8,
                                                        -680, 535, -648.8,
                                                        -722.5, 535, -611.6,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -722.5, 365, -611.6,
                                                                -680, 365, -648.8,
                                                                -680, 535, -648.8,
                                                                -722.5, 535, -611.6
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_13",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -680, 365, -648.8,
                                                        -637.5, 365, -685.9,
                                                        -637.5, 535, -685.9,
                                                        -680, 535, -648.8,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -680, 365, -648.8,
                                                                -637.5, 365, -685.9,
                                                                -637.5, 535, -685.9,
                                                                -680, 535, -648.8
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_14",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -637.5, 365, -685.9,
                                                        -595, 365, -723.1,
                                                        -595, 535, -723.1,
                                                        -637.5, 535, -685.9,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -637.5, 365, -685.9,
                                                                -595, 365, -723.1,
                                                                -595, 535, -723.1,
                                                                -637.5, 535, -685.9
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_15",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -595, 365, -723.1,
                                                        -552.5, 365, -760.3,
                                                        -552.5, 535, -760.3,
                                                        -595, 535, -723.1,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -595, 365, -723.1,
                                                                -552.5, 365, -760.3,
                                                                -552.5, 535, -760.3,
                                                                -595, 535, -723.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_16",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -552.5, 365, -760.3,
                                                        -510, 365, -797.5,
                                                        -510, 535, -797.5,
                                                        -552.5, 535, -760.3,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -552.5, 365, -760.3,
                                                                -510, 365, -797.5,
                                                                -510, 535, -797.5,
                                                                -552.5, 535, -760.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_17",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -850, 535, -500,
                                                        -807.5, 535, -537.2,
                                                        -807.5, 700, -537.2,
                                                        -850, 700, -500,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -850, 535, -500,
                                                                -807.5, 535, -537.2,
                                                                -807.5, 700, -537.2,
                                                                -850, 700, -500
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_18",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -807.5, 535, -537.2,
                                                        -765, 535, -574.4,
                                                        -765, 700, -574.4,
                                                        -807.5, 700, -537.2,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -807.5, 535, -537.2,
                                                                -765, 535, -574.4,
                                                                -765, 700, -574.4,
                                                                -807.5, 700, -537.2
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_19",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -765, 535, -574.4,
                                                        -722.5, 535, -611.6,
                                                        -722.5, 700, -611.6,
                                                        -765, 700, -574.4,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -765, 535, -574.4,
                                                                -722.5, 535, -611.6,
                                                                -722.5, 700, -611.6,
                                                                -765, 700, -574.4
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_20",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -722.5, 535, -611.6,
                                                        -680, 535, -648.8,
                                                        -680, 700, -648.8,
                                                        -722.5, 700, -611.6,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -722.5, 535, -611.6,
                                                                -680, 535, -648.8,
                                                                -680, 700, -648.8,
                                                                -722.5, 700, -611.6
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_21",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -680, 535, -648.8,
                                                        -637.5, 535, -685.9,
                                                        -637.5, 700, -685.9,
                                                        -680, 700, -648.8,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -680, 535, -648.8,
                                                                -637.5, 535, -685.9,
                                                                -637.5, 700, -685.9,
                                                                -680, 700, -648.8
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_22",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -637.5, 535, -685.9,
                                                        -595, 535, -723.1,
                                                        -595, 700, -723.1,
                                                        -637.5, 700, -685.9,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -637.5, 535, -685.9,
                                                                -595, 535, -723.1,
                                                                -595, 700, -723.1,
                                                                -637.5, 700, -685.9
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_23",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -595, 535, -723.1,
                                                        -552.5, 535, -760.3,
                                                        -552.5, 700, -760.3,
                                                        -595, 700, -723.1,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -595, 535, -723.1,
                                                                -552.5, 535, -760.3,
                                                                -552.5, 700, -760.3,
                                                                -595, 700, -723.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_24",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -552.5, 535, -760.3,
                                                        -510, 535, -797.5,
                                                        -510, 700, -797.5,
                                                        -552.5, 700, -760.3,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -552.5, 535, -760.3,
                                                                -510, 535, -797.5,
                                                                -510, 700, -797.5,
                                                                -552.5, 700, -760.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_25",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -510, 200, -797.5,
                                                        -446.3, 200, -813.4,
                                                        -446.3, 365, -813.4,
                                                        -510, 365, -797.5,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -510, 200, -797.5,
                                                                -446.3, 200, -813.4,
                                                                -446.3, 365, -813.4,
                                                                -510, 365, -797.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_26",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -446.3, 200, -813.4,
                                                        -382.5, 200, -829.4,
                                                        -382.5, 365, -829.4,
                                                        -446.3, 365, -813.4,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -446.3, 200, -813.4,
                                                                -382.5, 200, -829.4,
                                                                -382.5, 365, -829.4,
                                                                -446.3, 365, -813.4
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_27",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -382.5, 200, -829.4,
                                                        -318.8, 200, -845.3,
                                                        -318.8, 365, -845.3,
                                                        -382.5, 365, -829.4,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -382.5, 200, -829.4,
                                                                -318.8, 200, -845.3,
                                                                -318.8, 365, -845.3,
                                                                -382.5, 365, -829.4
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_28",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -318.8, 200, -845.3,
                                                        -255, 200, -861.3,
                                                        -255, 365, -861.3,
                                                        -318.8, 365, -845.3,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -318.8, 200, -845.3,
                                                                -255, 200, -861.3,
                                                                -255, 365, -861.3,
                                                                -318.8, 365, -845.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_29",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -255, 200, -861.3,
                                                        -191.3, 200, -877.2,
                                                        -191.3, 365, -877.2,
                                                        -255, 365, -861.3,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -255, 200, -861.3,
                                                                -191.3, 200, -877.2,
                                                                -191.3, 365, -877.2,
                                                                -255, 365, -861.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_30",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -191.3, 200, -877.2,
                                                        -127.5, 200, -893.1,
                                                        -127.5, 365, -893.1,
                                                        -191.3, 365, -877.2,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -191.3, 200, -877.2,
                                                                -127.5, 200, -893.1,
                                                                -127.5, 365, -893.1,
                                                                -191.3, 365, -877.2
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_31",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -127.5, 200, -893.1,
                                                        -63.8, 200, -909.1,
                                                        -63.8, 365, -909.1,
                                                        -127.5, 365, -893.1,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -127.5, 200, -893.1,
                                                                -63.8, 200, -909.1,
                                                                -63.8, 365, -909.1,
                                                                -127.5, 365, -893.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_32",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -63.8, 200, -909.1,
                                                        -0, 200, -925,
                                                        -0, 365, -925,
                                                        -63.8, 365, -909.1,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -63.8, 200, -909.1,
                                                                -0, 200, -925,
                                                                -0, 365, -925,
                                                                -63.8, 365, -909.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_33",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -510, 365, -797.5,
                                                        -446.3, 365, -813.4,
                                                        -446.3, 535, -813.4,
                                                        -510, 535, -797.5,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -510, 365, -797.5,
                                                                -446.3, 365, -813.4,
                                                                -446.3, 535, -813.4,
                                                                -510, 535, -797.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_34",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -446.3, 365, -813.4,
                                                        -382.5, 365, -829.4,
                                                        -382.5, 535, -829.4,
                                                        -446.3, 535, -813.4,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -446.3, 365, -813.4,
                                                                -382.5, 365, -829.4,
                                                                -382.5, 535, -829.4,
                                                                -446.3, 535, -813.4
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_35",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -382.5, 365, -829.4,
                                                        -318.8, 365, -845.3,
                                                        -318.8, 535, -845.3,
                                                        -382.5, 535, -829.4,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -382.5, 365, -829.4,
                                                                -318.8, 365, -845.3,
                                                                -318.8, 535, -845.3,
                                                                -382.5, 535, -829.4
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_36",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -318.8, 365, -845.3,
                                                        -255, 365, -861.3,
                                                        -255, 535, -861.3,
                                                        -318.8, 535, -845.3,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -318.8, 365, -845.3,
                                                                -255, 365, -861.3,
                                                                -255, 535, -861.3,
                                                                -318.8, 535, -845.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_37",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -255, 365, -861.3,
                                                        -191.3, 365, -877.2,
                                                        -191.3, 535, -877.2,
                                                        -255, 535, -861.3,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -255, 365, -861.3,
                                                                -191.3, 365, -877.2,
                                                                -191.3, 535, -877.2,
                                                                -255, 535, -861.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_38",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -191.3, 365, -877.2,
                                                        -127.5, 365, -893.1,
                                                        -127.5, 535, -893.1,
                                                        -191.3, 535, -877.2,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -191.3, 365, -877.2,
                                                                -127.5, 365, -893.1,
                                                                -127.5, 535, -893.1,
                                                                -191.3, 535, -877.2
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_39",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -127.5, 365, -893.1,
                                                        -63.8, 365, -909.1,
                                                        -63.8, 535, -909.1,
                                                        -127.5, 535, -893.1,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -127.5, 365, -893.1,
                                                                -63.8, 365, -909.1,
                                                                -63.8, 535, -909.1,
                                                                -127.5, 535, -893.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_40",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -63.8, 365, -909.1,
                                                        -0, 365, -925,
                                                        -0, 535, -925,
                                                        -63.8, 535, -909.1,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -63.8, 365, -909.1,
                                                                -0, 365, -925,
                                                                -0, 535, -925,
                                                                -63.8, 535, -909.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_41",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -510, 535, -797.5,
                                                        -446.3, 535, -813.4,
                                                        -446.3, 700, -813.4,
                                                        -510, 700, -797.5,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -510, 535, -797.5,
                                                                -446.3, 535, -813.4,
                                                                -446.3, 700, -813.4,
                                                                -510, 700, -797.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_42",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -446.3, 535, -813.4,
                                                        -382.5, 535, -829.4,
                                                        -382.5, 700, -829.4,
                                                        -446.3, 700, -813.4,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -446.3, 535, -813.4,
                                                                -382.5, 535, -829.4,
                                                                -382.5, 700, -829.4,
                                                                -446.3, 700, -813.4
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_43",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -382.5, 535, -829.4,
                                                        -318.8, 535, -845.3,
                                                        -318.8, 700, -845.3,
                                                        -382.5, 700, -829.4,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -382.5, 535, -829.4,
                                                                -318.8, 535, -845.3,
                                                                -318.8, 700, -845.3,
                                                                -382.5, 700, -829.4
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_44",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -318.8, 535, -845.3,
                                                        -255, 535, -861.3,
                                                        -255, 700, -861.3,
                                                        -318.8, 700, -845.3,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -318.8, 535, -845.3,
                                                                -255, 535, -861.3,
                                                                -255, 700, -861.3,
                                                                -318.8, 700, -845.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_45",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -255, 535, -861.3,
                                                        -191.3, 535, -877.2,
                                                        -191.3, 700, -877.2,
                                                        -255, 700, -861.3,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -255, 535, -861.3,
                                                                -191.3, 535, -877.2,
                                                                -191.3, 700, -877.2,
                                                                -255, 700, -861.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_46",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -191.3, 535, -877.2,
                                                        -127.5, 535, -893.1,
                                                        -127.5, 700, -893.1,
                                                        -191.3, 700, -877.2,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -191.3, 535, -877.2,
                                                                -127.5, 535, -893.1,
                                                                -127.5, 700, -893.1,
                                                                -191.3, 700, -877.2
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_47",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -127.5, 535, -893.1,
                                                        -63.8, 535, -909.1,
                                                        -63.8, 700, -909.1,
                                                        -127.5, 700, -893.1,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -127.5, 535, -893.1,
                                                                -63.8, 535, -909.1,
                                                                -63.8, 700, -909.1,
                                                                -127.5, 700, -893.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_l_48",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        -63.8, 535, -909.1,
                                                        -0, 535, -925,
                                                        -0, 700, -925,
                                                        -63.8, 700, -909.1,
                                                        -50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                -63.8, 535, -909.1,
                                                                -0, 535, -925,
                                                                -0, 700, -925,
                                                                -63.8, 700, -909.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        //slow_right
                                        {
                                            type:"layer",
                                            id:"slow_r_32",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        850, 200, -500,
                                                        807.5, 200, -537.2,
                                                        807.5, 365, -537.2,
                                                        850, 365, -500,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                850, 200, -500,
                                                                807.5, 200, -537.2,
                                                                807.5, 365, -537.2,
                                                                850, 365, -500
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_31",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        807.5, 200, -537.2,
                                                        765, 200, -574.4,
                                                        765, 365, -574.4,
                                                        807.5, 365, -537.2,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                807.5, 200, -537.2,
                                                                765, 200, -574.4,
                                                                765, 365, -574.4,
                                                                807.5, 365, -537.2
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_30",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        765, 200, -574.4,
                                                        722.5, 200, -611.6,
                                                        722.5, 365, -611.6,
                                                        765, 365, -574.4,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                765, 200, -574.4,
                                                                722.5, 200, -611.6,
                                                                722.5, 365, -611.6,
                                                                765, 365, -574.4
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_29",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        722.5, 200, -611.6,
                                                        680, 200, -648.8,
                                                        680, 365, -648.8,
                                                        722.5, 365, -611.6,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                722.5, 200, -611.6,
                                                                680, 200, -648.8,
                                                                680, 365, -648.8,
                                                                722.5, 365, -611.6
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_28",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        680, 200, -648.8,
                                                        637.5, 200, -685.9,
                                                        637.5, 365, -685.9,
                                                        680, 365, -648.8,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                680, 200, -648.8,
                                                                637.5, 200, -685.9,
                                                                637.5, 365, -685.9,
                                                                680, 365, -648.8
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_27",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        637.5, 200, -685.9,
                                                        595, 200, -723.1,
                                                        595, 365, -723.1,
                                                        637.5, 365, -685.9,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                637.5, 200, -685.9,
                                                                595, 200, -723.1,
                                                                595, 365, -723.1,
                                                                637.5, 365, -685.9
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_26",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        595, 200, -723.1,
                                                        552.5, 200, -760.3,
                                                        552.5, 365, -760.3,
                                                        595, 365, -723.1,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                595, 200, -723.1,
                                                                552.5, 200, -760.3,
                                                                552.5, 365, -760.3,
                                                                595, 365, -723.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_25",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        552.5, 200, -760.3,
                                                        510, 200, -797.5,
                                                        510, 365, -797.5,
                                                        552.5, 365, -760.3,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                552.5, 200, -760.3,
                                                                510, 200, -797.5,
                                                                510, 365, -797.5,
                                                                552.5, 365, -760.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_40",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        850, 365, -500,
                                                        807.5, 365, -537.2,
                                                        807.5, 535, -537.2,
                                                        850, 535, -500,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                850, 365, -500,
                                                                807.5, 365, -537.2,
                                                                807.5, 535, -537.2,
                                                                850, 535, -500
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_39",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        807.5, 365, -537.2,
                                                        765, 365, -574.4,
                                                        765, 535, -574.4,
                                                        807.5, 535, -537.2,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                807.5, 365, -537.2,
                                                                765, 365, -574.4,
                                                                765, 535, -574.4,
                                                                807.5, 535, -537.2
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_38",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        765, 365, -574.4,
                                                        722.5, 365, -611.6,
                                                        722.5, 535, -611.6,
                                                        765, 535, -574.4,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                765, 365, -574.4,
                                                                722.5, 365, -611.6,
                                                                722.5, 535, -611.6,
                                                                765, 535, -574.4
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_37",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        722.5, 365, -611.6,
                                                        680, 365, -648.8,
                                                        680, 535, -648.8,
                                                        722.5, 535, -611.6,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                722.5, 365, -611.6,
                                                                680, 365, -648.8,
                                                                680, 535, -648.8,
                                                                722.5, 535, -611.6
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_36",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        680, 365, -648.8,
                                                        637.5, 365, -685.9,
                                                        637.5, 535, -685.9,
                                                        680, 535, -648.8,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                680, 365, -648.8,
                                                                637.5, 365, -685.9,
                                                                637.5, 535, -685.9,
                                                                680, 535, -648.8
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_35",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        637.5, 365, -685.9,
                                                        595, 365, -723.1,
                                                        595, 535, -723.1,
                                                        637.5, 535, -685.9,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                637.5, 365, -685.9,
                                                                595, 365, -723.1,
                                                                595, 535, -723.1,
                                                                637.5, 535, -685.9
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_34",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        595, 365, -723.1,
                                                        552.5, 365, -760.3,
                                                        552.5, 535, -760.3,
                                                        595, 535, -723.1,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                595, 365, -723.1,
                                                                552.5, 365, -760.3,
                                                                552.5, 535, -760.3,
                                                                595, 535, -723.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_33",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        552.5, 365, -760.3,
                                                        510, 365, -797.5,
                                                        510, 535, -797.5,
                                                        552.5, 535, -760.3,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                552.5, 365, -760.3,
                                                                510, 365, -797.5,
                                                                510, 535, -797.5,
                                                                552.5, 535, -760.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_48",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        850, 535, -500,
                                                        807.5, 535, -537.2,
                                                        807.5, 700, -537.2,
                                                        850, 700, -500,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                850, 535, -500,
                                                                807.5, 535, -537.2,
                                                                807.5, 700, -537.2,
                                                                850, 700, -500
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_47",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        807.5, 535, -537.2,
                                                        765, 535, -574.4,
                                                        765, 700, -574.4,
                                                        807.5, 700, -537.2,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                807.5, 535, -537.2,
                                                                765, 535, -574.4,
                                                                765, 700, -574.4,
                                                                807.5, 700, -537.2
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_46",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        765, 535, -574.4,
                                                        722.5, 535, -611.6,
                                                        722.5, 700, -611.6,
                                                        765, 700, -574.4,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                765, 535, -574.4,
                                                                722.5, 535, -611.6,
                                                                722.5, 700, -611.6,
                                                                765, 700, -574.4
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_45",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        722.5, 535, -611.6,
                                                        680, 535, -648.8,
                                                        680, 700, -648.8,
                                                        722.5, 700, -611.6,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                722.5, 535, -611.6,
                                                                680, 535, -648.8,
                                                                680, 700, -648.8,
                                                                722.5, 700, -611.6
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_44",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        680, 535, -648.8,
                                                        637.5, 535, -685.9,
                                                        637.5, 700, -685.9,
                                                        680, 700, -648.8,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                680, 535, -648.8,
                                                                637.5, 535, -685.9,
                                                                637.5, 700, -685.9,
                                                                680, 700, -648.8
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_43",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        637.5, 535, -685.9,
                                                        595, 535, -723.1,
                                                        595, 700, -723.1,
                                                        637.5, 700, -685.9,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                637.5, 535, -685.9,
                                                                595, 535, -723.1,
                                                                595, 700, -723.1,
                                                                637.5, 700, -685.9
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_42",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        595, 535, -723.1,
                                                        552.5, 535, -760.3,
                                                        552.5, 700, -760.3,
                                                        595, 700, -723.1,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                595, 535, -723.1,
                                                                552.5, 535, -760.3,
                                                                552.5, 700, -760.3,
                                                                595, 700, -723.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_41",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        552.5, 535, -760.3,
                                                        510, 535, -797.5,
                                                        510, 700, -797.5,
                                                        552.5, 700, -760.3,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                552.5, 535, -760.3,
                                                                510, 535, -797.5,
                                                                510, 700, -797.5,
                                                                552.5, 700, -760.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_08",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        510, 200, -797.5,
                                                        446.3, 200, -813.4,
                                                        446.3, 365, -813.4,
                                                        510, 365, -797.5,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                510, 200, -797.5,
                                                                446.3, 200, -813.4,
                                                                446.3, 365, -813.4,
                                                                510, 365, -797.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_07",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        446.3, 200, -813.4,
                                                        382.5, 200, -829.4,
                                                        382.5, 365, -829.4,
                                                        446.3, 365, -813.4,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                446.3, 200, -813.4,
                                                                382.5, 200, -829.4,
                                                                382.5, 365, -829.4,
                                                                446.3, 365, -813.4
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_06",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        382.5, 200, -829.4,
                                                        318.8, 200, -845.3,
                                                        318.8, 365, -845.3,
                                                        382.5, 365, -829.4,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                382.5, 200, -829.4,
                                                                318.8, 200, -845.3,
                                                                318.8, 365, -845.3,
                                                                382.5, 365, -829.4
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_05",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        318.8, 200, -845.3,
                                                        255, 200, -861.3,
                                                        255, 365, -861.3,
                                                        318.8, 365, -845.3,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                318.8, 200, -845.3,
                                                                255, 200, -861.3,
                                                                255, 365, -861.3,
                                                                318.8, 365, -845.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_04",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        255, 200, -861.3,
                                                        191.3, 200, -877.2,
                                                        191.3, 365, -877.2,
                                                        255, 365, -861.3,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                255, 200, -861.3,
                                                                191.3, 200, -877.2,
                                                                191.3, 365, -877.2,
                                                                255, 365, -861.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_03",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        191.3, 200, -877.2,
                                                        127.5, 200, -893.1,
                                                        127.5, 365, -893.1,
                                                        191.3, 365, -877.2,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                191.3, 200, -877.2,
                                                                127.5, 200, -893.1,
                                                                127.5, 365, -893.1,
                                                                191.3, 365, -877.2
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_02",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        127.5, 200, -893.1,
                                                        63.8, 200, -909.1,
                                                        63.8, 365, -909.1,
                                                        127.5, 365, -893.1,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                127.5, 200, -893.1,
                                                                63.8, 200, -909.1,
                                                                63.8, 365, -909.1,
                                                                127.5, 365, -893.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_01",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        63.8, 200, -909.1,
                                                        0, 200, -925,
                                                        0, 365, -925,
                                                        63.8, 365, -909.1,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                63.8, 200, -909.1,
                                                                0, 200, -925,
                                                                0, 365, -925,
                                                                63.8, 365, -909.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_16",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        510, 365, -797.5,
                                                        446.3, 365, -813.4,
                                                        446.3, 535, -813.4,
                                                        510, 535, -797.5,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                510, 365, -797.5,
                                                                446.3, 365, -813.4,
                                                                446.3, 535, -813.4,
                                                                510, 535, -797.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_15",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        446.3, 365, -813.4,
                                                        382.5, 365, -829.4,
                                                        382.5, 535, -829.4,
                                                        446.3, 535, -813.4,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                446.3, 365, -813.4,
                                                                382.5, 365, -829.4,
                                                                382.5, 535, -829.4,
                                                                446.3, 535, -813.4
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_14",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        382.5, 365, -829.4,
                                                        318.8, 365, -845.3,
                                                        318.8, 535, -845.3,
                                                        382.5, 535, -829.4,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                382.5, 365, -829.4,
                                                                318.8, 365, -845.3,
                                                                318.8, 535, -845.3,
                                                                382.5, 535, -829.4
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_13",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        318.8, 365, -845.3,
                                                        255, 365, -861.3,
                                                        255, 535, -861.3,
                                                        318.8, 535, -845.3,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                318.8, 365, -845.3,
                                                                255, 365, -861.3,
                                                                255, 535, -861.3,
                                                                318.8, 535, -845.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_12",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        255, 365, -861.3,
                                                        191.3, 365, -877.2,
                                                        191.3, 535, -877.2,
                                                        255, 535, -861.3,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                255, 365, -861.3,
                                                                191.3, 365, -877.2,
                                                                191.3, 535, -877.2,
                                                                255, 535, -861.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_11",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        191.3, 365, -877.2,
                                                        127.5, 365, -893.1,
                                                        127.5, 535, -893.1,
                                                        191.3, 535, -877.2,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                191.3, 365, -877.2,
                                                                127.5, 365, -893.1,
                                                                127.5, 535, -893.1,
                                                                191.3, 535, -877.2
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_10",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        127.5, 365, -893.1,
                                                        63.8, 365, -909.1,
                                                        63.8, 535, -909.1,
                                                        127.5, 535, -893.1,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                127.5, 365, -893.1,
                                                                63.8, 365, -909.1,
                                                                63.8, 535, -909.1,
                                                                127.5, 535, -893.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_09",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        63.8, 365, -909.1,
                                                        0, 365, -925,
                                                        0, 535, -925,
                                                        63.8, 535, -909.1,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                63.8, 365, -909.1,
                                                                0, 365, -925,
                                                                0, 535, -925,
                                                                63.8, 535, -909.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_24",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        510, 535, -797.5,
                                                        446.3, 535, -813.4,
                                                        446.3, 700, -813.4,
                                                        510, 700, -797.5,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                510, 535, -797.5,
                                                                446.3, 535, -813.4,
                                                                446.3, 700, -813.4,
                                                                510, 700, -797.5
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_23",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        446.3, 535, -813.4,
                                                        382.5, 535, -829.4,
                                                        382.5, 700, -829.4,
                                                        446.3, 700, -813.4,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                446.3, 535, -813.4,
                                                                382.5, 535, -829.4,
                                                                382.5, 700, -829.4,
                                                                446.3, 700, -813.4
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_22",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        382.5, 535, -829.4,
                                                        318.8, 535, -845.3,
                                                        318.8, 700, -845.3,
                                                        382.5, 700, -829.4,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                382.5, 535, -829.4,
                                                                318.8, 535, -845.3,
                                                                318.8, 700, -845.3,
                                                                382.5, 700, -829.4
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_21",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        318.8, 535, -845.3,
                                                        255, 535, -861.3,
                                                        255, 700, -861.3,
                                                        318.8, 700, -845.3,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                318.8, 535, -845.3,
                                                                255, 535, -861.3,
                                                                255, 700, -861.3,
                                                                318.8, 700, -845.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_20",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        255, 535, -861.3,
                                                        191.3, 535, -877.2,
                                                        191.3, 700, -877.2,
                                                        255, 700, -861.3,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                255, 535, -861.3,
                                                                191.3, 535, -877.2,
                                                                191.3, 700, -877.2,
                                                                255, 700, -861.3
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_19",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        191.3, 535, -877.2,
                                                        127.5, 535, -893.1,
                                                        127.5, 700, -893.1,
                                                        191.3, 700, -877.2,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                191.3, 535, -877.2,
                                                                127.5, 535, -893.1,
                                                                127.5, 700, -893.1,
                                                                191.3, 700, -877.2
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_18",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        127.5, 535, -893.1,
                                                        63.8, 535, -909.1,
                                                        63.8, 700, -909.1,
                                                        127.5, 700, -893.1,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                127.5, 535, -893.1,
                                                                63.8, 535, -909.1,
                                                                63.8, 700, -909.1,
                                                                127.5, 700, -893.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            type:"layer",
                                            id:"slow_r_17",
                                            enabled:false,
                                            nodes:[
                                                {
                                                    type: "geometry",
                                                    primitive: "lines",
                                                    positions: [
                                                        63.8, 535, -909.1,
                                                        0, 535, -925,
                                                        0, 700, -925,
                                                        63.8, 700, -909.1,
                                                        50, 130, 0
                                                    ],
                                                    indices: [
                                                        0, 1,
                                                        1, 2,
                                                        2, 3,
                                                        3, 0,

                                                        0, 4,
                                                        1, 4,
                                                        2, 4,
                                                        3, 4
                                                    ]
                                                },
                                                {
                                                    type: "flags",
                                                    flags: {
                                                        transparent: true
                                                    },
                                                    nodes: [{
                                                        type: "material",
                                                        color: { r: 0.9, g: 0.1, b: 0.1 },
                                                       alpha: 0.3,  
                                                        nodes: [{
                                                            type: "geometry",
                                                            primitive: "triangles",
                                                            positions: [
                                                                63.8, 535, -909.1,
                                                                0, 535, -925,
                                                                0, 700, -925,
                                                                63.8, 700, -909.1
                                                            ],
                                                            indices:[
                                                                0, 1, 2,
                                                                0, 2, 3
                                                            ]
                                                        }]
                                                    }]
                                                }
                                            ]
                                        }
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


var azimuth_chanel = true;      //true: 2-4, false: 1-3
var azimuth_index = 0;
var lastLayerNodeLeft;
var lastLayerNodeRight;
var timer;

function start_azimuth() {
    clearInterval(timer);
    if(azimuth_chanel){
        azimuth_left_position_l = 672;
        azimuth_right_position_l = 661.5; 
        azimuth_left_position_r = 0;
        azimuth_right_position_r = 10;
    }
    timer = setInterval(
        function () {
            scene.getNode('azimuth_l', function (clipsNode){
                azimuth_update(clipsNode);
            });
        }, 1000);
}

function azimuth_update(clipsNode){
    clipsNode.setEnabled(true);
    azimuth_left_position_l -= 10.5; 
    azimuth_right_position_l -= 10.5;

    if(azimuth_left_position_l === 320){
        azimuth_left_position_l = 672;
        azimuth_right_position_l = 661.5;
    }

    azimuth_l_clips[0].dist = azimuth_left_position_l;        //left
    azimuth_l_clips[1].dist = -azimuth_right_position_l;      //right
    
    clipsNode.nodes[0].nodes[0].nodes[0].setClips(azimuth_l_clips);
}

function stop_azimuth() {
    azimuth_index = 0;
    fast_index = 0;
    slow_index = 0;
    clearInterval(timer);
    for(var i = 0; i < options_azimuth_l.length; i++){
        scene.getNode(options_azimuth_l[i],
            function (myEnable) {
                myEnable.setEnabled(false);
            }
        )
    }
    for(var j = 0; j < options_azimuth_r.length; j++){
        scene.getNode(options_azimuth_r[j],
            function (myEnable) {
                myEnable.setEnabled(false);
            }
        )
    }
    show_info('stop');
}

function show_azimuth(value) {
    stop_azimuth();
    var tempValue = value - 1;
    azimuth_index = tempValue;
    scene.getNode(options_azimuth_l[tempValue], function (myEnable) {
        myEnable.setEnabled(true);
        show_info('azimuth');
    });
    scene.getNode(options_azimuth_r[tempValue], function (myEnable) {
        myEnable.setEnabled(true);
    });
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
    "azimuth_l_01",
    "azimuth_l_02",
    "azimuth_l_03",
    "azimuth_l_04",
    "azimuth_l_05",
    "azimuth_l_06",
    "azimuth_l_07",
    "azimuth_l_08",
    "azimuth_l_09",
    "azimuth_l_10",
    "azimuth_l_11",
    "azimuth_l_12",
    "azimuth_l_13",
    "azimuth_l_14",
    "azimuth_l_15",
    "azimuth_l_16",
    "azimuth_l_17",
    "azimuth_l_18",
    "azimuth_l_19",
    "azimuth_l_20",
    "azimuth_l_21",
    "azimuth_l_22",
    "azimuth_l_23",
    "azimuth_l_24",
    "azimuth_l_25",
    "azimuth_l_26",
    "azimuth_l_27",
    "azimuth_l_28",
    "azimuth_l_29",
    "azimuth_l_30",
    "azimuth_l_31",
    "azimuth_l_32",
    "azimuth_l_33",
    "azimuth_l_34",
    "azimuth_l_35",
    "azimuth_l_36",
    "azimuth_l_37",
    "azimuth_l_38",
    "azimuth_l_39",
    "azimuth_l_40",
    "azimuth_l_41",
    "azimuth_l_42",
    "azimuth_l_43",
    "azimuth_l_44",
    "azimuth_l_45",
    "azimuth_l_46",
    "azimuth_l_47",
    "azimuth_l_48",
    "azimuth_l_49",
    "azimuth_l_50",
    "azimuth_l_51",
    "azimuth_l_52",
    "azimuth_l_53",
    "azimuth_l_54",
    "azimuth_l_55",
    "azimuth_l_56",
    "azimuth_l_57",
    "azimuth_l_58",
    "azimuth_l_59",
    "azimuth_l_60",
    "azimuth_l_61",
    "azimuth_l_62",
    "azimuth_l_63",
    "azimuth_l_64"
];

options_azimuth_r = [
    "azimuth_r_01",
    "azimuth_r_02",
    "azimuth_r_03",
    "azimuth_r_04",
    "azimuth_r_05",
    "azimuth_r_06",
    "azimuth_r_07",
    "azimuth_r_08",
    "azimuth_r_09",
    "azimuth_r_10",
    "azimuth_r_11",
    "azimuth_r_12",
    "azimuth_r_13",
    "azimuth_r_14",
    "azimuth_r_15",
    "azimuth_r_16",
    "azimuth_r_17",
    "azimuth_r_18",
    "azimuth_r_19",
    "azimuth_r_20",
    "azimuth_r_21",
    "azimuth_r_22",
    "azimuth_r_23",
    "azimuth_r_24",
    "azimuth_r_25",
    "azimuth_r_26",
    "azimuth_r_27",
    "azimuth_r_28",
    "azimuth_r_29",
    "azimuth_r_30",
    "azimuth_r_31",
    "azimuth_r_32",
    "azimuth_r_33",
    "azimuth_r_34",
    "azimuth_r_35",
    "azimuth_r_36",
    "azimuth_r_37",
    "azimuth_r_38",
    "azimuth_r_39",
    "azimuth_r_40",
    "azimuth_r_41",
    "azimuth_r_42",
    "azimuth_r_43",
    "azimuth_r_44",
    "azimuth_r_45",
    "azimuth_r_46",
    "azimuth_r_47",
    "azimuth_r_48",
    "azimuth_r_49",
    "azimuth_r_50",
    "azimuth_r_51",
    "azimuth_r_52",
    "azimuth_r_53",
    "azimuth_r_54",
    "azimuth_r_55",
    "azimuth_r_56",
    "azimuth_r_57",
    "azimuth_r_58",
    "azimuth_r_59",
    "azimuth_r_60",
    "azimuth_r_61",
    "azimuth_r_62",
    "azimuth_r_63",
    "azimuth_r_64"
];

options_fast_l = [
    "fast_l_01",
    "fast_l_02",
    "fast_l_03",
    "fast_l_04",
    "fast_l_05",
    "fast_l_06",
    "fast_l_07",
    "fast_l_08"
];

options_fast_r = [
    "fast_r_01",
    "fast_r_02",
    "fast_r_03",
    "fast_r_04",
    "fast_r_05",
    "fast_r_06",
    "fast_r_07",
    "fast_r_08"
];

options_slow_l = [
    "slow_l_01",
    "slow_l_02",
    "slow_l_03",
    "slow_l_04",
    "slow_l_05",
    "slow_l_06",
    "slow_l_07",
    "slow_l_08",
    "slow_l_09",
    "slow_l_10",
    "slow_l_11",
    "slow_l_12",
    "slow_l_13",
    "slow_l_14",
    "slow_l_15",
    "slow_l_16",
    "slow_l_17",
    "slow_l_18",
    "slow_l_19",
    "slow_l_20",
    "slow_l_21",
    "slow_l_22",
    "slow_l_23",
    "slow_l_24",
    "slow_l_25",
    "slow_l_26",
    "slow_l_27",
    "slow_l_28",
    "slow_l_29",
    "slow_l_30",
    "slow_l_31",
    "slow_l_32",
    "slow_l_33",
    "slow_l_34",
    "slow_l_35",
    "slow_l_36",
    "slow_l_37",
    "slow_l_38",
    "slow_l_39",
    "slow_l_40",
    "slow_l_41",
    "slow_l_42",
    "slow_l_43",
    "slow_l_44",
    "slow_l_45",
    "slow_l_46",
    "slow_l_47",
    "slow_l_48"
];

options_slow_r = [
    "slow_r_01",
    "slow_r_02",
    "slow_r_03",
    "slow_r_04",
    "slow_r_05",
    "slow_r_06",
    "slow_r_07",
    "slow_r_08",
    "slow_r_09",
    "slow_r_10",
    "slow_r_11",
    "slow_r_12",
    "slow_r_13",
    "slow_r_14",
    "slow_r_15",
    "slow_r_16",
    "slow_r_17",
    "slow_r_18",
    "slow_r_19",
    "slow_r_20",
    "slow_r_21",
    "slow_r_22",
    "slow_r_23",
    "slow_r_24",
    "slow_r_25",
    "slow_r_26",
    "slow_r_27",
    "slow_r_28",
    "slow_r_29",
    "slow_r_30",
    "slow_r_31",
    "slow_r_32",
    "slow_r_33",
    "slow_r_34",
    "slow_r_35",
    "slow_r_36",
    "slow_r_37",
    "slow_r_38",
    "slow_r_39",
    "slow_r_40",
    "slow_r_41",
    "slow_r_42",
    "slow_r_43",
    "slow_r_44",
    "slow_r_45",
    "slow_r_46",
    "slow_r_47",
    "slow_r_48"
];