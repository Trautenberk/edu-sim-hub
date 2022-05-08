import { Example } from "Editor/Feature/SimObjectManagementSlice";
import { IEditorObject } from "Editor/Model/EditorObject";





export const PRIORITY_QUEUE : Example = {
    editorObjectCounter: 70, 
    pointCounter: 100,
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
            x: 204,
            y: 174
          },
          label: '',
          tokenCount: 1
        } as IEditorObject,
        transition_1: {
          id: 'transition_1',
          className: 'Transition',
          endPointIds: [
            'Point_4',
            'Point_5',
            'Point_6',
            'Point_7'
          ],
          coordinates: {
            x: 325,
            y: 136
          },
          priority: 0,
          label: '',
          timeValue: 1,
          type: 'Časovaný přechod -  Exponenciální'
        } as IEditorObject,
        inputarc_2: {
          id: 'inputarc_2',
          className: 'InputArc',
          pointsId: [
            'Point_0',
            'Point_8'
          ],
          from: {
            objId: 'place_0',
            pointId: 'Point_0'
          },
          to: {
            objId: 'transition_1',
            pointId: 'Point_5'
          },
          allowedClassNames: [
            'Transition'
          ],
          weight: 1,
          transitionId: 'NULL_OBJ_ID',
          placeId: 'place_0'
        } as IEditorObject,
        outputarc_3: {
          id: 'outputarc_3',
          className: 'OutputArc',
          pointsId: [
            'Point_5',
            'Point_9'
          ],
          from: {
            objId: 'transition_1',
            pointId: 'Point_5'
          },
          to: {
            objId: 'place_0',
            pointId: 'Point_0'
          },
          allowedClassNames: [
            'Place'
          ],
          weight: 1,
          transitionId: 'transition_1',
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
            x: 200,
            y: 386
          },
          label: '',
          tokenCount: 1
        } as IEditorObject,
        transition_5: {
          id: 'transition_5',
          className: 'Transition',
          endPointIds: [
            'Point_14',
            'Point_15',
            'Point_16',
            'Point_17'
          ],
          coordinates: {
            x: 335,
            y: 346
          },
          priority: 0,
          label: '',
          timeValue: 5,
          type: 'Časovaný přechod -  Exponenciální'
        } as IEditorObject,
        inputarc_6: {
          id: 'inputarc_6',
          className: 'InputArc',
          pointsId: [
            'Point_10',
            'Point_18'
          ],
          from: {
            objId: 'place_4',
            pointId: 'Point_10'
          },
          to: {
            objId: 'transition_5',
            pointId: 'Point_15'
          },
          allowedClassNames: [
            'Transition'
          ],
          weight: 1,
          transitionId: 'NULL_OBJ_ID',
          placeId: 'place_4'
        } as IEditorObject,
        outputarc_7: {
          id: 'outputarc_7',
          className: 'OutputArc',
          pointsId: [
            'Point_15',
            'Point_19'
          ],
          from: {
            objId: 'transition_5',
            pointId: 'Point_15'
          },
          to: {
            objId: 'place_4',
            pointId: 'Point_10'
          },
          allowedClassNames: [
            'Place'
          ],
          weight: 1,
          transitionId: 'transition_5',
          placeId: 'NULL_OBJ_ID'
        } as IEditorObject,
        place_8: {
          id: 'place_8',
          className: 'Place',
          endPointIds: [
            'Point_20',
            'Point_21',
            'Point_22',
            'Point_23'
          ],
          coordinates: {
            x: 499,
            y: 387
          },
          label: 'Prioritní fronta',
          tokenCount: 0
        } as IEditorObject,
        place_11: {
          id: 'place_11',
          className: 'Place',
          endPointIds: [
            'Point_26',
            'Point_27',
            'Point_28',
            'Point_29'
          ],
          coordinates: {
            x: 489,
            y: 176
          },
          label: 'Normální fronta',
          tokenCount: 0
        } as IEditorObject,
        outputarc_12: {
          id: 'outputarc_12',
          className: 'OutputArc',
          pointsId: [
            'Point_4',
            'Point_30'
          ],
          from: {
            objId: 'transition_1',
            pointId: 'Point_4'
          },
          to: {
            objId: 'place_11',
            pointId: 'Point_27'
          },
          allowedClassNames: [
            'Place'
          ],
          weight: 1,
          transitionId: 'transition_1',
          placeId: 'NULL_OBJ_ID'
        } as IEditorObject,
        outputarc_13: {
          id: 'outputarc_13',
          className: 'OutputArc',
          pointsId: [
            'Point_14',
            'Point_31'
          ],
          from: {
            objId: 'transition_5',
            pointId: 'Point_14'
          },
          to: {
            objId: 'place_8',
            pointId: 'Point_21'
          },
          allowedClassNames: [
            'Place'
          ],
          weight: 1,
          transitionId: 'transition_5',
          placeId: 'NULL_OBJ_ID'
        } as IEditorObject,
        transition_15: {
          id: 'transition_15',
          className: 'Transition',
          endPointIds: [
            'Point_36',
            'Point_37',
            'Point_38',
            'Point_39'
          ],
          coordinates: {
            x: 642,
            y: 135
          },
          priority: 0,
          label: '',
          timeValue: 1,
          type: 'Okamžitý přechod'
        } as IEditorObject,
        transition_16: {
          id: 'transition_16',
          className: 'Transition',
          endPointIds: [
            'Point_40',
            'Point_41',
            'Point_42',
            'Point_43'
          ],
          coordinates: {
            x: 647,
            y: 344
          },
          priority: 1,
          label: '',
          timeValue: 1,
          type: 'Okamžitý přechod'
        } as IEditorObject,
        inputarc_17: {
          id: 'inputarc_17',
          className: 'InputArc',
          pointsId: [
            'Point_20',
            'Point_44'
          ],
          from: {
            objId: 'place_8',
            pointId: 'Point_20'
          },
          to: {
            objId: 'transition_16',
            pointId: 'Point_41'
          },
          allowedClassNames: [
            'Transition'
          ],
          weight: 1,
          transitionId: 'NULL_OBJ_ID',
          placeId: 'place_8'
        } as IEditorObject,
        inputarc_18: {
          id: 'inputarc_18',
          className: 'InputArc',
          pointsId: [
            'Point_26',
            'Point_45'
          ],
          from: {
            objId: 'place_11',
            pointId: 'Point_26'
          },
          to: {
            objId: 'transition_15',
            pointId: 'Point_37'
          },
          allowedClassNames: [
            'Transition'
          ],
          weight: 1,
          transitionId: 'NULL_OBJ_ID',
          placeId: 'place_11'
        } as IEditorObject,
        place_19: {
          id: 'place_19',
          className: 'Place',
          endPointIds: [
            'Point_46',
            'Point_47',
            'Point_48',
            'Point_49'
          ],
          coordinates: {
            x: 800,
            y: 277
          },
          label: '',
          tokenCount: 0
        } as IEditorObject,
        transition_20: {
          id: 'transition_20',
          className: 'Transition',
          endPointIds: [
            'Point_50',
            'Point_51',
            'Point_52',
            'Point_53'
          ],
          coordinates: {
            x: 927,
            y: 239
          },
          priority: 0,
          label: '',
          timeValue: 1,
          type: 'Časovaný přechod -  Exponenciální'
        } as IEditorObject,
        place_21: {
          id: 'place_21',
          className: 'Place',
          endPointIds: [
            'Point_54',
            'Point_55',
            'Point_56',
            'Point_57'
          ],
          coordinates: {
            x: 1054,
            y: 277
          },
          label: '',
          tokenCount: 0
        } as IEditorObject,
        inputarc_22: {
          id: 'inputarc_22',
          className: 'InputArc',
          pointsId: [
            'Point_46',
            'Point_58'
          ],
          from: {
            objId: 'place_19',
            pointId: 'Point_46'
          },
          to: {
            objId: 'transition_20',
            pointId: 'Point_51'
          },
          allowedClassNames: [
            'Transition'
          ],
          weight: 1,
          transitionId: 'NULL_OBJ_ID',
          placeId: 'place_19'
        } as IEditorObject,
        outputarc_23: {
          id: 'outputarc_23',
          className: 'OutputArc',
          pointsId: [
            'Point_50',
            'Point_59'
          ],
          from: {
            objId: 'transition_20',
            pointId: 'Point_50'
          },
          to: {
            objId: 'place_21',
            pointId: 'Point_55'
          },
          allowedClassNames: [
            'Place'
          ],
          weight: 1,
          transitionId: 'transition_20',
          placeId: 'NULL_OBJ_ID'
        } as IEditorObject,
        outputarc_24: {
          id: 'outputarc_24',
          className: 'OutputArc',
          pointsId: [
            'Point_36',
            'Point_60'
          ],
          from: {
            objId: 'transition_15',
            pointId: 'Point_36'
          },
          to: {
            objId: 'place_19',
            pointId: 'Point_49'
          },
          allowedClassNames: [
            'Place'
          ],
          weight: 1,
          transitionId: 'transition_15',
          placeId: 'NULL_OBJ_ID'
        } as IEditorObject,
        outputarc_25: {
          id: 'outputarc_25',
          className: 'OutputArc',
          pointsId: [
            'Point_40',
            'Point_61'
          ],
          from: {
            objId: 'transition_16',
            pointId: 'Point_40'
          },
          to: {
            objId: 'place_19',
            pointId: 'Point_48'
          },
          allowedClassNames: [
            'Place'
          ],
          weight: 1,
          transitionId: 'transition_16',
          placeId: 'NULL_OBJ_ID'
        } as IEditorObject,
        place_26: {
          id: 'place_26',
          className: 'Place',
          endPointIds: [
            'Point_62',
            'Point_63',
            'Point_64',
            'Point_65'
          ],
          coordinates: {
            x: 497,
            y: 269
          },
          label: '',
          tokenCount: 1
        } as IEditorObject,
        inputarc_27: {
          id: 'inputarc_27',
          className: 'InputArc',
          pointsId: [
            'Point_62',
            'Point_66'
          ],
          from: {
            objId: 'place_26',
            pointId: 'Point_62'
          },
          to: {
            objId: 'transition_15',
            pointId: 'Point_38'
          },
          allowedClassNames: [
            'Transition'
          ],
          weight: 1,
          transitionId: 'NULL_OBJ_ID',
          placeId: 'place_26'
        } as IEditorObject,
        inputarc_28: {
          id: 'inputarc_28',
          className: 'InputArc',
          pointsId: [
            'Point_62',
            'Point_67'
          ],
          from: {
            objId: 'place_26',
            pointId: 'Point_62'
          },
          to: {
            objId: 'transition_16',
            pointId: 'Point_43'
          },
          allowedClassNames: [
            'Transition'
          ],
          weight: 1,
          transitionId: 'NULL_OBJ_ID',
          placeId: 'place_26'
        } as IEditorObject,
        outputarc_29: {
          id: 'outputarc_29',
          className: 'OutputArc',
          pointsId: [
            'Point_53',
            'Point_69',
            'Point_70',
            'Point_71',
            'Point_68'
          ],
          from: {
            objId: 'transition_20',
            pointId: 'Point_53'
          },
          to: {
            objId: 'place_26',
            pointId: 'Point_63'
          },
          allowedClassNames: [
            'Place'
          ],
          weight: 1,
          transitionId: 'transition_20',
          placeId: 'NULL_OBJ_ID'
        } as IEditorObject
      },
      edgeObjectsIds: [
        'inputarc_2',
        'inputarc_6',
        'inputarc_17',
        'inputarc_18',
        'inputarc_22',
        'inputarc_27',
        'inputarc_28',
        'outputarc_3',
        'outputarc_23',
        'outputarc_7',
        'outputarc_12',
        'outputarc_13',
        'outputarc_29',
        'outputarc_25',
        'outputarc_24',

      ],
      selectedObjectId: null,
      endPoints: {
        Point_0: {
          id: 'Point_0',
          coords: {
            x: 234,
            y: 175
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
            x: 174,
            y: 175
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
            x: 204,
            y: 205
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
            x: 204,
            y: 145
          },
          ownerId: 'place_0',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 0,
          connectable: true
        },
        Point_4: {
          id: 'Point_4',
          coords: {
            x: 355,
            y: 175
          },
          ownerId: 'transition_1',
          spawnedObjCnt: 1,
          bindings: [],
          type: 1,
          arrowDirection: 1,
          connectable: true
        },
        Point_5: {
          id: 'Point_5',
          coords: {
            x: 325,
            y: 175
          },
          ownerId: 'transition_1',
          spawnedObjCnt: 1,
          bindings: [
            'Point_8'
          ],
          type: 1,
          arrowDirection: 3,
          connectable: true
        },
        Point_6: {
          id: 'Point_6',
          coords: {
            x: 340,
            y: 215
          },
          ownerId: 'transition_1',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 2,
          connectable: true
        },
        Point_7: {
          id: 'Point_7',
          coords: {
            x: 340,
            y: 135
          },
          ownerId: 'transition_1',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 0,
          connectable: true
        },
        Point_10: {
          id: 'Point_10',
          coords: {
            x: 230,
            y: 387
          },
          ownerId: 'place_4',
          spawnedObjCnt: 1,
          bindings: [
            'Point_19'
          ],
          type: 1,
          arrowDirection: 1,
          connectable: true
        },
        Point_11: {
          id: 'Point_11',
          coords: {
            x: 170,
            y: 387
          },
          ownerId: 'place_4',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 3,
          connectable: true
        },
        Point_12: {
          id: 'Point_12',
          coords: {
            x: 200,
            y: 417
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
            x: 200,
            y: 357
          },
          ownerId: 'place_4',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 0,
          connectable: true
        },
        Point_14: {
          id: 'Point_14',
          coords: {
            x: 365,
            y: 387
          },
          ownerId: 'transition_5',
          spawnedObjCnt: 1,
          bindings: [],
          type: 1,
          arrowDirection: 1,
          connectable: true
        },
        Point_15: {
          id: 'Point_15',
          coords: {
            x: 335,
            y: 387
          },
          ownerId: 'transition_5',
          spawnedObjCnt: 1,
          bindings: [
            'Point_18'
          ],
          type: 1,
          arrowDirection: 3,
          connectable: true
        },
        Point_16: {
          id: 'Point_16',
          coords: {
            x: 350,
            y: 427
          },
          ownerId: 'transition_5',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 2,
          connectable: true
        },
        Point_17: {
          id: 'Point_17',
          coords: {
            x: 350,
            y: 347
          },
          ownerId: 'transition_5',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 0,
          connectable: true
        },
        Point_20: {
          id: 'Point_20',
          coords: {
            x: 528,
            y: 387
          },
          ownerId: 'place_8',
          spawnedObjCnt: 1,
          bindings: [],
          type: 1,
          arrowDirection: 1,
          connectable: true
        },
        Point_21: {
          id: 'Point_21',
          coords: {
            x: 468,
            y: 387
          },
          ownerId: 'place_8',
          spawnedObjCnt: 0,
          bindings: [
            'Point_31'
          ],
          type: 1,
          arrowDirection: 3,
          connectable: true
        },
        Point_22: {
          id: 'Point_22',
          coords: {
            x: 498,
            y: 417
          },
          ownerId: 'place_8',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 2,
          connectable: true
        },
        Point_23: {
          id: 'Point_23',
          coords: {
            x: 498,
            y: 357
          },
          ownerId: 'place_8',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 0,
          connectable: true
        },
        Point_26: {
          id: 'Point_26',
          coords: {
            x: 519,
            y: 176
          },
          ownerId: 'place_11',
          spawnedObjCnt: 1,
          bindings: [],
          type: 1,
          arrowDirection: 1,
          connectable: true
        },
        Point_27: {
          id: 'Point_27',
          coords: {
            x: 459,
            y: 176
          },
          ownerId: 'place_11',
          spawnedObjCnt: 0,
          bindings: [
            'Point_30'
          ],
          type: 1,
          arrowDirection: 3,
          connectable: true
        },
        Point_28: {
          id: 'Point_28',
          coords: {
            x: 489,
            y: 206
          },
          ownerId: 'place_11',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 2,
          connectable: true
        },
        Point_29: {
          id: 'Point_29',
          coords: {
            x: 489,
            y: 146
          },
          ownerId: 'place_11',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 0,
          connectable: true
        },
        Point_32: {
          id: 'Point_32',
          coords: {
            x: 180,
            y: 190
          },
          ownerId: 'transition_14',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 1,
          connectable: true
        },
        Point_33: {
          id: 'Point_33',
          coords: {
            x: 150,
            y: 190
          },
          ownerId: 'transition_14',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 3,
          connectable: true
        },
        Point_34: {
          id: 'Point_34',
          coords: {
            x: 165,
            y: 230
          },
          ownerId: 'transition_14',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 2,
          connectable: true
        },
        Point_35: {
          id: 'Point_35',
          coords: {
            x: 165,
            y: 150
          },
          ownerId: 'transition_14',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 0,
          connectable: true
        },
        Point_36: {
          id: 'Point_36',
          coords: {
            x: 672,
            y: 174
          },
          ownerId: 'transition_15',
          spawnedObjCnt: 1,
          bindings: [],
          type: 1,
          arrowDirection: 1,
          connectable: true
        },
        Point_37: {
          id: 'Point_37',
          coords: {
            x: 642,
            y: 174
          },
          ownerId: 'transition_15',
          spawnedObjCnt: 0,
          bindings: [
            'Point_45'
          ],
          type: 1,
          arrowDirection: 3,
          connectable: true
        },
        Point_38: {
          id: 'Point_38',
          coords: {
            x: 657,
            y: 214
          },
          ownerId: 'transition_15',
          spawnedObjCnt: 0,
          bindings: [
            'Point_66'
          ],
          type: 1,
          arrowDirection: 2,
          connectable: true
        },
        Point_39: {
          id: 'Point_39',
          coords: {
            x: 657,
            y: 134
          },
          ownerId: 'transition_15',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 0,
          connectable: true
        },
        Point_40: {
          id: 'Point_40',
          coords: {
            x: 676,
            y: 384
          },
          ownerId: 'transition_16',
          spawnedObjCnt: 1,
          bindings: [],
          type: 1,
          arrowDirection: 1,
          connectable: true
        },
        Point_41: {
          id: 'Point_41',
          coords: {
            x: 646,
            y: 384
          },
          ownerId: 'transition_16',
          spawnedObjCnt: 0,
          bindings: [
            'Point_44'
          ],
          type: 1,
          arrowDirection: 3,
          connectable: true
        },
        Point_42: {
          id: 'Point_42',
          coords: {
            x: 661,
            y: 424
          },
          ownerId: 'transition_16',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 2,
          connectable: true
        },
        Point_43: {
          id: 'Point_43',
          coords: {
            x: 661,
            y: 344
          },
          ownerId: 'transition_16',
          spawnedObjCnt: 0,
          bindings: [
            'Point_67'
          ],
          type: 1,
          arrowDirection: 0,
          connectable: true
        },
        Point_46: {
          id: 'Point_46',
          coords: {
            x: 829,
            y: 278
          },
          ownerId: 'place_19',
          spawnedObjCnt: 1,
          bindings: [],
          type: 1,
          arrowDirection: 1,
          connectable: true
        },
        Point_47: {
          id: 'Point_47',
          coords: {
            x: 769,
            y: 278
          },
          ownerId: 'place_19',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 3,
          connectable: true
        },
        Point_48: {
          id: 'Point_48',
          coords: {
            x: 799,
            y: 308
          },
          ownerId: 'place_19',
          spawnedObjCnt: 0,
          bindings: [
            'Point_61'
          ],
          type: 1,
          arrowDirection: 2,
          connectable: true
        },
        Point_49: {
          id: 'Point_49',
          coords: {
            x: 799,
            y: 248
          },
          ownerId: 'place_19',
          spawnedObjCnt: 0,
          bindings: [
            'Point_60'
          ],
          type: 1,
          arrowDirection: 0,
          connectable: true
        },
        Point_50: {
          id: 'Point_50',
          coords: {
            x: 957,
            y: 278
          },
          ownerId: 'transition_20',
          spawnedObjCnt: 1,
          bindings: [],
          type: 1,
          arrowDirection: 1,
          connectable: true
        },
        Point_51: {
          id: 'Point_51',
          coords: {
            x: 927,
            y: 278
          },
          ownerId: 'transition_20',
          spawnedObjCnt: 0,
          bindings: [
            'Point_58'
          ],
          type: 1,
          arrowDirection: 3,
          connectable: true
        },
        Point_52: {
          id: 'Point_52',
          coords: {
            x: 942,
            y: 318
          },
          ownerId: 'transition_20',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 2,
          connectable: true
        },
        Point_53: {
          id: 'Point_53',
          coords: {
            x: 942,
            y: 238
          },
          ownerId: 'transition_20',
          spawnedObjCnt: 1,
          bindings: [],
          type: 1,
          arrowDirection: 0,
          connectable: true
        },
        Point_54: {
          id: 'Point_54',
          coords: {
            x: 1084,
            y: 277
          },
          ownerId: 'place_21',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 1,
          connectable: true
        },
        Point_55: {
          id: 'Point_55',
          coords: {
            x: 1024,
            y: 277
          },
          ownerId: 'place_21',
          spawnedObjCnt: 0,
          bindings: [
            'Point_59'
          ],
          type: 1,
          arrowDirection: 3,
          connectable: true
        },
        Point_56: {
          id: 'Point_56',
          coords: {
            x: 1054,
            y: 307
          },
          ownerId: 'place_21',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 2,
          connectable: true
        },
        Point_57: {
          id: 'Point_57',
          coords: {
            x: 1054,
            y: 247
          },
          ownerId: 'place_21',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 0,
          connectable: true
        },
        Point_62: {
          id: 'Point_62',
          coords: {
            x: 527,
            y: 268
          },
          ownerId: 'place_26',
          spawnedObjCnt: 2,
          bindings: [],
          type: 1,
          arrowDirection: 1,
          connectable: true
        },
        Point_63: {
          id: 'Point_63',
          coords: {
            x: 467,
            y: 268
          },
          ownerId: 'place_26',
          spawnedObjCnt: 0,
          bindings: [
            'Point_68'
          ],
          type: 1,
          arrowDirection: 3,
          connectable: true
        },
        Point_64: {
          id: 'Point_64',
          coords: {
            x: 497,
            y: 298
          },
          ownerId: 'place_26',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 2,
          connectable: true
        },
        Point_65: {
          id: 'Point_65',
          coords: {
            x: 497,
            y: 238
          },
          ownerId: 'place_26',
          spawnedObjCnt: 0,
          bindings: [],
          type: 1,
          arrowDirection: 0,
          connectable: true
        }
      },
      points: {
        Point_8: {
          id: 'Point_8',
          coords: {
            x: 325,
            y: 175
          }
        },
        Point_9: {
          id: 'Point_9',
          coords: {
            x: 234,
            y: 175
          }
        },
        Point_18: {
          id: 'Point_18',
          coords: {
            x: 335,
            y: 387
          }
        },
        Point_19: {
          id: 'Point_19',
          coords: {
            x: 230,
            y: 387
          }
        },
        Point_30: {
          id: 'Point_30',
          coords: {
            x: 459,
            y: 176
          }
        },
        Point_31: {
          id: 'Point_31',
          coords: {
            x: 468,
            y: 387
          }
        },
        Point_44: {
          id: 'Point_44',
          coords: {
            x: 646,
            y: 384
          }
        },
        Point_45: {
          id: 'Point_45',
          coords: {
            x: 642,
            y: 174
          }
        },
        Point_58: {
          id: 'Point_58',
          coords: {
            x: 927,
            y: 278
          }
        },
        Point_59: {
          id: 'Point_59',
          coords: {
            x: 1024,
            y: 277
          }
        },
        Point_60: {
          id: 'Point_60',
          coords: {
            x: 799,
            y: 248
          }
        },
        Point_61: {
          id: 'Point_61',
          coords: {
            x: 799,
            y: 308
          }
        },
        Point_66: {
          id: 'Point_66',
          coords: {
            x: 657,
            y: 214
          }
        },
        Point_67: {
          id: 'Point_67',
          coords: {
            x: 661,
            y: 344
          }
        },
        Point_68: {
          id: 'Point_68',
          coords: {
            x: 467,
            y: 268
          }
        },
        Point_69: {
          id: 'Point_69',
          coords: {
            x: 945,
            y: 78
          }
        },
        Point_70: {
          id: 'Point_70',
          coords: {
            x: 116.5,
            y: 75.5
          }
        },
        Point_71: {
          id: 'Point_71',
          coords: {
            x: 115.75,
            y: 266.75
          }
        }
      },
}