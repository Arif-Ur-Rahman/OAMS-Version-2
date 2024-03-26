/**
 * @author [Anas]
 * @email [anas@uxd.co.jp]
 * @create date 2021-10-26 00:12:20
 * @modify date 2021-10-28 07:49:56
 * @desc [description]
 */
const pool = require("../../config/database");

module.exports = {

    // creating new user
    addUser: (data, callBack) => {
        console.log(data);

        pool.query(`select count(EmployeeEmail) email_count from users where EmployeeEmail = ?`, [data.EmployeeEmail],
            (error, results, fields) => {


                if (results[0].email_count == 1) {
                    console.log("if", error);
                    return callBack(null, false);
                }
                else {

                    pool.query(`insert into users(EmployeeName,EmployeePassword, EmployeeEmail, EmployeeFullName,EmployeeBatchId,EmployeeIsAdmin,EmployeeNumber,EmployeeAddress) 
                         VALUES (?,?,?,?,?,?,?,?);`,
                        [data.EmployeeName,
                        data.EmployeePassword,
                        data.EmployeeEmail,
                        data.EmployeeFullName,
                        data.EmployeeBatchId,
                        data.EmployeeIsAdmin,
                        data.EmployeeNumber,
                        data.EmployeeAddress
                        ],

                        (error, results, fields) => {
                            console.log("true");
                            return callBack(null, true);
                        }
                    )
                }
            })
    },

    // show all users 

    showAllUsers: (data, callBack) => {
        pool.query(`select *from users`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                console.log(results);
                return callBack(null, results);


            }
        )
    },

    //Adding asset to asset_details and asset table

    addAsset: (data, callBack) => {
        if (data.IsIdentifiable == 0) {
            console.log("ffjjfjfk");
            let quantity = data.Quantity;
            pool.query(`UPDATE assets SET AssetQuantity = AssetQuantity + ${quantity}  WHERE assets.CategoryId=?`, [data.CategoryId],
                (error, results, fields) => {
                    pool.query(`UPDATE assets SET WarningFlag = (CASE WHEN AssetQuantity > WarningQuantity THEN 0 ELSE 1 END)  WHERE CategoryId=${data.CategoryId}`,
                        (error2, results2, fields) => {

                            pool.query(`select count(CategoryId)count from asset_details WHERE IsAvailable=1 AND asset_details.CategoryId=?;`, [data.CategoryId],
                                (error3, results3, fields) => {
                                    if (results3[0].count == 0) {

                                        pool.query(`INSERT INTO asset_details(AssetName,CategoryId,Comments)values(?,?,?)`, [data.AssetName, data.CategoryId, data.Comments],
                                            (error4, results4, fields) => {

                                            }
                                        )

                                    }
                                    return callBack(null, true);


                                }
                            )
                        }
                    )

                }

            )
        }

        else if (data.IsIdentifiable == 2) {
            console.log("ffjjfjfk");
            let quantity = data.Quantity;
            pool.query(`UPDATE assets SET AssetQuantity = AssetQuantity + ${quantity}  WHERE assets.CategoryId=?`, [data.CategoryId],
                (error, results, fields) => {
                    pool.query(`UPDATE assets SET WarningFlag = (CASE WHEN AssetQuantity > WarningQuantity THEN 0 ELSE 1 END)  WHERE CategoryId=${data.CategoryId}`,
                        (error2, results2, fields) => {

                            pool.query(`select count(CategoryId)count from asset_details WHERE IsAvailable=1 AND asset_details.CategoryId=?;`, [data.CategoryId],
                                (error3, results3, fields) => {
                                    if (results3[0].count == 0) {

                                        pool.query(`INSERT INTO asset_details(EmployeeId,AssetName,CategoryId,Comments)values(?,?,?,?)`, [0, data.AssetName, data.CategoryId, data.Comments],
                                            (error4, results4, fields) => {

                                            }
                                        )

                                    }
                                    return callBack(null, true);


                                }
                            )
                        }
                    )

                }

            )
        }

        else {
            console.log("fffffff", data);

            pool.query(
                "UPDATE assets SET AssetQuantity = AssetQuantity + 1 WHERE assets.CategoryId=?;",
                [data.CategoryId],

                (error, results, fields) => {
                    pool.query(
                        "INSERT INTO asset_details(CategoryId, AssetName, Comments, AssetDetails,Ram,Hdd,Ssd,Cpu,SerialNumber)VALUES (?,?,?,?,?,?,?,?,?);",
                        [data.CategoryId,
                        data.AssetName,
                        data.Comments,
                        data.AssetDetails,
                        data.Ram,
                        data.Hdd,
                        data.Ssd,
                        data.Cpu,
                        data.SerialNumber
                        ],
                        (error2, results2, fields2) => {
                            console.log("111111111");
                            pool.query(`UPDATE assets SET WarningFlag = (CASE WHEN AssetQuantity > WarningQuantity THEN 0 ELSE 1 END)  WHERE CategoryId=${data.CategoryId}`,
                                (error2, results2, fields) => {



                                }
                            )
                            return callBack(null, true);
                        })

                }

            )

        }

    },

    //show all assets in asset_details table

    showAllAssets: (data, callBack) => {
        pool.query(`select * from asset_details;`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);


            }
        )
    },

    // show all IsIndividual=1 assets Request by users to admin
    showAllRequests: (data, callBack) => {
        pool.query(`select * from asset_details WHERE Request= 1 or Request = 2;`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);


            }
        )
    },

    // approve add request for Isdividual=1 by Admin
    approveAddRequest: (data, callBack) => {
        console.log(data.Request);
        console.log(data.AssetId);
        console.log(data.ResponseRequest);
        console.log(data.CategoryId);
        console.log(data.EmployeeId);
        console.log(data);

        pool.query(`SELECT IsIdentifiable FROM assets WHERE CategoryId in (SELECT CategoryId from assets WHERE CategoryId = ?);
        `, [data.CategoryId],
            (error, results, fields) => {
                console.log("hello", results[0].IsIdentifiable);

                if (results[0].IsIdentifiable == 2) {
                    console.log("0");

                    if (data.Request == 1 && data.ResponseRequest == 1) {
                        pool.query(`UPDATE asset_details SET Request = 0,IsAvailable=1,UsedQuantity = UsedQuantity + 1,UsageStart=CURRENT_TIMESTAMP,UsageEnd=NULL,EmployeeId = 0 WHERE asset_details.AssetId=?;`, [data.AssetId],
                            (error, results, fields) => {
                                console.log("2");


                                pool.query(`UPDATE assets SET AssetQuantity = AssetQuantity - 1 , AssetExpired = AssetExpired + 1 WHERE CategoryId=?;`, [data.CategoryId],
                                    (error2, results2, fields) => {
                                        console.log("3");


                                        pool.query(`INSERT INTO activity (AssetId, EmployeeId, AssetName, EmployeeName, ActivityType, ActivityTime ) 
                                        SELECT ${data.AssetId}, t2.EmployeeId EmployeeId, t1.AssetName AssetName, t2.EmployeeName EmployeeName, "1", CURRENT_TIMESTAMP ActivityTime 
                                        FROM asset_details t1 INNER JOIN users t2 ON t1.EmployeeId = t2.EmployeeId where t1.AssetId = ?;`,
                                            [data.AssetId],
                                            (error3, results3, fields3) => {

                                                //Warning quantity checking

                                                pool.query(`UPDATE assets SET WarningFlag = (CASE WHEN AssetQuantity<=WarningQuantity THEN 1 ELSE 0 END) WHERE 
                                                assets.CategoryId=?;`, [data.CategoryId],
                                                    (error4, results4, fields) => {
                                                        pool.query(`SELECT WarningFlag,CategoryName FROM assets where CategoryId = ?;
                                        `, [data.CategoryId],


                                                            (error6, results6, fields) => {
                                                                pool.query(`SELECT EmployeeName from users where EmployeeId =${data.EmployeeId};`,

                                                                    (error7, results7, fields) => {

                                                                        if (results6[0].WarningFlag == 1) {
                                                                            //console.log("testing values", data.EmployeeId, results7[0].EmployeeName, data.AssetId, results6[0].CategoryName);
                                                                            pool.query(
                                                                                `INSERT INTO notification (NotificationType,NotificationTime,EmployeeId,EmployeeName,AssetId,Name) values 
                                                                (0,CURRENT_TIMESTAMP,${data.EmployeeId},"${results7[0].EmployeeName}",${data.AssetId},"${results6[0].CategoryName}");`,
                                                                                (error8, results8, fields) => {

                                                                                    if (error8) {
                                                                                        console.log("error8");
                                                                                        return callBack(error8)
                                                                                    }

                                                                                    else {
                                                                                        return callBack(null, results);

                                                                                    }


                                                                                }
                                                                            )
                                                                        }
                                                                        else {
                                                                            return callBack(null, results);


                                                                        }
                                                                    })

                                                            }
                                                        )


                                                    }
                                                )


                                            }
                                        )
                                    }
                                )

                            }
                        )
                    }
                }


                else {
                    console.log("else else");

                    if (data.Request == 1 && data.ResponseRequest == 1) {
                        pool.query(`UPDATE asset_details SET Request = 0,IsAvailable=0,UsedQuantity = 1,UsageStart=CURRENT_TIMESTAMP,UsageEnd=NULL WHERE asset_details.AssetId=?;`, [data.AssetId],
                            (error, results, fields) => {

                                pool.query(`UPDATE assets SET AssetUsed=AssetUsed+1,AssetQuantity = AssetQuantity - 1 WHERE CategoryId=?;`, [data.CategoryId],
                                    (error2, results2, fields) => {


                                        pool.query(`INSERT INTO activity (AssetId, EmployeeId, AssetName, EmployeeName, ActivityType, ActivityTime ) 
                                        SELECT ${data.AssetId}, ${data.EmployeeId}, t1.AssetName AssetName, t2.EmployeeName EmployeeName, "1", CURRENT_TIMESTAMP ActivityTime 
                                        FROM asset_details t1 INNER JOIN users t2 ON t1.EmployeeId = t2.EmployeeId where t1.AssetId = ?;`,
                                            [data.AssetId],
                                            (error3, results3, fields3) => {

                                                //Warning quantity checking

                                                pool.query(`UPDATE assets SET WarningFlag = (CASE WHEN AssetQuantity<=WarningQuantity THEN 1 ELSE 0 END) WHERE 
                                                assets.CategoryId=?;`, [data.CategoryId],
                                                    (error4, results4, fields) => {

                                                        pool.query(`SELECT WarningFlag,CategoryName FROM assets where CategoryId = ?;
                                                        `, [data.CategoryId],


                                                            (error6, results6, fields) => {
                                                                pool.query(`SELECT EmployeeName from users where EmployeeId =${data.EmployeeId};`,

                                                                    (error7, results7, fields) => {

                                                                        if (results6[0].WarningFlag == 1) {
                                                                            // console.log("testing values", data.EmployeeId, results7[0].EmployeeName, data.AssetId, results6[0].CategoryName);
                                                                            pool.query(
                                                                                `INSERT INTO notification (NotificationType,NotificationTime,EmployeeId,EmployeeName,AssetId,Name) values 
                                                                                (0,CURRENT_TIMESTAMP,${data.EmployeeId},"${results7[0].EmployeeName}",${data.AssetId},"${results6[0].CategoryName}");`,
                                                                                (error8, results8, fields) => {

                                                                                    if (error8) {
                                                                                        console.log("error8");
                                                                                        return callBack(error8)
                                                                                    }

                                                                                    else {
                                                                                        return callBack(null, results);

                                                                                    }


                                                                                }
                                                                            )
                                                                        }
                                                                        else {
                                                                            return callBack(null, results);


                                                                        }
                                                                    })


                                                            }
                                                        )


                                                    }
                                                )



                                            }
                                        )


                                    }
                                )


                            }
                        )
                    }


                }


            }
        )



    },

    // approve return request for Isdividual=1 by Admin

    approveReturnRequest: (data, callBack) => {

        if (data.Request == 2 && data.ResponseRequest == 1) {

            pool.query(`INSERT INTO activity (AssetId, EmployeeId, AssetName, EmployeeName, ActivityType, ActivityTime ) 
            SELECT ${data.AssetId}, ${data.EmployeeId}, t1.AssetName AssetName, t2.EmployeeName EmployeeName, "2", CURRENT_TIMESTAMP ActivityTime 
            FROM asset_details t1 INNER JOIN users t2 ON t1.EmployeeId = t2.EmployeeId where t1.AssetId = ?;`,
                [data.AssetId],
                (error, results, fields) => {

                    pool.query(`UPDATE asset_details SET Request = 0,UsageEnd=CURRENT_TIMESTAMP,EmployeeId=NULL,IsAvailable=1,UsedQuantity = 0 WHERE asset_details.AssetId=?;`, [data.AssetId],
                        (error1, results1, fields1) => {

                            pool.query(`UPDATE assets SET AssetUsed=AssetUsed-1,AssetQuantity = AssetQuantity + 1 WHERE assets.CategoryId=?;`, [data.CategoryId],
                                (error2, results2, fields) => {


                                    pool.query(`UPDATE assets SET WarningFlag= (CASE WHEN AssetQuantity>WarningQuantity THEN 0 ELSE 1 END) WHERE 
                                    assets.CategoryId=?;`, [data.CategoryId],
                                        (error3, results3, fields) => {


                                            if (error3) {
                                                return callBack(error3);
                                            }
                                            else {
                                                return callBack(null, results3);
                                            }

                                        }
                                    )

                                }
                            )


                        }
                    )

                }
            )
        }
    },

    // deny add request for Isdividual=1 by Admin

    denyAddRequest: (data, callBack) => {
        if (data.Request == 1 && data.ResponseRequest == 0) {
            console.log(data);

            pool.query(`SELECT IsIdentifiable FROM assets WHERE CategoryId in (SELECT CategoryId from asset_details WHERE AssetId = ?);
            `, [data.AssetId],
                (error, results, fields) => {
                    if (results[0].IsIdentifiable == 1) {

                        pool.query("UPDATE asset_details SET EmployeeId=NULL, Request = 0,IsAvailable=1 WHERE AssetId=?;", [data.AssetId],
                            (error, results, fields) => {
                                if (error) {
                                    return callBack(error);
                                }
                                else {
                                    return callBack(null, results);
                                }
                            }

                        )
                    }
                    else if (results[0].IsIdentifiable == 2) {

                        pool.query("UPDATE asset_details SET EmployeeId=0, Request = 0,IsAvailable=1 WHERE AssetId=?;", [data.AssetId],
                            (error, results, fields) => {
                                if (error) {
                                    return callBack(error);
                                }
                                else {
                                    return callBack(null, results);
                                }
                            }

                        )
                    }
                    else {
                        pool.query("UPDATE asset_details SET EmployeeId=0, Request = 0,IsAvailable=1 WHERE AssetId=?;", [data.AssetId],
                            (error, results, fields) => {
                                if (error) {
                                    return callBack(error);
                                }
                                else {
                                    return callBack(null, results);
                                }
                            }

                        )
                    }
                }
            )
        }
    },

    // deny return request for Isdividual=1 by Admin

    denyReturnRequest: (data, callBack) => {
        if (data.Request == 2 && data.ResponseRequest == 0) {

            pool.query("UPDATE asset_details SET Request = 0 WHERE AssetId=?;", [data.AssetId],
                (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }
                    else {
                        return callBack(null, results);
                    }
                }
            )
            pool.query("UPDATE asset_details SET Request = 0 WHERE AssetId=?;", [data.AssetId],
                (error, results, fields) => {



                    if (error) {
                        return callBack(error);
                    }
                    else {
                        return callBack(null, results);
                    }
                }
            )
        }
    },

    //deleting individual asset

    deleteIndividualAsset: (data, callBack) => {
        pool.query(`Update assets SET AssetUsed = AssetUsed - 1,AssetExpired = AssetExpired + 1 where CategoryId IN (SELECT CategoryId from asset_details where AssetId = ?);
        `, [data.AssetId],
            (error, results, fields) => {


                pool.query(`Delete FROM asset_details where AssetId = ? `, [data.AssetId],
                    (error2, results2, fields2) => {
                        if (error2) {
                            return callBack(error2);
                        }

                        else {
                            return callBack(null, results2);
                        }


                    }
                )



            }
        )
    },

    //Editing asset information

    editIndividualAsset: (data, callBack) => {
        console.log(data);
        pool.query(`Update asset_details SET AssetName = ? , IsOkay = ?, Comments = ?,AssetDetails = ?,Ram=?,Hdd=?,Ssd=?,Cpu=?,SerialNumber=? where AssetId = ?`,
            [data.AssetName, data.IsOkay, data.Comments, data.AssetDetails, data.Ram, data.Hdd, data.Ssd, data.Cpu, data.SerialNumber, data.AssetId],
            (error, results, fields) => {


                pool.query(`SELECT EmployeeId,AssetName,IsOkay FROM asset_details where AssetId = ?;
                `, [data.AssetId],


                    (error6, results6, fields) => {
                        pool.query(`SELECT EmployeeName from users where EmployeeId =${results6[0].EmployeeId};`,


                            (error7, results7, fields) => {
                                console.log(results7[0].EmployeeName, results6[0].EmployeeId, results6[0].AssetName, results6[0].IsOkay);

                                if (results6[0].IsOkay == 0) {
                                    pool.query(
                                        `INSERT INTO notification (NotificationType,NotificationTime,EmployeeId,EmployeeName,AssetId,Name) values 
                                        (1,CURRENT_TIMESTAMP,${results6[0].EmployeeId},"${results7[0].EmployeeName}",${data.AssetId},"${results6[0].AssetName}");`,
                                        (error8, results8, fields) => {

                                            if (error8) {
                                                console.log("error8");
                                                return callBack(error8)
                                            }

                                            else {
                                                return callBack(null, results);

                                            }


                                        }
                                    )
                                }
                                else {
                                    return callBack(null, results);


                                }
                            })


                    }
                )




            }
        )

    },

    // editIndividualAsset: (data, callBack) => {
    //     console.log(data);
    //     pool.query(`Update asset_details SET AssetName = ? , IsOkay = ?, Comments = ?,AssetDetails = ?,Ram=?,Hdd=?,Ssd=?,Cpu=?,SerialNumber=? where AssetId = ?`,
    //         [data.AssetName, data.IsOkay, data.Comments, data.AssetDetails, data.Ram, data.Hdd, data.Ssd, data.Cpu, data.SerialNumber, data.AssetId],
    //         (error, results, fields) => {
    //             if(error){
    //                 return callBack(error)
    //             }
    //             else{
    //                 return callBack(null,results)
    //             }

    //         }
    //     )
    // },

    //show all asset Category from assets table

    showAllAssetCategory: (data, callBack) => {
        pool.query(`select * from assets order by IsIdentifiable desc`,
            (error, results, fields) => {

                if (error) {
                    return callBack(error);
                }

                else {
                    return callBack(null, results);
                }

            }
        )
    },

    //deleting a particular user data by admin

    deleteUserInfo: (data, callBack) => {
        var arr = new Array();
        var arr1 = new Array();

        pool.query("Select count(EmployeeId)countId from asset_details WHERE EmployeeId=?;", [data.EmployeeId],
            (error, results, fields) => {
                //console.log(results[0].countId)
                if (results[0].countId == 0) {
                    pool.query(`Delete FROM users where EmployeeId = ? `, [data.EmployeeId],
                        (error2, results2, fields2) => {
                            if (error2) {
                                return callBack(error2);
                            }

                            else {
                                return callBack(null, results2);
                            }


                        }
                    )

                }
                else {

                    pool.query(`Select AssetId,CategoryId,IsAvailable FROM asset_details where EmployeeId = ? `, [data.EmployeeId],
                        (error2, results2, fields2) => {
                            let len = results2.length;
                            let i = 0;
                            while (i < len) {
                                console.log("1");
                                arr.push(results2[i].AssetId);
                                arr1.push(results2[i].CategoryId);
                                console.log(results2[i].AssetId)
                                if (results2[i].IsAvailable == 0) {
                                    console.log("ddd");
                                    return callBack(error2);


                                }
                                i++;

                            }
                            let j = 0;
                            while (j < len) {
                                console.log("2");


                                pool.query(`UPDATE assets SET AssetUsed = AssetUsed - 1,AssetExpired = AssetExpired + 1 WHERE CategoryId = ${arr1[j]}`,
                                    (error3, results3, fields) => {
                                        console.log("dddddddd")
                                        pool.query(`DELETE FROM asset_details WHERE AssetId = ${arr[j]}`,
                                            (error4, results4, fields) => {

                                                pool.query(`Select count(EmployeeId)count FROM users WHERE EmployeeId = ?`, [data.EmployeeId],
                                                    (error5, results5, fields) => {
                                                        if (results5[0].count == 1) {

                                                            pool.query(`Delete FROM users where EmployeeId = ? `, [data.EmployeeId],
                                                                (error6, results6, fields2) => {



                                                                }
                                                            )

                                                        }

                                                    }
                                                )

                                            }
                                        )


                                    }

                                )
                                j++;
                            }
                            console.log("last");
                            return callBack(null, results2);

                        }
                    )


                }


            }

        )

    },

    //changing Warning Quantity 

    editAssetCategory: (data, callBack) => {


        pool.query(`Update assets SET  WarningQuantity=? where CategoryId=
                ?`, [data.WarningQuantity, data.CategoryId],
            (error, results, fields) => {

                if (error) {
                    return callBack(error);
                }

                else {
                    return callBack(null, true);
                }

            }
        )

    },

    addCategory: (data, callBack) => {
        pool.query(`INSERT INTO assets (CategoryName,WarningQuantity,IsIdentifiable) VALUES (?,?,?)`, [data.CategoryName, data.WarningQuantity, data.IsIdentifiable],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);


            }
        )
    },

    totalCount: (data, callBack) => {
        // pool.query(`SELECT count(EmployeeId) AS Col FROM users UNION SELECT count(AssetId) FROM asset_details UNION SELECT count(CategoryId) FROM assets;`,
        //     (error, results, fields) => {
        //         if (error) {
        //             return callBack(error);
        //         }
        //         console.log(results);
        //         return callBack(null, results);


        //     }
        // )

        pool.query(`SELECT count(EmployeeId)EmployeeCount FROM users;`,
            (error, results, fields) => {
                pool.query(`SELECT count(AssetId)AssetCount FROM asset_details;`,
                    (error1, results1, fields) => {
                        pool.query(`SELECT count(CategoryId)CategoryCount FROM assets;`,
                            (error2, results2, fields) => {
                                if (error2) {
                                    return callBack(error2);
                                }
                                else {
                                    const r = Object.assign(results[0], results1[0], results2[0])
                                    return callBack(null, r);
                                }



                            }

                        )

                    }

                )

            }
        )


    }
}