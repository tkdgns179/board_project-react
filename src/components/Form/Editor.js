// reference : https://ichi.pro/ko/reacte-keoseuteom-imiji-eob-lodeogaissneun-ckeditor5-114024023634045

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React from "react";
import { useSelector } from "react-redux";

const Editor = ({ value, onChange }) => {
  const token = useSelector((state) => state.auth.token);

  const custom_config = {
    extraPlugins: [MyCustomUploadAdapterPlugin.bind(null, token)],
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "blockQuote",
        "insertTable",
        "|",
        "imageUpload",
        "undo",
        "redo",
      ],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
  };

  return (
    <CKEditor
      required
      editor={ClassicEditor}
      config={custom_config}
      data={value}
      onChange={(event, editor) => {
          const data = editor.getData();
        //   const newData = data.slice()
          onChange(data)
        // onChange(data);
      }}
    />
  );
};

function MyCustomUploadAdapterPlugin(token, editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader, token);
  };
}

class MyUploadAdapter {
  constructor(props, token) {
    // CKEditor 5's FileLoader instance.
    this.loader = props;
    // URL where to send files.
    this.url = `http://localhost:8080/api/user/upload/image`;
    this.token = token;
  }

  // Starts the upload process.
  upload() {
    return new Promise((resolve, reject) => {
      this._initRequest();
      this._initListeners(resolve, reject);
      this._sendRequest();
    });
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Example implementation using XMLHttpRequest.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());
    const token = this.token;
    console.log(token);

    xhr.open("POST", this.url, true);
    xhr.responseType = "text";
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Authorization", token);
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = "Couldn't upload file:" + ` ${loader.file.name}.`;

    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const response = xhr.response;
      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText
        );
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      console.log(response);
      resolve({
        default: response,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.
  _sendRequest() {
    const data = new FormData();

    this.loader.file.then((result) => {
      data.append("upload", result);
      this.xhr.send(data);
    });
  }
}

export const getDataFromCKEditor = (data) => {
  // ???????????? ?????????!
  if (data && data.match("<img src=")) {
    const whereImg_start = data.indexOf("<img src=");

    // ????????? url ??????
    let whereImg_end = "";
    let ext_name_find = "";
    let result_Img_Url = "";

    // ????????? ????????? ??????
    const ext_name = ["jpeg", "png", "gif", "jpg"];

    for (let i = 0; i < ext_name.length; i++) {
      if (data.match(ext_name[i])) {
        // ????????? ??????
        ext_name_find = ext_name[i];
        // ???????????? ????????? ?????????
        whereImg_end = data.indexOf(`${ext_name[i]}`);
      }
    }

    if (ext_name_find === "jpeg") {
      result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 4);
    } else {
      result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 3);
    }

    return {
      fileUrl: result_Img_Url,
    };
  } else {
    // ???????????? ????????? fileUrl??? ??? ????????? ???????????????
    return {
      fileUrl: "",
    };
  }
};

export default Editor;
