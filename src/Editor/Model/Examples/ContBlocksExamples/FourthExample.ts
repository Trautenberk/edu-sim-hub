import { Example } from "Editor/Feature/SimObjectManagementSlice";
import { IEditorObject } from "Editor/Model/EditorObject";


export const VAN_DER_POL_OSCILATOR : Example = {
    editorObjectCounter : 22,
    pointCounter: 50,
    objects : {
       integrator_0: {
        id: 'integrator_0',
        className: 'Integrator',
        endPointIds: [
          'Point_0',
          'Point_1'
        ],
        coordinates: {
          x: 142.5,
          y: 291.25
        },
        label: 'x\'\' => x\'',
        initialValue: 2
      } as  IEditorObject,
      integrator_1: {
        id: 'integrator_1',
        className: 'Integrator',
        endPointIds: [
          'Point_2',
          'Point_3'
        ],
        coordinates: {
          x: 336.25,
          y: 290
        },
        label: 'x\' => x',
        initialValue: 0.1
      } as  IEditorObject,
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
      } as  IEditorObject,
      mul_3: {
        id: 'mul_3',
        className: 'Mul',
        endPointIds: [
          'Point_5',
          'Point_6',
          'Point_7'
        ],
        coordinates: {
          x: 523.75,
          y: 290
        },
        label: 'x^2'
      } as  IEditorObject,
      signal_4: {
        id: 'signal_4',
        className: 'Signal',
        pointsId: [
          'Point_3',
          'Point_29',
          'Point_8'
        ],
        from: {
          objId: 'integrator_1',
          pointId: 'Point_3'
        },
        to: {
          objId: 'mul_3',
          pointId: 'Point_5'
        },
        allowedClassNames: []
      } as  IEditorObject,
      signal_5: {
        id: 'signal_5',
        className: 'Signal',
        pointsId: [
          'Point_3',
          'Point_30',
          'Point_9'
        ],
        from: {
          objId: 'integrator_1',
          pointId: 'Point_3'
        },
        to: {
          objId: 'mul_3',
          pointId: 'Point_6'
        },
        allowedClassNames: []
      } as  IEditorObject,
      sub_6: {
        id: 'sub_6',
        className: 'Sub',
        endPointIds: [
          'Point_10',
          'Point_11',
          'Point_12'
        ],
        coordinates: {
          x: 691.25,
          y: 271.25
        },
        label: '(1 - x^2)'
      } as  IEditorObject,
      signal_7: {
        id: 'signal_7',
        className: 'Signal',
        pointsId: [
          'Point_7',
          'Point_13'
        ],
        from: {
          objId: 'mul_3',
          pointId: 'Point_7'
        },
        to: {
          objId: 'sub_6',
          pointId: 'Point_11'
        },
        allowedClassNames: []
      } as  IEditorObject,
      constant_8: {
        id: 'constant_8',
        className: 'Constant',
        endPointIds: [
          'Point_14'
        ],
        coordinates: {
          x: 578.75,
          y: 188.75
        },
        label: '',
        value: 1
      } as  IEditorObject,
      signal_9: {
        id: 'signal_9',
        className: 'Signal',
        pointsId: [
          'Point_14',
          'Point_15'
        ],
        from: {
          objId: 'constant_8',
          pointId: 'Point_14'
        },
        to: {
          objId: 'sub_6',
          pointId: 'Point_10'
        },
        allowedClassNames: []
      } as  IEditorObject,
      mul_10: {
        id: 'mul_10',
        className: 'Mul',
        endPointIds: [
          'Point_16',
          'Point_17',
          'Point_18'
        ],
        coordinates: {
          x: 357.5,
          y: 110
        },
        label: 'a * x\''
      } as  IEditorObject,
      constant_11: {
        id: 'constant_11',
        className: 'Constant',
        endPointIds: [
          'Point_19'
        ],
        coordinates: {
          x: 187.5,
          y: 90
        },
        label: 'a',
        value: 1
      } as  IEditorObject,
      signal_12: {
        id: 'signal_12',
        className: 'Signal',
        pointsId: [
          'Point_19',
          'Point_20'
        ],
        from: {
          objId: 'constant_11',
          pointId: 'Point_19'
        },
        to: {
          objId: 'mul_10',
          pointId: 'Point_16'
        },
        allowedClassNames: []
      } as  IEditorObject,
      signal_13: {
        id: 'signal_13',
        className: 'Signal',
        pointsId: [
          'Point_1',
          'Point_21'
        ],
        from: {
          objId: 'integrator_0',
          pointId: 'Point_1'
        },
        to: {
          objId: 'mul_10',
          pointId: 'Point_17'
        },
        allowedClassNames: []
      } as  IEditorObject,
      mul_14: {
        id: 'mul_14',
        className: 'Mul',
        endPointIds: [
          'Point_22',
          'Point_23',
          'Point_24'
        ],
        coordinates: {
          x: 862.5,
          y: 252.5
        },
        label: 'ax\' * (1 - x^2)'
      } as  IEditorObject,
      signal_15: {
        id: 'signal_15',
        className: 'Signal',
        pointsId: [
          'Point_12',
          'Point_25'
        ],
        from: {
          objId: 'sub_6',
          pointId: 'Point_12'
        },
        to: {
          objId: 'mul_14',
          pointId: 'Point_23'
        },
        allowedClassNames: []
      } as  IEditorObject,
      signal_16: {
        id: 'signal_16',
        className: 'Signal',
        pointsId: [
          'Point_18',
          'Point_27',
          'Point_28',
          'Point_26'
        ],
        from: {
          objId: 'mul_10',
          pointId: 'Point_18'
        },
        to: {
          objId: 'mul_14',
          pointId: 'Point_22'
        },
        allowedClassNames: []
      } as  IEditorObject,
      sub_18: {
        id: 'sub_18',
        className: 'Sub',
        endPointIds: [
          'Point_36',
          'Point_37',
          'Point_38'
        ],
        coordinates: {
          x: 1013.75,
          y: 273.75
        },
        label: 'ax\' * (1 -x^2 - x)'
      } as  IEditorObject,
      signal_19: {
        id: 'signal_19',
        className: 'Signal',
        pointsId: [
          'Point_3',
          'Point_40',
          'Point_43',
          'Point_41',
          'Point_39'
        ],
        from: {
          objId: 'integrator_1',
          pointId: 'Point_3'
        },
        to: {
          objId: 'sub_18',
          pointId: 'Point_37'
        },
        allowedClassNames: []
      } as  IEditorObject,
      signal_20: {
        id: 'signal_20',
        className: 'Signal',
        pointsId: [
          'Point_24',
          'Point_42'
        ],
        from: {
          objId: 'mul_14',
          pointId: 'Point_24'
        },
        to: {
          objId: 'sub_18',
          pointId: 'Point_36'
        },
        allowedClassNames: []
      } as  IEditorObject,
      signal_21: {
        id: 'signal_21',
        className: 'Signal',
        pointsId: [
          'Point_38',
          'Point_45',
          'Point_46',
          'Point_47',
          'Point_48',
          'Point_44'
        ],
        from: {
          objId: 'sub_18',
          pointId: 'Point_38'
        },
        to: {
          objId: 'integrator_0',
          pointId: 'Point_0'
        },
        allowedClassNames: []
      } as  IEditorObject
    },
    edgeObjectsIds: [
      'signal_2',
      'signal_4',
      'signal_5',
      'signal_7',
      'signal_9',
      'signal_12',
      'signal_13',
      'signal_15',
      'signal_16',
      'signal_19',
      'signal_20',
      'signal_21'
    ],
    selectedObjectId: 'integrator_1',
    endPoints: {
      Point_0: {
        id: 'Point_0',
        coords: {
          x: 141.25,
          y: 326.25
        },
        ownerId: 'integrator_0',
        spawnedObjCnt: 0,
        bindings: [
          'Point_44'
        ],
        type: 0,
        connectable: true
      },
      Point_1: {
        id: 'Point_1',
        coords: {
          x: 211.25,
          y: 326.25
        },
        ownerId: 'integrator_0',
        spawnedObjCnt: 2,
        bindings: [],
        type: 2,
        arrowDirection: 1,
        maxSpawnedObj: 3,
        connectable: false
      },
      Point_2: {
        id: 'Point_2',
        coords: {
          x: 336.25,
          y: 323.75
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
          x: 406.25,
          y: 323.75
        },
        ownerId: 'integrator_1',
        spawnedObjCnt: 3,
        bindings: [],
        type: 2,
        arrowDirection: 1,
        maxSpawnedObj: 3,
        connectable: false
      },
      Point_5: {
        id: 'Point_5',
        coords: {
          x: 525,
          y: 305
        },
        ownerId: 'mul_3',
        spawnedObjCnt: 0,
        bindings: [
          'Point_8'
        ],
        type: 0,
        connectable: true
      },
      Point_6: {
        id: 'Point_6',
        coords: {
          x: 525,
          y: 345
        },
        ownerId: 'mul_3',
        spawnedObjCnt: 0,
        bindings: [
          'Point_9'
        ],
        type: 0,
        connectable: true
      },
      Point_7: {
        id: 'Point_7',
        coords: {
          x: 595,
          y: 325
        },
        ownerId: 'mul_3',
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
          x: 690,
          y: 286.25
        },
        ownerId: 'sub_6',
        spawnedObjCnt: 0,
        bindings: [
          'Point_15'
        ],
        type: 0,
        connectable: true
      },
      Point_11: {
        id: 'Point_11',
        coords: {
          x: 690,
          y: 326.25
        },
        ownerId: 'sub_6',
        spawnedObjCnt: 0,
        bindings: [
          'Point_13'
        ],
        type: 0,
        connectable: true
      },
      Point_12: {
        id: 'Point_12',
        coords: {
          x: 760,
          y: 306.25
        },
        ownerId: 'sub_6',
        spawnedObjCnt: 1,
        bindings: [],
        type: 2,
        arrowDirection: 1,
        maxSpawnedObj: 3,
        connectable: false
      },
      Point_14: {
        id: 'Point_14',
        coords: {
          x: 647.5,
          y: 223.75
        },
        ownerId: 'constant_8',
        spawnedObjCnt: 1,
        bindings: [],
        type: 2,
        arrowDirection: 1,
        maxSpawnedObj: 3,
        connectable: false
      },
      Point_16: {
        id: 'Point_16',
        coords: {
          x: 357.5,
          y: 126.25
        },
        ownerId: 'mul_10',
        spawnedObjCnt: 0,
        bindings: [
          'Point_20'
        ],
        type: 0,
        connectable: true
      },
      Point_17: {
        id: 'Point_17',
        coords: {
          x: 357.5,
          y: 166.25
        },
        ownerId: 'mul_10',
        spawnedObjCnt: 0,
        bindings: [
          'Point_21'
        ],
        type: 0,
        connectable: true
      },
      Point_18: {
        id: 'Point_18',
        coords: {
          x: 427.5,
          y: 146.25
        },
        ownerId: 'mul_10',
        spawnedObjCnt: 1,
        bindings: [],
        type: 2,
        arrowDirection: 1,
        maxSpawnedObj: 3,
        connectable: false
      },
      Point_19: {
        id: 'Point_19',
        coords: {
          x: 256.25,
          y: 125
        },
        ownerId: 'constant_11',
        spawnedObjCnt: 1,
        bindings: [],
        type: 2,
        arrowDirection: 1,
        maxSpawnedObj: 3,
        connectable: false
      },
      Point_22: {
        id: 'Point_22',
        coords: {
          x: 862.5,
          y: 267.5
        },
        ownerId: 'mul_14',
        spawnedObjCnt: 0,
        bindings: [
          'Point_26'
        ],
        type: 0,
        connectable: true
      },
      Point_23: {
        id: 'Point_23',
        coords: {
          x: 862.5,
          y: 307.5
        },
        ownerId: 'mul_14',
        spawnedObjCnt: 0,
        bindings: [
          'Point_25'
        ],
        type: 0,
        connectable: true
      },
      Point_24: {
        id: 'Point_24',
        coords: {
          x: 932.5,
          y: 287.5
        },
        ownerId: 'mul_14',
        spawnedObjCnt: 1,
        bindings: [],
        type: 2,
        arrowDirection: 1,
        maxSpawnedObj: 3,
        connectable: false
      },
      Point_36: {
        id: 'Point_36',
        coords: {
          x: 1013.75,
          y: 287.5
        },
        ownerId: 'sub_18',
        spawnedObjCnt: 0,
        bindings: [
          'Point_42'
        ],
        type: 0,
        connectable: true
      },
      Point_37: {
        id: 'Point_37',
        coords: {
          x: 1013.75,
          y: 327.5
        },
        ownerId: 'sub_18',
        spawnedObjCnt: 0,
        bindings: [
          'Point_39'
        ],
        type: 0,
        connectable: true
      },
      Point_38: {
        id: 'Point_38',
        coords: {
          x: 1083.75,
          y: 307.5
        },
        ownerId: 'sub_18',
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
          x: 336.25,
          y: 323.75
        }
      },
      Point_8: {
        id: 'Point_8',
        coords: {
          x: 525,
          y: 305
        }
      },
      Point_9: {
        id: 'Point_9',
        coords: {
          x: 525,
          y: 345
        }
      },
      Point_13: {
        id: 'Point_13',
        coords: {
          x: 690,
          y: 326.25
        }
      },
      Point_15: {
        id: 'Point_15',
        coords: {
          x: 690,
          y: 286.25
        }
      },
      Point_20: {
        id: 'Point_20',
        coords: {
          x: 357.5,
          y: 126.25
        }
      },
      Point_21: {
        id: 'Point_21',
        coords: {
          x: 357.5,
          y: 166.25
        }
      },
      Point_25: {
        id: 'Point_25',
        coords: {
          x: 862.5,
          y: 307.5
        }
      },
      Point_26: {
        id: 'Point_26',
        coords: {
          x: 862.5,
          y: 267.5
        }
      },
      Point_27: {
        id: 'Point_27',
        coords: {
          x: 811.875,
          y: 145
        }
      },
      Point_28: {
        id: 'Point_28',
        coords: {
          x: 815.9375,
          y: 268.75
        }
      },
      Point_29: {
        id: 'Point_29',
        coords: {
          x: 446.875,
          y: 305.625
        }
      },
      Point_30: {
        id: 'Point_30',
        coords: {
          x: 450.625,
          y: 345.625
        }
      },
      Point_39: {
        id: 'Point_39',
        coords: {
          x: 1013.75,
          y: 327.5
        }
      },
      Point_40: {
        id: 'Point_40',
        coords: {
          x: 450,
          y: 383.75
        }
      },
      Point_41: {
        id: 'Point_41',
        coords: {
          x: 930,
          y: 378.75
        }
      },
      Point_42: {
        id: 'Point_42',
        coords: {
          x: 1013.75,
          y: 287.5
        }
      },
      Point_43: {
        id: 'Point_43',
        coords: {
          x: 524.375,
          y: 385.625
        }
      },
      Point_44: {
        id: 'Point_44',
        coords: {
          x: 141.25,
          y: 326.25
        }
      },
      Point_45: {
        id: 'Point_45',
        coords: {
          x: 1108.75,
          y: 307.5
        }
      },
      Point_46: {
        id: 'Point_46',
        coords: {
          x: 1109.375,
          y: 456.25
        }
      },
      Point_47: {
        id: 'Point_47',
        coords: {
          x: 102.1875,
          y: 452.5
        }
      },
      Point_48: {
        id: 'Point_48',
        coords: {
          x: 101.09375,
          y: 325.625
        }
      }
    },
}