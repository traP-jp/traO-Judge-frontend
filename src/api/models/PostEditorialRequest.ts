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
/**
 * 解説の作成リクエスト
 * @export
 * @interface PostEditorialRequest
 */
export interface PostEditorialRequest {
    /**
     * 解説本文 (HTML)
     * @type {string}
     * @memberof PostEditorialRequest
     */
    statement: string;
    /**
     * 解説が全体公開かどうか.
     * 
     * * `true` - 公開
     * * `false` - 非公開 (問題の作者のみ閲覧可)
     * @type {boolean}
     * @memberof PostEditorialRequest
     */
    isPublic: boolean;
}

/**
 * Check if a given object implements the PostEditorialRequest interface.
 */
export function instanceOfPostEditorialRequest(value: object): value is PostEditorialRequest {
    if (!('statement' in value) || value['statement'] === undefined) return false;
    if (!('isPublic' in value) || value['isPublic'] === undefined) return false;
    return true;
}

export function PostEditorialRequestFromJSON(json: any): PostEditorialRequest {
    return PostEditorialRequestFromJSONTyped(json, false);
}

export function PostEditorialRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): PostEditorialRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'statement': json['statement'],
        'isPublic': json['isPublic'],
    };
}

  export function PostEditorialRequestToJSON(json: any): PostEditorialRequest {
      return PostEditorialRequestToJSONTyped(json, false);
  }

  export function PostEditorialRequestToJSONTyped(value?: PostEditorialRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'statement': value['statement'],
        'isPublic': value['isPublic'],
    };
}

