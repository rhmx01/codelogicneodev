import React from 'react';
import clsx from "clsx";
import i18next from "i18next";
import './../../../../utils/i18n.js'

function Step0({setRole, user, setOrganizer }) {
    return (
        <div className={`mt-20 p-2 md:p-4 absolute top-0 w-screen h-screen  z-10 flex items-center `}>
            <div className='p-4 lg:p-8 rounded-xl shadow-xl border border-gray-100 max-w-3xl w-full  mx-auto'>
                <div className='w-full'>
                    <h5 className="font-bold text-white">{i18next.t("Are_you_organizer")}</h5>
                    <div className="w-full grid md:flex mt-4 mx-auto justify-around gap-2">
                        <button onClick={() => {
                            setRole("owner")
                            setOrganizer({
                                name: user?.name,
                                picture: user?.image,
                                pictureUrl: user?.image,
                                linkedin: '',
                            })
                        }}
                                className={clsx("text-center cursor-pointer shadow-md hover:shadow-gray-600 text-white bg-white bg-opacity-20 opacity-70 hover:opacity-100 p-4 rounded-xl w-fit")}>
                            <img src='/assets/images/cmlowner.jpeg' alt="form img" className="mx-auto rounded-xl w-64 h-64  object-cover"/>
                            <h5 className="font-bold mt-2">{i18next.t("Organizer_01")}</h5>
                        </button>
                        <button onClick={() => {
                            setRole("publisher")
                        }}
                                className={clsx("text-center cursor-pointer shadow-md hover:shadow-gray-600 text-white bg-white bg-opacity-20 opacity-70 hover:opacity-100 p-4 rounded-xl w-fit")}>
                            <img src='/assets/images/cmlpublisher.jpeg' alt="form img"
                                 className="mx-auto rounded-xl w-64 h-64 object-cover"/>
                            <h5 className="font-bold mt-2">{i18next.t("Publisher")}</h5>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Step0;