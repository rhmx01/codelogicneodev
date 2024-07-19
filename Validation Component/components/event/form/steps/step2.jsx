"use client";
import React, {useState} from 'react';
import {motion} from "framer-motion";
import Select from "@components/input/Select";
import Input from "@components/input/Input";
import Image from "next/image";
import {FaCamera, FaPlus, FaTrash} from "react-icons/fa";
import AddressAutocomplete from "@components/input/MapAutoComplete";
import API_URL from "@utils/api";
import clsx from "clsx";
import {validateEmail, validateLink} from "@utils/hofs";
import i18next from "i18next";
import './../../../../utils/i18n.js'


function Step2({values, setValues, organizer, setOrganizer, handleChange, handleChangeSocial, countries, showError = 0, role, speaker, setSpeaker}) {
    const [image, setImage] = useState(null)
    const [imageSpeaker, setImageSpeaker] = useState(null)
    const [showOrganizers, setShowOrganizers] = useState(values.organizers.length > 0 || role === "owner")
    const handlePlaceSelected = (address, url, lat, lng) => {
        // Do something with the selected place data
        // console.log('Selected place:', place);
        setValues({
            ...values,
            map_location: address,
            map_url: url,
            map_lat: lat,
            map_lng: lng
        })
    };
    return (
        <div className='grid md:grid-cols-2 gap-4'>
            <motion.div
                initial={{opacity: 0.5, x: -50}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.5}}
                className={values.mode === 'private' ? 'flex gap-2' : ''}
            >
                <Select
                    error={values.mode.length === 0 && showError === 2}
                    name='mode'
                    onChange={handleChange}
                    label={i18next.t("Access")+"*"}
                    className='w-full'
                    value={values.mode}
                    options={[
                        {label: i18next.t("Public"), value: 'public', selected: false},
                        {label: i18next.t("Private"), value: 'private', selected: false},
                        {label: i18next.t("International"), value: 'international', selected: false},
                        {label: i18next.t("Web") , value: 'web', selected: false},
                    ]}
                />
                {values.mode === 'private' &&
                    <Select
                        name='private_mode'
                        onChange={handleChange}
                        label={i18next.t("Private Mode")}
                        className='w-full'
                        value={values.private_mode}
                        options={
                            [
                                {label: i18next.t("Payable") , value: 'Payable', selected: false},
                                {label: i18next.t("Free") , value: 'Free', selected: false},
                            ]
                        }
                    />
                }
            </motion.div>
            <motion.div
                initial={{opacity: 0.5, x: 50}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.5}}
            >
                <Select name='type'
                        error={values.type.length === 0 && showError === 2}
                        onChange={handleChange}
                        label={ i18next.t("Event Type") + "*"}
                        className=''
                        value={values.type}
                        options={[
                            {label: i18next.t("Race"), value: "Race"},
                            {label: i18next.t("Beauty contest") , value: "Beauty contest"},
                            {label: i18next.t("Festival") , value: "Festival"},
                            {label: i18next.t("Sports") , value: "Sports"},
                            {label: i18next.t("Exhibition") , value: "Exhibition"},
                            {label: i18next.t("Show") , value: "Show"},
                            {label: i18next.t("Conference") , value: "Conference"},
                            {label: i18next.t("Travel") , value: "Travel"},
                            {label: i18next.t("Concert") , value: "Concert"},
                            {label: i18next.t("Charity") , value: "Charity"},
                            {label: i18next.t("Summit"), value: "Summit"},
                            {label: i18next.t("Auction") , value: "Auction"},
                            {label: i18next.t("Ceremony") , value: "Ceremony"},
                            {label: i18next.t("Global") , value: "Global"},
                        ]}
                />
            </motion.div>
            <motion.div
                initial={{opacity: 0.5, x: -80}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.7}}
            >
                <Select
                    error={values.theme.length === 0 && showError === 2}
                    name='theme'
                    onChange={handleChange}
                    className=''
                    label={i18next.t("Subject or Theme")+'*'}
                    value={values.theme}
                    options={[
                        {label: i18next.t("Cultural Heritage and Tradition") , value: "Cultural Heritage and Tradition"},
                        {label: i18next.t("Conservation and Sustainability"), value: "Conservation and Sustainability"},
                        {
                            label: i18next.t("Veterinary Science and Animal Welfare"),
                            value: "Veterinary Science and Animal Welfare"
                        },
                        {label: i18next.t("Sports and Competition"), value: "Sports and Competition"},
                        {label: i18next.t("Economic Impact and Trade"), value: "Economic Impact and Trade"},
                        {label: i18next.t("Tourism and Adventure Travel"), value: "Tourism and Adventure Travel"},
                        {label: i18next.t("Artistic and Cultural Expression"), value: "Artistic and Cultural Expression"},
                        {
                            label: i18next.t("Educational and Interactive Experiences"),
                            value: "Educational and Interactive Experiences"
                        },
                        {label: i18next.t("Culinary Exploration"), value: "Culinary Exploration"},
                        {label: i18next.t("Global Networking and Collaboration"), value: "Global Networking and Collaboration"},
                        {label: i18next.t("Technology and Innovation"), value: "Technology and Innovation"},
                        {label: i18next.t("Health and Nutrition"), value: "Health and Nutrition"},
                        {label: i18next.t("Fundraising"), value: "Fundraising"},
                        {label: i18next.t("Global"), value: "Global"},
                    ]}
                />
            </motion.div>
            <motion.div
                initial={{opacity: 0.5, x: 80}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.7}}
            >
                {values.mode === 'web' ?
                    <Input
                        error={values?.web_link?.length > 0 && showError === 2 && !validateLink(values?.web_link)}
                        type='text' value={values.web_link} name='web_link' label={'Link'} onChange={handleChange}
                        placeholder='link...'/>
                    :
                    <AddressAutocomplete onPlaceSelected={handlePlaceSelected} value={values.map_location}/>}

            </motion.div>

            <motion.div
                className='md:col-span-2'
                initial={{opacity: 0.5, x: -50}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.7}}
            >
                <label htmlFor={'email'}>{i18next.t("Contact_information")}</label>
                <div className='grid md:grid-cols-2 gap-4'>
                    <Input
                        error={(!validateEmail(values.email) && values.email?.length > 0) && showError === 2}
                        id='email' type='email' name='email' value={values.email} label={'Email'}
                        onChange={handleChange}
                        placeholder='jdoe@mail.com'/>
                    <div>
                        <label htmlFor={'phone'}>{i18next.t("Phone")}</label>
                        <div className='flex gap-2'>
                            <div className="w-1/3">
                                <Select name='phone_code'
                                        onChange={handleChange}
                                        value={values.phone_code}
                                        options={countries.map((country) => {
                                            return {label: `+${country.phone} (${country.name})`, value: country.name}
                                        })}
                                />
                            </div>
                            <Input
                                className='w-full'
                                type='number'
                                name='phone'
                                value={values.phone}
                                label={''}
                                onChange={handleChange}
                                placeholder={i18next.t("Phone number")}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
            {role !== "owner" && <div
                className='md:col-span-2 text-white flex gap-2 items-center border border-white rounded-xl font-bold text-lg p-4 bg-white bg-opacity-10'>
                {i18next.t("Do_you_know")}?
                <button type='button' className='border border-white p-1 rounded-lg hover:bg-white hover:text-black'
                        onClick={() => setShowOrganizers(!showOrganizers)}>
                    {showOrganizers ? 'No' : 'Yes'}
                </button>
            </div>}
            {showOrganizers && <motion.div
                className='md:col-span-2'
                initial={{opacity: 0.5, x: 50}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.7}}
            >
                <label htmlFor={'orgnizers'}>{i18next.t("Organizer")}</label>
                <div className='grid gap-2'>
                    {values.organizers && values.organizers.map((org, i) => (
                        <div key={i}
                             className="flex gap-2 items-center border border-gray-500 p-2 justify-between rounded-2xl text-white">
                            <Image
                                src={org.pictureUrl ? org.pictureUrl : org.picture?.length > 0 ? `${API_URL}/uploads/organizers/${org.picture}` : "/assets/images/logo.svg"}
                                alt={org.name}
                                width={40} height={40}
                                className='rounded-full'/>
                            <p>{org.name}</p>
                            <p>{org.linkedin}</p>
                            <button type='button'
                                    className=" w-fit p-2 bg-white rounded-full hover:bg-blue-600 hover:text-white"
                                    onClick={() => {
                                        setValues({
                                            ...values,
                                            organizers: values.organizers.filter((org, index) => index !== i)
                                        })
                                    }}
                            >
                                <FaTrash className='text-red-600'/>
                            </button>
                        </div>))}
                </div>
                <div
                    className={clsx("md:col-span-2 grid md:flex gap-2 md:items-center border p-2 md:justify-between rounded-2xl", ((showError === 2 && role === "owner") && (values.organizers.length === 0 && !organizer.name)) ? "border-red-600 shadow-md shadow-red-600" : "border-gray-200")}>
                    <Input
                        type='file'
                        id='orgpic'
                        name='orgpic'
                        accept={'image/*'}
                        className='mx-auto w-fit rounded-full bg-gray-100 bg-opacity-20 overflow-hidden'
                        icon={
                            image ? <img src={image} alt={"camelendar: event organizer"}
                                         className="w-32 h-10 rounded-full object-cover"/>
                                :
                                <FaCamera className='text-2xl'/>
                        }
                        onChange={(e) => {
                            // handle organizer picture
                            setOrganizer({
                                ...organizer,
                                picture: e.target.files[0],
                                pictureUrl: URL.createObjectURL(e.target.files[0])
                            })
                            setImage(URL.createObjectURL(e.target.files[0]))

                        }}/>
                    <Input
                        className='w-full'
                        type='text' name='org-name' label={''}
                        value={organizer.name || ''}
                        onChange={(e) => {
                            // handle organizer name
                            setOrganizer({
                                ...organizer, name: e.target.value
                            })
                        }}
                        placeholder={i18next.t("Full name")}/>
                    <Input
                        error={organizer.linkedin && !validateLink(organizer.linkedin)}
                        className='w-full'
                        type='text' name='org-linkedin' label={''}
                        value={organizer.linkedin || ''}
                        onChange={(e) => {
                            // handle organizer linkedin
                            setOrganizer({
                                ...organizer, linkedin: e.target.value
                            })
                        }}
                        placeholder={i18next.t("Link") + ' ...'}
                    />
                    <button
                        type='button'
                        className="w-fit mx-auto p-3 rounded-full text-white hover:shadow-md hover:shadow-secondary border-2 border-secondary"
                        onClick={() => {
                            if (organizer.linkedin && !validateLink(organizer.linkedin)) return;
                            if (organizer.name) {
                                setValues({
                                    ...values, organizers: [...values.organizers, {
                                        name: organizer.name,
                                        picture: organizer.picture,
                                        linkedin: organizer.linkedin || '',
                                        pictureUrl: organizer.pictureUrl
                                    }]
                                })
                                setOrganizer({
                                    name: '',
                                    picture: {},
                                    linkedin: '',
                                    pictureUrl: ''
                                })
                                setImage(null)
                            }
                        }}
                    >
                        <FaPlus/>
                    </button>
                </div>
            </motion.div>}


            <motion.div
                className='md:col-span-2'
                initial={{opacity: 0.5, x: 50}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.7}}
            >
                <label htmlFor={'speakers'}>{i18next.t("Speaker")}</label>
                <div className='grid gap-2'>
                    {values.speakers && values.speakers?.map((org, i) => (
                        <div key={i}
                             className="flex gap-2 items-center border border-gray-500 p-2 justify-between rounded-2xl text-white">
                            <Image
                                src={org.pictureUrl ? org.pictureUrl : org.picture?.length > 0 ? `${API_URL}/uploads/speakers/${org.picture}` : "/assets/images/logo.svg"}
                                alt={org.name}
                                width={40} height={40}
                                className='rounded-full'/>
                            <p>{org.name}</p>
                            <p>{org.linkedin}</p>
                            <button type='button'
                                    className=" w-fit p-2 bg-white rounded-full hover:bg-blue-600 hover:text-white"
                                    onClick={() => {
                                        setValues({
                                            ...values,
                                            speakers: values.speakers?.filter((org, index) => index !== i)
                                        })
                                    }}
                            >
                                <FaTrash className='text-red-600'/>
                            </button>
                        </div>))}
                </div>
                <div
                    className={clsx("md:col-span-2 grid md:flex gap-2 md:items-center border p-2 md:justify-between rounded-2xl", ((showError === 2 && role === "owner") && (values.speakers?.length === 0 && !speaker.name)) ? "border-red-600 shadow-md shadow-red-600" : "border-gray-200")}>
                    <Input
                        type='file'
                        id='speakerpic'
                        name='speakerpic'
                        accept={'image/*'}
                        className='mx-auto w-fit rounded-full bg-gray-100 bg-opacity-20 overflow-hidden'
                        icon={
                            imageSpeaker ? <img src={imageSpeaker} alt={"camelendar: event speaker"}
                                         className="w-32 h-10 rounded-full object-cover"/>
                                :
                                <FaCamera className='text-2xl'/>
                        }
                        onChange={(e) => {
                            // handle speaker picture
                            setSpeaker({
                                ...speaker,
                                picture: e.target.files[0],
                                pictureUrl: URL.createObjectURL(e.target.files[0])
                            })
                            setImageSpeaker(URL.createObjectURL(e.target.files[0]))

                        }}/>
                    <Input
                        className='w-full'
                        type='text' name='speaker-name' label={''}
                        value={speaker?.name || ''}
                        onChange={(e) => {
                            // handle speaker name
                            setSpeaker({
                                ...speaker, name: e.target.value
                            })
                        }}
                        placeholder={i18next.t("Full name")}/>
                    <Input
                        error={speaker?.linkedin && !validateLink(speaker?.linkedin)}
                        className='w-full'
                        type='text' name='speaker-linkedin' label={''}
                        value={speaker?.linkedin || ''}
                        onChange={(e) => {
                            setSpeaker({
                                ...speaker, linkedin: e.target.value
                            })
                        }}
                        placeholder={i18next.t("Link") + '...'}
                    />
                    <button
                        type='button'
                        className="w-fit mx-auto p-3 rounded-full text-white hover:shadow-md hover:shadow-secondary border-2 border-secondary"
                        onClick={() => {
                            if (speaker?.linkedin && !validateLink(speaker?.linkedin)) return;
                            if (speaker?.name) {
                                setValues({
                                    ...values, speakers: [...values.speakers, {
                                        name: speaker?.name,
                                        picture: speaker?.picture,
                                        linkedin: speaker?.linkedin || '',
                                        pictureUrl: speaker?.pictureUrl
                                    }]
                                })
                                setSpeaker({
                                    name: '',
                                    picture: {},
                                    linkedin: '',
                                    pictureUrl: ''
                                })
                                setImageSpeaker(null)
                            }
                        }}
                    >
                        <FaPlus/>
                    </button>
                </div>
            </motion.div>

            <motion.div
                className='md:col-span-2'
                initial={{opacity: 0.5, y: 70}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.7}}
            >
                <label htmlFor={'socialmedia'}>{i18next.t("Network")} *</label>
                <div id={'socialmedia'}
                     className={clsx("grid md:grid-cols-2 lg:grid-cols-4 gap-4 shadow-md border p-2 rounded-2xl", (showError === 2 && Object.values(values.socials).filter(social => social !== "").length === 0) ? "border-red-600 shadow-red-600" : "border-gray-500")}>
                    <div
                        className={clsx("flex gap-2 relative border-2 bg-transparent p-2 rounded-md shadow-md text-white bg-white bg-opacity-10", (showError === 2 && ((values.socials?.facebook?.length > 0 && !validateLink(values.socials?.facebook)))) ? 'border-red-600 shadow-red-600' : 'border-gray-200')}>
                        <Image src="/assets/icons/facebook.svg" alt="camelendar facebook" width={40}
                               height={40}
                        />
                        <input placeholder="https://facebook.com/..."
                               className="py-2 w-full bg-transparent" name='facebook'
                               value={values.socials?.facebook} onChange={handleChangeSocial}
                        />
                    </div>
                    <div
                        className={clsx("flex gap-2 relative border-2 bg-transparent p-2 rounded-md shadow-md text-white bg-white bg-opacity-10", (showError === 2 && ((values.socials?.instagram?.length > 0 && !validateLink(values.socials?.instagram)))) ? 'border-red-600 shadow-red-600' : 'border-gray-200')}>
                        <Image src="/assets/icons/instagram.svg" alt="camelendar instagram" width={40}
                               height={40}
                        />
                        <input placeholder="https://instagram.com/..."
                               className="py-2 w-full bg-transparent" name='instagram'
                               value={values.socials?.instagram} onChange={handleChangeSocial}
                        />
                    </div>
                    <div
                        className={clsx("flex gap-2 relative border-2 bg-transparent p-2 rounded-md shadow-md text-white bg-white bg-opacity-10", (showError === 2 && ((values.socials?.twitter?.length > 0 && !validateLink(values.socials?.twitter)))) ? 'border-red-600 shadow-red-600' : 'border-gray-200')}>
                        <Image src="/assets/icons/x.webp" alt="camelendar twitter" width={40}
                               height={40}
                        />
                        <input placeholder="https://twitter.com/..."
                               className="py-2 w-full bg-transparent" name='twitter'
                               value={values.socials?.twitter} onChange={handleChangeSocial}
                        />
                    </div>
                    <div
                        className={clsx("flex gap-2 relative border-2 bg-transparent p-2 rounded-md shadow-md text-white bg-white bg-opacity-10", (showError === 2 && ((values.socials?.linkedin?.length > 0 && !validateLink(values.socials?.linkedin)))) ? 'border-red-600 shadow-red-600' : 'border-gray-200')}>
                        <Image src="/assets/icons/linkedin.svg" alt="camelendar facebook" width={40}
                               height={40}
                               className=""/>
                        <input placeholder="https://linkedin.com/..."
                               className="py-2 w-full bg-transparent" name='linkedin'
                               value={values.socials?.linkedin} onChange={handleChangeSocial}/>
                    </div>
                    <div
                        className={clsx("flex gap-2 relative border-2 bg-transparent p-2 rounded-md shadow-md text-white bg-white bg-opacity-10", (showError === 2 && ((values.socials?.youtube?.length > 0 && !validateLink(values.socials?.youtube)))) ? 'border-red-600 shadow-red-600' : 'border-gray-200')}>
                        <Image src="/assets/icons/youtube.svg" alt="camelendar youtube" width={40}
                               height={40}
                               className=""/>
                        <input placeholder="https://youtube.com/..."
                               className="py-2 w-full bg-transparent" name='youtube'
                               value={values.socials?.youtube} onChange={handleChangeSocial}/>
                    </div>
                    <div
                        className={clsx("md:col-span-2 flex gap-2 relative border-2 bg-transparent p-2 rounded-md shadow-md text-white bg-white bg-opacity-10", (showError === 2 && ((values.socials?.website?.length > 0 && !validateLink(values.socials?.website)))) ? 'border-red-600 shadow-red-600' : 'border-gray-200')}>
                        <Image src="/assets/icons/web.png" alt="camelendar website" width={40}
                               height={40}
                               className=""/>
                        <input placeholder="https://domain.com" className="py-2 w-full bg-transparent"
                               name='website'
                               value={values.socials?.website} onChange={handleChangeSocial}/>
                    </div>
                    {/*<div className="col-span-2 w-full flex justify-end">*/}
                    {/*    <button className="p-2 bg-gray-200 rounded-full hover:bg-blue-600 hover:text-white">*/}
                    {/*        <FaPlus/>*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </motion.div>
        </div>
    );
}

export default Step2;