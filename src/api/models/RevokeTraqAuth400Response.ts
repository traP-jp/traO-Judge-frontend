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
 * 
 * @export
 * @interface RevokeTraqAuth400Response
 */
export interface RevokeTraqAuth400Response {
    /**
     * 
     * @type {string}
     * @memberof RevokeTraqAuth400Response
     */
    message?: string;
}

/**
 * Check if a given object implements the RevokeTraqAuth400Response interface.
 */
export function instanceOfRevokeTraqAuth400Response(value: object): value is RevokeTraqAuth400Response {
    return true;
}

export function RevokeTraqAuth400ResponseFromJSON(json: any): RevokeTraqAuth400Response {
    return RevokeTraqAuth400ResponseFromJSONTyped(json, false);
}

export function RevokeTraqAuth400ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): RevokeTraqAuth400Response {
    if (json == null) {
        return json;
    }
    return {
        
        'message': json['message'] == null ? undefined : json['message'],
    };
}

  export function RevokeTraqAuth400ResponseToJSON(json: any): RevokeTraqAuth400Response {
      return RevokeTraqAuth400ResponseToJSONTyped(json, false);
  }

  export function RevokeTraqAuth400ResponseToJSONTyped(value?: RevokeTraqAuth400Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'message': value['message'],
    };
}

