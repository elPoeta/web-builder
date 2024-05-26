import React, { createContext, Dispatch, useReducer } from 'react'
import { WebEditorButtons } from '@/lib/constants'
import { WebEditorAction } from './webEditor-actions'
import { initialState, WebEditorReducer } from './webEditor-reducer'


export type DeviceTypes = 'Desktop' | 'Mobile' | 'Tablet'

export type WebEditorElement = {
	id: string
	styles: React.CSSProperties,
	name: string
	type: WebEditorButtons
	content: WebEditorElement[] | { href?: string; innerText?: string; src?: string }
}

export type WebEditor = {
	liveMode: boolean
	elements: WebEditorElement[]
	selectedElement: WebEditorElement
	device: DeviceTypes
	previewMode: boolean
	pageId: string
}

export type HistoryState = {
	history: WebEditor[]
	currentIndex: number
  }
  
export type WebEditorState = {
	editor: WebEditor
	history: HistoryState
}

export type WebEditorContextData = {
	device: DeviceTypes
	previewMode: boolean
	setPreviewMode: (previewMode: boolean) => void
	setDevice: (device: DeviceTypes) => void
  }
  
  export const WebEditorContext = createContext<{
	state: WebEditorState
	dispatch: Dispatch<WebEditorAction>
	pageId: string,
	pageDetails: object | null
  }>({
	state: initialState,
	dispatch: () => undefined,
	pageId: '',
	pageDetails: null,
  })
  
  type WebEditorProps = {
	children: React.ReactNode
	pageId: string
	pageDetails: object | null
  }
  
  const WebEditorProvider = (props: WebEditorProps) => {
	const [state, dispatch] = useReducer(WebEditorReducer, initialState)
  
	return (
	<WebEditorContext.Provider
		value={{
		state,
		dispatch,
		pageId: props.pageId,
		pageDetails: props.pageDetails,
		}}
	>
		{props.children}
	</WebEditorContext.Provider>
	)
  }
  

  export default WebEditorProvider