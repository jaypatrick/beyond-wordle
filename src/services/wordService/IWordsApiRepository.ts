import { IWord } from './models/IWord'

export interface IWordsApiRepository {
  get(): IWord[]
  getById(id: number): IWord
  add(word: IWord): number
  edit(id: number, word: IWord): IWord
  delete(id: number): IWord
  changeStatus(id: number, completionStatus: boolean): IWord
}
