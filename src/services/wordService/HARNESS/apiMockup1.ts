/* eslint-disable @typescript-eslint/no-inferrable-types */
import axios, { AxiosResponse, AxiosRequestHeaders } from 'axios'
import url from 'url'

export {}

const responseBody = (response: AxiosResponse) => response.data

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  // post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
  // put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
}

// HERE'S THE FACTORY FOR GETTING TYPES OF WORDS
// WILL USE MORE OF A METHOD FACTORY ONCE I GET AROUND TO THIS
// https://javascript.plainenglish.io/frontend-api-calls-with-typescript-and-axios-68792d1e63c2
export const WordFactory = {
  getPosts: (): Promise<PostType[]> => requests.get('posts'),
  getAPost: (id: number): Promise<PostType> => requests.get(`posts/${id}`),
  // createPost: (post: PostType): Promise<PostType> =>
  //   requests.post('posts', post),
  // updatePost: (post: PostType, id: number): Promise<PostType> =>
  //   requests.put(`posts/${id}`, post),
  deletePost: (id: number): Promise<void> => requests.delete(`posts/${id}`),
}

export interface PostType {
  userId?: number
  id?: number
  title: string
  body: string
}

export class axiosConstants {
  static baseUrl: string = 'https://wordsapiv1.p.rapidapi.com'
  static timeout: number = 15000
  static authHeaderHost = ['X-RapidAPI-Host', 'wordsapiv1.p.rapidapi.com']
  static authHeaderKey = [
    'x-RapidApi-key',
    '86a1f1d1fcmsh4f33c754faf8f09p18eb71jsn7603d942544b',
  ]
  static authHeaderRequestAccept = ['Accept', 'application/json']
  static rapidApiApp: string = 'default-application_6092023'
}

// TAKEN FROM https://rapidapi.com/dpventures/api/wordsapi/
export class axiosWordRequestUrlFragments {
  // common fragments: wordapi.com/x/y/z/?<V>

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

const instance = axios.create({
  baseURL: axiosConstants.baseUrl,
  timeout: axiosConstants.timeout,
})
// DON"T FORGET THE PARAMETERS FACTORY!
