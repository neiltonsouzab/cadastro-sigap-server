export default interface IPage<T> {
  page: number;
  pages: number;
  count: number;
  perPage: number;
  data: Array<T>;
}
