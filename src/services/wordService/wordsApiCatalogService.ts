import { IWord } from './models/IWord'
import { IWordsApiRepository } from './IWordsApiRepository'

export class WordsApiCatalogService {
  constructor(public repository: IWordsApiRepository) {
    this.repository = repository
  }

  get(): IWord[] {
    return this.repository.get()
  }
  getById(id: number): IWord {
    return this.repository.getById(id)
  }
  add(word: IWord): number {
    return this.repository.add(word)
  }
  edit(id: number, word: IWord) {
    return this.repository.edit(id, word)
  }
  delete(id: number): IWord {
    return this.repository.delete(id)
  }
  changeStatus(id: number, completionStatus: boolean): IWord {
    return this.repository.changeStatus(id, completionStatus)
  }
}
