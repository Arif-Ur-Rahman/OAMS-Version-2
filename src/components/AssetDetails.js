import { Height } from '@material-ui/icons';
import MaterialTable from 'material-table'
import { useState, useEffect } from 'react';
import Api from '../API';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import { CsvBuilder } from 'filefy';
import { useTranslation } from 'react-i18next';

function AssetDetails() {
    const [t, i18n] = useTranslation('common');
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
    const [selectedRows, setSelectedRows] = useState([])

    const [tableData, setTableData] = useState([
        // { CategoryId: "1", AssetId: "1", AssetName: "Asus VivoBook 15", EmployeeId: "1", EmployeeName: "siam" },
        // {
        //     AssetId: "1",
        //     CategoryId: "1",
        //     AssetName: "Asus VivoBook 15",
        //     EmployeeId: "1",
        //     UsageStart: "2021-10-07T01:24:28.000Z",
        //     UsageEnd: null,
        //     IsOkay: "1",
        //     Comments: "",
        //     AssetDetails: "OS-windows S/n: M8N0CV12M541335\t\t\t\t\tCG609197Z",
        //     IsAvailable: "0",
        //     IsChecked: "0",
        //     UsedQuantity: "0",
        //     Request: "2"
        // },
        // { CategoryId: "3", AssetId: "2", AssetName: "Bashundhara Tissue", EmployeeId: "1", EmployeeName: "siam" },
        // { CategoryId: "8", AssetId: "4", AssetName: "PBS notebook", EmployeeId: "5", EmployeeName: "maruf" },
        // { CategoryId: "4", AssetId: "5", AssetName: "Ispahani Tea", EmployeeId: "8", EmployeeName: "allUser" },
        // { CategoryId: "1", AssetId: "6", AssetName: "Asus VivoBook 15", EmployeeId: "4", EmployeeName: "anas" },

    ])

    const columns = [
        {
            title: t('AssetDetails.1'), field: "IsOkay", emptyValue: () => <em>null</em>, defaultSort: "asc", filtering: true, lookup: { 1: "Ok", 0: "Defected" },
            headerStyle: { pointerEvents: "none", textAlign: "left", paddingLeft: "15px", }
        },
        {
            title: t('AssetDetails.2'), field: "AssetId", emptyValue: () => <em>null</em>, filtering: false, editable: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", }
        },
        {
            title: t('AssetDetails.3'), field: "CategoryId", emptyValue: () => <em>null</em>, defaultSort: "asc", filtering: false, editable: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", },
        },
        {
            title: t('AssetDetails.4'), field: "AssetName", emptyValue: () => <em>null</em>, filtering: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", },
        },
        {
            title: t('AssetDetails.5'), field: "EmployeeId", emptyValue: () => <em>null</em>, filtering: false, editable: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", }
        },
        {
            title: t('AssetDetails.6'), field: "EmployeeName", emptyValue: () => <em>null</em>, filtering: true, editable: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", }
        },
        {
            title: t('AssetDetails.7'), field: "AssetDetails", emptyValue: () => <em>null</em>, filtering: true,
            headerStyle: { textAlign: "left", paddingLeft: "15px", }
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
            title: t('AssetDetails.13'), field: "UsageStart", emptyValue: () => <em>null</em>, filtering: true, editable: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", }
        },
        {
            title: t('AssetDetails.14'), field: "UsageEnd", emptyValue: () => <em>null</em>, filtering: true, editable: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", }
        },
        {
            title: t('AssetDetails.15'), field: "IsAvailable", emptyValue: () => <em>null</em>, filtering: true, editable: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", }
        },
        {
            title: t('AssetDetails.16'), field: "UsedQuantity", emptyValue: () => <em>null</em>, filtering: true, editable: false,
            headerStyle: { textAlign: "left", paddingLeft: "15px", }
        },
        {
            title: t('AssetDetails.17'), field: "Comments", emptyValue: () => <em>null</em>, filtering: true,
            headerStyle: { textAlign: "left", paddingLeft: "15px", }
        }
    ]


    // custom export data in CSV
    const customRowExport = () => {

        new CsvBuilder("All Assetes Information.csv")
            .setColumns(columns.map(col => col.title))
            .addRows(selectedRows.map(rowData => columns.map(col => rowData[col.field])))
            .exportFile();

    }

    const editTableData = (rowDetails) => {
        console.log(rowDetails)
        const assetId = rowDetails.AssetId

        const assetName = rowDetails.AssetName
        const assetDetails = rowDetails.AssetDetails
        const comments = rowDetails.Comments
        const isOkay = rowDetails.IsOkay

        const serialNumber = rowDetails.SerialNumber
        const cpu = rowDetails.Cpu
        const ram = rowDetails.Ram
        const hdd = rowDetails.Hdd
        const ssd = rowDetails.Ssd

        // console.log(assetName + " " + assetDetails + " " + comments + " " + isOkay + " ")

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
                SerialNumber: serialNumber,
                Cpu: cpu,
                Ram: ram,
                Hdd: hdd,
                Ssd: ssd,

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

    const deleteTableData = (rowDetails) => {
        console.log(rowDetails)
        const assetId = JSON.stringify(rowDetails.AssetId)
        console.log("AssetId: " + assetId)
        console.log("/admin/deleteIndividualAsset")
        Api({
            method: 'post',
            url: '/admin/deleteIndividualAsset',
            data: {
                AssetId: assetId
            }
        }).then(response => {
            if (response.data.success == 1) {
                alert("Deleted Successfully")
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

    const fetchTableData = () => {
        console.log("/admin/showAllAssets");
        console.log("EmployeeId: " + JSON.parse(localStorage.getItem('userDetails')).EmployeeId);
        Api({
            method: 'post',
            url: '/admin/showAllAssets',
            data: {

            }
        }).then(response => {
            if (response.data.success == 1) {
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


    useEffect(() => {
        //setId(APIIDData());

        fetchTableData()


    }, []);


    return (
        <div className="Table">
            {/* <h1 align="center">React-app</h1>
      <h2 align="center">Material-table</h2> */}

            <MaterialTable columns={columns} data={tableData} title="Assets Information"
                editable={
                    {
                        ...isAdmin === "2" ? {
                            // onRowAdd: (newRow) => new Promise((reslove, reject) => {
                            //     if (newRow.name != null && newRow.phone != null) {
                            //         setTableData([...tableData, newRow])
                            //         reslove()
                            //     } else {
                            //         console.log("Field required")
                            //         reject()
                            //     }
                            // }),
                            onRowUpdate: (newRow, oldRow) => new Promise((reslove, reject) => {
                                // const updatedData = [...tableData]
                                // updatedData[oldRow.tableData.id] = newRow
                                // setTableData(updatedData)
                                editTableData(newRow)
                                reslove()
                            }),
                            onRowDelete: (selectedRow) => new Promise((reslove, reject) => {
                                // const updatedData = [...tableData]
                                // updatedData.splice(selectedRow.tableData.id, 1)
                                // setTableData(updatedData)
                                deleteTableData(selectedRow)
                                reslove()
                            })
                        } : {
                            ...isAdmin === "1" ? {
                                // onRowAdd: (newRow) => new Promise((reslove, reject) => {
                                //     if (newRow.name != null && newRow.phone != null) {
                                //         setTableData([...tableData, newRow])
                                //         reslove()
                                //     } else {
                                //         console.log("Field required")
                                //         reject()
                                //     }
                                // }),
                                onRowUpdate: (newRow, oldRow) => new Promise((reslove, reject) => {
                                    const updatedData = [...tableData]
                                    updatedData[oldRow.tableData.id] = newRow
                                    setTableData(updatedData)
                                    reslove()
                                })
                            } : null
                        }
                    }
                }

                onSelectionChange={(rows) => {
                    console.log(rows);
                    setSelectedRows(rows);
                }}

                actions={[

                    {
                        icon: 'download',
                        tooltip: "export data",
                        onClick: (e, data) => {
                            console.log(data);
                            customRowExport()
                        },
                    }
                ]}

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
                        //backgroundColor: "#ADEFD1FF",
                        //backgroundColor: "#039be5",
                    },
                    maxBodyHeight: "70vh",
                    tableLayout: "auto",
                }}

                localization={{
                    header: {
                        actions: t('ActionTitle.1')
                    }
                }}
            />
        </div>
    );
}

export default AssetDetails;
