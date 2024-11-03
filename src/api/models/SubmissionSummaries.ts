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
import type { SubmissionSummary } from './SubmissionSummary';
import {
    SubmissionSummaryFromJSON,
    SubmissionSummaryFromJSONTyped,
    SubmissionSummaryToJSON,
    SubmissionSummaryToJSONTyped,
} from './SubmissionSummary';

/**
 * 提出一覧
 * @export
 * @interface SubmissionSummaries
 */
export interface SubmissionSummaries {
    /**
     * 
     * @type {number}
     * @memberof SubmissionSummaries
     */
    total?: number;
    /**
     * 
     * @type {Array<SubmissionSummary>}
     * @memberof SubmissionSummaries
     */
    problems?: Array<SubmissionSummary>;
}

/**
 * Check if a given object implements the SubmissionSummaries interface.
 */
export function instanceOfSubmissionSummaries(value: object): value is SubmissionSummaries {
    return true;
}

export function SubmissionSummariesFromJSON(json: any): SubmissionSummaries {
    return SubmissionSummariesFromJSONTyped(json, false);
}

export function SubmissionSummariesFromJSONTyped(json: any, ignoreDiscriminator: boolean): SubmissionSummaries {
    if (json == null) {
        return json;
    }
    return {
        
        'total': json['total'] == null ? undefined : json['total'],
        'problems': json['problems'] == null ? undefined : ((json['problems'] as Array<any>).map(SubmissionSummaryFromJSON)),
    };
}

  export function SubmissionSummariesToJSON(json: any): SubmissionSummaries {
      return SubmissionSummariesToJSONTyped(json, false);
  }

  export function SubmissionSummariesToJSONTyped(value?: SubmissionSummaries | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'total': value['total'],
        'problems': value['problems'] == null ? undefined : ((value['problems'] as Array<any>).map(SubmissionSummaryToJSON)),
    };
}

