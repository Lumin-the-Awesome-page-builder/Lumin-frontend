export const serverConf = {
  proto: '',
  endpoint: '',
  refreshEndpoint: '',
  transferInProgressStatus: 0,
  wsEndpoint: '',
  loggerMode: '',
  loggerExcludedPrefixes: [],
  rules: {
    //Key-Value
  },
};

export enum TransactionType {
  INCOME = 1,
  OUTCOME,
  TRANSFER,
}
export enum TransactionStatus {
  CREATED = 1,
  OPEN,
  CREATION_CANCELLED,
  IN_PROGRESS,
  PROCESSING_CANCELLED,
  DELIVERED,
  NOT_DELIVERED,
  DELIVERY_CANCELLED,
  FAILED,
  PROCESSED,
}
