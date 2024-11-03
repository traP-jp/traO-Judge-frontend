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


import * as runtime from '../runtime';
import type {
  PostProblemRequest,
  Problem,
  ProblemSummaries,
  PutProblemRequest,
} from '../models/index';
import {
    PostProblemRequestFromJSON,
    PostProblemRequestToJSON,
    ProblemFromJSON,
    ProblemToJSON,
    ProblemSummariesFromJSON,
    ProblemSummariesToJSON,
    PutProblemRequestFromJSON,
    PutProblemRequestToJSON,
} from '../models/index';

export interface DeleteProblemRequest {
    problemId: string;
}

export interface GetProblemRequest {
    problemId: string;
}

export interface GetProblemsRequest {
    limit?: number;
    offset?: number;
    orderBy?: GetProblemsOrderByEnum;
    username?: string;
    userId?: string;
}

export interface PostProblemOperationRequest {
    postProblemRequest?: PostProblemRequest;
}

export interface PutProblemOperationRequest {
    problemId: string;
    putProblemRequest?: PutProblemRequest;
}

/**
 * 
 */
export class ProblemsApi extends runtime.BaseAPI {

    /**
     * 問題を削除する
     * deleteProblem
     */
    async deleteProblemRaw(requestParameters: DeleteProblemRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['problemId'] == null) {
            throw new runtime.RequiredError(
                'problemId',
                'Required parameter "problemId" was null or undefined when calling deleteProblem().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/problems/{problemId}`.replace(`{${"problemId"}}`, encodeURIComponent(String(requestParameters['problemId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * 問題を削除する
     * deleteProblem
     */
    async deleteProblem(requestParameters: DeleteProblemRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteProblemRaw(requestParameters, initOverrides);
    }

    /**
     * 個別の問題を取得する
     * getProblem
     */
    async getProblemRaw(requestParameters: GetProblemRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Problem>> {
        if (requestParameters['problemId'] == null) {
            throw new runtime.RequiredError(
                'problemId',
                'Required parameter "problemId" was null or undefined when calling getProblem().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/problems/{problemId}`.replace(`{${"problemId"}}`, encodeURIComponent(String(requestParameters['problemId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProblemFromJSON(jsonValue));
    }

    /**
     * 個別の問題を取得する
     * getProblem
     */
    async getProblem(requestParameters: GetProblemRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Problem> {
        const response = await this.getProblemRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 問題一覧を取得する
     * getProblems
     */
    async getProblemsRaw(requestParameters: GetProblemsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ProblemSummaries>> {
        const queryParameters: any = {};

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        if (requestParameters['offset'] != null) {
            queryParameters['offset'] = requestParameters['offset'];
        }

        if (requestParameters['orderBy'] != null) {
            queryParameters['orderBy'] = requestParameters['orderBy'];
        }

        if (requestParameters['username'] != null) {
            queryParameters['username'] = requestParameters['username'];
        }

        if (requestParameters['userId'] != null) {
            queryParameters['userId'] = requestParameters['userId'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/problems`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProblemSummariesFromJSON(jsonValue));
    }

    /**
     * 問題一覧を取得する
     * getProblems
     */
    async getProblems(requestParameters: GetProblemsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ProblemSummaries> {
        const response = await this.getProblemsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 問題を新規作成・投稿する このとき作成された問題は必ず非公開になる 公開する場合は PUT で変更する必要がある
     * postProblem
     */
    async postProblemRaw(requestParameters: PostProblemOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Problem>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/problems`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PostProblemRequestToJSON(requestParameters['postProblemRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProblemFromJSON(jsonValue));
    }

    /**
     * 問題を新規作成・投稿する このとき作成された問題は必ず非公開になる 公開する場合は PUT で変更する必要がある
     * postProblem
     */
    async postProblem(requestParameters: PostProblemOperationRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Problem> {
        const response = await this.postProblemRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 問題を修正する
     * putProblem
     */
    async putProblemRaw(requestParameters: PutProblemOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['problemId'] == null) {
            throw new runtime.RequiredError(
                'problemId',
                'Required parameter "problemId" was null or undefined when calling putProblem().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/problems/{problemId}`.replace(`{${"problemId"}}`, encodeURIComponent(String(requestParameters['problemId']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: PutProblemRequestToJSON(requestParameters['putProblemRequest']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * 問題を修正する
     * putProblem
     */
    async putProblem(requestParameters: PutProblemOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.putProblemRaw(requestParameters, initOverrides);
    }

}

/**
 * @export
 */
export const GetProblemsOrderByEnum = {
    CreatedAtAsc: 'createdAtAsc',
    CreatedAtDesc: 'createdAtDesc',
    UpdatedAtAsc: 'updatedAtAsc',
    UpdatedAtDesc: 'updatedAtDesc',
    DifficultyAsc: 'difficultyAsc',
    DifficultyDesc: 'difficultyDesc'
} as const;
export type GetProblemsOrderByEnum = typeof GetProblemsOrderByEnum[keyof typeof GetProblemsOrderByEnum];
