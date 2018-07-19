import {Either, left} from 'fp-ts/lib/Either'

export class PromiseEither<L, A> {
  constructor(readonly value: Promise<Either<L, A>>) {
  }

  public static from<K, T>(e: Either<K, T>): PromiseEither<K, T> {
    return new PromiseEither(Promise.resolve(e))
  }

  /**
   * Do `f` if this Promise is fulfilled, otherwise do nothing
   */
  public map<B>(f: (a: A) => B): PromiseEither<L, B> {
    return new PromiseEither<L, B>(
      this.value.then(e => e.map(a => f(a)))
    )
  }

  public flatMap<B>(f: (a: A) => PromiseEither<L, B>): PromiseEither<L, B> {
    return new PromiseEither(
      this.value
        .then(
          e =>
            e.fold(
              l => Promise.resolve(left<L, B>(l)),
              a => f(a).value
            )
        )
    )
  }

}
