/* tslint:disable */
/* eslint-disable */
/**
 * traO Judge API
 * traO Judge API (front ↔ back)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { JudgeStatus } from './JudgeStatus';
import {
    JudgeStatusFromJSON,
    JudgeStatusFromJSONTyped,
    JudgeStatusToJSON,
    JudgeStatusToJSONTyped,
} from './JudgeStatus';

/**
 * ジャッジ結果
 * @export
 * @interface JudgeResult
 */
export interface JudgeResult {
    /**
     * 
     * @type {string}
     * @memberof JudgeResult
     */
    testcaseId: string;
    /**
     * 
     * @type {string}
     * @memberof JudgeResult
     */
    testcaseName?: string;
    /**
     * 
     * @type {JudgeStatus}
     * @memberof JudgeResult
     */
    judgeStatus: JudgeStatus;
    /**
     * 
     * @type {number}
     * @memberof JudgeResult
     */
    score: number;
    /**
     * 
     * @type {number}
     * @memberof JudgeResult
     */
    time: number;
    /**
     * 
     * @type {number}
     * @memberof JudgeResult
     */
    memory: number;
}



/**
 * Check if a given object implements the JudgeResult interface.
 */
export function instanceOfJudgeResult(value: object): value is JudgeResult {
    if (!('testcaseId' in value) || value['testcaseId'] === undefined) return false;
    if (!('judgeStatus' in value) || value['judgeStatus'] === undefined) return false;
    if (!('score' in value) || value['score'] === undefined) return false;
    if (!('time' in value) || value['time'] === undefined) return false;
    if (!('memory' in value) || value['memory'] === undefined) return false;
    return true;
}

export function JudgeResultFromJSON(json: any): JudgeResult {
    return JudgeResultFromJSONTyped(json, false);
}

export function JudgeResultFromJSONTyped(json: any, ignoreDiscriminator: boolean): JudgeResult {
    if (json == null) {
        return json;
    }
    return {
        
        'testcaseId': json['testcaseId'],
        'testcaseName': json['testcaseName'] == null ? undefined : json['testcaseName'],
        'judgeStatus': JudgeStatusFromJSON(json['judgeStatus']),
        'score': json['score'],
        'time': json['time'],
        'memory': json['memory'],
    };
}

  export function JudgeResultToJSON(json: any): JudgeResult {
      return JudgeResultToJSONTyped(json, false);
  }

  export function JudgeResultToJSONTyped(value?: JudgeResult | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'testcaseId': value['testcaseId'],
        'testcaseName': value['testcaseName'],
        'judgeStatus': JudgeStatusToJSON(value['judgeStatus']),
        'score': value['score'],
        'time': value['time'],
        'memory': value['memory'],
    };
}

