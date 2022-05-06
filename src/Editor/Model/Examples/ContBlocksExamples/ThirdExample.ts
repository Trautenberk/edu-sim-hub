import { Example } from "Editor/Feature/SimObjectManagementSlice";
import { IEditorObject } from "Editor/Model/EditorObject";


export const THIRD_EXAMPLE : Example = {
    editorObjectCounter: 10,
    pointCounter: 25,
    objects: {
      integrator_0: {
        id: 'integrator_0',
        className: 'Integrator',
        endPointIds: [
          'Point_0',
          'Point_1'
        ],
        coordinates: {
          x: 552,
          y: 185
        },
        label: 'y\'\' => y\'',
        initialValue: 1
      } as IEditorObject,
      integrator_1: {
        id: 'integrator_1',
        className: 'Integrator',
        endPointIds: [
          'Point_2',
          'Point_3'
        ],
        coordinates: {
          x: 686,
          y: 186
        },
        label: 'y\' => y',
        initialValue: 0
      } as IEditorObject,
      signal_2: {
        id: 'signal_2',
        className: 'Signal',
        pointsId: [
          'Point_1',
          'Point_4'
        ],
        from: {
          objId: 'integrator_0',
          pointId: 'Point_1'
        },
        to: {
          objId: 'integrator_1',
          pointId: 'Point_2'
        },
        allowedClassNames: []
      } as IEditorObject,
      constant_3: {
        id: 'constant_3',
        className: 'Constant',
        endPointIds: [
          'Point_5'
        ],
        coordinates: {
          x: 83,
          y: 165
        },
        label: 'k',
        value: 1
      } as IEditorObject,
      gain_5: {
        id: 'gain_5',
        className: 'Gain',
        endPointIds: [
          'Point_7',
          'Point_8'
        ],
        coordinates: {
          x: 246,
          y: 165
        },
        label: '-k',
        gain: -1
      } as IEditorObject,
      signal_6: {
        id: 'signal_6',
        className: 'Signal',
        pointsId: [
          'Point_5',
          'Point_9'
        ],
        from: {
          objId: 'constant_3',
          pointId: 'Point_5'
        },
        to: {
          objId: 'gain_5',
          pointId: 'Point_7'
        },
        allowedClassNames: []
      } as IEditorObject,
      mul_7: {
        id: 'mul_7',
        className: 'Mul',
        endPointIds: [
          'Point_10',
          'Point_11',
          'Point_12'
        ],
        coordinates: {
          x: 413,
          y: 184
        },
        label: '-k * y'
      } as IEditorObject,
      signal_8: {
        id: 'signal_8',
        className: 'Signal',
        pointsId: [
          'Point_8',
          'Point_25',
          'Point_13'
        ],
        from: {
          objId: 'gain_5',
          pointId: 'Point_8'
        },
        to: {
          objId: 'mul_7',
          pointId: 'Point_10'
        },
        allowedClassNames: []
      } as IEditorObject,
      signal_9: {
        id: 'signal_9',
        className: 'Signal',
        pointsId: [
          'Point_3',
          'Point_22',
          'Point_20',
          'Point_23',
          'Point_24',
          'Point_14'
        ],
        from: {
          objId: 'integrator_1',
          pointId: 'Point_3'
        },
        to: {
          objId: 'mul_7',
          pointId: 'Point_11'
        },
        allowedClassNames: []
      } as IEditorObject,
      signal_11: {
        id: 'signal_11',
        className: 'Signal',
        pointsId: [
          'Point_12',
          'Point_21'
        ],
        from: {
          objId: 'mul_7',
          pointId: 'Point_12'
        },
        to: {
          objId: 'integrator_0',
          pointId: 'Point_0'
        },
        allowedClassNames: []
      } as IEditorObject
    },
    edgeObjectsIds: [
      'signal_11'
    ],
    selectedObjectId: null,
    endPoints: {
      Point_0: {
        id: 'Point_0',
        coords: {
          x: 552,
          y: 219
        },
        ownerId: 'integrator_0',
        spawnedObjCnt: 0,
        bindings: [
          'Point_21'
        ],
        type: 0,
        connectable: true
      },
      Point_1: {
        id: 'Point_1',
        coords: {
          x: 622,
          y: 219
        },
        ownerId: 'integrator_0',
        spawnedObjCnt: 1,
        bindings: [],
        type: 2,
        arrowDirection: 1,
        maxSpawnedObj: 3,
        connectable: false
      },
      Point_2: {
        id: 'Point_2',
        coords: {
          x: 685,
          y: 221
        },
        ownerId: 'integrator_1',
        spawnedObjCnt: 0,
        bindings: [
          'Point_4'
        ],
        type: 0,
        connectable: true
      },
      Point_3: {
        id: 'Point_3',
        coords: {
          x: 755,
          y: 221
        },
        ownerId: 'integrator_1',
        spawnedObjCnt: 1,
        bindings: [],
        type: 2,
        arrowDirection: 1,
        maxSpawnedObj: 3,
        connectable: false
      },
      Point_5: {
        id: 'Point_5',
        coords: {
          x: 153,
          y: 200
        },
        ownerId: 'constant_3',
        spawnedObjCnt: 1,
        bindings: [],
        type: 2,
        arrowDirection: 1,
        maxSpawnedObj: 3,
        connectable: false
      },
      Point_6: {
        id: 'Point_6',
        coords: {
          x: 220,
          y: 185
        },
        ownerId: 'constant_4',
        spawnedObjCnt: 0,
        bindings: [],
        type: 2,
        arrowDirection: 1,
        maxSpawnedObj: 3,
        connectable: false
      },
      Point_7: {
        id: 'Point_7',
        coords: {
          x: 246,
          y: 201
        },
        ownerId: 'gain_5',
        spawnedObjCnt: 0,
        bindings: [
          'Point_9'
        ],
        type: 0,
        connectable: true
      },
      Point_8: {
        id: 'Point_8',
        coords: {
          x: 316,
          y: 201
        },
        ownerId: 'gain_5',
        spawnedObjCnt: 1,
        bindings: [],
        type: 2,
        arrowDirection: 1,
        maxSpawnedObj: 3,
        connectable: false
      },
      Point_10: {
        id: 'Point_10',
        coords: {
          x: 412,
          y: 199
        },
        ownerId: 'mul_7',
        spawnedObjCnt: 0,
        bindings: [
          'Point_13'
        ],
        type: 0,
        connectable: true
      },
      Point_11: {
        id: 'Point_11',
        coords: {
          x: 412,
          y: 239
        },
        ownerId: 'mul_7',
        spawnedObjCnt: 0,
        bindings: [
          'Point_14'
        ],
        type: 0,
        connectable: true
      },
      Point_12: {
        id: 'Point_12',
        coords: {
          x: 482,
          y: 219
        },
        ownerId: 'mul_7',
        spawnedObjCnt: 1,
        bindings: [],
        type: 2,
        arrowDirection: 1,
        maxSpawnedObj: 3,
        connectable: false
      }
    },
    points: {
      Point_4: {
        id: 'Point_4',
        coords: {
          x: 685,
          y: 221
        }
      },
      Point_9: {
        id: 'Point_9',
        coords: {
          x: 246,
          y: 201
        }
      },
      Point_13: {
        id: 'Point_13',
        coords: {
          x: 412,
          y: 199
        }
      },
      Point_14: {
        id: 'Point_14',
        coords: {
          x: 412,
          y: 239
        }
      },
      Point_20: {
        id: 'Point_20',
        coords: {
          x: 817,
          y: 327.5
        }
      },
      Point_21: {
        id: 'Point_21',
        coords: {
          x: 552,
          y: 219
        }
      },
      Point_22: {
        id: 'Point_22',
        coords: {
          x: 815.5,
          y: 221.75
        }
      },
      Point_23: {
        id: 'Point_23',
        coords: {
          x: 344,
          y: 325.75
        }
      },
      Point_24: {
        id: 'Point_24',
        coords: {
          x: 345,
          y: 239.875
        }
      },
      Point_25: {
        id: 'Point_25',
        coords: {
          x: 352,
          y: 199.5
        }
      }
    },
}