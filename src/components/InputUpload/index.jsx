import React, { useState, useEffect } from "react"
import { Upload, Image } from "antd"
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons"
import _ from "lodash"
import { getNotification } from "@/utils/helper"
import ErrorMessage from "@/components/ErrorMessage/index.jsx"
import styles from "./styles.module.scss"
import { UploadIcon } from "lucide-react"

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const InputUpload = ({
  label,
  type,
  desc = "Chọn tệp tối đa 2MB, định dạng JPG, PNG, JPEG, WEBP",
  uploadShape = "circle",
  error,
  handleChangeData,
  onFocusInputLesson,
  formData,
  maxFileSize = 2,
}) => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    if (formData && formData[type]) {
      if (typeof formData[type] === "string") {
        setImageUrl(formData[type])
      } else if (formData[type] instanceof File) {
        getBase64(formData[type]).then((base64) => {
          setImageUrl(base64)
        })
      }
    }
  }, [formData, type])

  const beforeUpload = (file) => {
    const imageTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
    const isImage = imageTypes.includes(file.type)
    if (!isImage) {
      getNotification("warning", "Chỉ được tải JPG, PNG, JPEG, WEBP")
      return false
    }

    const isLt2M = file.size / 1024 / 1024 < maxFileSize
    if (!isLt2M) {
      getNotification("warning", `Chọn tệp tối đa ${maxFileSize}MB`)
      return false
    }

    return true
  }

  const handleChange = async (info) => {
    if (info.file.status === "uploading") {
      setLoading(true)
      return
    }

    if (info.file.status === "done" || info.file.originFileObj) {
      try {
        const fileObj = info.file.originFileObj

        if (fileObj) {
          const base64Image = await getBase64(fileObj)
          setImageUrl(base64Image)
          setLoading(false)

          if (handleChangeData) {
            handleChangeData(type, fileObj)
          }

          if (onFocusInputLesson) {
            onFocusInputLesson(type)
          }
        }
      } catch (error) {
        setLoading(false)
        getNotification("error", "Không thể xử lý tệp, vui lòng thử lại")
      }
    }
  }

  const customRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok")
    }, 0)
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  )

  return (
    <div className="input-upload-container">
      <div className="input-wrap">{!_.isEmpty(label) && <div className="label-wrap">{label}</div>}</div>

      <Upload
        name="avatar"
        listType={uploadShape === "circle" ? "picture-circle" : "picture-card"}
        className={styles.avatarUploader}
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={customRequest}
      >
        {imageUrl ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              borderRadius: uploadShape === "circle" ? "50%" : "2px",
            }}
          >
            <Image
              className={styles.image}
              src={imageUrl}
              alt={`image ${type}`}
              style={{
                objectFit: "cover",
              }}
              preview={{
                visible: false,
                mask: <UploadIcon />,
              }}
            />
          </div>
        ) : (
          uploadButton
        )}
      </Upload>

      {!_.isEmpty(desc) && (
        <div className="input-wrap">
          <div className="desc-wrap">{desc}</div>
        </div>
      )}
      {error && error.length > 0 ? <ErrorMessage message={error} /> : ""}
    </div>
  )
}

export default InputUpload
