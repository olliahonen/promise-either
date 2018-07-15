import {Either} from 'fp-ts/lib/Either'

export class PromiseEither<L, A> {
  constructor(readonly value: Promise<Either<L, A>>) {
  }

}
