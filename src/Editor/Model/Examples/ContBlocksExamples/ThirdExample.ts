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
      gain_5: {
        id: 'gain_5',
        className: 'Gain',
        endPointIds: [
          'Point_7',
          'Point_8'
        ],
        coordinates: {
          x: 408,
          y: 185
        },
        label: '-y',
        gain: -1
      } as IEditorObject,
      signal_10: {
        id: 'signal_10',
        className: 'Signal',
        pointsId: [
          'Point_3',
          'Point_36',
          'Point_37',
          'Point_38',
          'Point_39',
          'Point_35'
        ],
        from: {
          objId: 'integrator_1',
          pointId: 'Point_3'
        },
        to: {
          objId: 'gain_5',
          pointId: 'Point_7'
        },
        allowedClassNames: []
      } as IEditorObject,
      signal_11: {
        id: 'signal_11',
        className: 'Signal',
        pointsId: [
          'Point_8',
          'Point_40'
        ],
        from: {
          objId: 'gain_5',
          pointId: 'Point_8'
        },
        to: {
          objId: 'integrator_0',
          pointId: 'Point_0'
        },
        allowedClassNames: []
      } as IEditorObject
    },
    edgeObjectsIds: [
      'signal_2',
      'signal_10',
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
          'Point_40'
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
          x: 180,
          y: 200
        },
        ownerId: 'constant_3',
        spawnedObjCnt: 0,
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
          x: 408,
          y: 219
        },
        ownerId: 'gain_5',
        spawnedObjCnt: 0,
        bindings: [
          'Point_35'
        ],
        type: 0,
        connectable: true
      },
      Point_8: {
        id: 'Point_8',
        coords: {
          x: 478,
          y: 219
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
          x: 424,
          y: 199
        },
        ownerId: 'mul_7',
        spawnedObjCnt: 0,
        bindings: [],
        type: 0,
        connectable: true
      },
      Point_11: {
        id: 'Point_11',
        coords: {
          x: 424,
          y: 239
        },
        ownerId: 'mul_7',
        spawnedObjCnt: 0,
        bindings: [],
        type: 0,
        connectable: true
      },
      Point_12: {
        id: 'Point_12',
        coords: {
          x: 494,
          y: 219
        },
        ownerId: 'mul_7',
        spawnedObjCnt: 0,
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
      Point_35: {
        id: 'Point_35',
        coords: {
          x: 408,
          y: 219
        }
      },
      Point_36: {
        id: 'Point_36',
        coords: {
          x: 780,
          y: 221
        }
      },
      Point_37: {
        id: 'Point_37',
        coords: {
          x: 780.5,
          y: 279.5
        }
      },
      Point_38: {
        id: 'Point_38',
        coords: {
          x: 348.75,
          y: 278.25
        }
      },
      Point_39: {
        id: 'Point_39',
        coords: {
          x: 347.875,
          y: 218.125
        }
      },
      Point_40: {
        id: 'Point_40',
        coords: {
          x: 552,
          y: 219
        }
      }
    },
}