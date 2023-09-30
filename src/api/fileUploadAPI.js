import config from "./config";

let url = config.API_URL;


let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
}

const fileUploadAPI = {
    uploadFile: async (file) => {
        let form = new FormData();
        form.append("file", file)
        return fetch(url + "/uploads/uploadfile", {
            method: "POST",
            body: form
        }).then(res => res.json());
    },
    splitFile: async (imageId, channel) => {
        let body = {
            imageId: imageId,
            channel: channel
        }

        return fetch(url + "/uploads/splitfile", {
            method: "POST",
            body: JSON.stringify(body),
            headers: headers,
        }).then(res => res.json());
    },
    notifyUpload: async (imageId) => {
        let body = {
            imageId: imageId,
        }
        return fetch(url + "/uploads/notify", {
            method: "POST",
            body: JSON.stringify(body),
            headers: headers,

        }).then(res => res.json());
    },
    getFileList: async (keyword) => {
        const body = {
            keyword: keyword
        }
        return fetch(url + "/uploads/filelist", {
            method: "POST",
            body: JSON.stringify(body),
            headers: headers
        }).then(res => res.json());
    },
    getPartFileList: async (imageId) => {
        const body = {
            imageId: imageId
        }
        return fetch(url + "/uploads/filelist/part", {
            method: "POST",
            body: JSON.stringify(body),
            headers: headers
        }).then(res => res.json());
    },
    getConfigSelect: async (configType) => {
        const body = {
            configType: configType
        }
        return fetch(url + "/configs/type", {
            method: "POST",
            body: JSON.stringify(body),
            headers: headers
        }).then(res => res.json());
    },
    submitCommandProcedure: async (header, body) => {
        const requestBody = {
            header: header,
            body: body
        }
        return fetch(url + "/cmd_proc/submit", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: headers
        }).then(res => res.json());
    },
    getProcedureName: async () => {
        const body = {}
        return fetch(url + "/cmd_proc/select", {
            method: "POST",
            body: JSON.stringify(body),
            headers: headers
        }).then(res => res.json());
    },
    submitMissionTimeline: async (header, body) => {
        const requestBody = {
            header: header,
            body: body
        }
        return fetch(url + "/mtl/submit", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: headers
        }).then(res => res.json());
    },
}

export default fileUploadAPI;