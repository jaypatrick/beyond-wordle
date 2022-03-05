import 'reflect-metadata'
import { Container } from 'inversify'
import { IWord, Word } from '../services/wordService/models/IWord'

import SERVICE_IDENTIFIER from '../constants/identifiers'
import { IWordsApiRepository } from '../services/wordService/IWordsApiRepository'
import { WordsApiCatalogRepository } from '../services/wordService/wordsApiCatalogRepository'

const container = new Container()
container
  .bind<IWordsApiRepository>(SERVICE_IDENTIFIER.IWordsApiRepository)
  .to(WordsApiCatalogRepository)

container.bind<IWord>(SERVICE_IDENTIFIER.IWord).to(Word)
export default container
