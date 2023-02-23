import { Button } from "@mui/material";
import React, { useRef, useState } from "react";

// type props = {
//   addFileList: Array<File>;
// };

// const FileUpload = ({ addFileList }: props) => {
const FileUpload = () => {
  const imageInput = useRef<HTMLInputElement>(null);
  const [addFileList, setAddFileList] = useState<Array<File>>([]);

  const onCickImageUpload = () => {
    imageInput.current?.click();
  };

  //   const onUploadImage = useCallback(
  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const photoToAdd = e.target.files;
    let temp = [];
    for (let i = 0; i < photoToAdd.length; i++) {
      temp.push(photoToAdd[i]);
    }

    temp = temp.concat(addFileList);
    console.log("temp : ", temp);
    setAddFileList(temp);

    console.log("addFileList : ", addFileList);
  };

  return (
    <div>
      <div>
        <div>* 첨부파일</div>
        <div>
          <input
            multiple
            type="file"
            style={{ display: "none" }}
            ref={imageInput}
            onChange={onUploadImage}
          />
          <Button variant="contained" size="medium" onClick={onCickImageUpload}>
            파일올리기
          </Button>
        </div>
        {addFileList.map((file) => (
          <div>{file.name}</div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(FileUpload);
