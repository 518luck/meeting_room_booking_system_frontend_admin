import { InboxOutlined, CameraOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadProps } from "antd";

const { Dragger } = Upload;

interface HeadPicUploadProps {
  value?: string;
  onChange?: (_: string) => void;
}

const HeadPicUpload = (props: HeadPicUploadProps) => {
  const uploadProps: UploadProps = {
    name: "file",
    action: "http://localhost:3000/user/upload",
    showUploadList: false,
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        props.onChange?.(info.file.response.data);
        message.success(`${info.file.name} 文件上传成功`);
      } else if (status === "error") {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };

  return (
    <div className="flex items-start gap-6">
      {/* 头像预览区域 */}
      <div className="flex-shrink-0">
        {props?.value ? (
          <div className="relative group">
            <img
              src={"http://localhost:3000/" + props.value}
              alt="头像"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 shadow-sm"
            />
            <Upload {...uploadProps}>
              <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center">
                <CameraOutlined className="text-white text-xl" />
              </div>
            </Upload>
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
            <span className="text-gray-400 text-3xl">?</span>
          </div>
        )}
      </div>

      {/* 上传区域 */}
      <div className="flex-1 max-w-xs">
        <Dragger
          {...uploadProps}
          className="bg-gray-50 border-gray-200 hover:border-blue-400 transition-colors rounded-lg"
        >
          <p className="ant-upload-drag-icon !mb-2">
            <InboxOutlined className="!text-blue-400 !text-3xl" />
          </p>
          <p className="text-sm text-gray-600">点击或拖拽文件上传</p>
          <p className="text-xs text-gray-400 mt-1">支持 JPG、PNG 格式</p>
        </Dragger>
      </div>
    </div>
  );
};

export default HeadPicUpload;
