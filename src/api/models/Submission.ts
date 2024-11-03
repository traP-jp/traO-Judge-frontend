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
import type { JudgeResult } from './JudgeResult';
import {
    JudgeResultFromJSON,
    JudgeResultFromJSONTyped,
    JudgeResultToJSON,
    JudgeResultToJSONTyped,
} from './JudgeResult';

/**
 * 提出の詳細
 * @export
 * @interface Submission
 */
export interface Submission {
    /**
     * 提出ID
     * @type {string}
     * @memberof Submission
     */
    id: string;
    /**
     * 提出ユーザーID
     * @type {number}
     * @memberof Submission
     */
    userId: number;
    /**
     * 
     * @type {string}
     * @memberof Submission
     */
    userName: string;
    /**
     * 問題ID
     * @type {number}
     * @memberof Submission
     */
    problemId: number;
    /**
     * 提出日時
     * @type {Date}
     * @memberof Submission
     */
    submittedAt: Date;
    /**
     * 提出コードの言語ID
     * @type {number}
     * @memberof Submission
     */
    languageId: number;
    /**
     * スコアの合計
     * @type {number}
     * @memberof Submission
     */
    totalScore: number;
    /**
     * 実行時間の最大値 (ms)
     * @type {number}
     * @memberof Submission
     */
    maxTime: number;
    /**
     * メモリ使用量の最大値 (MiB)
     * @type {number}
     * @memberof Submission
     */
    maxMemory: number;
    /**
     * 
     * @type {number}
     * @memberof Submission
     */
    codeLength?: number;
    /**
     * 
     * @type {JudgeStatus}
     * @memberof Submission
     */
    overallJudgeStatus?: JudgeStatus;
    /**
     * 
     * @type {Array<JudgeResult>}
     * @memberof Submission
     */
    judgeResults?: Array<JudgeResult>;
}



/**
 * Check if a given object implements the Submission interface.
 */
export function instanceOfSubmission(value: object): value is Submission {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('userId' in value) || value['userId'] === undefined) return false;
    if (!('userName' in value) || value['userName'] === undefined) return false;
    if (!('problemId' in value) || value['problemId'] === undefined) return false;
    if (!('submittedAt' in value) || value['submittedAt'] === undefined) return false;
    if (!('languageId' in value) || value['languageId'] === undefined) return false;
    if (!('totalScore' in value) || value['totalScore'] === undefined) return false;
    if (!('maxTime' in value) || value['maxTime'] === undefined) return false;
    if (!('maxMemory' in value) || value['maxMemory'] === undefined) return false;
    return true;
}

export function SubmissionFromJSON(json: any): Submission {
    return SubmissionFromJSONTyped(json, false);
}

export function SubmissionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Submission {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'userId': json['userId'],
        'userName': json['userName'],
        'problemId': json['problemId'],
        'submittedAt': (new Date(json['submittedAt'])),
        'languageId': json['languageId'],
        'totalScore': json['totalScore'],
        'maxTime': json['maxTime'],
        'maxMemory': json['maxMemory'],
        'codeLength': json['codeLength'] == null ? undefined : json['codeLength'],
        'overallJudgeStatus': json['overallJudgeStatus'] == null ? undefined : JudgeStatusFromJSON(json['overallJudgeStatus']),
        'judgeResults': json['judgeResults'] == null ? undefined : ((json['judgeResults'] as Array<any>).map(JudgeResultFromJSON)),
    };
}

  export function SubmissionToJSON(json: any): Submission {
      return SubmissionToJSONTyped(json, false);
  }

  export function SubmissionToJSONTyped(value?: Submission | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'userId': value['userId'],
        'userName': value['userName'],
        'problemId': value['problemId'],
        'submittedAt': ((value['submittedAt']).toISOString()),
        'languageId': value['languageId'],
        'totalScore': value['totalScore'],
        'maxTime': value['maxTime'],
        'maxMemory': value['maxMemory'],
        'codeLength': value['codeLength'],
        'overallJudgeStatus': JudgeStatusToJSON(value['overallJudgeStatus']),
        'judgeResults': value['judgeResults'] == null ? undefined : ((value['judgeResults'] as Array<any>).map(JudgeResultToJSON)),
    };
}

