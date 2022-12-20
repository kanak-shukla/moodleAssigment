import React from 'react'
import { serverRootPath, uploadFolderPath } from '../ApiPaths';

/*
    This component is used to show book details in modal.
*/

const BookInfoModal = (props) => {

    const { onClose } = props;
    const { bookName, bookImage, bookDesc, ImageName } = props.curBookElem;

    let coverImage = ImageName ? serverRootPath + uploadFolderPath + "/" + ImageName : bookImage;

    return (
        <>
            <div className="bookModal_container justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="bookModal_container--box">

                    {/*header*/}
                    <div className="bookModal_container--head ">
                        <button
                            className="close_btn"
                            type="button"
                            onClick={() => onClose()}>
                            X
                        </button>
                        <h3 className="text-3xl font-semibold">
                            {bookName}
                        </h3>
                    </div>

                    {/*body*/}
                    <div className="bookModal_container--body">
                        <img
                            className="object-cover w-full h-48"
                            src={coverImage}
                            alt="image"
                        />
                        <p className="my-4 text-slate-500 text-lg leading-relaxed">
                            {bookDesc}
                        </p>
                    </div>

                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default BookInfoModal