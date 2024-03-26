/**
 * @author [Anas]
 * @email [anas@uxd.co.jp]
 * @create date 2021-10-25 00:11:40
 * @modify date 2021-10-26 07:31:17
 * @desc [description]
 */
const {
    showNotificationTable, 
    notificationSeen} = require("./notification.service");

module.exports = {

    showNotificationTable: (req, res) => {
        const body = req.body;
        showNotificationTable(body, (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "no unseen notifications to show",
                    data: []
                })
            }

            let i = 0;
            while (i < results.length) {

                if (results[i].NotificationTime != null) {
                    let string = results[i].NotificationTime.toString();
                    results[i].NotificationTime = string.slice(0, 24);
                }
                i++;
            }

            return res.json({
                success: 1,
                message: "shown",
                data: results
            })
        })
    },

    notificationSeen: (req, res) => {
        const body = req.body;
        notificationSeen(body, (error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Some error in SeenFlag",
                })
            }
            return res.json({
                success: 1,
                message: "SeenFlag changed",
              
            })
        })
    }

}