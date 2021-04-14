export default interface IPaginator<T> {
  page: number;
  perPage: number;
  filter?: T;
}
