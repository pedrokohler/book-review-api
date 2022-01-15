export abstract class IRepository<T> {
  public abstract create({ id, data }: { id: string; data: T }): Promise<T>;

  public abstract find(id: string): Promise<T>;

  public abstract update({
    id,
    data,
  }: {
    id: string;
    data: Partial<T>;
  }): Promise<T>;

  public abstract delete({
    id,
    data,
  }: {
    id: string;
    data: Partial<T>;
  }): Promise<boolean>;
}
