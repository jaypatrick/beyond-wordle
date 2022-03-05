import { timeStamp } from 'console'
import { stringify } from 'querystring'
import { WordsApiRequest } from './wordApiRequest'
import { inject, injectable, named } from 'inversify'

export interface IWord {
  id: number
  letters: string[]
  completed: boolean
  get completedOn(): number
  set completedOn(value: number)
  get length(): number
  toString(): string
}
@injectable()
export class Word implements IWord {
  constructor(
    public id: number,
    public letters: string[],
    public completed: boolean = false
  ) {
    this.id = id
    this.letters = letters
    this.completed = completed
  }
  get completedOn(): number {
    return Date.now()
  }
  set completedOn(value: number) {
    this.completedOn = value
  }
  get length(): number {
    return this.letters?.length ?? 0
  }
  public static buildWord(id: number, letters: string[]): IWord {
    return new Word(id, letters, false)
  }

  static empty(): Word {
    const word = new Word(0, [], false)
    return word
  }
  public toString = (): string => {
    if (this.letters.length > 0) {
      return this.letters.join('')
    } else {
      return Word.empty.toString()
    }
  }
}

export interface IWordApiRepository {
  get(): IWord[]
  getById(id: number): IWord
  add(word: Word): number
  edit(id: number, word: IWord): IWord
  delete(id: number): IWord
  changeStatus(id: number, completionStatus: boolean): IWord
}

// concrete repository for looking up words from the WordsApi service
// can create adaptors for local storage, database lookups, etc.
@injectable()
export class WordApiServiceCatalog implements IWordApiRepository {
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
export class WordCatalogService {
  constructor(public repository: IWordApiRepository) {
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
