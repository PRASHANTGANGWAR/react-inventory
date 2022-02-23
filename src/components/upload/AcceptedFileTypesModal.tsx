import React from 'react'
import Modal from './Modal'

interface Props {
    isOpen: boolean,
    onClose: () => void
}

const acceptedFileTypes: string[] = [
    'jpeg',
    'png',
    'docx',
    'doc',
    'pdf'
]

function AcceptedFileTypesModal({isOpen, onClose }: Props) {
    return (
        <Modal 
            isOpen={isOpen}
            onClose={onClose}
            title="Accepted File Types"
            body={acceptedFileTypes.join(', ')}        
        />
    )
}

export default AcceptedFileTypesModal