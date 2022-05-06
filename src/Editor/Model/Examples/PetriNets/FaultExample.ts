import { Example } from "Editor/Feature/SimObjectManagementSlice";
import { IEditorObject } from "Editor/Model/EditorObject";



export const FAULT_EXAMPLE : Example = {
    editorObjectCounter: 50,
    pointCounter: 120,
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
          x: 84,
          y: 179
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
          x: 176,
          y: 140
        },
        priority: 0,
        label: 'Generátor příchodů',
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
          x: 398,
          y: 180
        },
        label: 'Fronta',
        tokenCount: 0
      } as IEditorObject,
      outputarc_5: {
        id: 'outputarc_5',
        className: 'OutputArc',
        pointsId: [
          'Point_4',
          'Point_14'
        ],
        from: {
          objId: 'transition_1',
          pointId: 'Point_4'
        },
        to: {
          objId: 'place_4',
          pointId: 'Point_11'
        },
        allowedClassNames: [
          'Place'
        ],
        weight: 1,
        transitionId: 'transition_1',
        placeId: 'NULL_OBJ_ID'
      } as IEditorObject,
      transition_6: {
        id: 'transition_6',
        className: 'Transition',
        endPointIds: [
          'Point_15',
          'Point_16',
          'Point_17',
          'Point_18'
        ],
        coordinates: {
          x: 516,
          y: 140
        },
        priority: 0,
        label: 'Začíná obsluha',
        timeValue: 1,
        type: 'Okamžitý přechod'
      } as IEditorObject,
      inputarc_7: {
        id: 'inputarc_7',
        className: 'InputArc',
        pointsId: [
          'Point_10',
          'Point_19'
        ],
        from: {
          objId: 'place_4',
          pointId: 'Point_10'
        },
        to: {
          objId: 'transition_6',
          pointId: 'Point_16'
        },
        allowedClassNames: [
          'Transition'
        ],
        weight: 1,
        transitionId: 'NULL_OBJ_ID',
        placeId: 'place_4'
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
          x: 637,
          y: 304
        },
        label: 'Linka je volná',
        tokenCount: 1
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
          x: 715,
          y: 177
        },
        label: 'Probíhá obsluha...',
        tokenCount: 0
      } as IEditorObject,
      outputarc_12: {
        id: 'outputarc_12',
        className: 'OutputArc',
        pointsId: [
          'Point_15',
          'Point_30'
        ],
        from: {
          objId: 'transition_6',
          pointId: 'Point_15'
        },
        to: {
          objId: 'place_11',
          pointId: 'Point_27'
        },
        allowedClassNames: [
          'Place'
        ],
        weight: 1,
        transitionId: 'transition_6',
        placeId: 'NULL_OBJ_ID'
      } as IEditorObject,
      transition_13: {
        id: 'transition_13',
        className: 'Transition',
        endPointIds: [
          'Point_31',
          'Point_32',
          'Point_33',
          'Point_34'
        ],
        coordinates: {
          x: 865,
          y: 137
        },
        priority: 0,
        label: 'Obsluha dokončena',
        timeValue: 1,
        type: 'Časovaný přechod - Konstatní'
      } as IEditorObject,
      inputarc_14: {
        id: 'inputarc_14',
        className: 'InputArc',
        pointsId: [
          'Point_26',
          'Point_35'
        ],
        from: {
          objId: 'place_11',
          pointId: 'Point_26'
        },
        to: {
          objId: 'transition_13',
          pointId: 'Point_32'
        },
        allowedClassNames: [
          'Transition'
        ],
        weight: 1,
        transitionId: 'NULL_OBJ_ID',
        placeId: 'place_11'
      } as IEditorObject,
      place_16: {
        id: 'place_16',
        className: 'Place',
        endPointIds: [
          'Point_37',
          'Point_38',
          'Point_39',
          'Point_40'
        ],
        coordinates: {
          x: 1048,
          y: 178
        },
        label: '',
        tokenCount: 0
      } as IEditorObject,
      outputarc_17: {
        id: 'outputarc_17',
        className: 'OutputArc',
        pointsId: [
          'Point_31',
          'Point_41'
        ],
        from: {
          objId: 'transition_13',
          pointId: 'Point_31'
        },
        to: {
          objId: 'place_16',
          pointId: 'Point_38'
        },
        allowedClassNames: [
          'Place'
        ],
        weight: 1,
        transitionId: 'transition_13',
        placeId: 'NULL_OBJ_ID'
      } as IEditorObject,
      inputarc_18: {
        id: 'inputarc_18',
        className: 'InputArc',
        pointsId: [
          'Point_21',
          'Point_42'
        ],
        from: {
          objId: 'place_8',
          pointId: 'Point_21'
        },
        to: {
          objId: 'transition_6',
          pointId: 'Point_17'
        },
        allowedClassNames: [
          'Transition'
        ],
        weight: 1,
        transitionId: 'NULL_OBJ_ID',
        placeId: 'place_8'
      } as IEditorObject,
      place_20: {
        id: 'place_20',
        className: 'Place',
        endPointIds: [
          'Point_75',
          'Point_76',
          'Point_77',
          'Point_78'
        ],
        coordinates: {
          x: 72,
          y: 532
        },
        label: '',
        tokenCount: 1
      } as IEditorObject,
      transition_21: {
        id: 'transition_21',
        className: 'Transition',
        endPointIds: [
          'Point_79',
          'Point_80',
          'Point_81',
          'Point_82'
        ],
        coordinates: {
          x: 188,
          y: 491
        },
        priority: 0,
        label: 'Generátor poruchy',
        timeValue: 7,
        type: 'Časovaný přechod -  Exponenciální'
      } as IEditorObject,
      inputarc_22: {
        id: 'inputarc_22',
        className: 'InputArc',
        pointsId: [
          'Point_75',
          'Point_83'
        ],
        from: {
          objId: 'place_20',
          pointId: 'Point_75'
        },
        to: {
          objId: 'transition_21',
          pointId: 'Point_80'
        },
        allowedClassNames: [
          'Transition'
        ],
        weight: 1,
        transitionId: 'NULL_OBJ_ID',
        placeId: 'place_20'
      } as IEditorObject,
      outputarc_23: {
        id: 'outputarc_23',
        className: 'OutputArc',
        pointsId: [
          'Point_80',
          'Point_84'
        ],
        from: {
          objId: 'transition_21',
          pointId: 'Point_80'
        },
        to: {
          objId: 'place_20',
          pointId: 'Point_75'
        },
        allowedClassNames: [
          'Place'
        ],
        weight: 1,
        transitionId: 'transition_21',
        placeId: 'NULL_OBJ_ID'
      } as IEditorObject,
      place_24: {
        id: 'place_24',
        className: 'Place',
        endPointIds: [
          'Point_85',
          'Point_86',
          'Point_87',
          'Point_88'
        ],
        coordinates: {
          x: 421,
          y: 534
        },
        label: '',
        tokenCount: 0
      } as IEditorObject,
      outputarc_25: {
        id: 'outputarc_25',
        className: 'OutputArc',
        pointsId: [
          'Point_79',
          'Point_89'
        ],
        from: {
          objId: 'transition_21',
          pointId: 'Point_79'
        },
        to: {
          objId: 'place_24',
          pointId: 'Point_86'
        },
        allowedClassNames: [
          'Place'
        ],
        weight: 1,
        transitionId: 'transition_21',
        placeId: 'NULL_OBJ_ID'
      } as IEditorObject,
      transition_26: {
        id: 'transition_26',
        className: 'Transition',
        endPointIds: [
          'Point_90',
          'Point_91',
          'Point_92',
          'Point_93'
        ],
        coordinates: {
          x: 749,
          y: 493
        },
        priority: 1,
        label: '',
        timeValue: 1,
        type: 'Okamžitý přechod'
      } as IEditorObject,
      inputarc_27: {
        id: 'inputarc_27',
        className: 'InputArc',
        pointsId: [
          'Point_85',
          'Point_94'
        ],
        from: {
          objId: 'place_24',
          pointId: 'Point_85'
        },
        to: {
          objId: 'transition_26',
          pointId: 'Point_91'
        },
        allowedClassNames: [
          'Transition'
        ],
        weight: 1,
        transitionId: 'NULL_OBJ_ID',
        placeId: 'place_24'
      } as IEditorObject,
      place_29: {
        id: 'place_29',
        className: 'Place',
        endPointIds: [
          'Point_96',
          'Point_97',
          'Point_98',
          'Point_99'
        ],
        coordinates: {
          x: 903,
          y: 535
        },
        label: '',
        tokenCount: 0
      } as IEditorObject,
      outputarc_30: {
        id: 'outputarc_30',
        className: 'OutputArc',
        pointsId: [
          'Point_90',
          'Point_100'
        ],
        from: {
          objId: 'transition_26',
          pointId: 'Point_90'
        },
        to: {
          objId: 'place_29',
          pointId: 'Point_97'
        },
        allowedClassNames: [
          'Place'
        ],
        weight: 1,
        transitionId: 'transition_26',
        placeId: 'NULL_OBJ_ID'
      } as IEditorObject,
      transition_31: {
        id: 'transition_31',
        className: 'Transition',
        endPointIds: [
          'Point_101',
          'Point_102',
          'Point_103',
          'Point_104'
        ],
        coordinates: {
          x: 1001,
          y: 495
        },
        priority: 0,
        label: '',
        timeValue: 5,
        type: 'Časovaný přechod - Konstatní'
      } as IEditorObject,
      inputarc_33: {
        id: 'inputarc_33',
        className: 'InputArc',
        pointsId: [
          'Point_96',
          'Point_106'
        ],
        from: {
          objId: 'place_29',
          pointId: 'Point_96'
        },
        to: {
          objId: 'transition_31',
          pointId: 'Point_102'
        },
        allowedClassNames: [
          'Transition'
        ],
        weight: 1,
        transitionId: 'NULL_OBJ_ID',
        placeId: 'place_29'
      } as IEditorObject,
      outputarc_34: {
        id: 'outputarc_34',
        className: 'OutputArc',
        pointsId: [
          'Point_104',
          'Point_108',
          'Point_107'
        ],
        from: {
          objId: 'transition_31',
          pointId: 'Point_104'
        },
        to: {
          objId: 'place_8',
          pointId: 'Point_20'
        },
        allowedClassNames: [
          'Place'
        ],
        weight: 1,
        transitionId: 'transition_31',
        placeId: 'NULL_OBJ_ID'
      } as IEditorObject,
      place_50: {
        id: 'place_50',
        className: 'Place',
        endPointIds: [
          'Point_176',
          'Point_177',
          'Point_178',
          'Point_179'
        ],
        coordinates: {
          x: 765,
          y: 418
        },
        label: '',
        tokenCount: 0
      } as IEditorObject,
      outputarc_51: {
        id: 'outputarc_51',
        className: 'OutputArc',
        pointsId: [
          'Point_33',
          'Point_180'
        ],
        from: {
          objId: 'transition_13',
          pointId: 'Point_33'
        },
        to: {
          objId: 'place_50',
          pointId: 'Point_179'
        },
        allowedClassNames: [
          'Place'
        ],
        weight: 1,
        transitionId: 'transition_13',
        placeId: 'NULL_OBJ_ID'
      } as IEditorObject,
      inputarc_52: {
        id: 'inputarc_52',
        className: 'InputArc',
        pointsId: [
          'Point_178',
          'Point_181'
        ],
        from: {
          objId: 'place_50',
          pointId: 'Point_178'
        },
        to: {
          objId: 'transition_26',
          pointId: 'Point_93'
        },
        allowedClassNames: [
          'Transition'
        ],
        weight: 1,
        transitionId: 'NULL_OBJ_ID',
        placeId: 'place_50'
      } as IEditorObject,
      transition_53: {
        id: 'transition_53',
        className: 'Transition',
        endPointIds: [
          'Point_182',
          'Point_183',
          'Point_184',
          'Point_185'
        ],
        coordinates: {
          x: 624,
          y: 378
        },
        priority: 0,
        label: '',
        timeValue: 1,
        type: 'Okamžitý přechod'
      } as IEditorObject,
      outputarc_54: {
        id: 'outputarc_54',
        className: 'OutputArc',
        pointsId: [
          'Point_185',
          'Point_186'
        ],
        from: {
          objId: 'transition_53',
          pointId: 'Point_185'
        },
        to: {
          objId: 'place_8',
          pointId: 'Point_22'
        },
        allowedClassNames: [
          'Place'
        ],
        weight: 1,
        transitionId: 'transition_53',
        placeId: 'NULL_OBJ_ID'
      } as IEditorObject,
      inputarc_55: {
        id: 'inputarc_55',
        className: 'InputArc',
        pointsId: [
          'Point_177',
          'Point_187'
        ],
        from: {
          objId: 'place_50',
          pointId: 'Point_177'
        },
        to: {
          objId: 'transition_53',
          pointId: 'Point_182'
        },
        allowedClassNames: [
          'Transition'
        ],
        weight: 1,
        transitionId: 'NULL_OBJ_ID',
        placeId: 'place_50'
      } as IEditorObject
    },
    edgeObjectsIds: [
      'outputarc_51',
      'inputarc_52',
      'outputarc_54',
      'inputarc_55'
    ],
    selectedObjectId: null,
    endPoints: {
      Point_0: {
        id: 'Point_0',
        coords: {
          x: 114,
          y: 179
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
          x: 54,
          y: 179
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
          x: 84,
          y: 209
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
          x: 84,
          y: 149
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
          x: 206,
          y: 180
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
          x: 176,
          y: 180
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
          x: 191,
          y: 220
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
          x: 191,
          y: 140
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
          x: 427,
          y: 180
        },
        ownerId: 'place_4',
        spawnedObjCnt: 1,
        bindings: [],
        type: 1,
        arrowDirection: 1,
        connectable: true
      },
      Point_11: {
        id: 'Point_11',
        coords: {
          x: 367,
          y: 180
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
          x: 397,
          y: 210
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
          x: 397,
          y: 150
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
          x: 547,
          y: 180
        },
        ownerId: 'transition_6',
        spawnedObjCnt: 1,
        bindings: [],
        type: 1,
        arrowDirection: 1,
        connectable: true
      },
      Point_16: {
        id: 'Point_16',
        coords: {
          x: 517,
          y: 180
        },
        ownerId: 'transition_6',
        spawnedObjCnt: 0,
        bindings: [
          'Point_19'
        ],
        type: 1,
        arrowDirection: 3,
        connectable: true
      },
      Point_17: {
        id: 'Point_17',
        coords: {
          x: 532,
          y: 220
        },
        ownerId: 'transition_6',
        spawnedObjCnt: 0,
        bindings: [
          'Point_42'
        ],
        type: 1,
        arrowDirection: 2,
        connectable: true
      },
      Point_18: {
        id: 'Point_18',
        coords: {
          x: 532,
          y: 140
        },
        ownerId: 'transition_6',
        spawnedObjCnt: 0,
        bindings: [],
        type: 1,
        arrowDirection: 0,
        connectable: true
      },
      Point_20: {
        id: 'Point_20',
        coords: {
          x: 668,
          y: 304
        },
        ownerId: 'place_8',
        spawnedObjCnt: 0,
        bindings: [
          'Point_107'
        ],
        type: 1,
        arrowDirection: 1,
        connectable: true
      },
      Point_21: {
        id: 'Point_21',
        coords: {
          x: 608,
          y: 304
        },
        ownerId: 'place_8',
        spawnedObjCnt: 1,
        bindings: [],
        type: 1,
        arrowDirection: 3,
        connectable: true
      },
      Point_22: {
        id: 'Point_22',
        coords: {
          x: 638,
          y: 334
        },
        ownerId: 'place_8',
        spawnedObjCnt: 0,
        bindings: [
          'Point_186'
        ],
        type: 1,
        arrowDirection: 2,
        connectable: true
      },
      Point_23: {
        id: 'Point_23',
        coords: {
          x: 638,
          y: 274
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
          x: 745,
          y: 178
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
          x: 685,
          y: 178
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
          x: 715,
          y: 208
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
          x: 715,
          y: 148
        },
        ownerId: 'place_11',
        spawnedObjCnt: 0,
        bindings: [],
        type: 1,
        arrowDirection: 0,
        connectable: true
      },
      Point_31: {
        id: 'Point_31',
        coords: {
          x: 895,
          y: 178
        },
        ownerId: 'transition_13',
        spawnedObjCnt: 1,
        bindings: [],
        type: 1,
        arrowDirection: 1,
        connectable: true
      },
      Point_32: {
        id: 'Point_32',
        coords: {
          x: 865,
          y: 178
        },
        ownerId: 'transition_13',
        spawnedObjCnt: 0,
        bindings: [
          'Point_35'
        ],
        type: 1,
        arrowDirection: 3,
        connectable: true
      },
      Point_33: {
        id: 'Point_33',
        coords: {
          x: 880,
          y: 218
        },
        ownerId: 'transition_13',
        spawnedObjCnt: 1,
        bindings: [],
        type: 1,
        arrowDirection: 2,
        connectable: true
      },
      Point_34: {
        id: 'Point_34',
        coords: {
          x: 880,
          y: 138
        },
        ownerId: 'transition_13',
        spawnedObjCnt: 0,
        bindings: [],
        type: 1,
        arrowDirection: 0,
        connectable: true
      },
      Point_37: {
        id: 'Point_37',
        coords: {
          x: 1078,
          y: 177
        },
        ownerId: 'place_16',
        spawnedObjCnt: 0,
        bindings: [],
        type: 1,
        arrowDirection: 1,
        connectable: true
      },
      Point_38: {
        id: 'Point_38',
        coords: {
          x: 1018,
          y: 177
        },
        ownerId: 'place_16',
        spawnedObjCnt: 0,
        bindings: [
          'Point_41'
        ],
        type: 1,
        arrowDirection: 3,
        connectable: true
      },
      Point_39: {
        id: 'Point_39',
        coords: {
          x: 1048,
          y: 207
        },
        ownerId: 'place_16',
        spawnedObjCnt: 0,
        bindings: [],
        type: 1,
        arrowDirection: 2,
        connectable: true
      },
      Point_40: {
        id: 'Point_40',
        coords: {
          x: 1048,
          y: 147
        },
        ownerId: 'place_16',
        spawnedObjCnt: 0,
        bindings: [],
        type: 1,
        arrowDirection: 0,
        connectable: true
      },
      Point_75: {
        id: 'Point_75',
        coords: {
          x: 103,
          y: 533
        },
        ownerId: 'place_20',
        spawnedObjCnt: 1,
        bindings: [
          'Point_84'
        ],
        type: 1,
        arrowDirection: 1,
        connectable: true
      },
      Point_76: {
        id: 'Point_76',
        coords: {
          x: 43,
          y: 533
        },
        ownerId: 'place_20',
        spawnedObjCnt: 0,
        bindings: [],
        type: 1,
        arrowDirection: 3,
        connectable: true
      },
      Point_77: {
        id: 'Point_77',
        coords: {
          x: 73,
          y: 563
        },
        ownerId: 'place_20',
        spawnedObjCnt: 0,
        bindings: [],
        type: 1,
        arrowDirection: 2,
        connectable: true
      },
      Point_78: {
        id: 'Point_78',
        coords: {
          x: 73,
          y: 503
        },
        ownerId: 'place_20',
        spawnedObjCnt: 0,
        bindings: [],
        type: 1,
        arrowDirection: 0,
        connectable: true
      },
      Point_79: {
        id: 'Point_79',
        coords: {
          x: 218,
          y: 532
        },
        ownerId: 'transition_21',
        spawnedObjCnt: 1,
        bindings: [],
        type: 1,
        arrowDirection: 1,
        connectable: true
      },
      Point_80: {
        id: 'Point_80',
        coords: {
          x: 188,
          y: 532
        },
        ownerId: 'transition_21',
        spawnedObjCnt: 1,
        bindings: [
          'Point_83'
        ],
        type: 1,
        arrowDirection: 3,
        connectable: true
      },
      Point_81: {
        id: 'Point_81',
        coords: {
          x: 203,
          y: 572
        },
        ownerId: 'transition_21',
        spawnedObjCnt: 0,
        bindings: [],
        type: 1,
        arrowDirection: 2,
        connectable: true
      },
      Point_82: {
        id: 'Point_82',
        coords: {
          x: 203,
          y: 492
        },
        ownerId: 'transition_21',
        spawnedObjCnt: 0,
        bindings: [],
        type: 1,
        arrowDirection: 0,
        connectable: true
      },
      Point_85: {
        id: 'Point_85',
        coords: {
          x: 452,
          y: 533
        },
        ownerId: 'place_24',
        spawnedObjCnt: 1,
        bindings: [],
        type: 1,
        arrowDirection: 1,
        connectable: true
      },
      Point_86: {
        id: 'Point_86',
        coords: {
          x: 392,
          y: 533
        },
        ownerId: 'place_24',
        spawnedObjCnt: 0,
        bindings: [
          'Point_89'
        ],
        type: 1,
        arrowDirection: 3,
        connectable: true
      },
      Point_87: {
        id: 'Point_87',
        coords: {
          x: 422,
          y: 563
        },
        ownerId: 'place_24',
        spawnedObjCnt: 0,
        bindings: [],
        type: 1,
        arrowDirection: 2,
        connectable: true
      },
      Point_88: {
        id: 'Point_88',
        coords: {
          x: 422,
          y: 503
        },
        ownerId: 'place_24',
        spawnedObjCnt: 0,
        bindings: [],
        type: 1,
        arrowDirection: 0,
        connectable: true
      },
      Point_90: {
        id: 'Point_90',
        coords: {
          x: 779,
          y: 534
        },
        ownerId: 'transition_26',
        spawnedObjCnt: 1,
        bindings: [],
        type: 1,
        arrowDirection: 1,
        connectable: true
      },
      Point_91: {
        id: 'Point_91',
        coords: {
          x: 749,
          y: 534
        },
        ownerId: 'transition_26',
        spawnedObjCnt: 0,
        bindings: [
          'Point_94'
        ],
        type: 1,
        arrowDirection: 3,
        connectable: true
      },
      Point_92: {
        id: 'Point_92',
        coords: {
          x: 764,
          y: 574
        },
        ownerId: 'transition_26',
        spawnedObjCnt: 0,
        bindings: [],
        type: 1,
        arrowDirection: 2,
        connectable: true
      },
      Point_93: {
        id: 'Point_93',
        coords: {
          x: 764,
          y: 494
        },
        ownerId: 'transition_26',
        spawnedObjCnt: 0,
        bindings: [
          'Point_181'
        ],
        type: 1,
        arrowDirection: 0,
        connectable: true
      },
      Point_96: {
        id: 'Point_96',
        coords: {
          x: 933,
          y: 535
        },
        ownerId: 'place_29',
        spawnedObjCnt: 1,
        bindings: [],
        type: 1,
        arrowDirection: 1,
        connectable: true
      },
      Point_97: {
        id: 'Point_97',
        coords: {
          x: 873,
          y: 535
        },
        ownerId: 'place_29',
        spawnedObjCnt: 0,
        bindings: [
          'Point_100'
        ],
        type: 1,
        arrowDirection: 3,
        connectable: true
      },
      Point_98: {
        id: 'Point_98',
        coords: {
          x: 903,
          y: 565
        },
        ownerId: 'place_29',
        spawnedObjCnt: 0,
        bindings: [],
        type: 1,
        arrowDirection: 2,
        connectable: true
      },
      Point_99: {
        id: 'Point_99',
        coords: {
          x: 903,
          y: 505
        },
        ownerId: 'place_29',
        spawnedObjCnt: 0,
        bindings: [],
        type: 1,
        arrowDirection: 0,
        connectable: true
      },
      Point_101: {
        id: 'Point_101',
        coords: {
          x: 1032,
          y: 535
        },
        ownerId: 'transition_31',
        spawnedObjCnt: 0,
        bindings: [],
        type: 1,
        arrowDirection: 1,
        connectable: true
      },
      Point_102: {
        id: 'Point_102',
        coords: {
          x: 1002,
          y: 535
        },
        ownerId: 'transition_31',
        spawnedObjCnt: 0,
        bindings: [
          'Point_106'
        ],
        type: 1,
        arrowDirection: 3,
        connectable: true
      },
      Point_103: {
        id: 'Point_103',
        coords: {
          x: 1017,
          y: 575
        },
        ownerId: 'transition_31',
        spawnedObjCnt: 0,
        bindings: [],
        type: 1,
        arrowDirection: 2,
        connectable: true
      },
      Point_104: {
        id: 'Point_104',
        coords: {
          x: 1017,
          y: 495
        },
        ownerId: 'transition_31',
        spawnedObjCnt: 1,
        bindings: [],
        type: 1,
        arrowDirection: 0,
        connectable: true
      },
      Point_176: {
        id: 'Point_176',
        coords: {
          x: 794,
          y: 418
        },
        ownerId: 'place_50',
        spawnedObjCnt: 0,
        bindings: [],
        type: 1,
        arrowDirection: 1,
        connectable: true
      },
      Point_177: {
        id: 'Point_177',
        coords: {
          x: 734,
          y: 418
        },
        ownerId: 'place_50',
        spawnedObjCnt: 1,
        bindings: [],
        type: 1,
        arrowDirection: 3,
        connectable: true
      },
      Point_178: {
        id: 'Point_178',
        coords: {
          x: 764,
          y: 448
        },
        ownerId: 'place_50',
        spawnedObjCnt: 1,
        bindings: [],
        type: 1,
        arrowDirection: 2,
        connectable: true
      },
      Point_179: {
        id: 'Point_179',
        coords: {
          x: 764,
          y: 388
        },
        ownerId: 'place_50',
        spawnedObjCnt: 0,
        bindings: [
          'Point_180'
        ],
        type: 1,
        arrowDirection: 0,
        connectable: true
      },
      Point_182: {
        id: 'Point_182',
        coords: {
          x: 654,
          y: 419
        },
        ownerId: 'transition_53',
        spawnedObjCnt: 0,
        bindings: [
          'Point_187'
        ],
        type: 1,
        arrowDirection: 1,
        connectable: true
      },
      Point_183: {
        id: 'Point_183',
        coords: {
          x: 624,
          y: 419
        },
        ownerId: 'transition_53',
        spawnedObjCnt: 0,
        bindings: [],
        type: 1,
        arrowDirection: 3,
        connectable: true
      },
      Point_184: {
        id: 'Point_184',
        coords: {
          x: 639,
          y: 459
        },
        ownerId: 'transition_53',
        spawnedObjCnt: 0,
        bindings: [],
        type: 1,
        arrowDirection: 2,
        connectable: true
      },
      Point_185: {
        id: 'Point_185',
        coords: {
          x: 639,
          y: 379
        },
        ownerId: 'transition_53',
        spawnedObjCnt: 1,
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
          x: 176,
          y: 180
        }
      },
      Point_9: {
        id: 'Point_9',
        coords: {
          x: 114,
          y: 179
        }
      },
      Point_14: {
        id: 'Point_14',
        coords: {
          x: 367,
          y: 180
        }
      },
      Point_19: {
        id: 'Point_19',
        coords: {
          x: 517,
          y: 180
        }
      },
      Point_30: {
        id: 'Point_30',
        coords: {
          x: 685,
          y: 178
        }
      },
      Point_35: {
        id: 'Point_35',
        coords: {
          x: 865,
          y: 178
        }
      },
      Point_41: {
        id: 'Point_41',
        coords: {
          x: 1018,
          y: 177
        }
      },
      Point_42: {
        id: 'Point_42',
        coords: {
          x: 532,
          y: 220
        }
      },
      Point_83: {
        id: 'Point_83',
        coords: {
          x: 188,
          y: 532
        }
      },
      Point_84: {
        id: 'Point_84',
        coords: {
          x: 103,
          y: 533
        }
      },
      Point_89: {
        id: 'Point_89',
        coords: {
          x: 392,
          y: 533
        }
      },
      Point_94: {
        id: 'Point_94',
        coords: {
          x: 749,
          y: 534
        }
      },
      Point_100: {
        id: 'Point_100',
        coords: {
          x: 873,
          y: 535
        }
      },
      Point_106: {
        id: 'Point_106',
        coords: {
          x: 1002,
          y: 535
        }
      },
      Point_107: {
        id: 'Point_107',
        coords: {
          x: 668,
          y: 304
        }
      },
      Point_108: {
        id: 'Point_108',
        coords: {
          x: 1019,
          y: 304
        }
      },
      Point_180: {
        id: 'Point_180',
        coords: {
          x: 764,
          y: 388
        }
      },
      Point_181: {
        id: 'Point_181',
        coords: {
          x: 764,
          y: 494
        }
      },
      Point_186: {
        id: 'Point_186',
        coords: {
          x: 638,
          y: 334
        }
      },
      Point_187: {
        id: 'Point_187',
        coords: {
          x: 654,
          y: 419
        }
      }
    },
  }