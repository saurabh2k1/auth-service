import { Logger, QueryRunner } from "typeorm";
import { dbQueryDurationHistogrm } from "../monitor/metrics";
import logger from "./logger";

export class TypeORMLogger implements Logger {
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        const start = process.hrtime();

        const finish = () => {
            const [sec, nano] = process.hrtime(start);
            const durationInSec = sec + nano / 1e9;

            dbQueryDurationHistogrm.labels('query', 'raw').observe(durationInSec);
        };

        if (queryRunner) {
            const originalQuery = queryRunner.query.bind(queryRunner);
            queryRunner.query = async (...args: Parameters<typeof originalQuery>) => {
                const result = await originalQuery(...args);
                finish();
                return result;
            }
        } else {
            finish();
        }
        logger.info(`[Query]: ${query}`);
    }

    logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        logger.error(`[Query Error]: ${error}`);
      }
    
      logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        logger.warn(`[Slow Query - ${time}ms]: ${query}`);
      }
    
      logSchemaBuild(message: string) {
        logger.info(`[Schema Build]: ${message}`);
      }
    
      logMigration(message: string) {
        logger.info(`[Migration]: ${message}`);
      }
    
      log(level: 'log' | 'info' | 'warn', message: any) {
        logger.info(`[${level.toUpperCase()}]: ${message}`);
      }
}