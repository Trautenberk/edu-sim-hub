import { Example } from "Editor/Feature/SimObjectManagementSlice";
import { IEditorObject } from "Editor/Model/EditorObject";



export const FIRST_EXAMPLE : Example = {
    editorObjectCounter : 5,
    pointCounter : 5,
    objects: {
        integrator_0: {
          id: 'integrator_0',
          className: 'Integrator',
          endPointIds: [
            'Point_0',
            'Point_1'
          ],
          coordinates: {
            x: 409,
            y: 174
          },
          initialValue: 0
        } as  IEditorObject,
        constant_1: {
          id: 'constant_1',
          className: 'Constant',
          endPointIds: [
            'Point_2'
          ],
          coordinates: {
            x: 237,
            y: 174
          },
          value: 1
        } as  IEditorObject,
        signal_2: {
          id: 'signal_2',
          className: 'Signal',
          pointsId: [
            'Point_2',
            'Point_3'
          ],
          from: {
            objId: 'constant_1',
            pointId: 'Point_2'
          },
          to: {
            objId: 'integrator_0',
            pointId: 'Point_0'
          },
          allowedClassNames: []
        } as  IEditorObject
      },
      edgeObjectsIds: [
        'signal_2'
      ],
      selectedObjectId: null,
      endPoints: {
        Point_0: {
          id: 'Point_0',
          coords: {
            x: 410,
            y: 209
          },
          ownerId: 'integrator_0',
          spawnedObjCnt: 0,
          bindings: [
            'Point_3'
          ],
          type: 0,
          connectable: true
        },
        Point_1: {
          id: 'Point_1',
          coords: {
            x: 480,
            y: 209
          },
          ownerId: 'integrator_0',
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
            x: 307,
            y: 210
          },
          ownerId: 'constant_1',
          spawnedObjCnt: 1,
          bindings: [],
          type: 2,
          arrowDirection: 1,
          maxSpawnedObj: 1,
          connectable: false
        }
      },
      points: {
        Point_3: {
          id: 'Point_3',
          coords: {
            x: 410,
            y: 209
          }
        }
      },
}