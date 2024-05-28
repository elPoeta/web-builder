/* eslint-disable no-case-declarations */
import { WebEditorAction } from "./webEditor-actions";
import { HistoryState, WebEditorState, WebEditorElement } from "./webEditor-provider";

const initialWebEditorState: WebEditorState['editor'] = {
  elements: [
    {
      content: [],
      id: '__body',
      name: 'Body',
      styles: {},
      type: '__body',
    },
  ],
  selectedElement: {
    id: '',
    content: [],
    name: '',
    styles: {},
    type: null,
  },
  device: 'Desktop',
  previewMode: false,
  liveMode: false,
  pageId: '',
}

const initialHistoryState: HistoryState = {
  history: [initialWebEditorState],
  currentIndex: 0,
}

export const initialState: WebEditorState = {
  editor: initialWebEditorState,
  history: initialHistoryState,
}

const addAnElement = (
  editorArray: WebEditorElement[],
  action: WebEditorAction
): WebEditorElement[] => {
  if (action.type !== 'ADD_ELEMENT')
    throw Error(
      'You sent the wrong action type to the Add Element web-editor State'
    )
  return editorArray.map((item) => {
    if (item.id === action.payload.containerId && Array.isArray(item.content)) {
      return {
        ...item,
        content: [...item.content, action.payload.elementDetails],
      }
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: addAnElement(item.content, action),
      }
    }
    return item
  })
}

const updateAnElement = (
  editorArray: WebEditorElement[],
  action: WebEditorAction
): WebEditorElement[] => {
  if (action.type !== 'UPDATE_ELEMENT') {
    throw Error('You sent the wrong action type to the update Element State')
  }
  return editorArray.map((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return { ...item, ...action.payload.elementDetails }
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: updateAnElement(item.content, action),
      }
    }
    return item
  })
}

const deleteAnElement = (
  editorArray: WebEditorElement[],
  action: WebEditorAction
): WebEditorElement[] => {
  if (action.type !== 'DELETE_ELEMENT')
    throw Error(
      'You sent the wrong action type to the Delete Element editor State'
    )
  return editorArray.filter((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return false
    } else if (item.content && Array.isArray(item.content)) {
      item.content = deleteAnElement(item.content, action)
    }
    return true
  })
}

export const WebEditorReducer = (
  state: WebEditorState = initialState,
  action: WebEditorAction
): WebEditorState => {
  switch (action.type) {
    case 'ADD_ELEMENT':
      const updatedEditorState = {
        ...state.editor,
        elements: addAnElement(state.editor.elements, action),
      }

      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorState },
      ]

      const newEditorState = {
        ...state,
        editor: updatedEditorState,
        history: {
          ...state.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        },
      }

      return newEditorState

    case 'UPDATE_ELEMENT':
      const updatedElements = updateAnElement(state.editor.elements, action)

      const UpdatedElementIsSelected =
        state.editor.selectedElement.id === action.payload.elementDetails.id

      const updatedEditorStateWithUpdate = {
        ...state.editor,
        elements: updatedElements,
        selectedElement: UpdatedElementIsSelected
          ? action.payload.elementDetails
          : {
            id: '',
            content: [],
            name: '',
            styles: {},
            type: null,
          },
      }

      const updatedHistoryWithUpdate = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithUpdate },
      ]
      const updatedEditor = {
        ...state,
        editor: updatedEditorStateWithUpdate,
        history: {
          ...state.history,
          history: updatedHistoryWithUpdate,
          currentIndex: updatedHistoryWithUpdate.length - 1,
        },
      }
      return updatedEditor

    case 'DELETE_ELEMENT':
      const updatedElementsAfterDelete = deleteAnElement(
        state.editor.elements,
        action
      )
      const updatedEditorStateAfterDelete = {
        ...state.editor,
        elements: updatedElementsAfterDelete,
      }
      const updatedHistoryAfterDelete = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateAfterDelete },
      ]

      const deletedState = {
        ...state,
        editor: updatedEditorStateAfterDelete,
        history: {
          ...state.history,
          history: updatedHistoryAfterDelete,
          currentIndex: updatedHistoryAfterDelete.length - 1,
        },
      }
      return deletedState

    case 'REDO':
      if (state.history.currentIndex < state.history.history.length - 1) {
        const nextIndex = state.history.currentIndex + 1
        const nextEditorState = { ...state.history.history[nextIndex] }
        const redoState = {
          ...state,
          editor: nextEditorState,
          history: {
            ...state.history,
            currentIndex: nextIndex,
          },
        }
        return redoState
      }
      return state

    case 'UNDO':
      if (state.history.currentIndex > 0) {
        const prevIndex = state.history.currentIndex - 1
        const prevEditorState = { ...state.history.history[prevIndex] }
        const undoState = {
          ...state,
          editor: prevEditorState,
          history: {
            ...state.history,
            currentIndex: prevIndex,
          },
        }
        return undoState
      }
      return state

    case 'CHANGE_DEVICE':
      const changedDeviceState = {
        ...state,
        editor: {
          ...state.editor,
          device: action.payload.device,
        },
      }
      return changedDeviceState

    case 'TOGGLE_PREVIEW_MODE':
      const toggleState = {
        ...state,
        editor: {
          ...state.editor,
          previewMode: !state.editor.previewMode,
        },
      }
      return toggleState

    case 'TOGGLE_LIVE_MODE':
      const toggleLiveMode: WebEditorState = {
        ...state,
        editor: {
          ...state.editor,
          liveMode: action.payload
            ? action.payload.value
            : !state.editor.liveMode,
        },
      }
      return toggleLiveMode

    case 'LOAD_DATA':
      return {
        ...initialState,
        editor: {
          ...initialState.editor,
          elements: action.payload.elements || initialWebEditorState.elements,
          liveMode: !!action.payload.withLive,
        },
      }

    case 'SET_PAGE_ID':
      const { pageId } = action.payload
      const updatedEditorStateWithPageId = {
        ...state.editor,
        pageId,
      }

      const updatedHistoryWithPageId = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithPageId },
      ]

      const pageIdState = {
        ...state,
        editor: updatedEditorStateWithPageId,
        history: {
          ...state.history,
          history: updatedHistoryWithPageId,
          currentIndex: updatedHistoryWithPageId.length - 1,
        },
      }
      return pageIdState

    default:
      return state
  }
}
