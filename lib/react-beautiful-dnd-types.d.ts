declare module "react-beautiful-dnd" {
  export const DragDropContext: any
  export const Droppable: any
  export const Draggable: any
  export interface DropResult {
    draggableId: string
    type: string
    source: {
      droppableId: string
      index: number
    }
    destination?: {
      droppableId: string
      index: number
    }
    reason: "DROP" | "CANCEL"
  }
}
