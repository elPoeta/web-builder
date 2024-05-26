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

        default:
        return state
    }
  }