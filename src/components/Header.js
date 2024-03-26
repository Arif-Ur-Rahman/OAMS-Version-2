import react, { useState, useEffect, useRef, Component } from "react";
import { Nav, Navbar, Container } from 'react-bootstrap';
import '../DropDownNotification.css';
import './LanguageToogle.css';
import './AdminToggle.css';

import App from "../App";
import { AccountCircle, NotificationsActiveRounded, NotificationsActiveSharp, NotificationsNone, NotificationsOffOutlined, NotificationsOutlined } from "@material-ui/icons";
import Profile from "./Profile";
import { useTranslation } from "react-i18next";
import LanguageToogle from "./LanguageToogle";
import Api from '../API';

//Sound
import notification00 from "../soundFiles/notification00.wav"
import notification01 from "../soundFiles/notification01.wav"
import notification02 from "../soundFiles/notification02.wav"
import notification03 from "../soundFiles/notification03.wav"
import AdminToggle from "./AdminToggle";


function Header({ logout }) {
    const [t, i18n] = useTranslation('common');

    //Notification Audio Play
    //region Audio
    const notification00Audio = new Audio(notification00)
    const notification01Audio = new Audio(notification01)
    const notification02Audio = new Audio(notification02)
    const notification03Audio = new Audio(notification03)

    // const playSound = () => {
    //     notification01Audio.play();
    // };
    const playSound = (audioFile) => {
        audioFile.play();
    };
    //endregion


    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const [notificationData, setNotificationData] = useState([])
    const [notificationCount, setNotificationCount] = useState(0)


    //dropdown Notification menu
    //#region notification

    const [dropdownState, setDropdownState] = useState(false);
    const [dropdownValue, setDropdownValue] = useState("");

    const fetchNotificationData = () => {
        console.log("/notification/showNotificationTable");
        let isAdmin = localStorage.getItem("isAdmin");
        if (isAdmin != 0) {
            return (

                Api({
                    method: 'post',
                    url: '/notification/showNotificationTable',
                    data: {

                    }
                }).then(response => {
                    if (response.data.success == 1) {
                        setNotificationData([]);
                        setNotificationData(response.data.data);

                        console.log(response.data.data.length);
                        //console.log(response.data.data[0].NotificationType);
                        //console.log("ddd",response.data.data[0].SeenFlag);


                        if (notificationCount < response.data.data.length) {

                            setNotificationCount(response.data.data.length)

                            if (response.data.data[0].NotificationType == '0' && response.data.data[0].SeenFlag == 0) {
                                console.log("A");

                                playSound(notification00Audio);
                            }
                            else if (response.data.data[0].NotificationType == '1' && response.data.data[0].SeenFlag == 0) {
                                console.log("B");

                                playSound(notification01Audio);
                            }
                            else if (response.data.data[0].NotificationType == '2' && response.data.data[0].SeenFlag == 0) {
                                console.log("C");

                                playSound(notification02Audio);
                            }
                            else {
                                console.log("D");

                                //playSound(notification03Audio)
                            }
                            // playSound()
                            // playSound(notification01Audio)
                        }
                        else {

                            setNotificationCount(response.data.data.length)
                        }



                    } else {
                        // alert("Something went wrong");
                        setNotificationCount(0)
                    }

                    console.log(response.data);
                }).catch(function (error) {
                    console.log(error);
                    // alert("Something went wrong");
                    alert(error);
                })
            )
        }
        else {

            return null
        }




    }



    const setNotificationSeen = (data) => {
        const notificationId = data;
        console.log("NotificationId: " + notificationId)
        console.log("/notification/notificationSeen")
        Api({
            method: 'post',
            url: '/notification/notificationSeen',
            data: {
                NotificationId: notificationId
            }
        }).then(response => {
            if (response.data.success == 1) {
                fetchNotificationData();
            } else {
                alert("Something went wrong");
            }

            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
            // alert("Something went wrong");
            alert(error);
        });
    }


    const handleDropdownClick = () => {
        setDropdownState(!dropdownState);
    };
    const handleSetDropdownValue = (value) => {
        if (window.confirm("Mark this notification as 'SEEN'?")) {

            setDropdownValue(value);
            setNotificationSeen(value)
            setDropdownState(!dropdownState);
        }
    };

    const mydata = [
        {
            id: 27,
            title: "Utah Utes Sports",
            parent: 0,
            topic_count: "5,831",
            reply_count: "31,299",
            content: "Ute and Pac-12 Sports",
            type: "category"
        },
        {
            id: 60,
            title: "Football",
            parent: 27,
            topic_count: "4,367",
            reply_count: "24,960",
            content: "",
            type: "forum"
        },
        {
            id: 30,
            title: "Basketball",
            parent: 27,
            topic_count: "1,026",
            reply_count: "4,303",
            content: "",
            type: "forum"
        },
        {
            id: 102,
            title: "Other Ute Sports",
            parent: 27,
            topic_count: "139",
            reply_count: "391",
            type: "forum"
        },
        // {
        //   id: 41,
        //   title: "Pac-12",
        //   parent: 27,
        //   topic_count: "300",
        //   reply_count: "1,645",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 2290,
        //   title: "Misc",
        //   parent: 0,
        //   topic_count: "548",
        //   reply_count: "3,787",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 104,
        //   title: "Professional Sports",
        //   parent: 0,
        //   topic_count: "255",
        //   reply_count: "956",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 110,
        //   title: "MLB",
        //   parent: 104,
        //   topic_count: "14",
        //   reply_count: "47",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 108,
        //   title: "NBA",
        //   parent: 104,
        //   topic_count: "121",
        //   reply_count: "469",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 106,
        //   title: "NFL",
        //   parent: 104,
        //   topic_count: "92",
        //   reply_count: "358",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 1771,
        //   title: "NHL",
        //   parent: 104,
        //   topic_count: "4",
        //   reply_count: "26",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 112,
        //   title: "Soccer",
        //   parent: 104,
        //   topic_count: "6",
        //   reply_count: "9",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 771,
        //   title: "Ute Hub Site",
        //   parent: 0,
        //   topic_count: "342",
        //   reply_count: "2,069",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 119,
        //   title: "Comments and Suggestions",
        //   parent: 771,
        //   topic_count: "189",
        //   reply_count: "1,253",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 775,
        //   title: "How To Use Ute Hub",
        //   parent: 771,
        //   topic_count: "60",
        //   reply_count: "289",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 1777,
        //   title: "Politics",
        //   parent: 0,
        //   topic_count: "196",
        //   reply_count: "2,493",
        //   content: "",
        //   type: "forum"
        // },
        // {
        //   id: 121,
        //   title: "byu/tds",
        //   parent: 0,
        //   topic_count: "244",
        //   reply_count: "1,718",
        //   content: "",
        //   type: "forum"
        // }
    ];
    // const forumsFiltered = mydata.filter((item) => item.type !== "category");
    // const forumsFiltered = notificationData.filter((item) => item.type !== "category");

    //#endregion

    //#region ProfileModal
    const openProfileModal = () => {
        console.log("Create Clicked");
        console.log(isProfileOpen);
        setIsProfileOpen(true);
        console.log(isProfileOpen);
    };
    const closeProfileModal = () => {
        setIsProfileOpen(false);
    };
    //#endregion


    //#region autoAPIcall
    function Counter() {
        const [count, setCount] = useState(0);

        useInterval(() => {
            // this function is called all the time
            setCount(count + 1);
            console.log("counted: " + count)
            fetchNotificationData()
            console.log(notificationData)
        }, 10000);

        return <h1></h1>;
    }

    function useInterval(callback, delay) {
        const savedCallback = useRef();

        // Remember the latest function.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }
    //#endregion


    useEffect(() => {

        fetchNotificationData()

    }, []);




    return (
        <>

            {(localStorage.getItem('isLoggedIn') === "true") ? (
                <>
                    < div >
                        <img
                            className="logo-container-header"
                            src="uxbd_logo.png"
                            alt="UX-BD"
                        />



                        <div className="HeaderDetails">
                            {
                                ((JSON.parse(localStorage.getItem("userDetails"))).EmployeeIsAdmin) > 0 ?
                                    <AdminToggle />
                                    : console.log((JSON.parse(localStorage.getItem("userDetails"))).EmployeeIsAdmin)
                            }

                            <LanguageToogle />

                            <h6 className="HeaderUserDetails">

                                Welcome, <span>{(JSON.parse(localStorage.getItem('userDetails'))).EmployeeEmail}</span>{" "}

                                <Profile show={isProfileOpen} onHide={closeProfileModal} />
                                <AccountCircle className=" ml-2 " fontSize="large" onClick={openProfileModal} />

                                {(localStorage.getItem('isAdmin') != "0") ?
                                    <NotificationsActiveSharp onClick={handleDropdownClick} className={notificationCount > 0 ? "newNotification" : "notification"}>
                                        {dropdownValue === "" ? "Dropdown" : dropdownValue}
                                    </NotificationsActiveSharp>
                                    : null
                                }





                                <Counter />

                                <div
                                    className={`dropdown-items ${dropdownState ? "isVisible" : "isHidden"
                                        }`}
                                >


                                    {notificationData.length == 0 ?
                                        <div >
                                            <div >
                                                No Notification available
                                            </div>
                                        </div>
                                        :

                                        notificationData.map((data) => (

                                            // notificationData.length == 0 ?
                                            //     <div >
                                            //         <div>
                                            //             List empty
                                            //         </div>
                                            //     </div>
                                            //     :
                                            data.NotificationType == "2" ?
                                                <div className="dropdown-item" key={data.NotificationId}>
                                                    <div
                                                        className="dropdown__link"
                                                        onClick={() =>
                                                            handleSetDropdownValue(data.NotificationId)
                                                        }
                                                    >
                                                        {data.NotificationId}. {data.EmployeeName} requested for {data.Name}
                                                    </div>
                                                </div>
                                                :
                                                data.NotificationType == "1" ?
                                                    <div className="dropdown-item" key={data.NotificationId}>
                                                        <div
                                                            className="dropdown__link"
                                                            onClick={() =>
                                                                handleSetDropdownValue(data.NotificationId)
                                                            }
                                                        >
                                                            {data.NotificationId}. {data.EmployeeName} has notified {data.Name} as Damaged
                                                        </div>
                                                    </div>
                                                    :
                                                    data.NotificationType == "0" ?
                                                        <div className="dropdown-item" key={data.NotificationId}>
                                                            <div
                                                                className="dropdown__link"
                                                                onClick={() =>
                                                                    handleSetDropdownValue(data.NotificationId)
                                                                }
                                                            >
                                                                {data.NotificationId}. {data.Name} has reached warning quantity
                                                            </div>
                                                        </div>
                                                        : null
                                            // <div>
                                            //     <div>
                                            //         No Notification available {notificationData.length}
                                            //     </div>
                                            // </div>

                                        ))

                                    }

                                </div>



                                <button className="buttonClose mx-4" onClick={logout} >Logout</button>
                            </h6>

                        </div>
                    </div >
                </>
            ) : null}
        </>


        // <>
        //     < div className="row justify-content-between">
        //        <div className="col-3">
        //             <img
        //                 className="logo-container-header"
        //                 src="uxbd_logo.png"
        //                 alt="UX-BD"
        //             />
        //        </div>


        //         <div className="col-5 pl-5" >


        //             <div className="d-flex ml-5">
        //                 {/* <div class="dropdown">
        //                     <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //                         language
        //                     </button>
        //                     <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
        //                         <button class="dropdown-item" type="button"
        //                         onClick={() => i18n.changeLanguage('en')}>English</button>
        //                         <button class="dropdown-item" type="button" 
        //                         onClick={() => i18n.changeLanguage('jap')}>Japanese</button>
        //                     </div>
        //                 </div> */}


        //                 <h6>
        //                     <LanguageToogle className="dropdown-btn"/>

        //                     Welcome, <span>{(JSON.parse(localStorage.getItem('userDetails'))).EmployeeEmail}</span>{" "}


        //                     <Profile show={isProfileOpen} onHide={closeProfileModal} />
        //                     <AccountCircle className="dropdown-btn ml-2 " fontSize="large" onClick={openProfileModal} />
        //                     {/* <NotificationsActiveSharp className=" ml-12 " fontSize="large" onClick={handleDropdownClick} className="dropdown-btn">

        //     </NotificationsActiveSharp> */}

        //                     <NotificationsActiveSharp onClick={handleDropdownClick} className="dropdown-btn">
        //                         {dropdownValue === "" ? "Dropdown" : dropdownValue}
        //                     </NotificationsActiveSharp>
        //                     <div
        //                         className={`dropdown-items ${dropdownState ? "isVisible" : "isHidden"
        //                             }`}
        //                     >

        //                         {forumsFiltered.map((p) => (
        //                             <div className="dropdown-item" key={p.id}>
        //                                 <div
        //                                     className="dropdown__link"
        //                                     onClick={() => handleSetDropdownValue(p.id)}
        //                                 >
        //                                     {p.id} {p.title}
        //                                 </div>
        //                             </div>
        //                         ))}
        //                     </div>

        //                     <button className="buttonClose mx-4" onClick={logout} >Logout</button>
        //                      </h6>

        //             </div>

        //         </div>
        //     </div >
        // </>

    );
}

export default Header;