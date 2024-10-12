import { Form } from "react-bootstrap"
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../constants"
import { FC } from "react"
import { FromLanguage, Language, SelectionType } from "../types.d"

type Props =
  | { type: SelectionType.FROM, value: FromLanguage, onChange: (language: FromLanguage) => void}
  | { type: SelectionType.TO, value: Language, onChange: (language: Language) => void}

export const LanguageSelector: FC<Props> = ({ onChange, value, type }) => {
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }

  return (
    <Form.Select aria-label="Selecciona el idioma" onChange={handleLanguageChange} value={value}>
      {type === SelectionType.FROM && <option value={AUTO_LANGUAGE}>Detectar idioma</option>} 
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  )
}
