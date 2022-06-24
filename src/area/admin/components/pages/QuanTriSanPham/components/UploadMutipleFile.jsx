import React, { useEffect, useState } from "react";
import { Post, Delete } from "~/area/admin/components/api/SanPham";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
function UploadMutipleFile({ maSP, fileInit, setFileInit }) {
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append("file", file);
    try {
      const res = await Post(
        "/api/admin/SanPham/Upload-Mutiple?MaSP=" + maSP,
        fmData,
        config
      );
      setFileInit((prev) => {
        return [
          ...prev,
          {
            uid: res.img,
            name: res.img,
            status: "done",
            // custom error message to show
            url: `https://localhost:44328/wwwroot/res/SanPhamRes/Imgs/${maSP}/${res.img.trim()}`,
          },
        ];
      });
    } catch (err) {
      //   setFileInit([
      //     {
      //       uid: "1",
      //       name: "1",
      //       status: "error",
      //       // custom error message to show
      //       url: "#",
      //     },
      //   ]);
      const error = new Error("Some error");
      onError({ err });
    }
  };
  const handleOnChange = (options) => {
    // setFileInit(options.fileList);
    // console.log(file, fileList, event);
    //Using Hooks to update the state to the current filelist
    // setDefaultFileList(fileList);
    //filelist - [{uid: "-1",url:'Some url to image'}]
  };
  const handleOnRemove = async (f) => {
    try {
      const res = await Delete(
        `/api/admin/SanPham/Remove-Mutiple?fileName=${f.name}&_id=${maSP}`
      );
      if (res.success) {
        var temp = [...fileInit];
        var img = temp.find((x) => x.uid == f.uid);
        var index = temp.indexOf(img);
        if (index > -1) {
          temp.splice(index, 1);
        }
        setFileInit(temp);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Upload
        disabled={
          defaultFileList.length <= 0 || defaultFileList.length < 5
            ? false
            : true
        }
        maxCount={5}
        multiple
        accept="image/*"
        customRequest={uploadImage}
        onChange={handleOnChange}
        onRemove={handleOnRemove}
        listType="picture-card"
        fileList={fileInit}
        className="image-upload-grid"
      >
        <div>
          <UploadOutlined />
          Thêm ảnh
        </div>
      </Upload>
    </>
  );
}

export default UploadMutipleFile;
