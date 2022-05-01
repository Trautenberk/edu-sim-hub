import { Example } from "Editor/Feature/SimObjectManagementSlice";
import { IEditorObject } from "Editor/Model/EditorObject";




export const SECOND_EXAMPLE : Example = {
    editorObjectCounter: 10,
    pointCounter: 10,
    objects: {
        time_0: {
          id: 'time_0',
          className: 'Time',
          endPointIds: [
            'Point_0'
          ],
          coordinates: {
            x: 185,
            y: 260
          }
        } as IEditorObject,
        mul_1: {
          id: 'mul_1',
          className: 'Mul',
          endPointIds: [
            'Point_1',
            'Point_2',
            'Point_3'
          ],
          coordinates: {
            x: 348,
            y: 191
          }
        } as IEditorObject,
        constant_2: {
          id: 'constant_2',
          className: 'Constant',
          endPointIds: [
            'Point_4'
          ],
          coordinates: {
            x: 179,
            y: 137
          },
          value: 2
        } as IEditorObject,
        signal_3: {
          id: 'signal_3',
          className: 'Signal',
          pointsId: [
            'Point_4',
            'Point_5'
          ],
          from: {
            objId: 'constant_2',
            pointId: 'Point_4'
          },
          to: {
            objId: 'mul_1',
            pointId: 'Point_1'
          },
          allowedClassNames: []
        } as IEditorObject,
        signal_4: {
          id: 'signal_4',
          className: 'Signal',
          pointsId: [
            'Point_0',
            'Point_6'
          ],
          from: {
            objId: 'time_0',
            pointId: 'Point_0'
          },
          to: {
            objId: 'mul_1',
            pointId: 'Point_2'
          },
          allowedClassNames: []
        } as IEditorObject,
        integrator_5: {
          id: 'integrator_5',
          className: 'Integrator',
          endPointIds: [
            'Point_7',
            'Point_8'
          ],
          coordinates: {
            x: 518,
            y: 192
          },
          initialValue: 0
        } as IEditorObject,
        signal_6: {
          id: 'signal_6',
          className: 'Signal',
          pointsId: [
            'Point_3',
            'Point_9'
          ],
          from: {
            objId: 'mul_1',
            pointId: 'Point_3'
          },
          to: {
            objId: 'integrator_5',
            pointId: 'Point_7'
          },
          allowedClassNames: []
        }  as IEditorObject
      },
      edgeObjectsIds: [
        'signal_3',
        'signal_4',
        'signal_6'
      ],
      selectedObjectId: null,
      endPoints: {
        Point_0: {
          id: 'Point_0',
          coords: {
            x: 256,
            y: 294
          },
          ownerId: 'time_0',
          spawnedObjCnt: 1,
          bindings: [],
          type: 2,
          arrowDirection: 1,
          maxSpawnedObj: 1,
          connectable: false
        },
        Point_1: {
          id: 'Point_1',
          coords: {
            x: 349,
            y: 207
          },
          ownerId: 'mul_1',
          spawnedObjCnt: 0,
          bindings: [
            'Point_5'
          ],
          type: 0,
          connectable: true
        },
        Point_2: {
          id: 'Point_2',
          coords: {
            x: 349,
            y: 247
          },
          ownerId: 'mul_1',
          spawnedObjCnt: 0,
          bindings: [
            'Point_6'
          ],
          type: 0,
          connectable: true
        },
        Point_3: {
          id: 'Point_3',
          coords: {
            x: 419,
            y: 227
          },
          ownerId: 'mul_1',
          spawnedObjCnt: 1,
          bindings: [],
          type: 2,
          arrowDirection: 1,
          maxSpawnedObj: 1,
          connectable: false
        },
        Point_4: {
          id: 'Point_4',
          coords: {
            x: 250,
            y: 172
          },
          ownerId: 'constant_2',
          spawnedObjCnt: 1,
          bindings: [],
          type: 2,
          arrowDirection: 1,
          maxSpawnedObj: 1,
          connectable: false
        },
        Point_7: {
          id: 'Point_7',
          coords: {
            x: 518,
            y: 227
          },
          ownerId: 'integrator_5',
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
            x: 588,
            y: 227
          },
          ownerId: 'integrator_5',
          spawnedObjCnt: 0,
          bindings: [],
          type: 2,
          arrowDirection: 1,
          maxSpawnedObj: 1,
          connectable: false
        }
      },
      points: {
        Point_5: {
          id: 'Point_5',
          coords: {
            x: 349,
            y: 207
          }
        },
        Point_6: {
          id: 'Point_6',
          coords: {
            x: 349,
            y: 247
          }
        },
        Point_9: {
          id: 'Point_9',
          coords: {
            x: 518,
            y: 227
          }
        }
      },
}