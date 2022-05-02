import { Example } from "Editor/Feature/SimObjectManagementSlice";
import { IEditorObject } from "Editor/Model/EditorObject";

export const EXAMPLE_ONE : Example = {
  editorObjectCounter: 3, 
  pointCounter: 10,
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
        x: 237,
        y: 292
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
        x: 360,
        y: 256
      },
      priority: 0,
      label: '',
      timeValue: 1,
      type: 'Časovaný přechod - Konstatní'
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
    } as IEditorObject
  },
  edgeObjectsIds: [
    'inputarc_2'
  ],
  selectedObjectId: null,
  endPoints: {
    Point_0: {
      id: 'Point_0',
      coords: {
        x: 267,
        y: 293
      },
      ownerId: 'place_0',
      spawnedObjCnt: 1,
      bindings: [],
      type: 1,
      arrowDirection: 1,
      connectable: true
    },
    Point_1: {
      id: 'Point_1',
      coords: {
        x: 207,
        y: 293
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
        x: 237,
        y: 323
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
        x: 237,
        y: 263
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
        x: 391,
        y: 295
      },
      ownerId: 'transition_1',
      spawnedObjCnt: 0,
      bindings: [],
      type: 1,
      arrowDirection: 1,
      connectable: true
    },
    Point_5: {
      id: 'Point_5',
      coords: {
        x: 361,
        y: 295
      },
      ownerId: 'transition_1',
      spawnedObjCnt: 0,
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
        x: 376,
        y: 335
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
        x: 376,
        y: 255
      },
      ownerId: 'transition_1',
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
        x: 361,
        y: 295
      }
    }
  }
}
