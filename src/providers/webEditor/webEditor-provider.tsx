import React from 'react'
import { WebEditorButtons } from '@/lib/constants'
import { WebEditorAction } from './webEditor-actions'

export type DeviceTypes = 'Desktop' | 'Mobile' | 'Tablet'

export type WebEditorElement = {
	id: string
	styles: React.CSSProperties
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
	funnelPageId: string
}
