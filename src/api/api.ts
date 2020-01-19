const _apiHost = 'https://uxcandy.com/~shapoval/test-task-backend/v2';

export type ApiMethods = "GET" | "POST";
export type ApiStatus = "ok" | "error";
export interface ApiResponse<T = undefined> {
    status: ApiStatus;
    message?: T;
}

async function request(url: string, params: any, method: ApiMethods = 'GET') {

    const options: RequestInit = {
        method,
        mode: 'cors',
    };

    url += '?developer=Ponayobi';

    if (params) {
        if (method === 'GET') {
            url += '&' + objectToQueryString(params);
        } else {
            options.body = objectToFormDate(params);
        }
    }

    const response = await fetch(_apiHost + url, options);

    if (response.status !== 200) {
        return generateErrorResponse('The server responded with an unexpected status.');
    }

    const result = await response.json();

    return result;
}

function objectToQueryString(obj: any): string {
    return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}

function objectToFormDate(obj: any) {
    const formData = new FormData();
    Object.keys(obj).forEach(key => formData.append(key, obj[key]));
    return formData;
}

function generateErrorResponse(message: string) {
    return {
        status : 'error',
        message
    };
}

async function get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    return await request(url, params);
}

async function post<T = undefined>(url: string, params?: any): Promise<ApiResponse<T>> {
    return await request(url, params, "POST");
}

export default {
    get,
    post,
};
