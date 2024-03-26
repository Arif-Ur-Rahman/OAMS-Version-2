import MaterialTable from 'material-table';
import { useState, useEffect } from 'react';
import Api from '../API';
import { CsvBuilder } from 'filefy';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import { Replay } from '@material-ui/icons';
import MyAssetsMonthlyCheck from './MyAssetsMonthlyCheck';
import { useTranslation } from 'react-i18next';

function MyAssets() {
  const [t, i18n] = useTranslation('common');

  const [monthlyChecked, setMonthlyChecked] = useState(true)
  const [monthlyCheckModalOpen, setMonthlyCheckModalOpen] = useState(false)

  const [tableData, setTableData] = useState([
    // { AssetId: "Maruf", AssetName: "asd@gmail.com", EmployeeId: "012345", UsageStart: "Male", IsOkay: "Dhaka", AssetDetails: "Asset details" },
    // { name: "Hasan", email: "qwe@gmail.com", phone: "345", age: 15, gender: "Female", city: "CTG", cost: 1234 },
    // { name: "Shakil", email: "zxc@gmail.com", phone: "012", age: 55, gender: "Male", city: "Sylhet", cost: 1234 },
    // { name: "MHS", email: "mhs@gmail.com", phone: "123", age: null, gender: "Male", city: "Raj", cost: 1234 },
    // { name: "Maruf", email: "asd@gmail.com", phone: "012345", age: 25, gender: "Male", city: "Dhaka", cost: 1234 },
    // { name: "Hasan", email: "qwe@gmail.com", phone: "345", age: 15, gender: "Female", city: "CTG", cost: 1234 },
    // { name: "Shakil", email: "zxc@gmail.com", phone: "012", age: 55, gender: "Male", city: "Sylhet", cost: 1234 },
    // { name: "MHS", email: "mhs@gmail.com", phone: "123", age: null, gender: "Male", city: "Raj", cost: 1234 },
  ])
  // "Asset Id"

  const columns = [
    // { title: "Employee Id", field: "EmployeeId", emptyValue: () => <em>null</em>, filtering: false },
    {
      title: t('MyAssets.1'), field: "AssetId", emptyValue: () => <em>null</em>, defaultSort: "asc", filtering: false, editable: false,
      headerStyle: { pointerEvents: "none", textAlign: "left", },
    },
    {
      title: t('MyAssets.2'), field: "AssetName", emptyValue: () => <em>null</em>, filtering: false, editable: false,
      headerStyle: { textAlign: "left", paddingLeft: "15px", },
    },
    {
      title: t('MyAssets.3'), field: "AssetDetails", emptyValue: () => <em>null</em>, filtering: false, editable: false,
      headerStyle: { textAlign: "left", paddingLeft: "15px", },
    },
    {
      title: t('AssetDetails.8'), field: "SerialNumber", emptyValue: () => <em>null</em>, filtering: false, 
      headerStyle: { textAlign: "left", paddingLeft: "15px", }, cellStyle: { width: "5%", textAlign: "left", }
    },
    {
      title: t('AssetDetails.9'), field: "Ram", emptyValue: () => <em>null</em>, filtering: false,
      headerStyle: { textAlign: "left", paddingLeft: "15px", }, cellStyle: { width: "5%", textAlign: "left", }
    },
    {
      title: t('AssetDetails.10'), field: "Cpu", emptyValue: () => <em>null</em>, filtering: false,
      headerStyle: { textAlign: "left", paddingLeft: "15px", }, cellStyle: { width: "5%", textAlign: "left", }
    },
    {
      title: t('AssetDetails.11'), field: "Hdd", emptyValue: () => <em>null</em>, filtering: false,
      headerStyle: { textAlign: "left", paddingLeft: "15px", }, cellStyle: { width: "5%", textAlign: "left", }
    },
    {
      title: t('AssetDetails.12'), field: "Ssd", emptyValue: () => <em>null</em>, filtering: false,
      headerStyle: { textAlign: "left", paddingLeft: "15px", }, cellStyle: { width: "5%", textAlign: "left", }
    },
    {
      title: t('MyAssets.4'), field: "UsageStart", emptyValue: () => <em>null</em>, filtering: false, editable: false,
      headerStyle: { textAlign: "left", paddingLeft: "15px", },
    },

    {
      title: t('MyAssets.5'), field: "UsedQuantity", emptyValue: () => <em>null</em>, filtering: false, editable: false,
      headerStyle: { textAlign: "left", paddingLeft: "15px", },
    },
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
    const emplyoeeId = JSON.parse(localStorage.getItem('userDetails')).EmployeeId;

    console.log(assetName + " " + assetDetails + " " + comments + " " + isOkay + " ")

    console.log("AssetId: " + assetId)
    console.log("/admin/editIndividualAsset")
    Api({
      method: 'post',
      url: '/admin/editIndividualAsset',
      data: {
        AssetId: assetId,
        AssetName: assetName,
        AssetDetails: assetDetails,
        Comments: comments,
        IsOkay: isOkay,
        EmployeeId: emplyoeeId,

      }
    }).then(response => {
      if (response.data.success == 1) {
        alert("Edited Successfully")
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

  // custom export data in CSV
  const customRowExport = () => {

    new CsvBuilder("My Assetes Information.csv")
      .setColumns(columns.map(col => col.title))
      .addRows(selectedRows.map(rowData => columns.map(col => rowData[col.field])))
      .exportFile();

  }


  // adding asset to my account
  const returnFromMyslef = (data) => {

    const assetId = data.AssetId;
    const identifiable = data.IsIdentifiable;
    const emplyoeeId = JSON.parse(localStorage.getItem('userDetails')).EmployeeId;

    console.log("AssetId: " + assetId + ", EmplyoeeId: " + emplyoeeId + ", identifiable: " + identifiable);

    Api({
      method: 'post',
      url: '/assets/returnUserAsset',
      data: {
        AssetId: assetId,
        EmployeeId: emplyoeeId,
        IsIdentifiable: identifiable
      }
    }).then(response => {
      if (response.data.success == 1) {
        // setTableData(response.data.data)
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


    //load the following data after the response
    // console.log("fetching table data");
    // fetchTableData();

  }

  // fetch table Data
  const fetchTableData = () => {
    // resetUsedAsset()  //called from monthly check

    console.log("/assets/userIndividualAssets")
    Api({
      method: 'post',
      url: '/assets/userIndividualAssets',
      data: {
        // EmployeeId: "4"
        EmployeeId: JSON.parse(localStorage.getItem('userDetails')).EmployeeId
      }
    }).then(response => {
      if (response.data.success === 1) {
        setTableData([])
        setTableData(response.data.data)
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


  //Monthly check code are following
  const showMonthlyCheckTable = () => {
    setMonthlyCheckModalOpen(true);
  }
  const closeMonthlyCheckTable = () => {
    setMonthlyCheckModalOpen(false);
    fetchTableData()
  }

  const notifyMonthlyCheck = () => {
    console.log("/health/notifyMonthlyCheck")
    Api({
      method: 'post',
      url: '/health/notifyMonthlyCheck',
      data: {
        EmployeeId: JSON.parse(localStorage.getItem('userDetails')).EmployeeId,
      }
    }).then(response => {
      if (response.data.success == 1) {
        // setTableData(response.data.data)
        setMonthlyChecked(false) // showing the button
        // setMonthlyCheckModalOpen(true) // showing the Monthly check Modal Form
        showMonthlyCheckTable() // showing the Monthly check Modal Form
      } else {
        // alert("Something went wrong");
        setMonthlyChecked(true)  // hiding the button
        // setMonthlyCheckModalOpen(false) // hiding the Monthly check Modal Form
        closeMonthlyCheckTable() // hiding the Monthly check Modal Form
      }

      console.log(response.data);
    }).catch(function (error) {
      console.log(error);
      // alert("Something went wrong");
      alert(error);
    });


    console.log("monthlyCheck: " + monthlyChecked)

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

    console.log("/assets/userIndividualAssets");
    console.log("EmployeeId: " + JSON.parse(localStorage.getItem('userDetails')).EmployeeId);
    notifyMonthlyCheck();
    fetchTableData();


  }, []);





  return (
    <div className="Table">
      {/* <h1 align="center">React-app</h1>
      <h2 align="center">Material-table</h2> */}

      <MaterialTable columns={columns} data={tableData} title="My Assets Information"
        editable={{
          // onRowAdd: (newRow) => new Promise((reslove, reject) => {
          //   if (newRow.name != null && newRow.phone != null) {
          //     setTableData([...tableData, newRow])
          //     reslove()
          //   } else {
          //     console.log("Field required")
          //     reject()
          //   }
          // }),
          // {isAdmin === "true" ? : null}
          // onRowUpdate: (newRow, oldRow) => new Promise((reslove, reject) => {
          //   const updatedData = [...tableData]
          //   updatedData[oldRow.tableData.id] = newRow
          //   setTableData(updatedData)
          //   reslove()
          // }),
          // onRowDelete: (selectedRow) => new Promise((reslove, reject) => {
          //   const updatedData = [...tableData]
          //   updatedData.splice(selectedRow.tableData.id, 1)
          //   setTableData(updatedData)
          //   reslove()
          // })
          onRowUpdate: (newRow, oldRow) => new Promise((reslove, reject) => {
            // const updatedData = [...tableData]
            // updatedData[oldRow.tableData.id] = newRow
            // setTableData(updatedData)
            editTableData(newRow)
            reslove()
          }),
        }}

        onSelectionChange={(rows) => {
          console.log(rows);
          setSelectedRows(rows);
        }}


        actions={[
          {
            icon: () => <Replay />,
            tooltip: "Return",
            onClick: (e, data) => {
              if (window.confirm('Are you sure you wish to "Return" this item?')) {
                console.log("confirmed")
                returnFromMyslef(data);
                console.log(data);
              }
            },
            position: "row",
            selection: "toolbarOnSelect"
          },
          {
            icon: 'download',
            tooltip: "export data",
            onClick: (e, data) => {
              console.log(data);
              customRowExport()
            },
          },
          // {
          //   icon: () => <button className="monthlyCheck">Monthly Check</button>,
          //   tooltip: "Monthly check",
          //   // hidden: false,
          //   hidden: monthlyChecked,
          //   onClick: (e, data) => {
          //     if (window.confirm(`This confirms your asset's health information`)) {
          //       console.log(data);
          //       // customRowExport()
          //     }
          //   },
          //   position: "toolbar"
          // }

        ]}


        // actions={

        //   {
        //     ...monthlyChecked == 0 ? [
        //       {
        //         icon: () => <Replay />,
        //         tooltip: "Return",
        //         onClick: (e, data) => {
        //           returnFromMyslef(data);
        //           console.log(data);
        //         },
        //         position: "row",
        //         selection: "toolbarOnSelect"
        //       },
        //       {
        //         icon: 'download',
        //         tooltip: "export data",
        //         onClick: (e, data) => {
        //           console.log(data);
        //           customRowExport()
        //         },
        //       },
        //       {
        //         icon: ()=><button display="none">Monthly Check</button>,
        //         tooltip: "Monthly check",
        //         disabled: true,
        //         onClick: (e, data) => {
        //           console.log(data);
        //           // customRowExport()
        //           monthlyCheck();
        //         },
        //         position: "toolbar"
        //       }
        //     ] : [
        //       {
        //         icon: () => <Replay />,
        //         tooltip: "Return",
        //         onClick: (e, data) => {
        //           returnFromMyslef(data);
        //           console.log(data);
        //         },
        //         position: "row",
        //         selection: "toolbarOnSelect"
        //       },
        //       {
        //         icon: 'download',
        //         tooltip: "export data",
        //         onClick: (e, data) => {
        //           console.log(data);
        //           customRowExport()
        //         },
        //       },
        //       {
        //         icon: ()=><button display="none">Monthly Check</button>,
        //         tooltip: "Monthly check",
        //         disabled: false,
        //         onClick: (e, data) => {
        //           console.log(data);
        //           // customRowExport()
        //           monthlyCheck();
        //         },
        //         position: "toolbar"
        //       }
        //     ]
        //   }}

        // {
        //   icon: () => <Replay />,
        //   tooltip: "Return",
        //   onClick: (e, data) => {
        //     returnFromMyslef(data);
        //     console.log(data);
        //   },
        //   position: "row",
        //   selection: "toolbarOnSelect"
        // },
        // {
        //   icon: 'download',
        //   tooltip: "export data",
        //   onClick: (e, data) => {
        //     console.log(data);
        //     customRowExport()
        //   },
        // },
        // {
        //   icon: ()=><button display="none">Monthly Check</button>,
        //   tooltip: "Monthly check",
        //   onClick: (e, data) => {
        //     console.log(data);
        //     // customRowExport()
        //     monthlyCheck();
        //   },
        //   position: "toolbar"
        // }

        options={{
          sorting: true, search: true, searchFieldAlignment: "right", searchAutoFocus: false, searchFieldVariant: "standard",
          filtering: false, emptyRowsWhenPaging: false,
          paging: true, pageSizeOptions: [10, 20, 50, 100], pageSize: 10, paginationType: "stepped", paginationPosition: "top",
          showFirstLastPageButtons: true,
          exportButton: true, exportAllData: true,
          addRowPosition: "first", actionsColumnIndex: -1,
          selection: true, showSelectAllCheckbox: true, selectionProps: rowData => ({
            color: "primary"
          }),
          grouping: false,
          columnsButton: true,
          rowStyle: (data, index) => data.IsOkay == 0 ? { background: "#FDD2BF", wordWrap: 'break-word', } : index % 2 === 0 ? { background: null, wordWrap: 'break-word', } : { background: "#EEFEFF", wordWrap: 'break-word', },
          headerStyle: {
            position: "sticky",
            top: "0",
            fontSize: "1.1rem",
            fontWeight: "500",
            width: "0rem",
            paddingLeft: "0px",
            paddingRight: "0px",
            backgroundColor: "#ADEFD1FF",
            //backgroundColor: "#039be5",
          },
          maxBodyHeight: "70vh",
          tableLayout: "fixed",
          // rowStyle: {
          //   wordWrap: 'break-word',
          // },
          // cellStyle: {
          //   width: 20,
          //   maxWidth: 20
          // }
          // editCellStyle: {
          //   maxWidth: 5,
          //   wordBreak: "break-word",
          //   whiteSpace: 'normal',
          //   wordWrap: 'break-word'
          // }
        }}

        localization={{
          header: {
            actions: t('ActionTitle.1')
          }
        }}

      />

      <MyAssetsMonthlyCheck show={monthlyCheckModalOpen} onHide={closeMonthlyCheckTable} />

    </div>
  );
}

export default MyAssets;
