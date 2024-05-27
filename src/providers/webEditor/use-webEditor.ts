import { useContext } from "react"
import { WebEditorContext } from "./webEditor-provider"

export const useWebEditor = () => {
	const context = useContext(WebEditorContext)
	if (!context) {
		throw new Error('useWebEditor Hook must be used within the editor Provider')
	}
	return context
}

