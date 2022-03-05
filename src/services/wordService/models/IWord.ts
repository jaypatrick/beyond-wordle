import { IWordsApiRepository } from '../IWordsApiRepository'
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
