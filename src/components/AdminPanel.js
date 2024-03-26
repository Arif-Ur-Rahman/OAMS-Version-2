import React, { useState, useEffect } from "react";
import Api from "../API";
import AddNewAsset from "./AddNewAsset";
import AddNewCategory from "./AddNewCategory";
import CreateNewUser from "./CreateNewUser";
import HistoryTable from "./HistoryTable";

const AdminPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addModalCategoryOpen, setAddModalCategoryOpen] = useState(false);

  const [emplyoeeCount, setEmplyoeeCount] = useState(0)
  const [assetCount, setAssetCount] = useState(0)
  const [categoryCount, setCategoryCount] = useState(0)

  const ModalStatus = (status) => {
    if (status) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
    setIsModalOpen(false);
  };

  const createNewUser = () => {
    console.log("Create Clicked");
    console.log(isModalOpen);
    setIsModalOpen(true);
    console.log(isModalOpen);
  };
  const closeNewUserModal = () => {
    setIsModalOpen(false);
  };


  const addNewAsset = () => {
    console.log("Add new Clicked");
    console.log(addModalOpen);
    setAddModalOpen(true);
    console.log(isModalOpen);
  }
  const closeAddNewAsset = () => {
    setAddModalOpen(false);
  }


  const addNewCategory = () => {
    console.log("Add new Clicked");
    console.log(addModalOpen);
    setAddModalCategoryOpen(true);
    console.log(isModalOpen);
  }
  const closeAddNewCategory = () => {
    setAddModalCategoryOpen(false);
  }


  const fetchData = () => {

    console.log("/admin/totalCount")

    Api({
      method: 'post',
      url: '/admin/totalCount',
      data: {
        // EmployeeId: "4"
        // EmployeeId: JSON.parse(localStorage.getItem('userDetails')).EmployeeId
      }
    }).then(response => {
      if (response.data.success === 1) {
        // setTableData([])
        // setTableData(response.data.data)
        setEmplyoeeCount(response.data.data.EmployeeCount)
        setAssetCount(response.data.data.AssetCount)
        setCategoryCount(response.data.data.CategoryCount)
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

  useEffect(() => {

    fetchData();

  }, []);


  return (
    <>
      <div className="AdminOptions">
        <ul className="adminOptionLeftSide ml-0 pl-0">
          <li>
            <HistoryTable />
          </li>
        </ul>


        <ul className="adminOptionRightSide mb-0">

          <li>
            <h5 className="adminData">Total Emplyoee: {emplyoeeCount} </h5>
          </li>

          <li>
            <h5 className="adminData"> Total Asset: {assetCount}</h5>
          </li>
          <li></li>
          <li>
            <h5 className="adminData"> Total Category: {categoryCount}</h5>
          </li>


          <li>
            <CreateNewUser show={isModalOpen} onHide={closeNewUserModal} />
            <button className="adminButton" onClick={createNewUser}>
              Create new user
            </button>
          </li>
          <li>
            <AddNewAsset show={addModalOpen} onHide={closeAddNewAsset} />
            <button className="adminButton" onClick={addNewAsset}>
              Add new asset
            </button>
          </li>
          <li>
            <AddNewCategory show={addModalCategoryOpen} onHide={closeAddNewCategory} />
            <button className="adminButton" onClick={addNewCategory}>
              Add new category
            </button>
          </li>
        </ul>
      </div>




    </>
  );
};

export default AdminPanel;
