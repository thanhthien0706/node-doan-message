export interface ITimestamp {
  createdAt?: boolean | string;
  updatedAt?: boolean | string;
  currentTime?: () => Date | number;
}
