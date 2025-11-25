/**
 * @module Builds the parameters for the WordsApi search query
 */

/* eslint-disable @typescript-eslint/no-inferrable-types */
import { IApiRequestConfig } from './IApiRequestConfig'
import { IWord } from './models/IWord'

/**
 * @class
 * common fragments: wordapi.com/x/y/z/?<V>
 * URL looks like wordApi.com/words/{word}/Z
 * TAKEN FROM [Words API](https://rapidapi.com/dpventures/api/wordsapi/)
 * THIS CLASS BUILDS THE QUERY PRAMS AFTER THE BASE URL
 */
export class wordsRequestParameters {
  // common fragments: wordapi.com/x/y/z/?<V>
  // URL looks like wordApi.com/words/{word}/Z

  /**
   * @constructor
   * @param wordToDefine
   * @param config
   */
  constructor(
    public wordToDefine: IWord,
    public config?: IApiRequestConfig,
  ) {}

  /**
   * @field
   * @description wordapi.com/WORDS/<wordToDefine>/Z Sets the 'words' keyword in X from URL template
   */
  words: string = 'words'

  /**
   * @field
   * @description wordapi.com/words/<wordToDefine>synonyms Sets the 'synonym' keyword in Z from the URL template
   */
  synonyms: string = 'synonyms'

  /**
   * @field
   * @description wordapi.com/words/<wordToDefine>/definitions Sets the 'definitions' keyword in Z from the URL template
   */
  definitions: string = 'definitions'

  /**
   * @field
   * @description wordapi.com/words/<wordToDefine>/examples Sets the 'examples' keyword in Z from the URL template
   */
  examples: string = 'examples'

  /**
   * @field
   * @description wordapi.com/words/<wordToDefine>/rhymes Sets the 'rhymes' keyword in Z from the URL template
   */
  rhymes: string = 'rhymes'

  /**
   * @field
   * @description wordapi.com/words/<wordToDefine>/antonyms Sets the 'antonyms' keyword in Z from the URL template
   */
  antonyms: string = 'antonyms'

  /**
   * @field
   * @description wordapi.com/words/<wordToDefine>/pronunciation Sets the 'pronunciation' keyword in Z from the URL template
   */
  pronunciation: string = 'pronunciation'

  /**
   * @field
   * @description wordapi.com/words/<wordToDefine>/syllables Sets the 'synonyms' keyword in Z from the URL template
   */
  syllables: string = 'syllables'

  /**
   * @field wordapi.com/words/<wordToDefine>/frequency
   * Sets the 'frequency' keyword in Z from the URL template
   * NOTE: This query param dictates difficulty - Higher values are more common words
   * @description The minimum frequency score of words to return. You can use this to limit your search to words that people are familiar with (like "go", with a frequency of 6.98). The range is from 1.74 - 8.03.
   */
  frequency: string = 'frequency' // z

  /**
   * @field
   * @description V = RANDOM (can be used with word length) wordapi.com/words/<wordToDefine>/?random={random.value}
   */
  random: boolean = true

  /**
   * @field types of drill-downs, USE URLPArameters for fragments.
   * @description Find words whose letters match the regular expression.
   */
  letterPattern?: string = '^a.{4}$'

  /**
   * @field
   * @description Find words whose pronunciation matches the regular expression.
   */
  pronunciationPattern: string = '.*æm$'

  /**
   * @field
   * @description The matching word must have at least one definition with this part of speech.
   */
  partOfSpeech?: string

  /**
   * @field
   * @description The minimum number of letters the word must have.
   */
  lettersMin?: string

  /**
   * @field The number of letters the word must have.
   * @description This parameter sets the size of the board, e.g. 5 letters, 6 letters, etc
   */
  letters?: string

  /**
   * @field
   * @description The maximum number of letters the word can have.
   */
  lettersMax?: string

  /**
   * @field
   * @description The maximum number of phonemes (sounds) the word can have.
   */
  soundsmax?: string

  /**
   * @field The number of phonemes (sounds) the word mush have.
   */
  sounds?: string

  /**
   * @field
   * @description The minimum number of phonemes (sounds) the word can have.
   */
  soundsMin?: string

  /**
   * @field
   * @description The minimum number of syllables the word can have.
   */
  syllablesMin?: string

  /**
   * @field
   * @description The maximum number of syllables the word can have.
   */
  syllablesMax?: string

  /**
   * @field
   * @description The number of results to return per page. Must be between 1 and 100. Default is 100.
   */
  limit?: number = 100

  /**
   * @field
   * @description The page of results to return. The default is page 1.
   */
  page?: number = 1

  /**
   * @field
   * @description The minimum frequency score of words to return. You can use this to limit your search to words that people are familiar with (like "go", with a frequency of 6.98). The range is from 1.74 - 8.03.
   */
  frequencymin?: string

  /**
   * @field
   * @description The maximum frequency score of words to return. You can use this to limit your search to words that aren't seen as frequently (like "zygote", with a frequency of 2.55). The range is from 1.74 - 8.03.
   */
  frequencymax?: string

  /**
   * @field
   * @description Find words that have at least one instance of the detail type. See the documentation for Word Details for a complete list of detail types you can search for.
   */
  hasDetails?: string
}
