import { Height } from '@material-ui/icons';
import MaterialTable from 'material-table'
import { useState, useEffect } from 'react';
import Api from '../API';
import AvailableTable from './AvailableTable';
import Multiselect from 'multiselect-react-dropdown';

function AvailableAssets() {
    const [selectedAssetData, setSelectedAssetData] = useState()
    const [assetData, setAssetData] = useState([
        // {
        //     "AssetId": 109,
        //     "AssetName": "ispahani"
        // },
        // {
        //     "AssetId": 111,
        //     "AssetName": "washroom tissue"
        // }
    ])
    const [globalActivityData, setGlobalActivityData] = useState([])

    const getGlobalActivityHistory = () => {
        console.log("getting categoryList")
        console.log("/activity/showGlobalActivityTable");
        console.log("EmployeeId: " + JSON.parse(localStorage.getItem('userDetails')).EmployeeId);
        Api({
            method: 'post',
            url: '/activity/showGlobalActivityTable',
            data: {

            }
        }).then(response => {
            if (response.data.success == 1) {
                setGlobalActivityData([])
                setGlobalActivityData(response.data.data)
                // getCategoryList(response.data.data)
                console.log(JSON.stringify(response.data.data[0].AssetName))
            } else {
                alert("Something went wrong");
            }

            console.log("response")
            console.log(response.data.data);
        }).catch(function (error) {
            console.log(error);
            // alert("Something went wrong");
            alert(error);
        });
    }

    const getAssetData = () => {
        // console.log(addNewAsset)
        console.log("getting categoryList")
        console.log("/assets/availableGlobalAssets");
        console.log("EmployeeId: " + JSON.parse(localStorage.getItem('userDetails')).EmployeeId);
        Api({
            method: 'post',
            url: '/assets/availableGlobalAssets',
            data: {

            }
        }).then(response => {
            if (response.data.success == 1) {
                setAssetData([])
                setAssetData(response.data.data)
                // getCategoryList(response.data.data)
            } else {
                alert("Something went wrong");
            }

            console.log("response")
            console.log(response.data.data);
        }).catch(function (error) {
            console.log(error);
            // alert("Something went wrong");
            alert(error);
        });
    }

    const selectedAssetId = (selectedList, RemovedList) => {
        // {
        //     selectedList.toString() == "user" ? setNewUserDetails({...newUserDetails, EmployeeIsAdmin: 0}) : selectedList.toString() == "admin" ? setNewUserDetails({...newUserDetails, EmployeeIsAdmin: 2}) : setNewUserDetails({...newUserDetails, EmployeeIsAdmin: 1})
        // }
        // console.log({...newUserDetails, EmployeeIsAdmin: 0})

        // setCategoryId(selectedList[0].CategoryId)
        // setIsIdentifiable(selectedList[0].IsIdentifiable)

        // setAddNewAsset({ ...addNewAsset, CategoryId: selectedList[0].CategoryId, IsIdentifiable: selectedList[0].IsIdentifiable })
        console.log("selected")
        console.log(selectedList[0].AssetId)
        console.log(selectedList[0].IsIdentifiable)
        console.log(JSON.parse(localStorage.getItem('userDetails')).EmployeeId)

        setSelectedAssetData(selectedList)
    }

    const removeSelected = () => {
        
    }

    const SubmitHandler = () => {
        //API call here
        // setAddNewAsset({...addNewAsset, CategoryId: categoryId, IsIdentifiable: isIdentifiable})

        console.log(selectedAssetData)
        const assetId = selectedAssetData[0].AssetId
        const categoryId = selectedAssetData[0].CategoryId
        const isIdentifiable = selectedAssetData[0].IsIdentifiable
        const employeeId = JSON.parse(localStorage.getItem('userDetails')).EmployeeId


        if (window.confirm('Are you sure you wish to "Warn" about this item?')) {


            if (assetId !== "" && employeeId !== "" && isIdentifiable !== "") {
                console.log("assetId: " + assetId + ", employeeId: " + employeeId + ", isIdentifiable: " + isIdentifiable)
                console.log("/assets/requestUserAsset")
                Api({
                    method: 'post',
                    url: '/assets/requestUserAsset',
                    data: {
                        AssetId: assetId,
                        EmployeeId: employeeId,
                        IsIdentifiable: isIdentifiable,
                        CategoryId: categoryId
                    }
                }).then(response => {
                    if (response.data.success == 1) {
                        alert("Success");
                        getAssetData()
                      

                    } else {
                        alert("Error")

                    }
                    console.log(response.data);
                }).catch(function (error) {
                    console.log(error);
                    alert("Something went wrong");
                    alert(error);
                });

            }

        }
    };



    useEffect(() => {
        getGlobalActivityHistory()
        getAssetData()

    }, []);


    return (
        // <>

        //     <AvailableTable />


        // </>

        <>
            <div className="AvailableBody">
                <ul className="availableBodyLeftSide ml-0 pl-0">
                    <li>
                        <AvailableTable />
                    </li>
                </ul>


                <ul className="availableBodyRightSide mb-0">

                    {/* <h5 className="availableData"> {globalActivityData} </h5> */}
                    <div className="availableData">
                        {globalActivityData.map(x => <div key={x.AssetName}>{x.AssetName} last Refilled on {x.ActivityTime}<br></br><br></br></div>)}
                    </div>
                    {/* console.log(JSON.stringify(response.data.data[0].AssetName)) */}
                    <div className=" mt-3">
                        Request for Global Assets
                    </div>

                    <Multiselect
                        isObject={true}
                        singleSelect={true}
                        options={assetData}
                        displayValue="AssetName"
                        // selectedValues={[`${categoryList[0].toString()}`]}
                        onRemove={function noRefCheck() { }}
                        onSelect={selectedAssetId}
                        ref={removeSelected}
                    />


                    {/* <button className="availableButton" onClick={createNewUser}> */}

                    <button className="availableButton" onClick={SubmitHandler}>
                        Submit Warning
                    </button>



                </ul>
            </div>




        </>
    );
}

export default AvailableAssets;
