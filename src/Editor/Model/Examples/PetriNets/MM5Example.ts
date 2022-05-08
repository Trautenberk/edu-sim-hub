import { Example } from "Editor/Feature/SimObjectManagementSlice";
import { IEditorObject } from "Editor/Model/EditorObject";



export const MM5_EXAMPLE : Example = {
    editorObjectCounter: 20,
    pointCounter: 43,
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
            x: 641,
            y: 336
          },
          label: 'Linka je volná',
          tokenCount: 5
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
            x: 706,
            y: 181
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
            x: 871,
            y: 141
          },
          priority: 0,
          label: 'Obsluha dokončena',
          timeValue: 1,
          type: 'Časovaný přechod -  Exponenciální'
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
        outputarc_15: {
          id: 'outputarc_15',
          className: 'OutputArc',
          pointsId: [
            'Point_33',
            'Point_36'
          ],
          from: {
            objId: 'transition_13',
            pointId: 'Point_33'
          },
          to: {
            objId: 'place_8',
            pointId: 'Point_20'
          },
          allowedClassNames: [
            'Place'
          ],
          weight: 1,
          transitionId: 'transition_13',
          placeId: 'NULL_OBJ_ID'
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
            x: 1067,
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
        } as IEditorObject
      },
      edgeObjectsIds: [
        'inputarc_2',
        'inputarc_7',
        'inputarc_14',
        'inputarc_18',
        'outputarc_3',
        'outputarc_5',
        'outputarc_12',
        'outputarc_15',
        'outputarc_17',
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
            x: 428,
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
            x: 368,
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
            x: 398,
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
            x: 398,
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
            x: 672,
            y: 336
          },
          ownerId: 'place_8',
          spawnedObjCnt: 0,
          bindings: [
            'Point_36'
          ],
          type: 1,
          arrowDirection: 1,
          connectable: true
        },
        Point_21: {
          id: 'Point_21',
          coords: {
            x: 612,
            y: 336
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
            x: 642,
            y: 366
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
            x: 642,
            y: 306
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
            x: 735,
            y: 181
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
            x: 675,
            y: 181
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
            x: 705,
            y: 211
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
            x: 705,
            y: 151
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
            x: 901,
            y: 181
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
            x: 871,
            y: 181
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
            x: 886,
            y: 221
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
            x: 886,
            y: 141
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
            x: 1097,
            y: 179
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
            x: 1037,
            y: 179
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
            x: 1067,
            y: 209
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
            x: 1067,
            y: 149
          },
          ownerId: 'place_16',
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
            x: 368,
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
            x: 675,
            y: 181
          }
        },
        Point_35: {
          id: 'Point_35',
          coords: {
            x: 871,
            y: 181
          }
        },
        Point_36: {
          id: 'Point_36',
          coords: {
            x: 672,
            y: 336
          }
        },
        Point_41: {
          id: 'Point_41',
          coords: {
            x: 1037,
            y: 179
          }
        },
        Point_42: {
          id: 'Point_42',
          coords: {
            x: 532,
            y: 220
          }
        }
      },
}