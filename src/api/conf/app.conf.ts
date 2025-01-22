import { LogLevel } from '@/utils/logger/log-level.ts';

const appConf = {
  host: 'lumin.dudosyka.ru',
  proto: 'https',
  endpoint: 'api.lumin.dudosyka.ru',
  // host: 'localhost:5173',
  // proto: 'http',
  // endpoint: 'localhost:8090',
  redirectUrl: 'lumin.dudosyka.ru',
  refreshEndpoint: '/auth/refresh',
  loggerLevel: LogLevel.DEBUG,
  loggerExcludedPrefixes: [],
  showStackTrace: false,
};

/*
{
  access: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczNzI5MzcyMiwiZXhwIjoxNzM5ODg1NzIyfQ.ir1YryQg8_g9w0O_wNlf2hfrdr5ty5ru2e0sQd7JO5M"
  authorized: "{\"id\":3,\"login\":\"dudosyka\",\"lastLogin\":\"1734377818188\"}"
  refresh: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImxhc3RMb2dpbiI6IjE3MzQzNzc4MTgxODgiLCJpYXQiOjE3MzQzNzc4MTgsImV4cCI6MTczNjk2OTgxOH0.oj1RVKqlXjthNgpkIdYt72O8XnzhLpJvx8Id9vCKTac"
  seeHello: "true"
  selected-project: "25"
}
  load({
  access: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczNzI5MzcyMiwiZXhwIjoxNzM5ODg1NzIyfQ.ir1YryQg8_g9w0O_wNlf2hfrdr5ty5ru2e0sQd7JO5M"
  authorized: "{\"id\":3,\"login\":\"dudosyka\",\"lastLogin\":\"1734377818188\"}",
  refresh: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImxhc3RMb2dpbiI6IjE3MzQzNzc4MTgxODgiLCJpYXQiOjE3MzQzNzc4MTgsImV4cCI6MTczNjk2OTgxOH0.oj1RVKqlXjthNgpkIdYt72O8XnzhLpJvx8Id9vCKTac",
  seeHello: "true",
  "selected-project": "25",
})
*/

export default appConf;
