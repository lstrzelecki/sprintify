import { type, returnOf } from '@utils/types';

export function dragInProgress(status: boolean) {
  return { dragInProgress: status, ...type('DRAG_IN_PROGRESS') };
}

const DragInProgressRet = returnOf(dragInProgress); export type DragInProgressAction = typeof DragInProgressRet;

export type Action = DragInProgressAction;