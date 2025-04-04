class Logger {
  log(message) {
    throw new Error("Método log() debe ser implementado");
  }
}

const fs = require("fs");

class ConsoleLogger extends Logger {
  log(message) {
    console.log(`[INFO] ${message}`);
  }
}

class FileLogger extends Logger {
  log(message) {
    fs.appendFileSync("logs.txt", `[INFO] ${message}\n`);
  }
}

class LoggerFactory {
  createLogger() {
    throw new Error("Método createLogger() debe ser implementado");
  }
}

class ConsoleLoggerFactory extends LoggerFactory {
  createLogger() {
    return new ConsoleLogger();
  }
}

class FileLoggerFactory extends LoggerFactory {
  createLogger() {
    return new FileLogger();
  }
}

module.exports = { ConsoleLoggerFactory, FileLoggerFactory };
