import { inject, injectable, named } from 'inversify'
import { IWordsApiRepository } from './IWordsApiRepository'
import { IWord, Word } from './models/IWord'
// TODO: ALL OF THESE WILL GO INTO CORE CLASSES IN LIB AS WRAPPERS!

// concrete repository for looking up words from the WordsApi service
// can create adaptors for local storage, database lookups, etc.
@injectable()
export class WordsApiCatalogRepository implements IWordsApiRepository {
  private wordList: IWord[] = new Array<IWord>(
    new Word(0, ['a', 'l', 'p', 'h', 'a']),
    new Word(0, ['s', 't', 'i', 'l', 'l'])
  )

  get(): IWord[] {
    return this.wordList
  }
  getById(id: number): IWord {
    try {
      const localWord = this.wordList.find((word) => word.id == id)
      if (localWord) {
        return localWord
      } else {
        return Word.empty()
      }
    } catch {
      console.log('error caught')
      return Word.empty()
    }
  }
  add(word: IWord): number {
    return this.wordList.push(word)
  }
  edit(id: number, word: IWord): IWord {
    const targetIndex = this.wordList.findIndex((word) => word.id == id)

    this.wordList[targetIndex].letters = word.letters
    this.wordList[targetIndex].completed = word.completed
    this.wordList[targetIndex].completedOn = word.completedOn

    return this.wordList[targetIndex]
  }
  delete(id: number): IWord {
    const targetIndex = this.wordList.findIndex((word) => word.id == id)
    if (targetIndex < -1) return Word.empty()
    return this.wordList.splice(targetIndex, 1)[0]
  }
  changeStatus(id: number, completionStatus: boolean): IWord {
    const targetIndex = this.wordList.findIndex((word) => word.id == id)

    this.wordList[targetIndex].completed = completionStatus
    this.wordList[targetIndex].completedOn = Date.now()
    return this.wordList[targetIndex]
  }
}
