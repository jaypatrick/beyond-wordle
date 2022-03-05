import { IWord } from '../services/wordService/models/IWord'
import { IWordsApiRepository } from '../services/wordService/IWordsApiRepository'

const SERVICE_IDENTIFIER = {
  IWordsApiRepository: Symbol.for('WordApiServiceCatalog'),
  IWord: Symbol.for('IWord'),
}

export default SERVICE_IDENTIFIER
