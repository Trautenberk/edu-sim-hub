import { Example } from "Editor/Feature/SimObjectManagementSlice";
import { IEditorObject } from "Editor/Model/EditorObject";


export const THIRD_EXAMPLE : Example = {
    editorObjectCounter: 10,
    pointCounter: 25,
    objects: {
     integrator_1: {
        id: 'integrator_1',
        className: 'Integrator',
        endPointIds: [
          'Point_2',
          'Point_3'
        ],
        coordinates: {
          x: 497,
          y: 160
        },
        initialValue: 0,
        label: 'y\' => y'
      } as IEditorObject,
      signal_2: {
        id: 'signal_2',
        className: 'Signal',
        pointsId: [
          'Point_3',
          'Point_4'
        ],
        from: {
          objId: 'integrator_1',
          pointId: 'Point_3'
        },
        to: {
          objId: 'sub_10',
          pointId: 'Point_36'
        },
        allowedClassNames: []
      } as IEditorObject,
      integrator_3: {
        id: 'integrator_3',
        className: 'Integrator',
        endPointIds: [
          'Point_5',
          'Point_6'
        ],
        coordinates: {
          x: 289,
          y: 161
        },
        initialValue: 0,
        label: 'y\'\' => y\''
      } as IEditorObject,
      signal_5: {
        id: 'signal_5',
        className: 'Signal',
        pointsId: [
          'Point_6',
          'Point_8'
        ],
        from: {
          objId: 'integrator_3',
          pointId: 'Point_6'
        },
        to: {
          objId: 'integrator_1',
          pointId: 'Point_2'
        },
        allowedClassNames: []
      } as IEditorObject,
      constant_8: {
        id: 'constant_8',
        className: 'Constant',
        endPointIds: [
          'Point_17'
        ],
        coordinates: {
          x: 603,
          y: 62
        },
        value: 3,
        label: 'k'
      } as IEditorObject,
      sub_10: {
        id: 'sub_10',
        className: 'Sub',
        endPointIds: [
          'Point_35',
          'Point_36',
          'Point_37'
        ],
        coordinates: {
          x: 757,
          y: 142
        },
        label: 'k - y'
      } as IEditorObject,
      signal_11: {
        id: 'signal_11',
        className: 'Signal',
        pointsId: [
          'Point_17',
          'Point_38'
        ],
        from: {
          objId: 'constant_8',
          pointId: 'Point_17'
        },
        to: {
          objId: 'sub_10',
          pointId: 'Point_35'
        },
        allowedClassNames: []
      } as IEditorObject,
      signal_12: {
        id: 'signal_12',
        className: 'Signal',
        pointsId: [
          'Point_37',
          'Point_40',
          'Point_41',
          'Point_42',
          'Point_43',
          'Point_39'
        ],
        from: {
          objId: 'sub_10',
          pointId: 'Point_37'
        },
        to: {
          objId: 'integrator_3',
          pointId: 'Point_5'
        },
        allowedClassNames: []
      } as IEditorObject
    },
    edgeObjectsIds: [
      'signal_11',
      'signal_12'
    ],
    selectedObjectId: null,
    endPoints: {
      Point_0: {
        id: 'Point_0',
        coords: {
          x: 688,
          y: 194
        },
        ownerId: 'gain_0',
        spawnedObjCnt: 0,
        bindings: [],
        type: 0,
        connectable: true
      },
      Point_1: {
        id: 'Point_1',
        coords: {
          x: 758,
          y: 194
        },
        ownerId: 'gain_0',
        spawnedObjCnt: 0,
        bindings: [],
        type: 2,
        arrowDirection: 1,
        maxSpawnedObj: 1,
        connectable: false
      },
      Point_2: {
        id: 'Point_2',
        coords: {
          x: 496,
          y: 195
        },
        ownerId: 'integrator_1',
        spawnedObjCnt: 0,
        bindings: [
          'Point_8'
        ],
        type: 0,
        connectable: true
      },
      Point_3: {
        id: 'Point_3',
        coords: {
          x: 566,
          y: 195
        },
        ownerId: 'integrator_1',
        spawnedObjCnt: 1,
        bindings: [],
        type: 2,
        arrowDirection: 1,
        maxSpawnedObj: 1,
        connectable: false
      },
      Point_5: {
        id: 'Point_5',
        coords: {
          x: 289,
          y: 195
        },
        ownerId: 'integrator_3',
        spawnedObjCnt: 0,
        bindings: [
          'Point_39'
        ],
        type: 0,
        connectable: true
      },
      Point_6: {
        id: 'Point_6',
        coords: {
          x: 359,
          y: 195
        },
        ownerId: 'integrator_3',
        spawnedObjCnt: 1,
        bindings: [],
        type: 2,
        arrowDirection: 1,
        maxSpawnedObj: 1,
        connectable: false
      },
      Point_13: {
        id: 'Point_13',
        coords: {
          x: 839,
          y: 196
        },
        ownerId: 'add_6',
        spawnedObjCnt: 0,
        bindings: [],
        type: 0,
        connectable: true
      },
      Point_14: {
        id: 'Point_14',
        coords: {
          x: 839,
          y: 236
        },
        ownerId: 'add_6',
        spawnedObjCnt: 0,
        bindings: [],
        type: 0,
        connectable: true
      },
      Point_15: {
        id: 'Point_15',
        coords: {
          x: 909,
          y: 216
        },
        ownerId: 'add_6',
        spawnedObjCnt: 0,
        bindings: [],
        type: 2,
        arrowDirection: 1,
        maxSpawnedObj: 1,
        connectable: false
      },
      Point_17: {
        id: 'Point_17',
        coords: {
          x: 673,
          y: 98
        },
        ownerId: 'constant_8',
        spawnedObjCnt: 1,
        bindings: [],
        type: 2,
        arrowDirection: 1,
        maxSpawnedObj: 1,
        connectable: false
      },
      Point_35: {
        id: 'Point_35',
        coords: {
          x: 757,
          y: 156
        },
        ownerId: 'sub_10',
        spawnedObjCnt: 0,
        bindings: [
          'Point_38'
        ],
        type: 0,
        connectable: true
      },
      Point_36: {
        id: 'Point_36',
        coords: {
          x: 757,
          y: 196
        },
        ownerId: 'sub_10',
        spawnedObjCnt: 0,
        bindings: [
          'Point_4'
        ],
        type: 0,
        connectable: true
      },
      Point_37: {
        id: 'Point_37',
        coords: {
          x: 827,
          y: 176
        },
        ownerId: 'sub_10',
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
          x: 757,
          y: 196
        }
      },
      Point_8: {
        id: 'Point_8',
        coords: {
          x: 496,
          y: 195
        }
      },
      Point_38: {
        id: 'Point_38',
        coords: {
          x: 757,
          y: 156
        }
      },
      Point_39: {
        id: 'Point_39',
        coords: {
          x: 289,
          y: 195
        }
      },
      Point_40: {
        id: 'Point_40',
        coords: {
          x: 870,
          y: 176.5
        }
      },
      Point_41: {
        id: 'Point_41',
        coords: {
          x: 871,
          y: 276.75
        }
      },
      Point_42: {
        id: 'Point_42',
        coords: {
          x: 239,
          y: 281.375
        }
      },
      Point_43: {
        id: 'Point_43',
        coords: {
          x: 240,
          y: 196.1875
        }
      }
    }
}