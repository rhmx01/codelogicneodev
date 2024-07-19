'use client';
import Title from "@components/Title";
import Button from "@components/Button";
import {redirect, useRouter, useSearchParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import Stepper from "@components/Stepper/Stepper";
import NetAnimate from "@components/home/net";
import {FaArrowLeft, FaArrowRight, FaSave, FaUpload} from "react-icons/fa";
import {motion} from "framer-motion";
import {useSession} from "next-auth/react";
import Step0 from "@components/event/form/steps/step0";
import Step1 from "@components/event/form/steps/step1";
import Step2 from "@components/event/form/steps/step2";
import Step3 from "@components/event/form/steps/step3";
import Step4 from "@components/event/form/steps/step4";
import API_URL from "@utils/api";
import Loader from "@components/loader/Loader";
import {getFilesSize, validateEmail, validateLink} from "@utils/hofs";
import CircularLoader from "@components/loader/CircularLoader";
import {FiTrash} from "react-icons/fi";
import i18next from "i18next";
import '@utils/i18n.js';
import { detectLanguage , translateText} from "@components/Chatbot/translation/translate_detect";


function NewEvent(props) {
    const router = useRouter();
    const {data: session} = useSession({
        required: true,
        onUnauthenticated() {
            redirect("https://camelendar.com/api/auth/signin?callbackUrl=/events/new");
        },
    });
    const descriptionMaxLength = 1500;
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const steps = [i18next.t("Basics") , i18next.t("Details") ,i18next.t("Media") ,i18next.t("Logistics") ];
    const [complete, setComplete] = useState(false);
    const [role, setRole] = useState('');
    const [visible, setVisible] = useState(0);
    const [countries, setCountries] = useState([]);
    const [showError, setShowError] = useState(0);
    const [errorMessages, setErrorMessages] = useState([]);
    // is owner hook
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");

    // organizer hook
    const [organizer, setOrganizer] = useState({});
    const [speaker, setSpeaker] = useState({});
    const [values, setValues] = useState({
        title_data:{},
        description_data:{},
        title: '',
        description: '',
        date_start: new Date(),
        date_end: null,
        location: '',
        mode: '', // public, private
        private_mode: '',
        type: '',
        theme: '',
        organizers: [],
        speakers: [],
        socials_media: '',
        socials: {
            facebook: '', instagram: '', twitter: '', linkedin: '', youtube: '', website: '',
        },
        email: '',
        phone: '',
        contact: '',
        // map: "",
        map_location: "",
        map_url: "",
        map_lat: 0,
        map_lng: 0,
        logo: {},
        programfiles: [],
        pictures: [],
        target: '',
        registration: '',
        max_participants: 0,
        accessibility: [],
        sponsors: [],
        parking: '',
        lodging: '',
        visibility: 0,
        message: '',
        web_link: '',
    });

    /*
   title, description, date_start, date_end, location, mode, type, theme, organizers, socials_media, socials, email, phone, contact, map, logo, programfiles, pictures, target, registration, max_participants, accessibility, sponsors, parking, lodging, visibility,
     */

    const handleDescriptionChange = (e) => {
        setValues({
            ...values, description: e.target.value
        })
    }
    const handleChange = ({target: {name, value}}) => {

        setValues({
            ...values, [name]: value
        })
    }
    //handleChangeSocial
    const handleChangeSocial = ({target: {name, value}}) => {
        // if (validateLink(value))
        setValues({
            ...values,
            socials: {
                ...values.socials, [name]: value
            },
            socials_media: name
        })
    }

    const handleFileChange = ({target: {name, files}}) => {
        setValues({
            ...values, // if name = pictures or programfiles then [name]: files else [name]: files[0]
            [name]: name === 'logo' ? files[0] : [...values[name], ...files]
            // [name]: files[0]
        })
    }
    //handle next function
    const handleNext = async () => {
        setShowError(currentStep)
        let errorMessages = [];
        // Step 1 validation
        if (currentStep === 1 && values.date_end && values.date_start && values.date_start > values.date_end) {
            errorMessages.push("Start date must be before end date");
        }
        if (currentStep === 1 && values.description.replace(/(<([^>]+)>)/gi, "").length > descriptionMaxLength) {
            errorMessages.push(`Description must be less than ${descriptionMaxLength} characters`);
        }
        if (currentStep === 1 && (!values.title || !values.date_start || !values.date_end || !values.location || !values.description)) {
            errorMessages.push("Missing required fields.");
        }

        // Step 2 validation
        if (currentStep === 2 && (!values.mode || !values.type || !values.theme)) {
            errorMessages.push("Missing required fields.");
        }
        if(currentStep === 2) {
            if (role === 'owner' && (!organizer.name && values.organizers.length === 0)) {
                errorMessages.push("Missing required fields.");
            }
            if (Object.values(values.socials).filter(social => social !== "").length === 0) {
                errorMessages.push("At least one social media is required.");
            }
            if (values.email?.length > 0 && !validateEmail(values.email)) {
                errorMessages.push("Invalid email format.");
            }
            Object.values(values.socials).filter(social => social !== "").forEach(social => {
                if (!validateLink(social)) {
                    errorMessages.push("Invalid link format.");
                }
            })
        }

        // Step 3 validation
        if (currentStep === 3 && (getFilesSize(values.pictures) > 10 || getFilesSize(values.programfiles) > 5)) {
            errorMessages.push("Files size must be less than 10 MB for pictures and 5 MB for program files");
        }
        if (currentStep === 3 && (values.pictures.length < 1 || !values.logo.name)) {
            errorMessages.push("Missing required fields.");
        }

        setErrorMessages(errorMessages)

        // if(currentStep === 1 && values.date_start < values.date_end && values.description.replace(/(<([^>]+)>)/gi, "").length < descriptionMaxLength && values.title && values.date_start && values.date_end && values.location && values.description)
        if (errorMessages.length === 0) setCurrentStep((prev) => prev + 1);

        if (currentStep === 1) {
            const langTable = ["en", "fr", "ar", "es", "de", "pt", "fa", "hi", "ur", "zh", "mn", "ru", "ja", "tr"];
          
            // Function to handle translation for a specific field
            const translateField = async (fieldValue, fieldName) => {
                const data = {}
              if (fieldValue) {
                const detectedLang = await detectLanguage(fieldValue);
                console.log(detectedLang)
                langTable.forEach(async (item) => {
                  if (item !== detectedLang) {
                    data[item] = await translateText(fieldValue,item);
                  }else{
                    data[item] = fieldValue;
                  }
                });
                console.log(data)
                // Update state after collecting all data
                setValues((prevValues) => ({ ...prevValues, [fieldName]: data }));
              }
            };
          
            // Translate title
            await translateField(values.title, 'title_data');
          
            // Translate description
            await translateField(values.description, 'description_data');
          }

    }
    //handle previous
    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowError(currentStep)
        let errorMessages = [];
        // Step 4 validation
        if (currentStep === 4){
            if (getFilesSize(values.sponsors) > 5) {
                errorMessages.push("Files size must be less than 5 MB for sponsors");
            }
            if((values.registration && !validateLink(values.registration)) || (values.lodging && !validateLink(values.lodging))) {
                errorMessages.push("Invalid link format.");
            }
        }
        setErrorMessages(errorMessages)


        if (currentStep >= 4 && errorMessages.length === 0) {
            setLoading(true);
            setErrorMessages([])
            setShowError(0)
            const formData = new FormData();
            // Append all values to formData
            const keys = ["title", "description", "location", "logo", "mode", "private_mode", "type", "theme", "email", "phone", "target", "registration", "max_participants", "parking", "lodging", "map_location", "map_url", "map_lat", "map_lng", "message", "web_link"];
            keys.forEach(key => {
                formData.append(key, values[key]);  // Assuming values.program_file is a FileList
            });
            // Convert Date objects to string or numeric representation
            const dateStartString = values.date_start.toISOString();
            const dateEndString = values.date_end.toISOString();

            // title_data and description_data
            
            formData.append("title_data", JSON.stringify(values.title_data));
            formData.append("description_data", JSON.stringify(values.description_data));

            /////////////////////////////////////////////////////////////////////

            formData.append("date_start", dateStartString);
            formData.append("date_end", dateEndString);
            formData.append("role", role);
            formData.append("visibility", e.target.name === 'publish' ? 1 : 0);
            if (speaker.picture) {
                
                formData.append("speakers_pics", speaker.picture);
            }
            let speakers_data = [];
            if (speaker.name) {
                speakers_data.push(
                    {
                        name: speaker.name,
                        linkedin: speaker.linkedin
                    }
                )
            }
            if (values.speakers.length > 0) {
                values.speakers.forEach(speaker => {
                    formData.append("speakers_pics", speaker.picture);
                    speakers_data.push(
                        {
                            name: speaker.name,
                            linkedin: speaker.linkedin
                        }
                    )
                })

            }



            if (organizer.picture) {
                formData.append("organizers_pics", organizer.picture);
            }
            let organizers_data = [];
            if (organizer.name) {
                organizers_data.push(
                    {
                        name: organizer.name,
                        linkedin: organizer.linkedin
                    }
                )
            }
            if (values.organizers.length > 0) {
                values.organizers.forEach(organizer => {
                    formData.append("organizers_pics", organizer.picture);
                    organizers_data.push(
                        {
                            name: organizer.name,
                            linkedin: organizer.linkedin
                        }
                    )
                })

            }
            formData.append("organizers_data", organizers_data.length > 0 ? JSON.stringify(organizers_data) : "");
            formData.append("speakers_data", speakers_data.length > 0 ? JSON.stringify(speakers_data) : "");
            formData.append("accessibility", values.accessibility.join(";"));
            formData.append("phone_code", countries.find(country => country.name === values.location).phone || "");
            formData.append("created_by_email", session?.user?.email);
            formData.append("created_by_name", session?.user?.name);
            formData.append("created_by_image", session?.user?.image);
            formData.append("created_by_role", session?.user?.role);

            formData.append("socials", JSON.stringify(values.socials));

            // Append all files to formData
            [...values.programfiles].forEach(pf => {
                formData.append("programfiles", pf);  // Assuming values.program_file is a FileList
            });
            [...values.pictures].forEach(pf => {
                formData.append("pictures", pf);  // Assuming values.pictures is a FileList
            });
            [...values.sponsors].forEach(pf => {
                formData.append("sponsors", pf);  // Assuming values.sponsors is a FileList
            });

            try {
                const url = `${API_URL}/api/events/save`;
                const res = await fetch(url, {
                    method: "POST", body: formData
                });
                if (res.ok) {
                    // setLoading(false);
                    window.location.href = "/events/myevents?context=newevent";
                } else {
                    setLoading(false);
                    throw new Error("Failed to create an event");
                }
            } catch (error) {
                setLoading(false)
                alert(error)
            }
        }
    };

    useEffect(() => {
        (async () => {
            const response = await fetch(
                'https://parseapi.back4app.com/classes/Continentscountriescities_Country?limit=251&order=name&keys=name,code,phone,native',
                {
                    headers: {
                        'X-Parse-Application-Id': 'fOkLnJttWQzJ7A8Gp4t9JQSuXQvHbh3aSUI8tNfC', // This is your app's application id
                        'X-Parse-REST-API-Key': 'yFv55vg1kY0ipsYXjenok5PYhW8xcGSjMe4GFVqH', // This is your app's REST API key
                    }
                }
            );
            const data = await response.json();
            setCountries(data.results);
        })();
    }, []);

    if (session) return (
        <>
            {/*{loading && <Loader/>}*/}
            <NetAnimate/>
            {role.length === 0 && <Step0 setRole={setRole} setValues={setValues} user={session?.user} setOrganizer={setOrganizer}/>}
            <div className='container lg:w-3/4 mx-auto mt-24 mb-10'>
                {role && <div className='p-4 my-6 w-full mb-4'>
                    <Title tag='h1' className="text-white">{i18next.t("Add_event")} </Title>
                </div>}
                {role &&
                    <motion.div
                        // className='flex items-center '
                        initial={{opacity: 0.5, y: -50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                    >
                        <Stepper steps={steps} complete={complete} currentStep={currentStep}/>
                    </motion.div>}
                {role &&
                    <div className='p-4 flex justify-between items-center'>
                        {currentStep !== 1 ? <motion.div
                            initial={{opacity: 0.5, x: -50}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.5}}
                        >
                            <button disabled={currentStep === 1} type='button' name='previous'
                                    className='flex text-white items-center text-xl font-medium'
                                    onClick={handlePrevious}><FaArrowLeft className='mr-2'/> {i18next.t("Previous")} 
                            </button>
                        </motion.div> : <div></div>}
                        {currentStep !== 4 && <motion.div
                            initial={{opacity: 0.5, x: 50}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.5}}
                        >
                            <button disabled={currentStep === 4} type='button' name='next'
                                    className='flex text-white items-center text-xl font-medium'
                                    onClick={handleNext}> {i18next.t("Next")}  <FaArrowRight className='ml-2'/></button>
                        </motion.div>}
                    </div>}
                {errorMessages.length > 0 && <div
                    className='p-2 md:p-4 rounded-md shadow-md  w-full grid gap-4'
                >
                    <div className="flex justify-end">
                        <Button
                            onClick={() => {
                                setErrorMessages([])
                            }}
                            className="text-white flex items-center gap-2 p-1">
                            <FiTrash/> {i18next.t("Clear")} 
                        </Button>
                    </div>
                    {
                        [...new Set(errorMessages)].map((error, index) => {
                            return (
                                <div key={index} className='bg-red-500 text-white p-2 rounded-md'>
                                    {error}
                                </div>
                            )
                        })
                    }
                </div>}

                <form onSubmit={handleSubmit}>
                    <div className='p-4 rounded-md shadow-md  w-full grid gap-4'>

                        {(currentStep === 1 && role) &&
                            <Step1
                                showError={showError}
                                user={session.user}
                                countries={countries}
                                values={values}
                                setValues={setValues}
                                descriptionMaxLength={descriptionMaxLength}
                                handleChange={handleChange}
                                handleDescriptionChange={handleDescriptionChange}/>}
                        {currentStep === 2 &&
                            <Step2
                                showError={showError}
                                countries={countries}
                                values={values}
                                handleChange={handleChange}
                                handleChangeSocial={handleChangeSocial}
                                setValues={setValues}
                                organizer={organizer}
                                setOrganizer={setOrganizer}
                                speaker={speaker}
                                setSpeaker={setSpeaker}
                                role={role}
                            />}
                        {currentStep === 3 &&
                            <Step3
                                showError={showError}
                                values={values}
                                setValues={setValues}
                                handleFileChange={handleFileChange}
                            />}
                        {currentStep === 4 &&
                            <div className="flex flex-col gap-4">
                                <Step4
                                    showError={showError}
                                    values={values}
                                    setValues={setValues}
                                    handleFileChange={handleFileChange}
                                    handleChange={handleChange}
                                />


                                <motion.div
                                    className='relative md:col-span-2'
                                    initial={{opacity: 0.5, y: 50}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.7}}
                                >
                                    <label>{i18next.t("Message for admin")} :</label>
                                    <div className="">
                                        <textarea
                                            className='w-full h-40 p-2 border-2 border-gray-200 bg-transparent px-4 py-2 rounded-md shadow-md text-white bg-white bg-opacity-10'
                                            name='message'
                                            value={values.message}
                                            onChange={handleChange}
                                            placeholder={i18next.t("your message") +'...'}
                                        />
                                    </div>
                                </motion.div>


                            </div>}


                    </div>
                </form>
                {role &&
                    <div className='p-4 flex justify-between items-center'>
                        {currentStep !== 1 ? <motion.div
                            initial={{opacity: 0.5, x: -50}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.5}}
                        >
                            <button disabled={currentStep === 1} type='button' name='previous'
                                    className='flex text-white items-center text-xl font-medium'
                                    onClick={handlePrevious}><FaArrowLeft className='mr-2'/> {i18next.t("Previous")} 
                            </button>
                        </motion.div> : <div></div>}
                        {currentStep === 4 && <div className='flex gap-2'>
                            <Button
                                onClick={(e) => {
                                    setValues({
                                        ...values, visibility: 0
                                    })
                                    handleSubmit(e)
                                }}
                                disabled={loading && values.visibility === 0}
                                className='gap-2'
                                type='submit' name='save'
                            >{(loading && values.visibility === 0) ? <CircularLoader/> : <FaSave className='mr-2'/>} {i18next.t("Save")}  </Button>
                            <Button
                                disabled={loading && values.visibility === 1}
                                className='gap-2'
                                type='submit'
                                name='publish'
                                onClick={(e) => {
                                    setValues({
                                        ...values, visibility: 1
                                    })
                                    handleSubmit(e)
                                }}
                            >{(loading && values.visibility === 1) ? <CircularLoader/> : <FaUpload className='mr-2'/>} {i18next.t("Publish")}   </Button>
                        </div>}
                        {currentStep !== 4 && <motion.div
                            initial={{opacity: 0.5, x: 50}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.5}}
                        >
                            <button disabled={currentStep === 4} type='button' name='next'
                                    className='flex text-white items-center text-xl font-medium'
                                    onClick={handleNext}> {i18next.t("Next")}  <FaArrowRight className='ml-2'/></button>
                        </motion.div>}
                    </div>}
            </div>
        </>

    );
    else
        return <Loader/>
    // <div className='h-screen w-screen flex items-center text-white text-3xl '>loading...</div>;
}

export default NewEvent;