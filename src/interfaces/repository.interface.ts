export abstract class IRepository<TData, T> {
  public abstract create(data: TData): Promise<T>;

  public abstract find(id: string): Promise<T>;

  public abstract update({
    id,
    data,
  }: {
    id: string;
    data: Partial<TData>;
  }): Promise<T>;

  public abstract delete(id: string): Promise<boolean>;
}
