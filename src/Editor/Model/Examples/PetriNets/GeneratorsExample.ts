import { Example } from "Editor/Feature/SimObjectManagementSlice";
import { IEditorObject } from "Editor/Model/EditorObject";


export const GENERATOR_EXAMPLE : Example = {
    editorObjectCounter: 14, 
    pointCounter: 30,
    objects: {
        place_0: {
          id: 'place_0',
          className: 'Place',
          endPointIds: [
            'Point_0',
            'Point_1',
            'Point_2',
            'Point_3'
          ],
          coordinates: {
            x: 283,
            y: 201
          },
          label: '',
          tokenCount: 1
        } as IEditorObject,
        inputarc_1: {
          id: 'inputarc_1',
          className: 'InputArc',
          pointsId: [
            'Point_0',
            'Point_4'
          ],
          from: {
            objId: 'place_0',
            pointId: 'Point_0'
          },
          to: {
            objId: 'transition_2',
            pointId: 'Point_6'
          },
          allowedClassNames: [
            'Transition'
          ],
          weight: 1,
          transitionId: 'NULL_OBJ_ID',
          placeId: 'place_0'
        } as IEditorObject,
        transition_2: {
          id: 'transition_2',
          className: 'Transition',
          endPointIds: [
            'Point_5',
            'Point_6',
            'Point_7',
            'Point_8'
          ],
          coordinates: {
            x: 428,
            y: 160
          },
          priority: 0,
          label: 'Generátor 1',
          timeValue: 1,
          type: 'Časovaný přechod - Konstatní'
        } as IEditorObject,
        outputarc_3: {
          id: 'outputarc_3',
          className: 'OutputArc',
          pointsId: [
            'Point_6',
            'Point_9'
          ],
          from: {
            objId: 'transition_2',
            pointId: 'Point_6'
          },
          to: {
            objId: 'place_0',
            pointId: 'Point_0'
          },
          allowedClassNames: [
            'Place'
          ],
          weight: 1,
          transitionId: 'transition_2',
          placeId: 'NULL_OBJ_ID'
        } as IEditorObject,
        place_4: {
          id: 'place_4',
          className: 'Place',
          endPointIds: [
            'Point_10',
            'Point_11',
            'Point_12',
            'Point_13'
          ],
          coordinates: {
            x: 607,
            y: 200
          },
          label: '',
          tokenCount: 0
        } as IEditorObject,
        outputarc_5: {
          id: 'outputarc_5',
          className: 'OutputArc',
          pointsId: [
            'Point_5',
            'Point_14'
          ],
          from: {
            objId: 'transition_2',
            pointId: 'Point_5'
          },
          to: {
            objId: 'place_4',
            pointId: 'Point_11'
          },
          allowedClassNames: [
            'Place'
          ],
          weight: 1,
          transitionId: 'transition_2',
          placeId: 'NULL_OBJ_ID'
        } as IEditorObject,
        place_6: {
          id: 'place_6',
          className: 'Place',
          endPointIds: [
            'Point_15',
            'Point_16',
            'Point_17',
            'Point_18'
          ],
          coordinates: {
            x: 279,
            y: 367
          },
          label: '',
          tokenCount: 1
        } as IEditorObject,
        transition_7: {
          id: 'transition_7',
          className: 'Transition',
          endPointIds: [
            'Point_19',
            'Point_20',
            'Point_21',
            'Point_22'
          ],
          coordinates: {
            x: 427,
            y: 328
          },
          priority: 0,
          label: 'Generátor 2',
          timeValue: 1,
          type: 'Časovaný přechod -  Exponenciální'
        } as IEditorObject,
        place_8: {
          id: 'place_8',
          className: 'Place',
          endPointIds: [
            'Point_23',
            'Point_24',
            'Point_25',
            'Point_26'
          ],
          coordinates: {
            x: 614,
            y: 366
          },
          label: '',
          tokenCount: 0
        } as IEditorObject,
        inputarc_9: {
          id: 'inputarc_9',
          className: 'InputArc',
          pointsId: [
            'Point_15',
            'Point_27'
          ],
          from: {
            objId: 'place_6',
            pointId: 'Point_15'
          },
          to: {
            objId: 'transition_7',
            pointId: 'Point_20'
          },
          allowedClassNames: [
            'Transition'
          ],
          weight: 1,
          transitionId: 'NULL_OBJ_ID',
          placeId: 'place_6'
        } as IEditorObject,
        outputarc_10: {
          id: 'outputarc_10',
          className: 'OutputArc',
          pointsId: [
            'Point_19',
            'Point_28'
          ],
          from: {
            objId: 'transition_7',
            pointId: 'Point_19'
          },
          to: {
            objId: 'place_8',
            pointId: 'Point_24'
          },
          allowedClassNames: [
            'Place'
          ],
          weight: 1,
          transitionId: 'transition_7',
          placeId: 'NULL_OBJ_ID'
        } as IEditorObject,
        outputarc_11: {
          id: 'outputarc_11',
          className: 'OutputArc',
          pointsId: [
            'Point_20',
            'Point_29'
          ],
          from: {
            objId: 'transition_7',
            pointId: 'Point_20'
          },
          to: {
            objId: 'place_6',
            pointId: 'Point_15'
          },
          allowedClassNames: [
            'Place'
          ],
          weight: 1,
          transitionId: 'transition_7',
          placeId: 'NULL_OBJ_ID'
        } as IEditorObject
      },
      edgeObjectsIds: [
        'inputarc_1',
        'outputarc_3',
        'outputarc_5',
        'inputarc_9',
        'outputarc_10',
        'outputarc_11'
      ],
      selectedObjectId: null,
      endPoints: {
        Point_0: {
          id: 'Point_0',
          coords: {
            x: 313,
            y: 201
          },
          ownerId: 'place_0',
          spawnedObjCnt: 1,
          bindings: [
            'Point_9'
          ],
          type: 1,
          arrowDirection: 1,
          connectable: true
        },
        Point_1: {
          id: 'Point_1',
          coords: {
            x: 253,
            y: 201
          },
          ownerId: 'place_0',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 3,
          connectable: true
        },
        Point_2: {
          id: 'Point_2',
          coords: {
            x: 283,
            y: 231
          },
          ownerId: 'place_0',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 2,
          connectable: true
        },
        Point_3: {
          id: 'Point_3',
          coords: {
            x: 283,
            y: 171
          },
          ownerId: 'place_0',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 0,
          connectable: true
        },
        Point_5: {
          id: 'Point_5',
          coords: {
            x: 457,
            y: 200
          },
          ownerId: 'transition_2',
          spawnedObjCnt: 1,
          bindings: [],
          type: 1,
          arrowDirection: 1,
          connectable: true
        },
        Point_6: {
          id: 'Point_6',
          coords: {
            x: 427,
            y: 200
          },
          ownerId: 'transition_2',
          spawnedObjCnt: 1,
          bindings: [
            'Point_4'
          ],
          type: 1,
          arrowDirection: 3,
          connectable: true
        },
        Point_7: {
          id: 'Point_7',
          coords: {
            x: 442,
            y: 240
          },
          ownerId: 'transition_2',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 2,
          connectable: true
        },
        Point_8: {
          id: 'Point_8',
          coords: {
            x: 442,
            y: 160
          },
          ownerId: 'transition_2',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 0,
          connectable: true
        },
        Point_10: {
          id: 'Point_10',
          coords: {
            x: 638,
            y: 200
          },
          ownerId: 'place_4',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 1,
          connectable: true
        },
        Point_11: {
          id: 'Point_11',
          coords: {
            x: 578,
            y: 200
          },
          ownerId: 'place_4',
          spawnedObjCnt: 0,
          bindings: [
            'Point_14'
          ],
          type: 1,
          arrowDirection: 3,
          connectable: true
        },
        Point_12: {
          id: 'Point_12',
          coords: {
            x: 608,
            y: 230
          },
          ownerId: 'place_4',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 2,
          connectable: true
        },
        Point_13: {
          id: 'Point_13',
          coords: {
            x: 608,
            y: 170
          },
          ownerId: 'place_4',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 0,
          connectable: true
        },
        Point_15: {
          id: 'Point_15',
          coords: {
            x: 309,
            y: 368
          },
          ownerId: 'place_6',
          spawnedObjCnt: 1,
          bindings: [
            'Point_29'
          ],
          type: 1,
          arrowDirection: 1,
          connectable: true
        },
        Point_16: {
          id: 'Point_16',
          coords: {
            x: 249,
            y: 368
          },
          ownerId: 'place_6',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 3,
          connectable: true
        },
        Point_17: {
          id: 'Point_17',
          coords: {
            x: 279,
            y: 398
          },
          ownerId: 'place_6',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 2,
          connectable: true
        },
        Point_18: {
          id: 'Point_18',
          coords: {
            x: 279,
            y: 338
          },
          ownerId: 'place_6',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 0,
          connectable: true
        },
        Point_19: {
          id: 'Point_19',
          coords: {
            x: 458,
            y: 368
          },
          ownerId: 'transition_7',
          spawnedObjCnt: 1,
          bindings: [],
          type: 1,
          arrowDirection: 1,
          connectable: true
        },
        Point_20: {
          id: 'Point_20',
          coords: {
            x: 428,
            y: 368
          },
          ownerId: 'transition_7',
          spawnedObjCnt: 1,
          bindings: [
            'Point_27'
          ],
          type: 1,
          arrowDirection: 3,
          connectable: true
        },
        Point_21: {
          id: 'Point_21',
          coords: {
            x: 443,
            y: 408
          },
          ownerId: 'transition_7',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 2,
          connectable: true
        },
        Point_22: {
          id: 'Point_22',
          coords: {
            x: 443,
            y: 328
          },
          ownerId: 'transition_7',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 0,
          connectable: true
        },
        Point_23: {
          id: 'Point_23',
          coords: {
            x: 644,
            y: 367
          },
          ownerId: 'place_8',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 1,
          connectable: true
        },
        Point_24: {
          id: 'Point_24',
          coords: {
            x: 584,
            y: 367
          },
          ownerId: 'place_8',
          spawnedObjCnt: 0,
          bindings: [
            'Point_28'
          ],
          type: 1,
          arrowDirection: 3,
          connectable: true
        },
        Point_25: {
          id: 'Point_25',
          coords: {
            x: 614,
            y: 397
          },
          ownerId: 'place_8',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 2,
          connectable: true
        },
        Point_26: {
          id: 'Point_26',
          coords: {
            x: 614,
            y: 337
          },
          ownerId: 'place_8',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 0,
          connectable: true
        }
      },
      points: {
        Point_4: {
          id: 'Point_4',
          coords: {
            x: 427,
            y: 200
          }
        },
        Point_9: {
          id: 'Point_9',
          coords: {
            x: 313,
            y: 201
          }
        },
        Point_14: {
          id: 'Point_14',
          coords: {
            x: 578,
            y: 200
          }
        },
        Point_27: {
          id: 'Point_27',
          coords: {
            x: 428,
            y: 368
          }
        },
        Point_28: {
          id: 'Point_28',
          coords: {
            x: 584,
            y: 367
          }
        },
        Point_29: {
          id: 'Point_29',
          coords: {
            x: 309,
            y: 368
          }
        }
      },

}