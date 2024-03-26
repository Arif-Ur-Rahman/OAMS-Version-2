/**
 * @author [Anas]
 * @email [anas@uxd.co.jp]
 * @create date 2021-10-26 00:11:56
 * @modify date 2021-10-26 00:11:56
 * @desc [description]
 */
const pool = require("../../config/database");

module.exports = {

    showNotificationTable: (data, callBack) => {
        pool.query(`SELECT * FROM notification WHERE SeenFlag=0 order by NotificationId desc;`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            })
    },
    
    notificationSeen: (data, callBack) => {
        pool.query(`UPDATE notification SET SeenFlag=1 where NotificationId =?;`, [data.NotificationId],

        (error, results, fields) => {

            if (error) {
                return callBack(error,"Error in notificationSeen");
            }
            return callBack(null, true);
        }
    )
    },
}



