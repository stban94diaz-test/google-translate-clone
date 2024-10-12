import { useReducer } from 'react'
import { Action, FromLanguage, Language, State } from '../types.d'
import { AUTO_LANGUAGE } from '../constants'

// 1. Create a initial state
const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

// 2. Create a reducer
function reducer(state: State, action: Action) {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGE') {
    if (state.fromLanguage === AUTO_LANGUAGE) return state

    const loading = state.fromText?.trim()!== ''

    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
      loading,
      result: ''
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    if (state.fromLanguage === action.payload) return state

    const loading = state.fromText?.trim() !== ''

    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    if (state.toLanguage === action.payload) return state

    const loading = state.fromText?.trim() !== ''

    return {
      ...state,
      toLanguage: action.payload,
      result: '',
      loading
    }
  }

  if (type === 'SET_FROM_TEXT') {
    const loading = action.payload?.trim() !== ''

    return {
      ...state,
      loading,
      fromText: action.payload,
      result: ''
    }
  }

  if (type === 'TRANSLATE_TEXT') {
    return {
      ...state,
      loading: false,
      result: action.payload
    }
  }

  return state
}

export function useStore() {
  // 3. usar el hook useReducer
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages: () => dispatch({ type: 'INTERCHANGE_LANGUAGE' }),
    setFromLanguage: (payload: FromLanguage) => dispatch({ type: 'SET_FROM_LANGUAGE', payload }),
    setToLanguage: (payload: Language) => dispatch({ type: 'SET_TO_LANGUAGE', payload }),
    setFromText: (payload: string) => dispatch({ type: 'SET_FROM_TEXT', payload }),
    setResult: (payload: string) => dispatch({ type: 'TRANSLATE_TEXT', payload })
  }
}
