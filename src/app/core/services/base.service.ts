import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LoadingService } from './loading.service';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class BaseService {

    protected _baseApiHost: string = environment.apiHost;
    protected _httpClient: HttpClient;
    protected _loadingService: LoadingService;

    constructor(injector: Injector) {
        this._httpClient = injector.get(HttpClient);
        this._loadingService = injector.get(LoadingService);
    }

    requestWithLoading(): BaseService {
        this._loadingService.showLoading();
        return this;
    }

    downloadFile(response: HttpResponse<Blob>) {
        const dataType = `${response.headers.get("Content-Type")}`;
        const binaryData = [response.body];
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        const fileName = this._getFileName(response);
        if (fileName) {
            downloadLink.setAttribute('download', fileName);
        }
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }

    get(path: string, params?: object): Observable<any> {
        return this._httpClient.get(`${this._baseApiHost}${path}`, { params: this._createRequestParams(params) });
    }

    post(path: string, body: object, params?: object, options?: object): Observable<any> {
        return this._httpClient.post(`${this._baseApiHost}${path}`, body, {
            params: this._createRequestParams(params),
            ...options
        });
    }

    put(path: string, body: object, params?: object): Observable<any> {
        return this._httpClient.put(`${this._baseApiHost}${path}`, body, { params: this._createRequestParams(params) });
    }

    delete(path: string, params?: object): Observable<any> {
        return this._httpClient.delete(`${this._baseApiHost}${path}`, { params: this._createRequestParams(params) });
    }

    private _createRequestParams(params: object): HttpParams {
        let httpParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach(key => {
                if (Array.isArray(params[key])) {
                    params[key].forEach((value: string) => {
                        if (value) {
                            value = value.toString().replace(/\//g, '%2F');
                            httpParams = httpParams.append(key.toString(), value);
                        }
                    });
                } else {
                    httpParams = params[key] ? httpParams.append(key.toString(), params[key]) : httpParams;
                }
            });
        }
        return httpParams;
    }

    private _getFileName(response: HttpResponse<Blob>) {
        let filename: string;
        try {
            const contentDisposition: string = response.headers.get('Content-Disposition');
            const r = /(?:filename=)(.+)(?:;)/
            filename = r.exec(contentDisposition)[1];
        }
        catch (e) {
            filename = 'download'
        }
        return filename
    }
}
