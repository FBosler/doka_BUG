import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

import { DropZone, AspectRatio } from './styles'

import { Doka } from './react-doka';

const mask = (root, setInnerHTML) => {
    setInnerHTML(
        root,
        `
        <mask id="my-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white"/>
            <circle cx="50%" cy="50%" r="50%" fill="black"/>
        </mask>
        <rect fill="rgba(255,255,255,.3125)" x="0" y="0" width="100%" height="100%" mask="url(#my-mask)"/>
        <circle cx="50%" cy="50%" r="50%" fill="transparent" stroke-width="1" stroke="#fff"/>
    `
    )
}

const InlineImageEdit = ({ src, onConfirm, onCancel, type = 'profile' }) => {
    const [crop] = useState(type === 'profile' ? { aspectRatio: 1 } : {})
    const style = { width: '640px', height: '480px' }

    const shared = {
        style,
        cropAllowImageFlipHorizontal: false,
        cropAllowImageFlipVertical: false,
        cropAllowRotate: false,
        labelButtonCancel: 'Anderes Bild wählen',
        labelButtonConfirm: 'Auswahl hochladen',
        labelStatusAwaitingImage: 'Noch kein Bild ausgewählt',
        labelStatusLoadingImage: 'Lade Preview',
        labelStatusProcessingImage: 'Lade Bild hoch ...',
        labelButtonCropRotateLeft: 'Nach links drehen',
        labelButtonUtilColor: 'Farben',
        labelButtonUtilCrop: 'Auswahl',
        src,
        onConfirm,
        onCancel,
        crop,
    }

    if (type === 'profile') {
        return (
            <Doka
                {...shared}
                cropAspectRatio={1}
                cropAllowImageTurnLeft={false}
                utils={['crop', 'color', 'filter']}
                cropMask={mask}
            />
        )
    } else {
        return <Doka {...shared} utils={['crop', 'markup']} />
    }
}

const DemoReactDropzone = ({ bucket, imageSource, onSuccessfullUpload, createImageObject, type }) => {
    const [files, setFiles] = useState([])
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        multiple: false,
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            )
        },
    })

    useEffect(
        () => () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview))
        },
        [files]
    )

    const handleUpload = ({ files, bucket, createImageObject, imageSource, onSuccessfullUpload }) => async (
        croppedFile
    ) => {
        console.log('uploading')
    }

    return (
        <div>
            {files.length === 0 ? (
                <DropZone {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                        <span style={{ fontWeight: 900, color: '#e28215' }}>Drag 'n' droppe dein Bild.</span>
                        <br /> Oder <span style={{ fontWeight: 900, color: '#e28215' }}>klicke hier</span>, um ein Bild
                        auszuwählen.
                    </p>
                </DropZone>
            ) : (
                <InlineImageEdit
                    src={files[0].preview}
                    onConfirm={handleUpload({ files, bucket, createImageObject, imageSource, onSuccessfullUpload })}
                    onCancel={() => setFiles([])}
                    type={type}
                />
            )}
        </div>
    )
}

export default DemoReactDropzone
