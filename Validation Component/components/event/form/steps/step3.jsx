import React, {useId} from 'react';
import {motion} from "framer-motion";
import Input from "@components/input/Input";
import Image from "next/image";
import {FaTrash} from "react-icons/fa";
import {getFilesSize} from "@utils/hofs";
import API_URL from "@utils/api";
import i18next from "i18next";
import './../../../../utils/i18n.js'

function Step3({values, setValues, handleFileChange, showError}) {

    const picsId = useId()
    const programId = useId()
    const logoId = useId()
    const pdfMaxSize = 15
    return (
        <div className='grid gap-4'>
            <motion.div
                initial={{opacity: 0.5, y: -50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <Input
                    error={!Boolean(values.logo?.size) && showError === 3}
                    type='file'
                    id={logoId}
                    multiple={false}
                    label={i18next.t("Upload logo or front image")}
                    name='logo'
                    onChange={handleFileChange}
                    accept={'image/*'}
                    className='w-full'
                />
                {(values?.logo?.name || values?.logo?.length > 0) &&
                    <Image src={typeof values.logo === "string" ? `${API_URL}/uploads/logos/${values.logo}` : URL.createObjectURL(values.logo)} alt={values.logo.name} width={80}
                           height={80}
                           className='rounded-2xl'
                    />
                }
            </motion.div>
            <motion.div
                initial={{opacity: 0.5, x: 50}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.5}}
            >
                <Input
                    error={values.pictures.length === 0 && showError === 3}
                    type='drag'
                       multiple={true}
                       id={picsId}
                       size={getFilesSize(values.pictures)?.toFixed(1)}
                       maxSize={10}
                       name='pictures'
                       label={i18next.t("Upload your pictures here")}
                       subLabel={<span>JPG, PNG {i18next.t("only_is_autorized")}  <br/> {i18next.t("Max size")}  : 10 MB  <br/> {i18next.t("Last image appears in front")} </span>}
                       onChange={handleFileChange}
                       accept={'image/*'}
                />

                {/*//show uploaded pictures in a grid*/}
                <div className='grid grid-cols-4 gap-4 mt-2'>
                    {values.pictures && Array.from(values.pictures).filter(Boolean).map((pic, i) => (
                        <div key={i}
                             className="col-span-2 flex items-center border border-gray-500 p-2 justify-between rounded-2xl text-white">
                            <div className="flex items-center gap-2">
                                <Image src={typeof pic === "string" ? `${API_URL}/uploads/pictures/${pic}` : URL.createObjectURL(pic)} alt={pic.name} width={80}
                                       height={80}
                                       className='rounded-2xl'/>
                                {pic.size && <p className="text-white">{(pic.size / 1000000).toFixed(2)} MB</p>}
                            </div>
                            <button type='button'
                                    className="p-2 bg-gray-200 rounded-full hover:bg-blue-600 hover:text-white"
                                    onClick={() => {
                                        setValues({
                                            ...values,
                                            pictures: Array.from(values.pictures).filter((pic, index) => index !== i)
                                        })
                                    }}
                            >
                                <FaTrash className='text-red-600'/>
                            </button>
                        </div>))}
                </div>
            </motion.div>
            <motion.div
                initial={{opacity: 0.5, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <Input
                    // error={values.programfiles.length === 0 && showError === 3}
                    type='drag'
                    multiple={true}
                    id={programId}
                    size={getFilesSize(values.programfiles)?.toFixed(1)}
                    maxSize={pdfMaxSize}
                    name='programfiles'
                    label={i18next.t("Upload your programs here and price list")} 
                    subLabel={<span>{i18next.t("PDF only is autorized")} <br/>   {i18next.t("Max_size")}: {pdfMaxSize} MB</span>}
                    onChange={handleFileChange}
                    accept={'*/*'}
                    // accept={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
                />
                <div className='mt-4 grid grid-cols-4 gap-2'>
                    {values.programfiles && Array.from(values.programfiles).filter(Boolean).map((pf, i) => (
                        <div key={i}
                             className="col-span-2 flex items-center border border-gray-500 p-2 justify-between rounded-2xl text-white">
                            <div className="flex items-center gap-2">
                                <Image src='/assets/icons/pdf.png' alt={pf.name} width={80}
                                       height={80}
                                       className='rounded-2xl'/>
                                {pf.size && <p>{(pf.size / 1000000).toFixed(2)} MB</p>}
                            </div>
                            <button type='button'
                                    className="p-2 bg-gray-200 rounded-full hover:bg-blue-600 hover:text-white"
                                    onClick={() => {
                                        setValues({
                                            ...values,
                                            programfiles: Array.from(values.programfiles).filter((pf, index) => index !== i)
                                        })
                                    }}
                            >
                                <FaTrash className='text-red-600'/>
                            </button>
                        </div>))}
                </div>
            </motion.div>

        </div>
    );
}

export default Step3;