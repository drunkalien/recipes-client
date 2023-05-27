import { IKUpload } from "imagekitio-react";

type Props = {
  onSuccess: (res: any) => void;
  onUploadStart: () => void;
  onError: (err: any) => void;
};

const Dropzone = ({ onSuccess, onError, onUploadStart }: Props) => {
  return (
    <div className="border-dashed border-2 flex items-center justify-center h-96">
      <IKUpload
        folder="/recipes"
        multiple={false}
        accept="image/*"
        type="file"
        onSuccess={onSuccess}
        onUploadStart={onUploadStart}
        onError={onError}
      />
    </div>
  );
};

export default Dropzone;
