import React from 'react'

export type WebEditorButtons =
  | 'text'
  | 'container'
  | 'section'
  | 'contactForm'
  | 'updateForm'
  | 'insertForm'
  | 'deleteForm'
  | 'link'
  | '2Col'
  | 'video'
  | '__body'
  | 'image'
  | null
  | '3Col'

export const defaultStyles: React.CSSProperties = {
  backgroundPosition: 'center',
  objectFit: 'cover',
  backgroundRepeat: 'no-repeat',
  textAlign: 'left',
  opacity: '100%',
}

