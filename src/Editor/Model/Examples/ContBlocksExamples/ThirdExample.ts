import { Example } from "Editor/Feature/SimObjectManagementSlice";
import { IEditorObject } from "Editor/Model/EditorObject";




export const THIRD_EXAMPLE : Example = {
    editorObjectCounter: 10,
    pointCounter: 25,
    objects: {
        gain_0: {
          id: 'gain_0',
          className: 'Gain',
          endPointIds: [
            'Point_0',
            'Point_1'
          ],
          coordinates: {
            x: 688,
            y: 159
          },
          gain: -1
        } as IEditorObject,
        integrator_1: {
          id: 'integrator_1',
          className: 'Integrator',
          endPointIds: [
            'Point_2',
            'Point_3'
          ],
          coordinates: {
            x: 496,
            y: 161
          },
          initialValue: 100
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
            objId: 'gain_0',
            pointId: 'Point_0'
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
          initialValue: 0
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
        add_6: {
          id: 'add_6',
          className: 'Add',
          endPointIds: [
            'Point_13',
            'Point_14',
            'Point_15'
          ],
          coordinates: {
            x: 839,
            y: 182
          }
        } as IEditorObject,
        signal_7: {
          id: 'signal_7',
          className: 'Signal',
          pointsId: [
            'Point_1',
            'Point_16'
          ],
          from: {
            objId: 'gain_0',
            pointId: 'Point_1'
          },
          to: {
            objId: 'add_6',
            pointId: 'Point_13'
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
            x: 694,
            y: 285
          },
          value: 3
        } as IEditorObject,
        signal_9: {
          id: 'signal_9',
          className: 'Signal',
          pointsId: [
            'Point_17',
            'Point_18'
          ],
          from: {
            objId: 'constant_8',
            pointId: 'Point_17'
          },
          to: {
            objId: 'add_6',
            pointId: 'Point_14'
          },
          allowedClassNames: []
        } as IEditorObject,
        signal_10: {
          id: 'signal_10',
          className: 'Signal',
          pointsId: [
            'Point_15',
            'Point_20',
            'Point_21',
            'Point_22',
            'Point_23',
            'Point_19'
          ],
          from: {
            objId: 'add_6',
            pointId: 'Point_15'
          },
          to: {
            objId: 'integrator_3',
            pointId: 'Point_5'
          },
          allowedClassNames: []
        } as IEditorObject
      },
      edgeObjectsIds: [
        'signal_7',
        'signal_9',
        'signal_10'
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
          bindings: [
            'Point_4'
          ],
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
          spawnedObjCnt: 1,
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
            'Point_19'
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
          bindings: [
            'Point_16'
          ],
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
          bindings: [
            'Point_18'
          ],
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
          spawnedObjCnt: 1,
          bindings: [],
          type: 2,
          arrowDirection: 1,
          maxSpawnedObj: 1,
          connectable: false
        },
        Point_17: {
          id: 'Point_17',
          coords: {
            x: 765,
            y: 320
          },
          ownerId: 'constant_8',
          spawnedObjCnt: 1,
          bindings: [],
          type: 2,
          arrowDirection: 1,
          maxSpawnedObj: 1,
          connectable: false
        }
      },
      points: {
        Point_4: {
          id: 'Point_4',
          coords: {
            x: 688,
            y: 194
          }
        },
        Point_8: {
          id: 'Point_8',
          coords: {
            x: 496,
            y: 195
          }
        },
        Point_16: {
          id: 'Point_16',
          coords: {
            x: 839,
            y: 196
          }
        },
        Point_18: {
          id: 'Point_18',
          coords: {
            x: 839,
            y: 236
          }
        },
        Point_19: {
          id: 'Point_19',
          coords: {
            x: 289,
            y: 195
          }
        },
        Point_20: {
          id: 'Point_20',
          coords: {
            x: 955.5,
            y: 216.5
          }
        },
        Point_21: {
          id: 'Point_21',
          coords: {
            x: 955.25,
            y: 428.25
          }
        },
        Point_22: {
          id: 'Point_22',
          coords: {
            x: 203.625,
            y: 430.125
          }
        },
        Point_23: {
          id: 'Point_23',
          coords: {
            x: 202.8125,
            y: 195.5625
          }
        }
      },
}