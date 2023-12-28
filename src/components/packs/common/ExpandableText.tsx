import { useState } from 'react'

const styles = {
  button: {
    cursor: 'pointer',
    fontStyle: 'italic',
    textDecoration: 'underline',
  },
  text: {
    marginRight: '5px',
  },
}

type Props = {
  maxLength: number
  text: string
}

export function ExpandableText({ maxLength, text }: Props) {
  const [expanded, setExpanded] = useState(true)

  const displayText = expanded && text.length > maxLength ? `${text.slice(0, maxLength)}...` : text

  return (
    <>
      <span
        style={{ ...styles.text, wordWrap: text.length > maxLength ? 'break-word' : undefined }}
      >
        {displayText}
      </span>
      {text.length > maxLength && (
        <button onClick={() => setExpanded(!expanded)} style={styles.button}>
          {!expanded ? 'hide' : 'show all'}
        </button>
      )}
    </>
  )
}
