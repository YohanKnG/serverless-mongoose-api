/**
 * Inside the serverless application we will be using this module as the
 * standard abstraction for the logging
 * 
 * In the `development` environment, `debug` level will be used to enbale
 * all levels
 * 
 * In the `production` environment, `info` level will be used to enable
 * `error`, `warn` and `info` levels
 * 
 * `error` : Any error which is fatal to the request 
 * 
 * `warn`  : Unexpected or potentially harmful behavior, but still the request
 *           will be served
 * 
 * `info`  : Generally useful information to log
 * 
 * `bebug` : Only usefull when troubleshooting some issue and doesn't 
 *           useful in production run
 */

//TODO: integrate with better transport
//TODO: set log levels with 'env' avraiable

const logger = {
  error: console.error.bind(null, "[ERROR]"),
  warn: console.warn.bind(null, "[WARN]"),
  info: console.info.bind(null, "[INFO]"),
  debug: console.log.bind(null, "[DEBUG]")
};

export default logger;
