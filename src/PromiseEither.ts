import {Either} from 'fp-ts/lib/Either'

export class PromiseEither<L, A> {
  constructor(readonly value: Promise<Either<L, A>>) {
  }

  public static from<K, T>(e: Either<K, T>): PromiseEither<K, T> {
    return new PromiseEither(Promise.resolve(e))
  }

}
