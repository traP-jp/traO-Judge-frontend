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
  PostTestcaseRequestInner,
  PutTestcaseRequest,
  Testcase,
  TestcaseSummaries,
} from '../models/index';
import {
    PostTestcaseRequestInnerFromJSON,
    PostTestcaseRequestInnerToJSON,
    PutTestcaseRequestFromJSON,
    PutTestcaseRequestToJSON,
    TestcaseFromJSON,
    TestcaseToJSON,
    TestcaseSummariesFromJSON,
    TestcaseSummariesToJSON,
} from '../models/index';

export interface DeleteTestcaseRequest {
    testcaseId: string;
}

export interface GetTestcaseRequest {
    testcaseId: string;
}

export interface GetTestcasesRequest {
    problemId: string;
}

export interface PostTestcasesRequest {
    problemId: string;
    postTestcaseRequestInner?: Array<PostTestcaseRequestInner>;
}

export interface PutTestcaseOperationRequest {
    testcaseId: string;
    putTestcaseRequest: PutTestcaseRequest;
}

/**
 * 
 */
export class TestcasesApi extends runtime.BaseAPI {

    /**
     * 単一のテストケースの削除
     * deleteTestcase
     */
    async deleteTestcaseRaw(requestParameters: DeleteTestcaseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['testcaseId'] == null) {
            throw new runtime.RequiredError(
                'testcaseId',
                'Required parameter "testcaseId" was null or undefined when calling deleteTestcase().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/testcases/{testcaseId}`.replace(`{${"testcaseId"}}`, encodeURIComponent(String(requestParameters['testcaseId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * 単一のテストケースの削除
     * deleteTestcase
     */
    async deleteTestcase(requestParameters: DeleteTestcaseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteTestcaseRaw(requestParameters, initOverrides);
    }

    /**
     * あるidのテストケースを取得
     * getTestcase
     */
    async getTestcaseRaw(requestParameters: GetTestcaseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Testcase>> {
        if (requestParameters['testcaseId'] == null) {
            throw new runtime.RequiredError(
                'testcaseId',
                'Required parameter "testcaseId" was null or undefined when calling getTestcase().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/testcases/{testcaseId}`.replace(`{${"testcaseId"}}`, encodeURIComponent(String(requestParameters['testcaseId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TestcaseFromJSON(jsonValue));
    }

    /**
     * あるidのテストケースを取得
     * getTestcase
     */
    async getTestcase(requestParameters: GetTestcaseRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Testcase> {
        const response = await this.getTestcaseRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 全てのテストケースを取得
     * getTestcases
     */
    async getTestcasesRaw(requestParameters: GetTestcasesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TestcaseSummaries>> {
        if (requestParameters['problemId'] == null) {
            throw new runtime.RequiredError(
                'problemId',
                'Required parameter "problemId" was null or undefined when calling getTestcases().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/problems/{problemId}/testcases`.replace(`{${"problemId"}}`, encodeURIComponent(String(requestParameters['problemId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TestcaseSummariesFromJSON(jsonValue));
    }

    /**
     * 全てのテストケースを取得
     * getTestcases
     */
    async getTestcases(requestParameters: GetTestcasesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TestcaseSummaries> {
        const response = await this.getTestcasesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * テストケースを投稿する
     * postTestcases
     */
    async postTestcasesRaw(requestParameters: PostTestcasesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TestcaseSummaries>> {
        if (requestParameters['problemId'] == null) {
            throw new runtime.RequiredError(
                'problemId',
                'Required parameter "problemId" was null or undefined when calling postTestcases().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/problems/{problemId}/testcases`.replace(`{${"problemId"}}`, encodeURIComponent(String(requestParameters['problemId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['postTestcaseRequestInner']!.map(PostTestcaseRequestInnerToJSON),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TestcaseSummariesFromJSON(jsonValue));
    }

    /**
     * テストケースを投稿する
     * postTestcases
     */
    async postTestcases(requestParameters: PostTestcasesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TestcaseSummaries> {
        const response = await this.postTestcasesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 単体のテストケースの編集
     * putTestcase
     */
    async putTestcaseRaw(requestParameters: PutTestcaseOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['testcaseId'] == null) {
            throw new runtime.RequiredError(
                'testcaseId',
                'Required parameter "testcaseId" was null or undefined when calling putTestcase().'
            );
        }

        if (requestParameters['putTestcaseRequest'] == null) {
            throw new runtime.RequiredError(
                'putTestcaseRequest',
                'Required parameter "putTestcaseRequest" was null or undefined when calling putTestcase().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/testcases/{testcaseId}`.replace(`{${"testcaseId"}}`, encodeURIComponent(String(requestParameters['testcaseId']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: PutTestcaseRequestToJSON(requestParameters['putTestcaseRequest']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * 単体のテストケースの編集
     * putTestcase
     */
    async putTestcase(requestParameters: PutTestcaseOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.putTestcaseRaw(requestParameters, initOverrides);
    }

}
