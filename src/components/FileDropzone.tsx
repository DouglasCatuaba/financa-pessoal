import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileDropzoneProps {
  onFiles: (files: File[]) => void;
}

/**
 * FileDropzone leverages react-dropzone to provide a drag‑and‑drop area for
 * uploading files. When files are dropped or selected via the file picker
 * the onFiles callback is invoked with the list of files.
 */
const FileDropzone: React.FC<FileDropzoneProps> = ({ onFiles }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFiles(acceptedFiles);
  }, [onFiles]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer dark:border-gray-600 ${
        isDragActive ? 'bg-blue-50 dark:bg-gray-700' : ''
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? <p>Solte os arquivos aqui...</p> : <p>Arraste e solte arquivos, ou clique para selecionar</p>}
    </div>
  );
};

export default FileDropzone;