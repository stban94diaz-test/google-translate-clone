import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useStore } from './hooks/useStore'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SelectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'


function App() {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    setFromLanguage,
    setToLanguage,
    interchangeLanguages,
    setFromText,
    setResult
  } = useStore()

  const debounceFromText = useDebounce(fromText)

  const handleClipboard = () => navigator.clipboard.writeText(result)
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    if (debounceFromText.trim() === '') return

    translate(fromLanguage, toLanguage, debounceFromText)
      .then(result => {
        if (result == null) return

        setResult(result)
      })
      .catch(() => setResult('Error'))
  }, [fromLanguage, debounceFromText, toLanguage])

  return (
    <Container fluid>
      <h1>Google Translste</h1>
      <Row>
        <Col>
          <Stack gap={2} >
            <LanguageSelector
              type={SelectionType.FROM}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              type={SelectionType.FROM}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>
        <Col xs='auto'>
          <Button variant='link'
            onClick={() => interchangeLanguages()}
            disabled={fromLanguage === AUTO_LANGUAGE}>
            <ArrowsIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SelectionType.TO}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <div style={{ position: 'relative' }}>
              <TextArea
                type={SelectionType.TO}
                value={result}
                onChange={setResult}
                loading={loading}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  display: result ? 'block' : 'none'
                }}>
                <Button
                  variant='link'
                  onClick={handleClipboard} >
                  <ClipboardIcon />
                </Button>
                <Button
                  variant='link'
                  onClick={handleSpeak} >
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
