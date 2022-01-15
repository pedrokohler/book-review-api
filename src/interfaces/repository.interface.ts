export abstract class IRepository<T> {
  public abstract create(data: Omit<T, 'id'>): Promise<T>;

  public abstract find(id: string): Promise<T>;

  public abstract update({
    id,
    data,
  }: {
    id: string;
    data: Omit<Partial<T>, 'id'>;
  }): Promise<T>;

  public abstract delete(id: string): Promise<boolean>;
}
