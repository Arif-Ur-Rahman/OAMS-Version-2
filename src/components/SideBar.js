import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { ImCross, ImDrawer2 } from "react-icons/im";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import './sidebar.scss';
import '../MyStyle.css'
import { ImHome, ImUser, ImDrawer } from "react-icons/im";
import { MdAdminPanelSettings, MdInventory } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { Divider } from "@material-ui/core";
import { AddBox, Autorenew, ContactPhoneRounded, Details, NotificationsActive } from "@material-ui/icons";
import { useTranslation } from 'react-i18next';

const Sidebar = props => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [show, setShow] = useState(true);
    const [t, i18n] = useTranslation('common');

    const [adminLevel, setAdminLevel] = useState(localStorage.getItem("isAdmin"));

    const [isSelected, setIsSelected] = useState('goToMyAssets');  //arif

    const goToMyAssets = () => {
        props.setSelectTableHandler(1);
        setIsSelected("goToMyAssets");  //arif
    }
    const goToUsers = () => {
        props.setSelectTableHandler(2);
        setIsSelected("goToUsers"); //arif
    }
    const goToAvailableAssets = () => {
        props.setSelectTableHandler(3);
        setIsSelected("goToAvailableAssets");   //arif
    }
    const goToAssetDetails = () => {
        props.setSelectTableHandler(4);
        setIsSelected("goToAssetDetails");   //arif
    }
    const goToAdmin = () => {
        props.setSelectTableHandler(5);
        setIsSelected("goToAdmin"); //arif
    }
    const goToRequestTable = () => {
        props.setSelectTableHandler(6);
        setIsSelected("goToRequestTable"); //arif
    }
    const goToAllAsset = () => {
        props.setSelectTableHandler(7);
        setIsSelected("goToAllAsset");  //arif
    }
    const goToActivities = () => {
        props.setSelectTableHandler(8);
        setIsSelected("goToActivities");  //arif
    }
    const goToProfile = () => {
        props.setSelectTableHandler(9);
        setIsSelected("goToProfile"); //arif
    }

    const sidebarExpand = () => {
        setShow(true)
        setIsExpanded(true)
    }

    const closeExpand = () => {
        setShow(false);
        setIsExpanded(false);
    }

    return (
        <>
            <div className="sidebar-test">
                <ProSidebar
                    collapsed={
                        isExpanded === true ? false
                            :
                            show === true && isExpanded === false ? false :
                                true}
                    width="236px"
                    className="sidebar-test"
                >
                    <Menu iconShape="square">
                        <div className={show === true ? "burgerMenuShow col-3" : "burgerMenuShow col-1"}>
                            {
                                show === true || isExpanded === true ?
                                    <span className="ml-4 custom-menu"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => closeExpand()}
                                    >
                                        {/* <GiHamburgerMenu className="mt-4" /> */}
                                        <ImCross className="mt-4 mb-4" />
                                    </span>
                                    :
                                    <span className="ml-4 custom-menu"
                                        style={{ cursor: "pointer" }}
                                        // onClick={() => setShow(prev => !prev)}
                                        onClick={() => sidebarExpand()}
                                    >
                                        {/* <GiHamburgerMenu className="mt-4" /> */}
                                        <GiHamburgerMenu className="mt-4 mb-4" />
                                    </span>
                            }
                        </div>

                        {adminLevel > 0 ?
                            <>
                                <Divider />
                                <MenuItem
                                    onMouseOver={() => setShow(true)}
                                    onMouseOut={() => setShow(false)}
                                >
                                    <Nav.Item>
                                        <Nav.Link eventKey="Admin"
                                            //conditionally color decide (arif)
                                            className={isSelected === "goToAdmin" ? "sideMenuSelected" : "sideMenu"}
                                            onClick={goToAdmin} activeKey={this}>
                                            {show === true || isExpanded === true ?
                                                <h5><MdAdminPanelSettings className="iconMargin" /> &nbsp;&nbsp;{t('SidebarMenu.4')}</h5> :
                                                <>
                                                    <h5 className="sideMenuIcon"><MdAdminPanelSettings /></h5>
                                                    <span className="sideMenuText" >{t('SidebarMenu.4')}</span>
                                                </>}
                                        </Nav.Link>
                                    </Nav.Item>
                                </MenuItem>
                                <MenuItem
                                    onMouseOver={() => setShow(true)}
                                    onMouseOut={() => setShow(false)}
                                >
                                    <Nav.Item>
                                        <Nav.Link eventKey="Users"
                                            //conditionally color decide (arif)
                                            className={isSelected === "goToUsers" ? "sideMenuSelected" : "sideMenu"}
                                            onClick={goToUsers}>
                                            {show === true || isExpanded === true ?
                                                <h5><ImUser className="iconMargin" /> &nbsp;&nbsp;{t('SidebarMenu.2')}</h5> :
                                                <>
                                                    <h5 className="sideMenuIcon"><ImUser /></h5>
                                                    <span className="sideMenuText" >{t('SidebarMenu.2')}</span>
                                                </>}
                                        </Nav.Link>
                                    </Nav.Item>
                                </MenuItem>
                                <MenuItem
                                    onMouseOver={() => setShow(true)}
                                    onMouseOut={() => setShow(false)}
                                >
                                    <Nav.Item>
                                        <Nav.Link eventKey="Asset Details"
                                            //conditionally color decide (arif)
                                            className={isSelected === "goToAssetDetails" ? "sideMenuSelected" : "sideMenu"}
                                            onClick={goToAssetDetails} activeKey={this}>
                                            {show === true || isExpanded === true ?
                                                <h5><Details className="iconMargin" /> &nbsp;&nbsp;{t('SidebarMenu.5')}</h5> :
                                                <>
                                                    <h5 className="sideMenuIcon"><Details /></h5>
                                                    <span className="sideMenuText">{t('SidebarMenu.5')}</span>
                                                </>}
                                        </Nav.Link>
                                    </Nav.Item>
                                </MenuItem>
                                <MenuItem
                                    onMouseOver={() => setShow(true)}
                                    onMouseOut={() => setShow(false)}
                                >
                                    <Nav.Item>
                                        <Nav.Link eventKey="All Asset"
                                            //conditionally color decide (arif)
                                            className={isSelected === "goToAllAsset" ? "sideMenuSelected" : "sideMenu"}
                                            onClick={goToAllAsset} activeKey={this}>
                                            {show === true || isExpanded === true ?
                                                <h5><MdInventory className="iconMargin" /> &nbsp;&nbsp;{t('SidebarMenu.6')}</h5> :
                                                <>
                                                    <h5 className="sideMenuIcon"><MdInventory /></h5>
                                                    <span className="sideMenuText" >{t('SidebarMenu.6')}</span>
                                                </>}
                                        </Nav.Link>
                                    </Nav.Item>
                                </MenuItem>
                                <MenuItem
                                    onMouseOver={() => setShow(true)}
                                    onMouseOut={() => setShow(false)}
                                >
                                    <Nav.Item>
                                        <Nav.Link eventKey="RequestedTable"
                                            //conditionally color decide (arif)
                                            className={isSelected === "goToRequestTable" ? "sideMenuSelected" : "sideMenu"}
                                            onClick={goToRequestTable} activeKey={this}>
                                            {show === true || isExpanded === true ?
                                                <h5><Autorenew className="iconMargin" /> &nbsp;&nbsp;{t('SidebarMenu.7')}</h5> :
                                                <>
                                                    <h5 className="sideMenuIcon"><Autorenew /></h5>
                                                    <span className="sideMenuText" >{t('SidebarMenu.7')}</span>
                                                </>}
                                        </Nav.Link>
                                    </Nav.Item>
                                </MenuItem>
                                <MenuItem
                                    onMouseOver={() => setShow(true)}
                                    onMouseOut={() => setShow(false)}
                                >
                                    <Nav.Item>
                                        <Nav.Link eventKey="Activities"
                                            //conditionally color decide (arif)
                                            className={isSelected === "goToActivities" ? "sideMenuSelected" : "sideMenu"}
                                            onClick={goToActivities} activeKey={this}>
                                            {show === true || isExpanded === true ?
                                                <h5><NotificationsActive className="iconMargin" /> &nbsp;&nbsp;{t('SidebarMenu.8')}</h5> :
                                                <>
                                                    <h5 className="sideMenuIcon"><NotificationsActive color="red" /></h5>
                                                    <span className="sideMenuText" >{t('SidebarMenu.8')}</span>
                                                </>
                                            }
                                        </Nav.Link>
                                    </Nav.Item>
                                </MenuItem>
                            </>
                            :
                            <>

                            <MenuItem
                                onMouseOver={() => setShow(true)}
                                onMouseOut={() => setShow(false)}
                            >
                                <Nav.Item className="custom-nav">
                                    <Nav.Link eventKey="Home"
                                        //conditionally color decide (arif)
                                        className={isSelected === "goToMyAssets" ? "sideMenuSelected" : "sideMenu"}
                                        onClick={goToMyAssets}>
                                        {show === true || isExpanded === true ?
                                            <h5 ><ImHome className="iconMargin" /> &nbsp;&nbsp;{t('SidebarMenu.1')}</h5> :
                                            <>
                                                <h5 className="sideMenuIcon"><ImHome /></h5>
                                                <span className="sideMenuText" >{t('SidebarMenu.1')}</span>
                                            </>}
                                    </Nav.Link>
                                </Nav.Item>
                            </MenuItem>
                            <MenuItem
                                onMouseOver={() => setShow(true)}
                                onMouseOut={() => setShow(false)}
                            >
                                <Nav.Item>
                                    <Nav.Link eventKey="Users"
                                        //conditionally color decide (arif)
                                        className={isSelected === "goToUsers" ? "sideMenuSelected" : "sideMenu"}
                                        onClick={goToUsers}>
                                        {show === true || isExpanded === true ?
                                            <h5><ContactPhoneRounded className="iconMargin" /> &nbsp;&nbsp;{t('SidebarMenu.2')}</h5> :
                                            <>
                                                <h5 className="sideMenuIcon"><ContactPhoneRounded /></h5>
                                                <span className="sideMenuText" >{t('SidebarMenu.2')}</span>
                                            </>}
                                    </Nav.Link>
                                </Nav.Item>
                            </MenuItem>
                            <MenuItem
                                onMouseOver={() => setShow(true)}
                                onMouseOut={() => setShow(false)}
                            >
                                <Nav.Item>
                                    <Nav.Link eventKey="Available Assets"
                                        //conditionally color decide (arif)
                                        className={isSelected === "goToAvailableAssets" ? "sideMenuSelected" : "sideMenu"}
                                        onClick={goToAvailableAssets} activeKey={this}>
                                        {show === true || isExpanded === true ?
                                            <h5><AddBox className="iconMargin" /> &nbsp;&nbsp;{t('SidebarMenu.3')}</h5> :
                                            <>
                                                <h5 className="sideMenuIcon"><AddBox /></h5>
                                                <span className="sideMenuText" >{t('SidebarMenu.3')}</span>
                                            </>}
                                    </Nav.Link>
                                </Nav.Item>
                            </MenuItem>
                            </>
                        }
                    </Menu>
                </ProSidebar>

            </div>

        </>
    );
};
//const Sidebar = withRouter(Side);
export default Sidebar;