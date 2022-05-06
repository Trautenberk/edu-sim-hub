import { Example } from "Editor/Feature/SimObjectManagementSlice";
import { IEditorObject } from "Editor/Model/EditorObject";







export const SPRING_WEIGHT : Example = {
    editorObjectCounter: 50,
    pointCounter: 50,
    objects: {
        integrator_0: {
          id: 'integrator_0',
          className: 'Integrator',
          endPointIds: [
            'Point_0',
            'Point_1'
          ],
          coordinates: {
            x: 632,
            y: 268
          },
          label: 'y\'\' => y\'',
          initialValue: 0
        } as IEditorObject,
        integrator_1: {
          id: 'integrator_1',
          className: 'Integrator',
          endPointIds: [
            'Point_2',
            'Point_3'
          ],
          coordinates: {
            x: 777,
            y: 269
          },
          label: 'y\' => y',
          initialValue: -1
        } as IEditorObject,
        constant_2: {
          id: 'constant_2',
          className: 'Constant',
          endPointIds: [
            'Point_4'
          ],
          coordinates: {
            x: 62,
            y: 293
          },
          label: '-K',
          value: -20
        } as IEditorObject,
        constant_3: {
          id: 'constant_3',
          className: 'Constant',
          endPointIds: [
            'Point_5'
          ],
          coordinates: {
            x: 59,
            y: 407
          },
          label: 'm',
          value: 300
        } as IEditorObject,
        div_4: {
          id: 'div_4',
          className: 'Div',
          endPointIds: [
            'Point_6',
            'Point_7',
            'Point_8'
          ],
          coordinates: {
            x: 198,
            y: 352
          },
          label: '-K / m'
        } as IEditorObject,
        signal_5: {
          id: 'signal_5',
          className: 'Signal',
          pointsId: [
            'Point_4',
            'Point_9'
          ],
          from: {
            objId: 'constant_2',
            pointId: 'Point_4'
          },
          to: {
            objId: 'div_4',
            pointId: 'Point_6'
          },
          allowedClassNames: []
        } as IEditorObject,
        signal_6: {
          id: 'signal_6',
          className: 'Signal',
          pointsId: [
            'Point_5',
            'Point_10'
          ],
          from: {
            objId: 'constant_3',
            pointId: 'Point_5'
          },
          to: {
            objId: 'div_4',
            pointId: 'Point_7'
          },
          allowedClassNames: []
        } as IEditorObject,
        constant_7: {
          id: 'constant_7',
          className: 'Constant',
          endPointIds: [
            'Point_11'
          ],
          coordinates: {
            x: 310,
            y: 192
          },
          label: '-g',
          value: -9.81
        } as IEditorObject,
        signal_8: {
          id: 'signal_8',
          className: 'Signal',
          pointsId: [
            'Point_1',
            'Point_12'
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
        add_9: {
          id: 'add_9',
          className: 'Add',
          endPointIds: [
            'Point_13',
            'Point_14',
            'Point_15'
          ],
          coordinates: {
            x: 479,
            y: 268
          },
          label: '(-K/m)y - g'
        } as IEditorObject,
        mul_13: {
          id: 'mul_13',
          className: 'Mul',
          endPointIds: [
            'Point_22',
            'Point_23',
            'Point_24'
          ],
          coordinates: {
            x: 335,
            y: 372
          },
          label: '(-K/m)y'
        } as IEditorObject,
        signal_19: {
          id: 'signal_19',
          className: 'Signal',
          pointsId: [
            'Point_24',
            'Point_36'
          ],
          from: {
            objId: 'mul_13',
            pointId: 'Point_24'
          },
          to: {
            objId: 'add_9',
            pointId: 'Point_14'
          },
          allowedClassNames: []
        } as IEditorObject,
        signal_20: {
          id: 'signal_20',
          className: 'Signal',
          pointsId: [
            'Point_11',
            'Point_37'
          ],
          from: {
            objId: 'constant_7',
            pointId: 'Point_11'
          },
          to: {
            objId: 'add_9',
            pointId: 'Point_13'
          },
          allowedClassNames: []
        } as IEditorObject,
        signal_21: {
          id: 'signal_21',
          className: 'Signal',
          pointsId: [
            'Point_15',
            'Point_38'
          ],
          from: {
            objId: 'add_9',
            pointId: 'Point_15'
          },
          to: {
            objId: 'integrator_0',
            pointId: 'Point_0'
          },
          allowedClassNames: []
        } as IEditorObject,
        signal_22: {
          id: 'signal_22',
          className: 'Signal',
          pointsId: [
            'Point_8',
            'Point_39'
          ],
          from: {
            objId: 'div_4',
            pointId: 'Point_8'
          },
          to: {
            objId: 'mul_13',
            pointId: 'Point_22'
          },
          allowedClassNames: []
        } as IEditorObject,
        signal_23: {
          id: 'signal_23',
          className: 'Signal',
          pointsId: [
            'Point_3',
            'Point_41',
            'Point_42',
            'Point_43',
            'Point_44',
            'Point_40'
          ],
          from: {
            objId: 'integrator_1',
            pointId: 'Point_3'
          },
          to: {
            objId: 'mul_13',
            pointId: 'Point_23'
          },
          allowedClassNames: []
        } as IEditorObject
      },
      edgeObjectsIds: [
        'signal_19',
        'signal_20',
        'signal_21',
        'signal_22',
        'signal_23'
      ],
      selectedObjectId: null,
      endPoints: {
        Point_0: {
          id: 'Point_0',
          coords: {
            x: 632,
            y: 303
          },
          ownerId: 'integrator_0',
          spawnedObjCnt: 0,
          bindings: [
            'Point_38'
          ],
          type: 0,
          connectable: true
        },
        Point_1: {
          id: 'Point_1',
          coords: {
            x: 702,
            y: 303
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
            x: 776,
            y: 304
          },
          ownerId: 'integrator_1',
          spawnedObjCnt: 0,
          bindings: [
            'Point_12'
          ],
          type: 0,
          connectable: true
        },
        Point_3: {
          id: 'Point_3',
          coords: {
            x: 846,
            y: 304
          },
          ownerId: 'integrator_1',
          spawnedObjCnt: 1,
          bindings: [],
          type: 2,
          arrowDirection: 1,
          maxSpawnedObj: 3,
          connectable: false
        },
        Point_4: {
          id: 'Point_4',
          coords: {
            x: 132,
            y: 327
          },
          ownerId: 'constant_2',
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
            x: 129,
            y: 441
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
            x: 198,
            y: 368
          },
          ownerId: 'div_4',
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
            x: 198,
            y: 408
          },
          ownerId: 'div_4',
          spawnedObjCnt: 0,
          bindings: [
            'Point_10'
          ],
          type: 0,
          connectable: true
        },
        Point_8: {
          id: 'Point_8',
          coords: {
            x: 268,
            y: 388
          },
          ownerId: 'div_4',
          spawnedObjCnt: 1,
          bindings: [],
          type: 2,
          arrowDirection: 1,
          maxSpawnedObj: 3,
          connectable: false
        },
        Point_11: {
          id: 'Point_11',
          coords: {
            x: 380,
            y: 228
          },
          ownerId: 'constant_7',
          spawnedObjCnt: 1,
          bindings: [],
          type: 2,
          arrowDirection: 1,
          maxSpawnedObj: 3,
          connectable: false
        },
        Point_13: {
          id: 'Point_13',
          coords: {
            x: 479,
            y: 284
          },
          ownerId: 'add_9',
          spawnedObjCnt: 0,
          bindings: [
            'Point_37'
          ],
          type: 0,
          connectable: true
        },
        Point_14: {
          id: 'Point_14',
          coords: {
            x: 479,
            y: 324
          },
          ownerId: 'add_9',
          spawnedObjCnt: 0,
          bindings: [
            'Point_36'
          ],
          type: 0,
          connectable: true
        },
        Point_15: {
          id: 'Point_15',
          coords: {
            x: 549,
            y: 304
          },
          ownerId: 'add_9',
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
            x: 335,
            y: 387
          },
          ownerId: 'mul_13',
          spawnedObjCnt: 0,
          bindings: [
            'Point_39'
          ],
          type: 0,
          connectable: true
        },
        Point_23: {
          id: 'Point_23',
          coords: {
            x: 335,
            y: 427
          },
          ownerId: 'mul_13',
          spawnedObjCnt: 0,
          bindings: [
            'Point_40'
          ],
          type: 0,
          connectable: true
        },
        Point_24: {
          id: 'Point_24',
          coords: {
            x: 405,
            y: 407
          },
          ownerId: 'mul_13',
          spawnedObjCnt: 1,
          bindings: [],
          type: 2,
          arrowDirection: 1,
          maxSpawnedObj: 3,
          connectable: false
        }
      },
      points: {
        Point_9: {
          id: 'Point_9',
          coords: {
            x: 198,
            y: 368
          }
        },
        Point_10: {
          id: 'Point_10',
          coords: {
            x: 198,
            y: 408
          }
        },
        Point_12: {
          id: 'Point_12',
          coords: {
            x: 776,
            y: 304
          }
        },
        Point_36: {
          id: 'Point_36',
          coords: {
            x: 479,
            y: 324
          }
        },
        Point_37: {
          id: 'Point_37',
          coords: {
            x: 479,
            y: 284
          }
        },
        Point_38: {
          id: 'Point_38',
          coords: {
            x: 632,
            y: 303
          }
        },
        Point_39: {
          id: 'Point_39',
          coords: {
            x: 335,
            y: 387
          }
        },
        Point_40: {
          id: 'Point_40',
          coords: {
            x: 335,
            y: 427
          }
        },
        Point_41: {
          id: 'Point_41',
          coords: {
            x: 871,
            y: 304
          }
        },
        Point_42: {
          id: 'Point_42',
          coords: {
            x: 870.5,
            y: 479
          }
        },
        Point_43: {
          id: 'Point_43',
          coords: {
            x: 294.25,
            y: 481
          }
        },
        Point_44: {
          id: 'Point_44',
          coords: {
            x: 294.125,
            y: 427.5
          }
        }
      },
}