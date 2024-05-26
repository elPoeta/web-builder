import { DeviceTypes, WebEditorElement } from './webEditor-provider'

export type WebEditorAction =
	| {
		type: 'ADD_ELEMENT'
		payload: {
			containerId: string
			elementDetails: WebEditorElement
		}
	}
	| {
		type: 'UPDATE_ELEMENT'
		payload: {
			elementDetails: WebEditorElement
		}
	}
	| {
		type: 'DELETE_ELEMENT'
		payload: {
			elementDetails: WebEditorElement
		}
	}
	| {
		type: 'CHANGE_CLICKED_ELEMENT'
		payload: {
			elementDetails?:
			| WebEditorElement
			| {
				id: ''
				content: []
				name: ''
				styles: object
				type: null
			}
		}
	}
	| {
		type: 'CHANGE_DEVICE'
		payload: {
			device: DeviceTypes
		}
	}
	| {
		type: 'TOGGLE_PREVIEW_MODE'
	}
	| {
		type: 'TOGGLE_LIVE_MODE'
		payload?: {
			value: boolean
		}
	}
	| { type: 'REDO' }
	| { type: 'UNDO' }
	| {
		type: 'LOAD_DATA'
		payload: {
			elements: WebEditorElement[]
			withLive: boolean
		}
	}
	| {
		type: 'SET_PAGE_ID'
		payload: {
			pageId: string
		}
	}


