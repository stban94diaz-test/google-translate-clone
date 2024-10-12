import { Form } from "react-bootstrap"
import { SelectionType } from "../types.d"
import { CSSProperties, FC } from "react"

interface Props {
  type: SelectionType;
  loading?: boolean;
  value: string;
  onChange: (value: string) => void;
}

const commonStyles = { border: 0, height: '150px', resize: 'none' }

const getPlaceholder = (type: SelectionType, loading?: boolean) => {
  if (type === SelectionType.FROM) return 'Introducir texto'
  if (loading === true) return 'Cargando ...'

  return 'Traducción'
}

export const TextArea: FC<Props> = ({
  type,
  loading,
  value,
  onChange,
}) => {
  const styles = type === SelectionType.FROM
   ? commonStyles
   : { ...commonStyles, backgroundColor: '#f5f5f5' }

  return (
    <Form.Control
      as="textarea"
      disabled={type === SelectionType.TO}
      placeholder={getPlaceholder(type, loading)}
      style={styles as CSSProperties}
      autoFocus={type === SelectionType.FROM}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}