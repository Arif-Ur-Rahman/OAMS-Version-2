import MaterialTable from 'material-table'
import { useState, useEffect } from 'react';
import Api from '../API';
import { CsvBuilder } from 'filefy';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import { Modal, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import { Replay } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

function MyAssetsMonthlyCheck({ show, onHide }) {
  const [t, i18n] = useTranslation('common');
  const [isModalOpen, setIsModalOpen] = useState(true)

  const [tableData, setTableData] = useState([
    { AssetId: "Maruf", AssetName: "asd@gmail.com", EmployeeId: "012345", UsageStart: "Male", IsOkay: "Dhaka", AssetDetails: "Asset details" },
    // { name: "Hasan", email: "qwe@gmail.com", phone: "345", age: 15, gender: "Female", city: "CTG", cost: 1234 },
    // { name: "Shakil", email: "zxc@gmail.com", phone: "012", age: 55, gender: "Male", city: "Sylhet", cost: 1234 },
    // { name: "MHS", email: "mhs@gmail.com", phone: "123", age: null, gender: "Male", city: "Raj", cost: 1234 },
    // { name: "Maruf", email: "asd@gmail.com", phone: "012345", age: 25, gender: "Male", city: "Dhaka", cost: 1234 },
    // { name: "Hasan", email: "qwe@gmail.com", phone: "345", age: 15, gender: "Female", city: "CTG", cost: 1234 },
    // { name: "Shakil", email: "zxc@gmail.com", phone: "012", age: 55, gender: "Male", city: "Sylhet", cost: 1234 },
    // { name: "MHS", email: "mhs@gmail.com", phone: "123", age: null, gender: "Male", city: "Raj", cost: 1234 },
  ])

  const columns = [
    // { title: "Employee Id", field: "EmployeeId", emptyValue: () => <em>null</em>, filtering: false },
    {
      title: t('MyAssets.1'), field: "AssetId", emptyValue: () => <em>null</em>, defaultSort: "asc", filtering: false, editable: false,
      headerStyle: { textAlign: "left", paddingLeft: "15px", },
    },
    {
      title: t('MyAssets.2'), field: "AssetName", emptyValue: () => <em>null</em>, filtering: false, editable: false,
      headerStyle: { textAlign: "left", paddingLeft: "15px", },
    },
    {
      title: t('MyAssets.3'), field: "AssetDetails", emptyValue: () => <em>null</em>, filtering: false, editable: false,
      headerStyle: { textAlign: "left", paddingLeft: "15px", },
    },
    // {
    //   title: "Usage Start", field: "UsageStart", emptyValue: () => <em>null</em>, filtering: false, editable: false,
    //   headerStyle: { textAlign: "left", paddingLeft: "15px", },
    // },

    // {
    //   title: "Used Quantity", field: "UsedQuantity", emptyValue: () => <em>null</em>, filtering: false, editable: false,
    //   headerStyle: { textAlign: "left", paddingLeft: "15px", },
    // },
    {
      title: t('MyAssets.6'), field: "IsOkay", emptyValue: () => <em>null</em>, filtering: false, lookup: { 0: "Defect", 1: "OK" },
      headerStyle: { textAlign: "left", paddingLeft: "15px", },
    },
    {
      title: t('MyAssets.7'), field: "Comments", emptyValue: () => <em>null</em>, filtering: false,
      headerStyle: { textAlign: "left", paddingLeft: "15px", },
    },
    // { title: "AssetDetails", field: "AssetDetails", emptyValue: () => <em>null</em>, type: "currency", currencySetting: { currencyCode: "BDT", minimumFractionDigit: 2 }, filtering: false },
  ]

  const [selectedRows, setSelectedRows] = useState([]);


  const editTableData = (rowDetails) => {
    console.log(rowDetails)
    const assetId = rowDetails.AssetId

    const assetName = rowDetails.AssetName
    const assetDetails = rowDetails.AssetDetails
    const comments = rowDetails.Comments
    const isOkay = rowDetails.IsOkay

    console.log("assetName: "+ assetName + ", assetDetails: " + assetDetails + ", comments: " + comments + ", isOkay: " + isOkay)

    console.log("AssetId: " + assetId)
    console.log("/health/assetHealthInfo")
    if (isOkay != null) {
      Api({
        method: 'post',
        url: '/health/assetHealthInfo',
        data: {
          AssetId: assetId,
          Comments: comments,
          IsOkay: isOkay,
          MonthlyAssetCheck: 1
        }
      }).then(response => {
        if (response.data.success == 1) {
          alert("Edited Successfully")
          fetchTableData()
        }

      }).catch(function (error) {
        console.log(error);
        // alert("Something went wrong");
        alert(error);
      });
    } else {
      alert("'Status' is required to submit.")
    }

  }

  // fetch table Data
  const fetchTableData = () => {
    resetUsedAsset()

    console.log("/health/notifyMonthlyCheck")
    Api({
      method: 'post',
      url: '/health/notifyMonthlyCheck',
      data: {
        // EmployeeId: "4"
        EmployeeId: JSON.parse(localStorage.getItem('userDetails')).EmployeeId
      }
    }).then(response => {
      if (response.data.success === 1) {
        if ((response.data.data).length > 0) {

          setTableData([])
          setTableData(response.data.data)
        } 
      } else {
        console.log("monthlyCheckHide")

        onHide()
      }

      console.log(response.data);
    }).catch(function (error) {
      console.log(error);
      // alert("Something went wrong");
      alert(error);
    });
  }

  const monthlyCheck = () => {
    console.log("/users/userAssetHealthConfirmation")
    Api({
      method: 'post',
      url: '/users/userAssetHealthConfirmation',
      data: {
        EmployeeId: JSON.parse(localStorage.getItem('userDetails')).EmployeeId,
      }
    }).then(response => {
      if (response.data.success == 1) {
        // setTableData(response.data.data)
        alert("Monthly survey complete");
        fetchTableData()
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


  const notifyMonthlyCheck = () => {

    fetchTableData()

    // console.log("monthlyCheckShow")
    // console.log("/users/notifyMonthlyCheck")
    // Api({
    //   method: 'post',
    //   url: '/users/notifyMonthlyCheck',
    //   data: {
    //     EmployeeId: JSON.parse(localStorage.getItem('userDetails')).EmployeeId,
    //   }
    // }).then(response => {
    //   if (response.data.success == 1) {
    //     if ((response.data.data).length > 0) {

    //       setTableData([])
    //       setTableData(response.data.data)
    //     }
    //     else {
    //       console.log("monthlyCheckShow")

    //       onHide()
    //     }
    //   } else {
    //     // alert("Something went wrong");
    //   }

    //   console.log(response.data);
    // }).catch(function (error) {
    //   console.log(error);
    //   // alert("Something went wrong");
    //   alert(error);
    // });

  }



  const resetUsedAsset = () => {

    console.log("/activity/resetUsedAsset")
    console.log(JSON.parse(localStorage.getItem('userDetails')).EmployeeId)

    Api({
      method: 'post',
      url: '/activity/resetUsedAsset',
      data: {
        EmployeeId: JSON.parse(localStorage.getItem('userDetails')).EmployeeId,
      }
    }).then(response => {
      if (response.data.success == 1) {

      } else {

      }
      console.log(response.data);
    }).catch(function (error) {
      console.log(error);
      // alert("Something went wrong");
    });
  }


  useEffect(() => {
    //setId(APIIDData());

    setTableData([])
    console.log("/assets/userIndividualAssets");
    console.log("EmployeeId: " + JSON.parse(localStorage.getItem('userDetails')).EmployeeId);
    notifyMonthlyCheck();
    // fetchTableData();


  }, [show]);


  return (

    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    // style={{position: "absolute", margin: "auto"}}

    >




      <Modal.Body
        style={{ background: "#C6D3F3", width: "1000px" }}
      >

        <MaterialTable columns={columns} data={tableData} title="Please modify the status of all your assets" textAlign="center"
          editable={{
            onRowUpdate: (newRow, oldRow) => new Promise((reslove, reject) => {
              // const updatedData = [...tableData]
              // updatedData[oldRow.tableData.id] = newRow
              // setTableData(updatedData)
              if (window.confirm('Are you confirm about the "Asset\'s Status"  this item?')) {

                editTableData(newRow)
                reslove()
              }
              else reject()
            }),
          }}

          onSelectionChange={(rows) => {
            console.log(rows);
            setSelectedRows(rows);
          }}


          options={{
            sorting: false, search: false, searchFieldAlignment: "right", searchAutoFocus: false, searchFieldVariant: "standard",
            filtering: false, emptyRowsWhenPaging: false,
            paging: false, pageSizeOptions: [10, 20, 50, 100], pageSize: 10, paginationType: "stepped", paginationPosition: "top",
            showFirstLastPageButtons: true,
            exportButton: false, exportAllData: false,
            addRowPosition: "first", actionsColumnIndex: -1,
            selection: false, showSelectAllCheckbox: true, selectionProps: rowData => ({
              color: "primary"
            }),
            grouping: false,
            columnsButton: false,
            rowStyle: (data, index) => index % 2 == 0 ? { background: null, wordWrap: 'break-word', } : { background: "#EEFEFF", wordWrap: 'break-word', },

            actionsCellStyle: { display: "relative", justifyContent: "center", },
            // actionsCellStyle: {display:"flex", justifyContent: "center", marginBottom:' -1px'},
            maxBodyHeight: "70vh",
          }}

          localization={{
              header: {
                actions: t('ActionTitle.1')
              }
          }}
        />


      </Modal.Body>

      {/* <Modal.Footer style={{ background: "white", width: "1000px" }}>
        <button className="buttonClose" onClick={onHide}>Close</button>
      </Modal.Footer> */}

    </Modal>
  );
}

export default MyAssetsMonthlyCheck;
