/* eslint-disable @next/next/no-img-element */
import { Post } from "@/Api";
import Delete from "@/Api/Delete";
import { ImagePath, Url_Keys } from "@/Constant";
import { CommonImageUploadProps } from "@/Types/CoreComponents";
import { Toaster } from "@/Utils/ToastNotification";
import { GalleryAdd } from "iconsax-react";
import Image from "next/image";
import { FC, Fragment } from "react";
import Dropzone from "react-dropzone";

const CommonImageUpload: FC<CommonImageUploadProps> = ({ multiple, errors, setValue, setPhoto, photo, trigger, name, type, disabled }) => {
  const normalizedPhoto: string[] = Array.isArray(photo) ? photo : photo ? [photo] : [];

  const onDrop = async (acceptedFiles: File[]) => {
    const uploadedPhotoURLs: string[] = [];

    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const result = await Post(Url_Keys.Upload.Upload, formData);
        uploadedPhotoURLs.push(result.data as string);
      } catch {
        Toaster("error", "Image upload failed.");
        return;
      }
    }

    const newPhotos = multiple ? [...normalizedPhoto, ...uploadedPhotoURLs] : uploadedPhotoURLs;

    setPhoto?.(multiple ? newPhotos : [newPhotos[0]]);
    setValue?.(name, newPhotos);
    trigger?.(name);
  };

  const removeFile = async (imageSrc: string) => {
    const updatedPhoto = normalizedPhoto.filter((img) => img !== imageSrc);
    await Delete(Url_Keys.Upload.Delete, { imageUrl: imageSrc }, false);
    setPhoto?.(updatedPhoto);
    setValue?.(name, updatedPhoto);
    trigger?.(name);
  };

  return (
    <Fragment>
      {photo?.length === 0 ? (
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <Fragment>
              {type === "profile" ? (
                <div {...getRootProps()} className="dropzone-container-profile d-flex justify-content-center">
                  <input {...getInputProps()} form="profile" />
                  <Image width={150} height={150} id="profile" src={`${ImagePath}other-images/user.png`} alt="" />
                </div>
              ) : (
                <div {...getRootProps()} className="dropzone-container">
                  <input {...getInputProps()} />
                  <div className="dz-message needsclick">
                    <GalleryAdd color="#cca270" variant="Bulk" />
                    <h5>Image upload</h5>
                  </div>
                </div>
              )}
            </Fragment>
          )}
        </Dropzone>
      ) : (
        <Fragment>
          {multiple && (
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="add-more-files-zone">
                  <input {...getInputProps()} />
                  <p>Click or drag more files to add</p>
                </div>
              )}
            </Dropzone>
          )}
          <div className="uploaded-files">
            {photo?.map((file: string, index) => {
              return (
                <Fragment key={index}>
                  {type === "profile" ? (
                    <div className="dropzone-container-profile d-flex justify-content-center">
                      <img id="profile" src={file} alt={`image-${index}`} />
                      {!disabled && (
                        <button type="button" onClick={() => removeFile(file)} className="remove-button" title="Remove file">
                          ×
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="file-card">
                      {/* <div className="file-thumbnail"> */}
                        <img src={file} alt={`image-${index}`} className={`file-thumbnail ${type === "banner" ? "w-100" :""}`}/>
                      {/* </div> */}
                      {!disabled && (
                        <button type="button" onClick={() => removeFile(file)} className="remove-button" title="Remove file">
                          ×
                        </button>
                      )}
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>
        </Fragment>
      )}
      {errors?.image && name === "image" && <p className={`text-danger ${type === "profile" && "d-flex justify-content-center"}`}>{errors.image.message}</p>}
      {errors?.mobileImage && name === "mobileImage" && <p className="text-danger">{errors.mobileImage.message}</p>}
      {errors?.newsLetterImage && name === "newsLetterImage" && <p className="text-danger">{errors.newsLetterImage.message}</p>}
    </Fragment>
  );
};

export default CommonImageUpload;
