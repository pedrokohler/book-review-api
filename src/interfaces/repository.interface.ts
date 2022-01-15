import { IResourceParam } from './resource.param.interface';

export abstract class IRepository<T> {
  public abstract create(data: IResourceParam<T>): Promise<T>;

  public abstract find(id: string): Promise<T>;

  public abstract update({
    id,
    data,
  }: {
    id: string;
    data: Partial<IResourceParam<T>>;
  }): Promise<T>;

  public abstract delete(id: string): Promise<boolean>;
}
