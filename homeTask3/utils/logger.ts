import { createLogger, Logger, transports, format, addColors } from "winston";

/********************************* winston *************************/
interface LoggerWithRejections extends Logger {
  rejections: Logger["exceptions"]; // exists almost with the same properties as exceptions
}
const myFormat = format.printf(({ level, message, timestamp, ...metadata }) => {
  return `${timestamp} [${level}] : ${message} `;
});

const transportsList = [new transports.Console()];

const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.label({ label: "CUSTOM WINSTON", message: true }),
    format.json(),
    myFormat
  ),
  handleExceptions: true,
  transports: transportsList,
});

// Call rejections.handle with a transport to handle rejections
(logger as LoggerWithRejections).rejections.handle(
  new transports.Console({ level: "error" })
);

addColors({ info: "blue", error: "red" });

export { logger };
