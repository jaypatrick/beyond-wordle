/* eslint-disable @typescript-eslint/no-inferrable-types */
import { IApiRequestConfig } from './IApiRequestConfig'
import { IWord } from './models/IWord'

// TAKEN FROM https://rapidapi.com/dpventures/api/wordsapi/
// THIS CLASS BUILDS THE URL AFTER THE BASE URL
export class wordsRequestParameters {
  // common fragments: wordapi.com/x/y/z/?<V>
  // URL looks like wordApi.com/words/{word}/Z

  constructor(public wordToDefine: IWord, public config?: IApiRequestConfig) {}

  // Y = word to define in URL
  words: string = 'words' // x    wordapi.com/words/<wordToDefine>/Z
  synonyms: string = 'synonyms' // z    wordapi.com/words/<wordToDefine>synonyms
  definitions: string = 'definitions' // z    wordapi.com/words/<wordToDefine>/definitions
  examples: string = 'examples' // z    wordapi.com/words/<wordToDefine>/examples
  rhymes: string = 'rhymes' // z    wordapi.com/words/<wordToDefine>/rhymes
  antonyms: string = 'antonyms' // z    wordapi.com/words/<wordToDefine>/antonyms
  pronunciation: string = 'pronunciation' // z    wordapi.com/words/<wordToDefine>/pronunciation
  syllables: string = 'syllables' // z    wordapi.com/words/<wordToDefine>/syllables
  frequency: string = 'frequency' // z    wordapi.com/words/<wordToDefine>/frequency

  // V = RANDOM (can be used with word length)
  random: boolean = true // V    wordapi.com/words/<wordToDefine>/?random={random.value}

  // types of drill-downs, USE URLPArameters for fragments.
  // SEARCH fragments
  letterPattern?: string = '^a.{4}$'
  // Find words whose letters match the regular expression.

  pronunciationPattern: string = '.*æm$'
  // Find words whose pronunciation matches the regular expression.

  partOfSpeech?: string
  // The matching word must have at least one definition with this part of speech.

  lettersMin?: string
  // The minimum number of letters the word must have.

  letters?: string
  // The number of letters the word must have.

  lettersMax?: string
  // The maximum number of letters the word can have.

  soundsmax?: string
  // The maximum number of phonemes (sounds) the word can have.

  sounds?: string
  // The number of phonemes (sounds) the word mush have.

  soundsMin?: string
  // The minimum number of phonemes (sounds) the word can have.

  syllablesMin?: string
  // The minimum number of syllables the word can have.

  syllablesMax?: string
  // The maximum number of syllables the word can have.

  limit?: number = 100
  // The number of results to return per page. Must be between 1 and 100. Default is 100.

  page?: number = 1
  // The page of results to return. The default is page 1.

  frequencymin?: string
  // The minimum frequency score of words to return. You can use this to limit your search to words that people are familiar with (like "go", with a frequency of 6.98). The range is from 1.74 - 8.03.

  frequencymax?: string
  // The maximum frequency score of words to return. You can use this to limit your search to words that aren't seen as frequently (like "zygote", with a frequency of 2.55). The range is from 1.74 - 8.03.

  hasDetails?: string
  // Find words that have at least one instance of the detail type. See the documentation for Word Details for a complete list of detail types you can search for.
}
